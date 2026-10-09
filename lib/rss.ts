import { getDictionary } from "@/lib/i18n/dictionary";
import { localizePath, type Locale } from "@/lib/i18n/locales";
import { getPublishedPosts } from "@/lib/writing";
import { absoluteUrl } from "@/lib/utils";

const esc = (value: string) => value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

export function generateRss(locale: Locale): Response {
  const feed = getDictionary(locale).feed;
  const feedPath = localizePath("/rss.xml", locale);
  const writingPath = localizePath("/writing", locale);
  const items = getPublishedPosts(locale)
    .map((post) => `    <item>
      <title>${esc(post.title)}</title>
      <link>${post.canonicalUrl}</link>
      <guid isPermaLink="true">${post.canonicalUrl}</guid>
      <description>${esc(post.description)}</description>
      <pubDate>${new Date(`${post.date}T00:00:00Z`).toUTCString()}</pubDate>
${post.tags.map((tag) => `      <category>${esc(tag)}</category>`).join("\n")}
    </item>`)
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${esc(feed.title)}</title>
    <link>${absoluteUrl(writingPath)}</link>
    <description>${esc(feed.description)}</description>
    <language>${locale}</language>
    <atom:link href="${absoluteUrl(feedPath)}" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>
`;
  return new Response(xml, { headers: { "Content-Type": "application/rss+xml; charset=utf-8" } });
}
