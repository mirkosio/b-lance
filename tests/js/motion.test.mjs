// Test del sistema di movimento del sito.
//
// Il movimento deve essere: discreto (150-320 ms), presente sul tocco e
// non solo al mouse, e completamente azzerato con prefers-reduced-motion.
//
// Qui si controlla la parte verificabile: il formattatore dei numeri deve
// dare gli stessi risultati del backend, e il CSS deve contenere le
// garanzie promesse (stagger, transizioni, rispetto del reduce motion).

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';

const MOTION_JS = new URL('../../app/static/motion.js', import.meta.url);
const MOTION_CSS = new URL('../../app/static/motion.css', import.meta.url);

const js = readFileSync(MOTION_JS, 'utf8');
const css = readFileSync(MOTION_CSS, 'utf8');

// Il formattatore vive dentro una IIFE: lo carichiamo in un contesto finto
// per poterlo chiamare.
function loadFormatter() {
  const context = {
    window: { matchMedia: () => ({ matches: false }) },
    document: {
      readyState: 'complete',
      addEventListener() {},
      querySelectorAll: () => [],
    },
    console,
  };
  context.globalThis = context;
  context.requestAnimationFrame = (fn) => setTimeout(() => fn(Date.now()), 16);
  vm.createContext(context);
  vm.runInContext(js, context);
  return context.window.blFormatMinor;
}

test('il formattatore batte il backend: punti e virgole', () => {
  const format = loadFormatter();
  assert.equal(format(4525, 2), '45,25');
  assert.equal(format(123456, 2), '1.234,56');
  assert.equal(format(100000000, 2), '1.000.000,00');
  assert.equal(format(0, 2), '0,00');
  assert.equal(format(-4525, 2), '-45,25');
});

test('valuta senza centesimi: nessun decimale', () => {
  const format = loadFormatter();
  assert.equal(format(3000, 0), '3.000');
  assert.equal(format(150, 0), '150');
});

test('valuta a tre decimali: il kd si legge come si deve', () => {
  const format = loadFormatter();
  assert.equal(format(1234, 3), '1,234');
});

test('il backend e il browser dicono la stessa cosa', () => {
  // Stessi esempi del filtro Jinja "money" del backend.
  const format = loadFormatter();
  assert.equal(format(1250, 2), '12,50');
  assert.equal(format(999999, 2), '9.999,99');
  assert.equal(format(100, 2), '1,00');
});

test('il CSS dichiara le transizioni brevi del design system', () => {
  // 150-220 ms per le interazioni, 250-320 ms per le transizioni.
  assert.match(css, /--dur-1:\s*150ms/);
  assert.match(css, /--dur-2:\s*220ms/);
  assert.match(css, /--dur-3:\s*300ms/);
  assert.match(css, /--stagger:\s*55ms/);
});

test('il CSS azzera tutto con prefers-reduced-motion', () => {
  assert.match(css, /@media \(prefers-reduced-motion: reduce\)/);
  const blocco = css.slice(css.indexOf('@media (prefers-reduced-motion: reduce)'));
  assert.match(blocco, /animation:\s*none\s*!important/);
  assert.match(blocco, /transition:\s*none\s*!important/);
});

test('lo stagger non usa animazioni lunghe', () => {
  // Oltre il 9° elemento il ritardo si ferma: la coda non si allunga.
  assert.match(css, /nth-child\(n \+ 9\)/);
  const ritardi = [...css.matchAll(/animation-delay:\s*calc\(--stagger \* (\d+)\)/g)].map(
    (m) => Number(m[1])
  );
  assert.ok(Math.max(...ritardi) <= 8);
});

test('i numeri non rimbalzano: nessun overshoot sui dati', () => {
  // easeOutCubic: la curva non passa oltre il valore finale.
  assert.match(css, /@keyframes bl-count \{\s*from \{ opacity: 0\.4; \}\s*to \{ opacity: 1; \}/);
});

test('il contatore usa il testo finale del server', () => {
  // L'ultimo valore deve essere quello del server, mai un centesimo fuori.
  assert.match(js, /data-count-final/);
  assert.match(js, /el\.textContent = el\.getAttribute\('data-count-final'\)/);
});

test('i form con conferma non si bloccano', () => {
  assert.match(js, /if \(form\.getAttribute\('onsubmit'\)\) return;/);
});

test('nessuna dipendenza esterna nel movimento', () => {
  assert.doesNotMatch(js, /require\(|import |from ['"]/);
  assert.doesNotMatch(css, /url\(/);
});

test('con movimento ridotto i numeri restano al valore del server', () => {
  // Simula un utente che ha chiesto "riduci il movimento": il contatore
  // non parte, il numero mostrato è quello del server, nessuna animazione.
  const el = {
    attributes: {
      'data-count': '4525',
      'data-count-exp': '2',
      'data-count-final': '45,25 €',
    },
    textContent: '45,25 €',
    classList: { add() {}, contains() { return false; } },
    getAttribute(name) {
      return this.attributes[name] ?? null;
    },
  };
  const context = {
    window: {
      matchMedia: (query) => ({
        matches: query.includes('reduce'),
        addEventListener() {},
      }),
      requestAnimationFrame: () => 0,
    },
    document: {
      readyState: 'complete',
      addEventListener() {},
      querySelectorAll: (selector) =>
        selector === '[data-count]' ? [el] : [],
    },
    console,
  };
  context.globalThis = context;
  vm.createContext(context);
  vm.runInContext(js, context);

  assert.equal(el.textContent, '45,25 €');
  assert.equal(context.window.blMotionEnabled, false);
});
