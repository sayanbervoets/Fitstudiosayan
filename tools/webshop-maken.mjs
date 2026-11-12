// Zet de ruwe webshop-oogst om in bron voor de site. De webshop is het
// levende systeem waar leden daadwerkelijk afrekenen; de losse tarievenpagina
// op zijn oude site noemt andere bedragen (35 en 45 euro). Zolang dat niet is
// opgehelderd houden we de webshopprijzen aan, want dat is wat iemand bij het
// afrekenen betaalt.
import { readFileSync, writeFileSync } from 'node:fs';

const ruw = JSON.parse(readFileSync(new URL('../data/webshop-ruw.json', import.meta.url), 'utf8'));

// Per categorie een beeld uit zijn eigen fotomateriaal; de webshop zelf levert
// geen productfoto's.
const BEELD = {
  Groepslessen: '/foto/groep-plein.webp',
  'Personal training': '/foto/squat-buiten.webp',
  'Sport artikelen': '/foto/studio-raam.webp',
  'Fitstudio Sayan team kleding': '/foto/duo-buiten.webp',
};

// Beeld per product, op onderwerp. Zonder foto zijn het grijze tekstblokjes.
const PRODUCTBEELD = [
  [/onbeperkt/i, '/foto/groep-plein.webp'],
  [/6 maanden/i, '/foto/barbell-water.webp'],
  [/credit|workout/i, '/foto/roeien-binnen.webp'],
  [/pt45/i, '/foto/squat-buiten.webp'],
  [/waterfles/i, '/foto/wagen-water.webp'],
  [/shake|eiwit/i, '/foto/trx-binnen.webp'],
  [/hoodie met rits/i, '/foto/wagen-brandweer.webp'],
  [/hoodie/i, '/foto/sayan-bij-wagen.webp'],
  [/shirt dames/i, '/foto/duo-buiten.webp'],
  [/shirt/i, '/foto/groep-gras.webp'],
  [/rugtas/i, '/foto/wagen-gras.webp'],
  [/broek/i, '/foto/kracht-binnen.webp'],
];

const kiesBeeld = (naam) => {
  for (const [patroon, beeld] of PRODUCTBEELD) if (patroon.test(naam || '')) return beeld;
  return '/foto/studio-raam.webp';
};

const UITLEG = {
  Groepslessen: 'Onbeperkt meetrainen of losse credits — binnen en buiten.',
  'Personal training': 'Sessies van 45 minuten, één op één, waar en wanneer het jou uitkomt.',
  'Sport artikelen': 'Wat je nodig hebt tijdens en na de training.',
  'Fitstudio Sayan team kleding': 'Shirts, hoodies en broeken in de kleuren van de studio.',
};

const categorieen = ruw
  .map((c) => ({
    naam: c.categorie,
    slug: c.naam,
    uitleg: UITLEG[c.categorie] || '',
    beeld: BEELD[c.categorie] || '/foto/groep-gras.webp',
    producten: c.producten.map((p) => ({
      naam: p.naam,
      omschrijving: p.omschrijving,
      // "46.00" -> "46,-" en "29.95" -> "29,95", zoals je het in Nederland leest
      prijs: Number(String(p.prijs).replace(',', '.')),
      link: p.link,
      beeld: kiesBeeld(p.naam),
    })),
  }))
  .filter((c) => c.producten.length > 0);

writeFileSync(new URL('../data/webshop.json', import.meta.url), JSON.stringify(categorieen, null, 2));
const totaal = categorieen.reduce((n, c) => n + c.producten.length, 0);
console.log(`${categorieen.length} categorieën, ${totaal} producten`);
