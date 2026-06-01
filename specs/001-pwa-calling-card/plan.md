# Implementation Plan: NFC-Ready PWA Calling Card (Personalized Hero)

**Branch**: `001-pwa-calling-card` | **Date**: 2026-06-01 | **Spec**: [spec.md](./spec.md)  
**Input**: Feature specification + owner personalization (2026-06-01)

**Plan input (delta)**: Owner content and branding — `manifest.webmanifest` updated for Kent Onyx S. Arintok; profile `assets/icons/profile_image.png`; cover `assets/images/cover.png` (Tisha Travel branding); hero + gradient bridge layout; `theme_color` derived from cover; `mailto:` / `tel:` / LinkedIn actions.

## Summary

Extend the existing static PWA calling card with a **hero layer**: cover image as background, circular profile portrait centered on the hero, name/tagline overlaid with readable contrast, and a **gradient bridge** (green → blue, matching cover artwork) transitioning into a contact panel below. Contact links use native `mailto:kentonyx@gmail.com`, `tel:+639276479058`, and the owner’s LinkedIn URL—all functional without JavaScript. Theme colors (`#1A4352` primary, gradient accents `#2E7D32` / `#0277BD`) align with the cover photo. Still vanilla HTML/CSS/JS, GitHub Pages only, no build step.

## Technical Context

**Language/Version**: HTML5, CSS3, ECMAScript (ES2020+; no transpiler)  
**Primary Dependencies**: None (browser APIs only)  
**Storage**: N/A  
**Testing**: Manual acceptance per spec + visual check on mobile hero/bridge  
**Target Platform**: GitHub Pages (HTTPS); mobile-first (NFC)  
**Project Type**: Static single-page PWA  
**Performance Goals**: Hero image optimized (cover ≤ ~200KB target); FCP &lt; 1.5s; identity visible &lt; 3s  
**Constraints**: GitHub Pages only; no CDN; core content in HTML; 320px+; WCAG AA on contact panel text  
**Scale/Scope**: Same file set + 2 image assets (profile, cover); CSS gradient bridge (no image sprites required)

## Owner Content (implementation source of truth)

| Field | Value |
|-------|--------|
| Display name | Kent Onyx S. Arintok |
| Short name (manifest) | Onyx |
| Email | `mailto:kentonyx@gmail.com` |
| Phone | `tel:+639276479058` |
| LinkedIn | `https://www.linkedin.com/in/kent-onyx-arintok-310981234/` |
| Profile image | `assets/icons/profile_image.png` |
| Cover image | `assets/images/cover.png` |
| Theme color | `#1A4352` (navy/teal from cover logo) |
| Background color | `#f5f8fa` (contact panel light surface) |

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Status | Evidence |
|-----------|--------|----------|
| Static-First | PASS | Name, links, images in HTML/CSS; no JS for contact actions |
| Radical Simplicity | PASS* | CSS-only hero/bridge; one extra image file; no new libraries |
| Semantic, Accessible Markup | PASS* | `main`, `section`, `address` for contacts; `alt` on portrait; contrast overlay on hero text |
| Zero-Dependency | PASS | Self-hosted images; system fonts |
| Instant Comprehension | PASS* | Name + portrait visible in hero; primary contact in first screen or immediately below bridge |

*Post-design notes:*

- Hero decorative cover MUST NOT be the only cue for identity—name in HTML text required (FR-001).
- Large cover image: justify in Complexity Tracking (branding requirement); precache in SW.
- Manifest uses `profile_image.png` for icons (owner choice); keep dedicated 192/512 optional for sharper install icons if needed later.

## Project Structure

### Documentation

```text
specs/001-pwa-calling-card/
├── plan.md, research.md, data-model.md, quickstart.md, contracts/, tasks.md
```

### Source Code (repository root)

```text
index.html                      # Hero + bridge + contact (semantic)
css/styles.css                  # Hero background, overlay, gradient bridge, contact panel
js/main.js, js/sw.js
manifest.webmanifest            # Owner-updated name, theme, profile icon
assets/icons/profile_image.png  # Circular portrait in hero; manifest icon
assets/images/cover.png         # Hero background (Tisha Travel cover)
assets/icons/icon-192.png       # Legacy precache; optional retain for SW
assets/icons/icon-512.png
.nojekyll
```

**Structure Decision**: Unchanged root deploy for GitHub Pages; cover lives under `assets/images/` (not `icons/`) per data-model portrait/cover split.

## UI Architecture

```text
┌─────────────────────────────────────┐
│  HERO (.hero)                       │
│  background: cover.png              │
│  overlay: dark gradient for text    │
│  ┌─────────┐                        │
│  │ profile │  circular img          │
│  └─────────┘                        │
│  h1 name, p tagline                 │
├─────────────────────────────────────┤
│  BRIDGE (.hero-bridge)              │
│  CSS gradient green→blue, wave/slant│
│  (visual transition to panel below) │
├─────────────────────────────────────┤
│  CONTACT (.contact-panel)           │
│  address > ul > a                   │
│  Email | Phone | LinkedIn           │
└─────────────────────────────────────┘
```

**Gradient bridge**: Implemented with a block element between hero and contact using `linear-gradient(90deg, #2E7D32, #0277BD)` plus optional `clip-path` polygon or stacked pseudo-elements for a soft “wave” edge—pure CSS, no extra HTTP requests.

**theme-color / manifest**: Set to `#1A4352`; `background_color` `#f5f8fa` for splash/install; `<meta name="theme-color">` matches manifest.

## Complexity Tracking

| Addition | Why Needed | Simpler Alternative Rejected Because |
|----------|------------|--------------------------------------|
| Cover background image | Owner branding + hero design | Solid color loses cover brand and requested look |
| Gradient bridge block | Explicit UX request for hero→details transition | Abrupt flat split looks disconnected |
| Text overlay on hero | Readability over busy cover | Raw cover alone fails contrast (FR-010) |
| Precache cover + profile in SW | Offline PWA after first visit | Omitting breaks SC-004 for branded hero |

## Phase 0 & 1 Artifacts

- [research.md](./research.md) — theme extraction, hero/bridge CSS, link behavior  
- [data-model.md](./data-model.md) — owner fields populated  
- [contracts/](./contracts/) — page layout, manifest theme, SW precache updated  
- [quickstart.md](./quickstart.md) — content edit paths for hero assets  

## Implementation Notes (for `/speckit.tasks` or `/speckit.implement`)

1. Restructure `index.html`: `.hero` → `.hero-bridge` → `.contact-panel` with owner links.  
2. Update `css/styles.css`: cover `background-image`, portrait circle, overlay, bridge gradient, light contact section.  
3. Sync `manifest.webmanifest` `theme_color` / `background_color` to `#1A4352` / `#f5f8fa`.  
4. Bump `CACHE_NAME` in `js/sw.js`; add `./assets/images/cover.png` and `./assets/icons/profile_image.png` to precache.  
5. Verify `mailto:` opens mail client and `tel:` initiates call on mobile.  
6. Manual: 320px hero not clipped; tab order hero → contact links.
