// Test del calcolo dei saldi nella pagina del riepilogo del Cassiere.
//
// Lo script statico gira nel browser, ma la parte che conta (saldi e
// bonifici) è logica pura: qui la esercitiamo con un DOM finto, così lo
// stesso codice che gira sul sito viene verificato in CI.
//
// Stessa logica, stessi risultati del test Dart: se le due implementazioni
// divergono, i due test falliscono.

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { gzipSync } from 'node:zlib';
import vm from 'node:vm';

const SCRIPT = new URL('../../app/static/cashier-link.js', import.meta.url);

// --- DOM finto -------------------------------------------------------------
function makeElement(tag) {
  const element = {
    tagName: tag,
    className: '',
    style: {},
    hidden: false,
    children: [],
    attrs: {},
    setAttribute(name, value) {
      this.attrs[name] = value;
    },
    appendChild(child) {
      this.children.push(child);
      return child;
    },
    addEventListener() {},
  };
  // Come nel browser: textContent raccoglie i figli se non è impostato a mano.
  let ownText = '';
  Object.defineProperty(element, 'textContent', {
    get() {
      if (ownText) return ownText;
      return this.children.map((child) => child.textContent).join('');
    },
    set(value) {
      ownText = value;
    },
  });
  return element;
}

function makeDom(ids) {
  const elements = {};
  for (const id of ids) elements[id] = makeElement('div');
  return {
    elements,
    document: {
      getElementById: (id) => elements[id] || null,
      createElement: (tag) => makeElement(tag),
    },
  };
}

const IDS = [
  'cl-error',
  'cl-error-text',
  'cl-content',
  'cl-title',
  'cl-subtitle',
  'cl-name',
  'cl-currency',
  'cl-total',
  'cl-count',
  'cl-transfers',
  'cl-balances',
  'cl-transfers-list',
  'cl-print',
];

// Carica lo script reale e lo esegue con il DOM finto.
// La decodifica è asincrona (gzip via DecompressionStream): si attende.
async function run(payload) {
  const { elements, document } = makeDom(IDS);
  const context = {
    document,
    location: { hash: '#c=' + payload },
    Intl,
    TextDecoder,
    Blob,
    Response,
    DecompressionStream,
    atob,
    btoa,
    console,
    window: { console, print() {} },
  };
  context.globalThis = context;
  vm.createContext(context);
  vm.runInContext(readFileSync(SCRIPT, 'utf8'), context);
  await settle();
  return { elements };
}

// Dà tempo alle promise di risolversi (decodifica + costruzione DOM).
async function settle() {
  for (let i = 0; i < 20; i++) {
    await new Promise((resolve) => setImmediate(resolve));
  }
}

function encode(payload) {
  const raw = Buffer.from(JSON.stringify(payload), 'utf8');
  return gzipSync(raw).toString('base64url');
}

// --- casi ------------------------------------------------------------------
const members = [
  { id: 1, name: 'Ada', color: '#5F8D6E' },
  { id: 2, name: 'Bea', color: '#B4813F' },
  { id: 3, name: 'Cid', color: '#A0432F' },
];

test('divisione equa: il pagatore accreditato, gli altri in debito', async () => {
  const payload = encode({
    v: 1,
    name: 'Cena',
    currency: 'EUR',
    members,
    expenses: [
      {
        id: 1,
        description: 'Cena',
        amount_minor: 10000,
        paid_by_id: 1,
        member_ids: [1, 2, 3],
        split_mode: 'equal',
        exact_minor: {},
        percent_bp: {},
        items: [],
      },
    ],
    payments: [],
  });
  const { elements } = await run(payload);
  assert.equal(elements['cl-error'].hidden, true);
  assert.equal(elements['cl-name'].textContent, 'Cena');
  assert.equal(elements['cl-total'].textContent, '100,00 EUR');
  const balances = elements['cl-balances'].children.map((row) =>
    row.textContent.trim().replace(/\s+/g, ' ')
  );
  // Ada paga 100 e deve 33,34: resta creditore di 66,66.
  assert.deepEqual(balances, ['AAda+66,66 EUR', 'BBea-33,33 EUR', 'CCid-33,33 EUR']);
});

test('percentuali: il resto di centesimo va al primo', async () => {
  const payload = encode({
    v: 1,
    name: 'Percent',
    currency: 'EUR',
    members,
    expenses: [
      {
        id: 1,
        description: 'Quota',
        amount_minor: 9000,
        paid_by_id: 1,
        member_ids: [1, 2, 3],
        split_mode: 'percent',
        exact_minor: {},
        percent_bp: { 1: 3334, 2: 3333, 3: 3333 },
        items: [],
      },
    ],
    payments: [],
  });
  const { elements } = await run(payload);
  const balances = elements['cl-balances'].children.map((row) =>
    row.textContent.trim().replace(/\s+/g, ' ')
  );
  assert.deepEqual(balances, ['AAda+60,00 EUR', 'BBea-30,00 EUR', 'CCid-30,00 EUR']);
});

test('spesa per articoli: ogni voce pesa solo su chi l’ha condivisa', async () => {
  const payload = encode({
    v: 1,
    name: 'Articoli',
    currency: 'EUR',
    members: members.slice(0, 2),
    expenses: [
      {
        id: 1,
        description: 'Scontrino',
        amount_minor: 5000,
        paid_by_id: 2,
        member_ids: [1, 2],
        split_mode: 'equal',
        exact_minor: {},
        percent_bp: {},
        items: [
          { amount_minor: 3000, member_ids: [1] },
          { amount_minor: 2000, member_ids: [2] },
        ],
      },
    ],
    payments: [],
  });
  const { elements } = await run(payload);
  const balances = elements['cl-balances'].children.map((row) =>
    row.textContent.trim().replace(/\s+/g, ' ')
  );
  assert.deepEqual(balances, ['AAda-30,00 EUR', 'BBea+30,00 EUR']);
});

test('pagamento parziale: il credito scende', async () => {
  const payload = encode({
    v: 1,
    name: 'Parziale',
    currency: 'EUR',
    members: members.slice(0, 2),
    expenses: [
      {
        id: 1,
        description: 'Cena',
        amount_minor: 10000,
        paid_by_id: 1,
        member_ids: [1, 2],
        split_mode: 'equal',
        exact_minor: {},
        percent_bp: {},
        items: [],
      },
    ],
    payments: [{ from_id: 2, to_id: 1, amount_minor: 2000 }],
  });
  const { elements } = await run(payload);
  const balances = elements['cl-balances'].children.map((row) =>
    row.textContent.trim().replace(/\s+/g, ' ')
  );
  // Bea deve 50, ne paga 20: resta in debito di 30. Ada ha +30.
  assert.deepEqual(balances, ['AAda+30,00 EUR', 'BBea-30,00 EUR']);
  const transfers = elements['cl-transfers-list'].children
    .filter((row) => row.className === 'transfer')
    .map((row) => row.textContent.trim().replace(/\s+/g, ' '));
  assert.deepEqual(transfers, ['Bea→Ada30,00 EUR']);
});

test('conto saldato: nessun bonifico', async () => {  const payload = encode({
    v: 1,
    name: 'Saldato',
    currency: 'EUR',
    members: members.slice(0, 2),
    expenses: [
      {
        id: 1,
        description: 'Cena',
        amount_minor: 1000,
        paid_by_id: 1,
        member_ids: [1, 2],
        split_mode: 'exact',
        exact_minor: { 1: 500, 2: 500 },
        percent_bp: {},
        items: [],
      },
    ],
    payments: [{ from_id: 2, to_id: 1, amount_minor: 500 }],
  });
  const { elements } = await run(payload);
  assert.equal(elements['cl-transfers'].textContent, '0');
  const empty = elements['cl-transfers-list'].children[0];
  assert.match(empty.textContent, /Conto saldato/);
});

test('valuta senza centesimi: lo yen non prende decimali', async () => {
  const payload = encode({
    v: 1,
    name: 'Yen',
    currency: 'JPY',
    exponent: 0,
    members: members.slice(0, 2),
    expenses: [
      {
        id: 1,
        description: 'Ramen',
        amount_minor: 3000,
        paid_by_id: 1,
        member_ids: [1, 2],
        split_mode: 'equal',
        exact_minor: {},
        percent_bp: {},
        items: [],
      },
    ],
    payments: [],
  });
  const { elements } = await run(payload);
  assert.equal(elements['cl-total'].textContent, '3.000 JPY');
  const balances = elements['cl-balances'].children.map((row) =>
    row.textContent.trim().replace(/\s+/g, ' ')
  );
  assert.deepEqual(balances, ['AAda+1.500 JPY', 'BBea-1.500 JPY']);
});

test('migliaia: il punto, come nel backend e nell’app', async () => {
  const payload = encode({
    v: 1,
    name: 'Grande',
    currency: 'EUR',
    exponent: 2,
    members: members.slice(0, 2),
    expenses: [
      {
        id: 1,
        description: 'Cena',
        amount_minor: 123456,
        paid_by_id: 1,
        member_ids: [1, 2],
        split_mode: 'equal',
        exact_minor: {},
        percent_bp: {},
        items: [],
      },
    ],
    payments: [],
  });
  const { elements } = await run(payload);
  assert.equal(elements['cl-total'].textContent, '1.234,56 EUR');
});

test('link senza dati: messaggio chiaro, non una pagina vuota', async () => {
  const { elements } = await run('');
  assert.equal(elements['cl-error'].hidden, false);
  assert.equal(elements['cl-content'].hidden, true);
  assert.match(elements['cl-error-text'].textContent, /non contiene il riepilogo/);
});

test('payload rovinato: avviso, non crash', async () => {
  const { elements } = await run('non-e-un-link');
  assert.equal(elements['cl-error'].hidden, false);
  assert.match(elements['cl-error-text'].textContent, /rovinato|incompleto|troncato/);
});
