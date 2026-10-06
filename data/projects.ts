import type { Project } from "@/types";

/**
 * Open-source projects. Only `published: true` entries are rendered,
 * listed, statically exported, or included in the sitemap.
 * Never add stars, downloads or usage numbers that are not real.
 */
export const projects: Project[] = [
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

export function getPublishedProject(slug: string): Project | undefined {
  return getPublishedProjects().find((p) => p.slug === slug);
}
