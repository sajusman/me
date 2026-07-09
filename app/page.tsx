import { getAllPosts } from "@/lib/posts";
import { Hero } from "@/components/features/home/hero";
import { SkillsSection } from "@/components/features/home/skills-section";
import { ExperienceSection } from "@/components/features/home/experience-section";
import { ProjectsSection } from "@/components/features/home/projects-section";
import { WritingPreview } from "@/components/features/home/writing-preview";

export default function Home() {
  const posts = getAllPosts().slice(0, 3);

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6">
      <Hero />
      <SkillsSection />
      <ExperienceSection />
      <ProjectsSection />
      <WritingPreview posts={posts} />
    </div>
  );
}
