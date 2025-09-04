/* sw.js – Farkle PWA */
const CACHE_VERSION = 'v1.0.0';
const APP_CACHE = `farkle-${CACHE_VERSION}`;

const APP_SHELL = [
  './farkle.html',
  './manifest.webmanifest',
  './offline.html',
  './icons/icon-192.png',
  './icons/icon-512.png'
];

// Install: esilataa app shell
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(APP_CACHE).then((cache) => cache.addAll(APP_SHELL))
  );
  self.skipWaiting();
});

// Activate: siivoa vanhat cachet
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.map((k) => (k !== APP_CACHE ? caches.delete(k) : null)))
    )
  );
  self.clients.claim();
});

// Fetch: HTML = network-first + offline fallback; muut = cache-first
self.addEventListener('fetch', (event) => {
  const req = event.request;
  const isHTML = req.mode === 'navigate' ||
                 (req.headers.get('accept') || '').includes('text/html');

  if (isHTML) {
    event.respondWith(
      fetch(req)
        .then((res) => {
          const copy = res.clone();
          caches.open(APP_CACHE).then((c) => c.put(req, copy));
          return res;
        })
        .catch(async () => {
          const cache = await caches.open(APP_CACHE);
          return (await cache.match(req)) || cache.match('./offline.html');
        })
    );
    return;
  }

  // muut: cache-first
  event.respondWith(
    caches.match(req).then((cached) => {
      if (cached) return cached;
      return fetch(req).then((res) => {
        const copy = res.clone();
        caches.open(APP_CACHE).then((c) => c.put(req, copy));
        return res;
      });
    })
  );
});
