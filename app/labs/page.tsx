import { labAreas, labsDescription } from "@/data/labs";
import { LabCard } from "@/components/cards";
import { Container, PageHeader, SectionHeading } from "@/components/ui";
import { pageMetadata } from "@/lib/utils";

export const metadata = pageMetadata({ title: "Labs", description: labsDescription, path: "/labs" });

const method = [
  ["Question", "Start from a concrete engineering question, not a technology."],
  ["Measure", "Prefer reproducible numbers and published harnesses over impressions."],
  ["Write down", "Record what was learned, including the experiments that didn't work."],
];

export default function LabsPage() {
  return (
    <>
      <PageHeader index="05" label="Labs" title="Labs" intro={labsDescription} />
      <section className="py-16 md:py-20">
        <Container>
          <p className="meta mb-5">Areas of exploration</p>
          <div className="grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
            {labAreas.map((l, i) => <LabCard key={l.id} l={l} i={i} />)}
          </div>
          <p className="mt-4 font-mono text-[11px] text-subtle">No experiments published yet. Results will be linked from each area as they are written up.</p>
        </Container>
      </section>
      <section className="pb-24">
        <Container>
          <SectionHeading index="05.1" label="Method" title="How experiments are run" />
          <ol className="mt-10 grid gap-8 md:ml-[220px] md:grid-cols-3">
            {method.map(([k, v], i) => (
              <li key={k} className="border-t border-line pt-4">
                <p className="font-mono text-[11px] text-accent">STEP {i + 1}</p>
                <p className="mt-3 text-[16px] font-medium tracking-tight">{k}</p>
                <p className="mt-2 text-[14.5px] leading-relaxed text-muted">{v}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>
    </>
  );
}
