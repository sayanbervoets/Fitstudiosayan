import Image from 'next/image';
import { bedrijf } from '@/lib/bedrijf';
import Proefles from '../onderdelen/Proefles';

export const metadata = {
  title: 'Contact',
  description:
    'Fitstudio Sayan, Badweg 4 in Oudehaske. Bel, app of mail Sayan Bervoets — of vraag meteen een gratis proefles aan.',
  alternates: { canonical: '/contact/' },
};

export default function Contact() {
  return (
    <>
      <section className="hero hero-kort schuin-onder">
        <div className="hero-foto">
          <Image src="/foto/studio/gebouw-badweg.webp" alt="Het gebouw van Fitstudio Sayan aan de Badweg 4 in Oudehaske" fill priority sizes="100vw" />
        </div>
        <div className="hero-waas" />
        <div className="omhulsel">
          <div className="hero-in">
            <span className="label">Contact</span>
            <h1>Even overleggen?</h1>
            <p>Bel of app gerust. Sayan neemt zelf op, dus je hoeft geen keuzemenu door.</p>
          </div>
        </div>
      </section>

      <section className="vlak">
      <div className="omhulsel raster raster-2" style={{ alignItems: 'start', gap: '3rem' }}>
        <div className="tekstblok">
          <h2>Waar je ons vindt</h2>
          <div className="kaart" style={{ marginTop: '2rem' }}>
            <h3>{bedrijf.naam}</h3>
            <p style={{ margin: 0 }}>
              {bedrijf.straat}
              <br />
              {bedrijf.postcode} {bedrijf.plaats}
            </p>
            <p style={{ marginTop: '1rem', marginBottom: 0 }}>
              <a href={`tel:${bedrijf.telefoon.replace(/\s/g, '')}`}>{bedrijf.telefoonNet}</a>
              <br />
              <a href={`mailto:${bedrijf.email}`}>{bedrijf.email}</a>
            </p>
            <p style={{ marginTop: '1.4rem', marginBottom: 0, color: 'var(--grijs)', fontSize: '.9rem' }}>
              KvK {bedrijf.kvk} · BTW {bedrijf.btw}
            </p>
          </div>
        </div>
        <Proefles herkomst="contact" />
      </div>
    </section>
    </>
  );
}
