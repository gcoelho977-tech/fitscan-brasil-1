import { destroySessionCookie } from "../_lib/auth";

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const cookie = await destroySessionCookie(req);
  res.setHeader("Set-Cookie", cookie);

  return res.status(200).json({ ok: true });
}
