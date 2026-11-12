import Link from 'next/link';
import Image from 'next/image';
import categorieen from '@/data/webshop.json';
import Verschijnt from '../onderdelen/Verschijnt';

export const metadata = {
  title: 'Webshop — abonnementen, en personal training',
  description:
    'Bekijk het aanbod van Fitstudio Sayan: abonnementen en credits voor groepslessen, en personal training.',
  alternates: { canonical: '/webshop/' },
};

// Prijzen tonen zoals je ze in Nederland leest: 46,- en 29,95.
const prijsUit = (p) =>
  Number.isInteger(p) ? `${p},-` : p.toFixed(2).replace('.', ',');

export default function Webshop() {
  const alles = categorieen.flatMap((c) => c.producten);

  return (
    <>
      <section className="hero hero-kort schuin-onder">
        <div className="hero-foto">
          <Image src="/foto/wagen-gras.webp" alt="Fitstudio Sayan" fill priority sizes="100vw" />
        </div>
        <div className="hero-waas" />
        <div className="omhulsel">
          <div className="hero-in">
            <span className="label">Webshop</span>
            <h1>Alles wat je bij ons kunt afnemen</h1>
            <p>
              Van een abonnement tot personal training. Je rekent af in onze
              eigen webshop; twijfel je wat bij je past, loop dan even binnen of app ons.
            </p>
          </div>
        </div>
      </section>

      <section className="vlak vlak-wit">
        <div className="omhulsel">
          <nav className="snelnaar" aria-label="Naar een categorie">
            {categorieen.map((c) => (
              <a key={c.naam} href={`#${c.naam.replace(/\s+/g, '-').toLowerCase()}`}>
                {c.naam}
              </a>
            ))}
          </nav>
        </div>
      </section>

      {categorieen.map((c, i) => (
        <section
          key={c.naam}
          className={`vlak ${i % 2 === 0 ? '' : 'vlak-wit'}`}
          id={c.naam.replace(/\s+/g, '-').toLowerCase()}
        >
          <div className="omhulsel">
            <span className="label">{`0${i + 1}`}</span>
            <h2>{c.naam}</h2>
            <p style={{ color: 'var(--grijs)', maxWidth: '46rem' }}>{c.uitleg}</p>

            <div className="raster raster-3 raster-schuif" style={{ marginTop: '2.2rem' }}>
              {c.producten.map((p, n) => (
                <Verschijnt key={p.naam} vertraging={Math.min(n, 4) * 80}>
                  <article className="kaart kaart-foto product">
                    <div className="kaart-vak product-vak">
                      <Image src={p.beeld} alt={p.naam} fill sizes="(max-width: 900px) 100vw, 33vw" />
                      <span className="product-badge">
                        <sup>€</sup>
                        {prijsUit(p.prijs)}
                      </span>
                    </div>
                    <div className="kaart-tekst">
                      <h3>{p.naam}</h3>
                      <p>{p.omschrijving}</p>
                      <a
                        href={p.link}
                        className="knop knop-rand knop-klein"
                        target="_blank"
                        rel="noopener"
                      >
                        Bekijken en bestellen
                      </a>
                    </div>
                  </article>
                </Verschijnt>
              ))}
            </div>
          </div>
        </section>
      ))}

      <section className="vlak sportwagen">
        <div className="omhulsel raster raster-2" style={{ alignItems: 'center', gap: '3rem' }}>
          <div className="tekstblok">
            <span className="label">Twijfel je nog?</span>
            <h2>Probeer het eerst een keer</h2>
            <p>
              Je hoeft niets te kopen om mee te trainen. De eerste les is gratis — daarna weet je
              pas of een abonnement of een strippenkaart bij je past.
            </p>
            <Link href="/proefles/" className="knop knop-vuur">
              Gratis proefles aanvragen
            </Link>
          </div>
          <div className="beeldvak beeldvak-breed beeldvak-schuin">
            <Image
              src="/foto/studio/studio-roeien.webp"
              alt="Training in de studio van Fitstudio Sayan"
              fill
              sizes="(max-width: 900px) 100vw, 50vw"
            />
          </div>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ItemList',
            name: 'Aanbod Fitstudio Sayan',
            numberOfItems: alles.length,
            itemListElement: alles.map((p, i) => ({
              '@type': 'ListItem',
              position: i + 1,
              item: {
                '@type': 'Product',
                name: p.naam,
                description: p.omschrijving,
                offers: {
                  '@type': 'Offer',
                  price: p.prijs.toFixed(2),
                  priceCurrency: 'EUR',
                  availability: 'https://schema.org/InStock',
                },
              },
            })),
          }),
        }}
      />
    </>
  );
}
