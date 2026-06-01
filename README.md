# Calling Card

A minimal static personal calling card: one HTML page, styled for mobile and NFC taps, installable as a Progressive Web App. Deploy **only** to [GitHub Pages](https://pages.github.com/).

## Live site

**Pages URL**: `https://<username>.github.io/calling-card/` (project site) or `https://<username>.github.io/` (user site) — replace `<username>` after enabling GitHub Pages.

**Owner**: Kent Onyx S. Arintok · Edit `index.html` and `manifest.webmanifest` to update copy.

## vCard (Add to Contacts)

- **File**: [`contact.vcf`](contact.vcf) — name, email, phone, LinkedIn (vCard 3.0)
- **On the page**: Tap **Add to Contacts** (works offline after one visit via service worker cache)
- **NFC — fastest, no website**: In [NFC Tools](https://www.wakdev.com/en/apps/nfc-tools.html) (iOS/Android), write a **Contact** / **vCard** record to your tag with the same details. Tap opens the native Contacts sheet instantly, fully offline.
- **NFC — URL to vCard only**: Program the tag with  
  `https://<username>.github.io/calling-card/contact.vcf`  
  First tap needs internet once; after that many phones cache the file.

## Quick start

- **Edit content**: `index.html`, `contact.vcf`, and `manifest.webmanifest`
- **Preview locally**: `python3 -m http.server 8080` → http://localhost:8080/
- **Publish & NFC**: See [specs/001-pwa-calling-card/quickstart.md](specs/001-pwa-calling-card/quickstart.md)

## Stack

HTML, CSS, and vanilla JavaScript — no build step, no frameworks.
