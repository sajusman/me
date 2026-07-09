import { MessageCircle } from "lucide-react";

import { listComments } from "@/server/comments/comment";
import { getOrCreateProfile } from "@/lib/session";
import { CommentForm } from "@/components/features/comments/comment-form";
import { CommentItem } from "@/components/features/comments/comment-item";
import type { Viewer } from "@/types/comments";

/**
 * Server component (async): reads comments + the viewer directly from the DB and
 * renders the composer, count, and the threads. Wrapped in <Suspense> by the
 * parent, so it runs per-request and streams into the otherwise-static page
 * shell (Cache Components / PPR).
 */
export async function CommentsContent({ slug }: { slug: string }) {
  const [{ threads, total }, profile] = await Promise.all([
    listComments(slug),
    getOrCreateProfile(),
  ]);

  const viewer: Viewer | null = profile
    ? {
        id: profile.id,
        username: profile.username,
        avatarSeed: profile.avatarSeed,
      }
    : null;

  return (
    <div>
      <div className="mb-6 flex items-center gap-2">
        <MessageCircle className="size-5 text-muted-foreground" />
        <h2 className="text-lg font-semibold">
          {total === 0
            ? "Comments"
            : `${total} ${total === 1 ? "Comment" : "Comments"}`}
        </h2>
      </div>

      <CommentForm slug={slug} viewer={viewer} />

      {threads.length === 0 ? (
        <p className="py-8 text-center text-sm text-muted-foreground">
          No comments yet. Be the first to say something.
        </p>
      ) : (
        <div className="divide-y divide-border/60">
          {threads.map((thread) => (
            <CommentItem key={thread.id} thread={thread} viewer={viewer} />
          ))}
        </div>
      )}
    </div>
  );
}
