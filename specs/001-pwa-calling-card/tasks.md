---
description: "Task list for NFC-Ready PWA Calling Card"
---

# Tasks: NFC-Ready PWA Calling Card

**Input**: Design documents from `/specs/001-pwa-calling-card/`  
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/, quickstart.md

**Tests**: Not requested — manual acceptance per `quickstart.md` only.

**Organization**: Tasks grouped by user story for independent implementation and testing.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies on incomplete tasks)
- **[Story]**: User story label (US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

Static site at repository root: `index.html`, `css/styles.css`, `js/`, `assets/`, `manifest.webmanifest`

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Repository layout and GitHub Pages prerequisites

- [x] T001 Create deployable directory structure: `css/`, `js/`, `assets/icons/`, `assets/images/` at repository root
- [x] T002 Add `.nojekyll` at repository root to disable Jekyll processing on GitHub Pages
- [x] T003 [P] Add placeholder app icons `assets/icons/icon-192.png` and `assets/icons/icon-512.png` (branded or neutral; required for PWA phase)

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Semantic HTML shell and shared styles that all user stories depend on

**⚠️ CRITICAL**: No user story work should ship until this phase is complete

- [x] T004 Create `index.html` semantic skeleton per `specs/001-pwa-calling-card/contracts/page-content-contract.md` (`header`, `main`, identity and contact sections, `lang="en"`, viewport meta)
- [x] T005 Create `css/styles.css` with CSS custom properties (`--color-bg`, `--color-text`, `--color-theme`), system font stack, and mobile-first base layout
- [x] T006 Link `css/styles.css` in `index.html` and add deferred `js/main.js` script tag (file may be stub until US3)

**Checkpoint**: Valid HTML opens in browser; structure visible before owner content and PWA layers

---

## Phase 3: User Story 1 - Instant identity from NFC tap (Priority: P1) 🎯 MVP

**Goal**: Visitors see name, tagline, and tappable contact immediately on mobile; page works with JavaScript disabled

**Independent Test**: Open `index.html` via local HTTP server on a phone (or responsive mode); confirm name, tagline, and primary contact are above the fold without scrolling; disable JS and confirm links still work

### Implementation for User Story 1

- [x] T007 [US1] Add owner profile fields (`h1` display name, tagline `p`) in `index.html` per `specs/001-pwa-calling-card/data-model.md`
- [x] T008 [US1] Add contact methods as semantic `ul` > `a` links (`mailto:`, `tel:`, or `https:`) with clear labels in `index.html`; include at least one primary contact
- [x] T009 [US1] Implement above-the-fold single-column hero layout for identity block in `css/styles.css`
- [x] T010 [US1] Style contact list with minimum 44×44px touch targets and readable spacing in `css/styles.css`
- [x] T011 [US1] Ensure WCAG 2.1 AA text/link contrast and visible `:focus-visible` outlines in `css/styles.css`
- [x] T012 [US1] Verify responsive layout at 320px and desktop widths in `css/styles.css` (no horizontal scroll)
- [x] T013 [US1] Manual no-JS check: load `index.html` with JavaScript disabled; confirm all identity and contact links work

**Checkpoint**: User Story 1 complete — viable calling card MVP without PWA or GitHub Pages

---

## Phase 4: User Story 2 - Publish and share a stable public link (Priority: P2)

**Goal**: Site is publishable to GitHub Pages over HTTPS with a stable URL for NFC programming

**Independent Test**: Enable GitHub Pages on the repo, push `main`, open live `https://*.github.io/...` URL over HTTPS; content matches local preview

### Implementation for User Story 2

- [x] T014 [US2] Audit all references in `index.html` for relative paths (`css/`, `js/`, `assets/`) suitable for project and user GitHub Pages sites
- [x] T015 [US2] Update `specs/001-pwa-calling-card/quickstart.md` with GitHub Pages settings (branch `main`, root `/`) and URL table for project vs user site
- [x] T016 [US2] Add root `README.md` with one-paragraph project description, link to `specs/001-pwa-calling-card/quickstart.md`, and placeholder for live Pages URL
- [x] T017 [US2] Document cache-bump workflow (`CACHE_NAME` in `js/sw.js`) in `specs/001-pwa-calling-card/quickstart.md` for content updates after publish
- [x] T018 [US2] Manual publish verification: push to GitHub, confirm HTTPS live site serves `index.html` and `css/styles.css` correctly

**Checkpoint**: User Story 2 complete — NFC-ready HTTPS URL documented and verified

---

## Phase 5: User Story 3 - Installable, revisit-friendly experience (Priority: P3)

**Goal**: Installable PWA with home-screen icon and offline access to core content after prior visit

**Independent Test**: On HTTPS live site, Add to Home Screen, launch from icon, then airplane-mode reload shows cached name, tagline, and contacts

### Implementation for User Story 3

- [x] T019 [P] [US3] Create `manifest.webmanifest` per `specs/001-pwa-calling-card/contracts/manifest-contract.md` (relative `start_url`, `scope`, icons, theme colors)
- [x] T020 [US3] Add `<link rel="manifest">` and `<meta name="theme-color">` to `index.html` matching `manifest.webmanifest`
- [x] T021 [US3] Implement `js/sw.js` per `specs/001-pwa-calling-card/contracts/service-worker-contract.md` (`CACHE_NAME`, precache list, network-first navigation, cache-first static assets, offline fallback)
- [x] T022 [US3] Implement `js/main.js` to register `./js/sw.js` with `scope: './'` when supported; `console.warn` on failure only
- [x] T023 [US3] Confirm `index.html` defers `js/main.js` and does not gate content on service worker readiness
- [x] T024 [US3] Manual PWA test on HTTPS: install/add to home screen, verify title and icon, then offline reload shows core content
- [x] T025 [US3] Manual first-visit-offline check: confirm readable fallback when no cache and no network (per spec edge case)

**Checkpoint**: User Story 3 complete — full PWA calling card on GitHub Pages

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Optional enhancements and constitution quality gates

- [x] T026 [P] Add optional portrait `assets/images/portrait.jpg` and `img` with meaningful `alt` in `index.html` (skip section if unused)
- [x] T027 Run full manual acceptance checklist in `specs/001-pwa-calling-card/quickstart.md` section 6
- [x] T028 Constitution quality pass: test in Chrome + Safari (or Firefox) and mobile viewport per `.specify/memory/constitution.md`
- [x] T029 [P] Optional Lighthouse PWA audit on live HTTPS URL; fix blocking manifest or SW issues only

---

## Phase 7: Personalized Hero & Branding (Plan delta 2026-06-01)

**Purpose**: Implement owner personalization per updated [plan.md](./plan.md)—hero with cover + portrait, gradient bridge, real contacts, theme from cover art

**Prerequisites**: Phases 1–6 complete (baseline PWA shipped); `assets/images/cover.png` and `assets/icons/profile_image.png` present

**Independent Test**: Local HTTP preview shows Kent Onyx S. Arintok, circular portrait on cover background, green→blue bridge, Email/Phone/LinkedIn links work with JS off; `theme-color` is `#1A4352`

### Setup (hero assets)

- [x] T030 Confirm `assets/images/cover.png` exists (Tisha Travel cover) and is referenced only from `css/styles.css` or `index.html`
- [x] T031 [P] Confirm `assets/icons/profile_image.png` exists and matches manifest icon paths in `manifest.webmanifest`

### User Story 1 — Hero identity & contacts (layout delta)

- [x] T032 [US1] Restructure `index.html` per `contracts/page-content-contract.md`: `.hero` → `.hero-bridge` → `.contact-panel` with `<address>` wrapper
- [x] T033 [US1] Set owner content in `index.html`: `h1` Kent Onyx S. Arintok, tagline, portrait `img` with `alt`, remove placeholder GitHub link
- [x] T034 [US1] Add contact links in `index.html`: `mailto:kentonyx@gmail.com`, `tel:+639276479058`, LinkedIn profile URL with labels Email / Phone / LinkedIn
- [x] T035 [US1] Implement hero styles in `css/styles.css`: `background-image` for `assets/images/cover.png`, overlay, circular `.hero__portrait`, readable name/tagline
- [x] T036 [US1] Implement `.hero-bridge` gradient (`#2E7D32` → `#0277BD`) and optional wave `clip-path` in `css/styles.css`
- [x] T037 [US1] Style `.contact-panel` on light `#f5f8fa` background with 44px touch targets and AA contrast in `css/styles.css`
- [x] T038 [US1] Verify 320px–desktop responsive hero (no clipped portrait, no horizontal scroll) in `css/styles.css`
- [x] T039 [US1] Manual no-JS check: `index.html` shows hero text, portrait `alt`, and working mailto/tel/https links

### User Story 3 — Theme & offline cache (PWA delta)

- [x] T040 [P] [US3] Update `manifest.webmanifest`: `theme_color` `#1A4352`, `background_color` `#f5f8fa` (keep owner name/icons)
- [x] T041 [US3] Sync `index.html` `<meta name="theme-color" content="#1A4352">` and `<title>` to Kent Onyx S. Arintok
- [x] T042 [US3] Bump `CACHE_NAME` to `calling-card-v2` in `js/sw.js` and add `./assets/images/cover.png` + `./assets/icons/profile_image.png` to `PRECACHE_URLS`
- [x] T043 [US3] Manual offline test after one online visit: hero cover, portrait, and contacts load from cache (localhost or HTTPS)

### Polish (hero acceptance)

- [x] T044 [P] Manual mobile test: tap Email opens mail app, tap Phone opens dialer with `+639276479058`
- [x] T045 Re-run `specs/001-pwa-calling-card/quickstart.md` section 6 hero/bridge checklist; push to GitHub Pages and re-verify HTTPS if live

**Checkpoint**: Personalized hero calling card ready for NFC with branded theme and offline hero assets

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies — start immediately
- **Foundational (Phase 2)**: Depends on Setup — **blocks all user stories**
- **User Story 1 (Phase 3)**: Depends on Foundational — **MVP**
- **User Story 2 (Phase 4)**: Depends on US1 (needs deployable content); can overlap US3 after US1
- **User Story 3 (Phase 5)**: Depends on Foundational + US1 (`index.html` and assets exist); benefits from US2 HTTPS for full PWA test
- **Polish (Phase 6)**: Depends on US1–US3 as applicable
- **Personalized Hero (Phase 7)**: Depends on Phases 1–6 baseline; **active work starts at T030**

### User Story Dependencies

| Story | Depends on | Can start after |
|-------|------------|-----------------|
| US1 | Foundational | T006 complete |
| US1 (hero delta) | Phase 7 setup | T031 complete |
| US2 | US1 content | T013 complete |
| US3 | Foundational, US1 | T013 complete (T018 HTTPS recommended before T024) |
| US3 (hero delta) | T032–T037 HTML/CSS | T037 complete before T042–T043 |

### Within Each User Story

- HTML content before PWA manifest references owner name
- `manifest.webmanifest` and icons before install testing
- `js/sw.js` before `js/main.js` registration testing
- GitHub Pages live URL before final PWA offline test on device

### Parallel Opportunities

- **Phase 1**: T003 parallel with T001–T002 after T001 creates `assets/icons/`
- **Phase 5**: T019 (`manifest.webmanifest`) parallel with T021 (`js/sw.js`) after US1
- **Phase 6**: T026 parallel with T027–T028
- **Phase 7**: T031 parallel with T030; T040 parallel with T035–T037 after T032; T044 parallel with T043

---

## Parallel Example: Phase 7 (Hero delta)

```bash
# After T032 (HTML structure):
Task T035: "Hero styles in css/styles.css"
Task T036: "Bridge gradient in css/styles.css"
Task T040: "Update manifest.webmanifest theme colors"

# After CSS complete:
Task T042: "Bump CACHE_NAME and precache images in js/sw.js"
Task T044: "Manual mailto/tel on mobile"
```

---

## Parallel Example: User Story 3

```bash
# After US1 checkpoint, launch in parallel:
Task T019: "Create manifest.webmanifest per contracts/manifest-contract.md"
Task T021: "Implement js/sw.js per service-worker-contract.md"

# Then sequentially:
Task T020: "Add manifest link to index.html"
Task T022: "Implement js/main.js"
Task T024: "Manual PWA test on HTTPS"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup  
2. Complete Phase 2: Foundational  
3. Complete Phase 3: User Story 1  
4. **STOP and VALIDATE**: Local HTTP preview + no-JS check (T013)  
5. Demo/share locally before NFC or Pages

### Incremental Delivery

1. Setup + Foundational → skeleton ready  
2. US1 → MVP calling card (local)  
3. US2 → Live GitHub Pages URL for NFC  
4. US3 → Install + offline enhancements  
5. Polish → Portrait, cross-browser, optional Lighthouse

### Suggested MVP Scope

**Phases 1–3** (T001–T013): Original static MVP (complete).

**Current focus — Phase 7** (T030–T045): Personalized hero + branding delta per updated plan.

---

## Task Summary

| Phase | Task IDs | Count | Status |
|-------|----------|-------|--------|
| Setup | T001–T003 | 3 | Complete |
| Foundational | T004–T006 | 3 | Complete |
| US1 (P1) | T007–T013 | 7 | Complete |
| US2 (P2) | T014–T018 | 5 | Complete |
| US3 (P3) | T019–T025 | 7 | Complete |
| Polish | T026–T029 | 4 | Complete |
| **Hero delta** | **T030–T045** | **16** | Complete |
| **Grand total** | T001–T045 | **45** | **45 done** |

**Parallel opportunities (Phase 7)**: T031, T040, T044 marked `[P]`; see Phase 7 parallel example above
