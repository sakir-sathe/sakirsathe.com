/**
 * Abstract, decorative "system" figure. Purely illustrative — not a
 * representation of any real or private architecture.
 */
export function SystemFigure({ labels = { nodes: ["client", "api", "worker", "index", "store", "model"], caption: "FIG. 0 — ABSTRACT SYSTEM", scale: "NOT TO SCALE" } }: { labels?: { nodes: readonly string[]; caption: string; scale: string } }) {
  const nodes = [
    { x: 40, y: 60, w: 92, label: labels.nodes[0] ?? "client" },
    { x: 196, y: 30, w: 92, label: labels.nodes[1] ?? "api" },
    { x: 196, y: 120, w: 92, label: labels.nodes[2] ?? "worker" },
    { x: 352, y: 30, w: 92, label: labels.nodes[3] ?? "index" },
    { x: 352, y: 120, w: 92, label: labels.nodes[4] ?? "store" },
    { x: 196, y: 220, w: 92, label: labels.nodes[5] ?? "model" },
  ];
  const paths = [
    "M132 76 H164 V46 H196",
    "M132 76 H164 V136 H196",
    "M288 46 H352",
    "M288 136 H352",
    "M242 62 V120",
    "M242 152 V220",
    "M398 62 V120",
    "M288 236 H320 V62 H352",
  ];
  return (
    <figure aria-hidden="true" className="relative select-none">
      <svg viewBox="0 0 480 280" className="w-full" fill="none">
        <g className="text-line-strong" stroke="currentColor" strokeWidth="1">
          {paths.map((d, i) => (
            <path key={d} d={d} className="draw" style={{ ["--d" as string]: i }} />
          ))}
        </g>
        {nodes.map((n, i) => (
          <g key={n.label} className="rise" style={{ ["--d" as string]: i + 2 }}>
            <rect x={n.x} y={n.y} width={n.w} height="32" rx="2" className="fill-raised stroke-line-strong" strokeWidth="1" />
            <circle cx={n.x + 12} cy={n.y + 16} r="2.5" className="pulse-dot fill-accent" style={{ ["--d" as string]: i }} />
            <text x={n.x + 22} y={n.y + 20} className="fill-muted font-mono" fontSize="10.5" letterSpacing="0.06em">{n.label}</text>
          </g>
        ))}
        <g className="fill-subtle font-mono" fontSize="8.5" letterSpacing="0.1em">
          <text x="40" y="272">{labels.caption}</text>
          <text x="384" y="272">{labels.scale}</text>
        </g>
      </svg>
    </figure>
  );
}
