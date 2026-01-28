import crypto from "crypto";
import { prisma } from "../_lib/prisma";
import { createSession } from "../_lib/auth";

function sha256(input: string) {
  return crypto.createHash("sha256").update(input).digest("hex");
}

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { email, code } = req.body || {};
  const e = String(email || "").trim().toLowerCase();
  const c = String(code || "").trim();

  if (!e || !e.includes("@")) return res.status(400).json({ error: "Email inválido" });
  if (c.length !== 6) return res.status(400).json({ error: "Código inválido" });

  const latest = await prisma.loginCode.findFirst({
    where: { email: e },
    orderBy: { createdAt: "desc" },
  });

  if (!latest) return res.status(401).json({ error: "Código não encontrado" });
  if (latest.expiresAt < new Date()) return res.status(401).json({ error: "Código expirou" });
  if (latest.attempts >= 5) return res.status(429).json({ error: "Muitas tentativas" });

  if (latest.codeHash !== sha256(c)) {
    await prisma.loginCode.update({ where: { id: latest.id }, data: { attempts: { increment: 1 } } });
    return res.status(401).json({ error: "Código incorreto" });
  }

  const user = await prisma.user.upsert({
    where: { email: e },
    update: {},
    create: { email: e },
  });

  await prisma.loginCode.deleteMany({ where: { email: e } });

  const cookie = await createSession(user.id);
  res.setHeader("Set-Cookie", cookie);

  return res.status(200).json({ ok: true, user: { id: user.id, email: user.email } });
}
