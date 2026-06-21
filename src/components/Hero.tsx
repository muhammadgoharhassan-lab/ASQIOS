"use client";

import { motion } from "framer-motion";
import { ArrowRight, Network } from "lucide-react";
import { IntelligenceOrb } from "@/components/IntelligenceOrb";
import { ParticleField } from "@/components/ParticleField";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { Container } from "@/components/ui/Container";
import { ORB_LABELS, SITE } from "@/lib/site";
import { EASE } from "@/lib/motion";

export function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden pt-24"
    >
      {/* Ambient depth layers */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 grid-overlay opacity-70" />
        <ParticleField className="absolute inset-0 opacity-60" />
        <div className="absolute left-1/2 top-1/2 h-[120vh] w-[120vh] -translate-x-1/2 -translate-y-1/2 bg-radial-glow" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-bg to-transparent" />
      </div>

      <Container className="relative">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          {/* Copy */}
          <div className="order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE }}
              className="mb-6 inline-flex items-center gap-2 rounded-full glass px-4 py-2"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-success" />
              <span className="font-mono text-[0.68rem] uppercase tracking-widest text-ink-muted">
                {SITE.positioning}
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: EASE, delay: 0.05 }}
              className="font-display text-5xl font-semibold leading-[0.98] tracking-tightest text-ink sm:text-6xl lg:text-7xl"
            >
              <span className="text-gradient">Investment</span>
              <br />
              <span className="text-gradient">Intelligence.</span>
              <br />
              <span className="text-gold">Reimagined.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: EASE, delay: 0.15 }}
              className="mt-7 max-w-xl text-base leading-relaxed text-ink-muted md:text-lg"
            >
              AI-native research, governance, quantitative analysis, and
              Shariah-compliant intelligence designed for disciplined decision
              making.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: EASE, delay: 0.25 }}
              className="mt-9 flex flex-col gap-3 sm:flex-row"
            >
              <a
                href="#platform"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-ink px-7 py-3.5 font-mono text-xs uppercase tracking-widest text-bg transition-all duration-300 hover:bg-white hover:shadow-glow"
              >
                Explore Platform
                <ArrowRight
                  size={15}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </a>
              <a
                href="#architecture"
                className="group inline-flex items-center justify-center gap-2 rounded-full glass px-7 py-3.5 font-mono text-xs uppercase tracking-widest text-ink transition-all duration-300 hover:border-azure/40 hover:shadow-glow"
              >
                <Network size={15} className="text-azure" />
                View Architecture
              </a>
            </motion.div>
          </div>

          {/* Orb */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.1, ease: EASE, delay: 0.2 }}
            className="order-1 lg:order-2"
          >
            <OrbStage />
          </motion.div>
        </div>
      </Container>

      <ScrollCue />
    </section>
  );
}

function OrbStage() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[520px]">
      <ErrorBoundary>
        <IntelligenceOrb />
      </ErrorBoundary>

      {/* Orbiting labels — slow rotation, text counter-rotated to stay upright */}
      <div className="pointer-events-none absolute inset-0 motion-safe:animate-[spin_44s_linear_infinite]">
        {ORB_LABELS.map((label, i) => {
          const angle = (i / ORB_LABELS.length) * Math.PI * 2;
          const radius = 46; // percent
          const x = 50 + Math.cos(angle) * radius;
          const y = 50 + Math.sin(angle) * radius;
          return (
            <span
              key={label}
              className="absolute"
              style={{ left: `${x}%`, top: `${y}%`, transform: "translate(-50%, -50%)" }}
            >
              <span className="block motion-safe:animate-[spin_44s_linear_infinite_reverse]">
                <span className="glass inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 font-mono text-[0.62rem] uppercase tracking-widest text-ink-muted">
                  <span className="h-1 w-1 rounded-full bg-azure" />
                  {label}
                </span>
              </span>
            </span>
          );
        })}
      </div>
    </div>
  );
}

function ScrollCue() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1, duration: 1 }}
      className="absolute bottom-7 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 md:flex"
    >
      <span className="font-mono text-[0.6rem] uppercase tracking-widest2 text-ink-muted">
        Scroll
      </span>
      <span className="relative flex h-9 w-5 justify-center rounded-full border border-line">
        <span className="mt-1.5 h-1.5 w-1 rounded-full bg-azure motion-safe:animate-[float_2s_ease-in-out_infinite]" />
      </span>
    </motion.div>
  );
}
