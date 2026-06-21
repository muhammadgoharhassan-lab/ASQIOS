# ASQIOS

**Institutional Investment Intelligence** — Research • Governance • AI • Shariah

The public-facing website for ASQIOS: an AI-native investment intelligence
framework combining research, governance, quantitative analysis, and Shariah
compliance.

## Tech Stack

- **Framework:** Next.js 15 (App Router) with static export
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Animation:** Framer Motion
- **3D:** Three.js (custom Intelligence Orb)
- **Icons:** Lucide

## Getting Started

```bash
npm install
npm run dev      # http://localhost:3000
```

## Build

```bash
npm run build    # static export to ./out
```

The site is statically exported (`output: "export"` in `next.config.mjs`), so
the contents of `./out` can be deployed to any static host.

## Deployment

### Vercel (recommended)

Import the repository into Vercel. The framework preset is auto-detected; no
configuration is required.

### GitHub Pages

`.github/workflows/deploy.yml` builds and deploys the static export to GitHub
Pages on every push to `main`. The custom domain (`asqios.com`) is configured
via `public/CNAME`. Enable Pages → Source: **GitHub Actions** in repository
settings.

## Structure

```
src/
├─ app/
│  ├─ layout.tsx          # Fonts, SEO metadata, structured data
│  ├─ page.tsx            # Section composition
│  ├─ globals.css         # Design tokens & base styles
│  ├─ opengraph-image.tsx # Build-time social card
│  ├─ sitemap.ts / robots.ts
├─ components/            # Section + UI components
└─ lib/
   ├─ site.ts             # All site content
   └─ motion.ts           # Shared animation presets
```

All copy lives in `src/lib/site.ts` for easy maintenance.
