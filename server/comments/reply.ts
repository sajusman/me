import "server-only";

import { prisma } from "@/lib/db";
import type { CommentView } from "@/types/comments";
import {
  CommentError,
  assertValidBody,
  assertValidParentId,
  assertValidSlug,
  authorInclude,
  toCommentView,
} from "@/server/comments/shared";

/**
 * Creates a reply to a top-level comment, authored by the given profile.
 *
 * Enforces the one-level-deep rule: the parent must exist, belong to the same
 * post, and itself be a top-level comment (parentId === null). Replying to a
 * reply is rejected.
 */
export async function createReply(input: {
  postSlug: string;
  body: string;
  authorId: string;
  parentId: string;
}): Promise<CommentView> {
  const postSlug = assertValidSlug(input.postSlug);
  const body = assertValidBody(input.body);
  const parentId = assertValidParentId(input.parentId);

  if (!parentId) {
    throw new CommentError(400, "invalid_parent", "A parent comment is required.");
  }

  const parent = await prisma.comment.findUnique({
    where: { id: parentId },
    select: { id: true, postSlug: true, parentId: true },
  });

  if (!parent) {
    throw new CommentError(
      404,
      "parent_missing",
      "The comment you replied to no longer exists.",
    );
  }
  if (parent.postSlug !== postSlug) {
    throw new CommentError(
      400,
      "parent_mismatch",
      "Reply does not belong to this post.",
    );
  }
  // Depth guard: the parent must itself be top-level.
  if (parent.parentId !== null) {
    throw new CommentError(
      400,
      "too_deep",
      "Replies can only go one level deep.",
    );
  }

  const row = await prisma.comment.create({
    data: { postSlug, body, authorId: input.authorId, parentId },
    include: authorInclude,
  });

  return toCommentView(row);
}
