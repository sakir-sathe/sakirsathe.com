import { capabilities, engineeringIntro, principles } from "@/data/engineering";
import { CapabilityCard } from "@/components/cards";
import { Container, PageHeader, SectionHeading, TextLink } from "@/components/ui";
import { pageMetadata } from "@/lib/utils";

export const metadata = pageMetadata({ title: "Engineering", description: engineeringIntro, path: "/engineering" });

export default function EngineeringPage() {
  return (
    <>
      <PageHeader index="01" label="Engineering" title="Engineering across the stack" intro={engineeringIntro} />
      <section className="py-20">
        <Container>
          <div className="grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
            {capabilities.map((c) => <CapabilityCard key={c.id} c={c} />)}
          </div>
        </Container>
      </section>
      <section className="pb-24">
        <Container>
          <SectionHeading index="01.1" label="Principles" title="How I approach systems" />
          <dl className="mt-10 grid gap-x-12 gap-y-10 md:ml-[220px] md:grid-cols-2">
            {principles.map((p, i) => (
              <div key={p.k} className="border-l border-line pl-5">
                <dt className="flex items-baseline gap-3 text-[16px] font-medium tracking-tight"><span className="font-mono text-[11px] text-accent">P{i + 1}</span>{p.k}</dt>
                <dd className="mt-2 text-[15px] leading-relaxed text-muted">{p.v}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-16 flex flex-wrap gap-6 md:ml-[220px]">
            <TextLink href="/work">See it applied in case studies</TextLink>
            <TextLink href="/labs">Experiments in labs</TextLink>
          </div>
        </Container>
      </section>
    </>
  );
}
