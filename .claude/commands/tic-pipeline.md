---
description: Chaîne complète TuneInCloud avec SEO intégré : sujet et brief SEO → rédaction → contrôles SEO → relecture rédac chef → illustration → liens entrants → simulation avant publication → issue GitHub de relecture. S'arrête avant publication.
argument-hint: <sujet, brief de veille ou format + sujet>
---

Tu orchestres la chaîne de publication TuneInCloud pour le sujet suivant :

$ARGUMENTS

Lis `CLAUDE.md` à la racine du repo, puis `.claude/seo-profile.md` et
`editorial/seo/mots-cles.md`. Enchaîne les étapes ci-dessous avec l'outil Agent,
un agent à la fois, en transmettant à chacun le résultat du précédent. Ne rédige
pas toi-même, ne corrige pas toi-même : chaque étape appartient à son agent.

**Pourquoi c'est toi qui lances les agents SEO.** Un sous-agent ne peut pas
lancer les agents du plugin claude-seo. Les étapes SEO sont donc appelées ici,
entre deux étapes éditoriales, et leurs résultats sont transmis par écrit aux
agents éditoriaux. Toutes les sorties SEO d'un article vont dans
`editorial/seo/articles/<slug>/`.

**Règle d'arbitrage.** Le SEO propose, le rédac chef tranche. Une
recommandation SEO qui contredit la charte de style ou le `CLAUDE.md` est
écartée par le rédac chef et notée dans son rapport. Rien de ce qui touche au
fond n'est publié sans l'OK de Daniel.

**DataForSEO n'est pas branché** (décision de Daniel du 2026-11-17). Les étapes
qui lisent la SERP utilisent la recherche web gratuite, localisée US : leurs
résultats sont des estimations, et les rapports doivent le dire. N'appelle
aucun outil `mcp__dataforseo__*` même s'il apparaît.

## Intensité selon le format

Le format est fixé à l'étape 0 (demande, brief de veille ou étape 0b).

| Étape | Brève | Article | Guide, dossier |
|---|---|---|---|
| 0a Carte des mots-clés et cannibalisation | oui | oui | oui |
| 0b SERP à rebours (`seo-sxo`) | non | oui | oui |
| 0c Brief SEO (`seo-content-brief`, FLOW Find) | court | complet | complet |
| 2a `seo-check` (bloquant) | oui | oui | oui |
| 2b Citabilité IA (`seo-geo`) | non | oui | oui |
| 2c E-E-A-T (`seo-content`) | non | non | oui |
| 3a Images et image de partage (`seo-image-gen`, audit) | non | non | oui |
| 3b Liens entrants | oui | oui | oui |
| 4 Simulation avant publication | oui | oui | oui |

## Étape 0 : sujet, mots-clés et brief SEO

### 0a. Carte des mots-clés (toi, sans agent)

1. Choisis un mot-clé principal provisoire pour le sujet (en français, tel que
   le chercherait un admin ou un DSI) et un `<slug>` de 3 à 5 mots qui le
   contient (règles du `CLAUDE.md`).
2. Cherche ce mot-clé et ses variantes dans `editorial/seo/mots-cles.md` et
   dans les `title` de `src/content/blog/`.
   - **Page existante sur le même mot-clé** : arrête-toi et demande à Daniel
     s'il préfère mettre à jour l'article existant (rafraîchissement par
     `/tic-relire` puis `/tic-seo`) ou viser un angle distinct. Propose l'angle.
   - **Mot-clé listé `à créer`** : reprends le format et le cluster indiqués.
3. Pour un article, un guide ou un dossier, lance l'agent
   `claude-seo:seo-cluster` sur le mot-clé, avec la liste des articles du
   pilier (tirée de la carte), pour confirmer le cluster, l'absence de
   cannibalisation et les articles à relier. Sortie demandée :
   `editorial/seo/articles/<slug>/cluster.md`.

### 0b. SERP à rebours (article, guide, dossier)

Lance l'agent `claude-seo:seo-sxo` sur le mot-clé principal (recherches en
français, marché FR/BE/CH/CA). Demande-lui : type de page attendu par la SERP,
intention dominante et secondaire, format TuneInCloud conseillé (brève,
article, guide, dossier), questions récurrentes, angles absents des cinq
premiers résultats. Sortie : `editorial/seo/articles/<slug>/serp.md`.

Si le format conseillé diffère de celui demandé, garde celui de la demande,
mais signale l'écart dans le compte rendu final.

### 0c. Brief SEO

Lance un agent `general-purpose` qui charge les skills
`claude-seo:seo-content-brief`, `claude-seo:seo-flow` (étape Find uniquement)
et `tuneincloud-seo`, et qui lit `cluster.md` et `serp.md` s'ils existent. Il
écrit `editorial/seo/articles/<slug>/brief.md` avec :

- mot-clé principal, 5 à 10 secondaires, intention ;
- `title` proposé (55-60 caractères, mot-clé au début, sans échéance datée,
  sans tiret cadratin) et `description` (140-160 caractères) ;
- `<slug>` et nom de fichier `YYYY-MM-DD-<slug>.md` ;
- plan H2 indicatif, questions auxquelles répondre, apport original attendu
  (retour terrain de Daniel, lecture critique, contexte RGPD ou européen) ;
- 3 à 5 liens internes sortants, uniquement vers des fichiers existants de
  `src/content/blog/` ;
- les éléments GEO attendus : réponse directe dans les 100 premiers mots,
  chiffres sourcés dans la phrase même, tableau si le sujet compare.

Pour une brève, le brief tient en 15 lignes. Puis ajoute ou mets à jour la
ligne du mot-clé dans `editorial/seo/mots-cles.md` (statut `planifié`).

## Étape 1 : rédaction

Lance `tic-redacteur` avec le sujet ou le brief de veille, **et** le chemin de
`editorial/seo/articles/<slug>/brief.md`. Récupère dans son rapport le chemin du
brouillon, le format, le nombre de mots, les points à re-vérifier, le résultat
de `seo-check`.

## Étape 2 : contrôles SEO puis relecture

### 2a. Contrôle déterministe (toi)

```bash
node scripts/seo-check.mjs <brouillon> --stage draft --keyword "<mot-clé principal>"
```

Une alerte bloquante renvoie le brouillon à `tic-redacteur` avec la liste, une
seule fois. Les alertes non bloquantes partent au rédac chef.

### 2b. Citabilité IA (article, guide, dossier)

Lance l'agent `claude-seo:seo-geo` sur le **fichier** du brouillon (pas d'URL :
l'article n'est pas en ligne). Demande une analyse passage par passage :
réponse directe en intro, phrases extractibles, chiffres et dates sourcés dans
la phrase, tableaux, entités nommées exactes (produits, licences, statut GA ou
Preview). Demande des réécritures concrètes, compatibles avec la charte (pas
de tiret cadratin, pas de point-virgule, pas de « nous »). Sortie :
`editorial/seo/articles/<slug>/geo.md`.

### 2c. E-E-A-T (guide, dossier)

Lance l'agent `claude-seo:seo-content` sur le fichier du brouillon : marqueurs
d'expérience terrain, expertise (nuances de licences, terminologie exacte),
sources primaires, fraîcheur. Sortie : `editorial/seo/articles/<slug>/eeat.md`.

### 2d. Relecture

Lance `tic-redac-chef` sur le brouillon, en lui transmettant les points à
re-vérifier du rédacteur, les alertes non bloquantes de 2a et les chemins de
`geo.md` et `eeat.md`. Il applique les recommandations SEO compatibles avec la
charte, écarte les autres et les liste dans son rapport. Récupère le verdict,
le chemin du rapport, les décisions qui reviennent à Daniel.

Si le verdict est ❌ (à retravailler en profondeur) : n'illustre pas, passe
directement à l'étape 5 en le signalant, et propose à Daniel soit de relancer la
rédaction avec ses consignes, soit d'abandonner le sujet.

## Étape 3 : illustration et liens entrants

### 3a. Illustration

Lance `tic-illustrateur` sur le brouillon. Récupère la liste des fichiers créés.
Puis :

```bash
node scripts/seo-check.mjs <brouillon> --stage final --keyword "<mot-clé principal>"
```

Une alerte bloquante (hero externe, absent, de plus de 200 Ko, image
introuvable) repart à `tic-illustrateur`, une seule fois.

Pour un guide ou un dossier, lance ensuite l'agent `claude-seo:seo-image-gen`
en mode audit (il ne génère rien) sur le hero, la bannière et les schémas
produits : lisibilité en vignette de partage (1200×630), `alt` des schémas,
poids. Sortie : `editorial/seo/articles/<slug>/images.md`. Les corrections
d'`alt` sont appliquées par `tic-illustrateur` s'il y en a.

### 3b. Liens entrants

Lance un agent `general-purpose` qui lit le brouillon, `editorial/seo/mots-cles.md`
et `editorial/seo/2026-11-15-audit/findings/cluster.md` (matrice de liens), puis
choisit **2 ou 3 articles publiés** qui devraient pointer vers le nouveau. Pour
chacun, il propose l'insertion la plus légère possible : un lien posé sur un
groupe de mots déjà présent, ou une phrase d'au plus 20 mots conforme à la
charte. Jamais de nouveau paragraphe. Il ne modifie aucun fichier et écrit
`editorial/seo/articles/<slug>/liens-entrants.md` : pour chaque article,
fichier, ligne, texte avant, texte après. L'URL cible est
`/blog/<id-final>/`, avec `<id-final>` = `YYYY-MM-DD-<slug>` en minuscules (la
date sera fixée par le publieur : écris `/blog/{{ID}}/`, le publieur remplacera).

## Étape 4 : simulation avant publication (toi)

Vérifie la page telle qu'elle sera servie, sans rien publier :

```bash
cp <brouillon> src/content/blog/<YYYY-MM-DD-slug>.md
npm run build
"C:/Users/Dany/.claude/plugins/cache/agricidaniel-claude-seo/claude-seo/2.6.2/scripts/claude-seo" run parse_html.py dist/blog/<id>/index.html --url https://tuneincloud.fr/blog/<id>/ --json > editorial/seo/articles/<slug>/prepublication.json
rm src/content/blog/<YYYY-MM-DD-slug>.md
```

Le fichier copié dans `src/content/blog/` est **toujours supprimé**, y compris
si le build échoue, et n'est jamais ajouté à git. Contrôle dans le JSON : un
seul H1, `title` et `description` identiques au frontmatter, canonical en
`https://tuneincloud.fr/blog/<id>/`, `og:type` `article`, `og:image` = le hero
local, un bloc JSON-LD avec `BlogPosting` et `BreadcrumbList`. Un échec du
build ou un de ces points manquant est signalé comme bloquant dans l'issue.

## Étape 5 : sauvegarde du brouillon et demande de relecture

1. Commit du brouillon et de ses fichiers, puis push (le dossier `draft/` n'est pas
   compilé par Astro, rien n'est publié). Ajoute les fichiers un par un, uniquement
   ceux qui existent (jamais `-A`, jamais de motif sans correspondance) : le
   brouillon, `public/images/hero/<slug>.webp`, la bannière, les schémas PNG et SVG
   éventuels, le rapport `editorial/relectures/<slug>-*.md`, chaque fichier de
   `editorial/seo/articles/<slug>/`, et `editorial/seo/mots-cles.md`.
   ```bash
   git fetch origin && git pull --rebase origin master
   git add <fichier1> <fichier2> ...
   git commit -m "Brouillon : <titre court>" -m "Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>"
   git push origin master || git push origin HEAD:refs/heads/claude/brouillon-<slug>
   ```
   Depuis un checkout cloud, le push sur `master` est refusé : la branche
   `claude/brouillon-<slug>` est fusionnée automatiquement par le workflow
   `sync-agent-branches`. Jamais de `--force`.

   Cette commande est conçue pour le poste local (Canva, navigateur intégré,
   Microsoft Learn, plugin claude-seo accessibles). Lancée depuis une session
   cloud, l'illustrateur n'a pas Canva, le plugin n'est pas installé et certains
   sites sont bloqués : préviens Daniel dans le compte rendu et liste ce qui reste
   à faire en local (`/tic-illustrer <slug>`, étapes SEO 0b, 2b, 2c, 3a, 4).
2. Crée une issue GitHub (outil `issue_write`, owner `DanyZack`, repo `tuneincloud`,
   label `relecture` si possible) :
   - Titre : `Relecture : <titre de l'article>`
   - Corps, en français, avec :
     - format, produit, nombre de mots, verdict du rédac chef ;
     - lien vers le brouillon sur GitHub :
       `https://github.com/DanyZack/tuneincloud/blob/master/src/content/draft/<fichier>.md` ;
     - lien vers le rapport de relecture sur GitHub ;
     - les images hero et bannière en Markdown via
       `https://raw.githubusercontent.com/DanyZack/tuneincloud/master/public/images/...` ;
     - **une section « SEO »** : mot-clé principal, `title` et `description`
       retenus avec leur longueur, format conseillé par la SERP s'il diffère,
       résultat de `seo-check` (alertes restantes), principaux constats de
       `geo.md` et `eeat.md` et ce que le rédac chef en a retenu, résultat de la
       simulation avant publication, lien vers le dossier
       `editorial/seo/articles/<slug>/` ;
     - **les liens entrants proposés** (article, texte avant, texte après), avec
       la mention : « Ils seront appliqués avec la publication. Pour en exclure
       un : "OK publie <slug> sans lien N". » ;
     - la liste des décisions qui reviennent à Daniel ;
     - la phrase : « Pour publier : répondre "OK publie <slug>" dans Claude Code. »
3. Si la création de l'issue échoue (connecteur indisponible), dis-le et donne le
   même contenu dans ta réponse.

## Étape 6 : compte rendu et arrêt

Réponds à Daniel de façon compacte : titre, format, mot-clé principal, nombre de
mots, verdict, résultat SEO en trois lignes, chemin du brouillon, numéro et URL
de l'issue, décisions à prendre, et la consigne pour publier. **Ne lance pas
`tic-publieur`.** Il ne sera lancé que sur un message explicite de Daniel du type
« OK publie <slug> », auquel cas tu lui transmettras le chemin du brouillon, le
numéro de l'issue et le chemin de `liens-entrants.md` avec les exclusions
éventuelles.
