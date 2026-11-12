'use client';

import Link from 'next/link';
import { useCallback, useEffect, useRef, useState } from 'react';
import reviews from '@/data/reviews.json';

// De reviews zijn aanbevelingen die Sayan zelf op zijn site zet; er hoort geen
// cijfer bij. De sterren staan er als beeldmerk, bewust zonder gemiddelde en
// zonder AggregateRating in de schema's — dat zou een claim zijn die nergens
// uit blijkt.
const initialen = (naam) =>
  naam
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((d) => d[0].toUpperCase())
    .join('');

// Op een kaart past een korte quote; het hele verhaal staat op /recensies/.
const kort = (tekst, max = 165) => {
  if (tekst.length <= max) return tekst;
  const knip = tekst.slice(0, max);
  return knip.slice(0, knip.lastIndexOf(' ')).replace(/[,;:.\s]+$/, '') + '…';
};

function Sterren() {
  return (
    <div className="sterren" role="img" aria-label="5 van 5 sterren">
      {[0, 1, 2, 3, 4].map((i) => (
        <svg key={i} viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 2.8l2.85 5.8 6.4.93-4.63 4.5 1.1 6.37L12 17.4l-5.72 3 1.1-6.37-4.63-4.5 6.4-.93z" />
        </svg>
      ))}
    </div>
  );
}

export default function Reviews({ uitgelicht = 'benno-klaver' }) {
  const rail = useRef(null);
  const [aan, zetAan] = useState(0);

  const metNaam = reviews.filter((r) => r.naam);
  const top = metNaam.find((r) => r.slug === uitgelicht) || metNaam[0];
  // Het uitgelichte verhaal gewoon vooraan in dezelfde rail: één soort kaart
  // leest rustiger dan een groot blok met foto en daaronder nog een rij.
  const lijst = [top, ...metNaam.filter((r) => r.slug !== top.slug)];

  const schuif = useCallback((richting) => {
    const r = rail.current;
    if (!r) return;
    const kaart = r.querySelector('.review');
    r.scrollBy({ left: richting * (kaart ? kaart.offsetWidth + 16 : r.clientWidth * 0.8), behavior: 'smooth' });
  }, []);

  useEffect(() => {
    const r = rail.current;
    if (!r) return;
    const meet = () => {
      const kaart = r.querySelector('.review');
      if (kaart) zetAan(Math.round(r.scrollLeft / (kaart.offsetWidth + 16)));
    };
    r.addEventListener('scroll', meet, { passive: true });
    return () => r.removeEventListener('scroll', meet);
  }, []);

  return (
    <section className="vlak reviews schuin-beide">
      <div className="omhulsel reviews-kop">
        <div>
          <span className="label">Wat leden zeggen</span>
          <h2>
            Ze komen terug <span className="streep">om de trainer</span>
          </h2>
        </div>
        <div className="railknoppen">
          <button type="button" onClick={() => schuif(-1)} aria-label="Vorige ervaring">
            ‹
          </button>
          <button type="button" onClick={() => schuif(1)} aria-label="Volgende ervaring">
            ›
          </button>
        </div>
      </div>

      <div className="rail" ref={rail}>
        {lijst.map((r) => (
          <figure key={r.slug} className="review">
            <figcaption>
              <span className="bol">{initialen(r.naam)}</span>
              <span>
                <strong>{r.naam}</strong>
                <em>lid van Fitstudio Sayan</em>
              </span>
            </figcaption>
            <Sterren />
            <blockquote>{kort(r.tekst)}</blockquote>
          </figure>
        ))}
      </div>

      <div className="omhulsel reviews-voet">
        <div className="bolletjes" aria-hidden="true">
          {lijst.map((r, i) => (
            <span key={r.slug} className={i === aan ? 'aan' : ''} />
          ))}
        </div>
        <Link href="/recensies/" className="knop knop-vuur knop-klein">
          Lees alle {reviews.length} ervaringen
        </Link>
      </div>
    </section>
  );
}
