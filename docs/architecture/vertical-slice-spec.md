# Lumina — V1 Vertical-Slice Spec (FINAL — for implementation approval)

**Status:** FINAL design (v1.0) — design only, no code/schemas/migrations · **Depends on:**
[Architecture Freeze](./lumina-architecture-freeze.md) ·
[Global-Readiness Audit](./global-readiness-audit.md)

## Purpose

Before building breadth, prove **every frozen invariant end-to-end on a single security**. The
slice is deliberately one ticker wide and full-stack deep: price capture, fundamentals
normalization, validation, certification, a live research-grade Shariah screen, and a reproducible
audit trail. If the slice holds, the architecture is sound and breadth is mechanical. If it breaks,
it breaks cheaply, here, before scale.

The slice runs on a **US (S&P 500) security**, but per the Global-Readiness Audit it writes
**global-ready record shapes** (canonical concepts, currency, exchange/calendar, neutral identity,
scheme-tagged classification) filled with US values — so adding Europe/Japan/China/GCC/Saudi later
is data, not redesign.

This spec is the contract the first implementation must satisfy. It is not code.

---

## Scope

**In:** one S&P 500 security (reference example below uses a single CIK/ticker), one trading day of
prices from two sources, one annual EDGAR filing with XBRL, the handful-to-broad set of normalized
financial facts, one AAOIFI-compatible research-grade screen, and the full trust spine
(bitemporality, provenance, validation, confidence, certification, evidence, decision).

**Out (deferred to breadth/V2):** the full universe, restatement intelligence, full statement
reconstruction, paid vendors, additional methodologies, counterfactual *product*, scholar workflow,
object storage / PostgreSQL migration, non-US markets, multilingual text processing, FX conversion.

**Global-ready shapes required even in the US slice (GR-1…GR-7):**

| Record | Required global-ready fields (US values in V1) |
|--------|-----------------------------------------------|
| Identity | neutral internal entity/security ID + **LEI** anchor; CIK/ticker as attributes (GR-2) |
| Price | `exchange`, `calendar_ref`, **`currency` = USD** (GR-4, GR-5) |
| Financial fact | **`canonical_concept`** (us-gaap→canonical mapping), **`currency`**, `accounting_standard` = US-GAAP (GR-1, GR-4, GR-7) |
| Classification | `(scheme = SIC, code)` → **canonical sector** (GR-3) |
| Any free text | `language` = en (GR-6) |

These columns exist and are populated in V1; only their *values* are US-specific.

---

## The slice, end to end

```
  ┌─ Prices ────────────────────────────────────────────────────────────────┐
  │ Stooq (A) ─┐                                                              │
  │ Yahoo (B) ─┴─► CAS (raw, hashed, WORM) ─► validate/reconcile ─► bitemporal│
  │                                                price (curated) ─► certify │
  └──────────────────────────────────────────────────────────────────────────┘
  ┌─ Fundamentals ───────────────────────────────────────────────────────────┐
  │ EDGAR filing + XBRL ─► CAS (raw) ─► normalize (broad facts) ─► validate ─► │
  │                          bitemporal financial facts (curated) ─► certify   │
  └──────────────────────────────────────────────────────────────────────────┘
  ┌─ Classification ─────────────────────────────────────────────────────────┐
  │ EDGAR SIC (+ business description, captured) ─► versioned classification   │
  └──────────────────────────────────────────────────────────────────────────┘
                                   │
                                   ▼
  ┌─ Intelligence layer ─────────────────────────────────────────────────────┐
  │ Methodology Registry: "AAOIFI-compatible v0.1" (governed config, provisional)│
  │   evidence bundle (pins fact versions + classification + methodology version)│
  │   ─► L-METRIC (ratios under base def) ─► L-JUDGE (PASS/FAIL/WATCHLIST/COND) │
  │   ─► decision validation ─► decomposed confidence ─► RESEARCH_GRADE cert    │
  │   ─► Decision Ledger entry + Evidence Ledger bundle                          │
  └──────────────────────────────────────────────────────────────────────────┘
                                   │
                                   ▼
         as-of query  ·  reproducibility (determinism) check  ·  audit trail
```

---

## Stage-by-stage requirements

### 1. Price capture (two sources)

- Fetch one trading day of OHLCV for the chosen security from **Stooq (Tier B reference)** and
  **Yahoo (Tier C advisory)** through the **vendor-independent adapter contract**.
- Persist each raw response to **CAS**: content-hashed, WORM, with capture timestamp and source
  identity. Capture is the irreversible act — it happens before any processing.
- **Reconcile** the two sources (capture-now / reconcile-later is allowed; here we reconcile in the
  slice to exercise the path). Discrepancies are recorded, not silently resolved.
- Produce a **bitemporal** curated price record: `valid_time` = the market day, `knowledge_time` =
  when captured. Append-only. The record carries `exchange`, `calendar_ref`, and `currency` (=USD in
  V1); the security is referenced by **neutral ID** (LEI/ticker as attributes), per GR-2/4/5.

**Proves:** multi-source capture, tiering, adapter contract, CAS/WORM, bitemporality, reconciliation,
global-ready price/identity shape.

### 2. Fundamentals (broad normalized facts)

- Fetch one annual filing + its **XBRL** for the security from **EDGAR**; persist raw to CAS.
- **Normalize a broad set of financial facts** (per decision D1 — broad concept coverage, shallow
  depth; *not* a methodology-specific extraction). The Shariah screen will later consume from this
  general fact layer, never reach into XBRL itself.
- Each fact keys to a **`canonical_concept`** via a versioned **us-gaap→canonical mapping adapter**
  (GR-1) — raw us-gaap names are never the key — and carries **`currency`** (GR-4) and
  `accounting_standard` = US-GAAP (GR-7). The us-gaap mapping is one adapter; IFRS/EDINET/CAS/SOCPA
  adapters slot in later with no fact-store change.
- Each fact is **bitemporal** and carries provenance to its **filing version** (so a future
  restatement produces a new fact + a new downstream decision, never an overwrite).
- Validate facts (structural validity, basic invariants); fail-closed on anomalies.

**Proves:** EDGAR capture, broad normalization, **canonical-concept layer** (taxonomy-neutral),
fact-layer reuse, filing-version provenance, bitemporal facts, validation.

### 3. Classification

- Derive sector/business-activity classification from **EDGAR SIC** (primary); capture the business
  description (with `language` = en, GR-6) as secondary signal (no NLP in V1).
- Store as a **versioned, bitemporal, methodology-independent** record carrying **`(scheme = SIC,
  code)` mapped to a canonical sector** (GR-3); the methodology screens against canonical, never SIC
  directly, so a NACE/TSE-33/CSRC/Tadawul scheme slots in by mapping alone.

**Proves:** classification subsystem is replaceable, methodology-independent, and **scheme-neutral**.

### 4. Certification (data)

- Run the certification gate over the curated price + fact + classification records. On pass, emit a
  **`dataset_version`** (data certification). Fail-closed otherwise.

**Proves:** dataset versioning + certification gate, fail-closed.

### 5. Methodology registration (governed config)

- Register **"AAOIFI-compatible v0.1"** in the **Methodology Registry** as a **versioned, governed,
  content-hashed plugin definition** — declaring screen set, base definition (`base = total
  assets`), thresholds, required-input manifest, classification dependency, and status taxonomy.
- All values are **provisional, clearly marked non-authoritative**, and stored as config. **No
  threshold or mapping appears in engine code** (decision D3). Governance (defining the methodology)
  is separate from execution (running it).

**Proves:** methodology-as-governed-config; governance ⟂ execution; no hardcoding.

### 6. Screening execution (L-METRIC → L-JUDGE)

- Assemble an **Evidence Bundle**: the exact versions of the facts consumed, the classification
  record version, the input validation + confidence results, and the `methodology_version` — hashed
  to a **Merkle root**.
- Compute **L-METRIC** (ratios under the methodology's base definition) — deterministic, auditable
  measurements, not conclusions.
- Apply thresholds → **L-JUDGE** status ∈ {PASS, FAIL, WATCHLIST (near-boundary), CONDITIONAL
  (insufficient evidence)}. Conservative / fail-closed.

**Proves:** three-tier facts model; deterministic, evidence-backed screening.

### 7. Decision validation + confidence

- **Decision validation:** required inputs present, evidence complete, classification present,
  metric computation deterministic, threshold application correct, status internally consistent →
  fail-closed to CONDITIONAL/quarantine on any failure.
- **Decomposed confidence:** inherit Source-Trust × Data-Quality from the evidence inputs (the
  ceiling), then reduce by evidence completeness, methodology confidence (research-grade < formal;
  SIC-based classification is coarse), and **boundary proximity** (a metric near its threshold is a
  fragile result). Persist all sub-scores + model version.

**Proves:** decision validation; confidence bounded by inputs; boundary-proximity dimension.

### 8. Shariah certification (research-grade) + ledgers

- Emit a **RESEARCH_GRADE** Shariah certification (decision D2) that **references the data
  `dataset_version`** (separate-but-chained). Explicitly not a formal religious ruling.
- Append the decision to the **Decision Ledger** (`security · methodology_id · methodology_version ·
  status · valid_time · knowledge_time · confidence · evidence_bundle_ref · validator_ref ·
  certification_ref · decision_type = ACTUAL`) and the bundle to the **Evidence Ledger**.

**Proves:** graded certification, chaining, append-only decision + evidence ledgers.

---

## Acceptance criteria (the slice passes iff all hold)

1. **Reproducibility / determinism:** re-running the engine over the stored evidence bundle yields
   the **identical** L-METRIC values and L-JUDGE status.
2. **As-of query:** "what did we believe about this security's status on date *D*, under
   `AAOIFI-compatible v0.1`?" returns the correct decision from the bitemporal ledger, for both
   *as-we-believed-then* and *as-we-believe-now-about-then*.
3. **No overwrite:** every revision (a re-fetch, a corrected fact) appends; no prior record is
   mutated or deleted. Verifiable from the ledger history.
4. **Provenance closure:** from the final decision, every input is traceable back through evidence
   bundle → certified fact → curated record → raw CAS payload (with hash + capture time + source).
5. **Fail-closed:** with a required input withheld, the screen yields **CONDITIONAL**, never a
   default PASS, and certification is denied.
6. **Governance ⟂ execution:** changing a threshold in the methodology config (not code) changes the
   outcome on re-run; no code edit is required to alter thresholds/mappings.
7. **Tiering effect:** the Tier-C (Yahoo) source cannot, on its own, support a higher certification
   grade than its tier permits.
8. **Storage abstraction:** all reads/writes go through the storage interface; grepping the slice
   for SQLite-specific calls outside the storage adapter returns nothing.
9. **Layer boundary:** no Shariah judgment is written into any Core fact table; judgments live only
   in the Decision/Evidence ledgers.
10. **Global-ready shapes (GR-1…GR-7):** facts carry `canonical_concept` + `currency` +
    `accounting_standard`; prices carry `exchange` + `calendar_ref` + `currency`; identity resolves
    through a neutral ID with LEI/ticker as attributes; classification is `(scheme, code) →
    canonical`; text carries `language`. A **second-taxonomy mapping stub** (e.g. a tiny IFRS→
    canonical fixture for one concept) resolves to the same `canonical_concept` as its us-gaap
    counterpart — proving the fact store is taxonomy-neutral **without** adding a real market.

---

## Explicit non-goals for the slice

- No breadth (one security only).
- No restatement handling beyond *demonstrating* that a new filing version would append a new
  decision (the path exists; the scenario is not exercised at scale).
- No second methodology, no counterfactual product surface (the recompute mechanism exists, the UX
  does not).
- No object-storage / PostgreSQL migration (only abstraction-readiness is required).
- No formal certification, no scholar workflow.

---

## After the slice

Once the slice passes all acceptance criteria, breadth becomes mechanical: widen capture to the
S&P 500 universe, broaden the normalized fact set, and let the same trust spine carry it. The
architecture, not the volume, is what the slice de-risks. Adding a non-US market then reduces to
writing a filing-source adapter + a taxonomy/classification mapping — no schema or engine change,
as verified in the Global-Readiness Audit.

---

## Implementation approval

This is the **final pre-implementation artifact**. Approving it authorizes building the slice — and
only the slice — to satisfy the ten acceptance criteria above. Recommended build order:

1. Storage abstractions + CAS/WORM + bitemporal store (the spine everything writes through).
2. Price adapters (Stooq, Yahoo) → capture → reconcile → curated price.
3. EDGAR adapter → XBRL capture → us-gaap→canonical mapping → broad facts → validation.
4. Classification (SIC→canonical) + identity (neutral ID + LEI).
5. Data certification gate → `dataset_version`.
6. Methodology registry + "AAOIFI-compatible v0.1" governed config (provisional).
7. Evidence bundle → L-METRIC → L-JUDGE → decision validation → confidence → research-grade cert →
   decision + evidence ledgers.
8. As-of query + determinism check + the audit-trail and global-shape assertions.

**Open approval question:** the single reference security for the slice (any S&P 500 constituent
with clean recent 10-K XBRL — e.g. a large-cap industrial — suffices; the choice is illustrative,
not architectural).
