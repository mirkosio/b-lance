// Il service worker non deve lasciare dati privati sul dispositivo:
// pagine dell'account, gruppi, link condivisi e risposte API vanno solo
// in rete. I test simulano il worker con fetch/caches finti.

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';

const SRC = readFileSync(new URL('../../app/static/sw.js', import.meta.url), 'utf8');

class FakeResponse {
  constructor(body, opts = {}) {
    this.body = body;
    this.status = opts.status || 200;
    this.headers = opts.headers || {};
    this.ok = this.status >= 200 && this.status < 300;
  }
  clone() { return new FakeResponse(this.body, { status: this.status, headers: this.headers }); }
}

function load(offline, cachedLanding = false) {
  const handlers = {};
  const cache = { puts: [], put(req, res) { this.puts.push({ req, res }); } };
  const context = {
    URL,
    JSON,
    Promise,
    Response: FakeResponse,
    fetch: (req) => offline
      ? Promise.reject(new Error('offline'))
      : Promise.resolve(new FakeResponse('ok')),
    caches: {
      open: () => Promise.resolve(cache),
      keys: () => Promise.resolve(['blance-v9-pages']),
      delete: () => Promise.resolve(true),
      match: (key) => Promise.resolve(
        cachedLanding && (key === '/' || String(key).endsWith('/'))
          ? new FakeResponse('landing salvata')
          : null
      ),
    },
    self: {
      location: { origin: 'https://b-lance.test' },
      addEventListener: (type, fn) => { handlers[type] = fn; },
      skipWaiting: () => Promise.resolve(),
      clients: { claim: () => Promise.resolve() },
    },
  };
  context.globalThis = context;
  vm.createContext(context);
  vm.runInContext(SRC, context);
  return { handlers, cache };
}

function request(path, mode = 'navigate') {
  return { method: 'GET', url: 'https://b-lance.test' + path, mode };
}

async function dispatch(ctx, path, mode) {
  let response;
  ctx.handlers.fetch({ request: request(path, mode), respondWith(p) { response = p; } });
  return response ? await response : null;
}

test('le pagine pubbliche possono finire in cache', async () => {
  const ctx = load(false);
  const res = await dispatch(ctx, '/faq');
  assert.equal(res.ok, true);
  assert.equal(ctx.cache.puts.length, 1);
});

test('account, gruppi, API, link condivisi e login non finiscono in cache', async () => {
  for (const path of ['/account', '/groups/1', '/api/groups/1', '/s/abc', '/join/ABC', '/login']) {
    const ctx = load(false);
    const res = await dispatch(ctx, path);
    assert.equal(res.ok, true, path);
    assert.equal(ctx.cache.puts.length, 0, path + ' non deve essere cachato');
  }
});

test('offline i dati privati rispondono 503, non la landing in cache', async () => {
  const ctx = load(true);
  const res = await dispatch(ctx, '/groups/1');
  assert.equal(res.status, 503);
  assert.match(res.body, /Non viene salvata sul dispositivo/);
  assert.equal(ctx.cache.puts.length, 0);
});

test('offline le API rispondono JSON, non HTML', async () => {
  const ctx = load(true);
  const res = await dispatch(ctx, '/api/groups/1', 'cors');
  assert.equal(res.status, 503);
  assert.match(res.headers['Content-Type'], /application\/json/);
});

test('la versione della cache cambia: quelle vecchie vengono eliminate', async () => {
  assert.match(SRC, /VERSION = "blance-v10"/);
  assert.match(SRC, /!k\.startsWith\(VERSION\)/);
});

test('offline la home salvata si apre ancora (avvio della PWA su iPhone)', async () => {
  const ctx = load(true, true);
  const res = await dispatch(ctx, '/');
  assert.equal(res.status, 200);
  assert.equal(res.body, 'landing salvata');
});
