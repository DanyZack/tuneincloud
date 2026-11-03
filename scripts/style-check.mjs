#!/usr/bin/env node
// Contrôle de style TuneInCloud (charte : .claude/skills/tuneincloud-article/references/charte-style.md)
// Usage : node scripts/style-check.mjs <fichier.md> [...]
//         node scripts/style-check.mjs --sync-charte   (recopie la charte de référence dans les autres skills)
// Code de sortie 1 si une alerte bloquante est trouvée.

import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';

const SKILLS = ['tuneincloud-short', 'tuneincloud-dossier', 'tuneincloud-guide', 'tuneincloud-redacteur-en-chef'];
const REF = '.claude/skills/tuneincloud-article/references/charte-style.md';

if (process.argv[2] === '--sync-charte') {
  const src = readFileSync(REF, 'utf8');
  for (const s of SKILLS) {
    const dest = join('.claude/skills', s, 'references', 'charte-style.md');
    mkdirSync(dirname(dest), { recursive: true });
    writeFileSync(dest, src);
    console.log(`copié : ${dest}`);
  }
  process.exit(0);
}

// [motif, message, bloquant]
const IDEES_RECUES = [
  [/\bdans un contexte (de|où)\b/i, 'ouverture creuse'],
  [/\bà l'heure où\b/i, 'ouverture creuse'],
  [/\bdans un monde où\b/i, 'ouverture creuse'],
  [/\bplus que jamais\b/i, 'ouverture creuse'],
  [/\bil est (important|essentiel|crucial|primordial|capital) de\b/i, 'formule creuse'],
  [/\bil convient de\b/i, 'formule creuse'],
  [/\bforce est de constater\b/i, 'formule creuse'],
  [/\ble vrai (sujet|problème|enjeu)\b/i, 'tic de mise en scène'],
  [/\bet c'est (là|précisément) (que|où)\b/i, 'tic de mise en scène'],
  [/\bc'est précisément\b/i, 'tic de mise en scène'],
  [/\b(concrètement|en clair|bonne nouvelle|mauvaise nouvelle|spoiler)\s*:/i, 'tic de mise en scène'],
  [/\bmais attention\b/i, 'tic de mise en scène'],
  [/\bvous l'aurez compris\b/i, 'tic de mise en scène'],
  [/\bautrement dit\b/i, 'tic de mise en scène'],
  [/(^|[.!?]\s+)bref\b/im, 'tic de mise en scène'],
  [/\bne rien faire,? c'est\b/i, 'tic de mise en scène'],
  [/\bplus qu'un\b[^.]{0,40},\s*(un|une)\b/i, 'tic « plus qu’un X, un Y »'],
  [/\b(véritable|véritables)\b/i, 'vocabulaire de plaquette'],
  [/\b(un|une) (gain|avancée|amélioration|progrès|changement) réel(le)?\b/i, 'vocabulaire de plaquette'],
  [/\benjeux? majeurs?\b/i, 'vocabulaire de plaquette'],
  [/\blevier(s)?\b/i, 'vocabulaire de plaquette'],
  [/\b(booster|fluidifier|incontournable|révolution\w*|game[- ]changer|disrupti\w+)\b/i, 'vocabulaire de plaquette'],
  [/\b(robuste|puissant|puissante)s?\b/i, 'adjectif de plaquette'],
  [/\bnouvelle ère\b|\bpierre angulaire\b|\bau cœur de\b|\bpaysage\b/i, 'vocabulaire de plaquette'],
  [/\b(accompagner|sereinement|en toute sécurité)\b/i, 'vocabulaire de plaquette'],
  [/\b(en conclusion|en résumé|pour conclure|ce qu'il faut retenir|à retenir|en somme|au final|une chose est sûre|l'avenir nous le dira|affaire à suivre)\b/i, 'conclusion creuse'],
  [/\b(intéressant|intéressante|significatif|significative)s?\b/i, 'adjectif d’appréciation : remplacer par le fait'],
  [/\b(nous|notre|nos)\b/i, '« nous » interdit pour parler de TuneInCloud', true],
];

const VERBES_FAIBLES = /\b(permet(tent|tra|trait)?|permettre|offr(e|ent|ir)|propos(e|ent|er)|vient de|viennent de|s'inscri(t|vent|re) dans|jou(e|ent|er) un rôle|mettre en place|met en place|faire évoluer)\b/gi;
const EMOJI = /\p{Extended_Pictographic}/gu;

// Remplace un bloc par autant de lignes vides, pour garder les numéros de ligne.
const blank = (m) => '\n'.repeat((m.match(/\n/g) || []).length);

function stripMarkdown(md) {
  return md
    .replace(/^---[\s\S]*?\n---\n/, blank)
    .replace(/```[\s\S]*?```/g, blank)
    .replace(/^[ \t]*!\[.*$/gm, '')
    .replace(/^[ \t]*\|.*$/gm, '')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/`[^`]*`/g, 'X');
}

function sectionSource(md) {
  const i = md.search(/^##\s+Sources?\b/m);
  return i === -1 ? md : md.slice(0, i);
}

function check(file) {
  const raw = readFileSync(file, 'utf8');
  const body = sectionSource(stripMarkdown(raw));
  const lines = body.split('\n');
  const alerts = [];
  const add = (n, msg, block = false) => alerts.push({ n, msg, block });

  lines.forEach((l, i) => {
    const n = i + 1;
    if (/^#/.test(l)) {
      if (/\?\s*$/.test(l)) add(n, 'intertitre en question rhétorique');
      if (/^#+\s+[^,]+,[^,]+,[^,]+$/.test(l)) add(n, 'intertitre ternaire');
    }
    if (l.includes(';')) add(n, 'point-virgule (interdit)', true);
    if (/\S\s—\s\S/.test(l)) add(n, 'tiret cadratin en milieu de phrase (interdit)', true);
    if (/MC\d{6,}/.test(l)) add(n, 'numéro de Message Center dans le corps (à mettre en Source)', true);
    for (const [re, msg, block] of IDEES_RECUES) if (re.test(l)) add(n, `${msg} : « ${l.match(re)[0].trim()} »`, !!block);
    const bolds = (l.match(/\*\*[^*]+\*\*/g) || []).length;
    if (bolds >= 3) add(n, `${bolds} passages en gras dans le paragraphe (max 2)`);
    const colons = (l.replace(/https?:\/\/\S+/g, '').match(/\s:\s/g) || []).length;
    if (colons >= 2) add(n, `${colons} deux-points dans le paragraphe (max 1)`);
    const em = l.match(EMOJI) || [];
    if (em.some((e) => e !== '⚠')) add(n, `émoji dans le corps : ${em.join(' ')}`);
  });

  const warn = (body.match(/⚠/g) || []).length;
  if (warn > 1) add(0, `${warn} ⚠️ dans l'article (max 1)`);

  const faibles = body.match(VERBES_FAIBLES) || [];
  const mots = body.split(/\s+/).filter(Boolean).length;
  if (faibles.length > Math.max(2, mots / 250)) add(0, `${faibles.length} verbes faibles (${[...new Set(faibles.map((f) => f.toLowerCase()))].join(', ')}) pour ${mots} mots`);

  const puces = lines.filter((l) => /^\s*[-*]\s/.test(l)).length;
  const paras = body.split(/\n\s*\n/).filter((p) => p.trim() && !/^#/.test(p.trim())).length;
  if (paras && puces / (paras + puces) > 0.4) add(0, `${puces} puces pour ${paras} blocs : texte trop listé, réécrire en prose`);

  // Rythme : trois phrases consécutives de longueur proche (±20 %)
  const prose = lines.filter((l) => l.trim() && !/^#|^\s*[-*]\s|^>/.test(l)).join(' ');
  const phrases = prose.split(/(?<=[.!?])\s+(?=[A-ZÀ-Ý«])/).map((p) => p.split(/\s+/).length).filter((x) => x > 3);
  let mono = 0;
  for (let i = 2; i < phrases.length; i++) {
    const [a, b, c] = phrases.slice(i - 2, i + 1);
    const m = (a + b + c) / 3;
    if ([a, b, c].every((x) => Math.abs(x - m) / m < 0.2)) mono++;
  }
  if (mono >= 3) add(0, `rythme monotone : ${mono} suites de trois phrases de longueur voisine`);
  if (phrases.length) {
    const moy = phrases.reduce((s, x) => s + x, 0) / phrases.length;
    const courtes = phrases.filter((x) => x <= 8).length;
    if (!courtes && phrases.length > 8) add(0, `aucune phrase courte (≤ 8 mots) sur ${phrases.length} : il manque la phrase qui tranche`);
    console.log(`  ${phrases.length} phrases, ${mots} mots, longueur moyenne ${moy.toFixed(1)} mots, ${courtes} phrases courtes`);
  }

  const je = (body.match(/\b(je|j'|mon|ma|mes)\b/gi) || []).length;
  if (!je) add(0, 'aucun « je » : la recommandation de Daniel n’est pas incarnée');

  return alerts;
}

const files = process.argv.slice(2);
if (!files.length) {
  console.error('Usage : node scripts/style-check.mjs <fichier.md> [...] | --sync-charte');
  process.exit(2);
}
let blocking = false;
for (const f of files) {
  console.log(`\n${f}`);
  const a = check(f);
  if (!a.length) console.log('  aucune alerte');
  for (const { n, msg, block } of a) {
    console.log(`  ${block ? 'BLOQUANT' : 'alerte  '} ${n ? `l.${n}` : 'global'} : ${msg}`);
    if (block) blocking = true;
  }
}
process.exit(blocking ? 1 : 0);
