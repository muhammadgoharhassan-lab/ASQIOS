# Lumina — Architecture Freeze

**Status:** Frozen (2026-06-22) · **Scope:** design only (no code, schemas, or migrations in this document)

Lumina is the data and intelligence infrastructure beneath ASQIOS — a market intelligence and
investment-research platform, not a data collector and not merely a market-data store. This
document is the authoritative record of the architectural decisions that are **frozen**: changing
them later would force a redesign, so they are settled now, before implementation begins.

The full deliberation that produced these decisions is preserved separately; this file is the
consolidated outcome.

---

## Guiding principles

1. **Broad architectural coverage at shallow maturity beats narrow architecture that needs a
   future redesign.** Every load-bearing subsystem *exists* in V1, most at Foundation/Basic
   maturity. Subsystems are graded **Foundation → Basic → Advanced → Institutional**.
2. **Capture is the only irreversible act; processing is always deferrable** via deterministic
   replay of immutable raw inputs (raw + pinned code SHA + pinned config hash → reproducible
   output). The expensive, unrecoverable mistake is failing to capture history now.
3. **Lumina Core stores facts; intelligence layers produce judgments.** A Shariah status (or any
   score) is an *opinion under a methodology*, never a fact, and must never masquerade as one
   inside Core's certified data.
4. **Trust is engineered, not assumed:** bitemporal everywhere, append-only, content-addressed,
   provenance-stamped, fail-closed.

---

## Frozen invariants

### Data platform (Core)

- **Five-layer model:** Raw → Staged → Curated → Certified → Research, with cross-cutting trust
  services (provenance, lineage, validation, confidence, certification).
- **Bitemporal model, everywhere:** two independent time axes — `valid_time` (when something was
  true in the world) and `knowledge_time` (when we learned it). Append-only; **no overwrite, ever.**
- **Content-addressed raw capture (CAS) with WORM retention.** Raw payloads are hashed and stored
  immutably; capture is contemporaneous.
- **Provenance + lineage are first-class**, with run-stamping (code SHA + config hash) on every
  derived record, guaranteeing deterministic replay.
- **Dataset versioning + certification gate**, fail-closed: uncertain ⇒ not certified, never a
  silent default-pass.
- **Multi-source capture with a three-tier vendor framework** — Tier A (Authoritative), Tier B
  (Reference), Tier C (Advisory) — influencing validation, confidence, and certification. Prices
  captured from two sources; news/announcements from two sources; capture-now / reconcile-later.
- **Broad normalized XBRL fundamentals layer in V1** (broad concept coverage, shallow depth).
  Full statement reconstruction, restatement intelligence, and advanced taxonomy harmonization are
  deferred to V2.
- **Decomposed confidence:** Source-Trust Score × Data-Quality Score → Overall (versioned config).
- **Vendor-independent adapter contract;** paid vendors are a **plug-in capability, not an
  architectural milestone** — a justified paid source can be added mid-V1 without redesign.
- **Storage abstractions are mandatory.** V1 uses local CAS + SQLite, but no component may depend
  on SQLite-specific behavior; migration to object storage (S3/R2/MinIO) + PostgreSQL must be
  possible without business-logic changes. Migration readiness is required even though migration is
  not performed in V1.

### Intelligence layer (Shariah is the first tenant)

- **Generic Intelligence Substrate.** Reusable, domain-neutral primitives — Methodology Registry,
  Decision Ledger, Evidence Ledger, Intelligence Certification — sit above Core. **Shariah is the
  first instance of the substrate, not a special case.** Future layers (factor, ESG, credit) reuse
  it unchanged.
- **Three-tier facts model**, resolving "facts vs interpretation":
  - **L-FACT** — raw financial facts (Core; methodology-**neutral**; reusable across all
    methodologies).
  - **L-METRIC** — screening metrics (layer; methodology-**parameterized**; a deterministic,
    auditable function of facts + a methodology's base definition; *not* a conclusion).
  - **L-JUDGE** — interpretation (layer; methodology **judgment**: PASS / FAIL / WATCHLIST /
    CONDITIONAL).
- **Methodologies are governed, versioned plugins — not application logic.** The engine **never
  hardcodes** thresholds, ratios, concept mappings, exclusions, or interpretations; all live in
  versioned methodology configuration. **No threshold, ratio, mapping, or interpretation may
  require a source-code change.** Governance (what a methodology *is*) is strictly separated from
  execution (running it). The registry supports versioning, evolution, comparison, retirement, and
  supersession; methodology versions are themselves effective-dated and bitemporal.
- **Bitemporal Decision Ledger + content-addressed Evidence Ledger** (append-only). Each decision
  pins its `methodology_version` and a Merkle-rooted evidence bundle, so re-running the plugin over
  the same bundle reproduces the identical status (determinism), and a later restatement spawns a
  *new* decision rather than corrupting the old one.
- **Certification is separate but chained, and graded.** Data certification (Core) emits a
  `dataset_version`; Shariah certification (layer) references it. V1 emits **RESEARCH_GRADE**
  certifications only — an architectural / reproducibility attestation, explicitly **not** a formal
  religious ruling. **FORMAL** grade requires scholar sign-off (Future).
- **Counterfactual analysis: mechanism in V1, product later.** Because evidence bundles pin facts
  and methodologies are versioned plugins, evaluating "what would the status be under methodology
  M′/version v′/threshold t′?" is just re-running the deterministic engine over an existing bundle,
  tagged `decision_type = COUNTERFACTUAL`. The mechanism ships in V1; the product/UX is V2/Future.
- **Classification subsystem** (sector/business-activity) is versioned, bitemporal, auditable,
  methodology-independent, and replaceable. V1 uses EDGAR SIC codes as primary signal (business
  descriptions captured as secondary); a paid provider (GICS/RBICS) can replace it without redesign.

---

## Resolved decisions

### Shariah

| # | Decision |
|---|----------|
| **D1** | V1 builds a **broad normalized financial-facts layer** from XBRL; the Shariah screen *consumes* from it rather than extracting methodology-specific fields, preserving methodology independence and enabling future Quality/Value/Profitability/ESG/Factor research with no redesign. |
| **D2** | V1 Shariah output is **RESEARCH_GRADE** only — not a formal religious ruling. |
| **D3** | **Methodology governance ⟂ execution.** All thresholds/mappings/exclusions/interpretations are versioned governed config; no source-code change may be required to alter them. V1 ships **provisional, clearly-marked, non-authoritative** defaults for end-to-end validation. |
| **D4** | Execution universe is **evidence-driven and market-neutral** — initially US SEC filers with usable XBRL; expansion to Saudi/GCC/international requires no redesign. |

### Core

| # | Decision |
|---|----------|
| **C1** | **Architect-for-paid, implement-free.** Vendor tiering A/B/C from day one; V1 runs on free sources (Yahoo, Stooq, EDGAR, FRED, RSS); paid integration is a plug-in, not a milestone. |
| **C2** | V1 universe = **S&P 500 constituents + US SEC filers with reliable XBRL** — chosen to validate the full lifecycle for correctness/auditability/reproducibility, not coverage. Global/market-neutral; future expansion (Europe, Japan, China, GCC, Saudi) needs no redesign. |
| **C3** | V1 storage = **local CAS + SQLite behind storage abstractions**; migration-readiness to object storage + PostgreSQL is **mandatory** (no SQLite-specific dependencies), though migration is not performed in V1. |
| **C4** | Tier-C raw is captured **internal-research-only, never redistributed**, pending any later legal review. |

---

## Maturity in V1

| Subsystem | V1 maturity |
|---|---|
| CAS / WORM raw capture | Basic |
| Bitemporal store | Basic |
| Provenance / lineage / run-stamping | Basic |
| Multi-source price capture (2 sources) | Basic |
| News/announcement capture (2 sources) | Foundation (capture-only) |
| EDGAR filings capture | Basic |
| Broad normalized XBRL fundamentals | Basic |
| Macro vintages (FRED) | Foundation |
| Validation engine | Basic |
| Decomposed confidence | Basic |
| Dataset versioning + certification gate | Basic |
| Generic Intelligence Substrate | Foundation |
| Methodology Registry (governed plugins) | Basic |
| AAOIFI-compatible screen (research-grade) | Basic (live, end-to-end) |
| Classification (SIC-based) | Basic |
| Decision + Evidence ledgers | Basic |
| Counterfactual mechanism | Foundation |
| Historical reconstruction (as-of) | Basic |

---

## Global-readiness invariants (additive — see [Global-Readiness Audit](./global-readiness-audit.md))

A US-centric audit of this freeze found seven implicit US assumptions, concentrated in the
financial-facts layer. They are made explicit here as **additive** invariants — none changes a
frozen decision; together they guarantee that Europe, Japan, China, GCC, and Saudi are added by
**adapters and mappings, not redesign**. V1 fills these shapes with US values; the *shapes* are
global from the first commit.

- **GR-1 — Canonical concept model.** Facts key to a Lumina-canonical concept vocabulary; external
  taxonomies (us-gaap, IFRS, ESEF, EDINET, China CAS, SOCPA) enter via versioned mapping adapters.
  Raw us-gaap concept names are never the fact key.
- **GR-2 — Source-neutral identity.** Internal entity/security IDs anchored by **LEI**; CIK, ISIN,
  SEDOL, tickers, and local codes are attributes, not the spine.
- **GR-3 — Scheme-tagged classification.** Classification carries `(scheme, code)` mapped to a
  canonical sector taxonomy; methodologies bind to canonical, never to SIC directly.
- **GR-4 — Currency as first-class.** Every monetary fact/price carries its currency; FX is a
  derived/Research concern, never written into Core facts.
- **GR-5 — Calendar & period neutrality.** Trading calendars are per-exchange (e.g. Tadawul trades
  **Sun–Thu**); the fiscal-period model assumes no fixed frequency, week shape, or year-end.
- **GR-6 — Language-tagged text.** Free-text fields carry a language tag; multilingual processing is
  a later maturity, but the shape never assumes English.
- **GR-7 — Accounting-standard awareness.** Canonical mappings and methodology base definitions may
  be parameterized by accounting standard (GAAP / IFRS / JP-GAAP / CAS / SOCPA).

## Next artifact

The next deliverable is **still design, not code**: the
[single vertical-slice spec](./vertical-slice-spec.md), which proves every frozen invariant
(including GR-1…GR-7's global record shapes) end-to-end on one security before any breadth
build-out.
