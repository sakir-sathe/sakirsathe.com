import type { Locale } from "@/lib/i18n/locales";

export interface Capability {
  id: string;
  index: string;
  title: string;
  summary: string;
  technologies: string[];
}

export interface WorkSection {
  heading: string;
  body: string;
  /** Sanitized conceptual flow, never an internal system diagram. */
  flow?: readonly string[];
}

export interface WorkContent {
  title: string;
  systemType: string;
  domain: string;
  summary: string;
  themes: readonly string[];
  sections: readonly WorkSection[];
}

export interface WorkRecord {
  id: string;
  slug: string;
  index: string;
  technologies: readonly string[];
  /** Whether the long-form narrative has been editorially approved. */
  narrativeStatus: "pending" | "published";
  content: Record<Locale, WorkContent>;
}

export type CaseStudy = WorkRecord;

export type ProjectStatus = "planned" | "in-development" | "preview" | "released" | "archived" | "public";

export interface Project {
  name: string;
  slug: string;
  description: string;
  status: ProjectStatus;
  githubUrl: string | null;
  githubCtaLabel?: string;
  hasDetailPage?: boolean;
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
  locale: Locale;
  translationKey: string;
  translationSourceHash?: string;
  updated?: string;
  tags: string[];
  published: boolean;
  featured: boolean;
  image?: string;
  imageAlt?: string;
}

export interface Post extends PostFrontmatter {
  slug: string;
  content: string;
  readingTime: number;
  canonicalUrl: string;
  sourceHash: string;
}

export interface SocialLink {
  label: string;
  /** Exact profile URL. null until configured. */
  url: string | null;
}
