import "server-only";

import { prisma } from "@/lib/db";
import type { CommentThread, CommentView } from "@/types/comments";
import {
  CommentError,
  assertValidBody,
  assertValidParentId,
  assertValidSlug,
  authorInclude,
  toCommentView,
} from "@/server/comments/shared";

const MAX_COMMENTS_PER_POST = 500;

/**
 * Lists all comments for a post, assembled into threads: top-level comments
 * (newest first) each with their replies (oldest first, so a conversation reads
 * top to bottom).
 */
export async function listComments(
  postSlugInput: string,
): Promise<{ threads: CommentThread[]; total: number }> {
  const postSlug = assertValidSlug(postSlugInput);

  const rows = await prisma.comment.findMany({
    where: { postSlug },
    include: authorInclude,
    orderBy: { createdAt: "asc" },
    take: MAX_COMMENTS_PER_POST,
  });

  const views = rows.map(toCommentView);

  const repliesByParent = new Map<string, CommentView[]>();
  for (const view of views) {
    if (view.parentId) {
      const list = repliesByParent.get(view.parentId) ?? [];
      list.push(view);
      repliesByParent.set(view.parentId, list);
    }
  }

  const threads: CommentThread[] = views
    .filter((v) => v.parentId === null)
    // Top-level newest first.
    .sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1))
    .map((view) => ({
      ...view,
      replies: repliesByParent.get(view.id) ?? [],
    }));

  return { threads, total: views.length };
}

/**
 * Creates a top-level comment (no parent) authored by the given profile.
 */
export async function createComment(input: {
  postSlug: string;
  body: string;
  authorId: string;
}): Promise<CommentView> {
  const postSlug = assertValidSlug(input.postSlug);
  const body = assertValidBody(input.body);

  const row = await prisma.$transaction(async (tx) => {
    const created = await tx.comment.create({
      data: { postSlug, body, authorId: input.authorId, parentId: null },
      include: authorInclude,
    });
    // Append-only history: record exactly what was submitted. Kept forever,
    // even after the comment itself is deleted.
    await tx.commentLog.create({
      data: {
        commentId: created.id,
        postSlug,
        authorId: input.authorId,
        body,
        action: "create",
      },
    });
    return created;
  });

  return toCommentView(row);
}

/**
 * Deletes a comment (or reply) authored by the given profile.
 *
 * Enforces ownership: a profile can only delete its own comment. Deleting a
 * top-level comment cascades to its replies (see the schema's onDelete rule).
 * Returns the postSlug so the caller can revalidate the right path.
 */
export async function deleteComment(input: {
  commentId: string;
  authorId: string;
}): Promise<{ postSlug: string }> {
  const commentId = assertValidParentId(input.commentId);
  if (!commentId) {
    throw new CommentError(400, "invalid_comment", "A comment id is required.");
  }

  const comment = await prisma.comment.findUnique({
    where: { id: commentId },
    select: { id: true, authorId: true, postSlug: true },
  });

  if (!comment) {
    throw new CommentError(404, "comment_missing", "This comment no longer exists.");
  }
  if (comment.authorId !== input.authorId) {
    throw new CommentError(403, "not_owner", "You can only delete your own comments.");
  }

  await prisma.comment.delete({ where: { id: comment.id } });

  return { postSlug: comment.postSlug };
}
