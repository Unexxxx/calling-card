<!--
Sync Impact Report
- Version change: (template/unversioned) → 1.0.0
- Modified principles: N/A (initial ratification from template placeholders)
- Added sections: Technical Constraints; Quality & Verification
- Removed sections: None (template example comments removed on fill)
- Templates: plan-template.md ✅ | spec-template.md ✅ | tasks-template.md ✅
  | constitution-template.md (unchanged source) | .cursor/commands/* ✅ (no updates required)
- Follow-up TODOs: None
-->

# Calling Card Constitution

## Core Principles

### I. Static-First Delivery

The calling card MUST ship as static assets (HTML, CSS, and optional minimal JavaScript)
that render without a server-side runtime. All primary content and layout MUST be visible
with JavaScript disabled. Deployment MUST work on any static host or by opening
`index.html` locally.

**Rationale**: A calling card is a single-purpose, shareable page; static delivery
maximizes portability, cost, and reliability.

### II. Radical Simplicity

The implementation MUST stay minimal: one primary HTML document, one stylesheet unless
splitting clearly improves maintainability, and no build toolchain unless a later
amendment documents concrete need. New files, dependencies, or abstractions REQUIRE
justification in the feature plan's Complexity Tracking table.

**Rationale**: The product goal is "simple and straightforward"; complexity is the
main failure mode.

### III. Semantic, Accessible Markup

Structure MUST use semantic HTML (e.g., `header`, `main`, `section`, `address`,
appropriate heading levels). Text MUST meet WCAG 2.1 Level AA contrast for body and
links. Interactive elements MUST be keyboard-operable; images MUST have meaningful
`alt` text or be marked decorative.

**Rationale**: The page is read by humans and assistive tech; clarity and access are
non-negotiable for a public identity page.

### IV. Zero-Dependency by Default

Third-party libraries, frameworks, and CDNs MUST NOT be added unless the spec documents
why native HTML/CSS is insufficient. Prefer system fonts and self-hosted assets. External
requests (analytics, fonts, widgets) MUST be opt-in via explicit feature scope, not
defaults.

**Rationale**: Dependencies add weight, privacy surface, and breakage risk for a tiny
static page.

### V. Instant Comprehension

A first-time visitor MUST identify name, role or tagline, and primary contact paths
within five seconds of load on a typical viewport. Above-the-fold content MUST NOT
depend on carousels, modals, or navigation to reveal core identity. Optional sections
(e.g., links, bio) MUST not obscure the primary identity block.

**Rationale**: A calling card fails if visitors hunt for who you are and how to reach you.

## Technical Constraints

- **Stack**: HTML5 and CSS3; JavaScript only when behavior cannot be achieved with
  HTML/CSS alone.
- **Repository layout**: Static assets at repository root or under `public/` as chosen
  in the implementation plan; the plan MUST document the canonical entry file
  (typically `index.html`).
- **Styling**: Mobile-first responsive layout; MUST be usable from 320px width upward.
- **Assets**: Images optimized for web; prefer SVG for icons/logos when appropriate.
- **Security**: No secrets in the repository; no server credentials in static files.
- **Out of scope (unless amended)**: Backend APIs, databases, authentication, SSR,
  SPA frameworks, and mandatory build pipelines.

## Quality & Verification

- **Manual verification**: Each feature MUST be checked in at least two browsers
  (one Chromium-based, one other) and one mobile viewport before merge.
- **Performance**: First Contentful Paint SHOULD be under 1.5s on a mid-tier mobile
  connection for the default asset set; justify exceptions in the plan.
- **Tests**: Automated tests are OPTIONAL unless explicitly requested in the feature
  spec; manual acceptance scenarios in the spec remain mandatory.
- **Documentation**: `quickstart.md` for a feature MUST describe how to open or host
  the static page in one or two steps.

## Governance

This constitution supersedes ad-hoc practices for the Calling Card project. Amendments
MUST update `.specify/memory/constitution.md`, bump `CONSTITUTION_VERSION` per semantic
versioning, set `LAST_AMENDED_DATE` to the amendment date, and refresh dependent
templates when principles change.

- **Compliance**: `/speckit.plan` Constitution Check and `/speckit.analyze` MUST treat
  violations of MUST rules as blocking unless documented in Complexity Tracking.
- **Amendments**: Propose via `/speckit.constitution` with rationale; MINOR for new
  principles or material expansion; PATCH for clarifications; MAJOR for removals or
  redefinitions that break prior specs.
- **Runtime guidance**: Feature specs and plans under `specs/` are the source of truth
  for per-feature detail; this file is the source of truth for non-negotiable project
  rules.

**Version**: 1.0.0 | **Ratified**: 2026-06-01 | **Last Amended**: 2026-06-01
