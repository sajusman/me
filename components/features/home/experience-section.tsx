import { experience } from "@/lib/site";
import { SectionHeading } from "@/components/common/section-heading";

export function ExperienceSection() {
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
