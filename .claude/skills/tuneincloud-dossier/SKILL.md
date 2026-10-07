---
name: tuneincloud-dossier
description: >
  Skill de rédaction de "dossiers complets" pour le blog TuneInCloud (tuneincloud.com),
  tenu par Daniel POLÒNIO, spécialisé dans l'écosystème Microsoft (Intune, Entra,
  Defender, Purview, Microsoft 365). Utilise ce skill dès que l'utilisateur demande
  un dossier complet, un article de fond, un guide approfondi, une analyse technique
  détaillée, ou un contenu riche et structuré pour TuneInCloud. Déclenche aussi pour :
  "rédige un dossier sur", "je veux un article complet sur", "fais-moi un guide
  complet", "explique-moi en profondeur", "j'ai envie d'un article de fond sur X",
  "dossier technique sur", "analyse complète de", "tout ce qu'il faut savoir sur".
  S'applique également quand le sujet est trop vaste ou trop riche pour un "short",
  ou quand l'utilisateur mentionne explicitement vouloir un contenu long, détaillé,
  ou avec des schémas.
---

# Skill — TuneInCloud : Rédaction de "Dossiers Complets"

## Contexte éditorial

**TuneInCloud** est un blog expert sur l'écosystème Microsoft, rédigé en français par
Daniel POLÒNIO. Il couvre principalement : Microsoft Intune, Entra ID, Microsoft
Defender (for Endpoint, for Identity, for Cloud Apps, for Office 365), Microsoft
Purview, Microsoft 365, et les sujets transverses (Zero Trust, conformité, gestion
des identités, sécurité des terminaux).

Le blog est construit sur **Astro**. Les articles sont rédigés en Markdown avec un
frontmatter YAML obligatoire.

Un "dossier" est le format long de TuneInCloud : une référence technique complète,
pensée pour durer et pour être bookmarkée par les administrateurs IT.

---

## Format "Dossier"

Un dossier est un article de fond, **exhaustif sur son périmètre**, qui couvre un
sujet de A à Z. Il est conçu pour les administrateurs qui veulent comprendre, pas
seulement appliquer. La profondeur prime sur la largeur.

**Longueur cible** : 1 500 à 4 000 mots de contenu réel (hors frontmatter, hors
commentaires de livraison). Pas de limite inférieure si le sujet le justifie.

### Structure type d'un dossier

```markdown
---
title: "Titre du dossier"
description: "Description concise orientée SEO (150-200 caractères)"
pubDate: YYYY-MM-DD
category: "dossiers"
subcategory: "[intune|entra|defender|purview|m365|zero-trust]"
---

[Phrase d'accroche — 2 à 3 phrases qui posent l'enjeu et l'utilité immédiate
du dossier. Pas de "Dans cet article, nous allons voir…".]

## Contexte et enjeux

[Pourquoi ce sujet est-il important maintenant ? Pour qui ? Dans quel contexte
organisationnel ? Quels sont les risques si on l'ignore ? 2 à 4 paragraphes
factuels, sans inflation rhétorique.]

## Architecture et fonctionnement

[Section centrale : comment ça marche "sous le capot". Flux de données, modèle
de sécurité, composants en jeu. C'est ici que les schémas sont prioritaires.]

> 📊 **Schéma suggéré** : [description du schéma à insérer]

## Prérequis

[Licences, versions, dépendances, configurations préalables. Tableau si pertinent.]

## Mise en œuvre

[Étapes concrètes, paramètres clés, comportements attendus. Le lecteur doit pouvoir
reproduire sans chercher ailleurs.]

## Cas limites et comportements bords

[Ce que la documentation officielle ne dit pas clairement, ou dit en note de bas de
page. C'est la valeur ajoutée du dossier par rapport à Microsoft Learn.]

## Surveillance et opérations

[Comment opérer au quotidien, quels indicateurs surveiller, quelles alertes
configurer — si applicable au sujet.]

## Synthèse

[Tableau récapitulatif ou liste de points clés. Ce que le lecteur doit retenir.]

> 📊 **Schéma suggéré** : [schéma de synthèse si pertinent]

## Sources et références

[URLs documentation Microsoft Learn, release notes, Microsoft Tech Community,
RFCs ou standards référencés. Format liens Markdown.]
```

**Règles de frontmatter :**
- `title` : titre du dossier, entre guillemets doubles
- `description` : résumé court pour le SEO (150-200 caractères), entre guillemets doubles
- `pubDate` : date au format `YYYY-MM-DD` (sans guillemets)
- `category` : toujours `"dossiers"` pour ce format
- `subcategory` : selon le produit principal (`"intune"`, `"entra"`, `"defender"`,
  `"purview"`, `"m365"`, `"zero-trust"`)

---

## La schématisation : l'élément différenciant du dossier

La schématisation est **la priorité éditoriale n°1 du format dossier**. Chaque fois
qu'un flux, une architecture, une hiérarchie ou un processus peut être représenté
visuellement, il doit l'être.

### Deux modes de schématisation

**Mode A — Schéma créé directement (préféré)**

Utiliser l'outil `visualize:show_widget` pour générer des schémas inline : diagrammes
de flux, architectures, séquences, hiérarchies, matrices de décision. Les schémas
sont intégrés au fil de l'article, au moment où ils apportent le plus de valeur.

Types de schémas courants dans les dossiers TuneInCloud :
- **Flux d'authentification** (ex. : Conditional Access, SSO, FIDO2)
- **Architectures de déploiement** (ex. : Intune + Autopilot + Entra join)
- **Modèles de sécurité** (ex. : Zero Trust layers, Defender kill chain)
- **Processus de conformité** (ex. : cycle de vie d'une politique de conformité Intune)
- **Matrices de décision** (ex. : quel niveau de licence pour quelle fonctionnalité)
- **Chronologies** (ex. : timeline d'un incident Defender)
- **Comparatifs** (ex. : AADJ vs Hybrid AADJ vs Workplace join — tableau visuel)

**Mode B — Schéma suggéré (quand la création directe n'est pas possible)**

Si un schéma complexe nécessite un outil de dessin externe (draw.io, Visio, Figma),
indiquer clairement dans le Markdown :

```markdown
> 📊 **Schéma à créer** : [description détaillée du schéma]
> **Type recommandé** : Diagramme de flux / Architecture / Séquence / Matrice
> **Éléments clés à représenter** : [liste des composants, flèches, zones]
> **Outil suggéré** : draw.io / Mermaid / Excalidraw
```

### Règle de densité schématique

- Minimum **1 schéma par section "Architecture et fonctionnement"**
- **1 à 2 schémas supplémentaires** dans le corps du dossier selon la complexité
- **1 schéma de synthèse** en fin d'article (tableau visuel, matrice décisionnelle,
  ou récapitulatif en flow)

Ne jamais créer un schéma pour "faire joli". Chaque schéma doit répondre à une
question précise que le texte seul ne résout pas aussi efficacement.

---

## Style d'écriture

Le style est identique au format "Short" — expert, précis, sans rembourrage — mais
avec **davantage de profondeur analytique** et de place pour la nuance.

### Principes directeurs (identiques au Short)

- **Précision chirurgicale** : le terme exact, pas son approximation.
- **Pas de rembourrage** : chaque paragraphe porte quelque chose. Les transitions
  inutiles sont supprimées.
- **Cohérence terminologique** : un concept = un terme. On ne varie pas pour varier.
- **Zéro jargon marketing** : "révolutionnaire", "game-changer" — non.
- **Sources officielles uniquement** : Microsoft Learn, release notes, Tech Community
  Microsoft.

### Ce qui est différent dans le dossier

- **Les sous-sections peuvent être plus développées** : un paragraphe d'analyse qui
  prend 6-8 phrases est acceptable si chaque phrase apporte quelque chose.
- **La comparaison est encouragée** : ancien vs nouveau comportement, option A vs B,
  scénario PME vs ETI. Les tableaux comparatifs sont bienvenus.
- **La dimension "pourquoi" est systématique** : on n'explique pas seulement *comment*
  configurer, mais *pourquoi* ce choix de conception, *pourquoi* cette limitation existe,
  *pourquoi* ce comportement par défaut.
- **L'avis d'expert est intégré** : dans un short, la section "avis" est optionnelle.
  Dans un dossier, le positionnement de l'auteur sur les bonnes pratiques, les
  compromis et les pièges est attendu — mais toujours argumenté.

### Ton

Identique au Short : neutre, direct, expert, sans tutoiement ni vouvoiement de majesté.
L'ironie est bienvenue aux mêmes endroits (renommages sans substance, limitations
absurdes, features en preview depuis trop longtemps).

---

## Précision technique : règles non négociables

Identiques au format Short, avec deux règles supplémentaires pour le dossier :

1. **Versions et build numbers** : cités systématiquement.
2. **Comportements bords** : couverts en section dédiée.
3. **Prérequis de licence** : indiqués pour chaque fonctionnalité mentionnée.
4. **État GA/Preview** : précisé à chaque mention de fonctionnalité.
5. **Sources officielles** : citées en fin d'article. URL complètes.
6. **Pas d'affirmation sans vérification** : si incertain, l'indiquer explicitement.
7. *(Spécifique dossier)* **Croisement de sources** : pour toute affirmation structurante
   (comportement d'une API, délai de synchronisation, limite de quota), croiser au
   minimum deux sources officielles (doc + release notes, ou doc + Tech Community).
   Signaler les divergences éventuelles.
8. *(Spécifique dossier)* **Date de vérification** : indiquer explicitement la date
   à laquelle les informations ont été vérifiées, et signaler si certaines sections
   couvrent des fonctionnalités en preview susceptibles d'évoluer.

---

## Flux de travail

### Étape 1 — Cadrage du dossier

Avant de rédiger, valider avec Daniel :
- Le **périmètre exact** du dossier (quelles fonctionnalités, quelles exclusions)
- L'**angle éditorial** (guide de déploiement ? analyse de sécurité ? comparatif ?
  retour d'expérience ?)
- Le **niveau de lecteur cible** (admin déjà familier du produit, ou découverte du
  sujet depuis zéro ?)
- Les **schémas prioritaires** (quels flux ou architectures représenter en premier)

Si le sujet est vaste (ex. : "Defender for Endpoint complet"), proposer un découpage
en 2-3 dossiers thématiques plutôt qu'un seul monolithe ingérable.

### Étape 2 — Recherche approfondie (multi-sources)

Utiliser `web_search` et `web_fetch` pour couvrir systématiquement :

- **Documentation Microsoft Learn** : page principale du produit + sous-pages
  pertinentes
- **What's new / Release notes** : identifier les évolutions récentes
- **Microsoft Tech Community** : retours terrain, questions fréquentes, clarifications
  d'ingénieurs Microsoft
- **Microsoft Security Blog** : pour les sujets Defender / Zero Trust
- **GitHub Microsoft** : scripts officiels, exemples de configuration si pertinents
- **RFCs ou standards** : pour les sujets d'authentification, chiffrement, protocoles

Règle de croisement : **au moins 2 sources indépendantes** pour chaque affirmation
technique structurante. En cas de divergence, l'indiquer explicitement dans l'article.

### Étape 3 — Construction de la structure et identification des schémas

Avant de rédiger le texte, produire :
1. Un **plan détaillé** avec les sections et sous-sections
2. La **liste des schémas** à créer (type, contenu, placement)

Valider ce plan avec Daniel si nécessaire avant de passer à la rédaction.

### Étape 4 — Rédaction et schématisation

Rédiger section par section. Pour chaque schéma :
- **Créer directement** avec `visualize:show_widget` si le type s'y prête
  (flux, architecture, matrice, séquence)
- Ou **décrire précisément** le schéma à créer si un outil externe est plus adapté

Appliquer le filtre stylistique en cours de rédaction — pas uniquement en relecture.

### Étape 5 — Relecture et vérification

- Vérifier chaque chiffre, version, délai, quota contre la source citée
- S'assurer que tous les prérequis de licence sont mentionnés
- Vérifier la cohérence terminologique sur l'ensemble du document
- Supprimer tout ce qui peut être supprimé sans perte de sens

### Étape 6 — Livraison

Livrer en **Markdown avec frontmatter Astro**, prêt à coller dans le projet.

En fin de document (hors article), indiquer :
- Les **sources consultées** (URLs complètes)
- La **date de vérification**
- Les **points à re-vérifier** avant publication (features en preview, comportements
  non documentés, informations dont la date de validité est incertaine)
- La **liste des schémas créés** et des **schémas suggérés** (avec description)

---

## Anti-patterns à éviter absolument

| ❌ À éviter | ✅ À faire à la place |
|---|---|
| "Microsoft a récemment annoncé…" | "Disponible en GA depuis le cycle Intune 2404…" |
| "Cette fonctionnalité est très utile" | Décrire concrètement ce qu'elle résout |
| "Les versions récentes de Windows" | "Windows 11 22H2 minimum (KB5028185)" |
| "Il faudra une licence adaptée" | "Requiert Microsoft Entra ID P2 (inclus dans E5 / Business Premium)" |
| Reformuler Microsoft Learn | Analyser, contextualiser, croiser, pointer les limites |
| Section "Conclusion" vague | Tableau de synthèse ou liste de décisions actionnables |
| Schéma décoratif sans valeur | Schéma qui répond à une question précise |
| "En conclusion, nous pouvons voir que…" | Supprimer. Le lecteur voit par lui-même. |
| Livrer sans frontmatter Astro | Toujours inclure le bloc `---` complet |
| Affirmation sans source croisée | Citer au moins 2 sources pour les points structurants |
| Tiret cadratin " — " en milieu de phrase | Reformuler : virgule, parenthèse, point, ou restructuration |

---

## Calibrage de la profondeur

Un dossier TuneInCloud doit répondre à trois niveaux de lecture :

**Niveau 1 — L'admin pressé** : il lit les titres de section, le tableau de synthèse
et les encadrés "📊 Schéma". En 2 minutes, il sait si le sujet le concerne et ce
qu'il doit faire.

**Niveau 2 — L'admin en déploiement** : il lit les sections "Mise en œuvre" et
"Prérequis" en détail. Il doit pouvoir reproduire sans ouvrir un onglet supplémentaire.

**Niveau 3 — L'architecte curieux** : il lit "Architecture et fonctionnement" et
"Cas limites". Il comprend le *pourquoi* de chaque choix de conception.

Ces trois niveaux doivent coexister dans le même document sans friction.
