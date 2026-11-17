# TuneInCloud — contexte pour Claude Code

Blog d'expertise Microsoft (Intune, Entra, Defender, Purview, M365) en français,
par Daniel POLÒNIO. Site Astro 6 déployé sur Netlify depuis le repo GitHub
`DanyZack/tuneincloud`, branche `master`. Site public : https://tuneincloud.fr
(`tuneincloud.com` est l'ancien WordPress, hors périmètre).

## Chaîne de publication (agents)

| Agent | Rôle | Entrée | Sortie |
|---|---|---|---|
| `tic-veille` | Revue hebdo de sujets scorés (skill datajournaliste) | rien | issue GitHub "Veille" |
| `tic-redacteur` | Rédige brève / article / dossier / guide | sujet ou brief | fichier dans `src/content/draft/` |
| `tic-redac-chef` | Relecture rédac chef, corrige le brouillon | chemin du brouillon | brouillon corrigé + rapport |
| `tic-illustrateur` | Hero image, bannière, schémas | chemin du brouillon | images dans `public/images/` + liens dans le brouillon |
| `tic-publieur` | Déplace en `blog/`, build, commit, push | chemin du brouillon + OK de Daniel | article en ligne |
| `/tic-seo` | Audit SEO/GEO via le plugin claude-seo, fraîcheur, maillage | sous-commande (vide = audit) | rapport `editorial/seo/` + commits `seo:` après OK |

**SEO : plugin claude-seo + profil `.claude/seo-profile.md`.** Le plugin
(AgriciDaniel/claude-seo) est installé au niveau utilisateur et sert à tous les
sites de Daniel. Le skill utilisateur `seo-site-profile` fait le lien avec le
profil de chaque site (URL auditée, type, sortie des rapports, règles). `tic-seo`
est une commande et non un agent : un sous-agent ne peut pas lancer les agents
du plugin. Identifiants Google/Bing : `~/.config/claude-seo/tuneincloud/`
(variable `CLAUDE_SEO_PROFILE_DIR` dans `.claude/settings.json`), jamais dans le dépôt.

Commande d'orchestration : `/tic-pipeline <sujet>` enchaîne brief SEO → rédacteur →
contrôles SEO → rédac chef → illustrateur → liens entrants → simulation avant
publication, puis s'arrête pour la relecture de Daniel. Rien n'est publié sans son OK
explicite.

**SEO intégré au pipeline** (depuis le 2026-11-17). Les agents du plugin claude-seo
(`seo-cluster`, `seo-sxo`, `seo-geo`, `seo-content`, `seo-image-gen`) sont lancés par
`/tic-pipeline` lui-même, entre les étapes éditoriales, avec une intensité qui dépend
du format. Sorties par article : `editorial/seo/articles/<slug>/` (brief, SERP,
citabilité, E-E-A-T, liens entrants, simulation). Mémoire SEO :
`editorial/seo/mots-cles.md` (un mot-clé principal par page) et
`editorial/seo/suivi.md` (contrôles J+7 et J+30). Contrôle déterministe :
`node scripts/seo-check.mjs <fichier> --stage draft|final` (bloquant, comme
`style-check`), rejoué sur tout le site par la CI GitHub (`seo-check.yml`). Le SEO
propose, le rédac chef arbitre avec la charte. Routines : `/tic-seo hebdo` (lundi) et
`/tic-seo mensuel` (premier lundi), en tâches planifiées locales. DataForSEO n'est pas
branché (choix de Daniel) : les analyses de SERP sont des estimations.

Les skills éditoriaux sont dans `.claude/skills/tuneincloud-*` (version de référence,
copiée depuis Cowork). Les agents les invoquent via l'outil Skill ou lisent le
`SKILL.md` directement.

## Règles qui surchargent les skills

Les skills ont été écrits pour Cowork (connecteur GitHub distant). Ici, le repo est
local : ces règles priment sur le texte des skills.

1. **Travail en local, pas via MCP GitHub.** Lire, écrire et committer dans ce repo.
   Le connecteur GitHub sert uniquement aux issues (notifications à Daniel).
2. **Déploiement = `git push` sur `master`.** Netlify construit et publie
   automatiquement. Aucune commande `netlify` ni `npm run deploy` n'existe.
   Avant tout push : `npm run build` doit passer sans erreur.
3. **Brouillons dans `src/content/draft/`.** Ce dossier n'est pas dans la collection
   Astro, donc jamais compilé ni publié. Un article n'entre dans `src/content/blog/`
   qu'au moment de la publication par `tic-publieur`.
4. **Pas de PR pour relire un brouillon.** Le mode "branche `editorial/` + PR" du skill
   rédacteur en chef ne s'applique qu'aux articles déjà publiés (audit a posteriori).
5. **L'audit d'urgence SEO (Partie 0 du skill SEO) est fait** : `site` pointe sur
   `https://tuneincloud.fr` (corrigé le 2026-11-15, commit `a937f19`), `robots.txt` et
   `llms.txt` existent dans `public/`. Ne pas refaire.
6. **Jamais de commit ni de push sans que l'agent en ait explicitement le rôle.**
   Trois cas autorisés : `tic-publieur` (articles, message `Brève : ...`,
   `Article : ...`, `Dossier : ...`, `Guide : ...`, plus le commit
   `seo: linking — liens entrants vers <id>` couvert par le même « OK publie »),
   `/tic-pipeline` (brouillons dans `draft/`, leurs images et leurs fichiers
   `editorial/seo/`, message `Brouillon : ...`), `tic-seo` (commits `seo: ...` après
   OK, et le seul commit sans OK `seo: suivi — ...` des routines, limité aux rapports
   et aux fichiers `editorial/seo/`). Toujours `git add` fichier par fichier, jamais
   `-A`.
7. **URL de contrôle après publication : `https://tuneincloud.fr`** (Netlify ;
   `https://tuneincloud.netlify.app` reste utilisable). `tuneincloud.com` est l'ancien
   WordPress : ne jamais l'utiliser comme référence.
8. **Commits créés par les agents** : terminer le message par la ligne
   `Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>`.

## Frontmatter (validé par Zod dans `src/content.config.ts`)

```yaml
---
title: "Titre"                       # 55-60 caractères idéalement
description: "Résumé"                # 140-160 caractères
pubDate: 2026-10-07                  # date de publication réelle, sans guillemets
updatedDate: 2026-11-01              # optionnel, à la mise à jour
heroImage: "/images/hero/slug.webp"  # optionnel, chemin local de préférence
category: "actualites"               # actualites | guides | dossiers
subcategory: "breves"                # voir tableau
---
```

| Format | `category` | `subcategory` | Longueur |
|---|---|---|---|
| Brève | `actualites` | `breves` | 250-500 mots |
| Article presse | `actualites` | `articles` | 800-1500 mots |
| Dossier | `dossiers` | `entra` `intune` `defender` `purview` `ia` `autre` | 1500-4000 mots |
| Guide | `guides` | `entra` `intune` `defender` `purview` `ia` `autre` | 800-2500 mots |

Attention : les skills dossier et guide citent `m365` et `zero-trust` comme
subcategory. Ces valeurs n'existent pas dans le schéma Zod et cassent le build.
Utiliser `autre` (ou `ia` pour Copilot et agents IA).

## Nommage et images

- Fichier article : `YYYY-MM-DD-<slug>.md` (la date = `pubDate`, fixée par le
  publieur au jour de la publication). Vocabulaire : `<slug>` = nom sans préfixe de
  date ni extension (`intune-baseline-windows-11-26h2`), minuscules, tirets, 3 à 5
  mots, avec le mot-clé principal ; `<id>` = nom complet sans extension, en
  minuscules, qui donne l'URL `/blog/<id>/`. Les images et rapports sont nommés
  avec `<slug>` (sans date), le fichier article avec la date.
- Liens internes : `/blog/<id>/` où `<id>` est le nom de fichier sans extension,
  **passé en minuscules** par le loader Astro (`2026-04-16-IntuneSuite-in-M365.md`
  donne `/blog/2026-04-16-intunesuite-in-m365/`). Vérifier que le fichier existe.
- URLs Microsoft Learn Intune : la structure canonique est
  `learn.microsoft.com/<lang>/intune/device-management/...` et `/intune/device-security/...`.
  Le What's new reste sous `/intune/intune-service/fundamentals/whats-new`.
  Les pages Tech Community ne se lisent pas avec WebFetch (JavaScript) : utiliser
  le navigateur intégré.
- Hero image : `public/images/hero/<slug>.webp` (sans date), 1200×630, < 200 Ko.
  Les URL externes (wp.com, ytimg) sont tolérées sur l'existant, interdites sur le neuf.
- Bannière interne (après l'introduction) : `![Banniere](/images/banarticle/<format>-<produit>N.png)`,
  748×172 px. Séries existantes : `breve-entra1..2`, `breve-intune1..3`,
  `breve-purview1..2`, `article-copilot1`, `article-defender1`, `dossier-entraagentid`.
- Schémas (dossiers et guides uniquement, jamais dans les brèves) :
  `public/images/schemas/<slug>-<n>.png`, insérés par
  `![<alt descriptif de 80 à 125 caractères>](/images/schemas/...)` (plus de
  `![SCHEMA n]` : les moteurs IA lisent l'`alt`).
  Style imposé : fond ivoire `#ede6d6`, paysage, blocs colorés plein fond, flèches
  épaisses, palette bleu marine `#1a2b5e`, or `#b8972a`, bordeaux `#8b1a2b`,
  bleu roi `#2748c4`, vert foncé `#1a5c3a`. Référence : `public/images/schemas/purview-dspm-archiglobale.png`.
- Icônes produits et logo : copies dans `editorial/assets/` (source : OneDrive
  `Tune in Cloud\Icons`). Scripts : `scripts/make-banner.mjs` (bannière) et
  `scripts/svg2png.mjs` (schéma SVG → PNG). Gabarit de schéma :
  `editorial/schemas/_gabarit.svg`. Les SVG sources des schémas sont conservés
  dans `editorial/schemas/`.
- Canva : les hero images sont générées par `generate-image`, puis exportées en
  pleine résolution via le design de service `DAHXXaWjBUY` (page 2). Ne pas le
  supprimer ni modifier sa page 1.
- Dossier `editorial/` : rapports de relecture (`relectures/`), schémas sources,
  assets. Versionné, jamais servi par Astro.

## Style (rappel des règles non négociables)

**Identité littéraire : Flaubert appliqué au fait technique.** La charte complète
est dans `.claude/skills/tuneincloud-article/references/charte-style.md` (copiée
dans chaque skill de rédaction par `node scripts/style-check.mjs --sync-charte`).
Tout rédacteur la lit avant d'écrire. Tout brouillon passe
`node scripts/style-check.mjs <fichier>` sans alerte bloquante avant relecture.

- Pas de tiret cadratin « — » en milieu de phrase. Virgule, point ou parenthèses.
- Zéro jargon marketing. Chaque fait daté est sourcé Microsoft (Learn, Message
  Center, roadmap). Dates tierces signalées « à confirmer ».
- Licence requise, statut GA/Preview, versions précises : toujours indiqués.
- Vouvoiement, ton expert direct. Ironie rare et ciblée.
- Blog d'un seul expert : jamais de « nous », « notre », « nos » pour parler de
  TuneInCloud. Écrire « je », « mon dossier », « ce que je défends ».
- Pas de point-virgule. Couper en deux phrases ou reformuler.
- Pas de numéro de Message Center (MCxxxxxxx) dans le corps du texte : garder
  l'idée, et citer les MC uniquement dans la section Source (sans lien si l'URL
  n'est pas vérifiée).
- Ne pas développer les sigles connus du lectorat (MCP, MDM, DLP, etc.).
- `subcategory: "breves"` (jamais « brebes »).

## Commandes utiles

```bash
npm run dev      # serveur local http://localhost:4321
npm run build    # build de production, valide aussi le frontmatter Zod
```
