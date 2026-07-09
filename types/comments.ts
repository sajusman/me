/**
 * Shared, client-safe types for the comments feature. Pure type declarations —
 * no runtime imports, so importing this never pulls server code into a bundle.
 */

/** Public author info attached to a comment. */
export type CommentAuthor = {
  id: string;
  username: string;
  avatarSeed: string;
};

/** A single comment (top-level or reply) as returned to callers. */
export type CommentView = {
  id: string;
  postSlug: string;
  body: string;
  parentId: string | null;
  createdAt: string;
  author: CommentAuthor;
};

/** A top-level comment together with its one level of replies. */
export type CommentThread = CommentView & {
  replies: CommentView[];
};

/** The current viewer's identity, surfaced to the UI. */
export type Viewer = {
  id: string;
  username: string;
  avatarSeed: string;
};
