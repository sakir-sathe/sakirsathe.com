import { EngineeringPage } from "@/components/shared-pages";
import { engineeringIntro } from "@/data/engineering";
import { pageMetadata } from "@/lib/utils";

export const metadata = pageMetadata({ title: "Engineering", description: engineeringIntro, path: "/engineering" });

export default function Page() {
  return <EngineeringPage locale="en" />;
}
