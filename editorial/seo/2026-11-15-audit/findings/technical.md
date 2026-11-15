# Audit technique, tuneincloud.fr (2026-11-15)

Score Technique : **66/100**

## Statut par catégorie
- Crawlabilité : OK (robots.txt valide, sitemap-index.xml -> sitemap-0.xml, 35 URLs en 200). Réserve : `Disallow: /draft/` inutile.
- Indexabilité : à améliorer (5 pages catégories vides dans le sitemap, aucune méta robots).
- Canonicals : OK (absolues, https apex, `src/components/BaseHead.astro`).
- Redirections : OK (http -> https 301, www -> apex 301, `/blog` -> `/blog/` 301, `/blog/...Majuscules/` -> minuscules 301, tous en un saut).
- Sécurité : insuffisant (HSTS seul).
- 404 : statut 404 correct, mais page Netlify par défaut (pas de `src/pages/404.astro`).
- Mobile : viewport présent (BaseHead). Pas de contrôle des cibles tactiles par la source seule.
- JS rendering : OK, HTML statique SSG, aucun rendu client requis.
- Données structurées : absentes.

## Constats

### Haute
1. **Aucune donnée structurée (JSON-LD)** sur l'accueil et les articles. Pour un site "publisher", il manque Organization/WebSite (accueil), Article/BlogPosting + Person (auteur, datePublished, dateModified) dans `src/layouts/BlogPost.astro`. Impact : rich results, signaux E-E-A-T, citations IA.
2. **Métadonnées sociales erronées sur les articles.** `src/layouts/BlogPost.astro` appelle `BaseHead` sans `image` : `og:image`/`twitter:image` = `blog-placeholder-1.jpg` (`/_astro/blog-placeholder-1.*.jpg`) pour tous les articles, malgré le `heroImage` du frontmatter. Et `og:type` reste `website` (`BaseHead.astro`) au lieu de `article`. Correction : passer `heroImage` à BaseHead (URL absolue), prop `type`.
3. **En-têtes de sécurité quasi absents.** Seul `Strict-Transport-Security: max-age=31536000` est renvoyé (sans `includeSubDomains`/`preload`). Manquent : `X-Content-Type-Options: nosniff`, `Referrer-Policy`, `X-Frame-Options` ou `frame-ancestors` CSP, `Permissions-Policy`, CSP. Aucun `netlify.toml` ni `public/_headers` dans le dépôt. Créer `public/_headers` (ou `netlify.toml` section `[[headers]]`).

### Moyenne
4. **5 pages sous-catégories vides (thin) dans le sitemap** : `/blog/category/guides/{autre,defender,ia,intune,purview}/` (0 article). Générées par `src/pages/blog/category/[category]/[subcategory].astro` et listées dans sitemap-0.xml. Correction : ne générer que les combinaisons ayant du contenu (getStaticPaths filtré) ou ajouter `noindex` + exclusion du sitemap (`filter` de `@astrojs/sitemap` dans `astro.config.mjs`). Aussi `/blog/category/dossiers/` et `/blog/category/guides/` n'ont qu'1 article (maigre).
5. **Titres et descriptions de pages génériques.** Accueil : description "Blog Expertise par Daniel Polònio — Actualités, guides et tutoriels en français." sans mots-clés (Intune/Entra/Defender/Purview). Catégories : description "Articles X sur Microsoft Intune" (`src/pages/blog/category/[category].astro`), titres avec tiret cadratin. Pas de balise `meta robots` explicite (acceptable).
6. **Images hero externes et sans dimensions.** `src/components/ArticleBanner.astro` charge des images tierces (ex. `dirteam.com/.../Entra.png`) : dépendance externe, risque de lien mort, LCP non maîtrisé. `<img>` sans `width`/`height`/`loading`/`fetchpriority` (bannière markdown `alt="Banniere"` peu descriptif) : risque de CLS et accessibilité. Le logo `/tuneincloud.png` est correctement dimensionné.
7. **Pas de page 404 personnalisée** (`src/pages/404.astro` absent) : la page Netlify par défaut est servie (statut 404 correct, titre "Page not found" en anglais, aucune navigation vers le contenu).

### Basse
8. **Deux fichiers sources en majuscules** (`2026-04-16-IntuneSuite-in-M365.md`, `2026-05-18-SSO-Linux-MacOS.md`) : URL publique en minuscules, l'ancienne casse redirige bien en 301. Pas d'action urgente, mais éviter les liens externes avec majuscules.
9. **robots.txt** : le `Disallow: /draft/` vise un chemin inexistant publiquement (les brouillons sont hors `src/pages`) ; bloc de ~13 user-agents IA redondant avec `User-agent: *` (inoffensif). `Sitemap:` pointe vers sitemap-index.xml (valide, 200).
10. **Cache** : `Cache-Control: public,max-age=0,must-revalidate` sur tout, y compris `/_astro/*` ? (à vérifier, Netlify met normalement un cache long sur les assets hachés). Pas de problème pour le HTML.
11. **Pas de `lastmod` dans le sitemap** (configuration `sitemap()` par défaut dans `astro.config.mjs`) : ajouter `lastmod` via `serialize` à partir de `updatedDate`/`pubDate`.

### Info
- Domaine canonique cohérent : `site: 'https://tuneincloud.fr'` (`astro.config.mjs`), canonical live `https://tuneincloud.fr/`, RSS `/rss.xml` en 200, `llms.txt` présent dans `public/`.
- Aucune URL `.com` ni en majuscules dans le sitemap. 21 articles pour 35 URLs.
- CWV estimés (source seule, à confirmer avec CrUX/PSI) : LCP probablement bon sur HTML statique (CDN Netlify), risque modéré si l'image hero externe est le LCP ; INP bon (peu de JS) ; CLS faible risque hors images sans dimensions. Police locale `font-display: swap` préchargée (bon).
- Rendu : SSG, contenu complet dans le HTML initial.
- IndexNow : non implémenté (optionnel, Bing/Yandex).
- Sandbox navigateur : aucun rendu Playwright utilisé (curl et lecture du dépôt uniquement).

## Score (détail indicatif)
Crawlabilité 18/20, Indexabilité 11/15, Sécurité 4/15, URLs/redirections 10/10, Mobile 8/10, CWV 8/10, Données structurées 0/10, JS rendering 5/5, 404/divers 2/5 = ~66/100.
