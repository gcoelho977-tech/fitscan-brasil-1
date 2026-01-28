import Stripe from "stripe";
import { prisma } from "../_lib/prisma";

export const config = { api: { bodyParser: false } };

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-06-20",
});

async function readRawBody(req: any): Promise<Buffer> {
  const chunks: Buffer[] = [];
  for await (const chunk of req) chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
  return Buffer.concat(chunks);
}

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") return res.status(405).send("Method not allowed");

  const sig = req.headers["stripe-signature"];
  if (!sig) return res.status(400).send("No signature");

  const rawBody = await readRawBody(req);

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(rawBody, sig, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch (err: any) {
    return res.status(400).send(Webhook Error: );
  }

  // 1) checkout.session.completed -> ativa premium (melhor porque tem metadata.userId)
  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    const userId = (session.metadata?.userId || "").trim();
    const plan = (session.metadata?.plan || "").trim();
    const customerId = typeof session.customer === "string" ? session.customer : null;
    const subscriptionId = typeof session.subscription === "string" ? session.subscription : null;

    if (userId) {
      await prisma.subscription.upsert({
        where: { userId },
        update: {
          status: "active",
          plan: plan || undefined,
          stripeCustomerId: customerId || undefined,
          stripeSubscriptionId: subscriptionId || undefined,
        },
        create: {
          userId,
          status: "active",
          plan: plan || null,
          stripeCustomerId: customerId || null,
          stripeSubscriptionId: subscriptionId || null,
        },
      });
    }
  }

  // 2) subscription updated/deleted -> mantém status sincronizado
  if (event.type === "customer.subscription.updated" || event.type === "customer.subscription.created") {
    const sub = event.data.object as Stripe.Subscription;
    const customerId = typeof sub.customer === "string" ? sub.customer : null;

    if (customerId) {
      const existing = await prisma.subscription.findFirst({ where: { stripeCustomerId: customerId } });
      if (existing) {
        await prisma.subscription.update({
          where: { userId: existing.userId },
          data: {
            status: sub.status,
            stripeSubscriptionId: sub.id,
            currentPeriodEnd: new Date(sub.current_period_end * 1000),
          },
        });
      }
    }
  }

  if (event.type === "customer.subscription.deleted") {
    const sub = event.data.object as Stripe.Subscription;
    const customerId = typeof sub.customer === "string" ? sub.customer : null;

    if (customerId) {
      const existing = await prisma.subscription.findFirst({ where: { stripeCustomerId: customerId } });
      if (existing) {
        await prisma.subscription.update({
          where: { userId: existing.userId },
          data: { status: "canceled" },
        });
      }
    }
  }

  res.json({ received: true });
}
