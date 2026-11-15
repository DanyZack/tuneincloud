---
description: SEO TuneInCloud avec le plugin claude-seo (audit complet, page, schema, geo, drift...) filtré par le profil du site, rapport dans editorial/seo/, corrections seo: après OK de Daniel.
argument-hint: [audit | page <id> | technical | schema | geo | content <id> | drift | plan] (vide = audit)
---

Tu joues le rôle `tic-seo` du `CLAUDE.md` : seul rôle autorisé à créer des
commits `seo: ...`.

Demande : $ARGUMENTS (vide = `audit`)

## 1. Contexte (obligatoire, avant toute analyse)

1. Charge le skill `seo-site-profile` (outil Skill) et applique sa procédure.
2. Lis `.claude/seo-profile.md`, puis les fichiers de `source_files`.
3. Charge le skill `tuneincloud-seo` : ses règles éditoriales (E-E-A-T, GEO,
   maillage, conventions de commit) complètent claude-seo. Ignore ses passages
   sur le MCP GitHub et sa Partie 0 (le `CLAUDE.md` prime).
4. Vérifie que le plugin est installé (skill `claude-seo:seo` disponible).
   Sinon, arrête-toi et donne à Daniel les commandes d'installation
   (`/plugin marketplace add AgriciDaniel/claude-seo` puis
   `/plugin install claude-seo@agricidaniel-claude-seo` puis `/seo setup`).

## 2. Analyse avec claude-seo

- Lance la sous-commande correspondante du plugin (skill `claude-seo:seo`,
  ou le sous-skill dédié : `claude-seo:seo-audit`, `seo-page`, `seo-technical`,
  `seo-schema`, `seo-geo`, `seo-content`, `seo-drift`, `seo-plan`), en suivant
  sa logique d'orchestration et ses agents **sans la modifier**.
- URL : `audit_url` du profil. Pour `page <id>` : `<audit_url>/blog/<id>/`.
- Type de site : `publisher`. Ignore les modules hors périmètre du profil.
- Sorties : `editorial/seo/YYYY-MM-DD-<commande>/` (date du jour).

## 3. Rapport TuneInCloud

Dans le même dossier, écris `SYNTHESE.md` en français :
- score claude-seo et rappel de l'URL auditée ;
- constats retenus, classés Critique > Haute > Moyenne > Basse, chacun avec le
  fichier du dépôt concerné et le correctif proposé (diff court) ;
- constats écartés et pourquoi (écart préprod, conflit avec le schéma Zod, le
  style ou le `CLAUDE.md`, hors périmètre) ;
- corrections qui touchent au fond ou à la structure d'un article : à valider
  par Daniel, jamais appliquées d'office.

Ajoute une ligne à « Historique des audits » de `.claude/seo-profile.md`.

## 4. Corrections (uniquement après OK explicite de Daniel dans le chat)

- Applique les corrections validées, puis `npm run build` (doit passer).
- Un commit par scope : `seo: <scope> — <résumé>` (scopes : `frontmatter`,
  `head`, `schema`, `sitemap`, `robots`, `llms`, `config`, `freshness`,
  `linking`), `git add` fichier par fichier, message terminé par
  `Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>`.
- Le dossier du rapport est commité avec le premier commit (`seo: audit — ...`
  s'il n'y a aucune correction).
- `git push origin master`, puis contrôle sur `audit_url` du profil.
- Après un premier audit complet validé : propose `/seo drift baseline`.

## Interdits
- Committer ou pousser sans OK explicite dans le chat.
- Modifier un brouillon de `src/content/draft/` ou le contenu rédactionnel
  d'un article sans validation.
- Activer une extension payante (DataForSEO, Ahrefs, SE Ranking, Profound)
  sans accord de Daniel.
