import Link from 'next/link';
import Image from 'next/image';
import { diensten, trainers } from '@/lib/bedrijf';
import Verschijnt from '../onderdelen/Verschijnt';

export const metadata = {
  title: 'Aanbod — groepslessen, personal training en meer',
  description:
    'Alle trainingen van Fitstudio Sayan op een rij: groepstraining buiten, indoor, personal training, duo, senioren, bedrijfsfitness, en de Sportwagen.',
  alternates: { canonical: '/aanbod/' },
};

export default function AanbodPagina() {
  return (
    <>
      <section className="hero hero-kort schuin-onder">
        <div className="hero-foto">
          <Image src="/foto/squat-buiten.webp" alt="Trainen bij Fitstudio Sayan" fill priority sizes="100vw" />
        </div>
        <div className="hero-waas" />
        <div className="omhulsel">
          <div className="hero-in">
            <span className="label">Aanbod</span>
            <h1>Wat je bij ons kunt doen</h1>
            <p>
              Van bootcamp in de wind tot een uur één op één, en van een training bij je bedrijf
              tot de Sportwagen. Weet je niet wat past? Kom een keer gratis meetrainen.
            </p>
          </div>
        </div>
      </section>

      <section className="vlak">
        <div className="omhulsel">
          <div className="raster raster-3 raster-schuif">
            {diensten.map((d, i) => (
              <Verschijnt key={d.pad} vertraging={Math.min(i, 4) * 90}>
                <Link href={d.pad} className="kaart kaart-foto">
                  <div className="kaart-vak">
                    <Image src={d.foto} alt={d.naam} fill sizes="(max-width: 900px) 100vw, 33vw" />
                  </div>
                  <div className="kaart-tekst">
                    <h2>{d.naam}</h2>
                    <p style={{ color: 'var(--grijs)', margin: 0 }}>{d.kort}</p>
                    <ul className="kaart-lijst">
                      {d.punten.map((punt) => (
                        <li key={punt}>{punt}</li>
                      ))}
                    </ul>
                    <span className="kaart-meer">Lees meer →</span>
                  </div>
                </Link>
              </Verschijnt>
            ))}
          </div>
        </div>
      </section>

      <section className="vlak vlak-wit">
        <div className="omhulsel">
          <span className="label">Het team</span>
          <h2>
            Wie je <span className="streep">tegenkomt</span>
          </h2>
          <div className="raster raster-3 raster-schuif" style={{ marginTop: '2.4rem' }}>
            {trainers.map((t) => (
              <article key={t.naam} className="kaart kaart-foto teamkaart">
                <div className="kaart-vak teamvak">
                  <Image src={t.foto} alt={t.naam} fill sizes="(max-width: 900px) 100vw, 33vw" />
                </div>
                <div className="kaart-tekst">
                  <h3>{t.naam}</h3>
                  <span className="teamrol">{t.rol}</span>
                  <p>{t.tekst}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="vlak sportwagen">
        <div className="omhulsel" style={{ textAlign: 'center' }}>
          <h2>Nog geen idee wat past?</h2>
          <p style={{ maxWidth: '38rem', margin: '0 auto 1.8rem', color: '#b4c0d2' }}>
            Dat hoeft ook niet. Kom een keer gratis meetrainen, dan merk je vanzelf welke vorm bij
            je past.
          </p>
          <Link href="/proefles/" className="knop knop-vuur">
            Gratis proefles aanvragen
          </Link>
        </div>
      </section>
    </>
  );
}
