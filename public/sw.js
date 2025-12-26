const CACHE_NAME = 'chessverse-v1.0.0';
const STATIC_ASSETS = [
  '/code-chess-quest/',
  '/code-chess-quest/index.html',
  '/code-chess-quest/manifest.json',
  '/code-chess-quest/favicon.svg',
  '/code-chess-quest/icon-192.png',
  '/code-chess-quest/icon-512.png'
];

// Install event - cache essential resources
self.addEventListener('install', (event) => {
  console.log('🔧 Service Worker installing...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('📦 Caching static assets');
        return cache.addAll(STATIC_ASSETS);
      })
      .catch((error) => {
        console.error('❌ Cache failed:', error);
      })
  );
  // Activate immediately
  self.skipWaiting();
});

// Fetch event - network first, fallback to cache
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip cross-origin requests
  if (url.origin !== location.origin) {
    return;
  }

  // Network first for API calls and HTML
  if (request.method === 'GET' && (url.pathname.includes('/api') || request.destination === 'document')) {
    event.respondWith(
      fetch(request)
        .then((response) => {
          // Cache successful responses
          if (response.ok) {
            const cache_copy = response.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(request, cache_copy);
            });
          }
          return response;
        })
        .catch(() => {
          // Fallback to cache
          return caches.match(request)
            .then((response) => response || new Response('Offline - Page not cached'));
        })
    );
  } else {
    // Cache first for other assets
    event.respondWith(
      caches.match(request)
        .then((response) => {
          if (response) {
            return response;
          }
          return fetch(request).then((response) => {
            // Check if valid response
            if (!response || response.status !== 200 || response.type === 'error') {
              return response;
            }
            // Clone and cache
            const responseToCache = response.clone();
            caches.open(CACHE_NAME)
              .then((cache) => {
                cache.put(request, responseToCache);
              });
            return response;
          });
        })
        .catch(() => {
          // Offline fallback
          if (request.destination === 'image') {
            return new Response('Image not cached');
          }
          return new Response('Resource not available offline');
        })
    );
  }
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('🚀 Service Worker activated');
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            console.log('🗑️ Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Background sync for offline actions
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-data') {
    event.waitUntil(
      Promise.resolve()
    );
  }
});
