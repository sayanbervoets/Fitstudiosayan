import Image from 'next/image';
import { bedrijf } from '@/lib/bedrijf';
import Proefles from '../onderdelen/Proefles';

export const metadata = {
  title: 'Gratis proefles aanvragen',
  description:
    'Kom vrijblijvend een keer meetrainen bij Fitstudio Sayan in Oudehaske. De eerste les is gratis, je zit nergens aan vast.',
  alternates: { canonical: '/proefles/' },
};

export default function ProeflesPagina() {
  return (
    <>
      <section className="hero hero-kort schuin-onder">
        <div className="hero-foto">
          <Image src="/foto/groep-plein.webp" alt="Fitstudio Sayan" fill priority sizes="100vw" />
        </div>
        <div className="hero-waas" />
        <div className="omhulsel">
          <div className="hero-in">
            <h2>Hoe het werkt</h2>
            <p>
              Je meldt je aan, wij bellen om een moment te kiezen dat jou schikt. Kom in sport-
              kleding, de rest regelen we ter plekke.
            </p>
          </div>
        </div>
      </section>

      <section className="vlak">
      <div className="omhulsel raster raster-2" style={{ alignItems: 'start', gap: '3rem' }}>
        <div className="tekstblok">
          <span className="label">Vrijblijvend</span>
          <h1>Train een keer gratis mee</h1>
          <p>
            Je hoeft niets te kunnen en niets mee te nemen. Vul je gegevens in, dan bellen we je
            om een moment af te spreken dat jou uitkomt.
          </p>
          <p style={{ color: 'var(--grijs)' }}>
            {bedrijf.straat}, {bedrijf.postcode} {bedrijf.plaats}
            <br />
            <a href={`tel:${bedrijf.telefoon.replace(/\s/g, '')}`}>{bedrijf.telefoonNet}</a> ·{' '}
            <a href={`mailto:${bedrijf.email}`}>{bedrijf.email}</a>
          </p>
        </div>
        <Proefles herkomst="proefles-pagina" />
      </div>
    </section>
    </>
  );
}
