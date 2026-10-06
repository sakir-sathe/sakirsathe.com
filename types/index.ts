export interface Capability {
  id: string;
  index: string;
  title: string;
  summary: string;
  technologies: string[];
}

export interface CaseStudySection {
  heading: string;
  body: string;
  /** Sanitized conceptual flow, never an internal system diagram. */
  flow?: string[];
}

export interface CaseStudy {
  slug: string;
  index: string;
  title: string;
  systemType: string;
  domain: string;
  summary: string;
  technologies: string[];
  /** Neutral, category-level themes. Never personal outcomes or metrics. */
  themes: string[];
  /** Whether the long-form narrative has been editorially approved. */
  narrativeStatus: "pending" | "published";
  sections: CaseStudySection[];
}

export type ProjectStatus = "planned" | "in-development" | "preview" | "released" | "archived";

export interface Project {
  name: string;
  slug: string;
  description: string;
  status: ProjectStatus;
  githubUrl: string | null;
  technologies: string[];
  featured: boolean;
  published: boolean;
}

export interface LabArea {
  id: string;
  title: string;
  description: string;
  tags: string[];
}

export interface PostFrontmatter {
  title: string;
  description: string;
  date: string;
  updated?: string;
  tags: string[];
  published: boolean;
  featured: boolean;
}

export interface Post extends PostFrontmatter {
  slug: string;
  content: string;
  readingMinutes: number;
}

export interface SocialLink {
  label: string;
  /** Exact profile URL. null until configured. */
  url: string | null;
}
