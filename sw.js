/* CNN App · service worker: només guarda la "carcassa" (disseny i codi), mai dades. */
const VERSIO = 'cnn-v49';
const FITXERS = ['./', 'index.html', 'app.css?v=49', 'app.js?v=49', 'cos.js?v=49', 'wellness.js?v=49', 'manifest.webmanifest', 'icon-192.png', 'icon-512.png', 'escut-192.png', 'badge-96.png'];

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

// ---------- Avisos (push) ----------
const PESTANYES_PUSH = ['avui', 'setmana', 'calendari', 'temps', 'equip', 'wmeu', 'assistencia', 'botiga', 'polar'];
self.addEventListener('push', e => {
  let j = {};
  try { j = e.data ? e.data.json() : {}; } catch (x) { j = { data: { text: e.data ? e.data.text() : '' } }; }
  const d = j.data || j || {};
  const n = j.notification || {};
  const p = PESTANYES_PUSH.indexOf(d.p) >= 0 ? d.p : 'avui';
  const opc = { body: String(d.text || n.body || '').slice(0, 240), icon: 'escut-192.png', badge: 'badge-96.png', data: { p: p, u: /^https:\/\/cnnavas\.github\.io\//.test(String(d.u || '')) ? String(d.u) : '' } };
  if (d.tag) { opc.tag = String(d.tag); opc.renotify = true; }
  e.waitUntil(self.registration.showNotification(String(d.titol || n.title || 'CN Navàs').slice(0, 80), opc));
});
self.addEventListener('notificationclick', e => {
  e.notification.close();
  const p = (e.notification.data && e.notification.data.p) || 'avui';
  const u = e.notification.data && e.notification.data.u;
  if (u) { e.waitUntil(self.clients.openWindow(u)); return; }   // p. ex. comanda nova → botiga interna
  e.waitUntil(self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then(llista => {
    const c = llista.filter(x => x.url.indexOf(self.registration.scope) === 0)[0];
    if (c) { c.postMessage({ obre: p }); return c.focus(); }
    return self.clients.openWindow('./?p=' + encodeURIComponent(p));
  }));
});
