# Contract: Page Content (HTML) — Hero Layout

**File**: `index.html`  
**Updated**: 2026-06-01

## DOM structure

```html
<body>
  <main>
    <section class="hero" aria-label="Identity">
      <!-- background via CSS on .hero -->
      <img class="hero__portrait" src="assets/icons/profile_image.png" alt="Kent Onyx S. Arintok" width="120" height="120">
      <div class="hero__content">
        <h1>...</h1>
        <p class="hero__tagline">...</p>
      </div>
    </section>
    <div class="hero-bridge" aria-hidden="true"></div>
    <section class="contact-panel" aria-label="Contact">
      <address>
        <ul class="contact__list">...</ul>
      </address>
    </section>
  </main>
  <script src="js/main.js" defer></script>
</body>
```

## Required content

| Node | Requirement |
|------|-------------|
| `h1` | Kent Onyx S. Arintok |
| `.hero__tagline` | Non-empty tagline |
| Email link | `href="mailto:kentonyx@gmail.com"` |
| Phone link | `href="tel:+639276479058"` |
| LinkedIn link | Full profile URL, `rel="noopener noreferrer"` |
| Portrait `alt` | Person’s name |

## Link behavior (acceptance)

- Tap Email → OS mail composer with `kentonyx@gmail.com`
- Tap Phone → dialer with `+639276479058`
- Tap LinkedIn → browser profile page

## No-JS guarantee

All links and visible text present without script.

## Visual contract (CSS)

- Hero shows cover + circular portrait + name
- `.hero-bridge` visible gradient between hero and `.contact-panel`
- Contact panel readable (AA contrast) on light background
