# Performance et Core Web Vitals : tuneincloud.fr (audit du 2026-11-15)

## Méthode et limites (à lire d'abord)

- **Aucune donnée de terrain (CrUX)** : pas d'identifiants Google API. Les statuts LCP, INP et CLS ci-dessous ne sont donc PAS des mesures p75 réelles.
- **Aucune mesure lab Lighthouse** : l'API PageSpeed Insights a répondu "rate limit exceeded" (quota public sans clé) sur les 4 URL, mobile et desktop. Le lancement de Lighthouse en local (`npx lighthouse`) a été refusé par le système de permissions, je ne l'ai pas contourné. Il n'y a donc **ni score Lighthouse, ni LCP/INP/CLS chiffrés**.
- Ce qui a été mesuré réellement : TTFB et poids de transfert via curl (depuis la machine d'audit, pas d'un réseau mobile), en-têtes HTTP, HTML servi, taille des images et des polices, lecture du code local.
- Les scores /100 ci-dessous sont des **estimations d'audit statique**, pas un score Lighthouse. Ils sont à confirmer avec une clé PSI (`/seo google setup`) ou un run Lighthouse local.
- Pages testées : `/`, `/blog/`, `/blog/2026-10-19-copilot-televersement-agents-avances/`, `/blog/2026-07-08-dossier-dspm/`.
- Aucun avertissement de sandbox navigateur (aucun rendu Chromium lancé).

## Scores estimés

| Domaine | Score /100 | Justification |
|---|---|---|
| Performance | **68** | Base excellente (statique, edge Netlify, TTFB ~0,18 s, HTML 15-48 Ko, Brotli) minorée par la chaîne Google Fonts bloquante, l'absence de cache longue durée, les images externes et l'absence de priorisation du LCP. |
| Images | **45** | Un hero JPG de 2 Mo non compressé en attente de commit, 108 PNG contre 8 WebP, images hero externes non maîtrisées (jusqu'à 434 Ko), aucune dimension sur les images de contenu et les cartes de la home, aucun `fetchpriority`. |

## Core Web Vitals : statut estimé (non mesuré)

| Métrique | Seuil | Statut estimé | Raisonnement |
|---|---|---|---|
| LCP | 2,5 s | **Risque moyen** (probable "Needs improvement" sur mobile 4G sur articles à hero externe) | TTFB bon (0,17-0,20 s). Mais le hero d'article est dans un `<img>` sans `fetchpriority`, la chaîne CSS puis Google Fonts retarde le rendu. Dossier DSPM : hero YouTube externe (120 Ko, domaine tiers à connecter). |
| INP | 200 ms | **Probablement bon** | Aucun JS applicatif notable détecté (site Astro statique, pas d'îlots hydratés vus dans le HTML). |
| CLS | 0,1 | **Risque moyen à élevé** | Images de contenu (`![SCHEMA n]`, bannière) sans width/height, `<img>` des cartes de la home sans dimensions, polices web avec `swap` et fallback non ajusté (Raleway/Cormorant). |

## Mesures réelles collectées

| URL | TTFB | Total HTML | Taille HTML |
|---|---|---|---|
| `/` | 0,195 s | 0,205 s | 17,8 Ko |
| `/blog/` | 0,173 s | 0,181 s | 17,0 Ko |
| article Copilot | 0,195 s | 0,202 s | 15,6 Ko |
| dossier DSPM | 0,178 s | 0,220 s | 48,1 Ko |

TTFB sous le seuil de 0,8 s sur les 4 pages. Compression Brotli active. Un seul fichier CSS applicatif (5,7 Ko).

## Constats

### Critique

**C1. Polices Google Fonts chargées par `@import` dans le CSS (chaîne bloquante).**
- Fichier : `src/styles/global.css` ligne 1 (`@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond...&family=Raleway...&display=swap')`).
- Constat vérifié en prod : le CSS compilé `/_astro/Header.CpkjM_gl.css` commence par ce `@import`. Cascade : HTML, puis CSS, puis feuille googleapis.com, puis fichiers woff2 sur gstatic.com. Deux connexions tierces (DNS+TLS) avant tout texte final, aucun `preconnect`. Le CSS étant bloquant, le premier rendu attend toute la chaîne. Impact direct sur FCP et LCP, surtout en mobile.
- Polices utilisées : Raleway (300/400/500/600) et Cormorant Garamond (300/400/600/700 + italiques 300/400), soit jusqu'à 10 variantes. Cormorant sert au titre du bandeau d'article (`src/components/ArticleBanner.astro`, `.banner-title`), donc l'élément LCP textuel potentiel.
- Correction : auto-héberger via le système de polices Astro déjà en place (`astro.config.mjs`, `fontProviders.fontsource()` ou `google()` avec téléchargement au build), ne garder que les graisses utilisées, `<Font ... preload />` uniquement pour la police du titre, supprimer le `@import`. Gain attendu : -300 à -800 ms de LCP mobile, CLS réduit avec fallback ajusté.

**C2. Hero JPG de 2 Mo non commité.**
- Fichier : `public/images/hero/copilot-televersement-agents-avances.jpg` (2 043 868 octets, non suivi par git). Le `.webp` correspondant (44 732 octets) est bien celui référencé par l'article et déployé. Risque : un `git add` mal ciblé publierait 2 Mo inutiles dans `public/` (Netlify le servirait). Ne pas le committer, le déplacer hors de `public/` (par exemple `editorial/assets/`) ou le supprimer.
- Le hero lui-même (webp 44,7 Ko) est conforme à la règle < 200 Ko.

### Haute

**H1. Image hero d'article non priorisée, sans dimensions.**
- Fichier : `src/components/ArticleBanner.astro`, ligne `<img src={heroImage} alt="" />` (bandeau de 250 px, image en fond via CSS `object-fit: cover`).
- Constat prod (article Copilot) : `<img src="/images/hero/...webp" alt="">` sans `width`, `height`, `fetchpriority`, `decoding`. C'est probablement l'élément LCP (ou le titre H1 par-dessus). Sans `fetchpriority="high"` le navigateur découvre l'image après le CSS et la priorise comme une image ordinaire.
- Correction : `<img src={heroImage} alt="" width="1200" height="630" fetchpriority="high" decoding="async" />` (sans `loading="lazy"`), ou passer par le composant `<Image>` d'Astro (srcset + dimensions auto). Le bandeau ne fait que 250 px de haut : servir une version ~1200x400 ou un `srcset` plutôt que 1200x630.

**H2. Images hero externes (hotlinking) sur l'existant, dont le LCP du dossier DSPM.**
- Fichiers : frontmatter de `src/content/blog/2026-07-08-dossier-dspm.md` (hero `i.ytimg.com`, 119 696 octets, JPG), et sur la home/blog : `sbd.org.uk` (26 Ko, webp), `i0.wp.com/workingtogether.fun/...wn.png` (**433 986 octets, PNG, 1,05 s**), `ordunix.net` (63 Ko), `tbourke-solutions.com.au` (157 Ko).
- Problèmes : connexions tierces supplémentaires (DNS+TLS par domaine), aucun contrôle de poids ni de disponibilité (une image supprimée casse la carte), format PNG de 434 Ko visible en haut de la home, risque de droits d'auteur. Sur le dossier DSPM, l'image LCP vient de ytimg.com : TTFB image tierce non maîtrisé.
- Correction : rapatrier en `public/images/hero/<slug>.webp` (1200x630, < 200 Ko) pour les articles existants, ou régénérer un hero. La règle du projet tolère l'externe sur l'existant, mais c'est le premier levier LCP sur ces pages.

**H3. Aucun cache longue durée sur les assets ; pas de `_headers`/`netlify.toml`.**
- Constat prod : `Cache-Control: public,max-age=0,must-revalidate` sur les images (`/images/...webp`) et même sur les polices `/_astro/fonts/*.woff` (fichiers pourtant hachés). Chaque retour de visiteur revalide tout (304 au mieux).
- Fichiers absents : `netlify.toml` et `public/_headers`.
- Correction : créer `public/_headers` avec `Cache-Control: public, max-age=31536000, immutable` pour `/_astro/*` (hachés), et `max-age=2592000` (ou plus) pour `/images/*`. Gain : repeat views et navigation entre articles nettement plus rapides.

**H4. Images de contenu des articles sans dimensions ni lazy-loading.**
- Fichiers : rendu Markdown (`![SCHEMA 1](...)`, `![Banniere](...)`) dans `src/content/blog/*.md`, gabarit `src/layouts/BlogPost.astro`.
- Constat prod : `<img src="/images/banarticle/breve-copilot1.png" alt="Banniere">` et `<img src="/images/schemas/purview-dspm-archiglobale.png" alt="SCHEMA 1">` sans `width`, `height`, `loading`, `decoding`. Chaque image provoque un décalage de mise en page au chargement (CLS), et les schémas bas de page sont chargés immédiatement.
- Correction : ajouter un plugin rehype (ou une règle globale CSS `img{max-width:100%;height:auto}` plus un plugin qui injecte `width/height` et `loading="lazy"`) ou migrer les images vers `src/assets/` avec `<Image>`. Pour la bannière 748x172 : `aspect-ratio: 748/172` en CSS en attendant.

### Moyenne

**M1. PNG lourds et non WebP.**
- 108 PNG contre 8 WebP dans `public/images/` (dossier de 11 Mo). Plus de 200 Ko :
  - `schemas/entraagentid-archiglobale.png` 759 671 o
  - `schemas/entraagentid-licence.png` 564 554 o
  - `schemas/entraagentid-hierachie.png` 465 181 o
  - `old/titre-windows-autopilotfullcloud.png` et `-1.png` 291 881 o chacun (doublon)
  - `old/titre-android1-1.png` 251 721 o, `old/titre-apple-2.png` 243 467 o, `old/titre-android4.png` 232 089 o, `old/titre-windows2-1.png` 215 272 o, `old/titre-apple-3.png` 212 147 o, `old/titre-windows3.png` 206 924 o
  - `banarticle/breve-copilot1.png` 214 746 o (servi sur l'article Copilot), `banarticle/breve-purview1.png` 207 028 o
- Bannières de 748x172 px à 215 Ko en PNG : anormalement lourdes pour cette taille. En WebP/PNG quantifié elles passeraient sous 30 Ko. `scripts/make-banner.mjs` devrait produire du WebP ou un PNG palette (pngquant).
- Schémas du dossier DSPM : 142 Ko + 39 Ko + 53 Ko, acceptables, mais en WebP sans perte -40 %.
- Dossier `public/images/old/` (4,6 Mo) : vérifier s'il est encore référencé, sinon supprimer du déploiement.

**M2. Logo en PNG surdimensionné.**
- Fichier : `src/components/Header.astro` (`<img src="/tuneincloud.png" width="64" height="45">`). Source 428x303 (17,5 Ko) affichée à 64x45 : 6x trop grande. Dimensions déclarées (bien, pas de CLS). Correction : version 128x91 en WebP/SVG, ou `<Image>`. Le logo charge sur chaque page.

**M3. Polices Atkinson préchargées mais apparemment inutilisées.**
- Fichiers : `src/components/BaseHead.astro` (`<Font cssVariable="--font-atkinson" preload />`) et `astro.config.mjs`. Deux `<link rel="preload" as="font">` (22,8 Ko + 23,8 Ko) sur toutes les pages. Aucune référence à `--font-atkinson` ni `Atkinson` dans `src/styles/global.css` : le site utilise Raleway et Cormorant. Ces préchargements concurrencent le CSS et le hero pour la bande passante sans servir. À vérifier puis supprimer (ou faire d'Atkinson la vraie police auto-hébergée de remplacement, cf. C1).

**M4. Cartes de la home sans dimensions ni lazy-loading.**
- Fichier : `src/pages/index.astro` ligne 43 (`<img src={post.data.heroImage} alt={post.data.title} />`). Aucun `width/height`, aucun `loading`, aucun `fetchpriority`. Risque de CLS dans la grille, et toutes les images (dont celle de 434 Ko) sont chargées dès le départ. Appliquer `width/height` (ou `aspect-ratio` sur `.post-image-wrap`), `loading="lazy"` sauf la première carte (`fetchpriority="high"`).
- À noter, positif : `src/pages/blog/index.astro` ligne 99 utilise `<Image width={720} height={360}>` avec `loading="lazy" decoding="async"`. Mais l'image sera optimisée par Astro uniquement pour les sources locales ou domaines autorisés (`image.domains` non configuré dans `astro.config.mjs` : les externes sont servies telles quelles). La première carte (au-dessus de la ligne de flottaison) est aussi en lazy, ce qui retarde potentiellement le LCP de `/blog/`. Mettre `loading="eager" fetchpriority="high"` sur la première.

### Basse

**B1. Pas de `preconnect`/`dns-prefetch`** vers `fonts.googleapis.com` / `fonts.gstatic.com` tant que C1 n'est pas corrigé (palliatif en attendant l'auto-hébergement).

**B2. `og:image` de `BaseHead.astro`** utilise l'image de repli `blog-placeholder-1.jpg` sauf si `image` est passée : sans lien direct avec les CWV, mais le placeholder du template Astro est servi pour tous les partages (SEO social, à traiter dans le rapport contenu/technique).

**B3. Hero 1200x630 pour un bandeau de 250 px** : l'image est recadrée par `object-fit: cover`. Un hero 1200x400 économiserait ~35 % de pixels (sans impact tant que le webp reste < 50 Ko).

**B4. Pas de `rel="prefetch"`/Speculation Rules** : optionnel, pertinent pour la navigation home vers article sur un site statique.

## Points positifs

- Site statique sur CDN edge Netlify, TTFB 0,17 à 0,20 s (seuil 0,8 s).
- HTML léger (15-48 Ko), Brotli actif, un seul CSS de 5,7 Ko, aucun JavaScript applicatif notable.
- Hero Copilot en WebP de 44,7 Ko (conforme à la règle < 200 Ko), hero Intune en WebP 17 Ko.
- `/blog/` : `<Image>` avec dimensions, `loading="lazy"`, `decoding="async"`.
- Logo avec width/height. Polices Atkinson avec `display: swap`.

## Ordre de traitement recommandé (impact attendu)

1. C1 : auto-héberger les polices et supprimer le `@import` (LCP/FCP, CLS).
2. H1 + M4 : `fetchpriority="high"` et dimensions sur le hero d'article ; première carte de `/` et `/blog/` en eager.
3. H3 : `public/_headers` avec cache immutable (visites répétées).
4. H2 : rapatrier les hero externes, en commençant par `wn.png` (434 Ko) et le hero YouTube du dossier DSPM.
5. H4 + M1 : dimensions/lazy sur images Markdown ; convertir bannières et schémas lourds en WebP ; nettoyer `images/old/`.
6. C2 : sortir le JPG de 2 Mo de `public/` avant tout commit.
7. M3, M2 : retirer les préchargements Atkinson inutiles, redimensionner le logo.

## Pour obtenir des mesures réelles

- Lancer `/seo google setup` (clé API PSI gratuite) puis `pagespeed_check.py` et `crux_history.py` ; ou exécuter Lighthouse localement après autorisation. Le CrUX pourrait renvoyer 404 si le trafic est insuffisant (site récent), auquel cas seul le lab reste utilisable.
