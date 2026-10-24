/* b-lance service worker.
 *
 * Strategia: NETWORK FIRST per tutto (pagine E asset), cache come fallback.
 *
 * Perché non "cache-first" sugli asset: con HTML aggiornato e CSS vecchio in
 * cache il layout veniva fracassato dopo ogni deploy ("sminchiato"). Ora HTML
 * e CSS arrivano sempre insieme dalla rete; la cache serve solo se sei offline.
 *
 * - GET: prova la rete, salva in cache, se la rete fallisce usa la cache.
 * - POST e mutate: mai toccate (niente cache di form).
 */

const VERSION = "blance-v6";
const PAGE_CACHE = `${VERSION}-pages`;

self.addEventListener("install", (event) => {
  // Salta subito la vecchia versione: niente due SW in convivenza.
  event.waitUntil(self.skipWaiting());
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(keys.filter((k) => !k.startsWith(VERSION)).map((k) => caches.delete(k)))
      )
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const req = event.request;

  // Mai gestire (e mai cachare) le mutazioni.
  if (req.method !== "GET") return;

  // Solo le richieste al nostro dominio: gli esterni (font, analytics) passano.
  if (new URL(req.url).origin !== self.location.origin) return;

  event.respondWith(networkFirst(req));
});

async function networkFirst(req) {
  try {
    const res = await fetch(req);
    if (res && res.ok) {
      const cache = await caches.open(PAGE_CACHE);
      cache.put(req, res.clone());
    }
    return res;
  } catch (err) {
    const cached = await caches.match(req);
    if (cached) return cached;
    // Fallback: la landing è sempre disponibile in cache.
    const landing = await caches.match("/");
    if (landing) return landing;
    return new Response(
      "<!doctype html><meta charset=utf-8><body style='background:#f5f4ef;color:#242b27;font-family:sans-serif;display:flex;align-items:center;justify-content:center;height:100vh;text-align:center'><div><h1>Sei offline</h1><p>b-lance ha bisogno di connessione per i saldi. Riprova.</p></div></body>",
      { status: 503, headers: { "Content-Type": "text/html; charset=utf-8" } }
    );
  }
}
