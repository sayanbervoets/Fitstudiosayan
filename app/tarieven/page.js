import Link from 'next/link';
import Image from 'next/image';
import { tarieven, personalTarieven, bedrijf } from '@/lib/bedrijf';
import Verschijnt from '../onderdelen/Verschijnt';
import Reviews from '../onderdelen/Reviews';

export const metadata = {
  title: 'Tarieven',
  description:
    'Onbeperkt trainen voor €48 per vier weken of 10 credits voor €70. Personal training inclusief groepslessen vanaf €195. Geen inschrijfgeld.',
  alternates: { canonical: '/tarieven/' },
};

// Wat mensen echt willen weten voordat ze een bedrag zien: waar betaal ik
// voor? Dit stond nergens op zijn site.
const inbegrepen = [
  {
    nr: '01',
    titel: 'Kleine groepen',
    tekst: 'Binnen train je met maximaal acht mensen. Daardoor is er tijd om naar jouw houding te kijken in plaats van naar de klok.',
  },
  {
    nr: '02',
    titel: 'Aangepast aan jou',
    tekst: 'Blessure, rugklachten of jaren niets gedaan? De oefeningen worden aangepast, zodat je gewoon mee kunt doen.',
  },
  {
    nr: '03',
    titel: 'Doelen die we nakijken',
    tekst: 'We spreken af waar je naartoe werkt en bespreken regelmatig hoe het gaat. Doel gehaald? Dan stellen we een nieuwe.',
  },
  {
    nr: '04',
    titel: 'Binnen én buiten',
    tekst: 'Je kiest per training of je naar buiten gaat of de studio in. Hetzelfde abonnement, geen toeslag.',
  },
  {
    nr: '05',
    titel: 'Geen inschrijfgeld',
    tekst: 'Je betaalt alleen de training. Geen startkosten, geen administratiekosten, geen jaarcontract.',
  },
  {
    nr: '06',
    titel: 'Eerst gratis proberen',
    tekst: 'De eerste les kost niets. Pas daarna beslis je of en welk pakket bij je past.',
  },
];

const vragen = [
  {
    vraag: 'Zit ik ergens aan vast?',
    antwoord:
      'Het onbeperkte abonnement is per vier weken opzegbaar en er is geen inschrijfgeld.',
  },
  {
    vraag: 'Wat als ik een week niet kan?',
    antwoord:
      'Met credits train je wanneer het uitkomt: er gaat alleen een credit af als je meedoet. Bij personal training is een moment vaak te verschuiven.',
  },
  {
    vraag: 'Moet ik al fit zijn om mee te doen?',
    antwoord:
      'Nee. De groepen zijn klein en de oefeningen worden aangepast aan wat jij aankan, ook bij een blessure of beperking.',
  },
  {
    vraag: 'Kan ik eerst een keer kijken?',
    antwoord:
      'Ja, de eerste les is gratis en vrijblijvend. Je hoeft niets mee te nemen behalve sportkleding.',
  },
];

export default function Tarieven() {
  return (
    <>
      <section className="hero hero-kort schuin-onder">
        <div className="hero-foto">
          <Image src="/foto/duo-buiten.webp" alt="Samen trainen bij Fitstudio Sayan" fill priority sizes="100vw" />
        </div>
        <div className="hero-waas" />
        <div className="omhulsel">
          <div className="hero-in">
            <span className="label" style={{ color: 'var(--vuur)' }}>
              Tarieven
            </span>
            <h1>Wat het kost</h1>
            <p>
              Geen inschrijfgeld en geen jaarcontract. Je kiest een abonnement of credits, en je
              zegt per vier weken op als je wil stoppen.
            </p>
          </div>
        </div>
      </section>

      <section className="vlak">
        <div className="omhulsel">
          <span className="label">Groepslessen</span>
          <h2>
            Binnen en buiten <span className="streep">meetrainen</span>
          </h2>
          <p style={{ color: 'var(--grijs)', maxWidth: '46rem' }}>
            Bij elk pakket hoort dezelfde begeleiding: kleine groepen, oefeningen die worden
            aangepast aan wat jij aankan, en een trainer die je naam kent. Je begint altijd met
            een gratis proefles, zodat je weet wat je kiest.
          </p>
          <div className="raster raster-4 raster-schuif" style={{ marginTop: '2.4rem' }}>
            {tarieven.map((t, i) => (
              <Verschijnt key={t.naam} vertraging={i * 100}>
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
                  <p className="prijs-voorwie">{t.voorWie}</p>
                  <span className="prijs-kopje">Hier krijg je</span>
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
                    Eerst gratis proberen
                  </Link>
                </div>
              </Verschijnt>
            ))}
          </div>
        </div>
      </section>

      <section className="vlak vlak-wit">
        <div className="omhulsel">
          <span className="label">Bij elk pakket</span>
          <h2>
            Wat je altijd <span className="streep">meekrijgt</span>
          </h2>
          <div className="raster raster-3 raster-schuif" style={{ marginTop: '2.2rem' }}>
            {inbegrepen.map((i) => (
              <div key={i.titel} className="kaart inbegrepen">
                <span className="inbegrepen-nr">{i.nr}</span>
                <h3>{i.titel}</h3>
                <p>{i.tekst}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="vlak sportwagen schuin-beide">
        <div className="omhulsel">
          <span className="label">Personal training</span>
          <h2>Eén op één, 45 minuten</h2>
          <p style={{ color: '#b4c0d2', maxWidth: '42rem' }}>
            Op maat gemaakte trainingen, waar en wanneer het jou uitkomt. Je mag bij personal
            training één persoon gratis meenemen, dus je kunt de kosten delen.
          </p>
          <div className="pt-raster">
            {personalTarieven.map((t) => (
              <div key={t.naam} className="pt-kaart">
                <span className="pt-naam">{t.naam}</span>
                <span className="pt-prijs">
                  <sup>€</sup>
                  {t.prijs}
                </span>
                <span className="pt-eenheid">{t.eenheid}</span>
              </div>
            ))}
          </div>
          <Link href="/webshop/" className="knop knop-vuur" style={{ marginTop: '2rem' }}>
            Bekijk in de webshop
          </Link>
        </div>
      </section>

      <section className="vlak vlak-wit">
        <div className="omhulsel raster raster-2" style={{ alignItems: 'start', gap: '3rem' }}>
          <div className="tekstblok">
            <span className="label">Veelgestelde vragen</span>
            <h2>Voordat je begint</h2>
            <div className="vragen">
              {vragen.map((v) => (
                <details key={v.vraag}>
                  <summary>{v.vraag}</summary>
                  <p>{v.antwoord}</p>
                </details>
              ))}
            </div>
          </div>
          <div className="kaart">
            <h3>Liever even overleggen?</h3>
            <p style={{ color: 'var(--grijs)' }}>
              Sayan neemt zelf op. Bel of app gerust, ook als je twijfelt of het iets voor je is.
            </p>
            <p>
              <a href={`tel:${bedrijf.telefoon.replace(/\s/g, '')}`}>{bedrijf.telefoonNet}</a>
              <br />
              <a href={`mailto:${bedrijf.email}`}>{bedrijf.email}</a>
            </p>
            <Link href="/proefles/" className="knop knop-vuur">
              Gratis proefles
            </Link>
          </div>
        </div>
      </section>

      <Reviews />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: vragen.map((v) => ({
              '@type': 'Question',
              name: v.vraag,
              acceptedAnswer: { '@type': 'Answer', text: v.antwoord },
            })),
          }),
        }}
      />
    </>
  );
}
