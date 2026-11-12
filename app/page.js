import Link from 'next/link';
import Image from 'next/image';
import { bedrijf, tarieven, trainers, antiRoest } from '@/lib/bedrijf';
import Proefles from './onderdelen/Proefles';
import Reviews from './onderdelen/Reviews';
import Verschijnt from './onderdelen/Verschijnt';
import Band from './onderdelen/Band';
import Video from './onderdelen/Video';
import Aanbod from './onderdelen/Aanbod';

export const metadata = {
  title: 'Fitstudio Sayan Oudehaske — buiten fitness bij Heerenveen',
  description:
    'Kleinschalige fitstudio in Oudehaske. Buiten trainen, bootcamp en personal training met echte begeleiding. Weer of geen weer: de training gaat door. Eerste les gratis.',
  alternates: { canonical: '/' },
};

const galerij = [
  ['/foto/studio/studio-overzicht.webp', 'De trainingsruimte van Fitstudio Sayan met het logo aan de muur en de trap naar de vide'],
  ['/foto/studio/studio-deadlift.webp', 'Deelnemer doet een deadlift met de halterstang in het rek'],
  ['/foto/studio/studio-dumbbells.webp', 'Trainer en deelnemer trainen met dumbbells voor het Fitstudio Sayan-logo'],
  ['/foto/studio/studio-roeien.webp', 'Groepstraining binnen met roeimachines en de trainer in het blauwe shirt'],
  ['/foto/studio/studio-coaching.webp', 'Trainer zit op zijn hurken naast een deelnemer en kijkt mee met de oefening'],
  ['/foto/duo-buiten.webp', 'Buiten trainen bij de Sportwagen van Fitstudio Sayan'],
];

// Plaatsen waar hij daadwerkelijk traint. Ze wijzen naar zijn bestaande
// landingspagina's, zodat de interne links die pagina's blijven voeden.
const buurt = [
  ['Oudehaske', '/personal-trainer-oudehaske/'],
  ['Heerenveen', '/personal-trainer-heerenveen/'],
  ['Joure', '/personal-trainer-joure/'],
  ['Haskerhorne', '/fitness-haskerhorne/'],
  ['Vegelinsoord', '/fitness-vegelinsoord/'],
  ['Friesland', '/personal-training-friesland/'],
];

export default function Home() {
  return (
    <>
      <section className="hero schuin-onder">
        <div className="hero-foto">
          <Image
            src="/foto/studio/studio-groepsles.webp"
            alt="Trainer van Fitstudio Sayan kijkt mee terwijl de groep in de studio in Oudehaske traint"
            fill
            priority
            sizes="100vw"
          />
        </div>
        <div className="hero-waas" />
        <div className="omhulsel">
          <div className="hero-in">
            <span className="label" style={{ color: 'var(--vuur)' }}>
              Oudehaske · Heerenveen · Joure
            </span>
            <h1>
              Weer of geen weer.
              <br />
              De training gaat door.
            </h1>
            <p>
              Een kleinschalige studio waar de trainer je naam kent en weet wat je nodig hebt.
              Buiten in de wind of binnen in de studio — jij kiest, wij trainen mee.
            </p>
            <div className="hero-knoppen">
              <Link href="/proefles/" className="knop knop-vuur">
                Eerste les gratis
              </Link>
              <a href={bedrijf.whatsapp} className="knop knop-licht" target="_blank" rel="noopener">
                Even appen
              </a>
            </div>
          </div>
        </div>
      </section>

      <Band
        feiten={[
          { icoon: 'kalender', naar: 4, achter: '×', label: 'per week buiten' },
          { icoon: 'euro', naar: 48, voor: '€', label: 'per 4 weken, onbeperkt' },
          { icoon: 'vinkje', naar: 0, voor: '€', label: 'inschrijfgeld' },
          { icoon: 'ster', naar: 16, label: 'reviews van leden' },
        ]}
      />

      <Aanbod />

      <section className="video-blok schuin-beide">
        <div className="videovak">
          <Video />
        </div>
        <div className="video-waas" />
        <div className="omhulsel">
          <div className="video-blok-in">
            <span className="label" style={{ color: 'var(--vuur)' }}>
              Kijk even binnen
            </span>
            <h2>Zo ziet een training eruit</h2>
            <p>
              Geen zaal vol vreemden en geen wachtrij bij het apparaat. Een kleine groep, een
              trainer die meekijkt, en na afloop een bak koffie.
            </p>
            <Link href="/proefles/" className="knop knop-vuur">
              Kom een keer meetrainen
            </Link>
          </div>
        </div>
      </section>

      <section className="vlak">
        <div className="omhulsel raster raster-2" style={{ alignItems: 'center', gap: '3.5rem' }}>
          <div className="tekstblok">
            <span className="label">Wie je treft</span>
            <h2>
              Geen nummer <span className="streep">op een pas</span>
            </h2>
            <div className="trainers-rij">
            {trainers.map((t) => (
              <div key={t.naam} className="trainer">
                <Image src={t.foto} alt={t.naam} width={160} height={200} className="trainer-foto" />
                <div className="trainer-tekst">
                  <h3 style={{ marginBottom: '.2rem' }}>{t.naam}</h3>
                  <span style={{ color: 'var(--vuur-tekst)', fontWeight: 700, fontSize: '.9rem' }}>
                    {t.rol}
                  </span>
                  <p style={{ marginTop: '.6rem', marginBottom: 0 }}>{t.tekst}</p>
                </div>
              </div>
            ))}
            </div>
          </div>
          <div className="galerij">
            {galerij.map(([f, alt]) => (
              <div key={f} className="galerij-vak">
                <Image src={f} alt={alt} fill sizes="(max-width: 900px) 50vw, 25vw" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="vlak sportwagen schuin-boven-alleen">
        <div className="omhulsel raster raster-2" style={{ alignItems: 'center', gap: '3rem' }}>
          <Verschijnt className="beeldvak beeldvak-breed beeldvak-schuin">
            <Image
              src="/foto/wagen-water.webp"
              alt="De Sportwagen van Fitstudio Sayan opgesteld aan het water"
              fill
              sizes="(max-width: 900px) 100vw, 50vw"
            />
          </Verschijnt>
          <div className="tekstblok">
            <span className="label">Uniek in Friesland</span>
            <h2>De Sportwagen komt naar jou toe</h2>
            <p>
              Een complete gym in een vrachtwagen. Klep open en er staat een rek, gewichten en
              alles wat je nodig hebt — op het sportveld, bij het water of op het terrein van je
              bedrijf.
            </p>
            <ul className="vinkjes">
              <li>Rek, gewichten en cardio aan boord</li>
              <li>Traint bij bedrijven, scholen en verenigingen</li>
              <li>Ook bij jou thuis in de straat</li>
            </ul>
            <Link href="/de-sportwagen-friesland/" className="knop knop-licht">
              Meer over de Sportwagen
            </Link>
          </div>
        </div>
      </section>

      <Reviews />

      <section className="vlak vlak-wit">
        <div className="omhulsel raster raster-2" style={{ alignItems: 'center', gap: '3rem' }}>
          <div className="tekstblok">
            <span className="label">Voor senioren in De Fryske Marren</span>
            <h2>{antiRoest.titel}</h2>
            <h3 style={{ fontStyle: 'italic', color: 'var(--vuur-tekst)' }}>{antiRoest.ondertitel}</h3>
            <p>{antiRoest.tekst}</p>
            <ul className="vinkjes">
              {antiRoest.punten.map((punt) => (
                <li key={punt}>{punt}</li>
              ))}
            </ul>
            <div className="vergoed">
              <strong>Je eerste maand kost niets.</strong> {antiRoest.vergoeding}
            </div>
            <p style={{ color: 'var(--grijs)', marginTop: '1.2rem' }}>{antiRoest.wanneer}</p>
            <Link href="/proefles/" className="knop knop-vuur">
              Aanmelden voor Anti-roest
            </Link>
          </div>
          <Verschijnt className="beeldvak beeldvak-staand beeldvak-schuin-om">
            <Image
              src="/foto/studio/studio-senior-bal.webp"
              alt="Deelnemer tilt een medicijnbal boven het hoofd bij het raam van de studio"
              fill
              sizes="(max-width: 900px) 100vw, 45vw"
            />
          </Verschijnt>
        </div>
      </section>

      <section className="vlak">
        <div className="omhulsel">
          <span className="label">Tarieven</span>
          <h2>
            Helder, zonder <span className="streep">kleine lettertjes</span>
          </h2>
          <div className="raster raster-4 raster-schuif" style={{ marginTop: '2.5rem' }}>
            {tarieven.map((t, i) => (
              <Verschijnt key={t.naam} vertraging={i * 110}>
                <div className={`kaart prijs${t.uitgelicht ? ' top' : ''}`}>
                  {t.uitgelicht && (
                    <span className="kaart-merk kaart-merk-vast">
                      <span>Meest gekozen</span>
                    </span>
                  )}
                  <h3>{t.naam}</h3>
                  <div className="prijs-bedrag">
                    <sup>€</sup>
                    {t.prijs}
                  </div>
                  <span style={{ color: 'var(--grijs)' }}>{t.eenheid}</span>
                  <ul>
                    {t.regels.map((r) => (
                      <li key={r}>{r}</li>
                    ))}
                  </ul>
                  <Link
                    href="/proefles/"
                    className={`knop ${t.uitgelicht ? 'knop-vuur' : 'knop-rand'}`}
                    style={{ marginTop: 'auto' }}
                  >
                    Begin met een proefles
                  </Link>
                </div>
              </Verschijnt>
            ))}
          </div>
          <p style={{ marginTop: '1.6rem', color: 'var(--grijs)' }}>
            Personal training en bedrijfstraining gaan op maat.{' '}
            <Link href="/contact/">Vraag naar de mogelijkheden.</Link>
          </p>
        </div>
      </section>

      <section className="vlak vlak-wit" id="proefles">
        <div className="omhulsel raster raster-2" style={{ alignItems: 'start', gap: '3rem' }}>
          <div className="tekstblok">
            <span className="label">Kom eens langs</span>
            <h2>De eerste les is gratis</h2>
            <p>
              Je hoeft niets te weten en niets mee te nemen. Kom een keer meetrainen, kijk of het
              klikt met de groep, en beslis daarna pas.
            </p>

            <h3>Waar we trainen</h3>
            <p style={{ color: 'var(--grijs)' }}>
              {bedrijf.straat}, {bedrijf.postcode} {bedrijf.plaats}
              <br />
              <a href={`tel:${bedrijf.telefoon.replace(/\s/g, '')}`}>{bedrijf.telefoonNet}</a> ·{' '}
              <a href={`mailto:${bedrijf.email}`}>{bedrijf.email}</a>
            </p>

            <h3>In de buurt</h3>
            <div className="plaatsen">
              {buurt.map(([naam, pad]) => (
                <Link key={pad} href={pad}>
                  {naam}
                </Link>
              ))}
            </div>
          </div>
          <Proefles herkomst="home" />
        </div>
      </section>
    </>
  );
}
