"use client";

import { motion } from "framer-motion";
import { FileText, ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { RESEARCH_LIBRARY } from "@/lib/site";
import { fadeUp, stagger, viewportOnce } from "@/lib/motion";

export function ResearchLibrary() {
  return (
    <section
      id="research"
      className="relative section-pad border-y border-line bg-bg-secondary/30"
    >
      <Container>
        <SectionHeader
          eyebrow="Research Library"
          title="Forthcoming papers"
          description="The published record of the framework — its principles, methodology, and governance. Papers will be released as PDFs."
        />

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3"
        >
          {RESEARCH_LIBRARY.map((paper) => (
            <motion.a
              key={paper.title}
              variants={fadeUp}
              href="#research"
              aria-disabled
              className="group relative flex h-full flex-col justify-between gap-10 overflow-hidden rounded-2xl border border-line bg-white/[0.02] p-7 transition-all duration-300 hover:border-azure/30 hover:bg-white/[0.05]"
            >
              <div className="flex items-start justify-between">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-line bg-white/5">
                  <FileText size={18} className="text-azure" />
                </span>
                <ArrowUpRight
                  size={18}
                  className="text-ink-muted transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink"
                />
              </div>
              <div>
                <span className="font-mono text-[0.58rem] uppercase tracking-widest text-gold/80">
                  {paper.category}
                </span>
                <h3 className="mt-2 font-display text-lg font-semibold leading-tight tracking-tight text-ink">
                  {paper.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                  {paper.note}
                </p>
                <span className="mt-4 inline-flex items-center gap-2 font-mono text-[0.6rem] uppercase tracking-widest text-ink-muted">
                  <span className="h-1 w-1 rounded-full bg-gold" />
                  Coming Soon
                </span>
              </div>
            </motion.a>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
