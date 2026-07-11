import { getPostMeta, getPostSlugs } from "@/lib/posts";
import { OG_SIZE, OG_CONTENT_TYPE, renderOgImage } from "@/lib/og";
import { site } from "@/lib/site";

export function generateStaticParams() {
  return getPostSlugs().map((slug) => ({ slug }));
}

export const alt = `Blog post by ${site.name}`;
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const meta = getPostMeta(slug);

  return renderOgImage({
    eyebrow: "Writing",
    title: meta?.title ?? site.name,
    meta: meta?.readingTime ?? site.domain,
  });
}
