import { Suspense } from "react";

import { Skeleton } from "@/components/ui/skeleton";
import { CommentsContent } from "@/components/features/comments/comments-list";

/**
 * Comments section for a blog post.
 *
 * The site uses Cache Components (PPR): the surrounding page is a static shell.
 * The comments are a dynamic, server-rendered island — <CommentsContent> reads
 * the DB per request and streams into this <Suspense> boundary, so the article
 * stays static while comments are always fresh (and present in the HTML).
 */
export function Comments({ slug }: { slug: string }) {
  return (
    <section
      id="comments"
      aria-label="Comments"
      className="mx-auto mt-16 max-w-2xl border-t border-border/60 px-4 pt-12 sm:px-6"
    >
      <Suspense fallback={<CommentsSkeleton />}>
        <CommentsContent slug={slug} />
      </Suspense>
    </section>
  );
}

function CommentsSkeleton() {
  return (
    <div>
      <Skeleton className="mb-6 h-6 w-32" />
      <Skeleton className="mb-6 h-28 w-full rounded-xl" />
      <div className="space-y-6">
        {[0, 1, 2].map((i) => (
          <div key={i} className="flex gap-3">
            <Skeleton className="size-8 shrink-0 rounded-full" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-40" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
