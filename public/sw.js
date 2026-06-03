// DishaSetu Service Worker - Offline First PWA
const CACHE_NAME = 'dishasetu-v1';
const OFFLINE_CACHE = 'dishasetu-offline-v1';
const DATA_CACHE = 'dishasetu-data-v1';

// Core assets to cache for offline use
const STATIC_ASSETS = [
  '/',
  '/career',
  '/scholarships',
  '/community',
  '/dashboard',
  '/offline.html',
];

// Data that should be cached for offline access
const DATA_URLS = [
  '/api/scholarships',
  '/api/careers',
  '/api/colleges',
  '/api/mentors',
];

// Install event - cache static assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    Promise.all([
      caches.open(CACHE_NAME).then((cache) => {
        console.log('[SW] Caching static assets');
        return cache.addAll(STATIC_ASSETS.filter(url => !url.startsWith('/api')));
      }),
      caches.open(DATA_CACHE).then((cache) => {
        console.log('[SW] Data cache ready');
        return cache;
      }),
    ]).then(() => {
      console.log('[SW] Installation complete');
      return self.skipWaiting();
    })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME && name !== DATA_CACHE && name !== OFFLINE_CACHE)
          .map((name) => {
            console.log('[SW] Deleting old cache:', name);
            return caches.delete(name);
          })
      );
    }).then(() => {
      console.log('[SW] Activation complete');
      return self.clients.claim();
    })
  );
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') return;

  // Skip external requests
  if (url.origin !== self.location.origin) return;

  // API requests - network first, cache fallback
  if (url.pathname.startsWith('/api/')) {
    event.respondWith(
      fetch(request)
        .then((response) => {
          // Clone and cache the response
          const responseClone = response.clone();
          caches.open(DATA_CACHE).then((cache) => {
            cache.put(request, responseClone);
          });
          return response;
        })
        .catch(() => {
          // Return cached data if network fails
          return caches.match(request).then((cachedResponse) => {
            if (cachedResponse) {
              return cachedResponse;
            }
            // Return offline JSON response
            return new Response(
              JSON.stringify({ offline: true, message: 'Data unavailable offline' }),
              { headers: { 'Content-Type': 'application/json' } }
            );
          });
        })
    );
    return;
  }

  // Static assets - cache first, network fallback
  event.respondWith(
    caches.match(request).then((cachedResponse) => {
      if (cachedResponse) {
        // Return cached version and update in background
        event.waitUntil(
          fetch(request).then((networkResponse) => {
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(request, networkResponse);
            });
          }).catch(() => {})
        );
        return cachedResponse;
      }

      // Not in cache, fetch from network
      return fetch(request)
        .then((response) => {
          // Cache successful responses
          if (response.ok) {
            const responseClone = response.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(request, responseClone);
            });
          }
          return response;
        })
        .catch(() => {
          // Return offline page for navigation requests
          if (request.mode === 'navigate') {
            return caches.match('/offline.html');
          }
          return new Response('Offline', { status: 503 });
        });
    })
  );
});

// Background sync for offline actions
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-applications') {
    event.waitUntil(syncApplications());
  }
  if (event.tag === 'sync-quiz-results') {
    event.waitUntil(syncQuizResults());
  }
});

// Sync offline scholarship applications
async function syncApplications() {
  try {
    const cache = await caches.open(OFFLINE_CACHE);
    const requests = await cache.keys();
    
    for (const request of requests) {
      if (request.url.includes('applications')) {
        const cachedResponse = await cache.match(request);
        const data = await cachedResponse.json();
        
        await fetch('/api/applications', {
          method: 'POST',
          body: JSON.stringify(data),
          headers: { 'Content-Type': 'application/json' },
        });
        
        await cache.delete(request);
      }
    }
  } catch (error) {
    console.error('[SW] Sync applications failed:', error);
  }
}

// Sync offline quiz results
async function syncQuizResults() {
  try {
    const cache = await caches.open(OFFLINE_CACHE);
    const requests = await cache.keys();
    
    for (const request of requests) {
      if (request.url.includes('quiz-results')) {
        const cachedResponse = await cache.match(request);
        const data = await cachedResponse.json();
        
        await fetch('/api/quiz-results', {
          method: 'POST',
          body: JSON.stringify(data),
          headers: { 'Content-Type': 'application/json' },
        });
        
        await cache.delete(request);
      }
    }
  } catch (error) {
    console.error('[SW] Sync quiz results failed:', error);
  }
}

// Push notification handling
self.addEventListener('push', (event) => {
  const data = event.data?.json() || {};
  
  const options = {
    body: data.body || 'New update from DishaSetu',
    icon: '/icon-192.png',
    badge: '/badge-72.png',
    vibrate: [100, 50, 100],
    data: {
      url: data.url || '/',
    },
    actions: [
      { action: 'open', title: 'View' },
      { action: 'dismiss', title: 'Dismiss' },
    ],
  };

  event.waitUntil(
    self.registration.showNotification(data.title || 'DishaSetu', options)
  );
});

// Handle notification clicks
self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  if (event.action === 'dismiss') return;

  event.waitUntil(
    clients.openWindow(event.notification.data.url || '/')
  );
});

// Message handling for mesh sync simulation
self.addEventListener('message', (event) => {
  const { type, data } = event.data;

  switch (type) {
    case 'CACHE_DATA':
      cacheOfflineData(data);
      break;
    case 'GET_CACHED_DATA':
      getCachedData(event.source, data);
      break;
    case 'CLEAR_CACHE':
      clearAllCaches();
      break;
    case 'MESH_SYNC':
      handleMeshSync(event.source, data);
      break;
  }
});

// Cache data for offline use
async function cacheOfflineData(data) {
  try {
    const cache = await caches.open(DATA_CACHE);
    const response = new Response(JSON.stringify(data.payload), {
      headers: { 'Content-Type': 'application/json' },
    });
    await cache.put(data.key, response);
    console.log('[SW] Data cached:', data.key);
  } catch (error) {
    console.error('[SW] Cache data failed:', error);
  }
}

// Get cached data
async function getCachedData(client, key) {
  try {
    const cache = await caches.open(DATA_CACHE);
    const response = await cache.match(key);
    const data = response ? await response.json() : null;
    client.postMessage({ type: 'CACHED_DATA', key, data });
  } catch (error) {
    console.error('[SW] Get cached data failed:', error);
    client.postMessage({ type: 'CACHED_DATA', key, data: null });
  }
}

// Clear all caches
async function clearAllCaches() {
  const cacheNames = await caches.keys();
  await Promise.all(cacheNames.map(name => caches.delete(name)));
  console.log('[SW] All caches cleared');
}

// Handle mesh sync requests
async function handleMeshSync(client, data) {
  const { peerId, dataType } = data;
  
  try {
    const cache = await caches.open(DATA_CACHE);
    const keys = await cache.keys();
    const syncData = [];
    
    for (const request of keys) {
      if (!dataType || request.url.includes(dataType)) {
        const response = await cache.match(request);
        const payload = await response.json();
        syncData.push({ url: request.url, payload });
      }
    }
    
    client.postMessage({
      type: 'MESH_SYNC_READY',
      peerId,
      data: syncData,
    });
  } catch (error) {
    console.error('[SW] Mesh sync failed:', error);
    client.postMessage({
      type: 'MESH_SYNC_ERROR',
      peerId,
      error: error.message,
    });
  }
}
