# Quickstart: NFC-Ready PWA Calling Card

**Feature**: `001-pwa-calling-card`

## Prerequisites

- GitHub account; repository pushed to GitHub
- Modern mobile browser for NFC / PWA tests

## 1. Preview locally

```bash
python3 -m http.server 8080
```

Open http://localhost:8080/ (not `file://`).

## 2. Configure your content

| What | File |
|------|------|
| Name, tagline, links | `index.html` |
| Theme / install name | `manifest.webmanifest` |
| Portrait (hero circle) | `assets/icons/profile_image.png` |
| Cover (hero background) | `assets/images/cover.png` |
| Colors & layout | `css/styles.css` (`--color-theme`, bridge gradient) |

**Owner defaults** (2026-06-01):

- Email: `mailto:kentonyx@gmail.com`
- Phone: `tel:+639276479058`
- LinkedIn: https://www.linkedin.com/in/kent-onyx-arintok-310981234/

After visual changes, bump `CACHE_NAME` in `js/sw.js` (e.g. `calling-card-v2` → `v3`).

## 3. Publish to GitHub Pages

1. Push `main` to GitHub.
2. **Settings** → **Pages** → Deploy from branch **`main`**, folder **`/` (root)**.
3. Ensure `.nojekyll` exists at repo root.

## 4. NFC URL

| Site type | URL |
|-----------|-----|
| Project site | `https://<username>.github.io/calling-card/` |
| User site | `https://<username>.github.io/` |

Program the HTTPS URL on your NFC tag.

## 5. PWA + offline

1. Open live HTTPS URL on phone.
2. Add to Home Screen.
3. Visit online once, then test offline — hero + contacts should load from cache.

## 6. Pre-ship checklist

- [ ] Hero: cover + portrait + name visible on 320px width
- [ ] Gradient bridge visible between hero and contact list
- [ ] Email opens mail app; phone opens dialer on mobile
- [ ] `theme-color` matches brand (`#1A4352`) in browser chrome
- [ ] Two browsers on live HTTPS (Chrome + Safari or Firefox)
- [ ] Keyboard tab through all links

## Content update workflow

1. Edit HTML/CSS/assets.
2. Increment `CACHE_NAME` in `js/sw.js`.
3. Push to `main`; hard-refresh or clear site data on phone if needed.
