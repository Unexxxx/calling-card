# Contract: Service Worker

**File**: `js/sw.js`  
**Updated**: 2026-06-01

## Cache identity

```javascript
const CACHE_NAME = 'calling-card-v2';
```

## Precache list (additions)

Must include previous shell assets plus:

- `./assets/images/cover.png`
- `./assets/icons/profile_image.png`

## Offline behavior

Cached `index.html` + images MUST allow offline hero + contact after first online visit.

## Acceptance

Airplane mode reload shows name, portrait, and contact links from cache.
