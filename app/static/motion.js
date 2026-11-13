// b-lance — il poco JavaScript del movimento.
//
// Quattro cose, e niente di più:
//  1. i numeri importanti si compongono quando compaiono;
//  2. un bottone premuto mostra che sta lavorando;
//  3. il cambio pagina lascia un segno morbido (dove il browser lo supporta);
//  4. la lettura segue una riga di avanzamento che si riempie.
//
// Con prefers-reduced-motion non gira niente: i numeri sono già al valore
// giusto, i bottoni non mostrano rotelle, le pagine appaiono subito.

(function () {
  'use strict';

  var root = document.documentElement;
  var reduced =
    window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ------------------------------------------------------- 1. numeri */
  // Formato italiano: punto per le migliaia, virgola per i decimali.
  // Stesso criterio del backend e dell'app, così i numeri non cambiano
  //Tra una schermata e l'altra.
  function formatMinor(minor, exponent) {
    var exp = typeof exponent === 'number' ? exponent : 2;
    var value = minor / Math.pow(10, exp);
    var negative = value < 0;
    var fixed = Math.abs(value).toFixed(exp);
    var parts = fixed.split('.');
    var intPart = parts[0];
    var grouped = '';
    for (var i = 0; i < intPart.length; i++) {
      if (i > 0 && (intPart.length - i) % 3 === 0) grouped += '.';
      grouped += intPart.charAt(i);
    }
    var text = exp > 0 ? grouped + ',' + parts[1] : grouped;
    return (negative ? '-' : '') + text;
  }

  function countUp(el) {
    var minor = parseInt(el.getAttribute('data-count'), 10);
    var exponent = parseInt(el.getAttribute('data-count-exp') || '2', 10);
    var prefix = el.getAttribute('data-count-prefix') || '';
    var suffix = el.getAttribute('data-count-suffix') || '';
    if (!isFinite(minor) || !isFinite(exponent)) return;
    if (minor === 0) return;

    var duration = 620;
    var start = null;

    function frame(now) {
      if (start === null) start = now;
      var progress = Math.min((now - start) / duration, 1);
      // easeOutCubic, come le curve del design system.
      var eased = 1 - Math.pow(1 - progress, 3);
      var value = Math.round(minor * eased);
      el.textContent = prefix + formatMinor(value, exponent) + suffix;
      if (progress < 1) {
        window.requestAnimationFrame(frame);
      } else {
        // L'ultimo valore è quello del server: mai un centesimo di differenza.
        el.textContent = el.getAttribute('data-count-final') ||
          prefix + formatMinor(minor, exponent) + suffix;
      }
    }

    el.classList.add('is-counting');
    window.requestAnimationFrame(frame);
  }

  function startCounters() {
    var items = Array.prototype.slice.call(document.querySelectorAll('[data-count]'));
    if (!items.length) return;
    if (reduced) {
      // Nessuna animazione: il testo del server resta, ed è già giusto.
      items.forEach(function (el) {
        var final = el.getAttribute('data-count-final');
        if (final) el.textContent = final;
      });
      return;
    }
    items.forEach(countUp);
  }

  /* ------------------------------------------------- 2. bottone occupato */
  function markBusy(form) {
    var button = form.querySelector('button[type="submit"], input[type="submit"]');
    if (!button || button.classList.contains('is-busy')) return;
    // I form con conferma (annulla spesa, elimina account) non partono
    // subito: segnaliamo l'attesa solo quando il form parte davvero.
    if (form.getAttribute('onsubmit')) return;
    button.classList.add('is-busy');
    button.setAttribute('aria-busy', 'true');
  }

  function watchForms() {
    document.addEventListener(
      'submit',
      function (event) {
        var form = event.target;
        if (!form || form.tagName !== 'FORM') return;
        if (event.defaultPrevented) return;
        markBusy(form);
      },
      true
    );
  }

  /* ------------------------------------------- 3. cambio pagina morbido */
  function softNavigation() {
    if (reduced || !document.startViewTransition) return;
    // Il browser fa la transizione da solo: qui basta non impedirlo.
  }

  // 4. barra di avanzamento lettura: una riga che si riempie mentre leggi.
  // Mostrata solo se la pagina è più alta di una paio di viewport.
  function startReadProgress() {
    if (reduced) return;
    var bar = document.getElementById
      ? document.getElementById('read-progress-bar')
      : null;
    var wrap = document.querySelector
      ? document.querySelector('.read-progress')
      : null;
    if (!bar || !wrap) return;
    var ticking = false;

    function update() {
      var winH = window.innerHeight || document.documentElement.clientHeight;
      var max = Math.max(document.documentElement.scrollHeight - winH, 0);
      var percent = max > 0 ? Math.min(window.scrollY / max, 1) : 0;
      var pageTall = max > winH * 1.5;
      wrap.classList.toggle('on', pageTall);
      if (pageTall) bar.style.transform = 'scaleX(' + percent + ')';
      else bar.style.transform = 'scaleX(0)';
    }

    function onScroll() {
      if (!ticking) {
        requestAnimationFrame(update);
        ticking = true;
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    update();
  }

  function start() {
    startCounters();
    watchForms();
    softNavigation();
    startReadProgress();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start);
  } else {
    start();
  }

  // Espone il formattatore per i test.
  window.blFormatMinor = formatMinor;
  window.blMotionEnabled = !reduced;
})();
