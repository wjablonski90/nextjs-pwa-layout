/* eslint-disable no-restricted-globals */
const CACHE = "app-static-v1";
const PRECACHE_URLS = [
  "/",                // opcjonalnie – usuń, jeśli masz dynamiczny routing
  "/manifest.webmanifest",
  // dorzuć ikony typu /icons/icon-192.png, /icons/icon-512.png
];

// szybkie aktualizacje
self.addEventListener("install", (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE).then((c) => c.addAll(PRECACHE_URLS)).catch(() => {})
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)));
      await self.clients.claim();
    })()
  );
});

// opcjonalny kanał do skipWaiting
self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") self.skipWaiting();
});

// bardzo ostrożny fetch handler – nie psuje dev/HMR
self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return;

  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return; // tylko same-origin

  // proste stale-while-revalidate
  event.respondWith(
    (async () => {
      const cache = await caches.open(CACHE);
      const cached = await cache.match(req);
      const network = fetch(req)
        .then((res) => {
          cache.put(req, res.clone()).catch(() => {});
          return res;
        })
        .catch(() => cached);
      return cached || network;
    })()
  );
});
