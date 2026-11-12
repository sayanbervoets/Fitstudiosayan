// Tweede, diepere oogst. De eerste versie las alleen platte tekst uit de ruwe
// HTML en knipte op </header>; daardoor verdwenen hele Elementor-blokken en
// bleven pagina's als /aanbod/ en /webshop/ leeg. Deze versie rendert elke
// pagina in een echte browser en bewaart de structuur: koppen, alinea's,
// lijsten, prijzen, knoppen, afbeeldingen en tabellen.
import { chromium } from 'playwright';
import { writeFileSync } from 'node:fs';

const BASIS = 'https://www.fitstudiosayan.nl';

async function urls() {
  const uit = new Set();
  for (const s of ['post', 'page', 'testimonials']) {
    try {
      const xml = await (await fetch(`${BASIS}/${s}-sitemap.xml`)).text();
      for (const m of xml.matchAll(/<loc>([^<]+)<\/loc>/g)) uit.add(m[1].replace('http://', 'https://'));
    } catch (e) {
      console.error(`sitemap ${s}: ${e.message}`);
    }
  }
  return [...uit];
}

const browser = await chromium.launch();
const pagina = await browser.newPage({ viewport: { width: 1400, height: 1000 } });
const lijst = await urls();
console.log(`${lijst.length} pagina's te oogsten`);

const uit = [];
for (const url of lijst) {
  // Per pagina afvangen: één trage of kapotte pagina mag de oogst niet stoppen.
  try {
    await pagina.goto(url, { waitUntil: 'networkidle', timeout: 45000 });
    const data = await pagina.evaluate(() => {
      const schoon = (t) => (t || '').replace(/\s+/g, ' ').trim();

      // Kop, voet en chatwidget dragen op elke pagina dezelfde tekst; die
      // zou anders als 'inhoud' van iedere pagina meekomen.
      const negeer = 'header, footer, nav, .joinchat, #joinchat, .elementor-location-header, .elementor-location-footer, script, style, noscript';
      const romp = document.querySelector('main, .elementor-location-single, .site-main, #content') || document.body;
      const kloon = romp.cloneNode(true);
      kloon.querySelectorAll(negeer).forEach((e) => e.remove());

      const blokken = [];
      const gezien = new Set();
      for (const el of kloon.querySelectorAll('h1, h2, h3, h4, p, li, td, th')) {
        const tekst = schoon(el.textContent);
        if (tekst.length < 3 || gezien.has(tekst)) continue;
        // Een <li> die alleen een link naar een andere pagina is, is menu.
        if (el.tagName === 'LI' && el.querySelector('a') && tekst.length < 40) continue;
        gezien.add(tekst);
        blokken.push({ soort: el.tagName.toLowerCase(), tekst });
      }

      const beelden = [...kloon.querySelectorAll('img')]
        .map((i) => ({ src: i.currentSrc || i.src, alt: schoon(i.alt) }))
        .filter((i) => i.src && i.src.includes('/uploads/') && !/logo|icon/i.test(i.src));

      const knoppen = [...kloon.querySelectorAll('a.elementor-button, a.wp-block-button__link, .elementor-button-wrapper a')]
        .map((a) => ({ tekst: schoon(a.textContent), href: a.href }))
        .filter((k) => k.tekst);

      const iframes = [...kloon.querySelectorAll('iframe')].map((f) => f.src).filter(Boolean);

      return {
        titel: schoon(document.title),
        omschrijving: document.querySelector('meta[name="description"]')?.content || '',
        blokken,
        beelden,
        knoppen,
        iframes,
      };
    });

    const pad = new URL(url).pathname;
    uit.push({ pad, slug: pad.replace(/^\/|\/$/g, '') || 'home', ...data });
    process.stdout.write('.');
  } catch (e) {
    console.error(`\n${url}: ${e.message}`);
  }
}

await browser.close();
writeFileSync(new URL('../data/oude-site-diep.json', import.meta.url), JSON.stringify(uit, null, 2));

const leeg = uit.filter((p) => p.blokken.filter((b) => b.soort === 'p').length === 0);
console.log(`\n${uit.length} pagina's bewaard; ${leeg.length} zonder alinea's:`);
console.log(leeg.map((p) => p.pad).join('\n'));
