import { AboutPage } from "@/components/shared-pages";
import { site } from "@/data/site";
import { pageMetadata } from "@/lib/utils";

export const metadata = pageMetadata({ title: "About", description: `${site.name} — ${site.roleSummary} based in ${site.location}.`, path: "/about" });

export default function Page() {
  return <AboutPage locale="en" />;
}
