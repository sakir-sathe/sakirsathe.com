import { site } from "@/data/site";
import { getPublishedPosts } from "@/lib/writing";
import { absoluteUrl } from "@/lib/utils";

export const dynamic = "force-static";

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

export function GET() {
  const items = getPublishedPosts()
    .map((p) => `    <item>
      <title>${esc(p.title)}</title>
      <link>${absoluteUrl(`/writing/${p.slug}`)}</link>
      <guid isPermaLink="true">${absoluteUrl(`/writing/${p.slug}`)}</guid>
      <description>${esc(p.description)}</description>
      <pubDate>${new Date(`${p.date}T00:00:00Z`).toUTCString()}</pubDate>
${p.tags.map((t) => `      <category>${esc(t)}</category>`).join("\n")}
    </item>`)
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${esc(site.name)} — Writing</title>
    <link>${site.url}/writing</link>
    <description>${esc(site.description)}</description>
    <language>en</language>
    <atom:link href="${site.url}/rss.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>
`;
  return new Response(xml, { headers: { "Content-Type": "application/rss+xml; charset=utf-8" } });
}
