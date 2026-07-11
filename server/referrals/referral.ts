import "server-only";

import { prisma } from "@/lib/db";

/**
 * The referral sources we recognize. Anything not in this set is ignored, so the
 * `?ref=` param can't be used to spam the table with arbitrary values.
 */
const ALLOWED_REFS = new Set(["cv", "linkedin", "github"]);

const MAX_REF_LENGTH = 32;

/** Normalizes a raw `?ref=` value, returning null if it isn't one we track. */
export function normalizeRef(raw: string | undefined | null): string | null {
  if (!raw) return null;
  const ref = raw.trim().toLowerCase();
  if (ref.length === 0 || ref.length > MAX_REF_LENGTH) return null;
  return ALLOWED_REFS.has(ref) ? ref : null;
}

/**
 * Records a referral open for the given session.
 *
 * Counter model: there is at most one row per (sessionId, ref) pair. The first
 * open inserts the row (openCount = 1); every later open bumps openCount and
 * lastOpenedAt instead of inserting a new row — so a recruiter refreshing five
 * times leaves one row with openCount = 5, not five rows.
 *
 * The `@@unique([sessionId, ref])` constraint makes this race-safe: if two
 * concurrent requests both try to insert, the loser hits the constraint (P2002)
 * and we retry as a plain increment. The increment itself is atomic in the DB.
 *
 * Best-effort by design — callers schedule this via `after()` so it never blocks
 * the response, and failures are swallowed (this is analytics, not core data).
 */
export async function recordReferralOpen(input: {
  sessionId: string;
  ref: string;
  path: string;
}): Promise<void> {
  const ref = normalizeRef(input.ref);
  if (!ref) return;

  const { sessionId, path } = input;

  try {
    await prisma.referral.upsert({
      where: { sessionId_ref: { sessionId, ref } },
      create: { sessionId, ref, path },
      update: { openCount: { increment: 1 }, lastOpenedAt: new Date() },
    });
  } catch (err) {
    // Lost the insert race — the row now exists, so just bump the counter.
    if (isUniqueViolation(err)) {
      await prisma.referral
        .update({
          where: { sessionId_ref: { sessionId, ref } },
          data: { openCount: { increment: 1 }, lastOpenedAt: new Date() },
        })
        .catch(() => {});
      return;
    }
    // Tracking is best-effort; never let it surface to the visitor.
    console.error("[recordReferralOpen] failed", err);
  }
}

function isUniqueViolation(err: unknown): boolean {
  return (
    typeof err === "object" &&
    err !== null &&
    "code" in err &&
    (err as { code?: string }).code === "P2002"
  );
}
