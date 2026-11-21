import React, { useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitText from './reactbits/SplitText.jsx';
import SpotlightCard from './reactbits/SpotlightCard.jsx';
import FadeContent from './reactbits/FadeContent.jsx';
import ClickSpark from './reactbits/ClickSpark.jsx';
import Magnet from './reactbits/Magnet.jsx';
import Particles from './reactbits/Particles.jsx';
import './editorial.css';

gsap.registerPlugin(ScrollTrigger);

const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function mount(id, element) {
  const node = document.getElementById(id);
  if (!node) return null;
  const root = createRoot(node);
  root.render(element);
  return root;
}

/* ------------------------------------------------------------ Lenis + GSAP */
if (!reduce) {
  const lenis = new Lenis({ duration: 1.05, smoothWheel: true, touchMultiplier: 1.4 });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);

  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (event) => {
      const target = document.querySelector(link.getAttribute('href'));
      if (!target) return;
      event.preventDefault();
      lenis.scrollTo(target, { offset: -76 });
    });
  });

  gsap.utils.toArray('[data-reveal]').forEach((el) => {
    gsap.fromTo(
      el,
      { opacity: 0, y: 22 },
      {
        opacity: 1,
        y: 0,
        duration: 0.65,
        ease: 'power2.out',
        scrollTrigger: { trigger: el, start: 'top 90%', once: true },
      },
    );
  });

  const receipt = document.querySelector('.receipt');
  if (receipt) {
    gsap.to(receipt, {
      y: -10,
      rotate: -0.35,
      ease: 'none',
      scrollTrigger: {
        trigger: '.landing-hero',
        start: 'top top',
        end: 'bottom top',
        scrub: 0.8,
      },
    });
  }

  /* -------- GSAP: timeline d'ingresso dello scontrino */
  if (receipt) {
    const rows = receipt.querySelectorAll('.receipt-head, .receipt-title, .receipt-sub, .receipt-rows > div, .receipt-share, .receipt-foot');
    gsap.fromTo(rows, { opacity: 0, y: 10 }, {
      opacity: 1, y: 0, duration: 0.45, stagger: 0.07, ease: 'power2.out',
      scrollTrigger: { trigger: '.landing-hero', start: 'top 70%', once: true },
    });
  }

  /* -------- React Bits: palline salvia che fluttuano dietro l'hero */
  mount(
    'rb-particles',
    <Particles
      particleCount={45}
      particleSpread={8}
      speed={0.12}
      particleColors={['#5F8D6E', '#85B395']}
      particleBaseSize={40}
      sizeRandomness={0.6}
      cameraDistance={22}
      moveParticlesOnHover={false}
      clickBurst={false}
      glow={0.15}
      twinkle={0.2}
      opacity={0.5}
      lightMode={false}
    />,
  );

  /* -------- React Bits: pulsanti che seguono il puntatore */
  mount('rb-magnet-1', (
    <Magnet magnetStrength={1.4} padding={40}>
      <a className="btn" href="/register">
        <svg width="18" height="18"><use href="#i-bolt" /></svg> Inizia gratis
      </a>
    </Magnet>
  ));
  mount('rb-magnet-2', (
    <Magnet magnetStrength={1.4} padding={40}>
      <a className="btn ghost" href="/demo">Prova la demo</a>
    </Magnet>
  ));

  /* -------- SplitText: la parola chiave dell'hero, con colori del brand */
  mount(
    'rb-title',
    <SplitText
      text="Dividi le spese."
      tag="span"
      className="rb-title"
      splitType="chars"
      trigger="load"
      duration={0.75}
      delay={28}
      ease="power3.out"
      from={{ opacity: 0, yPercent: 70 }}
      to={{ opacity: 1, yPercent: 0 }}
      color="currentColor"
      hoverEffect="none"
    />,
  );

  mount(
    'rb-accent',
    <SplitText
      text="Tutto torna."
      tag="span"
      className="rb-accent"
      splitType="words"
      trigger="load"
      duration={0.85}
      delay={60}
      ease="power3.out"
      from={{ opacity: 0, yPercent: 55, rotate: 2 }}
      to={{ opacity: 1, yPercent: 0, rotate: 0 }}
      color="#5F8D6E"
      accentColor="#85B395"
      hoverEffect="none"
    />,
  );

  /* -------- React Bits: card con luce che segue il puntatore */
  const features = [
    { icon: 'i-globe', title: '125 valute', text: 'Ogni spesa resta nella sua valuta. I saldi del gruppo usano la valuta che scegli tu.' },
    { icon: 'i-wallet', title: 'Pagamenti parziali', text: '“Ha saldato 20 su 47,50”. Registra le rate senza aspettare di chiudere tutto.' },
    { icon: 'i-swap', title: 'Pochi bonifici', text: 'Ti diciamo chi paga chi con il numero più basso di trasferimenti possibile.' },
    { icon: 'i-calendar', title: 'Spese ricorrenti', text: 'Affitto, bollette, abbonamenti: la spesa torna pronta ogni mese.' },
    { icon: 'i-users', title: 'Ruoli chiari', text: 'Chi amministra, chi inserisce, chi legge soltanto. Tutto dal gruppo.' },
    { icon: 'i-check', title: 'Storico trasparente', text: 'Le spese annullate restano visibili in grigio: nessuno riscrive la storia.' },
  ];

  mount(
    'rb-features',
    <div className="feature-grid">
      {features.map((f, i) => (
        <SpotlightCard
          key={f.title}
          className="card feature rb-feature"
          spotlightColor="rgba(95, 141, 110, 0.28)"
          intensity={0.22}
          spotlightSize={260}
          theme="light"
          flare={false}
          grain={0.03}
        >
          <span className="ficon"><svg width="22" height="22"><use href={`#${f.icon}`} /></svg></span>
          <div>
            <span className="rb-feature-num">{String(i + 1).padStart(2, '0')}</span>
            <h3>{f.title}</h3>
            <p className="muted">{f.text}</p>
          </div>
        </SpotlightCard>
      ))}
    </div>,
  );

  /* -------- React Bits: ingresso a scomparsa dei passaggi */
  mount(
    'rb-steps',
    <FadeContent effect="fade" blur={false} duration={0.8} stagger={90} threshold={0.12}>
      <div className="step-grid">
        {[
          ['01', 'Crea il gruppo', 'Dai un nome e scegli la valuta dei saldi.'],
          ['02', 'Invita gli altri', 'Link, QR o username. Nessuna rubrica caricata.'],
          ['03', 'Chiudi i conti', 'Bonifici minimi e storico sempre visibile.'],
        ].map(([n, title, text]) => (
          <div className="step-card" key={n}>
            <span className="step-num">{n}</span>
            <h3>{title}</h3>
            <p className="muted">{text}</p>
          </div>
        ))}
      </div>
    </FadeContent>,
  );

  /* -------- React Bits: scintilla discreta al clic, in colore salvia */
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
        sparkColor="#5F8D6E"
        sparkSize={7}
        sparkRadius={16}
        sparkCount={5}
        duration={380}
        easing="ease-out"
        extraScale={1}
      />
    );
  }
  mount('rb-spark', <SparkLayer />);
}
