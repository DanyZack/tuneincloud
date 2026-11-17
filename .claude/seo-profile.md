---
# Profil SEO du site, lu par le skill utilisateur seo-site-profile avant toute commande /seo.
site_id: "tuneincloud"
site_name: "TuneInCloud"
canonical_domain: "https://tuneincloud.fr"
audit_url: "https://tuneincloud.fr"   # Netlify ; www.tuneincloud.fr redirige en 301. tuneincloud.com = ancien WordPress (Apache), hors périmètre
site_type: "publisher"
content_language: "fr"
report_language: "fr"
target_countries: ["FR", "BE", "CH", "CA", "LU"]
stack: "Astro 6 + @astrojs/sitemap + MDX, Netlify, déploiement = git push sur master"
reports_dir: "editorial/seo"
editorial_skill: "tuneincloud-seo"
source_files:
  - "CLAUDE.md"
  - "astro.config.mjs"
  - "src/consts.ts"
  - "src/content.config.ts"
  - "src/components/BaseHead.astro"
  - "src/layouts/BlogPost.astro"
  - "public/robots.txt"
  - "public/llms.txt"
commit_policy: "commits `seo: <scope> — <résumé>` uniquement via /tic-seo, après OK explicite de Daniel ; git add fichier par fichier ; npm run build doit passer avant push"
google_search_console: ""   # à renseigner après /seo google setup
---

# Profil SEO : TuneInCloud

## Positionnement
- Blog d'expertise Microsoft en français : Intune, Entra ID, Defender, Purview,
  Microsoft 365, Copilot et agents IA.
- Audience : DSI, RSSI, DPO, architectes IT, admins M365, consultants
  cybersécurité francophones.
- Objectif SEO : autorité thématique sur l'écosystème Microsoft sécurité et
  modern work en français, et **citations par les moteurs IA** (AI Overviews,
  ChatGPT, Perplexity, Copilot). Pas d'objectif de conversion directe.

## Thématiques et mots-clés cibles
| Pilier | Mots-clés principaux | Page pilier actuelle |
|---|---|---|
| Entra ID | groupes dynamiques, passkeys, Entra Agent ID, sauvegarde Entra | `/blog/dossier-2026-04-15-entra-agent-id/` |
| Intune | enrôlement Autopilot/ABM/Android Enterprise, baseline sécurité Windows 11, Intune Suite | à créer (guides `old-*` à consolider) |
| Purview | DSPM, DSPM for AI, protection des données | `/blog/2026-07-08-dossier-dspm/` |
| Defender | Security Copilot, agents de triage phishing | à créer |
| IA / Copilot | Copilot M365, Claude dans M365, agents | à créer |

## Concurrents à surveiller
learn.microsoft.com (référence officielle), it-connect.fr, petri.com,
practical365.com, m365princess.com, call4cloud.nl, oceanleaf.ch,
damienvanrobaeys.be, oofhours.com.

## E-E-A-T
- Auteur unique : Daniel POLÒNIO, fondateur de Cladéys (architecture, conseil,
  cybersécurité). Page `/about`.
- Chaque fait daté est sourcé Microsoft (Learn, Message Center, roadmap) :
  c'est l'atout de citabilité principal, à préserver dans toute recommandation.

## Règles locales qui priment sur claude-seo
- Schéma Zod `src/content.config.ts` : aucune valeur hors enum
  (`subcategory` : `breves`, `articles`, `entra`, `intune`, `defender`,
  `purview`, `ia`, `autre`). Pas de nouveau champ frontmatter sans validation.
- Brouillons dans `src/content/draft/` : hors site, ne pas auditer.
- Liens internes `/blog/<id>/` avec `<id>` en minuscules.
- Style : pas de tiret cadratin en milieu de phrase, zéro jargon marketing,
  vouvoiement, licence et statut GA/Preview toujours indiqués.
- Une recommandation qui change le fond ou la structure d'un article (H2, TL;DR,
  FAQ) se valide avec Daniel avant toute modification.
- Partie 0 du skill `tuneincloud-seo` : faite (`site`, `robots.txt`,
  `llms.txt` en `tuneincloud.fr`). Ne pas refaire.

## Domaine
Jusqu'au 2026-11-15, `astro.config.mjs`, `robots.txt` et `llms.txt`
déclaraient `tuneincloud.com` (ancien WordPress) : canonicals, sitemap, OG et
RSS pointaient vers un autre site. Corrigé par le commit `a937f19`. Au premier
audit, vérifier que Google a bien repris les canonicals en `.fr` (Search
Console, rapport Pages) et que la propriété `tuneincloud.fr` y est déclarée.

## Hors périmètre (ne pas recommander)
SEO local, e-commerce, Shopify, Google Business Profile, hreflang
(site monolingue), publicité payante.

## Automatisation (depuis le 2026-11-17)

| Moment | Qui | Quoi |
|---|---|---|
| Chaque article | `/tic-pipeline` | carte des mots-clés, `seo-cluster`, `seo-sxo`, brief (`seo-content-brief`, FLOW), `seo-check`, `seo-geo`, `seo-content`, `seo-image-gen` (audit), liens entrants, simulation du HTML. Intensité selon le format |
| Publication | `tic-publieur` | `seo-check` final, liens entrants (`seo: linking`), contrôle en ligne, IndexNow, drift baseline, ligne de suivi J+7 et J+30 |
| Mardi 11 h | tâche planifiée locale `tic-seo-hebdo` | `/tic-seo hebdo` : seo-check du site, drift, fraîcheur, suivis échus, issue numérotée |
| Premier mardi du mois | même tâche | `/tic-seo mensuel` à la place de `hebdo` : audit complet comparé au précédent, révision des clusters |
| Chaque push | GitHub Actions `seo-check.yml` | `seo-check --published`, échoue sur alerte bloquante |

- IndexNow : clé publique `public/45ba0dc631fa4ff33464fd5a18bb8a46.txt` (non
  secrète par conception).
- DataForSEO : non branché (décision du 2026-11-17). Estimation si activé :
  4 à 7 $ par mois, recharge prépayée de 50 $ minimum.
- Search Console : à brancher (`/seo google setup`). Sans elle, les suivis J+7
  et J+30 ne mesurent ni clics ni positions.

## Historique des audits
| Date | Commande | Score | Rapport |
|---|---|---|---|
| 2026-11-15 | audit | 53/100 | `editorial/seo/2026-11-15-audit/SYNTHESE.md` |
| 2026-11-16 | drift baseline | n/a | 24 URLs (accueil, /about/, /blog/, 21 articles), sans CWV, base `~/.cache/claude-seo/drift/baselines.db` |
