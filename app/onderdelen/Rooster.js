import { bedrijf } from '@/lib/bedrijf';

// Het rooster komt uit Virtuagym; dat is de bron die Sayan zelf bijhoudt.
// Een eigen kopie zou binnen een week verlopen zijn.
export default function Rooster() {
  return (
    <div className="rooster">
      <div className="rooster-schuif">
        <iframe
        src="https://fitstudiosayan.virtuagym.com/classes/week/?event_type=1&embedded=1"
        title="Lesrooster van Fitstudio Sayan"
          loading="lazy"
        />
      </div>
      <p className="rooster-hulp">
        Lukt het inschrijven niet? App even naar{' '}
        <a href={bedrijf.whatsapp} target="_blank" rel="noopener">
          {bedrijf.telefoonNet}
        </a>
        , dan zetten we je erbij.
      </p>
    </div>
  );
}
