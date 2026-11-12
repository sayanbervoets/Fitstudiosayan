'use client';

import { useEffect, useRef, useState } from 'react';

// Telt op zodra het cijfer in beeld komt. Alleen sier: de eindwaarde staat
// meteen in de HTML, dus zoekmachines en 'beperk beweging' zien het getal.
export default function Teller({ naar, achter = '', voor = '' }) {
  const [waarde, zetWaarde] = useState(naar);
  const vak = useRef(null);

  useEffect(() => {
    const el = vak.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let animatie;
    const kijker = new IntersectionObserver(
      ([w]) => {
        if (!w.isIntersecting) return;
        kijker.disconnect();
        const start = performance.now();
        const duur = 1100;
        const stap = (nu) => {
          const deel = Math.min((nu - start) / duur, 1);
          const soepel = 1 - Math.pow(1 - deel, 3);
          zetWaarde(Math.round(naar * soepel));
          if (deel < 1) animatie = requestAnimationFrame(stap);
        };
        zetWaarde(0);
        animatie = requestAnimationFrame(stap);
      },
      { threshold: 0.5 },
    );
    kijker.observe(el);
    return () => { kijker.disconnect(); cancelAnimationFrame(animatie); };
  }, [naar]);

  return (
    <b ref={vak}>
      {voor}
      {waarde}
      {achter}
    </b>
  );
}
