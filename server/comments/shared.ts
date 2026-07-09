import "server-only";

import type { CommentAuthor, CommentView } from "@/types/comments";
import { MAX_BODY_LENGTH, MIN_BODY_LENGTH } from "@/server/comments/limits";

/** A typed error carrying an HTTP status + stable code for the route layer. */
export class CommentError extends Error {
  status: number;
  code: string;

  constructor(status: number, code: string, message: string) {
    super(message);
    this.name = "CommentError";
    this.status = status;
    this.code = code;
  }
}

/** Validates a post slug (matches the on-disk MDX filename convention). */
export function assertValidSlug(slug: unknown): string {
  if (typeof slug !== "string" || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
    throw new CommentError(400, "invalid_slug", "A valid post slug is required.");
  }
  return slug;
}

/** Validates + normalizes a comment body. */
export function assertValidBody(body: unknown): string {
  if (typeof body !== "string") {
    throw new CommentError(400, "invalid_body", "Comment body is required.");
  }
  const trimmed = body.trim();
  if (trimmed.length < MIN_BODY_LENGTH) {
    throw new CommentError(400, "empty_body", "Comment cannot be empty.");
  }
  if (trimmed.length > MAX_BODY_LENGTH) {
    throw new CommentError(
      400,
      "body_too_long",
      `Comment is too long (max ${MAX_BODY_LENGTH} characters).`,
    );
  }
  return trimmed;
}

/** Validates an optional parent id (UUID) or null/undefined. */
export function assertValidParentId(id: unknown): string | null {
  if (id === null || id === undefined) return null;
  if (typeof id !== "string" || !/^[0-9a-f-]{36}$/i.test(id)) {
    throw new CommentError(400, "invalid_parent", "Invalid parent comment.");
  }
  return id;
}

/** The Prisma include needed to build a CommentView (author joined in). */
export const authorInclude = {
  author: { select: { id: true, username: true, avatarSeed: true } },
} as const;

type RowWithAuthor = {
  id: string;
  postSlug: string;
  body: string;
  parentId: string | null;
  createdAt: Date;
  author: CommentAuthor;
};

/** Maps a Prisma comment row (with author) into the client-facing view. */
export function toCommentView(row: RowWithAuthor): CommentView {
  return {
    id: row.id,
    postSlug: row.postSlug,
    body: row.body,
    parentId: row.parentId,
    createdAt: row.createdAt.toISOString(),
    author: row.author,
  };
}
