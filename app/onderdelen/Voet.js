import Link from 'next/link';
import Logo from './Logo';
import { bedrijf } from '@/lib/bedrijf';

// Iconen inline: vier kleine paden wegen niets, een icoonbibliotheek wel.
const Icoon = {
  pin: (
    <path d="M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7Zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5Z" />
  ),
  telefoon: (
    <path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.4.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1A17 17 0 0 1 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.4 0 .8-.2 1l-2.3 2.2Z" />
  ),
  mail: (
    <path d="M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Zm8 7L4.4 6.2A1 1 0 0 0 4 6v.3l8 5 8-5V6a1 1 0 0 0-.4-.2L12 11Z" />
  ),
  // Lijnvorm: de eerdere gevulde variant liep dicht en werd een bol.
  klok: (
    <g fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3.2 1.9" />
    </g>
  ),
  facebook: (
    <path d="M22 12a10 10 0 1 0-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.7-3.9 1.1 0 2.2.2 2.2.2v2.4h-1.2c-1.2 0-1.6.8-1.6 1.6V12h2.7l-.4 2.9h-2.3v7A10 10 0 0 0 22 12Z" />
  ),
  instagram: (
    <path d="M12 2.2c3.2 0 3.6 0 4.9.1 1.2.1 1.8.3 2.2.4.6.2 1 .5 1.4.9.4.4.7.8.9 1.4.2.4.4 1 .4 2.2.1 1.3.1 1.7.1 4.9s0 3.6-.1 4.9c-.1 1.2-.3 1.8-.4 2.2-.2.6-.5 1-.9 1.4-.4.4-.8.7-1.4.9-.4.2-1 .4-2.2.4-1.3.1-1.7.1-4.9.1s-3.6 0-4.9-.1c-1.2-.1-1.8-.3-2.2-.4a3.9 3.9 0 0 1-1.4-.9 3.9 3.9 0 0 1-.9-1.4c-.2-.4-.4-1-.4-2.2C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.9c.1-1.2.3-1.8.4-2.2.2-.6.5-1 .9-1.4.4-.4.8-.7 1.4-.9.4-.2 1-.4 2.2-.4 1.3-.1 1.7-.1 4.9-.1Zm0 3.8a6 6 0 1 0 0 12 6 6 0 0 0 0-12Zm0 9.9a3.9 3.9 0 1 1 0-7.8 3.9 3.9 0 0 1 0 7.8Zm6.2-10.1a1.4 1.4 0 1 1-2.8 0 1.4 1.4 0 0 1 2.8 0Z" />
  ),
  // Omtrek plus hoorn: de gevulde variant werd op 20px een vlek.
  whatsapp: (
    <g fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3.5 20.5l1.2-4a8 8 0 1 1 3 3l-4.2 1Z" />
      <path d="M9.2 9c-.3 0-.6.1-.8.4-.3.3-.9.9-.9 2.1s.9 2.4 1 2.6c.1.2 1.7 2.7 4.2 3.7 1.2.5 1.8.5 2.4.4.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.1-1.2l-1.7-.8c-.2-.1-.4-.1-.6.1l-.7.9c-.1.2-.3.2-.5.1-.9-.4-1.7-1-2.3-1.9-.1-.2-.1-.3.1-.5l.5-.6c.1-.2.1-.4 0-.6L10.9 9.4c-.2-.4-.4-.4-.6-.4h-1.1Z" />
    </g>
  ),
};

const Svg = ({ kind, maat = 20 }) => (
  <svg width={maat} height={maat} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    {Icoon[kind]}
  </svg>
);

const trainen = [
  ['Aanbod', '/aanbod/'],
  ['Tarieven', '/tarieven/'],
  ['Rooster', '/trainingstijden/'],
  ['Webshop', '/webshop/'],
  ['Personal training', '/personal-training/'],
  ['Indoor training', '/indoor/'],
  ['Voor bedrijven', '/voor-bedrijven/'],
];

const plaatsen = [
  ['Personal trainer Heerenveen', '/personal-trainer-heerenveen/'],
  ['Personal trainer Joure', '/personal-trainer-joure/'],
  ['Personal trainer Oudehaske', '/personal-trainer-oudehaske/'],
  ['Bootcamp Friesland', '/bootcamp-friesland/'],
  ['Afvallen Heerenveen', '/afvallen-heerenveen/'],
  ['Buiten fitness Friesland', '/buiten-fitness-friesland/'],
];

export default function Voet() {
  const tel = bedrijf.telefoon.replace(/\s/g, '');

  return (
    <footer className="voet">
      <div className="omhulsel">
        <div className="voet-raster">
          <div className="voet-merk">
            <span className="voet-logo">
              <Logo hoogte={44} licht />
            </span>
            <p>
              Kleinschalige fitstudio in Oudehaske. Buiten trainen, binnen trainen en personal
              training in de regio Heerenveen en Joure.
            </p>
            <p className="voet-volg">Volg de studio</p>
            <div className="voet-socials">
              <a className="soc-fb" href={bedrijf.facebook} target="_blank" rel="noopener">
                <Svg kind="facebook" maat={22} />
                <span>Facebook</span>
              </a>
              <a className="soc-ig" href={bedrijf.instagram} target="_blank" rel="noopener">
                <Svg kind="instagram" maat={22} />
                <span>Instagram</span>
              </a>
              <a className="soc-wa" href={bedrijf.whatsapp} target="_blank" rel="noopener">
                <Svg kind="whatsapp" maat={22} />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>

          <div>
            <h3>Trainen</h3>
            <ul className="voet-lijst">
              {trainen.map(([naam, pad]) => (
                <li key={pad}>
                  <Link href={pad}>{naam}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3>In de buurt</h3>
            <ul className="voet-lijst">
              {plaatsen.map(([naam, pad]) => (
                <li key={pad}>
                  <Link href={pad}>{naam}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3>Contact</h3>
            <ul className="voet-lijst voet-contact">
              <li>
                <Svg kind="pin" />
                <span>
                  {bedrijf.straat}
                  <br />
                  {bedrijf.postcode} {bedrijf.plaats}
                </span>
              </li>
              <li>
                <Svg kind="telefoon" />
                <a href={`tel:${tel}`}>{bedrijf.telefoonNet}</a>
              </li>
              <li>
                <Svg kind="mail" />
                <a href={`mailto:${bedrijf.email}`}>{bedrijf.email}</a>
              </li>
              <li>
                <Svg kind="klok" />
                <span>Anti-roest: ma, wo en vr 9:30</span>
              </li>
            </ul>
            <Link href="/proefles/" className="knop knop-vuur knop-klein" style={{ marginTop: '1.2rem' }}>
              Gratis proefles
            </Link>
          </div>
        </div>

        <div className="voet-onder">
          <span>
            © {new Date().getFullYear()} Sayan Bervoets · KvK {bedrijf.kvk} · BTW {bedrijf.btw}
          </span>
          <span>
            <Link href="/privacyverklaring/">Privacyverklaring</Link> ·{' '}
            <Link href="/sitemap/">Sitemap</Link>
          </span>
        </div>
      </div>
    </footer>
  );
}
