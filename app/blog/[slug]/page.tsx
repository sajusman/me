import type { Metadata } from "next";
import type { BlogPosting, WithContext } from "schema-dts";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import { getPostSlugs, getPostMeta, formatDate } from "@/lib/posts";
import { site } from "@/lib/site";
import { Badge } from "@/components/ui/badge";
import { Comments } from "@/components/features/comments/comments";

export function generateStaticParams() {
  return getPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const meta = getPostMeta(slug);
  if (!meta) return {};

  const url = `${site.url}/blog/${slug}`;

  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: `/blog/${slug}`,
    },
    openGraph: {
      type: "article",
      url,
      title: meta.title,
      description: meta.description,
      publishedTime: meta.date,
      authors: [site.name],
      tags: meta.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: meta.title,
      description: meta.description,
    },
  };
}

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const meta = getPostMeta(slug);

  if (!meta) notFound();

  const { default: Content } = await import(`@/content/blog/${slug}.mdx`);

  const url = `${site.url}/blog/${slug}`;
  const jsonLd: WithContext<BlogPosting> = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: meta.title,
    description: meta.description,
    datePublished: meta.date,
    dateModified: meta.date,
    url,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    image: `${url}/opengraph-image`,
    keywords: meta.tags?.join(", "),
    author: {
      "@type": "Person",
      name: site.name,
      url: site.url,
    },
    publisher: {
      "@type": "Person",
      name: site.name,
      url: site.url,
    },
  };

  return (
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6">
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Link
        href="/blog"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="size-4" />
        All writing
      </Link>

      <header className="mt-8 mb-10 border-b border-border/60 pb-8">
        <div className="flex items-center gap-3 text-sm text-muted-foreground">
          <time dateTime={meta.date}>{formatDate(meta.date)}</time>
          {meta.readingTime && (
            <>
              <span aria-hidden>·</span>
              <span>{meta.readingTime}</span>
            </>
          )}
        </div>
        <h1 className="mt-3 text-balance text-4xl font-bold tracking-tight">
          {meta.title}
        </h1>
        <p className="mt-3 text-pretty text-lg text-muted-foreground">
          {meta.description}
        </p>
        {meta.tags && meta.tags.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-1.5">
            {meta.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="font-normal">
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </header>

      <article className="prose prose-neutral max-w-none dark:prose-invert prose-headings:scroll-mt-20 prose-headings:font-semibold prose-a:font-medium prose-a:text-primary prose-a:underline-offset-4 prose-pre:border prose-pre:bg-muted/40 prose-img:rounded-lg">
        <Content />
      </article>

      <Comments slug={slug} />
    </div>
  );
}
