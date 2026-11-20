/* CNN App · service worker: només guarda la "carcassa" (disseny i codi), mai dades. */
const VERSIO = 'cnn-v24';
const FITXERS = ['./', 'index.html', 'app.css?v=24', 'app.js?v=24', 'cos.js?v=24', 'wellness.js?v=24', 'manifest.webmanifest', 'icon-192.png', 'icon-512.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(VERSIO).then(c => c.addAll(FITXERS)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== VERSIO).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);
  if (e.request.method !== 'GET' || url.origin !== self.location.origin) return;
  e.respondWith(
    caches.open(VERSIO).then(c => c.match(e.request).then(guardat => {
      const xarxa = fetch(e.request).then(r => { if (r.ok) c.put(e.request, r.clone()); return r; }).catch(() => guardat);
      return guardat || xarxa;
    }))
  );
});
