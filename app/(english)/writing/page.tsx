import { WritingPage } from "@/components/shared-pages";
import { pageMetadata } from "@/lib/utils";

const intro = "Essays and notes on software engineering, AI, architecture, open source, career, building products, travel, and things I learn along the way.";
export const metadata = pageMetadata({ title: "Writing", description: intro, path: "/writing" });

export default function Page() {
  return <WritingPage locale="en" />;
}
