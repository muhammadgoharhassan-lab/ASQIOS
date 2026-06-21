"use client";

import { motion } from "framer-motion";
import { Layers, GitBranch, Lock } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { fadeUp, stagger, viewportOnce } from "@/lib/motion";

const POINTS = [
  {
    icon: Layers,
    title: "Embedded, not appended",
    body: "Screening logic lives inside the research pipeline — not as a filter applied to finished decisions.",
  },
  {
    icon: GitBranch,
    title: "Structural exclusion",
    body: "Non-compliant pathways are removed at the architectural level, before analysis begins.",
  },
  {
    icon: Lock,
    title: "Verifiable at every step",
    body: "Compliance status is recorded alongside evidence, making it auditable across the entire lineage.",
  },
];

export function ShariahFramework() {
  return (
    <section
      id="shariah"
      className="relative section-pad border-y border-line bg-bg-secondary/30"
    >
      <Container>
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <SectionHeader
              eyebrow="Shariah Framework"
              title={
                <>
                  Compliance by <span className="text-gradient">Architecture</span>
                </>
              }
              description="Shariah compliance is embedded within the investment process itself rather than applied after decisions are made."
            />

            <motion.ul
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              className="mt-10 flex flex-col gap-5"
            >
              {POINTS.map((p) => (
                <motion.li
                  key={p.title}
                  variants={fadeUp}
                  className="flex gap-4"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-line bg-white/5">
                    <p.icon size={18} className="text-gold" />
                  </span>
                  <div>
                    <h3 className="font-display text-base font-semibold tracking-tight text-ink">
                      {p.title}
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-ink-muted">
                      {p.body}
                    </p>
                  </div>
                </motion.li>
              ))}
            </motion.ul>
          </div>

          {/* Abstract institutional visual — concentric governed layers */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="relative mx-auto aspect-square w-full max-w-[440px]"
          >
            <ComplianceLayers />
          </motion.div>
        </div>
      </Container>
    </section>
  );
}

function ComplianceLayers() {
  const rings = [
    { r: 46, label: "Compliance Boundary", color: "#D4AF37" },
    { r: 35, label: "Governance", color: "rgba(255,255,255,0.18)" },
    { r: 24, label: "Research", color: "rgba(255,255,255,0.14)" },
  ];
  return (
    <div className="relative h-full w-full">
      <svg viewBox="0 0 100 100" className="h-full w-full">
        <defs>
          <radialGradient id="core" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(79,140,255,0.45)" />
            <stop offset="100%" stopColor="rgba(79,140,255,0)" />
          </radialGradient>
        </defs>
        <circle cx="50" cy="50" r="48" fill="url(#core)" />
        {rings.map((ring, i) => (
          <g key={ring.label}>
            <circle
              cx="50"
              cy="50"
              r={ring.r}
              fill="none"
              stroke={ring.color}
              strokeWidth="0.5"
              strokeDasharray={i === 0 ? "1.5 2" : undefined}
              className={i === 0 ? "motion-safe:animate-[spin_60s_linear_infinite]" : undefined}
              style={{ transformOrigin: "50px 50px" }}
            />
          </g>
        ))}
        {/* Lattice nodes around boundary */}
        {Array.from({ length: 12 }).map((_, i) => {
          const a = (i / 12) * Math.PI * 2;
          const x = 50 + Math.cos(a) * 46;
          const y = 50 + Math.sin(a) * 46;
          return <circle key={i} cx={x} cy={y} r="0.9" fill="#D4AF37" opacity="0.7" />;
        })}
        <circle cx="50" cy="50" r="6" fill="none" stroke="#4F8CFF" strokeWidth="0.6" />
        <circle cx="50" cy="50" r="1.8" fill="#4F8CFF" />
      </svg>

      <div className="absolute inset-0 flex items-center justify-center">
        <span className="glass rounded-full px-4 py-1.5 font-mono text-[0.58rem] uppercase tracking-widest text-ink-muted">
          Process Core
        </span>
      </div>
    </div>
  );
}
