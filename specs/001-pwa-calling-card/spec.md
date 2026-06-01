# Feature Specification: NFC-Ready PWA Calling Card

**Feature Branch**: `001-pwa-calling-card`  
**Created**: 2026-06-01  
**Status**: Draft  
**Input**: User description: "Build a static web page that can be launch instantly on Github Pages. I will use it as my calling card. It should be a Progressive Web App since i will link my github pages link to my nfc card."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Instant identity from NFC tap (Priority: P1)

A person taps the owner's NFC card (or opens the shared link) on a phone and immediately sees who the owner is, what they do, and how to reach them—without signing in or navigating menus.

**Why this priority**: The NFC use case is the primary distribution channel; failure here makes the calling card useless in the field.

**Independent Test**: Open the published URL on a mobile device with a typical cellular connection; confirm name, role or tagline, and at least one contact action are visible without scrolling on a standard phone screen.

**Acceptance Scenarios**:

1. **Given** a visitor with a modern mobile browser, **When** they open the GitHub Pages URL from an NFC tap or QR/link share, **Then** the owner's display name and role or tagline appear above the fold within 5 seconds.
2. **Given** a visitor viewing the page for the first time, **When** the page finishes loading, **Then** at least one primary contact action (e.g., email or preferred link) is visible and tappable without extra steps.
3. **Given** JavaScript is disabled in the browser, **When** the page loads, **Then** all identity and contact content in the main calling card remains readable and usable via standard links.

---

### User Story 2 - Publish and share a stable public link (Priority: P2)

The owner publishes the calling card to GitHub Pages so the same HTTPS URL can be engraved on an NFC tag, shared in bios, and opened by anyone worldwide.

**Why this priority**: A permanent, zero-server-maintenance host is required before NFC deployment is safe to rely on.

**Independent Test**: Deploy to GitHub Pages from the repository; verify the live URL loads the calling card over HTTPS and matches what appears when previewed locally.

**Acceptance Scenarios**:

1. **Given** the repository is configured for GitHub Pages, **When** the owner pushes the static site to the publishing branch or folder, **Then** the site is reachable at the configured `*.github.io` URL within a reasonable publish window (typically minutes).
2. **Given** the live site URL, **When** a visitor opens it on desktop or mobile, **Then** they receive the same calling card content as in the owner's latest published version.
3. **Given** the owner updates contact details or copy, **When** they republish, **Then** visitors see the updated content after cache refresh or on next visit without changing the base URL.

---

### User Story 3 - Installable, revisit-friendly experience (Priority: P3)

Returning visitors (or the owner) can treat the calling card like an app: add it to the home screen, see branded launch behavior, and reopen it quickly—including limited offline reuse after a prior visit.

**Why this priority**: PWA behavior improves repeat access and resilience when network is spotty after someone has already opened the card once.

**Independent Test**: On a supported mobile browser, use "Add to Home Screen" (or equivalent), launch from the icon, then enable airplane mode and confirm the calling card still opens with core identity content from a prior visit.

**Acceptance Scenarios**:

1. **Given** a visitor on a browser that supports installable web apps, **When** they use the browser's install or "Add to Home Screen" flow, **Then** the installed shortcut opens the calling card with the owner's name and icon branding.
2. **Given** a visitor who has opened the site at least once while online, **When** they open it again with poor or no connectivity, **Then** core identity content (name, role or tagline, and primary contact links) is still available from cached content.
3. **Given** the owner has not requested push notifications or analytics, **When** the installable experience is offered, **Then** no permission prompts beyond what is required for installation and optional offline caching appear.

---

### Edge Cases

- What happens when a visitor's browser does not support installable web apps? The calling card MUST still work as a normal secure web page; installation is an enhancement, not a requirement to view content.
- How does the system handle GitHub Pages project sites vs. user/org sites (`username.github.io` vs. `username.github.io/repo-name`)? Publishing instructions MUST document the correct public base URL so asset and manifest paths resolve on the live site.
- What happens on first visit while fully offline? The visitor sees a clear, readable fallback message that connectivity is needed for the first load; no blank screen.
- How are very small screens (320px width) and large desktop viewports handled? Layout remains readable, tappable targets remain usable, and identity block does not require horizontal scrolling.
- What if the owner omits optional fields (photo, phone, some social links)? The page remains complete with name, role or tagline, and at least one contact path; empty sections are not shown.
- How does caching behave after a content update? Repeat visitors eventually receive updated content without the owner changing the NFC URL (cache refresh or versioned cache strategy documented for the owner).

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The system MUST present the owner's display name, role or one-line tagline, and at least one primary contact method on the default mobile view without requiring navigation or modals.
- **FR-002**: The system MUST be deliverable entirely as static files publishable to GitHub Pages with no application server required.
- **FR-003**: The live calling card MUST be served over HTTPS on the GitHub Pages URL so NFC and mobile browsers treat it as a secure destination.
- **FR-004**: The system MUST meet installable progressive web app expectations: a web app manifest (name, short name, icons, theme/display metadata) and offline caching sufficient for core identity content on repeat visits.
- **FR-005**: Primary identity and contact content MUST remain available when JavaScript is disabled; enhanced behaviors (install prompts, offline caching orchestration) MAY rely on JavaScript.
- **FR-006**: Contact actions MUST use clear labels (e.g., "Email", "LinkedIn", "GitHub") and open the correct destination (mailto, tel, or external profile URLs).
- **FR-007**: The owner MUST be able to configure calling card content (name, tagline, links, optional portrait) by editing static source content without a database or admin panel.
- **FR-008**: The system MUST provide icon assets suitable for home-screen installation at standard sizes defined in the manifest.
- **FR-009**: The page MUST be mobile-first and readable from 320px width upward, with touch targets sized for finger interaction.
- **FR-010**: The system MUST meet accessibility expectations for public pages: semantic structure, sufficient color contrast for text and links, keyboard-operable links, and meaningful text alternatives for non-decorative images.
- **FR-011**: The system MUST NOT require user accounts, cookies for authentication, or third-party trackers by default.
- **FR-012**: Publishing documentation MUST describe how to enable GitHub Pages and which URL to program on the NFC tag.

### Key Entities

- **Owner profile**: Public identity for the card owner—display name, role or tagline, optional short bio, optional portrait image.
- **Contact method**: A labeled way to reach or follow the owner (email, phone, website, social profile); includes human-readable label and destination target.
- **Published site**: The version of the calling card live at the GitHub Pages HTTPS URL; updated when the owner republishes static files.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: In moderated tests, at least 90% of first-time mobile visitors identify the owner's name and primary contact path within 5 seconds of opening the NFC or shared link.
- **SC-002**: The owner can go from repository clone to a live GitHub Pages URL following documented steps in under 30 minutes (excluding DNS or org approval delays outside the project).
- **SC-003**: On a mid-tier mobile connection, first-time visitors see meaningful identity content (name and tagline) within 3 seconds of navigation start in at least 9 of 10 trials.
- **SC-004**: After one successful online visit, at least 95% of repeat opens on the same device show core identity content when the device has no network connectivity.
- **SC-005**: On browsers that support installation, the "Add to Home Screen" (or platform equivalent) flow completes successfully and launches the calling card with correct title and icon in at least 9 of 10 trials.
- **SC-006**: All text and interactive elements pass an accessibility contrast and keyboard navigation review against WCAG 2.1 Level AA for the calling card scope.

## Assumptions

- The owner has or will create a GitHub repository and can enable GitHub Pages (user/organization site or project site); the exact URL pattern is documented during implementation planning.
- Calling card copy and links are provided by the owner; placeholder content may ship initially and be replaced before NFC tags are programmed.
- English is the default language for v1; additional locales are out of scope unless added in a follow-up feature.
- Push notifications, background sync beyond basic caching, user comments, contact forms with server processing, and analytics are out of scope for v1.
- Portrait image is optional; if omitted, a typographic or monogram presentation is acceptable.
- NFC hardware programming is performed by the owner outside this project; the feature delivers only the URL and page experience.
- PWA installation behavior varies by browser (especially on iOS); the spec requires full page functionality everywhere and install/offline enhancements where the platform supports them.
- No build toolchain is required unless later justified in the implementation plan; static HTML, CSS, and minimal JavaScript align with the project constitution.
