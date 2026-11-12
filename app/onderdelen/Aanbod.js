import Link from 'next/link';
import Image from 'next/image';
import Verschijnt from './Verschijnt';

export const aanbod = [
  {
    merk: 'Buiten',
    titel: 'Bootcamp en outdoor',
    tekst: 'Vier keer per week buiten, in een vaste groep. Regen hoort erbij.',
    punten: ['Kleine groepen', 'In de buitenlucht', 'Elk niveau door elkaar'],
    foto: '/foto/groep-plein.webp',
    pad: '/buiten-fitness-friesland/',
  },
  {
    merk: 'Eén op één',
    titel: 'Personal training',
    tekst: 'Een schema dat bij jouw lijf, doel en week past — en een trainer die meekijkt.',
    punten: ['Eigen trainingsschema', 'Rekening met blessures', 'Binnen of op locatie'],
    foto: '/foto/squat-buiten.webp',
    pad: '/personal-training/',
  },
  {
    merk: 'Binnen',
    titel: 'In de studio',
    tekst: 'Kracht, conditie en techniek onder begeleiding, met alles wat je nodig hebt.',
    punten: ['Roeien, fietsen, kracht', 'Nooit een wachtrij', 'Ook in de winter'],
    foto: '/foto/studio/studio-roeien.webp',
    pad: '/indoor/',
  },
];

export default function Aanbod() {
  return (
    <section className="vlak vlak-wit" id="aanbod">
      <div className="omhulsel">
        <span className="label">Wat we doen</span>
        <h2>
          Drie manieren om <span className="streep">te trainen</span>
        </h2>
        <div className="raster raster-3 raster-schuif" style={{ marginTop: '2.8rem' }}>
          {aanbod.map((a, i) => (
            <Verschijnt key={a.pad} vertraging={i * 110}>
              <Link href={a.pad} className="kaart kaart-foto">
                <div className="kaart-vak">
                  <span className="kaart-merk">
                    <span>{a.merk}</span>
                  </span>
                  <Image src={a.foto} alt={a.titel} fill sizes="(max-width: 900px) 100vw, 33vw" />
                </div>
                <div className="kaart-tekst">
                  <h3>{a.titel}</h3>
                  <p style={{ color: 'var(--grijs)', margin: 0 }}>{a.tekst}</p>
                  <ul className="kaart-lijst">
                    {a.punten.map((punt) => (
                      <li key={punt}>{punt}</li>
                    ))}
                  </ul>
                  <span className="kaart-meer">Bekijk deze training →</span>
                </div>
              </Link>
            </Verschijnt>
          ))}
        </div>
        <p className="schuifhint">Veeg voor meer trainingen →</p>
      </div>
    </section>
  );
}
