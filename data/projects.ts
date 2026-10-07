import type { Project } from "@/types";

/**
 * Open-source projects. Only `published: true` entries are rendered,
 * listed, statically exported, or included in the sitemap.
 * Never add stars, downloads or usage numbers that are not real.
 */
export const projects: Project[] = [
  {
    name: "Cubiscan Serial Driver",
    slug: "cubiscan-serial-driver",
    description: "A lightweight .NET integration for reading dimensions and weight from Cubiscan devices over serial/RS-232 connections.",
    status: "public",
    githubUrl: "https://github.com/sakir-sathe/cubiscan-serial-driver",
    githubCtaLabel: "View on GitHub",
    hasDetailPage: false,
    technologies: [".NET", "Hardware Integration", "Serial", "RS-232"],
    featured: false,
    published: true,
  },
  {
    name: "sakirsathe.com",
    slug: "sakirsathe-com",
    description: "The open-source codebase behind this site, built as a statically exported Next.js application with MDX content and Azure Static Web Apps deployment.",
    status: "public",
    githubUrl: "https://github.com/sakir-sathe/sakirsathe.com",
    githubCtaLabel: "View source",
    hasDetailPage: false,
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "MDX", "Azure"],
    featured: false,
    published: true,
  },
  {
    name: "Cubiscan.Net",
    slug: "cubiscan-net",
    description: ".NET library for communicating with dimensioning devices.",
    status: "planned",
    githubUrl: null,
    technologies: ["C#", ".NET"],
    featured: true,
    published: false,
  },
  {
    name: "OpenScanBridge",
    slug: "openscanbridge",
    description: "Bridge between scanning hardware and modern applications.",
    status: "planned",
    githubUrl: null,
    technologies: [".NET"],
    featured: false,
    published: false,
  },
  {
    name: "DotNetAgentBench",
    slug: "dotnetagentbench",
    description: "Benchmark for evaluating coding agents on .NET tasks.",
    status: "planned",
    githubUrl: null,
    technologies: [".NET", "AI agents"],
    featured: true,
    published: false,
  },
  {
    name: "SolutionLens",
    slug: "solutionlens",
    description: "Tooling for understanding the structure of .NET solutions.",
    status: "planned",
    githubUrl: null,
    technologies: [".NET", "Roslyn"],
    featured: false,
    published: false,
  },
  {
    name: "RagLite",
    slug: "raglite",
    description: "Lightweight retrieval-augmented generation building blocks.",
    status: "planned",
    githubUrl: null,
    technologies: ["RAG", ".NET"],
    featured: false,
    published: false,
  },
];

export function getPublishedProjects(): Project[] {
  return projects.filter((p) => p.published);
}

export function getPublishedProjectsWithDetailPages(): Project[] {
  return getPublishedProjects().filter((p) => p.hasDetailPage !== false);
}

export function getPublishedProject(slug: string): Project | undefined {
  return getPublishedProjects().find((p) => p.slug === slug);
}
