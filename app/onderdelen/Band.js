import Teller from './Teller';

// Kleine lijnicoontjes voor de feitenband; stroke volgt de tekstkleur.
const iconen = {
  kalender: (
    <>
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M3 10h18M8 3v4M16 3v4" />
    </>
  ),
  euro: <path d="M17 6.5A6.5 6.5 0 1 0 17 17.5M4 10h9M4 14h9" />,
  vinkje: <path d="M5 12.5l4.5 4.5L19 7.5" />,
  ster: <path d="M12 3.5l2.6 5.3 5.9.9-4.25 4.1 1 5.8L12 16.9l-5.25 2.7 1-5.8L3.5 9.7l5.9-.9z" />,
  groep: (
    <>
      <circle cx="9" cy="8" r="3.2" />
      <path d="M3 20c0-3.3 2.7-5.5 6-5.5s6 2.2 6 5.5M16 5a3 3 0 0 1 0 6M18 14.8c1.8.7 3 2.4 3 5.2" />
    </>
  ),
  cadeau: (
    <>
      <rect x="3.5" y="8" width="17" height="4" rx="1" />
      <path d="M5 12v8h14v-8M12 8v12M12 8c-1.5-3.5-5.5-3.5-5.5-1S10 8 12 8zM12 8c1.5-3.5 5.5-3.5 5.5-1S14 8 12 8z" />
    </>
  ),
};

// Vier compacte vakjes met een icoon, een cijfer en een kort label.
export default function Band({ feiten }) {
  return (
    <section className="band" aria-label="Kort samengevat">
      <div className="omhulsel band-in">
        {feiten.map((f) => (
          <div key={f.label} className="band-vak">
            <span className="band-icoon" aria-hidden="true">
              <svg viewBox="0 0 24 24">{iconen[f.icoon]}</svg>
            </span>
            <span className="band-tekst">
              <Teller naar={f.naar} voor={f.voor} achter={f.achter} />
              <span>{f.label}</span>
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
