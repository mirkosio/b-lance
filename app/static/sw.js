/* b-lance service worker.
 *
 * Strategia: NETWORK FIRST per tutto (pagine E asset), cache come fallback.
 *
 * Perché non "cache-first" sugli asset: con HTML aggiornato e CSS vecchio in
 * cache il layout veniva fracassato dopo ogni deploy ("sminchiato"). Ora HTML
 * e CSS arrivano sempre insieme dalla rete; la cache serve solo se sei offline.
 *
 * - GET pubblico: prova la rete, salva in cache, se la rete fallisce usa la cache.
 * - GET privato (account, gruppi, API): solo rete, mai salvato sul dispositivo.
 * - POST e mutate: mai toccate (niente cache di form).
 */

const VERSION = "blance-v10";
const PAGE_CACHE = `${VERSION}-pages`;

/* Pagine e dati privati: niente cache sul dispositivo.
 * Su un telefono condiviso, un HTML di /account o un JSON di /api/ rimasti
 * in cache resterebbero leggibili anche dopo il logout. Queste rotte
 * passano sempre dalla rete; offline ricevono una risposta esplicita. */
const PRIVATE_PATHS = ["/api/", "/account", "/groups/", "/s/", "/join/", "/login", "/register"];

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

  // Dati privati: rete diretta, nessuna scrittura in cache.
  const path = new URL(req.url).pathname;
  if (PRIVATE_PATHS.some(function (prefix) {
    return path === prefix || path.indexOf(prefix) === 0;
  })) {
    event.respondWith(fetch(req).catch(function () { return offlineResponse(req); }));
    return;
  }

  event.respondWith(networkFirst(req));
});

function offlineResponse(req) {
  if (req.mode === "navigate") {
    return new Response(
      "<!doctype html><html lang=it><head><meta charset=utf-8>" +
      "<meta name=viewport content='width=device-width,initial-scale=1'>" +
      "<title>Sei offline — b-lance</title></head><body style='font-family:system-ui;" +
      "background:#f8f5ec;color:#232a26;display:grid;place-items:center;min-height:100vh;" +
      "margin:0;text-align:center;padding:24px'>" +
      "<div><h1>Sei offline</h1><p>Questa pagina contiene dati del tuo account. " +
      "Non viene salvata sul dispositivo: riconnettiti per aprirla.</p>" +
      "<p><a href='/'>Torna alla home</a></p></div></body></html>",
      { status: 503, headers: { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "no-store" } }
    );
  }
  return new Response(
    JSON.stringify({ detail: "Sei offline. Riprova quando torni online." }),
    { status: 503, headers: { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" } }
  );
}

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
    if (landing && req.mode === "navigate") return landing;
    return offlineResponse(req);
  }
}
