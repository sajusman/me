import "server-only";

import { cookies } from "next/headers";

import { prisma } from "@/lib/db";
import { generateUsername } from "@/lib/identity";
import { SESSION_COOKIE, verifySession } from "@/lib/session-token";
import type { Profile } from "@/lib/generated/prisma/client";

/**
 * Reads and verifies the session id from the cookie set by proxy.ts.
 * Returns null if there is no valid session (e.g. the very first request,
 * before the proxy's Set-Cookie has round-tripped to the browser).
 */
export async function getSessionId(): Promise<string | null> {
  const secret = process.env.SESSION_SECRET;
  if (!secret) return null;

  const jar = await cookies();
  const raw = jar.get(SESSION_COOKIE)?.value;
  return verifySession(raw, secret);
}

/**
 * Returns the Profile for the current session, creating it lazily on first use.
 * This is the Node-runtime, DB-backed half of the identity: proxy owns the
 * session cookie, this owns the Profile row.
 *
 * Returns null only when there is no session cookie yet (nothing to attach a
 * profile to). Callers on a page can safely treat null as "come back on the
 * next request, once the cookie exists".
 */
export async function getOrCreateProfile(): Promise<Profile | null> {
  const sessionId = await getSessionId();
  if (!sessionId) return null;

  const existing = await prisma.profile.findUnique({ where: { sessionId } });
  if (existing) {
    // Best-effort "last seen" refresh; ignore failures.
    void prisma.profile
      .update({
        where: { id: existing.id },
        data: { lastSeenAt: new Date() },
      })
      .catch(() => {});
    return existing;
  }

  return createProfileForSession(sessionId);
}

const MAX_ATTEMPTS = 6;

async function createProfileForSession(sessionId: string): Promise<Profile> {
  for (let attempt = 0; attempt < MAX_ATTEMPTS; attempt++) {
    try {
      return await prisma.profile.create({
        data: { sessionId, username: generateUsername() },
      });
    } catch (err) {
      // If two requests race for the same session, the second hits the unique
      // sessionId constraint — just return the row the first one created.
      if (isUniqueViolation(err)) {
        const found = await prisma.profile.findUnique({ where: { sessionId } });
        if (found) return found;
      }
      if (attempt === MAX_ATTEMPTS - 1) throw err;
    }
  }
  throw new Error("Could not create a profile for the session.");
}

function isUniqueViolation(err: unknown): boolean {
  return (
    typeof err === "object" &&
    err !== null &&
    "code" in err &&
    (err as { code?: string }).code === "P2002"
  );
}
