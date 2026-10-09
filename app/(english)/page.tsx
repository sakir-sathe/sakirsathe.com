import { HomePage } from "@/components/shared-pages";
import { pageMetadata } from "@/lib/utils";

export const metadata = pageMetadata({ path: "/" });

export default function Page() {
  return <HomePage locale="en" />;
}
