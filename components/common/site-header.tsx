import Link from "next/link";

import { navItems, site } from "@/lib/site";
import { ThemeToggle } from "@/components/common/theme-toggle";
import { Button } from "@/components/ui/button";
import { GithubIcon, LinkedinIcon } from "@/components/common/brand-icons";
import { MobileNav } from "@/components/common/mobile-nav";

export function SiteHeader() {
  const initials = site.name
    .split(" ")
    .map((n) => n[0])
    .join("");

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-4xl items-center justify-between px-4 sm:px-6">
        <Link
          href="/"
          className="flex items-center gap-2 font-semibold tracking-tight"
        >
          <span className="flex size-7 items-center justify-center rounded-md bg-primary text-xs font-bold text-primary-foreground">
            {initials}
          </span>
          <span className="hidden sm:inline">{site.name}</span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <Button
              key={item.href}
              variant="ghost"
              size="sm"
              nativeButton={false}
              render={<Link href={item.href} />}
            >
              {item.label}
            </Button>
          ))}
        </nav>

        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="hidden sm:inline-flex"
            aria-label="GitHub"
            nativeButton={false}
            render={
              <a
                href={site.links.github}
                target="_blank"
                rel="noopener noreferrer"
              />
            }
          >
            <GithubIcon className="size-[1.1rem]" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="hidden sm:inline-flex"
            aria-label="LinkedIn"
            nativeButton={false}
            render={
              <a
                href={site.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
              />
            }
          >
            <LinkedinIcon className="size-[1.1rem]" />
          </Button>
          <ThemeToggle />
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
