import { OpenSourcePage } from "@/components/shared-pages";
import { pageMetadata } from "@/lib/utils";

const intro = "Developer tools and experiments built around real engineering problems.";
export const metadata = pageMetadata({ title: "Open Source", description: intro, path: "/open-source" });

export default function Page() {
  return <OpenSourcePage locale="en" />;
}
