// Génère une bannière d'article TuneInCloud (748x172) :
// fond photo + calque de couleur produit + triangle TuneInCloud avec l'icône du
// produit Microsoft à gauche + marqueur de format à droite.
//
// Usage :
//   node scripts/make-banner.mjs --bg <image> --product <entra|intune|defender|purview|ia|m365|windows|autre>
//        --format <breve|article|dossier|guide> --out public/images/banarticle/<nom>.png
//        [--tint "#1a2b5e"] [--opacity 0.45] [--icon-opacity 0.75] [--position <center|top|bottom|left|right|attention>]
//
// Dépend uniquement de sharp (déjà dans package.json).

import sharp from 'sharp';
import { existsSync } from 'node:fs';
import { resolve } from 'node:path';

const W = 748;
const H = 172;
const ICONS_DIR = 'C:/Users/Dany/OneDrive - Cladéys/Tune in Cloud/Icons';
const LOCAL_ASSETS = resolve('editorial/assets/icons');

// Couleur du calque par produit (palette TuneInCloud, cf. CLAUDE.md)
const TINTS = {
  entra: '#2748c4',
  intune: '#0f4c81',
  defender: '#1a5c3a',
  purview: '#4b2a7a',
  ia: '#8b1a2b',
  m365: '#1a2b5e',
  windows: '#1a2b5e',
  autre: '#1a2b5e',
};

// Icône produit (dans le triangle). Un fichier du même nom dans
// public/images/banarticle/_assets/ est prioritaire sur le dossier OneDrive.
const PRODUCT_ICONS = {
  entra: 'icon-microsoft-entra.png',
  intune: 'Microsoft-intune.svg.png',
  defender: 'defender.png',
  purview: 'purview.png',
  ia: 'Copilot+for+Word+Colorful.webp',
  m365: null,
  windows: null,
  autre: null,
};

// Marqueurs de format (SVG dessinés ici, pas de dépendance fichier)
const FORMAT_MARKERS = {
  breve: `<svg xmlns="http://www.w3.org/2000/svg" width="56" height="80" viewBox="0 0 56 80">
    <polygon points="34,0 6,46 26,46 18,80 50,30 30,30" fill="#c0392b"/>
  </svg>`,
  article: `<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64" fill="none" stroke="#ffffff" stroke-width="4" stroke-linecap="round" stroke-linejoin="round">
    <rect x="8" y="6" width="40" height="52" rx="4"/>
    <line x1="16" y1="18" x2="40" y2="18"/><line x1="16" y1="28" x2="40" y2="28"/><line x1="16" y1="38" x2="30" y2="38"/>
    <path d="M44 50 L58 36 L52 30 L38 44 L37 51 Z" fill="#ffffff" stroke="#ffffff"/>
  </svg>`,
  dossier: `<svg xmlns="http://www.w3.org/2000/svg" width="72" height="60" viewBox="0 0 72 60" fill="#ffffff">
    <path d="M4 8 h20 l6 6 h34 a4 4 0 0 1 4 4 v6 H4 Z"/>
    <path d="M2 28 h66 l-8 28 H2 Z" opacity="0.95"/>
  </svg>`,
  guide: `<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64" fill="none" stroke="#ffffff" stroke-width="4" stroke-linecap="round" stroke-linejoin="round">
    <rect x="8" y="6" width="48" height="52" rx="4"/>
    <polyline points="16,20 21,25 30,15"/><line x1="36" y1="20" x2="48" y2="20"/>
    <polyline points="16,36 21,41 30,31"/><line x1="36" y1="36" x2="48" y2="36"/>
    <line x1="16" y1="50" x2="48" y2="50"/>
  </svg>`,
};

// Triangle TuneInCloud (contour blanc translucide), zone gauche 0..230 px
const TRIANGLE = `<svg xmlns="http://www.w3.org/2000/svg" width="230" height="${H}" viewBox="0 0 230 ${H}">
  <polygon points="115,4 8,168 222,168" fill="none" stroke="#ffffff" stroke-width="13" stroke-linejoin="round" opacity="0.85"/>
</svg>`;

function arg(name, def) {
  const i = process.argv.indexOf(`--${name}`);
  return i > -1 && process.argv[i + 1] ? process.argv[i + 1] : def;
}

function hexToRgb(hex) {
  const h = hex.replace('#', '');
  return { r: parseInt(h.slice(0, 2), 16), g: parseInt(h.slice(2, 4), 16), b: parseInt(h.slice(4, 6), 16) };
}

async function main() {
  const bg = arg('bg');
  const product = arg('product', 'autre');
  const format = arg('format', 'breve');
  const out = arg('out');
  const tint = arg('tint', TINTS[product] ?? TINTS.autre);
  const opacity = parseFloat(arg('opacity', '0.45'));
  const position = arg('position', 'attention');

  if (!bg || !out) {
    console.error('Usage: node scripts/make-banner.mjs --bg <image> --product <p> --format <f> --out <png>');
    process.exit(1);
  }
  if (!FORMAT_MARKERS[format]) throw new Error(`format inconnu : ${format}`);

  const layers = [];

  // 1. Calque de couleur
  const { r, g, b } = hexToRgb(tint);
  const tintLayer = await sharp({
    create: { width: W, height: H, channels: 4, background: { r, g, b, alpha: opacity } },
  }).png().toBuffer();
  layers.push({ input: tintLayer, left: 0, top: 0 });

  // 2. Triangle logo (PNG officiel si présent dans editorial/assets/icons/, sinon SVG)
  const TRI_TOP = 4;
  const TRI_H = H - 2 * TRI_TOP;
  let triangleInput = Buffer.from(TRIANGLE);
  let triW = 230, triLeft = 0, triTop = 0;
  const customTriangle = resolve(LOCAL_ASSETS, 'triangle.png');
  if (existsSync(customTriangle)) {
    triangleInput = await sharp(customTriangle).resize({ height: TRI_H, fit: 'inside' }).png().toBuffer();
    triW = (await sharp(triangleInput).metadata()).width;
    triLeft = 14;
    triTop = TRI_TOP;
  }
  layers.push({ input: triangleInput, left: triLeft, top: triTop });

  // 3. Icône produit : centrée horizontalement sur le triangle, posée dans son
  //    tiers inférieur (centre à 62 % de la hauteur), opacité 75 %.
  const ICON_OPACITY = parseFloat(arg('icon-opacity', '0.75'));
  const iconName = PRODUCT_ICONS[product];
  if (iconName) {
    const local = resolve(LOCAL_ASSETS, iconName);
    const iconPath = existsSync(local) ? local : resolve(ICONS_DIR, iconName);
    if (existsSync(iconPath)) {
      const icon = await sharp(iconPath)
        .resize({ width: 80, height: 80, fit: 'inside' })
        .ensureAlpha()
        .composite([{
          input: Buffer.from([0, 0, 0, Math.round(255 * ICON_OPACITY)]),
          raw: { width: 1, height: 1, channels: 4 },
          tile: true,
          blend: 'dest-in',
        }])
        .png().toBuffer();
      const meta = await sharp(icon).metadata();
      const cx = triLeft + triW / 2;
      const cy = triTop + TRI_H * 0.62;
      layers.push({ input: icon, left: Math.round(cx - meta.width / 2), top: Math.round(cy - meta.height / 2) });
    } else {
      console.warn(`Icône introuvable : ${iconPath} (bannière sans icône produit)`);
    }
  }

  // 4. Marqueur de format à droite
  const marker = await sharp(Buffer.from(FORMAT_MARKERS[format])).png().toBuffer();
  const mm = await sharp(marker).metadata();
  layers.push({ input: marker, left: W - 36 - mm.width, top: Math.round(H / 2 - mm.height / 2) });

  await sharp(bg)
    .resize(W, H, { fit: 'cover', position })
    .composite(layers)
    .png({ compressionLevel: 9 })
    .toFile(out);

  console.log(`Bannière écrite : ${out}`);
}

main().catch((e) => {
  console.error(e.message);
  process.exit(1);
});
