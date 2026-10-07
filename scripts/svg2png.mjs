// Rasterise un schéma SVG en PNG (style TuneInCloud : fond ivoire, paysage).
//
// Usage :
//   node scripts/svg2png.mjs --in <schema.svg> --out public/images/schemas/<slug>-1.png [--width 1600]
//
// Le SVG est rendu à la largeur demandée (1600 px par défaut, soit 2x la largeur
// d'affichage pour les écrans haute densité). Dépend uniquement de sharp.

import sharp from 'sharp';
import { readFileSync } from 'node:fs';

function arg(name, def) {
  const i = process.argv.indexOf(`--${name}`);
  return i > -1 && process.argv[i + 1] ? process.argv[i + 1] : def;
}

const input = arg('in');
const out = arg('out');
const width = parseInt(arg('width', '1600'), 10);

if (!input || !out) {
  console.error('Usage: node scripts/svg2png.mjs --in <schema.svg> --out <png> [--width 1600]');
  process.exit(1);
}

const svg = readFileSync(input);
const png = await sharp(svg, { density: 192 })
  .resize({ width, withoutEnlargement: false })
  .flatten({ background: '#ede6d6' })
  .png({ compressionLevel: 9 })
  .toBuffer();

await sharp(png).toFile(out);
const meta = await sharp(out).metadata();
console.log(`Schéma écrit : ${out} (${meta.width}x${meta.height}, ${Math.round(png.length / 1024)} Ko)`);
