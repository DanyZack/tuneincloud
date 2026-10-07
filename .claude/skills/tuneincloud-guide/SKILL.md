---
name: tuneincloud-guide
description: >
  Skill de rédaction de "guides de configuration" pour le blog TuneInCloud
  (tuneincloud.com), tenu par Daniel POLÒNIO, spécialisé dans l'écosystème
  Microsoft (Intune, Entra, Defender, Purview, Microsoft 365). Utilise ce skill
  dès que l'utilisateur demande un guide de configuration, un tutoriel pas à pas,
  une procédure d'exploitation, un how-to, un mode opératoire, un runbook, ou
  tout contenu orienté "implémentation concrète" pour TuneInCloud. Déclenche
  aussi pour : "comment configurer", "comment mettre en place", "comment
  déployer", "procédure pour", "tutoriel sur", "guide pas à pas", "runbook pour",
  "rédige un tuto", "mode op pour activer X", "fais-moi le pas à pas pour". À
  privilégier sur le skill "tuneincloud-dossier" dès que l'intention est de
  produire une procédure reproductible, plutôt qu'une analyse de fond. S'applique
  également quand Daniel veut livrer une fiche d'exploitation qu'un admin n'aura
  qu'à suivre pour configurer son tenant.
---

# Skill — TuneInCloud : Rédaction de "Guides de Configuration"

## Contexte éditorial

**TuneInCloud** est un blog expert sur l'écosystème Microsoft, rédigé en français par
Daniel POLÒNIO. Il couvre principalement : Microsoft Intune, Entra ID, Microsoft
Defender (for Endpoint, for Identity, for Cloud Apps, for Office 365), Microsoft
Purview, Microsoft 365, et les sujets transverses (Zero Trust, conformité, gestion
des identités, sécurité des terminaux).

Le blog est construit sur **Astro**. Les articles sont rédigés en Markdown avec un
frontmatter YAML obligatoire.

Un "guide" est le format opérationnel de TuneInCloud : une procédure pas à pas
qu'un administrateur IT confirmé peut dérouler telle quelle pour configurer une
fonctionnalité sur son tenant, sans avoir à ouvrir dix onglets en parallèle.

---

## Format "Guide de configuration"

Un guide est une **procédure d'exploitation reproductible**. Objectif : l'admin lit,
applique, ça marche. La valeur ajoutée n'est pas la profondeur d'analyse (c'est le
rôle du dossier), c'est la **fiabilité opérationnelle** et la **clarté séquentielle**.

Le lecteur type est un **admin IT confirmé**, qui connaît l'écosystème Microsoft
et le produit concerné. On ne lui explique pas ce qu'est un groupe de sécurité,
un utilisateur Entra, une policy Intune. On lui dit **où cliquer**, **quoi saisir**,
**dans quel ordre** et **comment vérifier** que ça fonctionne.

**Longueur cible** : 800 à 2 500 mots de contenu réel (hors frontmatter, hors
commentaires de livraison). Plus court qu'un dossier, parce qu'on coupe la
théorie, pas la procédure.

### Structure type d'un guide

```markdown
---
title: "Titre du guide — orienté action"
description: "Description concise orientée SEO (150-200 caractères)"
pubDate: YYYY-MM-DD
category: "guides"
subcategory: "[intune|entra|defender|purview|m365|zero-trust]"
---

[Phrase d'accroche — 2 à 3 phrases qui posent ce que le guide permet de faire et
dans quel contexte on l'applique. Pas de "Dans ce tutoriel, nous allons voir…".]

## Ce que ce guide couvre

[3 à 5 bullets courts : le résultat concret attendu à la fin de la procédure.
Le lecteur doit savoir en 15 secondes si ce guide est le bon.]

## Prérequis

[Licences, rôles RBAC nécessaires, versions minimales, dépendances. Formulé sous
forme de checklist. L'admin doit pouvoir valider chaque ligne avant de commencer.]

## Procédure

### Étape 1 — [verbe d'action + objet]

[Description courte du résultat de l'étape. Puis les sous-étapes précises avec
chemin de navigation dans le portail.]

1. Se connecter au **[portail concerné]** (URL).
2. Aller dans **[Menu] → [Sous-menu] → [Onglet]**.
3. Cliquer sur **[Bouton]**.
4. Renseigner les champs suivants :
   - **Nom** : `VALEUR`
   - **Description** : `VALEUR`
   - **Paramètre X** : `VALEUR` *(note sur le comportement attendu)*

> 🖼️ **Capture à insérer** : [description de la capture d'écran à prendre, avec
> ce qui doit être visible / surligné]

### Étape 2 — [verbe d'action + objet]

[Même format : chemin de navigation, actions numérotées, valeurs exactes.]

*Alternative PowerShell* :
```powershell
# Commentaire court expliquant ce que fait le bloc
Connect-MgGraph -Scopes "Policy.ReadWrite.ConditionalAccess"
$params = @{
    displayName = "Nom-Politique"
    state       = "enabledForReportingButNotEnforced"
}
New-MgIdentityConditionalAccessPolicy -BodyParameter $params
```

### Étape 3 — [verbe d'action + objet]

[…]

## Vérification

[Comment s'assurer que la configuration est bien en place : signal attendu dans
le portail, comportement côté client, log à vérifier, commande de test. Sans cette
section, le guide est incomplet.]

## Rollback

[Comment annuler proprement la configuration si quelque chose ne va pas. Même
niveau de précision que la procédure principale.]

## Pièges fréquents

[Les 3 à 5 erreurs classiques : prérequis oublié, paramètre piégeux, délai de
propagation sous-estimé, ordre d'application incorrect. C'est la valeur ajoutée
du guide par rapport à Microsoft Learn.]

## Sources et références

[URLs documentation Microsoft Learn, release notes, Microsoft Tech Community.
Format liens Markdown.]
```

**Règles de frontmatter :**
- `title` : titre du guide, orienté action ("Activer…", "Configurer…", "Déployer…"),
  entre guillemets doubles
- `description` : résumé court pour le SEO (150-200 caractères), entre guillemets doubles
- `pubDate` : date au format `YYYY-MM-DD` (sans guillemets)
- `category` : toujours `"guides"` pour ce format
- `subcategory` : selon le produit principal (`"intune"`, `"entra"`, `"defender"`,
  `"purview"`, `"m365"`, `"zero-trust"`)

---

## Les visuels du guide : captures et schémas

Un guide TuneInCloud repose sur **deux types de visuels**, avec un rôle distinct.

### Les captures d'écran du portail (élément principal)

Les captures sont **l'élément visuel dominant du guide**. Elles matérialisent la
procédure et évitent toute ambiguïté sur l'emplacement d'un bouton ou la valeur
d'un champ.

**Règles pour les captures :**
- Une capture par étape importante, pas une par clic.
- Toujours indiquer ce qui doit être **visible** et ce qui doit être **surligné**
  (cadre rouge autour du bouton, flèche, numéro).
- Précédée ou suivie immédiatement de la description textuelle de l'étape — la
  capture ne remplace jamais le texte, elle le confirme.
- Anonymisation systématique : aucun nom d'utilisateur réel, aucun domaine client,
  aucun identifiant de tenant.

Claude ne produit pas les captures lui-même. Il **signale précisément l'emplacement
et le contenu attendu** via un encadré dédié :

```markdown
> 🖼️ **Capture à insérer** : Portail Intune → Devices → Compliance policies →
> page de création de politique. Visible : le formulaire de configuration complet.
> À surligner : le champ "Platform" avec la valeur "Windows 10 and later".
```

### Les schémas ponctuels (élément secondaire)

Les schémas restent utiles dans un guide, mais **moins systématiques que dans un
dossier**. Ils interviennent à des moments précis :

- **Vue d'ensemble de la procédure** : un flow en début de guide qui montre les
  grandes étapes et leurs dépendances. Utile pour les guides à 5+ étapes.
- **Représentation d'un flux qui dépasse l'UI** : par exemple, le parcours d'une
  requête d'authentification à travers plusieurs composants, ou la chaîne de
  synchronisation entre Entra ID et un poste Intune.
- **Matrice de décision** : quand le guide propose plusieurs variantes selon le
  contexte (ex. : choix entre Autopilot User-Driven vs Self-Deploying selon le
  type d'appareil).

**Règle de densité** : 0 à 2 schémas par guide. Zéro si la procédure est linéaire
et tient dans l'UI. Un en ouverture pour donner la vue d'ensemble des étapes
majeures. Un second uniquement si un flux hors-UI justifie une représentation
visuelle dédiée.

### Comment produire les schémas

Pour **tout schéma** inséré dans un guide TuneInCloud, Claude ne génère pas le
visuel lui-même. Il **rédige un prompt prêt à l'emploi pour Claude Design**
(claude.ai/design), en référence au modèle "Cladéys x TuneInCloud Design".

Style de référence imposé : premier schéma DSPM du dossier "Schémas Articles
Tune in cloud". Format paysage, blocs colorés plein fond, flèches épaisses, fond
ivoire, aucun titre global flottant, aucune illustration.

Palette imposée :
- Bleu marine `#1a2b5e`
- Or `#b8972a`
- Bordeaux `#8b1a2b`
- Bleu roi `#2748c4`
- Vert foncé `#1a5c3a`
- Ivoire `#ede6d6`

Format du prompt à livrer pour chaque schéma :

```markdown
> 📊 **Schéma à générer via Claude Design** (modèle "Cladéys x TuneInCloud Design")
>
> **Prompt** :
> Créer un schéma au format paysage, fond ivoire (#ede6d6), sans titre global
> flottant, sans illustration. Blocs colorés plein fond, flèches épaisses noires.
> [Description précise du contenu : blocs, libellés, couleurs par bloc, flèches
> entre blocs, légende éventuelle.]
>
> **Placement dans l'article** : [après la section X / entre l'étape 2 et 3 / etc.]
```

Ne jamais produire un schéma avec `visualize:show_widget` pour un guide destiné
à TuneInCloud. Le rendu visuel final doit rester cohérent avec l'identité
graphique Cladéys x TuneInCloud.

---

## Style d'écriture

Le style reste celui de TuneInCloud : expert, précis, sans rembourrage. Mais le
guide a ses propres inflexions, parce qu'il sert l'action, pas la réflexion.

### Principes directeurs

- **Verbes à l'impératif ou à l'infinitif** : "Ouvrir le portail", "Cliquer sur",
  "Renseigner le champ". Pas de "Vous allez cliquer", pas de "Il faudra cliquer".
- **Phrases courtes** : une action par phrase. Un paragraphe d'explication tient
  en 2 à 3 phrases maximum. Au-delà, c'est probablement du contenu qui doit
  basculer vers un dossier.
- **Valeurs exactes entre backticks** : les noms de champs, les paramètres, les
  commandes sont en `code inline`. Pas de paraphrase.
- **Chemins de navigation en gras séparés par des flèches** : `**Devices → Compliance policies → Create policy**`.
- **Cohérence terminologique** : un composant = un nom. Si le portail affiche
  "Compliance policies", on écrit "Compliance policies", pas "politiques de
  conformité" au détour d'un paragraphe.
- **Zéro rembourrage narratif** : aucune phrase qui annonce ce qui va être dit,
  aucune phrase qui résume ce qui vient d'être dit. On avance.

### Ce qui distingue le guide du dossier

- **La théorie est bannie** : le "pourquoi" est réduit au strict nécessaire pour
  éviter les erreurs. Si un paragraphe commence à expliquer le modèle de sécurité
  ou l'architecture sous-jacente, c'est qu'il n'a pas sa place ici. À renvoyer
  vers un dossier existant ou à créer.
- **L'analyse comparative est bannie** : le guide fait un choix (ex. : GUI plutôt
  que PowerShell en méthode principale), il ne le justifie pas en 300 mots.
- **La nuance est limitée aux pièges opérationnels** : on ne discute pas les
  mérites théoriques d'une approche. On dit ce qui marche, ce qui ne marche pas,
  et pourquoi ça ne marche pas quand on se plante.

### Ton

Neutre, direct, expert. Pas de tutoiement, pas de vouvoiement. L'ironie reste
bienvenue quand elle sert (libellés microsoft absurdes, paramètres mal nommés,
comportements par défaut contre-intuitifs), mais elle ne doit jamais alourdir la
procédure. En cas de doute, on coupe.

---

## Méthode de configuration : GUI en principal, PowerShell en alternative

**Règle ferme** : la procédure principale est **toujours en interface graphique**
(portail Intune, portail Entra, portail Defender, portail Purview, centre
d'administration Microsoft 365). C'est ce que l'admin consulte le plus souvent,
c'est ce qui est le plus facile à suivre avec des captures.

**Alternative PowerShell / Graph API** : proposée uniquement quand elle apporte
une valeur réelle :
- Automatisation à l'échelle (configurer 50 politiques d'un coup).
- Configuration non exposée dans l'UI.
- Valeur de paramètre par défaut qu'on ne peut modifier que via l'API.
- Contexte de déploiement scripté (runbook, CI/CD).

L'alternative PowerShell est présentée comme un **bloc complémentaire** à la fin
de l'étape concernée, pas comme une procédure parallèle dupliquée. Le bloc inclut :
- Les modules à installer (`Install-Module Microsoft.Graph` etc.)
- Les scopes Graph nécessaires (`-Scopes`)
- La commande complète commentée
- Le retour attendu

Si un guide entier est plus pertinent en PowerShell (ex. : provisioning à grande
échelle), le préciser dès le titre ("Déployer X via Microsoft Graph PowerShell")
et inverser la logique : PowerShell en principal, GUI en repère si possible.

---

## Précision technique : règles non négociables

Identiques au format Dossier, avec deux règles supplémentaires spécifiques au guide :

1. **Versions et build numbers** : cités systématiquement.
2. **Prérequis de licence** : indiqués en tête de guide, jamais enfouis dans une
   étape intermédiaire.
3. **Rôles RBAC nécessaires** : listés explicitement dans les prérequis (ex. :
   "Intune Administrator", "Conditional Access Administrator", "Global Reader"
   suffisant pour lecture seule).
4. **État GA/Preview** : précisé si la fonctionnalité configurée est en preview.
5. **Sources officielles** : citées en fin d'article. URL complètes.
6. **Pas d'affirmation sans vérification** : si incertain, l'indiquer
   explicitement.
7. *(Spécifique guide)* **Valeurs exactes reproduites à l'identique** : les noms
   de champs, de politiques, de menus sont repris **mot pour mot** depuis le
   portail. Pas de traduction improvisée, pas d'abréviation.
8. *(Spécifique guide)* **Délais de propagation signalés** : si une configuration
   met du temps à se propager (synchronisation Intune, réplication Entra,
   provisioning de licence), le délai est indiqué à l'étape concernée et dans la
   section Vérification.

---

## Flux de travail

### Étape 1 — Cadrage du guide

Avant de rédiger, valider avec Daniel :
- Le **scope exact** : qu'est-ce qu'on configure, et qu'est-ce qu'on ne configure
  pas (ex. : "Activer FIDO2 sur Entra ID" mais pas "Déployer les clés FIDO2 en
  masse").
- Le **contexte d'usage** : tenant vierge ? tenant déjà configuré ? environnement
  de test ? production ?
- Les **variantes à couvrir** : utilisateur unique vs groupe pilote vs
  déploiement global ? Windows seul ou multi-OS ?
- La **présence ou non de l'alternative PowerShell** : par défaut, GUI seule
  suffit. L'alternative PowerShell est ajoutée si Daniel la demande ou si la
  configuration l'exige.

Si le scope dépasse une procédure unique (ex. : "Tout sécuriser avec Conditional
Access"), proposer un découpage en plusieurs guides thématiques plutôt qu'un
monolithe illisible.

### Étape 2 — Recherche ciblée

Utiliser `web_search` et `web_fetch` pour couvrir :

- **Documentation Microsoft Learn** : la page procédurale du produit concerné.
- **What's new / Release notes** : vérifier si le chemin de navigation ou un
  paramètre a changé récemment.
- **Microsoft Tech Community** : signalements de bugs connus, limitations non
  documentées, retours terrain.
- **Microsoft Graph documentation** : si une alternative PowerShell est prévue.

La recherche est plus ciblée que pour un dossier : on ne cherche pas à comprendre
l'ensemble d'un sujet, on cherche à **reproduire une procédure fiable**. Croiser
au moins la doc officielle + une source récente (release note ou Tech Community)
pour s'assurer que l'UI n'a pas bougé.

### Étape 3 — Construction de la structure

Avant de rédiger, produire :
1. La **liste ordonnée des étapes** avec le chemin de navigation prévu pour chaque.
2. La **liste des captures** à prendre (emplacement, contenu, élément à surligner).
3. La **liste des schémas** éventuels (0, 1 ou 2 maximum) et leur placement.
4. La **checklist de vérification** : à quoi reconnaît-on que la config est
   opérationnelle.

Valider cette structure avec Daniel avant de rédiger.

### Étape 4 — Rédaction

Rédiger étape par étape. Pour chaque étape :
- Chemin de navigation en gras, flèches entre menus.
- Actions numérotées à l'impératif.
- Valeurs exactes entre backticks.
- Encadré `🖼️ **Capture à insérer**` à l'endroit précis où la capture doit
  s'insérer.
- Bloc PowerShell alternatif uniquement si pertinent et demandé.

Pour les schémas éventuels, rédiger le prompt Claude Design au format défini
dans la section "Les schémas ponctuels".

Appliquer le filtre stylistique en cours de rédaction — pas uniquement en
relecture. La tentation du rembourrage narratif est plus forte dans un guide
que dans un short, parce que les étapes enchaînent des verbes d'action qu'on est
tenté d'habiller.

### Étape 5 — Relecture et vérification

- Vérifier chaque **chemin de navigation** contre le portail réel (ou contre la
  doc Microsoft Learn la plus récente).
- Vérifier chaque **valeur exacte de champ** (noms, options du menu déroulant).
- S'assurer que la section **Prérequis** couvre licence + rôle RBAC + versions.
- S'assurer que la section **Vérification** existe et est actionnable.
- S'assurer que la section **Rollback** existe et est symétrique à la procédure.
- Vérifier qu'**aucun paragraphe théorique** ne s'est glissé dans la procédure.
  Si c'est le cas, le couper ou le renvoyer vers un dossier.
- Supprimer tout ce qui peut être supprimé sans perte de sens opérationnel.

### Étape 6 — Livraison

Livrer en **Markdown avec frontmatter Astro**, prêt à coller dans le projet.

En fin de document (hors article), indiquer :
- Les **sources consultées** (URLs complètes).
- La **date de vérification**.
- La **liste des captures à produire** (avec description précise pour chacune).
- La **liste des schémas** éventuels avec le prompt Claude Design correspondant.
- Les **points à re-vérifier** avant publication : features en preview, UI
  susceptible d'avoir changé depuis la dernière release note, paramètres dont
  le nom officiel n'est pas certain.

---

## Anti-patterns à éviter absolument

| ❌ À éviter | ✅ À faire à la place |
|---|---|
| "Nous allons voir comment configurer…" | Entrer directement dans la procédure |
| "Cliquez sur le bouton pour valider" | "Cliquer sur **Save**" (valeur exacte, impératif) |
| Paraphrase des libellés du portail | Libellés repris mot pour mot depuis l'UI |
| Explications théoriques longues | Renvoyer vers le dossier correspondant |
| "Il est recommandé de…" sans raison | Justifier en 5 mots, ou supprimer |
| Procédure sans section Vérification | Toujours inclure un test de contrôle |
| Procédure sans section Rollback | Toujours inclure la marche arrière |
| Captures sans description attendue | Décrire précisément contenu + surlignage |
| Mélanger GUI et PowerShell dans la même étape | GUI en principal, PowerShell en bloc séparé |
| Oublier les rôles RBAC dans les prérequis | Lister explicitement les rôles nécessaires |
| Schéma généré avec `visualize:show_widget` | Prompt Claude Design au format imposé |
| Schéma ajouté "pour illustrer" | 0 à 2 schémas, chacun avec une raison précise |
| Tiret cadratin " — " en milieu de phrase | Reformuler : virgule, parenthèse, point, ou restructuration |
| Livrer sans frontmatter Astro | Toujours inclure le bloc `---` complet |

---

## Calibrage de la profondeur

Un guide TuneInCloud répond à **un seul niveau de lecture** : l'admin qui
applique la procédure. C'est ce qui le distingue fondamentalement du dossier
(qui adresse trois niveaux).

Le lecteur arrive avec un besoin précis. Il lit dans l'ordre : prérequis,
procédure, vérification. Si quelque chose échoue, il relit la section pièges
fréquents, puis rollback. Il ne lit **ni l'introduction en détail, ni la
théorie**, ni les considérations architecturales.

Trois tests de validation avant livraison :

**Test 1 — Le test du copier-coller** : les valeurs exactes sont-elles
reproductibles sans interprétation ? Si un nom de champ est ambigu, le guide a
échoué.

**Test 2 — Le test du délai** : si l'admin exécute la procédure et que rien ne se
passe immédiatement, sait-il combien de temps attendre avant de s'inquiéter ?
Chaque délai de propagation significatif doit être signalé.

**Test 3 — Le test du rollback** : si la configuration casse quelque chose en
production, l'admin peut-il revenir en arrière avec le guide seul, sans chercher
ailleurs ? Si non, la section Rollback est incomplète.

Ces trois tests sont la colonne vertébrale d'un guide opérationnel. Un guide qui
passe ces trois tests est publiable. Un guide qui en rate un ne l'est pas.
