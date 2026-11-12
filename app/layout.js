import './globals.css';
import { bedrijf } from '@/lib/bedrijf';
import Balk from './onderdelen/Balk';
import Voet from './onderdelen/Voet';
import Acties from './onderdelen/Acties';

export const metadata = {
  metadataBase: new URL('https://www.fitstudiosayan.nl'),
  title: {
    default: 'Fitstudio Sayan Oudehaske — buiten fitness en personal training',
    template: '%s | Fitstudio Sayan',
  },
  description:
    'Kleinschalige fitstudio in Oudehaske bij Heerenveen. Buiten trainen, bootcamp en personal training met persoonlijke begeleiding. Eerste les gratis.',
  alternates: { canonical: '/' },
};

export const viewport = { themeColor: '#16130f' };

// Zoekmachines en AI-assistenten lezen dit blok om te weten wie, waar en
// wanneer: zonder LocalBusiness geen kaart- en 'in de buurt'-resultaten.
const bedrijfSchema = {
  '@context': 'https://schema.org',
  '@type': 'HealthAndBeautyBusiness',
  '@id': 'https://www.fitstudiosayan.nl/#bedrijf',
  name: bedrijf.naam,
  description:
    'Kleinschalige fitstudio in Oudehaske: buiten fitness, bootcamp, groepstraining en personal training in de regio Heerenveen en Joure.',
  url: 'https://www.fitstudiosayan.nl/',
  telephone: bedrijf.telefoon,
  email: bedrijf.email,
  image: 'https://www.fitstudiosayan.nl/foto/Fitstudio-Sayan.jpg',
  address: {
    '@type': 'PostalAddress',
    streetAddress: bedrijf.straat,
    postalCode: bedrijf.postcode,
    addressLocality: bedrijf.plaats,
    addressCountry: 'NL',
  },
  areaServed: ['Oudehaske', 'Heerenveen', 'Joure', 'Haskerhorne', 'Vegelinsoord', 'Friesland'],
  sameAs: [bedrijf.facebook, bedrijf.instagram],
  priceRange: '€€',
  // Alleen wat we hard weten: het tarief van de tarievenpagina en het tijdstip
  // van de Anti-roest training van de flyer. Het volledige rooster staat in
  // Virtuagym en zou hier binnen een week verouderd zijn.
  makesOffer: [
    {
      '@type': 'Offer',
      name: 'Abonnement onbeperkt trainen',
      price: '48',
      priceCurrency: 'EUR',
      priceSpecification: {
        '@type': 'UnitPriceSpecification',
        price: '48',
        priceCurrency: 'EUR',
        referenceQuantity: { '@type': 'QuantitativeValue', value: 4, unitCode: 'WEE' },
      },
    },
    {
      '@type': 'Offer',
      name: '10 credits',
      price: '70',
      priceCurrency: 'EUR',
    },
  ],
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Wednesday', 'Friday'],
      opens: '09:30',
      closes: '10:30',
      name: 'Anti-roest training',
    },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="nl">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800&family=Caveat:wght@600;700&display=swap"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(bedrijfSchema) }}
        />
      </head>
      <body>
        <Balk />
        <main>{children}</main>
        <Voet />
        <Acties />
      </body>
    </html>
  );
}
