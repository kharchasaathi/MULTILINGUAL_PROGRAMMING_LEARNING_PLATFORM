const CACHE_NAME = "codesaathi-v8";
const APP_SHELL = ["/", "/index.html", "/styles.css", "/app.js", "/js/i18n.js", "/js/lessons/lesson-template.js", "/js/lessons/curriculum-loader.js", "/manifest.webmanifest", "/icon.svg"];
const NETWORK_FIRST = new Set(APP_SHELL);
self.addEventListener("install", event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(APP_SHELL)));
  self.skipWaiting();
});
self.addEventListener("activate", event => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key)));
    await self.clients.claim();
  })());
});
self.addEventListener("fetch", event => {
  if (event.request.method !== "GET" || new URL(event.request.url).origin !== self.location.origin) return;
  const url = new URL(event.request.url);
  const isAppShell = event.request.mode === "navigate" || NETWORK_FIRST.has(url.pathname);
  if (isAppShell) {
    event.respondWith((async () => {
      try {
        const response = await fetch(event.request, { cache: "no-store" });
        if (response.ok) {
          const copy = response.clone();
          const cache = await caches.open(CACHE_NAME);
          await cache.put(event.request, copy);
          if (url.pathname === "/") await cache.put("/index.html", copy.clone());
        }
        return response;
      } catch (error) {
        const cached = await caches.match(event.request) || await caches.match("/index.html");
        if (cached) return cached;
        throw error;
      }
    })());
    return;
  }
  event.respondWith(caches.match(event.request).then(cached => cached || fetch(event.request).then(response => {
    if (response.ok) {
      const copy = response.clone();
      caches.open(CACHE_NAME).then(cache => cache.put(event.request, copy));
    }
    return response;
  }).catch(() => caches.match("/index.html"))));
});
