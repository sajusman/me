export const site = {
  name: "Usman Sajjad",
  role: "Senior Software Engineer",
  location: "Berlin, Germany",
  email: "usmansajjad21@gmail.com",
  phone: "+49 1573 2291652",
  tagline:
    "I build cross-platform consumer products end to end — from a 5K browser extension to 300K+ users across mobile and web.",
  summary:
    "Senior software engineer with a bias for shipping. I've taken products from zero to real revenue, built shared codebases that run natively on iOS, Android, and web, and levelled up fast by owning ambiguous problems alongside design and delivery.",
  links: {
    github: "https://github.com/sajusman",
    linkedin: "https://linkedin.com/in/usman-sajjad",
    email: "mailto:usmansajjad21@gmail.com",
  },
} as const;

export const navItems = [
  { href: "/", label: "Home" },
  { href: "/#experience", label: "Experience" },
  { href: "/#projects", label: "Projects" },
  { href: "/blog", label: "Writing" },
] as const;

export type SkillGroup = {
  label: string;
  items: string[];
};

export const skills: SkillGroup[] = [
  {
    label: "Backend",
    items: [
      "ExpressJs",
      "Django",
      "FastAPI",
      "Springboot",
      "Kotlin",
      "MongoDB",
      "PostgreSQL",
      "Algolia",
      "Typesense",
      "Redis",
      "RabbitMQ",
      "S3",
      "Firestore",
      "Elasticsearch",
      "Lambda Functions",
      "API Gateway",
    ],
  },
  {
    label: "Frontend",
    items: [
      "React (TypeScript)",
      "React Native",
      "Next.js",
      "Expo",
      "Redux Toolkit",
      "React Query",
      "React Hook Form",
      "Chrome Extensions (MV2/MV3)",
      "Jest",
      "React Testing Library",
      "Playwright",
      "Lerna",
      "Storybook",
      "ChakraUI",
      "MaterialUI",
      "SCSS",
      "Styled Components",
      "Vue 2",
      "Vite",
      "Webpack",
    ],
  },
  {
    label: "Tooling & Ops",
    items: [
      "Figma",
      "Strapi",
      "Mixpanel",
      "Crashlytics",
      "Docker",
      "Grafana",
      "Sentry",
      "Nginx",
      "Jira",
      "Git",
      "CI/CD",
    ],
  },
];

export type Experience = {
  company: string;
  role: string;
  period: string;
  location: string;
  highlights: string[];
};

export const experience: Experience[] = [
  {
    company: "Faircado",
    role: "Senior Software Engineer (Node / React)",
    period: "Oct 2024 — Present",
    location: "Onsite · Berlin, Germany",
    highlights: [
      "Built and scaled Faircado's cross-platform consumer app in React Native (Expo), growing from 5K browser-extension users to 300K+ registered users across mobile and web.",
      "Designed a shared codebase architecture across iOS, Android, and web, enabling ~80% code reuse with a native-first flow and minimal platform-specific divergence.",
      "Owned the visual search experience end to end — custom image cropping, object selection, and Hugging Face–powered object detection — driving 25% higher retention among image-search users.",
      "Contributed to onboarding, search, and checkout, helping scale the initial monetization funnel from $0 to ~$30K monthly in-app purchase revenue.",
      "Raised engineering quality through CI/CD, testing infrastructure, and frontend performance work across web and mobile.",
    ],
  },
  {
    company: "Spekit",
    role: "Software Engineer (Django / React)",
    period: "Feb 2022 — Sept 2024",
    location: "Remote · Denver, Colorado",
    highlights: [
      "Built a just-in-time learning platform and Chrome extension that surfaces training directly inside the user's workflow.",
      "Implemented vector and OpenAI embeddings–based search to match queries with training material — a 20% boost in effectiveness measured by surveys.",
      "Revamped cross-platform features driving $1M+ in ARR; willingness to use rose from 16% to 86% and ease of use from 8% to 100%.",
      "Built a Design System in ChakraUI documented via Storybook, accelerating delivery velocity across squads by 40%.",
      "Refactored the legacy codebase — functional React, better error UX, JS → TypeScript — improving maintainability and speeding development by 80%.",
      "Mentored new joiners to ramp faster and integrate with the team.",
    ],
  },
  {
    company: "MK Consulting",
    role: "Front End Engineer · Part-Time",
    period: "Jul 2021 — Mar 2022",
    location: "Remote · Sydney, Australia",
    highlights: [
      "Worked on an e-commerce platform connecting dealers with vehicle-related products and services.",
      "Spearheaded a micro-frontends architecture that let each service be developed and deployed independently, reducing conflicts and improving throughput.",
    ],
  },
];

export type Project = {
  name: string;
  context: string;
  award?: string;
  description: string;
};

export const projects: Project[] = [
  {
    name: "Onebeat",
    context: "Remotebase Hackfest",
    award: "3rd Place Winner",
    description:
      "A healthcare coordination platform enabling hospital-to-hospital patient transfers and HIPAA-compliant medical record handling.",
  },
];
