import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
  // Allow .md and .mdx files to be treated as pages/imports.
  pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],
  // Enable Cache Components (PPR + `use cache`) so content is prerendered
  // and served from the static shell.
  cacheComponents: true,
};

const withMDX = createMDX({
  extension: /\.(md|mdx)$/,
  options: {
    // String plugin names so they work with Turbopack.
    remarkPlugins: ["remark-gfm"],
    rehypePlugins: [
      "rehype-slug",
      [
        "rehype-pretty-code",
        {
          theme: { dark: "github-dark", light: "github-light" },
          keepBackground: false,
        },
      ],
    ],
  },
});

export default withMDX(nextConfig);
