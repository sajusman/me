import Link from "next/link";
import { ArrowRight, Mail, MapPin } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/brand-icons";

import { experience, projects, site, skills } from "@/lib/site";
import { getAllPosts, formatDate } from "@/lib/posts";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function Home() {
  const posts = getAllPosts().slice(0, 3);

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6">
      <Hero />
      <Skills />
      <ExperienceSection />
      <ProjectsSection />
      <WritingPreview posts={posts} />
    </div>
  );
}

function Hero() {
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

function SectionHeading({
  id,
  children,
}: {
  id: string;
  children: React.ReactNode;
}) {
  return (
    <h2
      id={id}
      className="scroll-mt-20 text-sm font-semibold uppercase tracking-widest text-muted-foreground"
    >
      {children}
    </h2>
  );
}

function Skills() {
  return (
    <section className="py-8">
      <SectionHeading id="skills">Technical Skills</SectionHeading>
      <div className="mt-6 grid gap-6 sm:grid-cols-3">
        {skills.map((group) => (
          <div key={group.label}>
            <h3 className="mb-3 text-sm font-medium">{group.label}</h3>
            <div className="flex flex-wrap gap-1.5">
              {group.items.map((item) => (
                <Badge key={item} variant="secondary" className="font-normal">
                  {item}
                </Badge>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function ExperienceSection() {
  return (
    <section className="py-8">
      <SectionHeading id="experience">Experience</SectionHeading>
      <div className="mt-6 flex flex-col gap-8">
        {experience.map((job) => (
          <div
            key={job.company}
            className="relative border-l-2 border-border pl-6"
          >
            <span className="absolute -left-[7px] top-1.5 size-3 rounded-full border-2 border-background bg-primary" />
            <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
              <h3 className="text-lg font-semibold">{job.company}</h3>
              <span className="text-sm text-muted-foreground">
                {job.period}
              </span>
            </div>
            <div className="flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:justify-between">
              <p className="font-medium text-muted-foreground">{job.role}</p>
              <span className="text-sm text-muted-foreground">
                {job.location}
              </span>
            </div>
            <ul className="mt-3 flex flex-col gap-2">
              {job.highlights.map((point) => (
                <li
                  key={point}
                  className="relative pl-4 text-sm leading-relaxed text-muted-foreground before:absolute before:left-0 before:top-2.5 before:size-1.5 before:rounded-full before:bg-muted-foreground/50"
                >
                  {point}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

function ProjectsSection() {
  return (
    <section className="py-8">
      <SectionHeading id="projects">Projects</SectionHeading>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {projects.map((project) => (
          <Card key={project.name}>
            <CardHeader>
              <div className="flex items-center justify-between gap-2">
                <CardTitle>{project.name}</CardTitle>
                {project.award && (
                  <Badge className="shrink-0">{project.award}</Badge>
                )}
              </div>
              <CardDescription>{project.context}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {project.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}

function WritingPreview({ posts }: { posts: ReturnType<typeof getAllPosts> }) {
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
