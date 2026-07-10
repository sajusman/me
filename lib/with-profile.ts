import "server-only";

import { getOrCreateProfile } from "@/lib/session";
import type { Profile } from "@/lib/generated/prisma/client";

/** Standard shape returned by profile-guarded actions. */
export type ActionResult<T = void> =
  | ({ ok: true } & (T extends void ? object : { data: T }))
  | { ok: false; error: string; code: string };

/**
 * Higher-order "decorator" that resolves the current session Profile and hands
 * it to the wrapped handler, so callers never trust an author id from input.
 *
 * It centralizes the two cross-cutting concerns every profile-backed action
 * shares:
 *   - "no session yet" → a stable { ok: false, code: "no_session" } result.
 *   - CommentError (and unexpected errors) → mapped to a safe result shape.
 *
 * The handler receives the resolved profile as its first argument and the
 * caller's input as the second, and returns a plain payload (or void). On
 * success we wrap it as { ok: true, data } (or just { ok: true } for void).
 */
export function withProfile<Input, Output = void>(
  handler: (profile: Profile, input: Input) => Promise<Output>,
  options?: { onError?: (err: unknown) => { code: string; error: string } },
): (input: Input) => Promise<ActionResult<Output>> {
  return async (input: Input): Promise<ActionResult<Output>> => {
    try {
      const profile = await getOrCreateProfile();
      if (!profile) {
        return {
          ok: false,
          code: "no_session",
          error: "No session yet. Please refresh and try again.",
        };
      }

      const output = await handler(profile, input);
      return (
        output === undefined ? { ok: true } : { ok: true, data: output }
      ) as ActionResult<Output>;
    } catch (err) {
      if (isCodedError(err)) {
        return { ok: false, error: err.message, code: err.code };
      }
      if (options?.onError) {
        const mapped = options.onError(err);
        return { ok: false, ...mapped };
      }
      console.error("[withProfile] action error", err);
      return {
        ok: false,
        code: "internal_error",
        error: "Something went wrong. Please try again.",
      };
    }
  };
}

/** Narrows to any error that carries a stable string `code` (e.g. CommentError). */
function isCodedError(err: unknown): err is Error & { code: string } {
  return (
    err instanceof Error &&
    "code" in err &&
    typeof (err as { code?: unknown }).code === "string"
  );
}
