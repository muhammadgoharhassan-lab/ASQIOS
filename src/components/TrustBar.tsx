"use client";

import { motion } from "framer-motion";
import { ShieldCheck, FlaskConical, Cpu, ScrollText } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { TRUST_PILLARS } from "@/lib/site";
import { fadeUp, stagger, viewportOnce } from "@/lib/motion";

const ICONS = [ShieldCheck, FlaskConical, Cpu, ScrollText];

export function TrustBar() {
  return (
    <section className="relative border-y border-line bg-bg-secondary/40">
      <Container>
        <motion.ul
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid grid-cols-2 divide-line lg:grid-cols-4 lg:divide-x"
        >
          {TRUST_PILLARS.map((pillar, i) => {
            const Icon = ICONS[i];
            return (
              <motion.li
                key={pillar.label}
                variants={fadeUp}
                className="flex items-center gap-4 px-2 py-7 lg:px-8"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full glass">
                  <Icon size={17} className="text-gold" />
                </span>
                <span className="flex flex-col">
                  <span className="font-display text-sm font-semibold tracking-tight text-ink">
                    {pillar.label}
                  </span>
                  <span className="font-mono text-[0.62rem] uppercase tracking-widest text-ink-muted">
                    {pillar.detail}
                  </span>
                </span>
              </motion.li>
            );
          })}
        </motion.ul>
      </Container>
    </section>
  );
}
