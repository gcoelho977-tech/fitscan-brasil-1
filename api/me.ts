import { getUserFromRequest } from "./_lib/auth";
import { prisma } from "./_lib/prisma";

export default async function handler(req: any, res: any) {
  const user = await getUserFromRequest(req);
  if (!user) return res.status(200).json({ user: null, premium: false });

  const sub = await prisma.subscription.findUnique({ where: { userId: user.id } });
  const premium = sub?.status === "active" || sub?.status === "trialing";

  return res.status(200).json({
    user: { id: user.id, email: user.email },
    premium,
    subscription: sub ?? null,
  });
}
