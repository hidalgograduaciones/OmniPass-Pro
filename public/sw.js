// A simple, no-op service worker that satisfies the PWA installation criteria.
// In a real-world scenario, you would add caching strategies here.

self.addEventListener('install', (event) => {
  console.log('Service Worker: Installing...');
  // Skip waiting to activate the new service worker immediately.
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  console.log('Service Worker: Activating...');
  // Take control of all pages under its scope immediately.
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (event) => {
  // This simple service worker doesn't intercept fetch requests.
  // It's just here to make the app installable.
  // For offline capabilities, you would add caching logic here.
  // e.g., event.respondWith(caches.match(event.request).then(response => response || fetch(event.request)));
});
