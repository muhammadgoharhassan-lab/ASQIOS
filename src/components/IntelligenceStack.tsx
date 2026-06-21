"use client";

import { motion } from "framer-motion";
import {
  Microscope,
  Scale,
  BrainCircuit,
  CheckCircle2,
  PieChart,
  Landmark,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { TiltCard } from "@/components/ui/TiltCard";
import { INTELLIGENCE_STACK } from "@/lib/site";
import { fadeUp, stagger, viewportOnce } from "@/lib/motion";

const ICONS = [Microscope, Scale, BrainCircuit, CheckCircle2, PieChart, Landmark];

export function IntelligenceStack() {
  return (
    <section id="platform" className="relative section-pad">
      <div className="pointer-events-none absolute inset-0 -z-10 grid-overlay opacity-30" />
      <Container>
        <SectionHeader
          eyebrow="Intelligence Stack"
          title="Six layers. One governed framework."
          description="Each layer is independently rigorous and collectively accountable — research, governance, and compliance operating as a single system."
        />

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {INTELLIGENCE_STACK.map((card, i) => {
            const Icon = ICONS[i];
            return (
              <motion.div key={card.title} variants={fadeUp}>
                <TiltCard className="h-full">
                  <div className="flex h-full flex-col">
                    <div className="mb-6 flex items-center justify-between">
                      <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-line bg-white/5">
                        <Icon size={18} className="text-azure" />
                      </span>
                      <span className="font-mono text-xs text-ink-muted/70">
                        {card.abbr}
                      </span>
                    </div>
                    <h3 className="font-display text-lg font-semibold tracking-tight text-ink">
                      {card.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-ink-muted">
                      {card.description}
                    </p>
                  </div>
                </TiltCard>
              </motion.div>
            );
          })}
        </motion.div>
      </Container>
    </section>
  );
}
