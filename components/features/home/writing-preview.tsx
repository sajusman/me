import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { getAllPosts, formatDate } from "@/lib/posts";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SectionHeading } from "@/components/common/section-heading";

export function WritingPreview({
  posts,
}: {
  posts: ReturnType<typeof getAllPosts>;
}) {
  if (posts.length === 0) return null;

  return (
    <section className="py-8 pb-20">
      <div className="flex items-center justify-between">
        <SectionHeading id="writing">Recent Writing</SectionHeading>
        <Button
          variant="ghost"
          size="sm"
          nativeButton={false}
          render={<Link href="/blog" />}
        >
          All posts
          <ArrowRight className="size-4" />
        </Button>
      </div>
      <Separator className="mt-4" />
      <div className="mt-4 flex flex-col">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group flex flex-col gap-1 rounded-lg px-3 py-4 transition-colors hover:bg-accent/50"
          >
            <div className="flex items-baseline justify-between gap-4">
              <h3 className="font-medium group-hover:text-primary">
                {post.title}
              </h3>
              <span className="shrink-0 text-xs text-muted-foreground">
                {formatDate(post.date)}
              </span>
            </div>
            <p className="line-clamp-2 text-sm text-muted-foreground">
              {post.description}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}
