import { load } from "js-yaml";

const FRONTMATTER = /^---[ \t]*\r?\n([\s\S]*?)\r?\n---[ \t]*(?:\r?\n|$)/;

export function parseMdxFrontmatter(source: string, filename: string) {
  const match = FRONTMATTER.exec(source);
  if (!match) {
    throw new Error(`${filename}: expected YAML frontmatter delimited by --- at the start of the file.`);
  }

  let data: unknown;
  try {
    data = load(match[1] ?? "");
  } catch (error) {
    const detail = error instanceof Error ? error.message : String(error);
    throw new Error(`${filename}: invalid YAML frontmatter: ${detail}`);
  }

  if (!data || typeof data !== "object" || Array.isArray(data)) {
    throw new Error(`${filename}: frontmatter must be a YAML mapping.`);
  }

  return {
    data: data as Record<string, unknown>,
    content: source.slice(match[0].length),
  };
}