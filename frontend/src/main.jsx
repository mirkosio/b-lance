import React, { useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import { flushSync } from 'react-dom';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SpotlightCard from './reactbits/SpotlightCard.jsx';
import Magnet from './reactbits/Magnet.jsx';
import Particles from './reactbits/Particles.jsx';
import Aurora from './reactbits/Aurora.jsx';
import ClickSpark from './reactbits/ClickSpark.jsx';
import './editorial.css';

gsap.registerPlugin(ScrollTrigger);

const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function mount(id, element) {
  const node = document.getElementById(id);
  if (!node) return null;
  try {
    const root = createRoot(node);
    // I moduli della home sono indipendenti: si montano subito, così anche
    // gli effetti partono prima che lo scroll cominci.
    flushSync(() => root.render(element));
    return root;
  } catch (error) {
    // Un componente che non parte non deve fermare gli altri.
    console.warn('b-lance: componente non montato', id, error);
    return null;
  }
}

const FEATURES = [
  {
    icon: 'i-globe',
    tag: 'Valute',
    title: '125 valute, nessuna conversione forzata',
    text: 'Ogni spesa resta nella sua unità. I saldi del gruppo usano la valuta che scegli tu, con il cambio che decide chi amministra.',
    wide: true,
  },
  {
    icon: 'i-wallet',
    tag: 'Pagamenti',
    title: 'Anche a rate',
    text: '“Ha saldato 20 su 47,50”. Registri la parte e il resto resta visibile.',
  },
  {
    icon: 'i-swap',
    tag: 'Giroconti',
    title: 'Meno bonifici',
    text: 'Ti diciamo chi paga chi con il numero più basso di trasferimenti possibile.',
  },
  {
    icon: 'i-calendar',
    tag: 'Ricorrenze',
    title: 'Affitto e bollette',
    text: 'Imposta la cadenza e ritrovi la spesa pronta ogni mese.',
  },
  {
    icon: 'i-users',
    tag: 'Persone',
    title: 'Ruoli chiari',
    text: 'Chi amministra, chi inserisce spese, chi legge soltanto. Si decide dal gruppo.',
  },
  {
    icon: 'i-check',
    tag: 'Storico',
    title: 'Le spese annullate restano',
    text: 'Visibili in grigio e barrate: non contano più nei saldi, ma nessuno riscrive la storia del gruppo.',
    wide: true,
  },
];

/* ------------------------------------------------------------------ testo */
// Divisione in lettere/parole fatta qui: nessuna dipendenza da font esterni.
// Il testo completo resta in un nodo per i lettori di schermo.
function splitLine(node, unit) {
  if (!node) return [];
  const text = node.textContent.trim();
  const visual = document.createElement('span');
  visual.className = 'h-visual';
  visual.setAttribute('aria-hidden', 'true');
  const pieces = [];
  text.split(/(\s+)/).forEach((part) => {
    if (!part) return;
    if (/^\s+$/.test(part)) {
      visual.appendChild(document.createTextNode(part));
      return;
    }
    if (unit === 'chars') {
      [...part].forEach((char) => {
        const span = document.createElement('span');
        span.className = 'h-char';
        span.textContent = char;
        visual.appendChild(span);
        pieces.push(span);
      });
    } else {
      const span = document.createElement('span');
      span.className = 'h-word';
      span.textContent = part;
      visual.appendChild(span);
      pieces.push(span);
    }
  });
  const sr = document.createElement('span');
  sr.className = 'sr-only';
  sr.textContent = text;
  node.textContent = '';
  node.append(visual, sr);
  return pieces;
}

/* ------------------------------------------------------- sfondo copertina */
mount(
  'rb-aurora',
  <Aurora
    colorStops={['#0d1512', '#3f6a52', '#9dc3aa']}
    amplitude={1.15}
    blend={0.62}
    speed={0.45}
    height={0.5}
    scale={1.1}
    glow={0.55}
    brightness={0.85}
    layers={2}
    direction="top"
    intro
    opacity={0.85}
    lightMode={false}
  />,
);

mount(
  'rb-particles',
  <Particles
    particleCount={70}
    particleSpread={9}
    speed={0.09}
    particleColors={['#9dc3aa', '#5f8d6e']}
    particleBaseSize={34}
    sizeRandomness={0.7}
    cameraDistance={24}
    moveParticlesOnHover={false}
    alphaParticles
    glow={0.2}
    twinkle={0.25}
    opacity={0.62}
  />,
);

/* ------------------------------------------------------------- pulsanti */
mount(
  'rb-magnet-1',
  <Magnet magnetStrength={1.6} padding={44} maxOffset={9}>
    <a href="/register" className="s-btn">
      <svg width="17" height="17" aria-hidden="true"><use href="#i-bolt" /></svg> Inizia gratis
    </a>
  </Magnet>,
);

mount(
  'rb-magnet-2',
  <Magnet magnetStrength={1.6} padding={44} maxOffset={9}>
    <a href="/demo" className="s-btn s-btn-ghost">Prova la demo</a>
  </Magnet>,
);

mount(
  'rb-magnet-3',
  <Magnet magnetStrength={1.6} padding={44} maxOffset={9}>
    <a className="s-btn s-btn-light" href="https://github.com/mirkosio/b-lance/releases/latest">
      <svg width="17" height="17" aria-hidden="true"><use href="#i-bolt" /></svg> Scarica l'APK
    </a>
  </Magnet>,
);

/* ----------------------------------------------------------- funzioni */
mount(
  'rb-features',
  <>
    {FEATURES.map((f, i) => (
      <SpotlightCard
        key={f.title}
        className={`s-card${f.wide ? ' s-card-wide' : ''}`}
        spotlightColor="rgba(95, 141, 110, 0.2)"
        intensity={0.9}
        spotlightSize={300}
        theme="light"
        flare={false}
        grain={0}
      >
        <span className="s-card-icon">
          <svg width="24" height="24" aria-hidden="true"><use href={`#${f.icon}`} /></svg>
        </span>
        <span className="s-card-tag">{f.tag}</span>
        <h3>{f.title}</h3>
        <p>{f.text}</p>
        <span className="s-card-index" aria-hidden="true">02.{i + 1}</span>
      </SpotlightCard>
    ))}
  </>,
);

/* ------------------------------------------------------------- scintilla */
function SparkLayer() {
  const api = useRef(null);
  useEffect(() => {
    const onDown = (event) => api.current?.spark(event.clientX, event.clientY);
    document.addEventListener('pointerdown', onDown);
    return () => document.removeEventListener('pointerdown', onDown);
  }, []);
  return (
    <ClickSpark
      ref={api}
      className="rb-spark"
      sparkColor="#7fae90"
      sparkSize={6}
      sparkRadius={15}
      sparkCount={4}
      duration={340}
      easing="ease-out"
      extraScale={1}
    />
  );
}
mount('rb-spark', <SparkLayer />);

/* ============================================================ movimento */
if (!reduce) {
  const lenis = new Lenis({ duration: 1.05, smoothWheel: true, touchMultiplier: 1.3 });
  window.__blLenis = lenis;
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);

  // Titolo: le lettere salgono dal filetto, le parole della seconda riga
  // arrivano dopo. È l'unico gesto "tipografico" della pagina.
  const titleChars = splitLine(document.getElementById('rb-title'), 'chars');
  const accentWords = splitLine(document.getElementById('rb-accent'), 'words');
  gsap.from(titleChars, {
    yPercent: 112,
    opacity: 0,
    duration: 0.85,
    stagger: 0.026,
    ease: 'power3.out',
    delay: 0.08,
  });
  gsap.from(accentWords, {
    yPercent: 110,
    opacity: 0,
    duration: 0.9,
    stagger: 0.1,
    ease: 'power3.out',
    delay: 0.32,
  });

  // Ancore interne: scorrimento fluido invece del salto secco.
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (event) => {
      const target = document.querySelector(link.getAttribute('href'));
      if (!target) return;
      event.preventDefault();
      lenis.scrollTo(target, { offset: -20 });
    });
  });

  // Scontrino: si inclina seguendo il puntatore, senza rincorrerlo.
  const tilt = document.getElementById('rb-tilt');
  const paper = tilt?.querySelector('.s-receipt');
  if (tilt && paper) {
    gsap.set(paper, { transformPerspective: 900 });
    const rotY = gsap.quickTo(paper, 'rotationY', { duration: 0.5, ease: 'power2.out' });
    const rotX = gsap.quickTo(paper, 'rotationX', { duration: 0.5, ease: 'power2.out' });
    tilt.addEventListener('pointermove', (event) => {
      const r = tilt.getBoundingClientRect();
      const x = (event.clientX - r.left) / r.width - 0.5;
      const y = (event.clientY - r.top) / r.height - 0.5;
      rotY(x * 9);
      rotX(y * -7);
    });
    tilt.addEventListener('pointerleave', () => {
      rotY(0);
      rotX(0);
    });

    gsap.to(paper, {
      yPercent: -7,
      ease: 'none',
      scrollTrigger: { trigger: '.s-cover', start: 'top top', end: 'bottom top', scrub: 0.6 },
    });
  }

  // Ingressi: il contenuto sale di poco, in ordine di lettura.
  const reveal = (targets, vars = {}) => {
    if (!targets.length) return;
    gsap.from(targets, {
      opacity: 0,
      y: 26,
      duration: 0.7,
      ease: 'power2.out',
      stagger: 0.08,
      ...vars,
    });
  };

  reveal([document.querySelector('.s-kicker'), document.querySelector('.s-lede'), document.querySelector('.s-cta'), document.querySelector('.s-note')], { delay: 0.15 });
  reveal([...document.querySelectorAll('.s-fact')]);
  reveal([...document.querySelectorAll('.s-sec-head > *')], { scrollTrigger: { trigger: '.s-features', start: 'top 78%', once: true } });
  reveal([...document.querySelectorAll('.s-faq-item')], { scrollTrigger: { trigger: '.s-faq', start: 'top 75%', once: true } });
  reveal([...document.querySelectorAll('.s-final > .s-wrap > *')], { scrollTrigger: { trigger: '.s-final', start: 'top 80%', once: true } });

  // Card: compaiono appena entrano, una dopo l'altra.
  ScrollTrigger.batch('.s-bento .s-card', {
    start: 'top 88%',
    once: true,
    onEnter: (batch) => gsap.from(batch, {
      opacity: 0,
      y: 30,
      duration: 0.6,
      ease: 'power2.out',
      stagger: 0.06,
    }),
  });

  // App: il telefono entra in prospettiva e accompagna lo scroll.
  const phone = document.querySelector('.s-phone');
  if (phone) {
    gsap.from(phone, {
      opacity: 0,
      y: 60,
      rotate: 5,
      duration: 0.9,
      ease: 'power3.out',
      scrollTrigger: { trigger: '.s-app', start: 'top 70%', once: true },
    });
    gsap.to(phone, {
      y: -26,
      rotate: -1,
      ease: 'none',
      scrollTrigger: { trigger: '.s-app', start: 'top bottom', end: 'bottom top', scrub: 0.7 },
    });
  }

  // Capitolo 01: sezione pinnata, i tre passaggi scorrono in orizzontale.
  const mm = gsap.matchMedia();
  mm.add('(min-width: 901px)', () => {
    const track = document.getElementById('rb-track');
    const section = document.querySelector('.s-steps');
    if (!track || !section) return;
    const distance = () => Math.max(0, track.scrollWidth - document.documentElement.clientWidth + 48);
    const tween = gsap.to(track, {
      x: () => -distance(),
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: () => `+=${distance()}`,
        pin: true,
        scrub: 0.8,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    });
    const bar = document.getElementById('rb-progress');
    if (bar) {
      gsap.to(bar, {
        scaleX: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${distance()}`,
          scrub: true,
        },
      });
    }
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
      gsap.set(track, { x: 0 });
    };
  });

  // Indice laterale: legge la sezione sotto il suo centro, senza trigger
  // che il pin orizzontale può ricalcolare a metà scroll.
  const rail = document.querySelector('.s-rail');
  if (rail) {
    const links = [...rail.querySelectorAll('a')];
    const inkSections = ['.s-cover', '.s-app', '.s-final']
      .map((sel) => document.querySelector(sel))
      .filter(Boolean);
    const steps = document.querySelector('.s-steps');
    const footer = document.querySelector('footer');
    const syncRail = () => {
      const mid = window.innerHeight * 0.5;
      const overDark = inkSections.some((section) => {
        const r = section.getBoundingClientRect();
        return r.top <= mid && r.bottom >= mid;
      });
      rail.classList.toggle('is-inverse', overDark);

      // Il pin spacer copre anche la parte di capitolo che scorre in
      // orizzontale: finché è a schermo, l'indice resta fuori dai piedi.
      const box = steps && (steps.closest('.pin-spacer') || steps);
      const s = box && box.getBoundingClientRect();
      const overSteps = !!s && s.bottom > 0 && s.top < window.innerHeight;
      // Sopra il piè di pagina l'indice ha finito il suo lavoro.
      const f = footer && footer.getBoundingClientRect();
      const overFooter = !!f && f.top < window.innerHeight;
      rail.classList.toggle('is-hidden', overSteps || overFooter);

      links.forEach((link) => {
        const target = document.querySelector(link.getAttribute('href'));
        if (!target) return;
        const r = target.getBoundingClientRect();
        link.classList.toggle('is-current', r.top <= mid && r.bottom > mid);
      });
    };
    window.addEventListener('scroll', syncRail, { passive: true });
    window.addEventListener('resize', syncRail);
    syncRail();
  }
}

/* SplitText è montato dopo: un refresh allinea trigger e pin. */
window.addEventListener('load', () => ScrollTrigger.refresh());
