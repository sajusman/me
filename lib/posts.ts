import fs from "node:fs";
import path from "node:path";
import type { Post, PostMeta } from "@/types/posts";

const CONTENT_DIR = path.join(process.cwd(), "content", "blog");

function estimateReadingTime(raw: string): string {
  const words = raw.replace(/[#>*`_\-\[\]()!]/g, " ").split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.round(words / 200));
  return `${minutes} min read`;
}

/**
 * Reads every `.mdx` file in content/blog and extracts its exported
 * `metadata` object. Runs only on the server at build/prerender time.
 */
export function getAllPosts(): Post[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];

  const files = fs
    .readdirSync(CONTENT_DIR)
    .filter((file) => file.endsWith(".mdx"));

  const posts = files.map((file) => {
    const slug = file.replace(/\.mdx$/, "");
    const raw = fs.readFileSync(path.join(CONTENT_DIR, file), "utf-8");

    const meta = parseMetadata(raw);

    return {
      slug,
      readingTime: estimateReadingTime(raw),
      ...meta,
    } satisfies Post;
  });

  return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPostSlugs(): string[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];
  return fs
    .readdirSync(CONTENT_DIR)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""));
}

export function getPostMeta(slug: string): Post | undefined {
  return getAllPosts().find((post) => post.slug === slug);
}

/**
 * Lightweight parser for the `export const metadata = {...}` block in each
 * MDX file. Avoids importing/compiling the whole MDX just to read the header.
 */
function parseMetadata(raw: string): PostMeta {
  const match = raw.match(/export\s+const\s+metadata\s*=\s*(\{[\s\S]*?\n\})/);
  const fallback: PostMeta = {
    title: "Untitled",
    description: "",
    date: "1970-01-01",
    tags: [],
  };

  if (!match) return fallback;

  try {
    // The metadata object is a plain JS object literal; evaluate it safely.
    const obj = new Function(`return (${match[1]})`)() as PostMeta;
    return {
      title: obj.title ?? fallback.title,
      description: obj.description ?? "",
      date: obj.date ?? fallback.date,
      tags: obj.tags ?? [],
    };
  } catch {
    return fallback;
  }
}

export function formatDate(date: string): string {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
