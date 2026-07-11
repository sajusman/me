import { OG_SIZE, OG_CONTENT_TYPE, renderOgImage } from "@/lib/og";
import { site } from "@/lib/site";

export const alt = site.title;
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return renderOgImage({
    eyebrow: "Portfolio & Writing",
    title: "Building cross-platform products that scale.",
    meta: site.domain,
  });
}
