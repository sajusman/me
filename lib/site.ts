import type { SkillGroup, Experience, Project } from "@/types/site";

export const site = {
  name: "Usman Sajjad",
  role: "Senior Software Engineer",
  url: "https://sajusman.vercel.app",
  location: "Berlin, Germany",
  email: "usmansajjad21@gmail.com",
  phone: "+49 1573 2291652",
  tagline:
    "building high-impact, cross-platform products with a focus on scalability, performance, and user experience.",
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

export const skills: SkillGroup[] = [
  {
    label: "Backend",
    items: [
      "NodeJs",
      "Java",
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

export const experience: Experience[] = [
  {
    company: "Faircado",
    role: "Senior Software Engineer (Node / React)",
    period: "Oct 2024 Present",
    location: "Onsite · Berlin, Germany",
    highlights: [
      "Built and scaled Faircado's cross-platform consumer app in React Native (Expo), growing from 5K browser-extension users to 500K+ registered users across mobile and web.",
      "Designed and operated event-driven backend services on AWS (Lambda, API Gateway, SQS), processing critical business workflows such as checkout, tracking, and promotions with reliable and scalable distributed execution.",
      "Designed a shared codebase architecture across iOS, Android, and web, enabling ~80% code reuse with a native-first flow and minimal platform-specific divergence.",
      "Owned the visual search experience end to end, building Pinterest-inspired image discovery flows with custom image cropping, object selection, and Hugging Face powered object detection to help users find relevant products more intuitively.",
      "Developed a Strapi-powered CMS-driven homepage, enabling dynamic content updates, experimentation, and faster product iterations.",
      "Established analytics tracking and success metrics across product flows using Mixpanel, creating dashboards that enabled product to evaluate experiments, identify drop-offs, and prioritize improvements based on user engagement data.",
    ],
  },
  {
    company: "Spekit",
    role: "Software Engineer (Django / React)",
    period: "Feb 2022 Sept 2024",
    location: "Remote · Denver, Colorado",
    highlights: [
      "Worked on a just-in-time learning platform and Chrome extension that delivers contextual training directly within users' workflows.",
      "Revamped Spekit's Flows experience, enabling admins to create and configure browser-based workflows directly from the extension by selecting page elements and defining actions. Improved Shadow DOM handling, admin configuration UX, and error visibility to make Flows more reliable and intuitive, increasing feature willingness from 16% to 86%, ease of use from 8% to 100%, and reducing churn risk for $1M+ ARR customers.",
      "Advocated for incremental refactoring within development, reducing technical debt while migrating legacy React code toward modern patterns, improving maintainability, developer experience, and long-term scalability.",
      "Built a Design System in ChakraUI documented via Storybook, accelerating delivery velocity across squads by 40%.",
    ],
  },
  {
    company: "MK Consulting",
    role: "Front End Engineer (React / Next.js)",
    period: "Jul 2021 Mar 2022",
    location: "Remote · Sydney, Australia",
    highlights: [
      "Worked on an e-commerce platform connecting dealers with vehicle-related products and services.",
      "Spearheaded a micro-frontends architecture that let each service be developed and deployed independently, reducing conflicts and improving throughput.",
    ],
  },
  {
    company: "TimeXperts",
    role: "Software Engineer (Java)",
    period: "May 2021 Jan 2022",
    location: "Remote",
    highlights: [
      "Migrated the platform from legacy APIs to a newer API architecture, modernizing integrations while keeping the system stable throughout the transition.",
    ],
  },
  {
    company: "Auriga Solutions",
    role: "Junior Software Engineer (.NET / Vue 2)",
    period: "Oct 2020 May 2021",
    location: "Karachi, Pakistan",
    highlights: [
      "Contributed to an ERP web solution for a US-based company, improving site performance and adapting business flows to evolving client requirements.",
      "Implemented real-time updates and validations along with a role-based access system to keep workflows accurate and secure across users.",
    ],
  },
];

export const projects: Project[] = [
  {
    name: "Onebeat",
    context: "Remotebase Hackfest",
    award: "3rd Place Winner",
    description:
      "A healthcare coordination platform enabling hospital-to-hospital patient transfers and HIPAA-compliant medical record handling.",
  },
];
