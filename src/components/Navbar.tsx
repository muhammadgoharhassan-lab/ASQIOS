"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { NAV_LINKS, SITE } from "@/lib/site";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/cn";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled
          ? "border-b border-line bg-bg/70 backdrop-blur-xl"
          : "border-b border-transparent",
      )}
    >
      <Container className="flex h-16 items-center justify-between md:h-20">
        <a href="#top" className="group flex items-center gap-3">
          <Logo />
          <span className="font-display text-lg font-semibold tracking-tightest text-ink">
            {SITE.name}
          </span>
        </a>

        <nav className="hidden items-center gap-8 lg:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-mono text-[0.7rem] uppercase tracking-widest text-ink-muted transition-colors hover:text-ink"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden lg:block">
          <a
            href="#contact"
            className="glass inline-flex items-center rounded-full px-5 py-2.5 font-mono text-[0.7rem] uppercase tracking-widest text-ink transition-all hover:border-azure/40 hover:shadow-glow"
          >
            Contact
          </a>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="flex h-10 w-10 items-center justify-center rounded-full glass lg:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </Container>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-line bg-bg/95 backdrop-blur-xl lg:hidden"
          >
            <Container className="flex flex-col gap-1 py-4">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-3 font-mono text-xs uppercase tracking-widest text-ink-muted transition-colors hover:bg-white/5 hover:text-ink"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="mt-2 rounded-lg bg-ink px-3 py-3 text-center font-mono text-xs uppercase tracking-widest text-bg"
              >
                Contact
              </a>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function Logo() {
  return (
    <span className="relative flex h-8 w-8 items-center justify-center">
      <svg viewBox="0 0 32 32" className="h-8 w-8" fill="none" aria-hidden>
        <circle cx="16" cy="16" r="13" stroke="rgba(255,255,255,0.18)" />
        <circle cx="16" cy="16" r="6" stroke="#D4AF37" />
        <circle cx="16" cy="16" r="1.6" fill="#4F8CFF" />
        <path d="M16 1.5V6M16 26v4.5M1.5 16H6M26 16h4.5" stroke="#4F8CFF" strokeWidth="0.8" />
      </svg>
    </span>
  );
}
