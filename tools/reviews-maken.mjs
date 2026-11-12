// Haalt de reviews uit de geoogste testimonial-pagina's. Alleen echte teksten
// van zijn eigen site; er wordt niets bijgeschreven of verzonnen.
import { readFileSync, writeFileSync } from 'node:fs';

const oud = JSON.parse(readFileSync(new URL('../data/oude-site.json', import.meta.url), 'utf8'));

const naamUit = (slug) => {
  // Slugs als 'testimonial-3' of 'l-p' zijn geen naam; die blijven leeg.
  if (/^(testimonial|review)(-\d+)?$/.test(slug) || slug.length <= 3) return null;
  return slug.split('-').map((d) => d[0].toUpperCase() + d.slice(1)).join(' ');
};

// Eén review van bijna duizend tekens rekt in een rail alle andere kaarten
// mee uit. We kappen af op een zinseinde, nooit midden in een woord.
function inkorten(tekst, max = 330) {
  if (tekst.length <= max) return tekst;
  const stuk = tekst.slice(0, max);
  const eind = Math.max(stuk.lastIndexOf('. '), stuk.lastIndexOf('! '), stuk.lastIndexOf('? '));
  return eind > 140 ? stuk.slice(0, eind + 1) : stuk.replace(/\s\S*$/, '') + '…';
}

const reviews = oud
  .filter((p) => p.pad.startsWith('/testimonials/') && p.pad !== '/testimonials/')
  .map((p) => {
    const slug = p.pad.replace('/testimonials/', '').replace(/\/$/, '');
    const tekst = p.tekst
      .replace(/Post navigation[\s\S]*/, '')
      .replace(/Fitstudio Sayan Badweg[\s\S]*/, '')
      .trim();
    return { slug, naam: naamUit(slug), tekst: inkorten(tekst) };
  })
  .filter((r) => r.tekst.length > 60)
  .sort((a, b) => (b.naam ? 1 : 0) - (a.naam ? 1 : 0));

writeFileSync(new URL('../data/reviews.json', import.meta.url), JSON.stringify(reviews, null, 2));
console.log(`${reviews.length} reviews, waarvan ${reviews.filter((r) => r.naam).length} met naam`);
