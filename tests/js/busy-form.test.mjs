// Il pulsante "occupied" NON deve restare appeso quando un form viene
// bloccato dalla validazione della pagina (demo, login, pagamento).
// Il bug era causato dall'ascolto in fase capture: qui verifichiamo che
// motion.js ascolti in fase bubble e rispetti event.defaultPrevented.

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';

const js = readFileSync(new URL('../../app/static/motion.js', import.meta.url), 'utf8');

function makeButton() {
  const classes = new Set();
  const attrs = {};
  return {
    classes,
    attrs,
    classList: {
      add: (c) => classes.add(c),
      remove: (c) => classes.delete(c),
      contains: (c) => classes.has(c),
    },
    setAttribute: (k, v) => { attrs[k] = v; },
    removeAttribute: (k) => { delete attrs[k]; },
  };
}

function load() {
  const listeners = {};
  const button = makeButton();
  const form = {
    tagName: 'FORM',
    querySelector: (sel) => (sel.includes('button') ? button : null),
    getAttribute: () => null,
  };
  const context = {
    window: { matchMedia: () => ({ matches: false }), addEventListener() {} },
    document: {
      readyState: 'complete',
      addEventListener: (type, fn) => { (listeners[type] ||= []).push(fn); },
      querySelectorAll: () => [],
    },
    console,
  };
  context.globalThis = context;
  context.requestAnimationFrame = (fn) => setTimeout(() => fn(Date.now()), 16);
  vm.createContext(context);
  vm.runInContext(js, context);
  return { listeners, button, form };
}

test('il pulsante non diventa occupato se il form è stato bloccato', () => {
  const { listeners, button, form } = load();
  const submit = listeners.submit && listeners.submit[0];
  assert.ok(submit, 'motion.js deve ascoltare submit');
  submit({ target: form, defaultPrevented: true });
  assert.equal(button.classList.contains('is-busy'), false);
  assert.equal(button.attrs['aria-busy'], undefined);
});

test('il pulsante diventa occupato quando il form parte davvero', () => {
  const { listeners, button, form } = load();
  listeners.submit[0]({ target: form, defaultPrevented: false });
  assert.equal(button.classList.contains('is-busy'), true);
  assert.equal(button.attrs['aria-busy'], 'true');
});
