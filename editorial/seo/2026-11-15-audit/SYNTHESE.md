# Audit SEO TuneInCloud : synthèse du 2026-11-15

- **URL auditée** : https://tuneincloud.fr (`audit_url` du profil, identique à `canonical_domain`)
- **Type** : `publisher`
- **Outil** : plugin claude-seo 2.6.2, commande `audit`, 11 agents : technical, content, schema, sitemap, performance, visual, geo, agentic, backlinks, cluster, sxo
- **Détail par agent** : `findings/*.md`. Captures : `screenshots/`

## Score claude-seo : 53/100

| Catégorie | Poids | Score |
|---|---|---|
| Technique | 22 % | 66 |
| Contenu (E-E-A-T) | 23 % | 62 |
| On-Page | 20 % | 46 |
| Schema / données structurées | 10 % | 4 |
| Performance (CWV, estimée) | 10 % | 68 |
| AI Search Readiness (GEO) | 10 % | 59 |
| Images | 5 % | 45 |
| **Total pondéré** | | **53** |

Scores annexes, hors calcul : SXO 44/100, Agent-UX 100/100. Pour les backlinks, les données sont insuffisantes.

### Limites de cet audit

- **Google** : aucun identifiant Google (Search Console, CrUX, GA4), car `~/.config/claude-seo/tuneincloud/` est vide. Je n'ai donc pas pu vérifier que Google a repris les canonicals en `.fr`, comme le demande la section « Domaine » du profil. Ce point reste ouvert.
- **Performance** : PageSpeed Insights a répondu par un quota dépassé (HTTP 429) et Lighthouse local n'a pas été autorisé. Les Core Web Vitals sont estimés à partir du code, pas mesurés.
- **SERP et backlinks** : la SERP utilisée est un index US et non google.fr, et rien n'a été mesuré sur ChatGPT ou Perplexity. Common Crawl ne contient ni tuneincloud.fr, ni tuneincloud.com, ni cladeys.fr.
- **Ce que l'audit confirme** : le site est en ligne sur `.fr`. Les canonicals sont corrects, `www` et http redirigent en un seul saut 301, les 35 URLs du sitemap répondent 200 et les 404 sont de vraies 404.

---

## Constats retenus

### Critique

**C1. Note interne publiée sur le dossier DSPM.** Le bloc « Points à re-vérifier avant publication » s'affiche sur la page publique (vérifié dans le HTML en ligne).
- Fichier : `src/content/blog/2026-07-08-dossier-dspm.md` ligne 598
- Correctif : supprimer le bloc. Comme il touche au contenu, **c'est à vous de valider**. C'est la correction la plus urgente.

**C2. Aucune donnée structurée sur tout le site** : pas de WebSite, Organization, Person, BlogPosting ni BreadcrumbList.
- Fichiers : `src/components/BaseHead.astro`, `src/layouts/BlogPost.astro`, `src/pages/index.astro`, `src/pages/about.astro`
- Correctif (scope `schema`) : nouveau `src/lib/schema.ts` (graphe `@id`) et `src/components/JsonLd.astro`. Le code complet est dans `findings/schema.md`. Le frontmatter actuel suffit, aucun champ n'est à ajouter.
- Pour `sameAs`, seuls LinkedIn et GitHub (DanyZack) sont retenus.
- À confirmer par vous : le lien Cladéys (`worksFor`) et le logo.

**C3. Aucun auteur sur les pages article** : ni nom ni lien vers `/about/`, l'expertise n'est pas rattachée aux articles.
- Fichier : `src/layouts/BlogPost.astro`
- Correctif : une ligne de signature sous le titre, par exemple `Par <a href="/about/">Daniel POLÒNIO</a>`. C'est un changement de gabarit, pas de fond. Il est couvert par le Person du JSON-LD.

### Haute

**H1. `og:image` est le placeholder Astro sur tous les articles, et `og:type` vaut `website`.** `heroImage` n'est jamais transmis à `BaseHead`.
- Fichiers : `src/layouts/BlogPost.astro`, `src/components/BaseHead.astro`
- Correctif (scope `head`) :

```diff
// BlogPost.astro
-<BaseHead title={title} description={description} />
+<BaseHead title={title} description={description} image={heroImage}
+  type="article" pubDate={pubDate} updatedDate={updatedDate} />
// BaseHead.astro
-	image?: ImageMetadata;
+	image?: ImageMetadata | string;
+	type?: 'website' | 'article'; pubDate?: Date; updatedDate?: Date;
-<meta property="og:type" content="website" />
+<meta property="og:type" content={type} />
+<meta property="og:site_name" content="TuneInCloud" />
+<meta property="og:locale" content="fr_FR" />
+<meta name="author" content="Daniel POLÒNIO" />
+{type === 'article' && pubDate && <meta property="article:published_time" content={pubDate.toISOString()} />}
+{type === 'article' && updatedDate && <meta property="article:modified_time" content={updatedDate.toISOString()} />}
// og:url / twitter:url : canonicalURL au lieu de Astro.url
```

- Les 12 articles dont le hero est externe auront un `og:image` externe. Leur rapatriement relève de `tic-illustrateur`.

**H2. Cinq liens internes cassés vers les anciennes URLs WordPress `tuneincloud.fr/2023/...`** (404), sans aucune redirection.
- Fichiers : `src/content/blog/old-windowsenroll.md` lignes 20, 30 et 100, `old-enrollautopilotcloud.md` ligne 10, `old-enrollabm.md` ligne 42
- Correctif 1 (scope `linking`) : remplacer les liens.
  - `/2023/02/27/modes-de-jonctions-des-appareils-dans-azure-ad/` devient `/blog/old-modejonctionwindows/`
  - `/2023/03/20/inscription-windows/` devient `/blog/old-windowsenroll/`
  - `/2023/03/24/i/` devient `/blog/old-enrollautopilotcloud/`
  - Le lien Apple Configurator n'a pas d'équivalent : je propose de le retirer.
- Correctif 2 (scope `config`) : créer `public/_redirects` avec les mêmes correspondances en 301, pour les backlinks éventuels.

**H3. Le maillage interne est quasi absent** : 6 liens contextuels pour 21 articles, et 13 à 15 articles ne reçoivent aucun lien.
- Correctif (scope `linking`) : la matrice de 37 liens se trouve dans `findings/cluster.md`, dont 6 prioritaires (P0). Elle ne relie que des articles existants.
- Les liens s'insèrent dans le corps des articles. **Je vous les soumettrai article par article.**

**H4. Les échéances sont passées et aucun article n'a d'`updatedDate`.**
- Le title de `2026-10-12-entra-memberof-groupes-dynamiques.md` dit « avant le 3 novembre ».
- Entra Agent ID annonce encore « Preview avril 2026 ».
- Le dossier DSPM garde son compte à rebours vers le 30 septembre.
- Le problème touche aussi `2026-10-19-copilot-televersement-agents-avances.md`, `2026-07-20-purview-entrainternetaccess.md` et `2026-05-05-dspm-unifie.md`.
- Correctif (scope `freshness`) : mise à jour des faits, puis `updatedDate`. **C'est du fond, à vous de valider** (avec `tic-redac-chef` pour la vérification des sources).

**H5. Cannibalisation entre `2026-05-05-dspm-unifie.md` et `2026-07-08-dossier-dspm.md`.** La brève annonce encore « un dossier complet arrive bientôt ».
- Correctif : dans la brève, un lien vers le dossier et une description corrigée (scope `frontmatter` et `linking`). **À vous de valider.**

**H6. Pas de `lastmod` dans le sitemap, et 4 ou 5 pages catégorie vides sont indexables** (`/blog/category/guides/{ia,autre,defender,purview,intune}/`, qui affichent « Aucun article »).
- Fichiers : `astro.config.mjs`, `src/pages/blog/category/[category]/[subcategory].astro`
- Correctif (scope `sitemap`) : `sitemap({ filter, serialize })`, avec `lastmod` égal à `updatedDate` ou à défaut `pubDate`, et l'exclusion des catégories vides. Code dans `findings/sitemap.md`.
- En complément (scope `head`) : `noindex` sur les pages catégorie sans article.

**H7. Google Fonts chargées par `@import` en tête du CSS**, ce qui bloque le rendu (Raleway, Cormorant Garamond). Les polices Atkinson sont préchargées mais jamais utilisées.
- Fichiers : `src/styles/global.css` ligne 1, `astro.config.mjs`, `src/components/BaseHead.astro`
- Correctif (scope `head`) : auto-héberger Raleway et Cormorant via l'API `fonts` d'Astro (`fontProviders.google()`), puis retirer l'`@import` et le préchargement Atkinson.

**H8. Absence d'en-têtes de sécurité et cache à `max-age=0` sur les assets hachés.**
- Fichier à créer : `public/_headers`
- Correctif (scope `config`) :

```
/*
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  X-Frame-Options: SAMEORIGIN
  Permissions-Policy: camera=(), microphone=(), geolocation=()
/_astro/*
  Cache-Control: public, max-age=31536000, immutable
```

**H9. `llms.txt` ne liste aucun article, n'a aucun lien Markdown, et sa « Politique IA » confond les robots d'entraînement et les robots de citation.**
- Fichier : `public/llms.txt`
- Correctif (scope `llms`) : le remplacer par l'endpoint `src/pages/llms.txt.ts`, généré au build depuis `getCollection('blog')`. Les liens s'écrivent `[titre](url)`. La politique distingue GPTBot, ClaudeBot et CCBot (entraînement) d'OAI-SearchBot, Claude-SearchBot et PerplexityBot (citation).

**H10. La page /blog/ casse sur mobile.**
- Constats :
  - La largeur est fixée à 960 px (la page mesure 960 px pour un écran de 375 px).
  - La colonne est collée à gauche sur desktop.
  - La page n'a pas de H1.
  - Les dates sont en anglais (« Oct 19, 2026 »).
- Fichiers : `src/pages/blog/index.astro` ligne 21, `src/components/FormattedDate.astro` ligne 11 (`'en-us'`)
- Correctif :

```diff
-width: 960px;
+width: 960px; max-width: calc(100% - 2rem); margin: 0 auto;
-date.toLocaleDateString('en-us', {
+date.toLocaleDateString('fr-FR', {
```

  plus un `<h1>` sur la page.
- Ces corrections sont de l'interface et ne rentrent dans aucun scope `seo:`. **Faut-il les committer en `seo: head` ou par un commit à part ?**

**H11. Pas de menu de navigation sur mobile** : `.nav-links { display: none; }` à 768 px, sans menu burger de remplacement.
- Fichier : `src/components/Header.astro` ligne 122
- Correctif : un menu repliable ou des liens réduits. C'est un choix de design, **à vous de décider**.

### Moyenne

- **Titles et descriptions hors cible.**
  - Constat : seuls 3 titles sur 21 font 55 à 60 caractères, et 3 descriptions sur 21 font 140 à 160 caractères.
  - Correctif (scope `frontmatter`) : réécriture, propositions dans `findings/content.md`.
  - **Les titres relèvent de la ligne éditoriale, je vous les soumettrai par lot.**
- **Le title de la home et celui de /blog/ sont génériques et identiques.**
  - Constat : `SITE_DESCRIPTION` ne contient aucun nom de produit et a un tiret cadratin.
  - Fichier : `src/consts.ts`
  - Proposition : `Blog d'expertise Microsoft par Daniel POLÒNIO : Intune, Entra ID, Defender, Purview et Copilot, guides et actualités en français.` (128 caractères).
  - Même chose pour les titres de catégorie avec tiret cadratin, dans `src/pages/blog/category/[category].astro`.
- **Images du hero et du corps sans `width`/`height`, `fetchpriority` ni lazy, avec un risque de CLS.**
  - Fichiers : `src/components/ArticleBanner.astro`, `src/pages/index.astro` ligne 43, `src/pages/blog/index.astro` (première carte en lazy).
  - Correctif (scope `head`) : `width="1200" height="630" fetchpriority="high" decoding="async"` sur le hero, et `loading="lazy"` sur les cartes à partir de la deuxième.
- **Alt d'images génériques ou absents.**
  - Constat : 14 images sur 15 de /blog/ n'ont pas d'alt. Ailleurs, les alt génériques sont « Banniere » et « SCHEMA 1 ».
  - Les alt dans les cartes passent par le gabarit. Ceux dans le corps des articles sont **à valider avec vous**.
- **Images lourdes.**
  - Constats :
    - 3 schémas `entraagentid` pèsent de 465 à 760 Ko.
    - `public/images/old/` fait 4,6 Mo, avec un doublon.
    - Les bannières `breve-copilot1.png` et `breve-purview1.png` dépassent 200 Ko.
    - Le logo de 428×303 px s'affiche en 64×45.
  - Correctif : conversion en WebP (`tic-illustrateur`).
  - `public/images/hero/copilot-televersement-agents-avances.jpg` (2 Mo, non suivi par git) **ne doit pas être commité**, car le `.webp` est déjà en place.
- **Pas de `src/pages/404.astro`** : la page 404 est celle de Netlify, en anglais. Correctif : une page 404 avec le Header et des liens vers les catégories.
- **Les guides `old-*` (2023) sont datés.**
  - Constats :
    - « Azure AD » apparaît partout.
    - Six guides annoncés « en cours de rédaction » depuis 2023.
    - `old-enrollautopilotcloud` promet de créer un profil mais ne va pas plus loin que les scénarios.
    - Ces guides n'ont pas de sources.
  - Prochaines étapes :
    - Consolider dans une page pilier « enrôlement Intune » (dossier `intune`), à vous de décider. C'est la priorité 1 de `findings/cluster.md`.
    - Avant de mettre à jour `old-enrollkme`, vérifier la KBA Samsung du 10/11/2026.
- **Deux dossiers sans `subcategory`.** Proposition : `purview` pour le dossier DSPM, et `entra` ou `ia` pour Entra Agent ID. Ce sont des valeurs du schéma Zod. Le classement est **à vous de valider**.
- **Chiffres sans source dans le passage même** : « 1,3 milliard d'agents » (Agent ID) et « 40 % des incidents » (DSPM). Correctif : la source dans la phrase, à faire avec `tic-redac-chef`.
- **Page /about/.**
  - Constats :
    - L'image a pour source `[object Object]` : `heroImage` reçoit un objet importé là où une chaîne est attendue.
    - Le mail est « à venir ».
    - Il y a des coquilles (« leparc », « séucrité »).
    - Un bandeau daté la fait passer pour un article.
  - Fichier : `src/pages/about.astro`
  - Les coquilles et le mail sont **à vous de valider**.
- **Le flux RSS n'est lié nulle part dans l'interface.** Correctif : un lien dans le `Footer.astro`.

### Basse

- **`public/robots.txt`.** `Disallow: /draft/` vise un chemin qui n'existe pas. C'est sans effet, je le garde. Claude-SearchBot et Claude-User ne sont pas nommés, mais la règle `*` les couvre.
- **`pubDate` décalée.** Quatre articles ont une `pubDate` différente de la date de leur nom de fichier (IntuneSuite, datawarehouse, phishing-triage, SSO). L'écart est d'un à deux jours sur `lastmod`.
- **Interface.**
  - Le slogan de l'en-tête fait 9 px, avec peu de contraste.
  - Les cibles tactiles mesurent 11 à 21 px de haut.
  - Les blocs de code débordent légèrement sur mobile.
  - Le tiret cadratin du sous-titre de l'accueil contredit la charte.
- **IndexNow** : non configuré, pertinent pour Bing et Copilot. Je le ferai après la mise en place de Bing Webmaster.
- **Brève baseline 26H2.** Elle affirme « deux changements, pas davantage », mais une v2 du package liée à Administrator protection est évoquée. À vérifier sur Tech Community (`tic-redac-chef`).

---

## Constats écartés

| Constat claude-seo | Raison |
|---|---|
| FAQPage et HowTo | Plus de rich result Google (HowTo depuis 2023, FAQ depuis mai 2026). Règle du plugin elle-même |
| Champs frontmatter `keywords`, `author`, `seoTitle` | Le profil interdit tout nouveau champ Zod sans votre validation, et rien ne les exige : le JSON-LD se contente des champs actuels |
| Renommage des slugs hétérogènes (`dossier-2026-...`, majuscules) | Casserait des URLs indexées pour un gain faible. Les majuscules redirigent déjà en 301 |
| Content-Signal, WebMCP, `ai-catalog.json`, `/.well-known/*`, livraison Markdown | Sans intérêt pour un blog statique, ou formats encore à l'état de brouillon |
| Wikipedia et Wikidata | Hors de portée d'un blog d'expert à court terme |
| Numéros MC dans le corps (DSPM, memberOf) | C'est une règle de style du `CLAUDE.md`, pas du SEO : à confier à `tic-redac-chef` |
| H2 en forme de question, encadrés « L'essentiel » | Changement de structure. À voir article par article à la prochaine relecture, pas en commit `seo:` |
| Moz, Bing, DataForSEO | Non activés. Moz et Bing sont gratuits : je les active si vous le demandez, DataForSEO est payant |
| Suppression de `heroImage` externes (wp.com, ytimg) | Tolérés sur l'existant d'après le `CLAUDE.md`. Seul le neuf est concerné |

---

## Corrections à valider (rien n'est encore appliqué)

**A. Corrections techniques**, applicables dès votre OK, un commit par scope :

| # | Scope | Fichiers | Contenu |
|---|---|---|---|
| 1 | `head` | `BaseHead.astro`, `BlogPost.astro`, `ArticleBanner.astro`, `[subcategory].astro` | og:image du hero, `og:type article`, `article:*`, auteur, og:url canonique, signature visible, dimensions et `fetchpriority` du hero, `noindex` des catégories vides (H1, C3, H6) |
| 2 | `schema` | `src/lib/schema.ts`, `JsonLd.astro`, `BaseHead.astro`, `BlogPost.astro`, `index.astro`, `about.astro` | WebSite, Organization, Person, BlogPosting, BreadcrumbList, ProfilePage (C2) |
| 3 | `sitemap` | `astro.config.mjs` | `lastmod` et filtre des catégories vides (H6) |
| 4 | `config` | `public/_headers`, `public/_redirects` | Sécurité, cache, 301 des URLs 2023 (H8, H2) |
| 5 | `llms` | `src/pages/llms.txt.ts` (remplace `public/llms.txt`) | Liste des articles générée au build, politique IA corrigée (H9) |
| 6 | `linking` | `old-windowsenroll.md`, `old-enrollautopilotcloud.md`, `old-enrollabm.md` | Les 5 liens cassés uniquement (H2) |
| 7 | `head` | `global.css`, `astro.config.mjs`, `BaseHead.astro` | Polices auto-hébergées (H7) |
| 8 | À décider | `blog/index.astro`, `FormattedDate.astro`, `src/pages/404.astro` | Largeur et H1 de /blog/, dates en français, page 404 (H10) |

**B. Corrections de fond ou de structure** : à vous de valider une par une, jamais appliquées d'office.
- **C1** : retrait de la note interne du dossier DSPM (urgent).
- **H4** : mise à jour de memberOf, Agent ID, DSPM et autres, avec `updatedDate`.
- **H5** : lien de la brève DSPM vers le dossier, nouvelle description.
- **H3** : matrice de maillage de 37 liens dans le corps des articles.
- **Moyenne** : titles et descriptions, `subcategory` des dossiers, page /about/, menu mobile (H11).
- **Page pilier** : page pilier enrôlement Intune et consolidation des guides `old-*`.

**C. Mesures à débloquer.**
- `/seo google setup` (Search Console et clé PageSpeed), avec `CLAUDE_SEO_PROFILE_DIR` défini, pour vérifier les canonicals `.fr` et mesurer les Core Web Vitals.
- Après validation de cet audit : `/seo drift baseline https://tuneincloud.fr`.
