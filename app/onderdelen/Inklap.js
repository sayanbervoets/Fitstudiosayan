'use client';

import { useState } from 'react';

// Zijn landingsteksten lopen tot negentien alinea's; op een telefoon is dat
// zeven schermen scrollen voordat je bij het formulier bent. Op een groot
// scherm staat alles gewoon open — dit vouwt alleen op mobiel dicht, en de
// tekst staat altijd volledig in de HTML, dus zoekmachines lezen alles.
export default function Inklap({ children, vanaf = 2 }) {
  const [open, zetOpen] = useState(false);
  const blokken = Array.isArray(children) ? children : [children];

  if (blokken.length <= vanaf) return <>{blokken}</>;

  return (
    <>
      {blokken.slice(0, vanaf)}
      <div className={`inklap${open ? ' inklap-open' : ''}`}>{blokken.slice(vanaf)}</div>
      <button type="button" className="knop knop-rand knop-klein inklap-knop" onClick={() => zetOpen((v) => !v)}>
        {open ? 'Minder tekst' : 'Lees het hele verhaal'}
      </button>
    </>
  );
}
