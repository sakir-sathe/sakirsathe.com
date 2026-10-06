import type { MetadataRoute } from "next";
import { site } from "@/data/site";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/open-source/__none", "/writing/__none"] }],
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
