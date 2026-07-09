import { skills } from "@/lib/site";
import { Badge } from "@/components/ui/badge";
import { SectionHeading } from "@/components/common/section-heading";

export function SkillsSection() {
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
