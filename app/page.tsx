import type { Person, WithContext } from "schema-dts";

import { getAllPosts } from "@/lib/posts";
import { site, skills } from "@/lib/site";
import { Hero } from "@/components/features/home/hero";
import { SkillsSection } from "@/components/features/home/skills-section";
import { ExperienceSection } from "@/components/features/home/experience-section";
import { ProjectsSection } from "@/components/features/home/projects-section";
import { WritingPreview } from "@/components/features/home/writing-preview";

export default function Home() {
  const posts = getAllPosts().slice(0, 3);

  const knowsAbout = skills.flatMap((group) => group.items);

  const jsonLd: WithContext<Person> = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${site.url}/#person`,
    name: site.name,
    jobTitle: site.role,
    description: site.summary,
    url: site.url,
    image: new URL("/opengraph-image", site.url).toString(),
    email: site.email,
    address: {
      "@type": "PostalAddress",
      addressLocality: site.location,
    },
    knowsAbout,
    sameAs: [site.links.github, site.links.linkedin],
  };

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6">
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Hero />
      <SkillsSection />
      <ExperienceSection />
      <ProjectsSection />
      <WritingPreview posts={posts} />
    </div>
  );
}
