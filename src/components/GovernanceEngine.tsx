"use client";

import { motion } from "framer-motion";
import { Fingerprint } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { GOVERNANCE_STEPS } from "@/lib/site";
import { fadeUp, stagger, viewportOnce } from "@/lib/motion";

export function GovernanceEngine() {
  return (
    <section id="governance" className="relative section-pad">
      <Container>
        <SectionHeader
          eyebrow="Governance Engine"
          title="Every conclusion is traceable"
          description="Decisions move through a fixed, auditable sequence. The path from a proposed conclusion to a permanent record is never skipped."
        />

        <div className="mt-16 grid gap-12 lg:grid-cols-[1fr_0.8fr] lg:gap-20">
          {/* Workflow */}
          <motion.ol
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="relative"
          >
            {/* Connecting rail */}
            <span
              aria-hidden
              className="absolute left-[19px] top-2 bottom-2 w-px bg-gradient-to-b from-azure/50 via-line to-gold/40"
            />
            {GOVERNANCE_STEPS.map((step, i) => (
              <motion.li
                key={step.label}
                variants={fadeUp}
                className="group relative flex gap-5 pb-8 last:pb-0"
              >
                <span className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-line bg-bg font-mono text-xs text-ink-muted transition-all duration-300 group-hover:border-azure/60 group-hover:text-azure group-hover:shadow-glow">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="pt-1.5">
                  <h3 className="font-display text-lg font-semibold tracking-tight text-ink">
                    {step.label}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-ink-muted">
                    {step.note}
                  </p>
                </div>
              </motion.li>
            ))}
          </motion.ol>

          {/* Trace panel */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="lg:sticky lg:top-28 lg:self-start"
          >
            <div className="glass rounded-2xl p-7">
              <div className="mb-6 flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-line">
                  <Fingerprint size={18} className="text-gold" />
                </span>
                <span className="font-mono text-[0.62rem] uppercase tracking-widest text-ink-muted">
                  Immutable Record
                </span>
              </div>
              <p className="font-display text-xl font-light leading-snug tracking-tight text-ink/90">
                Each step is timestamped, attributed, and archived — so any
                conclusion can be reconstructed in full, years later.
              </p>
              <dl className="mt-7 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-line bg-line">
                {[
                  ["Steps", "6"],
                  ["Skippable", "0"],
                  ["Traceability", "100%"],
                  ["Accountability", "Named"],
                ].map(([k, v]) => (
                  <div key={k} className="bg-bg p-4">
                    <dd className="font-display text-xl font-semibold text-ink">
                      {v}
                    </dd>
                    <dt className="font-mono text-[0.58rem] uppercase tracking-widest text-ink-muted">
                      {k}
                    </dt>
                  </div>
                ))}
              </dl>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
