"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ROADMAP } from "@/lib/site";
import { fadeUp, stagger, viewportOnce } from "@/lib/motion";
import { cn } from "@/lib/cn";

export function Roadmap() {
  const [active, setActive] = useState(0);

  return (
    <section id="roadmap" className="relative section-pad">
      <div className="pointer-events-none absolute inset-0 -z-10 grid-overlay opacity-30" />
      <Container>
        <SectionHeader
          eyebrow="Roadmap"
          title="A measured path to a global network"
          description="Infrastructure first, intelligence second, scale last — built in the same order the framework demands of every decision."
        />

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-16"
        >
          {/* Timeline rail */}
          <div className="relative">
            <span
              aria-hidden
              className="absolute left-0 right-0 top-[7px] hidden h-px bg-gradient-to-r from-azure/40 via-line to-gold/40 md:block"
            />
            <div className="grid gap-8 md:grid-cols-6 md:gap-4">
              {ROADMAP.map((item, i) => (
                <motion.button
                  key={item.year}
                  variants={fadeUp}
                  type="button"
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  onClick={() => setActive(i)}
                  className="group relative flex items-start gap-4 text-left md:flex-col md:items-start md:gap-0"
                >
                  <span
                    className={cn(
                      "relative z-10 mt-0 h-3.5 w-3.5 shrink-0 rounded-full border-2 transition-all duration-300 md:mb-6",
                      active === i
                        ? "border-gold bg-gold shadow-gold"
                        : "border-line bg-bg group-hover:border-azure",
                    )}
                  />
                  <span className="flex flex-col">
                    <span
                      className={cn(
                        "font-mono text-sm transition-colors",
                        active === i ? "text-gold" : "text-ink-muted",
                      )}
                    >
                      {item.year}
                    </span>
                    <span className="mt-1 font-display text-sm font-semibold leading-tight tracking-tight text-ink">
                      {item.title}
                    </span>
                  </span>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Active detail card */}
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mt-12 glass rounded-2xl p-8"
          >
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:gap-6">
              <span className="font-display text-4xl font-semibold tracking-tightest text-gold md:text-5xl">
                {ROADMAP[active].year}
              </span>
              <span className="hidden h-10 w-px bg-line md:block" />
              <div>
                <h3 className="font-display text-xl font-semibold tracking-tight text-ink">
                  {ROADMAP[active].title}
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-ink-muted">
                  {ROADMAP[active].note}
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
