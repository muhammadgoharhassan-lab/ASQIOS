"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { PHILOSOPHY } from "@/lib/site";

export function ResearchPhilosophy() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "end 0.35"],
  });

  return (
    <section id="philosophy" ref={ref} className="relative section-pad">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-radial-glow opacity-50" />
      <Container>
        <div className="mb-14 flex items-center gap-3">
          <span className="h-px w-8 bg-gold/60" />
          <span className="eyebrow text-gold/90">Research Philosophy</span>
        </div>

        <div className="flex flex-col gap-3 md:gap-5">
          {PHILOSOPHY.map((line, i) => (
            <PhilosophyLine
              key={line}
              text={line}
              index={i}
              total={PHILOSOPHY.length}
              progress={scrollYProgress}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}

function PhilosophyLine({
  text,
  index,
  total,
  progress,
}: {
  text: string;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const start = index / total;
  const end = (index + 1) / total;
  const opacity = useTransform(progress, [start - 0.12, start, end], [0.18, 1, 1]);
  const x = useTransform(progress, [start - 0.12, start], [-24, 0]);

  return (
    <motion.h3
      style={{ opacity, x }}
      className="font-display text-3xl font-semibold leading-[1.05] tracking-tightest text-ink sm:text-5xl md:text-6xl lg:text-7xl"
    >
      <span className="mr-4 align-top font-mono text-sm text-gold/70 md:text-base">
        0{index + 1}
      </span>
      {text}
    </motion.h3>
  );
}
