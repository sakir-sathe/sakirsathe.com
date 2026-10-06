import type { SocialLink } from "@/types";

const siteName = "Sakir Sathe";
const siteDomain = "sakirsathe.com";
const siteJobTitle = "Lead Full Stack .NET Engineer";

export const site = {
  name: siteName,
  domain: siteDomain,
  url: `https://${siteDomain}`,
  title: `${siteName} — .NET, Azure & AI Engineering`,
  description:
    `Software engineering, .NET, Azure, AI, architecture, developer tooling and open-source projects by ${siteName}.`,
  email: "sakirsathe@gmail.com",
  location: "Costa Rica",
  countryCode: "CR",
  headline: "Software Engineer · Technical Lead · Builder",
  roleSummary: "software engineer and technical lead",
  jobTitle: siteJobTitle,
  roles: [siteJobTitle, "Technical Lead", "Software Architect", "Open-Source Builder", "Technical Writer"],
  locale: "en_US",
} as const;

export const giscus: {
  enabled: boolean;
  repo: string;
  repoId: string;
  category: string;
  categoryId: string;
} = {
  enabled: false,
  repo: "",
  repoId: "",
  category: "",
  categoryId: "",
} as const;

/** Public profile URLs used by the header, footer, and structured metadata. */
export const social: { github: SocialLink; linkedin: SocialLink } = {
  github: {
    label: "GitHub",
    url: "https://github.com/sakir-sathe",
  },
  linkedin: {
    label: "LinkedIn",
    url: "https://www.linkedin.com/in/sakir-sathe-6777649a/",
  },
};

export function socialHref(link: SocialLink): string | undefined {
  return link.url ?? undefined;
}

export function socialTitle(link: SocialLink): string {
  return link.url ? `${link.label} profile` : `${link.label} — profile link not configured`;
}

export const nav = [
  { href: "/engineering", label: "Engineering" },
  { href: "/work", label: "Work" },
  { href: "/open-source", label: "Open Source" },
  { href: "/writing", label: "Writing" },
  { href: "/labs", label: "Labs" },
  { href: "/about", label: "About" },
] as const;
