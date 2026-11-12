// Zet de diepe oogst om in bron voor de site. Werkt op oude-site-diep.json:
// die is met een echte browser gemaakt en bevat per pagina de koppen, alinea's
// en lijstpunten apart, in plaats van één lap tekst.
import { readFileSync, writeFileSync } from 'node:fs';

const oud = JSON.parse(readFileSync(new URL('../data/oude-site-diep.json', import.meta.url), 'utf8'));

// Deze pagina's hebben op onze site een eigen, betere versie.
const EIGEN = new Set([
  '/', '/contact/', '/tarieven/', '/trainingstijden/', '/webshop/', '/aanbod/',
  // deze worden in next.config.mjs met een 301 doorgestuurd
  '/indoor/tarieven/', '/trainingstijden-2/', '/locatie-2/', '/1-op-1-begeleiding-2/',
]);

// Verouderde bedragen uit de oude site. De webshop rekent 46, 56 en 62 euro;
// een pagina die 35 belooft levert een klacht bij de kassa op.
const OUDE_PRIJS = /(€\s?)?(35|45)\s?(euro)?.{0,40}(per maand|maand|strippenkaart|trainingen)|strippenkaart.{0,40}(45|35)/i;

// Zinnen die op elke pagina terugkomen (kop, voet, widget) zijn geen inhoud.
const RUIS = [
  /^Fitstudio Sayan$/i,
  /^Volg ons via$/i,
  /^Sayan Bervoets$/i,
  /^Badweg 4/i,
  /^Hulp nodig/i,
  /joinchat/i,
  /^Chat openen$/i,
  /^(Uw|Je) (naam|e-?mailadres|telefoonnummer)/i,
  /^Post navigation$/i,
  /^(Vorige|Volgende|Previous|Next)$/i,
  /^\d+$/,
];

const isRuis = (t) => RUIS.some((r) => r.test(t));

// Uit de losse blokken maken we secties: een kop met de tekst die eronder
// hoort. Zo houdt elke pagina zijn eigen h2/h3-structuur in plaats van een
// muur tekst.
function secties(blokken) {
  const uit = [];
  let huidig = { kop: null, niveau: 2, alineas: [], punten: [] };

  const bewaar = () => {
    if (huidig.kop || huidig.alineas.length || huidig.punten.length) uit.push(huidig);
  };

  for (const blok of blokken) {
    const tekst = blok.tekst.trim();
    if (!tekst || isRuis(tekst)) continue;

    if (/^h[1-4]$/.test(blok.soort)) {
      // h1 is de paginatitel; die zetten we apart en niet als sectiekop.
      if (blok.soort === 'h1') continue;
      bewaar();
      huidig = { kop: tekst, niveau: blok.soort === 'h2' ? 2 : 3, alineas: [], punten: [] };
      continue;
    }
    if (blok.soort === 'li') {
      if (tekst.length > 2 && tekst.length < 200) huidig.punten.push(tekst);
      continue;
    }
    if (tekst.length > 25) {
      // Alinea's met een achterhaald tarief laten we vallen; de prijzen staan
      // op een eigen pagina die uit de webshop komt.
      if (OUDE_PRIJS.test(tekst)) continue;
      huidig.alineas.push(tekst);
    }
  }
  bewaar();

  // Secties zonder enige inhoud onder de kop leveren een lege H2 op.
  return uit.filter((s) => s.alineas.length || s.punten.length);
}

// Geen enkele pagina op de oude site had een h1. De SEO-titel als kop
// gebruiken leest slecht ("Krachttraining Heerenveen | Fitness in
// groepsverband"), dus knippen we die af op de dubbele punt of pijp. Levert
// dat niets bruikbaars op, dan maken we een kop van de URL.
function maakKop(titel, pad) {
  const deel = (titel || '').split(/\s*[|:]\s*/)[0].trim();
  if (deel.length > 3 && !/^fitstudio sayan$/i.test(deel)) return deel;

  const woorden = pad.replace(/^\/|\/$/g, '').split('/').pop().split('-');
  const zin = woorden.join(' ').replace(/^\w/, (c) => c.toUpperCase());
  return zin.replace(/(heerenveen|joure|oudehaske|haskerhorne|vegelinsoord|friesland|sayan)/gi,
    (w) => w[0].toUpperCase() + w.slice(1).toLowerCase());
}

const paginas = oud
  .filter((p) => !EIGEN.has(p.pad))
  .map((p) => {
    const eigenH1 = p.blokken.find((b) => b.soort === 'h1' && !isRuis(b.tekst))?.tekst;
    const titel = p.titel.replace(/\s*[-|]\s*Fitstudio Sayan\s*$/i, '').trim();
    const kop = eigenH1 || maakKop(titel, p.pad);
    const deel = secties(p.blokken);
    const woorden = deel.reduce((n, s) => n + s.alineas.join(' ').length, 0);
    return {
      pad: p.pad,
      slug: p.pad.replace(/^\/|\/$/g, '').split('/'),
      titel: titel || kop,
      omschrijving: p.omschrijving,
      kop,
      secties: deel,
      afbeeldingen: p.beelden.map((b) => '/foto/' + b.src.split('/').pop()),
      iframes: p.iframes,
      leeg: woorden < 250,
    };
  });

writeFileSync(new URL('../data/paginas.json', import.meta.url), JSON.stringify(paginas, null, 2));
const leeg = paginas.filter((p) => p.leeg);
console.log(`${paginas.length} pagina's, ${leeg.length} met weinig eigen tekst:`);
console.log(leeg.map((p) => p.pad).join('\n'));
