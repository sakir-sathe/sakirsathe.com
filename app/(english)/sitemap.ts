import type { MetadataRoute } from "next";
import { getPublishedWork } from "@/data/work";
import { getPublishedProjectsWithDetailPages } from "@/data/projects";
import { getPublishedPosts } from "@/lib/writing";
import { absoluteUrl } from "@/lib/utils";
import { getLanguageAlternates } from "@/lib/i18n/seo";

export const dynamic = "force-static";

function translatedEntries(path: string, options: { changeFrequency?: "monthly"; priority: number; lastModified?: string } ): MetadataRoute.Sitemap {
  const languages = getLanguageAlternates(path);
  const entries = Object.entries(languages).filter(([locale]) => locale !== "x-default");
  if (!entries.length) return [{ url: absoluteUrl(path), ...options }];
  return entries.map(([, url]) => ({ url, ...options, alternates: { languages } }));
}

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["/", "/engineering", "/work", "/open-source", "/writing", "/labs", "/about"];
  return [
    ...pages.flatMap((page) => translatedEntries(page, { changeFrequency: "monthly", priority: page === "/" ? 1 : 0.7 })),
    ...getPublishedWork().flatMap((work) => translatedEntries(`/work/${work.slug}`, { priority: 0.6 })),
    ...getPublishedProjectsWithDetailPages().flatMap((project) => translatedEntries(`/open-source/${project.slug}`, { priority: 0.6 })),
    ...getPublishedPosts("en").flatMap((post) => translatedEntries(`/writing/${post.slug}`, { lastModified: post.updated ?? post.date, priority: 0.6 })),
  ];
}
