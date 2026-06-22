# Lumina — Global-Readiness Audit of the Frozen Architecture

**Status:** design review (no code) · **Audited:** [Architecture Freeze](./lumina-architecture-freeze.md) ·
[Vertical-Slice Spec](./vertical-slice-spec.md) · **Date:** 2026-06-22

## Mandate

Review the frozen architecture for **hidden US-centric assumptions** — especially in the financial
facts layer — and verify that **Europe, Japan, China, GCC, and Saudi Arabia** can be added through
**adapters and mappings**, not architectural redesign. V1 still executes a US (S&P 500) slice; the
question is whether the *shapes* the slice writes are global from day one.

## Verdict

The architecture is **structurally global-ready** — its adapter contract, methodology-as-config,
replaceable classification, and vendor-neutral identity are the right seams. But **seven hidden
US-centric assumptions are implicit** rather than guaranteed. Left unstated they would force rework
for **Saudi (calendar, currency, Arabic, IFRS) and Japan (EDINET, JP-GAAP, TSE sectors, JPY)** in
particular. The remediation is **additive** — make seven invariants explicit and require global
record *shapes* now (filled with US values in V1) — **not a redesign.** That the fix is additive is
itself the proof the extensibility claim holds.

---

## Findings — hidden US-centric assumptions

| # | Where | Implicit US assumption | If left as-is | Remediation (seam) |
|---|-------|------------------------|---------------|--------------------|
| **A** | **Financial facts layer** | Facts keyed to the **us-gaap** taxonomy / EDGAR concepts | IFRS, JP-GAAP, China CAS, SOCPA filings can't populate the same fact store; cross-market comparison breaks | **Canonical concept model** — facts keyed to a Lumina-canonical vocabulary; per-taxonomy **mapping adapters** (us-gaap, IFRS, ESEF, EDINET, CAS, SOCPA) translate into it. The fact store never stores raw us-gaap concept names as its key. |
| **B** | Capture source | **EDGAR** as *the* filing source (CIK, accession numbers, forms 10-K/10-Q) | Non-US filers have no EDGAR presence; form types and frequencies differ | **Filing-source adapters** behind one contract; EDGAR is one adapter. CIK/accession/form are EDGAR-**native attributes**, never the spine. |
| **C** | Identity / symbology | **CIK** as issuer anchor; US ticker as security key | Global issuers have no CIK; tickers collide across exchanges | **Neutral internal entity/security IDs** with **LEI** as the cross-market anchor and per-source native IDs (CIK, ISIN, SEDOL, local codes) as attributes. |
| **D** | Classification | **SIC codes** as the classification | SIC is US-only; non-US issuers have NACE / TSE-33 / CSRC / Tadawul sectors | Classification records carry a **scheme identifier + code**, mapped to a **canonical sector taxonomy**; methodologies screen against canonical, never SIC directly. (Freeze already says classification is replaceable — this makes *scheme-neutrality* explicit.) |
| **E** | Money | Facts/prices implicitly **USD** | EUR/JPY/CNY/SAR facts mis-aggregate; cross-entity sums are nonsense | **Currency is a mandatory first-class attribute** on every monetary fact and price. FX conversion is a **derived/Research** concern, never stored into Core facts. (Ratios stay currency-neutral since numerator/denominator share currency.) |
| **F** | Time | **US market calendar** (Mon–Fri, NYSE/NASDAQ holidays) and **quarterly** reporting (10-Q×3 + 10-K) | **Tadawul trades Sun–Thu**; many markets report **semi-annually**; fiscal year-ends vary | **Per-exchange trading calendars** (no hardcoded week/holidays) and a **fiscal-period model** that assumes neither weekly shape nor 4 periods/year nor a December year-end. |
| **G** | Text / language | Business descriptions and labels in **English** | Japanese/Chinese/Arabic filings carry non-English text; English-only NLP later mis-handles them | Text fields carry a **language tag**; multilingual processing is a *future* maturity, but the *shape* must not assume English. |

Bonus (accounting standard, spans A): the *same* economic fact (e.g. "interest-bearing debt",
"non-permissible income") maps from **different line items under GAAP vs IFRS vs SOCPA**, and a
methodology's **base definition** (e.g. AAOIFI `total assets`) computes differently across
standards. Handled by the canonical layer (A) **plus** allowing methodology concept mappings to be
**parameterized by accounting standard** — already permitted by methodology-as-config (D3), made
explicit here.

---

## Global-readiness invariants (additive to the freeze)

These extend the frozen invariants; none contradicts an existing one.

- **GR-1 — Canonical concept model.** The financial-facts layer keys facts to a Lumina-canonical
  concept vocabulary; every external taxonomy enters through a versioned mapping adapter. *(seam A)*
- **GR-2 — Source-neutral identity.** Internal entity/security IDs anchored by LEI; all national/
  vendor identifiers are attributes. *(seam C)*
- **GR-3 — Scheme-tagged classification.** Classification carries `(scheme, code)` mapped to a
  canonical sector taxonomy; methodologies bind to canonical. *(seam D)*
- **GR-4 — Currency as first-class.** Every monetary value carries its currency; FX is derived,
  never written into Core facts. *(seam E)*
- **GR-5 — Calendar & period neutrality.** Trading calendars are per-exchange; the fiscal-period
  model assumes no fixed frequency, week shape, or year-end. *(seam F)*
- **GR-6 — Language-tagged text.** Free-text fields carry a language tag. *(seam G)*
- **GR-7 — Accounting-standard awareness.** Canonical mappings and methodology base definitions may
  be parameterized by accounting standard (GAAP / IFRS / JP-GAAP / CAS / SOCPA). *(seams A + D3)*

**Principle (unchanged):** broad architecture, shallow maturity. V1 fills these shapes with US
values (USD, us-gaap→canonical, SIC→canonical, NYSE/NASDAQ calendar, English), but the **shapes are
global from the first commit** — so adding a market is data, not redesign.

---

## Per-market verification — adapter/mapping vs redesign

For each target, everything required is an **adapter or a mapping** once GR-1…GR-7 hold. Nothing
demands a schema or engine redesign.

| Market | Filing/source adapter | Concept mapping | Classification mapping | Currency | Calendar / frequency | Identity | Verdict |
|--------|----------------------|-----------------|------------------------|----------|----------------------|----------|---------|
| **Europe** | ESEF / national registries / commercial (Tier B/C) | IFRS → canonical | NACE → canonical | EUR/GBP/CHF… | per-exchange; semi-annual common | LEI/ISIN | **Adapter + mapping** |
| **Japan** | EDINET (XBRL) | JP-GAAP / IFRS → canonical | TSE-33 → canonical | JPY | TSE calendar; semi-annual | LEI/local code | **Adapter + mapping** |
| **China** | CNINFO / SSE / SZSE (licensed Tier may apply) | China CAS → canonical | CSRC industry → canonical | CNY | A-share calendar | LEI/local code | **Adapter + mapping** |
| **GCC** | DFM / ADX / QSE / Boursa Kuwait / Bahrain / Muscat | IFRS → canonical | local sectors → canonical | AED/QAR/KWD… | many **Sun–Thu** | LEI/local code | **Adapter + mapping** |
| **Saudi (Tadawul)** | Tadawul / CMA | SOCPA / IFRS → canonical | Tadawul sectors → canonical | SAR | **Sun–Thu trading week**; CMA frequency | LEI/local code | **Adapter + mapping** |

Notes:
- **Saudi and the GCC are the stress test for GR-5** (the Sunday–Thursday week) and **GR-4/GR-6**
  (SAR, Arabic). They pass *only because* the seams are explicit — which is exactly why this audit
  matters. Saudi is also where Shariah screening is most consequential, and the methodology registry
  already supports multiple standards/boards alongside the AAOIFI-compatible default.
- **China** may require a licensed data source; the **Tier A/B/C plug-in framework (C1)** already
  covers that without redesign.

**Conclusion:** with GR-1…GR-7 made explicit, all five markets are **additive (adapter + mapping)**.
Without GR-1 (canonical concepts) and GR-5 (calendar/frequency), Saudi and Japan would have forced
rework — so these two seams are the audit's most important catch.

---

## Impact on the deliverables

- **Architecture Freeze:** append GR-1…GR-7 as additive invariants (no frozen decision changes).
- **Vertical-Slice Spec:** require **global-ready record shapes** now — the US slice must write
  facts with `(canonical_concept, currency, accounting_standard)`, prices with
  `(exchange, calendar_ref, currency)`, identity via neutral ID + LEI attribute, and classification
  as `(scheme=SIC, code) → canonical`. V1 fills them with US values; the shapes are global. This is
  reflected in the finalized slice spec.
