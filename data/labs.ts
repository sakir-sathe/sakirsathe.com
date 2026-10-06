import type { LabArea } from "@/types";

export const labsDescription =
  "Experiments, benchmarks and ideas that are useful even when they do not become full projects.";

export const labAreas: LabArea[] = [
  { id: "ai-experiments", title: "AI experiments", description: "Small, focused tests of model behaviour, prompting and tool use.", tags: ["LLM", "Tool use"] },
  { id: "dotnet-benchmarks", title: ".NET benchmarks", description: "Measuring runtime, library and pattern choices instead of guessing.", tags: ["BenchmarkDotNet", "Performance"] },
  { id: "rag-experiments", title: "RAG experiments", description: "Chunking, ranking and grounding strategies compared side by side.", tags: ["Retrieval", "Evaluation"] },
  { id: "agent-evaluation", title: "Coding-agent evaluation", description: "How well coding agents handle real-world .NET codebases and tasks.", tags: ["Agents", "Benchmarks"] },
  { id: "architecture-prototypes", title: "Architecture prototypes", description: "Throwaway systems built to test a design idea before committing to it.", tags: ["Design", "Prototypes"] },
  { id: "developer-tooling", title: "Developer tooling", description: "Utilities that remove friction from everyday engineering work.", tags: ["CLI", "Automation"] },
];
