export type SkillGroup = {
  label: string;
  items: string[];
};

export type Experience = {
  company: string;
  role: string;
  period: string;
  location: string;
  highlights: string[];
};

export type Project = {
  name: string;
  context: string;
  award?: string;
  description: string;
  url?: string;
};
