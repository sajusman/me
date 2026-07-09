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
