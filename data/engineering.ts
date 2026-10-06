import type { Capability } from "@/types";

export const engineeringIntro =
  "I enjoy engineering problems that cross boundaries — application architecture, backend systems, cloud infrastructure, data, search, AI and developer experience.";

export const capabilities: Capability[] = [
  {
    id: "dotnet-backend",
    index: "01",
    title: ".NET & Backend Engineering",
    summary: "Service design, APIs and the background work that keeps systems moving.",
    technologies: ["C#", ".NET", "ASP.NET Core", "EF Core", "REST", "gRPC", "Background processing", "Microservices"],
  },
  {
    id: "cloud-azure",
    index: "02",
    title: "Cloud & Azure",
    summary: "Hosting, identity, secrets, telemetry and delivery on the Azure platform.",
    technologies: ["Azure App Service", "Functions", "Storage", "Key Vault", "Managed Identity", "Application Insights", "Azure DevOps"],
  },
  {
    id: "ai-search",
    index: "03",
    title: "AI, Search & Retrieval",
    summary: "Grounding language models in real data through search and retrieval.",
    technologies: ["Azure OpenAI", "Azure AI Search", "Semantic search", "Vector search", "RAG", "MCP", "AI agents"],
  },
  {
    id: "data-integration",
    index: "04",
    title: "Data & Integration",
    summary: "Moving, shaping and reporting on data between systems.",
    technologies: ["SQL Server", "Azure Data Factory", "ETL", "SSIS", "Fabric", "Power BI", "REST", "GraphQL"],
  },
  {
    id: "frontend",
    index: "05",
    title: "Frontend Engineering",
    summary: "Interfaces for data-heavy, workflow-driven applications.",
    technologies: ["Blazor", "React", "Angular", "TypeScript"],
  },
  {
    id: "leadership",
    index: "06",
    title: "Technical Leadership",
    summary: "Design decisions, review culture and keeping production healthy.",
    technologies: ["Architecture", "Technical design", "Code review", "Mentoring", "CI/CD", "Production support", "Root-cause analysis"],
  },
];

export const principles = [
  { k: "Understand beneath the abstraction", v: "Frameworks are leverage, not explanations. Knowing what happens one layer down is what makes the hard bugs tractable." },
  { k: "Design for the operator", v: "A system is finished when the person on call at 3am can understand it, not when the last test passes." },
  { k: "Prefer boring boundaries", v: "Clear contracts between components age better than clever coupling." },
  { k: "Turn solutions into tools", v: "When a problem shows up twice, it is worth making the third time cheaper." },
];

export const problemAreas = [
  { title: "Developer Infrastructure", description: "Tools that remove repetitive engineering work and make systems easier to test, understand and operate." },
  { title: "AI-Native Software", description: "Practical ways of combining software engineering, retrieval, agents and language models without sacrificing reliability." },
  { title: "Enterprise Modernization", description: "Turning complex or legacy systems into maintainable, observable and automated platforms." },
  { title: "System Integration", description: "Connecting APIs, data platforms, cloud services, enterprise systems and physical devices." },
  { title: "Architecture & Reliability", description: "Understanding how systems behave in production and designing them to fail less often." },
];
