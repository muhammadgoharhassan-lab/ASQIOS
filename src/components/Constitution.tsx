"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { CONSTITUTION } from "@/lib/site";
import { fadeUp, stagger, viewportOnce, EASE } from "@/lib/motion";
import { cn } from "@/lib/cn";

export function Constitution() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section
      id="constitution"
      className="relative section-pad border-y border-line bg-bg-secondary/30"
    >
      <Container>
        <div className="grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <SectionHeader
              eyebrow="The Constitution"
              title={
                <>
                  The operating principles of an{" "}
                  <span className="text-gold">institution</span>
                </>
              }
              description="Six binding principles govern every decision within ASQIOS. They are not guidelines — they are the architecture of how conclusions are formed."
            />
          </div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="flex flex-col gap-3"
          >
            {CONSTITUTION.map((item, i) => {
              const isOpen = open === i;
              return (
                <motion.div
                  key={item.title}
                  variants={fadeUp}
                  className={cn(
                    "overflow-hidden rounded-2xl border transition-colors duration-300",
                    isOpen
                      ? "border-azure/30 bg-white/[0.05]"
                      : "border-line bg-white/[0.02] hover:bg-white/[0.04]",
                  )}
                >
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex w-full items-center gap-5 px-6 py-5 text-left"
                    aria-expanded={isOpen}
                  >
                    <span className="font-mono text-xs text-gold/80">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="flex-1">
                      <span className="block font-display text-base font-semibold tracking-tight text-ink md:text-lg">
                        {item.title}
                      </span>
                      <span className="mt-0.5 block text-sm text-ink-muted">
                        {item.summary}
                      </span>
                    </span>
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-line text-ink-muted">
                      {isOpen ? <Minus size={15} /> : <Plus size={15} />}
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: EASE }}
                      >
                        <p className="border-t border-line px-6 py-5 pl-[3.4rem] text-sm leading-relaxed text-ink-muted">
                          {item.detail}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
