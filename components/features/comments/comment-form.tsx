"use client";

import { CommentComposer } from "@/components/features/comments/comment-composer";
import { usePostComment } from "@/components/features/comments/use-post-comment";
import type { Viewer } from "@/types/comments";

/**
 * Client wrapper for the top-level comment composer. Lives as a leaf so the
 * surrounding comments section can stay a server component.
 */
export function CommentForm({
  slug,
  viewer,
}: {
  slug: string;
  viewer: Viewer | null;
}) {
  const { submit } = usePostComment(slug);

  return (
    <div className="mb-2 rounded-xl border border-border bg-card p-4">
      {viewer && (
        <p className="mb-3 text-xs text-muted-foreground">
          Commenting as{" "}
          <span className="font-medium text-foreground">{viewer.username}</span>{" "}
          - a name I picked for you.
        </p>
      )}
      <CommentComposer
        viewer={viewer}
        onSubmit={(body) => submit(body, null)}
      />
    </div>
  );
}
