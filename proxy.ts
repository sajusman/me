import { NextResponse, type NextRequest } from "next/server";

import {
  SESSION_COOKIE,
  SESSION_COOKIE_MAX_AGE,
  newSessionId,
  signSession,
  verifySession,
} from "@/lib/session-token";

/**
 * Runs before every matched request. On first visit (no valid session cookie)
 * it mints a fresh, signed session id and sets it as an httpOnly cookie.
 *
 * IMPORTANT: proxy only manages the lightweight SESSION here — it never touches
 * the database. The actual Profile row is created lazily server-side on first
 * use (see lib/session.ts). This keeps the cached page shell fast and DB-free,
 * which is what we want with Cache Components: proxy only decorates the response
 * with a Set-Cookie header, so the static shell is never bypassed.
 */
export async function proxy(request: NextRequest) {
  const response = NextResponse.next();

  const secret = process.env.SESSION_SECRET;
  if (!secret) {
    throw new Error("Please configure SESSION_SECRET");
  }

  const existing = request.cookies.get(SESSION_COOKIE)?.value;
  const valid = await verifySession(existing, secret);

  if (!valid) {
    const sessionId = newSessionId();
    const signed = await signSession(sessionId, secret);
    response.cookies.set(SESSION_COOKIE, signed, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: SESSION_COOKIE_MAX_AGE,
    });
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.*\\..*).*)",
  ],
};
