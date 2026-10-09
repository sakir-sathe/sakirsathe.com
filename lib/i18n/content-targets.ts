import type { Locale } from "@/lib/i18n/locales";

type LocaleTargets = Partial<Record<Locale, string>>;

/** Client-safe route identity index; validate:i18n checks it against published Work and Writing content. */
export const localeContentTargets = {
  work: {
    "enterprise-digital-records-platform": { en: "enterprise-digital-records-platform", es: "enterprise-digital-records-platform", hi: "enterprise-digital-records-platform" },
    "geospatial-intelligence-platform": { en: "geospatial-intelligence-platform", es: "geospatial-intelligence-platform", hi: "geospatial-intelligence-platform" },
    "ai-help-desk-knowledge-assistant": { en: "ai-help-desk-knowledge-assistant", es: "ai-help-desk-knowledge-assistant", hi: "ai-help-desk-knowledge-assistant" },
    "enterprise-search-ai-data-access": { en: "enterprise-search-ai-data-access", es: "enterprise-search-ai-data-access", hi: "enterprise-search-ai-data-access" },
    "reporting-data-pipeline-modernization": { en: "reporting-data-pipeline-modernization", es: "reporting-data-pipeline-modernization", hi: "reporting-data-pipeline-modernization" },
    "cross-platform-product-ai-platform": { en: "cross-platform-product-ai-platform", es: "cross-platform-product-ai-platform", hi: "cross-platform-product-ai-platform" },
    "enterprise-appraisal-workflow-platform": { en: "enterprise-appraisal-workflow-platform", es: "enterprise-appraisal-workflow-platform", hi: "enterprise-appraisal-workflow-platform" },
    "complex-product-configuration-platform": { en: "complex-product-configuration-platform", es: "complex-product-configuration-platform", hi: "complex-product-configuration-platform" },
  },
  writing: {
    "moving-to-costa-rica-what-id-tell-someone-coming-from-india-or-the-us": {
      en: "moving-to-costa-rica-what-id-tell-someone-coming-from-india-or-the-us",
      es: "moving-to-costa-rica-what-id-tell-someone-coming-from-india-or-the-us",
      hi: "moving-to-costa-rica-what-id-tell-someone-coming-from-india-or-the-us",
    },
    "rag-mcp-agents-microsoft-foundry-what-do-you-actually-need": {
      en: "rag-mcp-agents-microsoft-foundry-what-do-you-actually-need",
      es: "rag-mcp-agents-microsoft-foundry-what-do-you-actually-need",
      hi: "rag-mcp-agents-microsoft-foundry-what-do-you-actually-need",
    },
    "testing-cubiscan-integrations-without-hardware": {
      en: "testing-cubiscan-integrations-without-hardware",
      es: "testing-cubiscan-integrations-without-hardware",
      hi: "testing-cubiscan-integrations-without-hardware",
    },
  },
} satisfies {
  work: Record<string, LocaleTargets>;
  writing: Record<string, LocaleTargets>;
};

export type LocaleContentTargets = typeof localeContentTargets;
