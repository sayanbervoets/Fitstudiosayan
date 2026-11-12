'use client';

import { useState } from 'react';
import { bedrijf } from '@/lib/bedrijf';

// Verstuurt naar /api/proefles. Zolang er nog geen mailkoppeling staat, valt
// het formulier terug op een vooringevuld WhatsApp-bericht, zodat een
// aanvraag nooit stilletjes verdwijnt.
export default function Proefles({ herkomst = 'website' }) {
  const [stand, setStand] = useState('leeg');

  async function verstuur(e) {
    e.preventDefault();
    setStand('bezig');
    const velden = Object.fromEntries(new FormData(e.currentTarget));
    try {
      const r = await fetch('/api/proefles', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ ...velden, herkomst }),
      });
      if (!r.ok) throw new Error(`status ${r.status}`);
      setStand('klaar');
    } catch {
      const tekst = `Hoi Sayan, ik wil graag een gratis proefles.%0A%0ANaam: ${velden.naam}%0ATelefoon: ${velden.telefoon}%0AWanneer: ${velden.wanneer || '-'}`;
      window.open(`${bedrijf.whatsapp}?text=${tekst}`, '_blank');
      setStand('klaar');
    }
  }

  if (stand === 'klaar') {
    return (
      <div className="kaart">
        <h3>Gelukt — tot snel!</h3>
        <p>
          Je aanvraag staat genoteerd. Sayan belt je meestal binnen een dag terug om een moment
          af te spreken.
        </p>
        <p>
          Kan het niet wachten? Bel gerust{' '}
          <a href={`tel:${bedrijf.telefoon.replace(/\s/g, '')}`}>{bedrijf.telefoonNet}</a>.
        </p>
      </div>
    );
  }

  return (
    <form className="kaart formulier" onSubmit={verstuur}>
      <h3>Vraag je gratis proefles aan</h3>
      <div>
        <label htmlFor="naam">Je naam</label>
        <input id="naam" name="naam" required autoComplete="name" />
      </div>
      <div>
        <label htmlFor="telefoon">Telefoonnummer</label>
        <input id="telefoon" name="telefoon" type="tel" required autoComplete="tel" />
      </div>
      <div>
        <label htmlFor="email">E-mailadres</label>
        <input id="email" name="email" type="email" required autoComplete="email" />
      </div>
      <div>
        <label htmlFor="wanneer">Wanneer wil je meetrainen? (niet verplicht)</label>
        <input id="wanneer" name="wanneer" placeholder="Bijvoorbeeld: dinsdagavond" />
      </div>
      <button className="knop knop-vuur" type="submit" disabled={stand === 'bezig'}>
        {stand === 'bezig' ? 'Bezig…' : 'Proefles aanvragen'}
      </button>
      <small style={{ color: 'var(--grijs)' }}>
        Je zit nergens aan vast. We bellen alleen om een moment af te spreken.
      </small>
    </form>
  );
}
