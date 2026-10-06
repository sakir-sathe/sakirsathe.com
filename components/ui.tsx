import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function Container({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("mx-auto max-w-6xl px-5 sm:px-8", className)}>{children}</div>;
}

export function SectionHeading({ index, label, title, intro, action }: { index: string; label: string; title: string; intro?: string; action?: { href: string; label: string } }) {
  return (
    <div className="grid gap-6 border-t border-line pt-6 md:grid-cols-[180px_1fr] md:gap-10">
      <p className="meta flex items-center gap-2"><span className="text-accent">{index}</span><span className="h-px w-4 bg-line-strong" aria-hidden="true" />{label}</p>
      <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div className="max-w-2xl">
          <h2 className="text-[clamp(1.6rem,3.2vw,2.25rem)] font-medium leading-[1.12] tracking-[-0.025em] text-balance">{title}</h2>
          {intro && <p className="mt-4 text-[15.5px] leading-relaxed text-muted text-pretty">{intro}</p>}
        </div>
        {action && <TextLink href={action.href}>{action.label}</TextLink>}
      </div>
    </div>
  );
}

export function TextLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link href={href} className="group inline-flex shrink-0 items-center gap-1.5 text-sm text-fg">
      <span className="link-underline">{children}</span>
      <ArrowUpRight className="size-3.5 text-accent transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
    </Link>
  );
}

export function Tag({ children }: { children: ReactNode }) {
  return <span className="inline-flex items-center rounded-[3px] border border-line px-1.5 py-0.5 font-mono text-[11px] leading-4 text-muted">{children}</span>;
}

export function PageHeader({ index, label, title, intro, children }: { index: string; label: string; title: string; intro?: string; children?: ReactNode }) {
  return (
    <section className="relative overflow-hidden border-b border-line">
      <div className="bg-grid mask-fade-b absolute inset-0" aria-hidden="true" />
      <Container className="relative pt-16 pb-14 md:pt-24 md:pb-20">
        <p className="meta rise flex items-center gap-2"><span className="text-accent">{index}</span><span className="h-px w-4 bg-line-strong" aria-hidden="true" />{label}</p>
        <h1 className="rise mt-6 max-w-3xl text-[clamp(2.2rem,5.5vw,3.75rem)] font-medium leading-[1.04] tracking-[-0.035em] text-balance" style={{ ["--d" as string]: 1 }}>{title}</h1>
        {intro && <p className="rise mt-6 max-w-2xl text-[17px] leading-relaxed text-muted text-pretty" style={{ ["--d" as string]: 2 }}>{intro}</p>}
        {children}
      </Container>
    </section>
  );
}

export function EmptyState({ code, title, body, children }: { code: string; title: string; body: string; children?: ReactNode }) {
  return (
    <div className="ticks relative overflow-hidden border border-dashed border-line-strong bg-raised/60 px-6 py-12 sm:px-10">
      <div className="bg-grid absolute inset-0 opacity-70" aria-hidden="true" />
      <div className="relative max-w-xl">
        <p className="meta flex items-center gap-2"><span className="pulse-dot inline-block size-1.5 rounded-full bg-accent" aria-hidden="true" />{code}</p>
        <h3 className="mt-4 text-xl font-medium tracking-tight">{title}</h3>
        <p className="mt-3 text-[15px] leading-relaxed text-muted">{body}</p>
        {children}
      </div>
    </div>
  );
}
