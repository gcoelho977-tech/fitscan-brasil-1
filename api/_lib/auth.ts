import crypto from "crypto";
import { serialize } from "cookie";
import { prisma } from "./prisma";

const COOKIE_NAME = "fitscan_session";

function sha256(input: string) {
  return crypto.createHash("sha256").update(input).digest("hex");
}

export async function createSession(userId: string) {
  const token = crypto.randomBytes(32).toString("hex");
  const tokenHash = sha256(token);
  const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30); // 30d

  await prisma.session.create({
    data: { tokenHash, userId, expiresAt },
  });

  const cookie = serialize(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    expires: expiresAt,
  });

  return cookie;
}

export async function destroySessionCookie(req: any) {
  const token = readSessionToken(req);
  if (token) {
    await prisma.session.deleteMany({ where: { tokenHash: sha256(token) } });
  }
  return serialize(COOKIE_NAME, "", { path: "/", expires: new Date(0) });
}

export function readSessionToken(req: any) {
  const cookieHeader = req.headers.cookie || "";
  const match = cookieHeader.match(new RegExp('(?:^|; )' + COOKIE_NAME + '=([^;]*)'));
  return match ? decodeURIComponent(match[1]) : null;
}

export async function getUserFromRequest(req: any) {
  const token = readSessionToken(req);
  if (!token) return null;

  const session = await prisma.session.findUnique({
    where: { tokenHash: sha256(token) },
    include: { user: true },
  });

  if (!session) return null;
  if (session.expiresAt < new Date()) return null;

  return session.user;
}
