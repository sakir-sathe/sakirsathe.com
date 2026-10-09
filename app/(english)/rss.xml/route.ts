import { generateRss } from "@/lib/rss";

export const dynamic = "force-static";

export function GET() {
  return generateRss("en");
}
