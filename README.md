# Usman Sajjad — Portfolio & Blog

Personal site and writing space built with **Next.js 16 (App Router)**,
**Tailwind CSS v4**, **shadcn/ui (base-nova / Base UI)**, and **MDX**.

- **Light + dark themes** via `next-themes` (system-aware, SSR-safe, no flash).
- **Fully server-rendered & cached** — Cache Components (PPR) is enabled, so
  every page (home, blog index, and each post) is prerendered into a static
  shell.
- **MDX blog** with GitHub-flavored markdown, heading anchors, and dual
  light/dark syntax highlighting (`rehype-pretty-code` + Shiki).
- **Tree-shaken components** — shadcn copies only the components used into
  `components/ui`, so nothing unused ships.

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
```

Other scripts:

```bash
npm run build    # production build (prerenders all pages)
npm run start    # serve the production build
npm run lint     # eslint
```

## Writing a blog post

Add an `.mdx` file to `content/blog/`. Each post exports a `metadata` object:

```mdx
export const metadata = {
  title: "My Post Title",
  description: "One-line summary shown in listings and meta tags.",
  date: "2026-07-08",
  tags: ["Engineering", "Career"],
};

Your content here. Standard markdown, plus JSX components and fenced code
blocks with syntax highlighting.
```

The post is automatically:

- listed on `/blog` (sorted newest-first),
- given its own prerendered page at `/blog/<filename>`,
- surfaced in "Recent Writing" on the home page,
- wired up with SEO metadata and OpenGraph tags.

## Project structure

```
app/
  layout.tsx            Root layout (theme provider, header, footer)
  page.tsx              Home / portfolio
  blog/page.tsx         Blog index
  blog/[slug]/page.tsx  Individual post (dynamic import of MDX)
components/             Header, footer, theme toggle, brand icons, ui/*
content/blog/*.mdx      Blog posts
lib/site.ts            CV data (skills, experience, projects)
lib/posts.ts           Reads + sorts MDX posts and their metadata
mdx-components.tsx      Global MDX element overrides
next.config.ts          MDX + Cache Components config
```

## Adding shadcn components

```bash
npx shadcn@latest add <component>
```

Components land in `components/ui/` and use the Base UI primitives with the
`base-nova` style. Note: composition uses Base UI's `render` prop rather than
`asChild`. When rendering a non-`<button>` element (e.g. a link), also pass
`nativeButton={false}`:

```tsx
<Button nativeButton={false} render={<Link href="/blog" />}>
  …
</Button>
```
