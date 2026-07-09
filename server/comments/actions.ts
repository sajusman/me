"use server";

import { revalidatePath } from "next/cache";

import { getOrCreateProfile } from "@/lib/session";
import { createComment } from "@/server/comments/comment";
import { createReply } from "@/server/comments/reply";
import { CommentError, assertValidParentId } from "@/server/comments/shared";

export type PostCommentResult =
  | { ok: true }
  | { ok: false; error: string; code: string };

/**
 * Server Action: create a top-level comment or a one-level-deep reply.
 *
 * Reachable via a direct POST, so it re-validates identity and all input inside
 * the action (never trusting the caller). On success it revalidates the post
 * path so the server-rendered comment list re-renders with the new comment.
 */
export async function postComment(input: {
  postSlug: string;
  body: string;
  parentId?: string | null;
}): Promise<PostCommentResult> {
  try {
    const profile = await getOrCreateProfile();
    if (!profile) {
      return {
        ok: false,
        code: "no_session",
        error: "No session yet. Please refresh and try again.",
      };
    }

    const parentId = assertValidParentId(input.parentId);

    if (parentId) {
      await createReply({
        postSlug: input.postSlug,
        body: input.body,
        authorId: profile.id,
        parentId,
      });
    } else {
      await createComment({
        postSlug: input.postSlug,
        body: input.body,
        authorId: profile.id,
      });
    }

    revalidatePath(`/blog/${input.postSlug}`);
    return { ok: true };
  } catch (err) {
    if (err instanceof CommentError) {
      return { ok: false, error: err.message, code: err.code };
    }
    console.error("[comments] postComment action error", err);
    return {
      ok: false,
      code: "internal_error",
      error: "Could not post your comment.",
    };
  }
}
