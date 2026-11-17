---
description: SEO TuneInCloud avec le plugin claude-seo (audit complet, page, schema, geo, drift...) filtré par le profil du site, rapport dans editorial/seo/, corrections seo: après OK de Daniel.
argument-hint: [audit | hebdo | mensuel | appliquer <issue> <n,n> | page <id> | technical | schema | geo | content <id> | drift | plan] (vide = audit)
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

## 5. Routines automatiques

Ces sous-commandes sont lancées par les tâches planifiées locales (voir
`.claude/seo-profile.md`, section « Automatisation »). Elles **ne commitent
rien** et **ne modifient aucun article** : elles mesurent, écrivent un rapport
et ouvrent une issue GitHub dont chaque correction est numérotée. Daniel
répond dans Claude Code par `/tic-seo appliquer <n° d'issue> <numéros>`.

Le lanceur est
`L="C:/Users/Dany/.claude/plugins/cache/agricidaniel-claude-seo/claude-seo/2.6.2/scripts/claude-seo"`.
DataForSEO n'est pas branché : n'appelle aucun outil `mcp__dataforseo__*`.

### `hebdo` (chaque lundi, après la veille)

Sortie : `editorial/seo/YYYY-MM-DD-hebdo/RAPPORT.md`. Coût faible : scripts,
sans agent du plugin, sauf `seo-google` si Search Console est configurée.

1. **Contrôle déterministe** : `node scripts/seo-check.mjs --published` (alertes
   bloquantes en tête, puis articles orphelins).
2. **Drift** : `drift_compare.py <url> --skip-cwv` sur chaque URL du sitemap
   (`https://tuneincloud.fr/sitemap-0.xml`). Toute règle déclenchée est un
   constat. Un changement attendu (publication de la semaine, lien entrant
   ajouté) est noté comme tel, puis `drift_baseline.py` sur cette URL.
3. **Fraîcheur** : à partir du frontmatter de `src/content/blog/`,
   `updatedDate` sinon `pubDate` :
   - guides de plus de 3 mois et dossiers de plus de 6 mois ;
   - échéance passée dans le `title` ou la `description` (signalée par
     `seo-check`) ;
   - mentions « Preview », « à venir », « GA attendue » dans un article de plus
     de 2 mois : à vérifier sur Microsoft Learn.
   Chaque article concerné devient une proposition « rafraîchir avec
   `/tic-relire` » (fond, à valider par Daniel).
4. **Suivi J+7 et J+30** : pour chaque ligne de `editorial/seo/suivi.md`
   arrivée à échéance et non cochée :
   - si `"$L" run google_auth.py --check` réussit : lance l'agent
     `claude-seo:seo-google` sur l'URL (inspection d'indexation, requêtes,
     impressions, clics, CTR, position sur 28 jours). J+7 : un CTR inférieur à
     2 % avec plus de 100 impressions donne une proposition de `title` et de
     `description`. J+30 : position sur le mot-clé principal, décision
     « laisser », « enrichir » ou « relier davantage » ;
   - sinon : présence dans le sitemap, drift, et la mention « mesure
     impossible sans Search Console ».
   Coche la colonne, renseigne la décision, et mets à jour les colonnes
   Position et Clics de `editorial/seo/mots-cles.md` quand la donnée existe.
5. **Issue** `SEO hebdo : semaine du YYYY-MM-DD` (label `seo` si possible) :
   synthèse en cinq lignes, puis les corrections proposées numérotées, chacune
   avec son scope (`frontmatter`, `linking`, `freshness`...), le fichier, le
   diff court et la mention « technique » ou « fond, à valider ». Termine par :
   « Pour appliquer : `/tic-seo appliquer <n° d'issue> 1,3,4` ». Sans
   connecteur GitHub, le rapport suffit et le compte rendu le dit.
6. Commit du seul rapport `editorial/seo/YYYY-MM-DD-hebdo/` et des fichiers de
   suivi (`suivi.md`, `mots-cles.md`), message
   `seo: suivi — semaine du YYYY-MM-DD`. C'est le seul commit autorisé à une
   routine : il ne touche ni au site ni aux articles.

### `mensuel` (premier lundi du mois)

Exécute la section 2 avec la commande `audit` complète (mêmes agents que
l'audit du 2026-11-15, sortie `editorial/seo/YYYY-MM-DD-audit/`), puis :

- compare le score et chaque catégorie au dernier audit de l'historique de
  `.claude/seo-profile.md`, et explique les écarts ;
- relance `claude-seo:seo-cluster` sur les quatre piliers avec
  `editorial/seo/mots-cles.md` : trous de cluster, cannibalisations, matrice de
  liens mise à jour ;
- les trous de cluster deviennent des lignes `à créer` dans la carte et des
  sujets proposés à `tic-veille` (section « Sujets SEO » de l'issue).

Même issue numérotée que `hebdo`, titre `SEO mensuel : <mois>`. Même règle de
commit (rapport et carte uniquement).

### `appliquer <issue> <numéros>`

Lis l'issue (connecteur GitHub, `issue_read`), garde les corrections dont le
numéro est cité, et applique la section 4 : un commit par scope, build, push,
contrôle en ligne, `drift_baseline.py` sur les URLs modifiées, IndexNow sur
ces URLs (voir `.claude/agents/tic-publieur.md`, section 5 bis). Une correction
marquée « fond » passe d'abord par `tic-redac-chef` en mode article publié
(branche `editorial/` et PR), jamais en commit direct. Commente l'issue avec
les commits et ferme-la si tout est appliqué.

## Interdits
- Committer ou pousser sans OK explicite dans le chat (hors commit de suivi
  des routines, section 5).
- Modifier un brouillon de `src/content/draft/` ou le contenu rédactionnel
  d'un article sans validation.
- Activer une extension payante (DataForSEO, Ahrefs, SE Ranking, Profound)
  sans accord de Daniel.
