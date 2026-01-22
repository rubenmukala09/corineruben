// Version 9 - Force complete reset to fix stale cache issues
const CACHE_NAME = 'invision-network-v9';
const IMAGE_CACHE = 'invision-images-v7';

// On install, clear ALL caches immediately to force fresh content
self.addEventListener('install', (event) => {
  console.log('[SW] Installing v9 - clearing all caches');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((name) => {
          console.log('[SW] Deleting cache:', name);
          return caches.delete(name);
        })
      );
    })
  );
  self.skipWaiting();
});

// On activate, take control immediately and clear caches again
self.addEventListener('activate', (event) => {
  console.log('[SW] Activating v9 - taking control');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((name) => {
          console.log('[SW] Clearing cache on activate:', name);
          return caches.delete(name);
        })
      );
    }).then(() => self.clients.claim())
  );
});

// TEMPORARILY bypass all caching for navigation/document requests to force fresh content
self.addEventListener('fetch', (event) => {
  // Skip non-GET requests
  if (event.request.method !== 'GET') return;
  
  // Skip caching entirely for navigation requests - always get fresh HTML
  if (event.request.mode === 'navigate') {
    console.log('[SW] Navigation request - bypassing cache:', event.request.url);
    return; // Let the browser fetch fresh from network
  }
  
  // Skip caching for HTML documents
  if (event.request.destination === 'document') {
    console.log('[SW] Document request - bypassing cache:', event.request.url);
    return; // Let the browser fetch fresh from network
  }
  
  // Skip Vite dev server and HMR in development
  const url = new URL(event.request.url);
  if (url.pathname.includes('/@vite') || 
      url.pathname.includes('__vite') ||
      url.pathname.includes('.hot-update') ||
      url.pathname.startsWith('/@') ||
      url.pathname.startsWith('/src/') ||
      url.searchParams.has('t')) {
    return;
  }
  
  // For other resources, use network-first strategy during this fix period
  // This ensures fresh assets are always fetched
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        // Don't cache anything during this reset period
        return response;
      })
      .catch(() => {
        // If network fails, try cache as last resort
        return caches.match(event.request);
      })
  );
});
