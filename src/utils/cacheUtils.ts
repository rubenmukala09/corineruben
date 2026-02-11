/**
 * Lightweight cache clear and reload - optimized for speed
 */
export async function clearAllCachesAndReload(): Promise<void> {
  // Fast path: just reload with cache bust
  sessionStorage.clear();
  window.location.href = '/?r=' + Date.now();
}

/**
 * Full cache clear (only when needed)
 */
export async function deepCacheClear(): Promise<void> {
  try {
    // Clear service worker caches
    if ('caches' in window) {
      const keys = await caches.keys();
      await Promise.all(keys.map(k => caches.delete(k)));
    }
    // Unregister service workers
    if ('serviceWorker' in navigator) {
      const regs = await navigator.serviceWorker.getRegistrations();
      await Promise.all(regs.map(r => r.unregister()));
    }
  } catch {}
  sessionStorage.clear();
  window.location.href = '/?r=' + Date.now();
}
