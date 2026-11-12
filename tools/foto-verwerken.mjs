// Zet de aangeleverde foto's om naar webp op webmaat. De originelen zijn tot
// 5568px breed en samen 32MB; ongeoptimaliseerd zou de site trager zijn dan
// de WordPress-site die we vervangen.
//
// De namen beschrijven wat er ECHT op de foto staat. Dat klinkt vanzelf-
// sprekend, maar bij de eerste ronde stond 'groep-buiten' op een foto van
// roeimachines binnen, en die kwam zo op de kaart 'Buiten trainen' terecht.
import sharp from 'sharp';
import { mkdirSync, readdirSync } from 'node:fs';

const BRON = process.argv[2];
const DOEL = new URL('../public/foto/', import.meta.url).pathname.replace(/^\/([A-Za-z]):/, '$1:');
mkdirSync(DOEL, { recursive: true });

const KEUZE = [
  // buiten, met mensen erop
  ['Representatie afbeelding 4.JPG', 'groep-gras', 2000, 1125],
  ['fots linkdin.jpg', 'groep-plein', 1600, 1000],
  ['Representatie Afbeelding1.jpg', 'duo-buiten', 1400, 1000],
  ['20210510_074310.jpg', 'squat-buiten', 1600, 1000],
  ['20210530_093156 (2).jpg', 'barbell-water', 1200, 1200],
  // de sportwagen zelf
  ['20210512_072243.jpg', 'wagen-water', 1600, 1000],
  ['20220603_091238 (2).jpg', 'wagen-gras', 1200, 1200],
  ['Sayan met sportwagen.jpg', 'sayan-bij-wagen', 1400, 1000],
  ['WhatsApp Image 2022-05-30 at 9.11.04 PM.jpeg', 'wagen-brandweer', 1600, 1000],
  // binnen in de studio
  ['3e.jpg', 'roeien-binnen', 1600, 1000],
  ['20191201_153755.jpg', 'studio-raam', 1600, 1000],
  ['20211124_093834.jpg', 'kracht-binnen', 1000, 1250],
  ['20230410_093450.jpg', 'trx-binnen', 1000, 1250],
  // portretten
  // Wie op welke foto staat, is bevestigd: de man met de pet is
  // Dennis, niet Sayan. Eerder stonden ze bij elkaars naam.
  ['20221111_073901.jpg', 'sayan-portret', 800, 1000],
  ['20221111_073818.jpg', 'dennis-portret', 800, 1000],
];

const aanwezig = new Set(readdirSync(BRON));
for (const [bron, naam, b, h] of KEUZE) {
  if (!aanwezig.has(bron)) { console.error(`ONTBREEKT: ${bron}`); continue; }
  try {
    const info = await sharp(`${BRON}/${bron}`)
      .rotate() // eerbiedigt de EXIF-draaiing van de telefoonfoto's
      .resize(b, h, { fit: 'cover', position: 'attention' })
      .webp({ quality: 78 })
      .toFile(`${DOEL}${naam}.webp`);
    console.log(`${naam}.webp ${info.width}x${info.height} ${(info.size / 1024) | 0}kB`);
  } catch (e) {
    console.error(`fout bij ${bron}: ${e.message}`);
  }
}
