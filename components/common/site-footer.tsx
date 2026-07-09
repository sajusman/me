import Link from "next/link";

import { site } from "@/lib/site";
import { Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/common/brand-icons";

const YEAR = new Date().getFullYear();

export function SiteFooter() {
  return (
    <footer className="border-t border-border/60">
      <div className="mx-auto flex max-w-4xl flex-col items-center justify-between gap-4 px-4 py-8 sm:flex-row sm:px-6">
        <p className="text-sm text-muted-foreground">
          © {YEAR} {site.name}. Built with Next.js &
          shadcn/ui.
        </p>
        <div className="flex items-center gap-4 text-muted-foreground">
          <a
            href={site.links.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="transition-colors hover:text-foreground"
          >
            <GithubIcon className="size-[1.1rem]" />
          </a>
          <a
            href={site.links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="transition-colors hover:text-foreground"
          >
            <LinkedinIcon className="size-[1.1rem]" />
          </a>
          <a
            href={site.links.email}
            aria-label="Email"
            className="transition-colors hover:text-foreground"
          >
            <Mail className="size-[1.1rem]" />
          </a>
          <Link
            href="/blog"
            className="text-sm transition-colors hover:text-foreground"
          >
            Writing
          </Link>
        </div>
      </div>
    </footer>
  );
}
