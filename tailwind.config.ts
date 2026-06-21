import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          DEFAULT: "#050A14",
          secondary: "#0B1220",
        },
        surface: "#111827",
        ink: {
          DEFAULT: "#F8FAFC",
          muted: "#94A3B8",
        },
        gold: "#D4AF37",
        azure: "#4F8CFF",
        success: "#10B981",
        line: "rgba(255,255,255,0.08)",
      },
      fontFamily: {
        display: ["var(--font-space-grotesk)", "system-ui", "sans-serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-ibm-plex-mono)", "ui-monospace", "monospace"],
      },
      maxWidth: {
        wide: "1440px",
      },
      letterSpacing: {
        tightest: "-0.04em",
        widest2: "0.32em",
      },
      backgroundImage: {
        "grid-faint":
          "linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)",
        "radial-glow":
          "radial-gradient(60% 60% at 50% 40%, rgba(79,140,255,0.16) 0%, rgba(79,140,255,0) 70%)",
      },
      boxShadow: {
        glass: "0 1px 0 0 rgba(255,255,255,0.06) inset, 0 24px 80px -32px rgba(0,0,0,0.8)",
        glow: "0 0 0 1px rgba(79,140,255,0.25), 0 0 60px -12px rgba(79,140,255,0.45)",
        gold: "0 0 0 1px rgba(212,175,55,0.25), 0 0 60px -16px rgba(212,175,55,0.4)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "0% 50%" },
          "100%": { backgroundPosition: "200% 50%" },
        },
        "pulse-line": {
          "0%": { opacity: "0.15" },
          "50%": { opacity: "0.6" },
          "100%": { opacity: "0.15" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.7s cubic-bezier(0.22,1,0.36,1) both",
        float: "float 6s ease-in-out infinite",
        shimmer: "shimmer 6s linear infinite",
        "pulse-line": "pulse-line 3s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
