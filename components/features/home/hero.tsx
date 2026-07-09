import Link from "next/link";
import { ArrowRight, Mail, MapPin } from "lucide-react";

import { site } from "@/lib/site";
import { GithubIcon, LinkedinIcon } from "@/components/common/brand-icons";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="py-16 sm:py-24">
      <div className="flex flex-col gap-6">
        <div className="inline-flex w-fit items-center gap-2 rounded-full border bg-muted/40 px-3 py-1 text-xs text-muted-foreground">
          <span className="relative flex size-2">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-500 opacity-75" />
            <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
          </span>
          Open to interesting problems
        </div>

        <h1 className="text-balance text-4xl font-bold tracking-tight sm:text-6xl">
          {site.name}
        </h1>
        <p className="text-xl font-medium text-muted-foreground sm:text-2xl">
          {site.role}
        </p>

        <p className="max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">
          {site.tagline}
        </p>

        <div className="flex flex-wrap items-center gap-3 pt-2">
          <Button nativeButton={false} render={<Link href="/blog" />}>
            Read my writing
            <ArrowRight className="size-4" />
          </Button>
          <Button
            variant="outline"
            nativeButton={false}
            render={<a href={site.links.email} />}
          >
            <Mail className="size-4" />
            Get in touch
          </Button>
        </div>

        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 pt-2 text-sm text-muted-foreground">
          <span className="inline-flex items-center gap-1.5">
            <MapPin className="size-4" />
            {site.location}
          </span>
          <a
            href={site.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 transition-colors hover:text-foreground"
          >
            <GithubIcon className="size-4" />
            github.com/sajusman
          </a>
          <a
            href={site.links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 transition-colors hover:text-foreground"
          >
            <LinkedinIcon className="size-4" />
            in/usman-sajjad
          </a>
        </div>
      </div>
    </section>
  );
}
