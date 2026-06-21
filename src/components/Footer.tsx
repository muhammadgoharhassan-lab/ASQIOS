"use client";

import { motion } from "framer-motion";
import { Mail, Linkedin, ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SITE, FOOTER_GROUPS } from "@/lib/site";
import { fadeUp, viewportOnce } from "@/lib/motion";

export function Footer() {
  return (
    <footer id="contact" className="relative overflow-hidden border-t border-line">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-radial-glow opacity-40" />

      {/* CTA band */}
      <Container>
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="section-pad flex flex-col items-start gap-10 lg:flex-row lg:items-end lg:justify-between"
        >
          <div className="max-w-2xl">
            <span className="eyebrow text-gold/90">Contact</span>
            <h2 className="mt-4 font-display text-3xl font-semibold leading-tight tracking-tightest text-ink sm:text-4xl md:text-5xl">
              Building the intelligence layer for{" "}
              <span className="text-gradient">disciplined investing.</span>
            </h2>
          </div>
          <div className="flex flex-col gap-3">
            <a
              href={`mailto:${SITE.email}`}
              className="group inline-flex items-center justify-between gap-6 rounded-full bg-ink px-6 py-3.5 font-mono text-xs uppercase tracking-widest text-bg transition-all hover:bg-white hover:shadow-glow"
            >
              <span className="inline-flex items-center gap-2">
                <Mail size={15} /> {SITE.email}
              </span>
              <ArrowUpRight size={15} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            <a
              href={SITE.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center justify-between gap-6 rounded-full glass px-6 py-3.5 font-mono text-xs uppercase tracking-widest text-ink transition-all hover:border-azure/40 hover:shadow-glow"
            >
              <span className="inline-flex items-center gap-2">
                <Linkedin size={15} className="text-azure" /> LinkedIn
              </span>
              <ArrowUpRight size={15} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>
        </motion.div>
      </Container>

      <div className="section-rule" />

      {/* Link grid */}
      <Container>
        <div className="grid gap-10 py-14 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-3">
              <Logo />
              <span className="font-display text-lg font-semibold tracking-tightest text-ink">
                {SITE.name}
              </span>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-ink-muted">
              {SITE.positioning}.
            </p>
            <p className="mt-3 font-mono text-[0.62rem] uppercase tracking-widest text-gold/80">
              {SITE.tagline}
            </p>
          </div>

          {FOOTER_GROUPS.map((group) => (
            <div key={group.heading}>
              <h3 className="font-mono text-[0.6rem] uppercase tracking-widest text-ink-muted">
                {group.heading}
              </h3>
              <ul className="mt-5 flex flex-col gap-3">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-ink/80 transition-colors hover:text-ink"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Container>

      <div className="section-rule" />

      <Container>
        <div className="flex flex-col items-center justify-between gap-4 py-7 sm:flex-row">
          <p className="font-mono text-[0.62rem] uppercase tracking-widest text-ink-muted">
            © {new Date().getFullYear()} {SITE.name}. All rights reserved.
          </p>
          <p className="font-mono text-[0.62rem] uppercase tracking-widest text-ink-muted">
            {SITE.domain}
          </p>
        </div>
      </Container>
    </footer>
  );
}

function Logo() {
  return (
    <svg viewBox="0 0 32 32" className="h-7 w-7" fill="none" aria-hidden>
      <circle cx="16" cy="16" r="13" stroke="rgba(255,255,255,0.18)" />
      <circle cx="16" cy="16" r="6" stroke="#D4AF37" />
      <circle cx="16" cy="16" r="1.6" fill="#4F8CFF" />
    </svg>
  );
}
