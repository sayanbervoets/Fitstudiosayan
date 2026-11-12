// Haalt alle live pagina's van fitstudiosayan.nl op en bewaart titel, meta,
// koppen en platte tekst per URL. Bron voor de nieuwe Next.js-site: zo blijft
// elke bestaande URL bestaan en gaat geen Google-positie verloren.
import { writeFileSync } from 'node:fs';

const BASIS = 'https://www.fitstudiosayan.nl';

async function sitemapUrls() {
  const uit = new Set();
  for (const s of ['post', 'page', 'testimonials']) {
    try {
      const xml = await (await fetch(`${BASIS}/${s}-sitemap.xml`)).text();
      for (const m of xml.matchAll(/<loc>([^<]+)<\/loc>/g)) uit.add(m[1].replace('http://', 'https://'));
    } catch (e) { console.error(`sitemap ${s} mislukt: ${e.message}`); }
  }
  return [...uit];
}

const tekstUit = (h) => h
  .replace(/<script[\s\S]*?<\/script>/gi, ' ')
  .replace(/<style[\s\S]*?<\/style>/gi, ' ')
  .replace(/<[^>]+>/g, ' ')
  .replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&#8217;|&rsquo;/g, "'")
  .replace(/&[a-z]+;|&#\d+;/gi, ' ')
  .replace(/\s+/g, ' ').trim();

const koppen = (h, n) => [...h.matchAll(new RegExp(`<h${n}[^>]*>([\s\S]*?)</h${n}>`, 'gi'))]
  .map((m) => tekstUit(m[1])).filter(Boolean);

const urls = await sitemapUrls();
console.log(`${urls.length} urls gevonden`);
const paginas = [];

for (const url of urls) {
  // Per pagina afvangen: één 404 of time-out mag de hele oogst niet stoppen.
  try {
    const r = await fetch(url, { headers: { 'user-agent': 'Mozilla/5.0 (compatible; RankStudio migratie)' } });
    if (!r.ok) { console.error(`${r.status} ${url}`); continue; }
    const h = await r.text();
    const pad = new URL(url).pathname;
    const body = h.split(/<\/header>/i).pop();
    paginas.push({
      pad,
      slug: pad.replace(/^\/|\/$/g, '') || 'home',
      titel: tekstUit((h.match(/<title[^>]*>([\s\S]*?)<\/title>/i) || [])[1] || ''),
      omschrijving: (h.match(/<meta name="description" content="([^"]*)"/i) || [])[1] || '',
      h1: koppen(h, 1), h2: koppen(body, 2), h3: koppen(body, 3),
      tekst: tekstUit(body).slice(0, 6000),
      afbeeldingen: [...new Set([...h.matchAll(/(?:src|data-src)="(https:\/\/www\.fitstudiosayan\.nl\/wp-content\/uploads\/[^"]+\.(?:jpg|jpeg|png|webp))"/gi)].map((m) => m[1]))],
    });
    process.stdout.write('.');
  } catch (e) { console.error(`\nfout ${url}: ${e.message}`); }
}

writeFileSync(new URL('../data/oude-site.json', import.meta.url), JSON.stringify(paginas, null, 2));
console.log(`\n${paginas.length} pagina's bewaard in data/oude-site.json`);
