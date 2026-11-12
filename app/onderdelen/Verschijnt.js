'use client';

import { useEffect, useRef } from 'react';

// Laat een blok rustig opkomen zodra het in beeld schuift. Bewust CSS-only
// animatie via een klasse: geen animatiebibliotheek erbij voor een effect
// van vijftien regels, en het respecteert 'beperk beweging' in het systeem.
export default function Verschijnt({ children, vertraging = 0, className = '' }) {
  const vak = useRef(null);

  useEffect(() => {
    const el = vak.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.classList.add('in-beeld');
      return;
    }
    const kijker = new IntersectionObserver(
      (waarnemingen) => {
        for (const w of waarnemingen) {
          if (w.isIntersecting) {
            el.classList.add('in-beeld');
            kijker.unobserve(w.target);
          }
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -60px 0px' },
    );
    kijker.observe(el);
    return () => kijker.disconnect();
  }, []);

  return (
    <div ref={vak} className={`verschijnt ${className}`} style={{ transitionDelay: `${vertraging}ms` }}>
      {children}
    </div>
  );
}
