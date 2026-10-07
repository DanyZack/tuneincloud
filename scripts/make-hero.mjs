// Convertit une image source (JPG/PNG) en hero image TuneInCloud : WebP 1200x630.
//
// Usage :
//   node scripts/make-hero.mjs --in <image> --out public/images/hero/<slug>.webp [--position attention|center|top|bottom] [--quality 82]

import sharp from 'sharp';
import { statSync } from 'node:fs';

function arg(name, def) {
  const i = process.argv.indexOf(`--${name}`);
  return i > -1 && process.argv[i + 1] ? process.argv[i + 1] : def;
}

const input = arg('in');
const out = arg('out');
const position = arg('position', 'attention');
const quality = parseInt(arg('quality', '82'), 10);

if (!input || !out) {
  console.error('Usage: node scripts/make-hero.mjs --in <image> --out <webp> [--position attention] [--quality 82]');
  process.exit(1);
}

await sharp(input).resize(1200, 630, { fit: 'cover', position }).webp({ quality }).toFile(out);
const meta = await sharp(out).metadata();
const kb = Math.round(statSync(out).size / 1024);
console.log(`Hero écrite : ${out} (${meta.width}x${meta.height}, ${kb} Ko)`);
if (kb > 200) console.warn('Attention : plus de 200 Ko, baisser --quality.');
