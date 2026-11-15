# Audit sitemap — tuneincloud.fr (2026-11-15)

Périmètre : `sitemap-index.xml` → `sitemap-0.xml` (@astrojs/sitemap, `sitemap()` sans option dans `astro.config.mjs`). Hors périmètre : sitemaps locaux, hreflang.

## Validation (script sitemap_discovery.py + vérifications manuelles)

| Contrôle | Résultat |
|---|---|
| Index déclaré dans robots.txt (`Sitemap: https://tuneincloud.fr/sitemap-index.xml`) | OK, HTTP 200, XML valide |
| Fichiers | 2 (1 index, 1 urlset), 35 URL, 35 uniques, 0 doublon, 0 loc invalide |
| Limites 50 000 URL / 50 Mo | OK (2 957 octets) |
| Hôte unique (`tuneincloud.fr`), pas de cross-host, pas de token/session | OK |
| Statut HTTP des 35 URL (testées une par une) | 35 × HTTP 200, 0 redirection |
| Canonical des pages | OK : `BaseHead.astro` produit `https://tuneincloud.fr/...` identique à l'URL listée (testé sur articles et catégories) |
| Chemins courants `/sitemap.xml`, `/sitemap_index.xml`, `/wp-sitemap.xml` | 404 (normal, pas d'alias) |
| `lastmod` | ABSENT sur les 35 URL (0/35) |
| priority / changefreq | Absents (bien) |
| Cohérence robots.txt | OK : seul `Disallow: /draft/`, aucune URL du sitemap n'est bloquée. `/draft/` renvoie 404 et n'est pas listé |

## Couverture vs articles publiés

21 fichiers dans `src/content/blog/` (13 datés, 1 `dossier-2026-04-15-entra-agent-id`, 7 `old-*`). Les 21 sont dans le sitemap (21/21), aucun article manquant, aucune URL orpheline. Les identifiants en minuscules sont corrects (ex. `2026-04-16-IntuneSuite-in-M365.md` → `/blog/2026-04-16-intunesuite-in-m365/`, `2026-05-18-SSO-Linux-MacOS.md` → `/blog/2026-05-18-sso-linux-macos/`).

Répartition des 35 URL : 3 pages (`/`, `/about/`, `/blog/`), 21 articles, 11 pages catégorie.

## Constats

### Critique
Aucun. Le sitemap est valide, accessible, déclaré dans robots.txt et sans erreur HTTP.

### Haute

1. **Pages catégorie vides dans le sitemap (3 pages, plus 1 mince)**. Fichier : `src/pages/blog/category/[category]/[subcategory].astro` (`getStaticPaths` génère les 8 sous-catégories en dur, sans tenir compte du contenu).
   - Vides (« Aucun article dans cette sous-catégorie pour le moment », 0 article) : `/blog/category/guides/ia/`, `/blog/category/guides/autre/`, `/blog/category/guides/defender/`, `/blog/category/guides/purview/` (soit 4 pages vides, HTTP 200, indexables, canonical vers elles-mêmes, sans noindex).
   - Minces : `/blog/category/guides/entra/` (1 article), `/blog/category/dossiers/` (2 articles), `/blog/category/actualites/articles/` (2 articles).
   - Risque : soft 404 / contenu mince listé comme page à indexer, dilution du budget de crawl et du signal de qualité d'un site de ~21 articles (11 des 35 URL sont des pages de liste).
   - Correctif : à la fois exclure du sitemap (filter ci-dessous) ET, idéalement, ne générer les routes que pour les sous-catégories non vides ou ajouter `<meta name="robots" content="noindex">` quand `posts.length === 0`. Ne pas combiner sitemap + noindex incohérent : une page noindex ne doit pas être dans le sitemap.

2. **`lastmod` absent sur toutes les URL (0/35)**. Fichier : `astro.config.mjs` (`sitemap()` sans `serialize`). Google s'appuie sur `lastmod` fiable pour la fraîcheur ; le projet vise aussi le GEO (citations IA). Aucun champ `updatedDate` n'est utilisé à ce jour dans les 21 articles, donc `lastmod` = `pubDate`. Voir config proposée.

### Moyenne

3. **Les 7 articles `old-*` (2023, guides Intune migrés de WordPress) sont dans le sitemap**. Fichiers : `src/content/blog/old-*.md`. Ils répondent 200 et sont canoniques, donc ne sont pas une erreur. À arbitrer : si leur contenu est daté ou mince, les retirer du sitemap (ou mettre à jour et renseigner `updatedDate`). Ne pas les supprimer sans redirection 301 depuis les anciennes URL WordPress de `tuneincloud.com`.

4. **Nommage d'URL hétérogène**. Fichiers : `dossier-2026-04-15-entra-agent-id.md` (préfixe `dossier-` avant la date, contrairement à la convention `YYYY-MM-DD-<slug>`), `old-*` (sans date), `2026-04-29-article-*` (mot « article » dans le slug). Aucun impact sitemap, mais toute renommée casse les URL : prévoir une redirection 301 dans `public/_redirects` (Netlify).

5. **Pages `/about/` et `/blog/` sans `lastmod`** : couvert par la config ci-dessous (dates dérivées du contenu le plus récent).

### Basse

6. **Namespaces XML inutiles** (`news`, `xhtml`, `image`, `video`) déclarés dans l'urlset : comportement par défaut de @astrojs/sitemap, sans effet. Ignorer.
7. **`/blog/category/guides/`, `/blog/category/actualites/` et `/blog/category/actualites/breves/`** (8 à 9 articles) sont corrects ; à garder.
8. **Pas de sitemap-news** : inutile pour ce blog (pas de Google News).
9. **Dates `pubDate` vs date du nom de fichier divergentes** : `2026-04-16-IntuneSuite-in-M365.md` (pubDate 2026-04-14), `2026-04-27-intune-datawarehouse.md` (2026-04-26), `2026-04-29-article-phishing-triage-agent.md` (2026-04-27), `2026-05-18-SSO-Linux-MacOS.md` (2026-05-19). Le `lastmod` dérivé de `pubDate` sera donc légèrement différent de la date du fichier. À corriger au moment d'une mise à jour réelle (le publieur fixe normalement les deux).

## Config @astrojs/sitemap proposée (non appliquée)

À placer dans `C:\Users\Dany\tuneincloud\astro.config.mjs`. Les routes (catégories vides) sont calculées au build à partir du contenu, sans liste à maintenir. Prérequis : le `lastmod` des articles vient du frontmatter ; la config lit les fichiers via `node:fs` et `import.meta` n'est pas nécessaire.

```js
// @ts-check
import fs from 'node:fs';
import path from 'node:path';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig, fontProviders } from 'astro/config';

const SITE = 'https://tuneincloud.fr';
const BLOG_DIR = path.resolve('./src/content/blog');

// Lecture légère du frontmatter : id (nom en minuscules) -> {cat, sub, lastmod}
function readPosts() {
  const posts = [];
  for (const f of fs.readdirSync(BLOG_DIR)) {
    if (!/\.mdx?$/.test(f)) continue;
    const raw = fs.readFileSync(path.join(BLOG_DIR, f), 'utf8');
    const fm = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/)?.[1] ?? '';
    const get = (k) => fm.match(new RegExp(`^${k}:\\s*"?([^"\\r\\n#]+?)"?\\s*(?:#.*)?$`, 'm'))?.[1];
    posts.push({
      id: f.replace(/\.mdx?$/, '').toLowerCase(),
      category: get('category'),
      subcategory: get('subcategory'),
      date: get('updatedDate') ?? get('pubDate'),
    });
  }
  return posts;
}

const posts = readPosts();
const lastmodById = new Map(posts.map((p) => [p.id, p.date]));
const newest = (list) => list.map((p) => p.date).filter(Boolean).sort().at(-1);
const inCat = (cat, sub) =>
  posts.filter((p) => p.category === cat && (!sub || p.subcategory === sub));

// Pages de liste dont le lastmod = article le plus récent qu'elles listent
function listLastmod(pathname) {
  const m = pathname.match(/^\/blog\/category\/([^/]+)(?:\/([^/]+))?\/$/);
  if (m) return newest(inCat(m[1], m[2]));
  if (pathname === '/blog/' || pathname === '/') return newest(posts);
  return undefined;
}

// Seuil : une page catégorie doit lister au moins N articles pour être indexée
const MIN_ARTICLES_CATEGORY = 3;

// Anciens guides WordPress à exclure si jugés obsolètes (laisser vide pour tout garder)
const EXCLUDE_ARTICLES = []; // ex. ['/blog/old-enrollkme/']

export default defineConfig({
  site: SITE,
  integrations: [
    mdx(),
    sitemap({
      filter: (page) => {
        const { pathname } = new URL(page);
        if (EXCLUDE_ARTICLES.includes(pathname)) return false;
        const m = pathname.match(/^\/blog\/category\/([^/]+)(?:\/([^/]+))?\/$/);
        if (m) return inCat(m[1], m[2]).length >= MIN_ARTICLES_CATEGORY;
        return true;
      },
      serialize: (item) => {
        const { pathname } = new URL(item.url);
        const id = pathname.match(/^\/blog\/([^/]+)\/$/)?.[1];
        const date = (id && lastmodById.get(id)) || listLastmod(pathname);
        if (date) item.lastmod = new Date(date).toISOString();
        return item; // ni priority ni changefreq
      },
    }),
  ],
  // ... fonts inchangé
});
```

Notes d'application :
- Avec `MIN_ARTICLES_CATEGORY = 3`, restent dans le sitemap : `/blog/category/actualites/`, `/blog/category/actualites/breves/`, `/blog/category/guides/`, `/blog/category/guides/intune/`. Sont retirés : `guides/ia`, `guides/autre`, `guides/defender`, `guides/purview` (vides), `guides/entra` (1), `dossiers` (2), `actualites/articles` (2). Le sitemap passe de 35 à 28 URL. Un seuil de 1 retirerait seulement les 4 pages vides (31 URL) : choix éditorial, et `/blog/category/dossiers/` redeviendra légitime dès 3 dossiers.
- Le filtre `inCat(m[1], m[2])` couvre aussi `/blog/category/dossiers/` (les dossiers n'ont pas de sous-catégorie dans les URL générées).
- Parsing du frontmatter volontairement minimal pour éviter d'importer `astro:content` dans la config (impossible à ce stade). Les dates sans guillemets (`2026-10-07`) sont gérées.
- Quand une mise à jour significative d'un article est faite, renseigner `updatedDate` : le `lastmod` suit automatiquement. Ne pas toucher `updatedDate` pour une correction de forme (règle Google : lastmod = changement significatif).
- Valider ensuite : `npm run build`, puis contrôler `dist/sitemap-0.xml` (35 → 28 URL, `<lastmod>` présent partout), puis resoumettre dans Search Console.
- Action complémentaire hors config (fichier `src/pages/blog/category/[category]/[subcategory].astro`) : ajouter noindex quand `posts.length === 0`, ou ne générer que les routes non vides. Aucune modification faite dans le cadre de cet audit.
