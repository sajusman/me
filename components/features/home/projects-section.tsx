import { ExternalLink } from "lucide-react";

import { projects } from "@/lib/site";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SectionHeading } from "@/components/common/section-heading";

export function ProjectsSection() {
  return (
    <section className="py-8">
      <SectionHeading id="projects">Projects</SectionHeading>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {projects.map((project) => (
          <Card
            key={project.name}
            className="project-card relative overflow-visible transition-colors hover:ring-foreground/20"
          >
            <CardHeader>
              <div className="flex items-center justify-between gap-2">
                <CardTitle className="flex items-center gap-2">
                  {project.name}
                  {project.url && (
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`Visit ${project.name}`}
                      className="rounded-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2"
                    >
                      <ExternalLink aria-hidden="true" className="size-3.5" />
                    </a>
                  )}
                </CardTitle>
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
            {project.url && (
              <div
                aria-hidden="true"
                className="project-preview pointer-events-none absolute top-[calc(100%+0.75rem)] left-1/2 z-20 hidden h-[300px] w-[min(480px,calc(100vw-2rem))] -translate-x-1/2 overflow-hidden rounded-xl border bg-background opacity-0 shadow-2xl sm:block"
              >
                <iframe
                  src={project.url}
                  title={`${project.name} website preview`}
                  tabIndex={-1}
                  loading="lazy"
                  sandbox="allow-scripts"
                  className="h-[800px] w-[1280px] origin-top-left scale-[0.375] border-0 bg-white"
                />
              </div>
            )}
          </Card>
        ))}
      </div>
    </section>
  );
}
