"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { fadeUp, stagger, viewportOnce } from "@/lib/motion";

const FACETS = [
  { k: "Quantitative", v: "Research" },
  { k: "Embedded", v: "Governance" },
  { k: "Machine", v: "Intelligence" },
  { k: "Architected", v: "Compliance" },
];

export function WhatIs() {
  return (
    <section id="about" className="relative section-pad">
      <Container>
        <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
          <SectionHeader
            eyebrow="What is ASQIOS"
            title={
              <>
                Built for{" "}
                <span className="text-gradient">Evidence-Based</span> Investing
              </>
            }
            description="ASQIOS is an AI-native investment intelligence platform that combines quantitative research, governance controls, Shariah compliance, and machine-assisted analysis into a unified institutional framework."
          />

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line"
          >
            {FACETS.map((f) => (
              <motion.div
                key={f.v}
                variants={fadeUp}
                className="group relative flex flex-col justify-between gap-8 bg-bg p-7 transition-colors duration-300 hover:bg-surface"
              >
                <span className="font-mono text-[0.62rem] uppercase tracking-widest text-ink-muted">
                  {f.k}
                </span>
                <span className="font-display text-2xl font-semibold tracking-tight text-ink">
                  {f.v}
                </span>
                <span className="absolute bottom-0 left-0 h-px w-0 bg-gold transition-all duration-500 group-hover:w-full" />
              </motion.div>
            ))}
          </motion.div>
        </div>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-16 max-w-4xl font-display text-2xl font-light leading-snug tracking-tight text-ink/90 md:text-3xl"
        >
          Not a stock-picking app. Not a signal service. ASQIOS is a{" "}
          <span className="text-azure">research institution</span> — an
          intelligence platform where every conclusion is{" "}
          <span className="text-gold">earned, challenged, and recorded.</span>
        </motion.p>
      </Container>
    </section>
  );
}
