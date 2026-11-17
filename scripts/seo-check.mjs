#!/usr/bin/env node
// Contrôle SEO déterministe TuneInCloud (complète style-check.mjs).
//
// Usage :
//   node scripts/seo-check.mjs <fichier.md> [...] [--stage draft|final] [--keyword "mot-clé"]
//   node scripts/seo-check.mjs --published        (tous les articles de src/content/blog, mode CI / hebdo)
//   ajouter --json pour une sortie machine (pipeline, issue GitHub)
//
// Étapes :
//   draft  : brouillon avant illustration (heroImage vide tolérée, images non vérifiées)
//   final  : brouillon illustré ou article à publier (hero local .webp obligatoire)
//   published : articles en ligne (hero externe toléré sur l'existant, cf. CLAUDE.md)
//
// Code de sortie 1 si une alerte bloquante est trouvée.

import { readFileSync, readdirSync, existsSync, statSync } from 'node:fs';
import { basename, join } from 'node:path';

const BLOG = 'src/content/blog';
const PUBLIC = 'public';
const CATEGORIES = ['actualites', 'guides', 'dossiers'];
const SUBCATEGORIES = ['breves', 'articles', 'entra', 'intune', 'defender', 'purview', 'ia', 'autre'];
const RANGES = {
  breves: [250, 500],
  articles: [800, 1500],
  dossiers: [1500, 4000],
  guides: [800, 2500],
};
const MOIS = 'janvier|février|mars|avril|mai|juin|juillet|août|septembre|octobre|novembre|décembre';

const args = process.argv.slice(2);
const opt = (name) => {
  const i = args.indexOf(name);
  return i === -1 ? undefined : args.splice(i, 2)[1];
};
const flag = (name) => {
  const i = args.indexOf(name);
  if (i === -1) return false;
  args.splice(i, 1);
  return true;
};
const json = flag('--json');
const published = flag('--published');
const stage = published ? 'published' : opt('--stage') ?? 'draft';
const keyword = opt('--keyword');

const publishedIds = new Set(
  readdirSync(BLOG)
    .filter((f) => /\.mdx?$/.test(f))
    .map((f) => f.replace(/\.mdx?$/, '').toLowerCase()),
);

function frontmatter(raw) {
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  const fm = {};
  if (!m) return { fm, body: raw };
  for (const line of m[1].split(/\r?\n/)) {
    const kv = line.match(/^(\w+):\s*(.*?)\s*(#.*)?$/);
    if (kv) fm[kv[1]] = kv[2].replace(/^["']|["']$/g, '');
  }
  return { fm, body: raw.slice(m[0].length) };
}

const today = new Date(new Date().toISOString().slice(0, 10));

function pastDeadline(text) {
  // « avant le 3 novembre », « d'ici le 30 septembre 2026 », « jusqu'au 1er mai »
  const re = new RegExp(`\\b(avant le|d'ici (le|au)|jusqu'au|au plus tard le|à partir du)\\s+(\\d{1,2})(er)?\\s+(${MOIS})(\\s+(\\d{4}))?`, 'gi');
  const hits = [];
  for (const m of text.matchAll(re)) {
    const mois = MOIS.split('|').indexOf(m[5].toLowerCase());
    const annee = m[7] ? Number(m[7]) : today.getFullYear();
    const d = new Date(Date.UTC(annee, mois, Number(m[3])));
    if (d < today) hits.push(m[0]);
  }
  return hits;
}

function check(file) {
  const raw = readFileSync(file, 'utf8');
  const { fm, body } = frontmatter(raw);
  const alerts = [];
  const add = (msg, block = false) => alerts.push({ msg, block });
  const id = basename(file).replace(/\.mdx?$/, '').toLowerCase();

  // Frontmatter
  for (const k of ['title', 'description', 'pubDate', 'category']) if (!fm[k]) add(`frontmatter : ${k} absent`, true);
  if (fm.category && !CATEGORIES.includes(fm.category)) add(`category « ${fm.category} » hors schéma Zod`, true);
  if (fm.subcategory && !SUBCATEGORIES.includes(fm.subcategory)) add(`subcategory « ${fm.subcategory} » hors schéma Zod`, true);
  if (!fm.subcategory && stage !== 'published') add('subcategory absente : la page catégorie ne listera pas l’article');

  const t = fm.title ?? '';
  const d = fm.description ?? '';
  if (t && (t.length < 50 || t.length > 65)) add(`title ${t.length} caractères (cible 55-60)`);
  if (d && (d.length < 140 || d.length > 160)) add(`description ${d.length} caractères (cible 140-160)`);
  if (/\S\s—\s\S/.test(t + d)) add('tiret cadratin dans le title ou la description', stage !== 'published');
  for (const hit of pastDeadline(t)) add(`échéance passée dans le title : « ${hit} »`, stage !== 'published');
  for (const hit of pastDeadline(d)) add(`échéance passée dans la description : « ${hit} »`);
  if (/\b(prochainement|bientôt|à venir|arrive bientôt)\b/i.test(d) && stage === 'published')
    add('description annonce un contenu « à venir » : vérifier qu’il n’est pas déjà publié');

  // Hero
  const hero = fm.heroImage ?? '';
  if (!hero) {
    if (stage !== 'draft') add('heroImage vide', stage === 'final');
  } else if (/^https?:\/\//.test(hero)) {
    add(`heroImage externe (${new URL(hero).hostname}) : interdite sur le neuf`, stage === 'final');
  } else {
    const p = join(PUBLIC, hero);
    if (!existsSync(p)) add(`heroImage introuvable : ${hero}`, stage !== 'draft');
    else {
      const ko = statSync(p).size / 1024;
      if (ko > 200) add(`heroImage ${Math.round(ko)} Ko (max 200)`, stage === 'final');
      if (!/\.webp$/i.test(hero)) add('heroImage pas en WebP');
    }
  }

  // Corps : on ignore les blocs de code
  const text = body.replace(/```[\s\S]*?```/g, '');

  // Images du corps
  for (const m of text.matchAll(/!\[([^\]]*)\]\(([^)\s]+)[^)]*\)/g)) {
    const [, alt, src] = m;
    if (/^\/images\//.test(src) && stage !== 'draft' && !existsSync(join(PUBLIC, src))) add(`image introuvable : ${src}`, true);
    if (/^https?:\/\//.test(src) && stage === 'final') add(`image externe dans le corps : ${src}`);
    if (/banarticle\//.test(src)) continue; // bannière décorative, alt conventionnel
    if (!alt.trim()) add(`image sans alt : ${src}`);
    else if (/^(schema|schéma|image|img|capture)\s*\d*$/i.test(alt.trim())) add(`alt générique « ${alt} » : décrire ce que montre l’image (${src})`);
  }

  // Liens internes et sortants
  const links = [...text.matchAll(/\]\(([^)\s]+)[^)]*\)/g)].map((m) => m[1]);
  const internal = links.filter((l) => /^\/blog\/[^/]+\/?(#.*)?$/.test(l) && !/^\/blog\/category\//.test(l));
  for (const l of internal) {
    const target = l.replace(/^\/blog\//, '').replace(/\/?(#.*)?$/, '').toLowerCase();
    if (!publishedIds.has(target)) add(`lien interne cassé : ${l}`, true);
    if (target === id) add(`lien vers soi-même : ${l}`);
  }
  for (const l of links.filter((l) => /tuneincloud\.(com|fr)\/20\d\d\//.test(l))) add(`lien vers une ancienne URL WordPress : ${l}`, true);
  for (const l of links.filter((l) => /^https?:\/\/(www\.)?tuneincloud\.fr\/blog\//.test(l))) add(`lien interne en absolu (préférer /blog/...) : ${l}`);
  const nInternal = new Set(internal.map((l) => l.toLowerCase())).size;
  if (nInternal === 0) add('aucun lien interne', stage !== 'published');
  else if (nInternal < 3) add(`${nInternal} lien(s) interne(s) (cible 3)`);

  const hasSources = /^##\s+Sources?\b/m.test(text);
  if (!hasSources) add('pas de section « Sources »', stage !== 'published');
  if (!links.some((l) => /learn\.microsoft\.com|techcommunity\.microsoft\.com|microsoft\.com\//.test(l)))
    add('aucune source Microsoft (Learn, Tech Community, blog officiel)');

  // Structure
  const h2 = [...text.matchAll(/^##\s+(.+)$/gm)].map((m) => m[1].trim());
  if (/^#\s/m.test(text)) add('H1 dans le corps : le titre est déjà le H1 de la page');
  if ((fm.category === 'dossiers' || fm.category === 'guides') && h2.filter((h) => !/^Sources?\b/.test(h)).length < 3)
    add('moins de 3 H2 pour un dossier ou un guide');

  const prose = text
    .replace(/^\s*!\[.*$/gm, '')
    .replace(/^\s*>.*$/gm, '')
    .replace(/^\s*\|.*$/gm, '')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1');
  const words = prose.split(/\s+/).filter((w) => /\p{L}/u.test(w));
  const range = RANGES[fm.subcategory === 'breves' || fm.subcategory === 'articles' ? fm.subcategory : fm.category];
  if (range && stage !== 'published' && (words.length < range[0] || words.length > range[1]))
    add(`${words.length} mots (fourchette ${range[0]}-${range[1]})`);

  // Réponse directe : le premier paragraphe de prose doit tenir en 100 mots
  const firstPara = prose.split(/\r?\n\s*\r?\n/).map((p) => p.trim()).find((p) => p && !/^#/.test(p)) ?? '';
  const firstWords = firstPara.split(/\s+/).filter(Boolean).length;
  if (firstWords > 110) add(`premier paragraphe de ${firstWords} mots : la réponse directe doit tenir dans les 100 premiers mots`);

  // Tableau (fortement cité par les moteurs IA) dans les formats longs
  if ((fm.category === 'dossiers' || fm.category === 'guides') && !/^\s*\|.*\|\s*$/m.test(text)) add('aucun tableau dans un format long');

  // Mot-clé principal (fourni par le brief SEO)
  if (keyword) {
    const k = keyword.toLowerCase();
    const first100 = words.slice(0, 100).join(' ').toLowerCase();
    if (!t.toLowerCase().includes(k)) add(`mot-clé « ${keyword} » absent du title`);
    if (!d.toLowerCase().includes(k)) add(`mot-clé « ${keyword} » absent de la description`);
    if (!first100.includes(k)) add(`mot-clé « ${keyword} » absent des 100 premiers mots`);
    if (!h2.some((h) => h.toLowerCase().includes(k))) add(`mot-clé « ${keyword} » absent des H2`);
  }

  return { file, id, stage, title: t, words: words.length, internalLinks: nInternal, alerts };
}

// Liens entrants : quels articles publiés pointent vers chaque article
function inboundCounts() {
  const counts = Object.fromEntries([...publishedIds].map((i) => [i, 0]));
  for (const f of readdirSync(BLOG).filter((f) => /\.mdx?$/.test(f))) {
    const src = f.replace(/\.mdx?$/, '').toLowerCase();
    const raw = readFileSync(join(BLOG, f), 'utf8');
    const targets = new Set([...raw.matchAll(/\]\(\/blog\/([^/)#]+)/g)].map((m) => m[1].toLowerCase()));
    for (const t of targets) if (t !== src && t in counts && t !== 'category') counts[t]++;
  }
  return counts;
}

let files = args;
if (published) files = readdirSync(BLOG).filter((f) => /\.mdx?$/.test(f)).map((f) => join(BLOG, f));
if (!files.length) {
  console.error('Usage : node scripts/seo-check.mjs <fichier.md> [...] [--stage draft|final] [--keyword "..."] [--json] | --published');
  process.exit(2);
}

const results = files.map(check);
if (published) {
  const inbound = inboundCounts();
  for (const r of results) {
    r.inboundLinks = inbound[r.id] ?? 0;
    if (!r.inboundLinks) r.alerts.push({ msg: 'article orphelin : aucun autre article ne pointe vers lui', block: false });
  }
}
const blocking = results.some((r) => r.alerts.some((a) => a.block));

if (json) {
  console.log(JSON.stringify({ stage, blocking, results }, null, 2));
} else {
  for (const r of results) {
    const extra = r.inboundLinks !== undefined ? `, ${r.inboundLinks} lien(s) entrant(s)` : '';
    console.log(`\n${r.file}  [${r.stage}] ${r.words} mots, ${r.internalLinks} lien(s) interne(s)${extra}`);
    if (!r.alerts.length) console.log('  aucune alerte');
    for (const a of r.alerts) console.log(`  ${a.block ? 'BLOQUANT' : 'alerte  '} : ${a.msg}`);
  }
  const nb = results.reduce((s, r) => s + r.alerts.filter((a) => a.block).length, 0);
  const na = results.reduce((s, r) => s + r.alerts.length, 0);
  console.log(`\n${results.length} fichier(s), ${na} alerte(s) dont ${nb} bloquante(s).`);
}
process.exit(blocking ? 1 : 0);
