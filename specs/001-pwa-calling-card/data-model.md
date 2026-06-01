# Data Model: NFC-Ready PWA Calling Card

**Feature**: `001-pwa-calling-card` | **Updated**: 2026-06-01

Static content in `index.html`, `manifest.webmanifest`, and image paths below.

## Owner Profile

| Field | Value | Required |
|-------|--------|----------|
| `displayName` | Kent Onyx S. Arintok | Yes |
| `shortName` | Onyx | Yes (manifest) |
| `tagline` | Owner-defined one-liner (e.g. role or Tisha Travel) | Yes |
| `bio` | Optional | No |
| `portraitUrl` | `assets/icons/profile_image.png` | Yes (hero) |
| `coverUrl` | `assets/images/cover.png` | Yes (hero background) |

## Contact Methods

| label | kind | href | priority |
|-------|------|------|----------|
| Email | email | `mailto:kentonyx@gmail.com` | primary |
| Phone | phone | `tel:+639276479058` | primary |
| LinkedIn | social | `https://www.linkedin.com/in/kent-onyx-arintok-310981234/` | secondary |

**Validation**: Phone href MUST be digits after `tel:` with leading `+` for international format.

## Theme Tokens (CSS + manifest)

| Token | Value |
|-------|--------|
| `theme_color` | `#1A4352` |
| `background_color` | `#f5f8fa` |
| Bridge gradient | `#2E7D32` → `#0277BD` |

## Published Site

Unchanged: GitHub Pages HTTPS URL; cache version in `js/sw.js` (`calling-card-v2` after hero update).
