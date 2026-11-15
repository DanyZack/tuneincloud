# Audit GEO / AI Search Readiness : tuneincloud.fr

Date : 2026-11-15. Périmètre : https://tuneincloud.fr (Astro statique, Netlify). `tuneincloud.com` hors périmètre.
Sources de l'analyse : rendu `render_page.py --mode never` de l'accueil, de `/about/`, de deux dossiers, fichiers locaux `public/robots.txt`, `public/llms.txt`, `src/layouts/BlogPost.astro`, `src/components/BaseHead.astro`, 21 articles de `src/content/blog/`.
Toute recommandation portant sur le fond ou la structure d'un article est **à valider par Daniel**.

## Score AI Search Readiness : 59 / 100

| Dimension | Poids | Note | Pondéré | Résumé |
|---|---|---|---|---|
| Citabilité | 25 % | 62 | 15,5 | Faits datés, licences et tableaux de synthèse solides. Intros de dossier rhétoriques, aucun titre en question, passages périmés. |
| Lisibilité structurelle | 20 % | 68 | 13,6 | Hiérarchie H2/H3 propre, tableaux dans dossiers et guides. Brèves sans tableau, pas de bloc « en bref ». |
| Contenu multimodal | 15 % | 50 | 7,5 | Schémas maison de qualité, mais `alt="SCHEMA n"`, hero externes (ytimg, learn, sbd.org.uk) à `alt=""`, pas de vidéo. |
| Autorité et marque | 20 % | 35 | 7,0 | Aucune signature sur les articles, zéro JSON-LD, aucune entité Wikipedia/Wikidata, présence YouTube/Reddit non constatée. |
| Accessibilité technique | 20 % | 75 | 15,0 | HTML rendu côté serveur, robots.txt ouvert, llms.txt servi. Pas de `lastmod`, pas d'IndexNow, llms.txt sans articles. |
| **Total** | | | **58,6** | |

### Scores par plateforme (estimation)

| Plateforme | Score | Facteur limitant principal |
|---|---|---|
| Google AI Overviews | 55 | Pas de données structurées Article/Person, signature absente, contenus datés non mis à jour (E-E-A-T faible pour un site jeune). |
| ChatGPT Search | 55 | OAI-SearchBot autorisé, mais ChatGPT Search s'appuie largement sur l'index Bing : `lastmod` absent, pas d'IndexNow, entité auteur peu corroborée hors LinkedIn. |
| Perplexity | 62 | PerplexityBot autorisé. Perplexity valorise les tableaux datés et sourcés, point fort des dossiers. Pénalisé par la péremption des dossiers. |
| Bing Copilot | 50 | Dépend de Bingbot : sitemap sans `lastmod`, pas de clé IndexNow dans `public/`, aucune donnée structurée. |

## Accès des crawlers IA (`public/robots.txt`, servi en ligne à l'identique)

`User-agent: * / Allow: /` couvre tous les robots non nommés. Aucun blocage constaté.

| Robot | Statut | Ce qu'il gouverne réellement |
|---|---|---|
| OAI-SearchBot | Autorisé (explicite) | Citabilité dans ChatGPT Search |
| ChatGPT-User | Autorisé (explicite) | Visites déclenchées par un utilisateur ChatGPT |
| GPTBot | Autorisé (explicite) | Entraînement OpenAI uniquement, sans effet sur ChatGPT Search |
| Claude-SearchBot | Autorisé via `*` (non nommé) | Citabilité dans la recherche Claude |
| Claude-User | Autorisé via `*` (non nommé) | Récupération à la demande d'un utilisateur Claude |
| ClaudeBot | Autorisé (explicite) | Entraînement Anthropic uniquement |
| anthropic-ai, Claude-Web | Autorisés (explicites) | Agents obsolètes, sans effet actuel |
| PerplexityBot, Perplexity-User | Autorisés (explicites) | Index et récupération Perplexity |
| Googlebot | Autorisé via `*` | Google Search **et** AI Overviews |
| Google-Extended | Autorisé (explicite) | Entraînement et grounding Gemini/Vertex, jamais l'inclusion dans AI Overviews |
| Bingbot | Autorisé via `*` | Bing, Copilot, et indirectement ChatGPT Search |
| Applebot | Autorisé via `*` | Siri, Spotlight, Safari |
| Applebot-Extended | Autorisé (explicite) | Entraînement Apple Intelligence uniquement |
| CCBot, Bytespider, Amazonbot | Autorisés (explicites) | Entraînement (Common Crawl, ByteDance, Amazon) |
| cohere-ai | Autorisé via `*` | Entraînement Cohere |

Le choix d'autoriser aussi les robots d'entraînement est cohérent avec l'objectif de visibilité maximale. Il relève d'une décision de Daniel, pas d'un défaut.

## llms.txt : présent, bien formé, mais incomplet

`https://tuneincloud.fr/llms.txt` répond 200 en `text/plain; charset=UTF-8`. Structure conforme (titre H1, résumé en citation, sections H2). `llms-full.txt` : 404. Licence RSL 1.0 (`/license.xml`) : 404, aucune déclaration RSL.

Défauts :
1. **Aucun article listé.** Le format llms.txt prévoit des listes de liens `- [Titre](URL): note` vers les contenus de référence. En l'état, un agent qui lit le fichier connaît l'auteur et les thèmes, mais ne sait pas quelles pages citer.
2. **Section « Politique IA » inexacte.** Elle présente GPTBot, ClaudeBot, Google-Extended, Applebot-Extended et CCBot comme des robots « d'indexation et de citation ». Ce sont des robots d'entraînement. Les robots de citation sont OAI-SearchBot, Claude-SearchBot, PerplexityBot, Googlebot et Bingbot.
3. Pas de date de dernière mise à jour du fichier.

## Constats

### Critique

**C1. Note éditoriale interne publiée en ligne.** `src/content/blog/2026-07-08-dossier-dspm.md`, fin de fichier : le bloc « Points à re-vérifier avant publication » est visible sur la page publique (vérifié dans le HTML rendu). Un moteur IA peut citer ces lignes comme des incertitudes de l'auteur, et le bloc signale un dossier non finalisé. Recommandation : retirer le bloc ou le transformer en section « Mises à jour » datée. À valider par Daniel.

**C2. Aucune donnée structurée sur tout le site.** `src/components/BaseHead.astro`, `src/layouts/BlogPost.astro` : zéro bloc `application/ld+json` (accueil, `/about/`, dossiers). `og:type` vaut `website` sur les articles. Pas de `article:published_time`, `article:modified_time`, ni `meta name="author"`. Les moteurs ne peuvent pas relier un passage à un auteur, une date et une organisation. Recommandation : JSON-LD `BlogPosting` par article (`headline`, `datePublished`, `dateModified` alimenté par `updatedDate`, `author` → `Person` avec `@id` stable, `publisher`, `image`, `inLanguage: fr-FR`), `Person` + `WebSite` sur l'accueil et `/about/` avec `sameAs` (LinkedIn, Cladéys). `og:type=article` dans le layout d'article. Effort : 2 à 3 h.

**C3. Aucune signature visible sur les articles.** `src/layouts/BlogPost.astro` : seuls le header et le footer mentionnent « par Daniel Polònio ». Aucune ligne auteur ni lien vers `/about/` dans l'article. Pour un blog d'un seul expert, c'est le premier signal E-E-A-T manquant. Recommandation : ligne « Par Daniel POLÒNIO, Architecte Expert Microsoft Modern Work et Cybersécurité » avec date de publication et de mise à jour, lien vers `/about/`. Effort : 1 h.

### Haute

**H1. Dossiers périmés sans `updatedDate`.** Aucun des 21 articles n'a d'`updatedDate`.
- `src/content/blog/dossier-2026-04-15-entra-agent-id.md` : « Limitations actuelles (Preview - avril 2026) », GA Agent 365 du 1er mai 2026 et « horizon Ignite 2026 » encore écrits au futur. Le tableau de synthèse est titré « Situation actuelle (avril 2026) ».
- `src/content/blog/2026-07-08-dossier-dspm.md` : section « Compte à rebours vers septembre 2026 » alors que la retraite des versions classiques (30 septembre 2026) est passée. Data Security Posture Agent « GA prévue fin juillet 2026 » non confirmé.
- `src/content/blog/2026-10-12-entra-memberof-groupes-dynamiques.md` : titre « avant le 3 novembre », échéance passée de 12 jours.
Les moteurs IA privilégient les sources fraîches et datées sur un sujet qui bouge. Un dossier qui affirme un statut Preview dépassé risque d'être écarté, ou pire, cité à tort. Recommandation : mise à jour factuelle sourcée Learn/Message Center, `updatedDate`, titres de tableaux « au <date> ». À valider par Daniel. Effort : 2 à 4 h par dossier.

**H2. llms.txt sans liste d'articles.** `public/llms.txt`. Ajouter une section `## Dossiers de référence` et `## Guides` avec 8 à 12 liens et une phrase de résumé chacun (Entra Agent ID, DSPM, memberOf, baseline 26H2, phishing triage agent, SSO Linux/macOS...), plus une section `## Actualités récentes`. Corriger la section « Politique IA » (voir plus haut). Idéalement généré au build depuis la collection Astro pour rester à jour. Effort : 1 h manuel, 2 h en génération automatique.

**H3. Intros de dossiers sans réponse directe.** `dossier-2026-04-15-entra-agent-id.md` : l'intro (« Vos utilisateurs ont une identité... ») ne définit pas Entra Agent ID, ne donne ni statut, ni licence, ni date. La première définition extractible arrive au H3 « Ce que les modèles d'identité existants ne couvrent pas ». `2026-07-08-dossier-dspm.md` : meilleure (dates GA et retraite en intro) mais sans définition du DSPM. Les moteurs extraient en priorité les 40 à 60 premiers mots. Recommandation : ajouter sous le titre un paragraphe « En bref » de 50 à 80 mots : définition, statut GA/Preview, licence, date de vérification. Le style Flaubert de l'intro peut rester juste après. À valider par Daniel. Effort : 20 min par article.

**H4. Statistiques sans source attenante.** `dossier-2026-04-15-entra-agent-id.md` (« 1,3 milliard d'agents IA d'ici trois ans », aucune source dans le passage ni dans la liste finale) et `2026-07-08-dossier-dspm.md` (« 40 % des incidents... étude commandée par Microsoft en juillet 2025 », sans lien). Un chiffre non attribué est rarement repris par les moteurs, et contrevient à la règle éditoriale « chaque fait daté est sourcé ». Recommandation : nommer l'étude (éditeur, date) et la lier dans le passage. À valider par Daniel.

**H5. Sitemap sans `lastmod`.** `https://tuneincloud.fr/sitemap-0.xml` : 35 URL, 0 `lastmod`. Bing (donc Copilot et ChatGPT Search) et Google s'en servent pour prioriser le recrawl. Recommandation : option `serialize` de `@astrojs/sitemap` dans `astro.config.mjs` alimentée par `updatedDate ?? pubDate`, et clé IndexNow dans `public/` (ping à chaque push). Effort : 1 à 2 h.

### Moyenne

**M1. Aucun titre en forme de question.** 0 H2/H3 interrogatif sur les 21 articles. Les requêtes posées aux assistants sont des questions (« quelle licence pour Entra Agent ID ? »). Recommandation ciblée, pas systématique : reformuler 2 à 3 H2 par dossier (« Quelle licence faut-il ? », « Que se passe-t-il le 30 septembre ? »). À valider par Daniel, en cohérence avec la charte de style.

**M2. Texte alternatif des schémas non descriptif.** `alt="SCHEMA 1"`, `alt="SCHEMA 2"`... sur tous les schémas (ex. `2026-07-08-dossier-dspm.md`, `dossier-2026-04-15-entra-agent-id.md`). La légende en italique existe parfois mais n'est pas liée à l'image. Les moteurs multimodaux lisent l'`alt`. Recommandation : `![Architecture Entra Agent ID : blueprint, agent identity, agent user](...)`. Le hero de `ArticleBanner.astro` est en `alt=""`. Effort : 30 min.

**M3. Hero images externes.** 12 articles ont un `heroImage` en `http...` (ex. `2026-07-08-dossier-dspm.md` sur i.ytimg.com, `dossier-2026-04-15-entra-agent-id.md` sur learn.microsoft.com, `2026-10-12-entra-memberof-groupes-dynamiques.md` sur sbd.org.uk). Risque de lien cassé, d'image `og:image` étrangère au site, et l'image n'est pas attribuable à TuneInCloud. Tolérées sur l'existant selon CLAUDE.md : à remplacer en priorité sur les dossiers.

**M4. Numéros de Message Center dans le corps.** `2026-07-08-dossier-dspm.md` (14 occurrences, dont le texte et le tableau de jalons) et `2026-10-12-entra-memberof-groupes-dynamiques.md` (6 occurrences, tableau calendrier). Contraire à la règle locale. Côté GEO, l'effet est neutre à légèrement positif (identifiant vérifiable) quand le MC est dans un tableau. À arbitrer par Daniel.

**M5. Guides anciens sans source ni date de vérification.** `old-windowsenroll.md` (pubDate 2023-03-20, titre « Inscription Windows », aucune source), et les 6 autres `old-*.md` : 0 lien Microsoft Learn. Titre trop générique pour être associé à une requête. Recommandation : titre explicite, section Source, `updatedDate` après relecture. À valider par Daniel.

**M6. Entité auteur peu corroborée.** Aucune page Wikipedia/Wikidata pour TuneInCloud ou l'auteur (vérifié sur fr.wikipedia.org). Présence YouTube et Reddit non constatée (recherche web automatisée bloquée, à confirmer manuellement). LinkedIn est la seule source tierce citée. Les mentions YouTube et Reddit sont les signaux les plus corrélés aux citations IA. Pistes : courtes vidéos de démonstration liées aux guides, réponses argumentées sur r/Intune et r/AZURE avec lien vers le guide quand il répond exactement à la question, profil Wikidata une fois des mentions tierces acquises. `/about/` ne mentionne ni certifications Microsoft ni distinctions (MVP, MCT, certifications SC-/MD-) : à ajouter si elles existent.

### Basse

**B1.** `public/robots.txt` : `Claude-SearchBot` et `Claude-User` ne sont pas nommés (couverts par `*`, donc autorisés). Les ajouter explicitement clarifie l'intention. `anthropic-ai` et `Claude-Web` sont obsolètes. Les groupes nommés ne reprennent pas `Disallow: /draft/` (sans effet, `draft/` n'est pas servi).

**B2.** Pas de `llms-full.txt` ni de licence RSL 1.0. Facultatif. Une déclaration RSL simple (citation autorisée avec attribution) formaliserait la « Politique IA » du llms.txt.

**B3.** Coquilles sur `/about/` (`src/pages/about.astro`) : « leparc », « séucrité ». Signal de qualité mineur sur la page d'entité principale.

**B4.** Points-virgules restants (règle locale) : `2026-07-08-dossier-dspm.md` (3, dont « ; les onboarding steps »), `2026-10-08-intune-baseline-windows-11-26h2.md` (1, « « plusieurs changements » ; le tableau en compte deux »). `dossier-2026-04-15-entra-agent-id.md` contient 26 tirets cadratins, surtout dans la liste des sources et le tableau, et des « - » en milieu de phrase dans les titres (« Preview - avril 2026 »).

**B5.** `2026-10-08-intune-baseline-windows-11-26h2.md` : « le tableau en compte deux » alors que la brève ne contient pas de tableau (renvoi implicite au billet Microsoft). Ambigu pour un passage extrait hors contexte.

## Citabilité passage par passage

| Article | Passage | Évaluation |
|---|---|---|
| `2026-10-08-intune-baseline-windows-11-26h2.md` | Intro (2 phrases, ~45 mots) | Excellente. Réponse directe : quoi, depuis quand, conséquence. Extractible telle quelle. |
| idem | « Deux changements, pas davantage » | Très bonne. Liste de deux réglages nommés avec valeur. Idéal pour une question « qu'est-ce qui change dans la baseline 26H2 ». |
| idem | « Mise à niveau » + « Prérequis » | Bonne. Chemin console exact, licence, rôle, build 26300.9550. Bloc d'environ 160 mots autonome. |
| `dossier-2026-04-15-entra-agent-id.md` | Intro | Faible. Accroche rhétorique, aucune définition, aucun fait. |
| idem | « Le modèle d'objet » | Bonne. Définitions en gras des quatre objets, extractibles une à une. |
| idem | « Prérequis et licences » | Très bonne mais périmée : prix 15 $ et 99 $, dates. À rafraîchir. |
| idem | « Synthèse » (tableau 10 lignes) | Excellente forme, fond daté « avril 2026 ». Tableau le plus citable du site s'il est mis à jour. |
| `2026-07-08-dossier-dspm.md` | Intro | Moyenne. Dates fortes (déc. 2025, fin mai 2026, 30 sept. 2026) mais pas de définition du DSPM. |
| idem | « État de disponibilité au 8 juillet 2026 » | Très bonne structure (titre daté, liste des capacités en Preview). Fond à rafraîchir. |
| idem | « Licence de base » | Bonne. E5 / E5 Compliance, Business Premium + Purview Suite, E7 / Agent 365. |
| idem | « Roadmap » et « Synthèse » (2 tableaux) | Excellente forme. Plusieurs lignes au futur désormais passé. |
| idem | « Points à re-vérifier avant publication » | Nuisible (voir C1). |
| `2026-10-12-entra-memberof-groupes-dynamiques.md` | Intro | Excellente. Date, mécanisme, conséquence en 4 phrases. |
| idem | « Le calendrier » (tableau daté et sourcé) | Excellente, colonne Source incluse. |
| idem | « Prérequis » | Très bonne. Licence, rôles, scopes Graph exacts. |

Constat général : la discipline éditoriale (licence, statut, version, date, source) produit des passages très citables. Le principal frein n'est pas l'écriture, c'est l'absence de signaux machine (schéma, signature, `lastmod`) et la péremption des dossiers.

## Top 5 des changements à plus fort impact

| # | Changement | Fichier(s) | Effort | Impact |
|---|---|---|---|---|
| 1 | JSON-LD `BlogPosting` + `Person` + `WebSite`, `og:type=article`, `article:published_time` / `modified_time` | `src/components/BaseHead.astro`, `src/layouts/BlogPost.astro`, `src/pages/index.astro`, `src/pages/about.astro` | 2 à 3 h | Très fort (toutes plateformes) |
| 2 | Signature auteur visible avec lien `/about/` et dates | `src/layouts/BlogPost.astro` | 1 h | Fort (E-E-A-T, AIO) |
| 3 | Retirer la note interne du dossier DSPM, puis rafraîchir les deux dossiers et le guide memberOf avec `updatedDate` (à valider par Daniel) | `2026-07-08-dossier-dspm.md`, `dossier-2026-04-15-entra-agent-id.md`, `2026-10-12-entra-memberof-groupes-dynamiques.md` | 15 min + 2 à 4 h par article | Fort (fraîcheur, exactitude) |
| 4 | llms.txt : liste des dossiers/guides de référence, correction de la « Politique IA », génération au build | `public/llms.txt` (ou endpoint Astro) | 1 à 2 h | Moyen à fort |
| 5 | `lastmod` dans le sitemap + IndexNow | `astro.config.mjs`, `public/<clé>.txt` | 1 à 2 h | Fort pour Bing Copilot et ChatGPT Search |

Ensuite : paragraphe « En bref » en tête des dossiers (H3), sources des statistiques (H4), `alt` descriptifs (M2).

## Données structurées pour audit-data.json (catégorie AI Search Readiness)

```json
{
  "category": "AI Search Readiness",
  "score": 59,
  "dimensions": {
    "citability": 62,
    "structural_readability": 68,
    "multimodal": 50,
    "authority_brand": 35,
    "technical_accessibility": 75
  },
  "platforms": { "google_aio": 55, "chatgpt_search": 55, "perplexity": 62, "bing_copilot": 50 },
  "llms_txt": { "status": "present", "well_formed": true, "lists_articles": false, "llms_full": "missing" },
  "rsl": "missing",
  "ai_crawlers": {
    "OAI-SearchBot": "allowed", "Claude-SearchBot": "allowed_via_wildcard", "PerplexityBot": "allowed",
    "Googlebot": "allowed_via_wildcard", "Bingbot": "allowed_via_wildcard",
    "GPTBot": "allowed", "ClaudeBot": "allowed", "Google-Extended": "allowed",
    "Applebot-Extended": "allowed", "CCBot": "allowed", "cohere-ai": "allowed_via_wildcard"
  },
  "findings": [
    { "id": "C1", "severity": "critical", "file": "src/content/blog/2026-07-08-dossier-dspm.md", "title": "Note éditoriale « Points à re-vérifier avant publication » visible en ligne" },
    { "id": "C2", "severity": "critical", "file": "src/components/BaseHead.astro", "title": "Aucun JSON-LD, og:type=website sur les articles, pas de meta auteur ni dates article" },
    { "id": "C3", "severity": "critical", "file": "src/layouts/BlogPost.astro", "title": "Aucune signature auteur visible sur les articles" },
    { "id": "H1", "severity": "high", "file": "src/content/blog/dossier-2026-04-15-entra-agent-id.md; src/content/blog/2026-07-08-dossier-dspm.md; src/content/blog/2026-10-12-entra-memberof-groupes-dynamiques.md", "title": "Contenus périmés sans updatedDate" },
    { "id": "H2", "severity": "high", "file": "public/llms.txt", "title": "llms.txt sans liste d'articles, politique IA confond entraînement et citation" },
    { "id": "H3", "severity": "high", "file": "src/content/blog/dossier-2026-04-15-entra-agent-id.md", "title": "Intro sans réponse directe ni définition" },
    { "id": "H4", "severity": "high", "file": "src/content/blog/dossier-2026-04-15-entra-agent-id.md; src/content/blog/2026-07-08-dossier-dspm.md", "title": "Statistiques sans source attenante" },
    { "id": "H5", "severity": "high", "file": "astro.config.mjs", "title": "Sitemap sans lastmod, pas d'IndexNow" },
    { "id": "M1", "severity": "medium", "file": "src/content/blog/*.md", "title": "Aucun titre H2/H3 en forme de question" },
    { "id": "M2", "severity": "medium", "file": "src/content/blog/*.md; src/components/ArticleBanner.astro", "title": "alt non descriptifs (SCHEMA n, hero vide)" },
    { "id": "M3", "severity": "medium", "file": "src/content/blog/*.md (12 articles)", "title": "Hero images hébergées hors site" },
    { "id": "M4", "severity": "medium", "file": "src/content/blog/2026-07-08-dossier-dspm.md; src/content/blog/2026-10-12-entra-memberof-groupes-dynamiques.md", "title": "Numéros MC dans le corps (règle locale)" },
    { "id": "M5", "severity": "medium", "file": "src/content/blog/old-*.md", "title": "Guides anciens sans source, titres génériques" },
    { "id": "M6", "severity": "medium", "file": "src/pages/about.astro", "title": "Entité auteur peu corroborée (pas de Wikidata, YouTube/Reddit non constatés)" },
    { "id": "B1", "severity": "low", "file": "public/robots.txt", "title": "Claude-SearchBot et Claude-User non nommés, agents obsolètes listés" },
    { "id": "B2", "severity": "low", "file": "public/", "title": "Pas de llms-full.txt ni de licence RSL" },
    { "id": "B3", "severity": "low", "file": "src/pages/about.astro", "title": "Coquilles sur la page À propos" },
    { "id": "B4", "severity": "low", "file": "src/content/blog/2026-07-08-dossier-dspm.md; src/content/blog/2026-10-08-intune-baseline-windows-11-26h2.md; src/content/blog/dossier-2026-04-15-entra-agent-id.md", "title": "Points-virgules et tirets cadratins résiduels" },
    { "id": "B5", "severity": "low", "file": "src/content/blog/2026-10-08-intune-baseline-windows-11-26h2.md", "title": "Renvoi à un tableau absent de la brève" }
  ]
}
```

## Limites de l'analyse

- Aucun outil DataForSEO disponible : visibilité réelle dans ChatGPT et mentions LLM non mesurées.
- Recherche de mentions YouTube/Reddit/LinkedIn bloquée (défi anti-robot du moteur de recherche) : à confirmer manuellement.
- Rendu en mode `never` (HTML statique, aucun shell SPA détecté sur l'accueil) : pas de navigateur lancé, donc pas de question de sandbox.
