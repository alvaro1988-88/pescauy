// PescaUY Service Worker
const CACHE = 'pescauy-v3';
const ASSETS = ['/'];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  // solo cachea la página principal, el resto va a la red
  if(e.request.mode === 'navigate') {
    e.respondWith(
      fetch(e.request).catch(() => caches.match('/'))
    );
  }
});
