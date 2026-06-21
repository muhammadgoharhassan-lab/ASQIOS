"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ARCHITECTURE_FLOW } from "@/lib/site";
import { fadeUp, stagger, viewportOnce } from "@/lib/motion";
import { cn } from "@/lib/cn";

export function Architecture() {
  const [active, setActive] = useState(0);

  return (
    <section
      id="architecture"
      className="relative section-pad border-y border-line bg-bg-secondary/30"
    >
      <Container>
        <SectionHeader
          eyebrow="Architecture"
          title="From raw data to governed intelligence"
          description="A single, directional pipeline. Every stage validates the last; nothing advances without passing through governance."
          align="center"
        />

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-16"
        >
          {/* Flow rail */}
          <div className="flex flex-col items-stretch gap-3 lg:flex-row lg:items-center lg:gap-0">
            {ARCHITECTURE_FLOW.map((node, i) => (
              <div
                key={node.label}
                className="flex flex-col items-center lg:flex-1 lg:flex-row"
              >
                <motion.button
                  variants={fadeUp}
                  type="button"
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  onClick={() => setActive(i)}
                  className={cn(
                    "group relative flex w-full flex-col gap-2 rounded-xl border p-5 text-left transition-all duration-300 lg:min-h-[132px]",
                    active === i
                      ? "border-azure/50 bg-white/[0.06] shadow-glow"
                      : "border-line bg-white/[0.02] hover:border-line/80 hover:bg-white/[0.04]",
                  )}
                >
                  <span
                    className={cn(
                      "font-mono text-[0.6rem] uppercase tracking-widest transition-colors",
                      active === i ? "text-azure" : "text-ink-muted/70",
                    )}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="font-display text-sm font-semibold leading-tight tracking-tight text-ink">
                    {node.label}
                  </span>
                  <span className="text-xs leading-relaxed text-ink-muted">
                    {node.note}
                  </span>
                  <span
                    className={cn(
                      "absolute inset-x-5 bottom-0 h-px transition-all duration-500",
                      active === i ? "bg-gold/70" : "bg-transparent",
                    )}
                  />
                </motion.button>

                {i < ARCHITECTURE_FLOW.length - 1 && (
                  <motion.span
                    variants={fadeUp}
                    aria-hidden
                    className="my-1 flex items-center justify-center text-ink-muted/50 lg:my-0 lg:px-1"
                  >
                    <ChevronRight className="hidden h-5 w-5 motion-safe:animate-pulse-line lg:block" />
                    <ChevronRight className="h-5 w-5 rotate-90 motion-safe:animate-pulse-line lg:hidden" />
                  </motion.span>
                )}
              </div>
            ))}
          </div>

          {/* Active detail */}
          <motion.div
            variants={fadeUp}
            className="mt-10 flex items-center justify-center"
          >
            <div className="glass flex max-w-2xl items-center gap-4 rounded-full px-6 py-3">
              <span className="h-2 w-2 rounded-full bg-azure motion-safe:animate-pulse" />
              <span className="font-mono text-[0.7rem] uppercase tracking-widest text-ink-muted">
                {ARCHITECTURE_FLOW[active].label}
              </span>
              <span className="hidden text-sm text-ink/80 sm:inline">
                — {ARCHITECTURE_FLOW[active].note}
              </span>
            </div>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
