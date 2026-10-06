import type { MetadataRoute } from "next";
import { caseStudies } from "@/data/work";
import { getPublishedProjects } from "@/data/projects";
import { getPublishedPosts } from "@/lib/writing";
import { absoluteUrl } from "@/lib/utils";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["/", "/engineering", "/work", "/open-source", "/writing", "/labs", "/about"];
  return [
    ...pages.map((p) => ({ url: absoluteUrl(p), changeFrequency: "monthly" as const, priority: p === "/" ? 1 : 0.7 })),
    ...caseStudies.map((c) => ({ url: absoluteUrl(`/work/${c.slug}`), priority: 0.6 })),
    ...getPublishedProjects().map((p) => ({ url: absoluteUrl(`/open-source/${p.slug}`), priority: 0.6 })),
    ...getPublishedPosts().map((p) => ({ url: absoluteUrl(`/writing/${p.slug}`), lastModified: p.updated ?? p.date, priority: 0.6 })),
  ];
}
