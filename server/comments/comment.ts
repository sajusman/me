import "server-only";

import { prisma } from "@/lib/db";
import type { CommentThread, CommentView } from "@/types/comments";
import {
  assertValidBody,
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

  const row = await prisma.comment.create({
    data: { postSlug, body, authorId: input.authorId, parentId: null },
    include: authorInclude,
  });

  return toCommentView(row);
}
