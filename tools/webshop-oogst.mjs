// Leest de Virtuagym-webshop van Fitstudio Sayan uit. Die shop hangt als
// iframe op /webshop/ en bevat het echte aanbod: groepslessen, personal
// training, sportartikelen en teamkleding. Op de site zelf staat er niets
// van; alleen een leeg kader.
import { chromium } from 'playwright';
import { writeFileSync } from 'node:fs';

const SHOP = 'https://fitstudiosayan.virtuagym.com/webshop/?club=WkpTbFZ2ZnI0eVdsb2Q5a0hxOXh0UT09&embedded=1';

const browser = await chromium.launch();
const pagina = await browser.newPage({ viewport: { width: 1400, height: 1400 } });
await pagina.goto(SHOP, { waitUntil: 'networkidle', timeout: 60000 });
await pagina.waitForTimeout(2500);

// Virtuagym zet de categorieën in .category-tab-item met een data-category.
const categorieen = await pagina.$$eval('.category-tab-item', (els) =>
  els.map((e) => ({ naam: e.textContent.trim(), id: e.dataset.category })),
);
console.log('categorieën:', categorieen.map((c) => c.naam));

const alles = [];
for (const { naam, id } of categorieen) {
  try {
    await pagina.click(`.category-tab-item[data-category="${id}"]`, { timeout: 8000 });
    await pagina.waitForTimeout(2200);
  } catch (e) {
    console.error(`kon niet klikken op ${naam}: ${e.message}`);
  }

  const producten = await pagina.evaluate(() => {
    const schoon = (t) => (t || '').replace(/\s+/g, ' ').trim();
    // Virtuagym rendert elk product als .product-item in .product-list-grid.
    // Alle producten staan altijd in de DOM; het tabblad verbergt ze alleen.
    // Daarom tellen we uitsluitend wat op dit moment zichtbaar is.
    const zichtbaar = [...document.querySelectorAll('.product-item')].filter(
      (el) => el.offsetParent !== null && el.getClientRects().length > 0,
    );
    return zichtbaar.map((el) => ({
      naam: schoon(el.querySelector('[data-cy="productItemName"], .product-name, .name')?.textContent),
      omschrijving: schoon(el.querySelector('[data-cy="productItemDescription"], .product-description, .description')?.textContent),
      prijs: schoon(el.querySelector('[data-cy="productItemPrice"], .price')?.textContent).replace(/[^\d.,]/g, ''),
      cyclus: schoon(el.querySelector('[data-cy="productItemPriceCycle"], .cycle')?.textContent),
      link: el.querySelector('a[href*="product"]')?.href || null,
      beeld: el.querySelector('img')?.src || null,
    })).filter((p) => p.naam || p.prijs);
  });

  alles.push({ categorie: naam, producten });
  console.log(`${naam}: ${producten.length} regels met een prijs`);
}

await browser.close();
writeFileSync(new URL('../data/webshop-ruw.json', import.meta.url), JSON.stringify(alles, null, 2));
console.log('bewaard in data/webshop-ruw.json');
