"use client";

import { usePathname } from "next/navigation";
import { getDictionary } from "@/lib/i18n/dictionary";
import { getLocaleFromPath } from "@/lib/i18n/locales";

export function SkipLink() {
  const locale = getLocaleFromPath(usePathname() ?? "/");
  return <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:bg-raised focus:px-3 focus:py-2 focus:text-sm">{getDictionary(locale).common.skipToContent}</a>;
}