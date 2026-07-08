import type { Metadata } from "next";
import Link from "next/link";

import { getAllPosts, formatDate } from "@/lib/posts";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Writing",
  description:
    "Essays on engineering, building consumer products, teams, and levelling up.",
};

export default function BlogIndex() {
  const posts = getAllPosts();

  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
      <header className="mb-12">
        <h1 className="text-4xl font-bold tracking-tight">Writing</h1>
        <p className="mt-3 max-w-2xl text-lg text-muted-foreground">
          Notes on engineering, building consumer products end to end, teams,
          and the messy work of growing as an engineer.
        </p>
      </header>

      {posts.length === 0 ? (
        <p className="text-muted-foreground">No posts yet — coming soon.</p>
      ) : (
        <div className="flex flex-col divide-y divide-border/60">
          {posts.map((post) => (
            <article key={post.slug} className="group py-6 first:pt-0">
              <Link href={`/blog/${post.slug}`} className="block">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <time dateTime={post.date}>{formatDate(post.date)}</time>
                    {post.readingTime && (
                      <>
                        <span aria-hidden>·</span>
                        <span>{post.readingTime}</span>
                      </>
                    )}
                  </div>
                  <h2 className="text-2xl font-semibold tracking-tight transition-colors group-hover:text-primary">
                    {post.title}
                  </h2>
                  <p className="max-w-2xl text-pretty leading-relaxed text-muted-foreground">
                    {post.description}
                  </p>
                  {post.tags && post.tags.length > 0 && (
                    <div className="mt-1 flex flex-wrap gap-1.5">
                      {post.tags.map((tag) => (
                        <Badge
                          key={tag}
                          variant="secondary"
                          className="font-normal"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              </Link>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
