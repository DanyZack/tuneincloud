# Audit Schema.org / données structurées : tuneincloud.fr

Date : 2026-11-15. Site type : publisher. Lecture seule (aucun fichier du site modifié).
Pages testées (HTTP 200, HTML brut, site statique Astro, pas de SPA) : `/`, `/about/`, `/blog/`,
`/blog/2026-10-08-intune-baseline-windows-11-26h2/`, `/blog/dossier-2026-04-15-entra-agent-id/`.

## Score Schema : 4 / 100

| Critère | Poids | Note |
|---|---|---|
| Présence de JSON-LD | 30 | 0 |
| Entités éditeur (WebSite, Organization, Person) | 20 | 0 |
| Schéma article (BlogPosting) complet | 25 | 0 |
| BreadcrumbList / ProfilePage | 10 | 0 |
| Méta de base cohérentes (canonical, og, description) | 15 | 4 (canonical et description OK, og:type et og:image faux) |

## 1. Détection

- JSON-LD : **0 bloc** sur les 5 pages. Microdata : aucun (`itemscope` absent). RDFa : aucun.
- `BaseHead.astro` n'émet que des balises meta (canonical absolu correct, OG, Twitter). Aucun `<script type="application/ld+json">`.
- Aucune dépendance schema (pas de `astro-seo-schema`, pas de composant JsonLd).

## 2. Validation

Rien à valider côté blocs (aucun existant). Constats sur le balisage adjacent, qui conditionne
la qualité des entités :

| Élément | État | Problème |
|---|---|---|
| `og:type` | `website` partout | Devrait être `article` sur les articles |
| `og:image` / `twitter:image` | `blog-placeholder-1.jpg` sur toutes les pages, y compris les articles | `heroImage` du frontmatter n'est jamais transmis à `BaseHead` (BlogPost.astro ligne 15 ne passe que title et description) |
| `<h1>` | présent | OK |
| canonical | absolu, avec slash final | OK |
| Liens du Header/Footer | `/blog/category/guides` sans slash final | Incohérence avec les canonical (redirection 301 probable), à uniformiser |

## 3. Constats

### Critique

- **C1. Aucun JSON-LD sur tout le site.** Pas d'entité WebSite, Organization, Person ni BlogPosting. Pour un site éditeur dont l'argument est l'expertise d'un auteur unique, c'est le manque principal (E-E-A-T, citations IA/GEO, désambiguïsation de l'auteur). Correctif : composant ci-dessous.

### Haute

- **H1. Pas de BlogPosting sur les 21 articles.** Les données existent déjà dans le frontmatter (title, description, pubDate, updatedDate, heroImage, category) : zéro champ à ajouter.
- **H2. Auteur non lié à une entité.** `/about/` n'est pas relié aux articles. Person doit avoir un `@id` stable, `url` = `/about/`, `sameAs` = LinkedIn et GitHub.
- **H3. `heroImage` ignoré pour les métadonnées.** og:image est le placeholder partout. Corriger dans `BaseHead` (prop `image` en URL string) : sert aussi le champ `image` du BlogPosting.
- **H4. Hero externes sur l'existant.** 12 articles sur 21 ont `heroImage` en URL externe (ex. learn.microsoft.com pour le dossier Entra Agent ID). Dans le JSON-LD, c'est une image dont vous n'avez pas les droits : à migrer vers `/images/hero/<slug>.webp` (règle déjà posée dans CLAUDE.md).

### Moyenne

- **M1. Pas de WebSite + Organization sur la home.** Utile pour le nom du site dans les SERP (`name`, `alternateName`) et le lien avec Cladéys.
- **M2. Pas de BreadcrumbList sur les articles.** Fil d'Ariane visible absent aussi (BreadcrumbList doit refléter un parcours réel : Accueil > Blog > catégorie > article, les pages `/blog/category/...` existent).
- **M3. `/about/` sans ProfilePage.** Cette page utilise le layout BlogPost avec `pubDate` fictif (23 avril 2026) : ne doit pas produire de BlogPosting. Elle reçoit un ProfilePage avec Person en `mainEntity`.
- **M4. `og:type`** à passer à `article` sur les articles (prop à ajouter à `BaseHead`).
- **M5. `heroImage` de `/about/`** est un import Astro (objet ImageMetadata) passé à une prop typée `string` : à vérifier que `ArticleBanner` n'affiche pas `[object Object]`. Le builder ci-dessous gère les deux cas.

### Basse

- **B1. `CollectionPage`/`Blog` sur `/blog/`** : optionnel. Proposé en option, sans enjeu de rich result.
- **B2. `inLanguage: fr-FR`, `articleSection`, `keywords`** : `articleSection` dérivable de `category`. `keywords` nécessiterait un champ de frontmatter : **à valider**, non recommandé tel quel.
- **B3. Slash final** : uniformiser les liens internes avec les canonical.

### Non recommandé (volontairement)

- HowTo : retiré par Google. Les guides ne reçoivent pas de balisage HowTo.
- FAQPage : plus de rich result Google depuis mai 2026. Non proposé.
- `Review`, `AggregateRating`, `Product` : sans objet.
- Aucune URL `sameAs` inventée : uniquement LinkedIn et GitHub fournis. Pas de page X, YouTube, etc.

## 4. Valeurs à valider avant mise en ligne

- **Logo Organization** : `https://tuneincloud.fr/tuneincloud.png` existe dans `public/`. Dimensions à vérifier (Google demande un logo exploitable, idéalement carré, min. 112x112 px).
- **Lien TuneInCloud / Cladéys** : `parentOrganization` vers `https://cladeys.fr` est une hypothèse. À valider (est-ce la société de Daniel ? nom légal exact ?). Le nom "Cladéys" avec accent est à confirmer.
- **`Person.jobTitle`** : repris de `/about/` ("Architecte Expert Microsoft Modern Work & Cybersécurité").
- **Aucun nouveau champ de frontmatter** n'est requis. Seule extension envisageable, **à valider** : `keywords` (non utilisée ci-dessous) et `author` (inutile : auteur unique).

## 5. Implémentation proposée (Astro)

### Fichiers à modifier / créer

| Fichier | Action |
|---|---|
| `src/lib/schema.ts` | **Créer** : builders JSON-LD (entités, graphes par type de page) |
| `src/components/JsonLd.astro` | **Créer** : sérialisation sûre du JSON-LD |
| `src/components/BaseHead.astro` | **Modifier** : props `jsonLd?`, `image` en string, `ogType?` |
| `src/layouts/BlogPost.astro` | **Modifier** : calcule le graphe BlogPosting ou ProfilePage, passe heroImage à BaseHead |
| `src/pages/index.astro` | **Modifier** : passer `jsonLd={homeGraph(Astro.site)}` à BaseHead |
| `src/pages/blog/index.astro` | **Modifier (optionnel)** : CollectionPage |
| `src/pages/about.astro` | **Modifier** : passer `schemaType="profile"` au layout |

### `src/lib/schema.ts`

```ts
const SITE = 'https://tuneincloud.fr';
const ID = {
  website: `${SITE}/#website`,
  org: `${SITE}/#organization`,
  person: `${SITE}/#daniel-polonio`,
};

const CATEGORY_LABEL: Record<string, string> = {
  actualites: 'Actualités',
  guides: 'Guides',
  dossiers: 'Dossiers',
};

// ISO 8601 date seule (YYYY-MM-DD), sans décalage de fuseau.
const iso = (d: Date) => d.toISOString().slice(0, 10);

// Accepte string relative/absolue ou ImageMetadata (import Astro).
export function absImage(img: unknown): string | undefined {
  const src = typeof img === 'string' ? img : (img as { src?: string })?.src;
  return src ? new URL(src, SITE).href : undefined;
}

export const personNode = () => ({
  '@type': 'Person',
  '@id': ID.person,
  name: 'Daniel POLÒNIO',
  url: `${SITE}/about/`,
  jobTitle: 'Architecte Expert Microsoft Modern Work & Cybersécurité',
  knowsAbout: ['Microsoft Intune', 'Microsoft Entra', 'Microsoft Defender', 'Microsoft Purview', 'Microsoft 365'],
  sameAs: [
    'https://www.linkedin.com/in/daniel-pol%C3%B2nio-19b081110/',
    'https://github.com/DanyZack',
  ],
  // À valider : worksFor Cladéys
  // worksFor: { '@type': 'Organization', name: 'Cladéys', url: 'https://cladeys.fr' },
});

export const orgNode = () => ({
  '@type': 'Organization',
  '@id': ID.org,
  name: 'TuneInCloud',
  url: `${SITE}/`,
  logo: { '@type': 'ImageObject', url: `${SITE}/tuneincloud.png` }, // dimensions à valider
  founder: { '@id': ID.person },
  // À valider : lien avec Cladéys
  // parentOrganization: { '@type': 'Organization', name: 'Cladéys', url: 'https://cladeys.fr' },
});

const websiteNode = () => ({
  '@type': 'WebSite',
  '@id': ID.website,
  url: `${SITE}/`,
  name: 'TuneInCloud',
  description: 'Blog d\'expertise Microsoft (Intune, Entra, Defender, Purview, M365) en français.',
  inLanguage: 'fr-FR',
  publisher: { '@id': ID.org },
});

const graph = (nodes: object[]) => ({ '@context': 'https://schema.org', '@graph': nodes });

export const homeGraph = () => graph([websiteNode(), orgNode(), personNode()]);

export function articleGraph(o: {
  url: string; title: string; description: string; pubDate: Date; updatedDate?: Date;
  image?: string; category: string; subcategory?: string;
}) {
  const crumbs = [
    { name: 'Accueil', item: `${SITE}/` },
    { name: 'Blog', item: `${SITE}/blog/` },
    { name: CATEGORY_LABEL[o.category] ?? o.category, item: `${SITE}/blog/category/${o.category}/` },
    { name: o.title, item: o.url },
  ];
  return graph([
    {
      '@type': 'BlogPosting',
      '@id': `${o.url}#article`,
      mainEntityOfPage: { '@type': 'WebPage', '@id': o.url },
      headline: o.title.slice(0, 110),
      description: o.description,
      datePublished: iso(o.pubDate),
      dateModified: iso(o.updatedDate ?? o.pubDate),
      inLanguage: 'fr-FR',
      articleSection: CATEGORY_LABEL[o.category] ?? o.category,
      ...(o.image && { image: [o.image] }),
      author: { '@id': ID.person },
      publisher: { '@id': ID.org },
      isPartOf: { '@id': ID.website },
    },
    {
      '@type': 'BreadcrumbList',
      '@id': `${o.url}#breadcrumb`,
      itemListElement: crumbs.map((c, i) => ({
        '@type': 'ListItem', position: i + 1, name: c.name, item: c.item,
      })),
    },
    personNode(),
    orgNode(),
  ]);
}

export function profileGraph(o: { url: string; title: string; description: string; image?: string }) {
  return graph([
    {
      '@type': 'ProfilePage',
      '@id': `${o.url}#profile`,
      url: o.url,
      name: o.title,
      description: o.description,
      inLanguage: 'fr-FR',
      isPartOf: { '@id': ID.website },
      mainEntity: { '@id': ID.person },
    },
    { ...personNode(), ...(o.image && { image: o.image }) },
    orgNode(),
    websiteNode(),
  ]);
}
```

Remarque : on ne met pas de `dateModified` de substitution trompeuse si `updatedDate` est absent : ici
`dateModified = pubDate`, comportement standard et valide. Pour ProfilePage, ne pas mettre de
`dateCreated` : le `pubDate` de `/about/` est fictif.

### `src/components/JsonLd.astro`

```astro
---
interface Props { data: object | object[] }
const { data } = Astro.props;
const items = Array.isArray(data) ? data : [data];
// Échapper "<" évite toute sortie de la balise script.
const json = (o: object) => JSON.stringify(o).replace(/</g, '\\u003c');
---
{items.map((d) => <script type="application/ld+json" set:html={json(d)} />)}
```

### `src/components/BaseHead.astro` (modifications)

```astro
---
import JsonLd from './JsonLd.astro';
interface Props {
  title: string;
  description: string;
  image?: ImageMetadata | string;        // string = heroImage du frontmatter
  ogType?: 'website' | 'article';
  jsonLd?: object | object[];
}
const { title, description, image = FallbackImage, ogType = 'website', jsonLd } = Astro.props;
const imgSrc = typeof image === 'string' ? image : image.src;
const imgUrl = new URL(imgSrc, Astro.site);
---
<!-- ... -->
<meta property="og:type" content={ogType} />
<meta property="og:image" content={imgUrl} />
<meta property="twitter:image" content={imgUrl} />
{jsonLd && <JsonLd data={jsonLd} />}
```

(`new URL(x, Astro.site)` remplace `new URL(image.src, Astro.url)` pour garantir le domaine canonique.)

### `src/layouts/BlogPost.astro` (frontmatter, ajout)

```astro
---
import { articleGraph, profileGraph, absImage } from '../lib/schema';

type Props = CollectionEntry<'blog'>['data'] & { schemaType?: 'article' | 'profile' };
const { title, description, pubDate, updatedDate, category, subcategory, heroImage, schemaType = 'article' } = Astro.props;

const url = new URL(Astro.url.pathname, Astro.site).href;
const image = absImage(heroImage);
const jsonLd = schemaType === 'profile'
  ? profileGraph({ url, title: 'Daniel POLÒNIO', description, image })
  : articleGraph({ url, title, description, pubDate, updatedDate, image, category: category ?? 'actualites', subcategory });
---
<head>
  <BaseHead
    title={title}
    description={description}
    image={typeof heroImage === 'string' ? heroImage : undefined}
    ogType={schemaType === 'article' ? 'article' : 'website'}
    jsonLd={jsonLd}
  />
</head>
```

### `src/pages/about.astro`

Ajouter `schemaType="profile"` sur `<Layout ...>`.

### `src/pages/index.astro`

```astro
import { homeGraph } from '../lib/schema';
<BaseHead title={SITE_TITLE} description={SITE_DESCRIPTION} jsonLd={homeGraph()} />
```

### `src/pages/blog/index.astro` (optionnel)

```json
{ "@context": "https://schema.org", "@type": "CollectionPage", "@id": "https://tuneincloud.fr/blog/#collection",
  "url": "https://tuneincloud.fr/blog/", "name": "Blog TuneInCloud", "inLanguage": "fr-FR",
  "isPartOf": { "@id": "https://tuneincloud.fr/#website" } }
```

## 6. Sortie attendue (exemple pour la brève Intune baseline 26H2)

```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BlogPosting",
      "@id": "https://tuneincloud.fr/blog/2026-10-08-intune-baseline-windows-11-26h2/#article",
      "mainEntityOfPage": { "@type": "WebPage", "@id": "https://tuneincloud.fr/blog/2026-10-08-intune-baseline-windows-11-26h2/" },
      "headline": "Intune : baseline de sécurité Windows 11 26H2 disponible",
      "description": "Depuis le 6 octobre 2026, Intune propose la baseline de sécurité Windows 11 26H2. Deux changements réels, un réglage absent, et une mise à niveau manuelle.",
      "datePublished": "2026-10-08",
      "dateModified": "2026-10-08",
      "inLanguage": "fr-FR",
      "articleSection": "Actualités",
      "image": ["https://tuneincloud.fr/images/hero/2026-10-07-intune-baseline-windows-11-26h2.webp"],
      "author": { "@id": "https://tuneincloud.fr/#daniel-polonio" },
      "publisher": { "@id": "https://tuneincloud.fr/#organization" },
      "isPartOf": { "@id": "https://tuneincloud.fr/#website" }
    },
    { "@type": "BreadcrumbList", "@id": "https://tuneincloud.fr/blog/2026-10-08-intune-baseline-windows-11-26h2/#breadcrumb",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Accueil", "item": "https://tuneincloud.fr/" },
        { "@type": "ListItem", "position": 2, "name": "Blog", "item": "https://tuneincloud.fr/blog/" },
        { "@type": "ListItem", "position": 3, "name": "Actualités", "item": "https://tuneincloud.fr/blog/category/actualites/" },
        { "@type": "ListItem", "position": 4, "name": "Intune : baseline de sécurité Windows 11 26H2 disponible", "item": "https://tuneincloud.fr/blog/2026-10-08-intune-baseline-windows-11-26h2/" }
      ] },
    { "@type": "Person", "@id": "https://tuneincloud.fr/#daniel-polonio", "name": "Daniel POLÒNIO", "url": "https://tuneincloud.fr/about/",
      "jobTitle": "Architecte Expert Microsoft Modern Work & Cybersécurité",
      "sameAs": ["https://www.linkedin.com/in/daniel-pol%C3%B2nio-19b081110/", "https://github.com/DanyZack"] },
    { "@type": "Organization", "@id": "https://tuneincloud.fr/#organization", "name": "TuneInCloud", "url": "https://tuneincloud.fr/",
      "logo": { "@type": "ImageObject", "url": "https://tuneincloud.fr/tuneincloud.png" },
      "founder": { "@id": "https://tuneincloud.fr/#daniel-polonio" } }
  ]
}
```

Cas particulier : le dossier Entra Agent ID a un hero externe (`learn.microsoft.com`). Le JSON-LD le reprendra
tel quel. Recommandation : le remplacer par une image locale (H4) avant ou en même temps que le déploiement.

## 7. Vérification après déploiement

1. `npm run build` sans erreur (la prop `heroImage` d'`about.astro` est un import : vérifier le typage).
2. Rich Results Test sur une brève, un dossier, la home, `/about/` (BlogPosting et BreadcrumbList éligibles ; ProfilePage et WebSite informatifs).
3. Validator schema.org : zéro erreur sur le graphe, `@id` résolus.
4. Contrôler que `/about/` n'émet pas de BlogPosting et que og:image n'est plus le placeholder.
5. Gain attendu : score 4 → environ 85/100 (le reste dépend du logo validé, de `sameAs` Organization non disponible et des hero externes).

## 8. Priorités

1. Créer `schema.ts` + `JsonLd.astro`, modifier `BaseHead` et `BlogPost` (C1, H1, H2, H3, M2, M4).
2. Home (M1) et `/about/` (M3).
3. Valider logo et lien Cladéys, puis décommenter `parentOrganization`/`worksFor`.
4. Migrer les 12 hero externes (H4), uniformiser les slashs (B3).
