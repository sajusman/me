"use server";

import { revalidatePath } from "next/cache";

import { withProfile } from "@/lib/with-profile";
import { createComment, deleteComment } from "@/server/comments/comment";
import { createReply } from "@/server/comments/reply";
import { CommentError, assertValidParentId } from "@/server/comments/shared";

/**
 * Server Action: create a top-level comment.
 *
 * Wrapped with `withProfile`, which resolves the current session's Profile and
 * injects it as the first argument — the action never trusts an author id from
 * the caller. On success it revalidates the post path so the server-rendered
 * comment list re-renders with the new comment.
 */
export const postCommentAction = withProfile(
  async (profile, input: { postSlug: string; body: string }): Promise<void> => {
    await createComment({
      postSlug: input.postSlug,
      body: input.body,
      authorId: profile.id,
    });
    revalidatePath(`/blog/${input.postSlug}`);
  },
);

/**
 * Server Action: create a one-level-deep reply to a top-level comment.
 *
 * Identity is injected by `withProfile`; the parent id is validated here before
 * being handed to the domain layer (which enforces the depth rule).
 */
export const postReplyAction = withProfile(
  async (
    profile,
    input: { postSlug: string; body: string; parentId: string },
  ): Promise<void> => {
    const parentId = assertValidParentId(input.parentId);
    if (!parentId) {
      throw new CommentError(
        400,
        "invalid_parent",
        "A parent comment is required.",
      );
    }
    await createReply({
      postSlug: input.postSlug,
      body: input.body,
      authorId: profile.id,
      parentId,
    });
    revalidatePath(`/blog/${input.postSlug}`);
  },
);

/**
 * Server Action: delete one of the current viewer's own comments.
 *
 * Identity is injected by `withProfile`; ownership is enforced in the domain
 * layer (a viewer can never delete someone else's comment). Deleting a
 * top-level comment cascades to its replies. On success it revalidates the post
 * path so the server-rendered list drops the removed comment.
 */
export const deleteCommentAction = withProfile(
  async (profile, input: { commentId: string }): Promise<void> => {
    const { postSlug } = await deleteComment({
      commentId: input.commentId,
      authorId: profile.id,
    });
    revalidatePath(`/blog/${postSlug}`);
  },
);
