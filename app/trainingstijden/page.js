import Link from 'next/link';
import Image from 'next/image';
import Rooster from '../onderdelen/Rooster';

export const metadata = {
  title: 'Trainingstijden en rooster',
  description:
    'Bekijk het actuele lesrooster van Fitstudio Sayan in Oudehaske en schrijf je direct in voor een training.',
  alternates: { canonical: '/trainingstijden/' },
};

export default function Trainingstijden() {
  return (
    <>
      <section className="hero hero-kort schuin-onder">
        <div className="hero-foto">
          <Image src="/foto/studio/studio-timer.webp" alt="Trainer en deelnemer bij de halterstang, met de trainingsklok aan de muur" fill priority sizes="100vw" />
        </div>
        <div className="hero-waas" />
        <div className="omhulsel">
          <div className="hero-in">
            <h2>Het rooster van deze week</h2>
          </div>
        </div>
      </section>

      <section className="vlak">
      <div className="omhulsel">
        <div className="tekstblok">
          <span className="label">Rooster</span>
          <h1>Wanneer we trainen</h1>
          <p>
            Hieronder staat het rooster van deze week, rechtstreeks uit ons ledensysteem. Je kunt
            je meteen inschrijven voor een les.
          </p>
          <p style={{ color: 'var(--grijs)' }}>
            De Anti-roest training voor senioren is elke maandag, woensdag en vrijdag om 9:30 uur.
          </p>
          <Link href="/proefles/" className="knop knop-vuur" style={{ marginBottom: '2.5rem' }}>
            Eerst een gratis proefles
          </Link>
        </div>
        <Rooster />
      </div>
    </section>
    </>
  );
}
