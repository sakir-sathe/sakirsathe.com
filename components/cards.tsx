import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Capability, CaseStudy, LabArea, Post, Project } from "@/types";
import { Tag } from "@/components/ui";
import { formatDate } from "@/lib/utils";

export function CapabilityCard({ c }: { c: Capability }) {
  return (
    <article className="relative flex flex-col bg-bg px-6 py-5 sm:p-7">
      <div className="flex items-center justify-between">
        <span className="font-mono text-[11px] text-accent">{c.index}</span>
        <span className="h-px w-8 bg-line-strong" aria-hidden="true" />
      </div>
      <h3 className="mt-8 text-[17px] font-medium tracking-tight">{c.title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted">{c.summary}</p>
      <p className="mt-6 font-mono text-[11.5px] leading-[1.9] text-subtle">
        {c.technologies.join("  /  ")}
      </p>
    </article>
  );
}

export function CaseStudyRow({ c }: { c: CaseStudy }) {
  return (
    <Link href={`/work/${c.slug}`} className="group grid gap-3 border-b border-line py-7 transition-colors md:grid-cols-[110px_1fr_1fr_24px] md:items-baseline md:gap-8">
      <span className="font-mono text-[11px] text-subtle transition-colors group-hover:text-accent">{c.index}</span>
      <div>
        <h3 className="text-[19px] font-medium tracking-tight transition-transform duration-300 group-hover:translate-x-1">{c.title}</h3>
        <p className="meta mt-2">{c.systemType}</p>
        <p className="mt-3 text-sm text-accent">View case study <span aria-hidden="true">→</span></p>
      </div>
      <div className="flex flex-wrap gap-1.5">
        {c.technologies.slice(0, 6).map((t) => <Tag key={t}>{t}</Tag>)}
      </div>
      <ArrowUpRight className="hidden size-4 text-subtle transition-all duration-300 group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 md:block" aria-hidden="true" />
    </Link>
  );
}

export function ProjectCard({ p }: { p: Project }) {
  return (
    <Link href={`/open-source/${p.slug}`} className="ticks group block border border-line bg-raised p-6 transition-colors hover:border-line-strong">
      <div className="flex items-center justify-between">
        <h3 className="font-mono text-[15px] text-fg">{p.name}</h3>
        <span className="meta">{p.status.replace("-", " ")}</span>
      </div>
      <p className="mt-3 text-sm leading-relaxed text-muted">{p.description}</p>
      <div className="mt-5 flex flex-wrap gap-1.5">{p.technologies.map((t) => <Tag key={t}>{t}</Tag>)}</div>
    </Link>
  );
}

export function PostRow({ p }: { p: Post }) {
  return (
    <Link href={`/writing/${p.slug}`} className="group grid gap-2 border-b border-line py-6 md:grid-cols-[140px_1fr] md:gap-8">
      <div className="flex flex-wrap gap-x-3 gap-y-1 font-mono text-[12px] text-subtle">
        <time dateTime={p.date}>{formatDate(p.date)}</time>
        <span>{p.readingTime} min read</span>
      </div>
      <div>
        <h3 className="text-[18px] font-medium tracking-tight group-hover:text-accent">{p.title}</h3>
        <p className="mt-1.5 text-sm leading-relaxed text-muted">{p.description}</p>
        <div className="mt-3 flex flex-wrap gap-1.5">{p.tags.map((tag) => <Tag key={tag}>{tag}</Tag>)}</div>
      </div>
    </Link>
  );
}

export function LabCard({ l, i }: { l: LabArea; i: number }) {
  return (
    <article className="relative bg-bg p-6">
      <p className="font-mono text-[11px] text-subtle">LAB/{String(i + 1).padStart(2, "0")}</p>
      <h3 className="mt-6 text-[16px] font-medium tracking-tight">{l.title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted">{l.description}</p>
      <div className="mt-5 flex flex-wrap gap-1.5">{l.tags.map((t) => <Tag key={t}>{t}</Tag>)}</div>
    </article>
  );
}
