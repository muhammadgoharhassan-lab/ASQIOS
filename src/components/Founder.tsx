"use client";

import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { FOUNDER } from "@/lib/site";
import { fadeUp, stagger, viewportOnce } from "@/lib/motion";

export function Founder() {
  return (
    <section id="founder" className="relative section-pad">
      <Container>
        <div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <SectionHeader
            eyebrow="Leadership"
            title="Founded on disciplined process"
          />

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            <motion.blockquote
              variants={fadeUp}
              className="font-display text-2xl font-light leading-snug tracking-tight text-ink/90 md:text-3xl"
            >
              “{FOUNDER.statement}”
            </motion.blockquote>

            <motion.div
              variants={fadeUp}
              className="mt-10 flex flex-col gap-6 border-t border-line pt-8 sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <p className="font-display text-base font-semibold tracking-tight text-ink">
                  {FOUNDER.role}
                </p>
                <p className="mt-1 inline-flex items-center gap-1.5 font-mono text-[0.62rem] uppercase tracking-widest text-ink-muted">
                  <MapPin size={12} className="text-gold" />
                  {FOUNDER.location}
                </p>
              </div>
              <ul className="flex flex-wrap gap-2">
                {FOUNDER.credentials.map((c) => (
                  <li
                    key={c}
                    className="glass rounded-full px-3 py-1.5 font-mono text-[0.6rem] uppercase tracking-widest text-ink-muted"
                  >
                    {c}
                  </li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
