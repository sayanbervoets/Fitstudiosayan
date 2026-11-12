import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import paginas from '@/data/paginas.json';
import Proefles from '../onderdelen/Proefles';
import Verschijnt from '../onderdelen/Verschijnt';
import Reviews from '../onderdelen/Reviews';
import Band from '../onderdelen/Band';
import Inklap from '../onderdelen/Inklap';
import { bedrijf } from '@/lib/bedrijf';

const zoek = (pad) => paginas.find((p) => p.slug.join('/') === pad.join('/'));

// De oude site had per pagina hooguit een miniatuur van 300x300. We kiezen de
// hero daarom op onderwerp, zodat elke landingspagina een passende foto krijgt.
const FOTOS = [
  // De studio zelf, met de echte foto's van binnen.
  [/waarom-trainen|trainen-bij-sayan|fitness-sayan/, '/foto/studio/studio-overzicht.webp'],
  [/sportwagen|locatie|bedrijf/, '/foto/wagen-brandweer.webp'],
  [/senior|rugklachten/, '/foto/studio/studio-senior-bal.webp'],
  [/bootcamp|buiten|outdoor/, '/foto/groep-plein.webp'],
  [/kracht|afvallen/, '/foto/squat-buiten.webp'],
  [/duo|small-group|groepsles|vrouwen/, '/foto/duo-buiten.webp'],
  [/personal-(train|coach)/, '/foto/studio/studio-coaching.webp'],
  [/indoor|fitness|studio|conditie/, '/foto/studio/studio-roeien.webp'],
  [/testimonial|recensie|review/, '/foto/barbell-water.webp'],
];

// Interne links tussen de plaatspagina's: die houden elkaar overeind in Google.
const BUURT = [
  ['Oudehaske', '/personal-trainer-oudehaske/'],
  ['Heerenveen', '/personal-trainer-heerenveen/'],
  ['Joure', '/personal-trainer-joure/'],
  ['Haskerhorne', '/fitness-haskerhorne/'],
  ['Vegelinsoord', '/fitness-vegelinsoord/'],
  ['Friesland', '/personal-training-friesland/'],
];

function kiesFoto(pad) {
  for (const [patroon, foto] of FOTOS) if (patroon.test(pad)) return foto;
  return '/foto/groep-gras.webp';
}

export function generateStaticParams() {
  return paginas.map((p) => ({ pad: p.slug }));
}

export async function generateMetadata({ params }) {
  const { pad } = await params;
  const p = zoek(pad);
  if (!p) return {};
  const eersteTekst = p.secties.find((s) => s.alineas.length)?.alineas[0] || '';
  return {
    title: p.titel,
    description: (p.omschrijving || eersteTekst).slice(0, 155),
    alternates: { canonical: p.pad },
  };
}

export default async function Pagina({ params }) {
  const { pad } = await params;
  const p = zoek(pad);
  if (!p) notFound();

  const foto = kiesFoto(p.pad);
  const isReview = p.pad.startsWith('/testimonials/');

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.fitstudiosayan.nl/' },
              { '@type': 'ListItem', position: 2, name: p.titel, item: `https://www.fitstudiosayan.nl${p.pad}` },
            ],
          }),
        }}
      />

      <section className="hero hero-kort schuin-onder">
        <div className="hero-foto">
          <Image src={foto} alt={p.titel} fill priority sizes="100vw" />
        </div>
        <div className="hero-waas" />
        <div className="omhulsel">
          <div className="hero-in">
            <span className="label" style={{ color: 'var(--vuur)' }}>
              Fitstudio Sayan · Oudehaske
            </span>
            <h1>{p.kop || p.titel}</h1>
            <div className="hero-knoppen">
              <Link href="/proefles/" className="knop knop-vuur">
                Gratis proefles
              </Link>
              <Link href="/tarieven/" className="knop knop-licht">
                Bekijk tarieven
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Band
        feiten={[
          { icoon: 'groep', naar: 8, achter: ' max', label: 'per groepsles' },
          { icoon: 'euro', naar: 48, voor: '€', label: 'per 4 weken, onbeperkt' },
          { icoon: 'vinkje', naar: 0, voor: '€', label: 'inschrijfgeld' },
          { icoon: 'cadeau', naar: 1, label: 'gratis proefles' },
        ]}
      />

      <section className="vlak vlak-wit">
        <div className="omhulsel raster raster-2" style={{ alignItems: 'start', gap: '3rem' }}>
          <div className="tekstblok">
            {p.secties.length > 0 ? (
              <Inklap vanaf={2}>
                {p.secties.map((s, i) => (
                  <Verschijnt key={i} className="sectieblok">
                    {s.kop && (s.niveau === 2 ? <h2>{s.kop}</h2> : <h3>{s.kop}</h3>)}
                    {s.alineas.map((a, n) => (
                      <p key={n}>{a}</p>
                    ))}
                    {s.punten.length > 0 && (
                      <ul className="vinkjes">
                        {s.punten.map((punt) => (
                          <li key={punt}>{punt}</li>
                        ))}
                      </ul>
                    )}
                  </Verschijnt>
                ))}
              </Inklap>
            ) : (
              <>
                <h2>Trainen bij Fitstudio Sayan</h2>
                <p>
                  Bij Fitstudio Sayan in Oudehaske train je in een kleine groep, met een trainer
                  die je naam kent. Buiten als het kan, binnen als je dat liever hebt.
                </p>
                <p>
                  Wil je weten of het bij je past? Kom een keer gratis meetrainen en beslis daarna
                  pas.
                </p>
              </>
            )}

            <Link href="/proefles/" className="knop knop-vuur" style={{ marginTop: '1rem' }}>
              Plan je proefles
            </Link>

            {!isReview && (
              <>
                <h3 style={{ marginTop: '2.5rem' }}>Ook in deze plaatsen</h3>
                <div className="plaatsen">
                  {BUURT.filter(([, b]) => b !== p.pad).map(([naam, b]) => (
                    <Link key={b} href={b}>
                      {naam}
                    </Link>
                  ))}
                </div>
              </>
            )}
          </div>

          <div className="zijkolom">
            <Proefles herkomst={p.pad} />
            <div className="kaart zijkaart">
              <h3>Direct regelen</h3>
              <ul className="kaart-lijst">
                <li>
                  <Link href="/trainingstijden/">Bekijk het lesrooster</Link>
                </li>
                <li>
                  <Link href="/webshop/">Abonnement of credits kopen</Link>
                </li>
                <li>
                  <Link href="/tarieven/">Wat het kost</Link>
                </li>
                <li>
                  <Link href="/contact/">Bellen of langskomen</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {!isReview && <Reviews />}

      <section className="vlak slot">
        <div className="omhulsel slot-in">
          <div>
            <span className="label">Zin om te beginnen?</span>
            <h2>Train een keer gratis mee</h2>
            <p>
              Geen verplichting, geen inschrijfgeld. Kom langs in {bedrijf.plaats} en kijk of het
              klikt.
            </p>
          </div>
          <div className="slot-knoppen">
            <Link href="/proefles/" className="knop knop-vuur">
              Gratis proefles
            </Link>
            <a href={bedrijf.whatsapp} className="knop knop-rand" target="_blank" rel="noopener">
              Stel je vraag via WhatsApp
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
