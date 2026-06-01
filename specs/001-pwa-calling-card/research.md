# Research: NFC-Ready PWA Calling Card

**Feature**: `001-pwa-calling-card` | **Updated**: 2026-06-01 (hero + personalization)

## 1. Hosting: GitHub Pages only

**Decision**: Unchanged — deploy from `main`, root `/`, relative URLs.

**Rationale**: Owner constraint; hero assets use relative paths `assets/images/cover.png`, `assets/icons/profile_image.png`.

---

## 2. Theme colors from cover photo (Tisha Travel cover)

**Decision**:

| Token | Hex | Source |
|-------|-----|--------|
| `--color-theme` / `theme_color` | `#1A4352` | Navy/teal from logo text |
| `--color-bridge-green` | `#2E7D32` | Left wave green |
| `--color-bridge-blue` | `#0277BD` | Right wave blue |
| `--color-panel-bg` | `#f5f8fa` | Light contact section (readable links) |
| `--color-hero-overlay` | `rgba(26, 67, 82, 0.55)` | Text contrast on cover |

**Rationale**: Matches owner cover artwork; satisfies manifest `theme_color` request without build-time extraction tools.

**Alternatives considered**: Auto-sampling cover in JS — rejected (unnecessary JS, constitution prefers CSS).

---

## 3. Hero layout (cover + profile)

**Decision**:

- `.hero` uses `background-image: url('../assets/images/cover.png')` (path from CSS: `url('../assets/images/cover.png')` in `css/styles.css`).
- `background-size: cover; background-position: center top; min-height: 42vh` (mobile), taller on desktop.
- Portrait: `<img class="hero__portrait" src="assets/icons/profile_image.png" alt="Kent Onyx S. Arintok">` with `border-radius: 50%`, white ring, `object-fit: cover`.
- Name/tagline in `.hero__content` with overlay behind text (`::before` or inner overlay div).

**Rationale**: FR-005 — all text in HTML; images are enhancement. Instant comprehension — face + name in hero.

**Alternatives considered**: CSS-only background for portrait — rejected (needs `alt` for FR-010).

---

## 4. Gradient bridge

**Decision**: Dedicated `.hero-bridge` element between hero and contact:

```css
.hero-bridge {
  height: 2.5rem;
  background: linear-gradient(90deg, var(--color-bridge-green), var(--color-bridge-blue));
  /* optional: clip-path for soft curve */
}
```

Optional `clip-path: ellipse(120% 100% at 50% 0%)` on top edge for wave feel—tune in implementation.

**Rationale**: Owner-requested transition; mirrors cover’s green→blue waves without extra assets.

---

## 5. Contact link behavior

**Decision**:

| Label | href |
|-------|------|
| Email | `mailto:kentonyx@gmail.com` |
| Phone | `tel:+639276479058` |
| LinkedIn | `https://www.linkedin.com/in/kent-onyx-arintok-310981234/` |

Remove placeholder GitHub link unless owner adds later.

**Rationale**: FR-006 native schemes; mobile NFC tap-to-call/email.

---

## 6. Manifest (owner-modified)

**Decision**: Keep owner’s `manifest.webmanifest`:

- `name`: Kent Onyx S. Arintok  
- `short_name`: Onyx  
- `icons`: `profile_image.png` at 192 and 512 (acceptable; may be soft at 512—optional future dedicated icons)

Update `theme_color` to `#1A4352`, `background_color` to `#f5f8fa` during implement.

---

## 7. PWA precache delta

**Decision**: Add to `PRECACHE_URLS`:

- `./assets/images/cover.png`
- `./assets/icons/profile_image.png`

Bump `CACHE_NAME` to `calling-card-v2` on deploy.

---

## 8. Performance (cover image)

**Decision**: Use PNG cover as provided; if &gt; 300KB, consider manual compression before NFC launch (document in quickstart, not automated).

**Rationale**: Constitution performance SHOULD without mandating build pipeline.
