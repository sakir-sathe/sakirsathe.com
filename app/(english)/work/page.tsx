import { WorkPage } from "@/components/shared-pages";
import { pageMetadata } from "@/lib/utils";

const intro = "A selection of complex systems and engineering problems I've worked on across enterprise software, cloud platforms, data and AI.";
export const metadata = pageMetadata({ title: "Selected Engineering Work", description: intro, path: "/work" });

export default function Page() {
  return <WorkPage locale="en" />;
}
