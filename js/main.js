/**
 * Register service worker for PWA offline support.
 * Content is not gated on SW readiness (constitution / contract).
 */
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('./js/sw.js', { scope: './' })
      .catch((err) => {
        console.warn('Service worker registration failed:', err);
      });
  });
}
