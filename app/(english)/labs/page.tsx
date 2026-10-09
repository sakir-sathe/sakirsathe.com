import { LabsPage } from "@/components/shared-pages";
import { labsDescription } from "@/data/labs";
import { pageMetadata } from "@/lib/utils";

export const metadata = pageMetadata({ title: "Labs", description: labsDescription, path: "/labs" });

export default function Page() {
  return <LabsPage locale="en" />;
}
