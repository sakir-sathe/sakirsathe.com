import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { getPublishedProject, getPublishedProjectsWithDetailPages } from "@/data/projects";
import { Container, Tag } from "@/components/ui";
import { EMPTY_PARAM, pageMetadata } from "@/lib/utils";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

/** Only published projects are exported. A sentinel keeps static export valid when none are. */
export function generateStaticParams() {
  const published = getPublishedProjectsWithDetailPages();
  return published.length ? published.map((p) => ({ slug: p.slug })) : [{ slug: EMPTY_PARAM }];
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const p = getPublishedProject(slug);
  if (!p) return { robots: { index: false } };
  return pageMetadata({ title: p.name, description: p.description, path: `/open-source/${p.slug}` });
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const p = getPublishedProject(slug);
  if (!p) notFound();
  return (
    <article>
      <Container className="pt-10 pb-24 md:pt-14">
        <Link href="/open-source" className="group inline-flex items-center gap-2 font-mono text-[12px] text-muted hover:text-fg">
          <ArrowLeft className="size-3.5 transition-transform group-hover:-translate-x-0.5" aria-hidden="true" /> Open Source
        </Link>
        <p className="meta mt-12">{p.status.replace("-", " ")}</p>
        <h1 className="mt-4 font-mono text-[clamp(2rem,5vw,3rem)] tracking-tight">{p.name}</h1>
        <p className="mt-5 max-w-2xl text-[17px] leading-relaxed text-muted">{p.description}</p>
        <div className="mt-6 flex flex-wrap gap-1.5">{p.technologies.map((t) => <Tag key={t}>{t}</Tag>)}</div>
        {p.githubUrl && (
          <a href={p.githubUrl} target="_blank" rel="noopener noreferrer" className="mt-10 inline-flex items-center gap-2 border border-line-strong px-4 py-2.5 text-sm hover:border-accent hover:text-accent">
            Repository <ArrowUpRight className="size-3.5" aria-hidden="true" />
          </a>
        )}
      </Container>
    </article>
  );
}
