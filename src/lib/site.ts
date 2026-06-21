/**
 * Central content + configuration for the ASQIOS website.
 * Keeping copy here keeps section components presentational and easy to maintain.
 */

export const SITE = {
  name: "ASQIOS",
  domain: "asqios.com",
  url: "https://asqios.com",
  tagline: "Research • Governance • AI • Shariah",
  positioning: "Institutional Investment Intelligence",
  description:
    "ASQIOS is an AI-native investment intelligence platform combining quantitative research, governance controls, Shariah compliance, and machine-assisted analysis into a unified institutional framework.",
  email: "contact@asqios.com",
  linkedin: "https://www.linkedin.com/company/asqios",
} as const;

export const NAV_LINKS = [
  { label: "Platform", href: "#platform" },
  { label: "Architecture", href: "#architecture" },
  { label: "Constitution", href: "#constitution" },
  { label: "Governance", href: "#governance" },
  { label: "Shariah", href: "#shariah" },
  { label: "Roadmap", href: "#roadmap" },
  { label: "Research", href: "#research" },
] as const;

export const ORB_LABELS = [
  "Research",
  "Governance",
  "AI",
  "Shariah",
  "Data",
] as const;

export const TRUST_PILLARS = [
  { label: "Governance First", detail: "Decisions constrained by design" },
  { label: "Research First", detail: "Evidence precedes capital" },
  { label: "AI Native", detail: "Machine-assisted, human-governed" },
  { label: "Shariah Embedded", detail: "Compliance within the process" },
] as const;

export const INTELLIGENCE_STACK = [
  {
    title: "Research Engine",
    abbr: "01",
    description:
      "Structured, reproducible investigation pipelines that convert raw market data into evidence-graded research artifacts.",
  },
  {
    title: "Governance Core",
    abbr: "02",
    description:
      "A rules layer that constrains every conclusion — enforcing challenge, validation, and an auditable decision record.",
  },
  {
    title: "AI Intelligence Layer",
    abbr: "03",
    description:
      "Machine-assisted analysis that augments analysts, surfaces counter-evidence, and stress-tests every thesis.",
  },
  {
    title: "Validation Framework",
    abbr: "04",
    description:
      "Independent verification of data, methodology, and assumptions before any insight is permitted downstream.",
  },
  {
    title: "Portfolio Intelligence",
    abbr: "05",
    description:
      "Position-aware synthesis that translates governed research into disciplined, traceable allocation reasoning.",
  },
  {
    title: "Shariah Compliance Layer",
    abbr: "06",
    description:
      "Compliance encoded as architecture — screening embedded inside the process rather than applied after the fact.",
  },
] as const;

export const ARCHITECTURE_FLOW = [
  { label: "Market Data", note: "Normalized, time-stamped inputs" },
  { label: "Validation", note: "Integrity & methodology checks" },
  { label: "Research", note: "Evidence-graded investigation" },
  { label: "AI Review", note: "Adversarial analysis & counter-evidence" },
  { label: "Governance", note: "Challenge, approval, audit trail" },
  { label: "Portfolio Intelligence", note: "Governed allocation reasoning" },
] as const;

export const PHILOSOPHY = [
  "Evidence Before Narrative",
  "Research Before Capital",
  "Governance Before Scale",
  "Transparency Over Complexity",
  "Shariah Before Optimization",
] as const;

export const CONSTITUTION = [
  {
    title: "Primacy of Evidence",
    summary: "No conclusion stands without a documented, verifiable basis.",
    detail:
      "Every claim within ASQIOS is anchored to traceable evidence. Narrative is permitted only after the underlying data, method, and assumptions have been recorded and can be independently reconstructed.",
  },
  {
    title: "Mandatory Challenge",
    summary: "Each thesis must survive structured opposition before approval.",
    detail:
      "The framework institutionalizes dissent. Conclusions are subjected to adversarial review — human and machine — designed to falsify rather than confirm, before they advance.",
  },
  {
    title: "Auditable Lineage",
    summary: "Every decision is reconstructable from input to outcome.",
    detail:
      "From raw market data to final portfolio reasoning, each step is timestamped and archived. The provenance of any conclusion can be retraced in full at any future date.",
  },
  {
    title: "Compliance by Architecture",
    summary: "Shariah constraints are encoded into the process itself.",
    detail:
      "Compliance is not a post-hoc filter. Screening logic is embedded within the research and decision pipeline, so non-compliant pathways are structurally excluded from the outset.",
  },
  {
    title: "Restraint Over Reach",
    summary: "Discipline and clarity outrank scale and complexity.",
    detail:
      "ASQIOS favors transparent, defensible methods over opaque sophistication. Growth is permitted only where governance and research depth can scale alongside it.",
  },
  {
    title: "Human Accountability",
    summary: "AI assists; people remain responsible for every decision.",
    detail:
      "Intelligence is machine-augmented but never autonomous. Final judgment, and accountability for it, rests with named human decision-makers operating inside the governance core.",
  },
] as const;

export const GOVERNANCE_STEPS = [
  { label: "Investment Decision", note: "A proposed conclusion enters the engine" },
  { label: "Evidence", note: "Supporting data and methodology attached" },
  { label: "Challenge", note: "Structured adversarial review applied" },
  { label: "Validation", note: "Independent verification of integrity" },
  { label: "Approval", note: "Named accountability recorded" },
  { label: "Archive", note: "Permanent, reconstructable lineage" },
] as const;

export const ROADMAP = [
  { year: "2025", title: "Research Infrastructure", note: "Foundational data, validation, and research pipelines." },
  { year: "2026", title: "Validation Platform", note: "Independent verification surfaces and methodology controls." },
  { year: "2027", title: "AI Intelligence Platform", note: "Machine-assisted, adversarial research at scale." },
  { year: "2028", title: "Institutional Research Portal", note: "Governed research delivery for institutions." },
  { year: "2029", title: "Portfolio Intelligence Suite", note: "Position-aware, fully traceable allocation reasoning." },
  { year: "2030+", title: "Global Investment Intelligence Network", note: "A connected, governed intelligence fabric." },
] as const;

export const RESEARCH_LIBRARY = [
  { title: "The ASQIOS Constitution", category: "Foundational", note: "The operating principles of the institution." },
  { title: "Evidence Before Narrative", category: "Methodology", note: "Why conclusions must follow the data." },
  { title: "Governance in the Age of AI Investing", category: "Governance", note: "Constraining machine-assisted decisions." },
  { title: "Shariah by Design", category: "Compliance", note: "Embedding compliance into architecture." },
  { title: "The Intelligence Framework", category: "Architecture", note: "How the ASQIOS stack fits together." },
] as const;

export const FOUNDER = {
  role: "Founder & Principal Architect",
  credentials: ["MBA", "15+ Years Experience", "Project Controls", "Governance", "Research"],
  location: "Saudi Arabia",
  statement:
    "ASQIOS is built on a conviction formed over fifteen years across project controls, governance, and research: that durable investment decisions are produced by disciplined process, not by prediction. The framework encodes that discipline — evidence, challenge, and accountability — into the architecture itself.",
} as const;

export const FOOTER_GROUPS = [
  {
    heading: "Platform",
    links: [
      { label: "Research", href: "#platform" },
      { label: "Governance", href: "#governance" },
      { label: "AI", href: "#platform" },
      { label: "Shariah", href: "#shariah" },
    ],
  },
  {
    heading: "Framework",
    links: [
      { label: "Architecture", href: "#architecture" },
      { label: "Constitution", href: "#constitution" },
      { label: "Roadmap", href: "#roadmap" },
      { label: "Research Library", href: "#research" },
    ],
  },
] as const;
