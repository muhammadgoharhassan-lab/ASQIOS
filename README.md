# ASQIOS — Corporate Website

A static, multi-page marketing site for **ASQIOS**, a Shariah-compliant quantitative
investment *research* platform. No build step, no framework, no dependencies — just
HTML, CSS, and vanilla JavaScript. It deploys to GitHub Pages as-is.

## Pages

| File | Purpose |
|------|---------|
| `index.html` | Home — animated lattice hero, honest stat counters, priority-ladder and portfolio previews |
| `approach.html` | Methodology — lexicographic priority ladder, validation-gate funnel, the free-data stance |
| `platform.html` | Architecture — interactive PORT-A→D hierarchy, the honesty spine, data environment |
| `governance.html` | Governance & Shariah — interactive separation-of-powers wheel, constitutional corpus |
| `about.html` | Mission, operating principles, the research stance |
| `contact.html` | Enquiry form (opens the visitor's email client) |

## Structure

```
.
├── index.html
├── approach.html
├── platform.html
├── governance.html
├── about.html
├── contact.html
├── 404.html
├── .nojekyll
├── README.md
└── assets/
    ├── css/styles.css   # one shared design system
    └── js/main.js       # nav, reveals, counters, canvas lattice, interactive diagrams
```

## Deploy to GitHub Pages

1. Create a new repository on GitHub (for example `asqios-website`).
2. Upload **all files, keeping the `assets/` folder structure** (drag the whole folder
   contents into the repo, or use git — see below).
3. In the repo, go to **Settings → Pages**.
4. Under **Build and deployment → Source**, choose **Deploy from a branch**.
5. Select branch **`main`** and folder **`/ (root)`**, then **Save**.
6. Wait ~1 minute. Your site is published at
   `https://<your-username>.github.io/<repo-name>/`.

### Using git from the command line

```bash
git init
git add .
git commit -m "ASQIOS website"
git branch -M main
git remote add origin https://github.com/<your-username>/<repo-name>.git
git push -u origin main
```

Then enable Pages in Settings → Pages as above.

## Custom domain (optional)

To serve the site at `asqios.com`:

1. Add a file named `CNAME` (no extension) at the repo root containing one line:
   `asqios.com`
2. At your domain registrar, point the domain at GitHub Pages
   (an `ALIAS`/`ANAME` to `<your-username>.github.io`, or the four GitHub Pages A records).
3. In **Settings → Pages → Custom domain**, enter `asqios.com` and enable **Enforce HTTPS**.

## Before going live — edit these

- **Email:** `contact@asqios.com` appears in the footer of every page, in the contact
  page, and in the mailto handler inside `assets/js/main.js`. Replace with your real address.
- **Contact form:** It currently opens the visitor's email client (no backend, which is
  correct for GitHub Pages). For a form that posts straight to your inbox, wire the form
  to a static-form service and point the submit handler at it.
- **Open Graph / social preview:** add `og:` and `twitter:` meta tags per page if you want
  rich link previews.

## Design notes

- **Type:** Spectral (display) · IBM Plex Sans (body) · IBM Plex Mono (data/labels), via Google Fonts.
- **Palette:** ink `#10201B`, paper `#F4F4EE`, verdigris `#2D5D4F`, brass `#A07E3E` (reserved for the void-for-capital seal).
- **Graphics are honest by design.** There are no performance charts anywhere — inventing
  return curves would contradict the platform's pre-capital, void-for-capital stance. The
  animated numbers (including **$0 capital deployed**) are all true.
- Accessible: keyboard focus, `aria` labels on decorative SVG, and `prefers-reduced-motion`
  disables the lattice animation and reveals.

---

© ASQIOS · Research instrument · Void for capital.
