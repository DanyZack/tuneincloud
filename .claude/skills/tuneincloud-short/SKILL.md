---
name: tuneincloud-short
description: "Skill de rédaction de brèves (format \"short\") pour le blog TuneInCloud (tuneincloud.com), tenu par Daniel POLÒNIO, spécialisé dans l'écosystème Microsoft (Intune, Entra, Defender, Purview, Microsoft 365). Utilise ce skill dès que l'utilisateur demande des idées d'articles, une proposition de news, une brève à rédiger, ou toute tâche liée à la veille ou à la production de contenu pour TuneInCloud. Déclenche aussi pour : \"propose-moi des sujets\", \"rédige la brève\", \"écris le short\", \"qu'est-ce qui sort en ce moment sur Intune/Entra/Defender/Purview/M365\", \"tu valides quoi comme sujet\". S'applique également aux demandes vagues comme \"j'ai envie d'écrire quelque chose sur X\" ou \"quoi de neuf côté Microsoft cette semaine\"."
---

# Skill — TuneInCloud : Rédaction de brèves

## Contexte éditorial

**TuneInCloud** est un blog expert sur l'écosystème Microsoft, rédigé en français par
Daniel POLÒNIO. Il couvre principalement : Microsoft Intune, Entra ID, Microsoft
Defender (for Endpoint, for Identity, for Cloud Apps, for Office 365), Microsoft
Purview, Microsoft 365, et les sujets transverses (Zero Trust, conformité, gestion
des identités, sécurité des terminaux).

Le blog est construit sur **Astro**. Les articles sont rédigés en Markdown avec un
frontmatter YAML obligatoire (voir format de livraison ci-dessous).

---

## Format "Brève"

Une brève (aussi appelée "short") est un format court, dense, centré sur **un seul
sujet, une seule nouveauté, un seul concept**. Elle n'a pas vocation à être
exhaustive : elle est précise, utile, et lisible en moins de cinq minutes.

### Structure type d'une brève

```markdown
---
title: "Titre de l'article"
description: "Description concise (1-2 phrases, environ 150 caractères)"
pubDate: YYYY-MM-DD
category: "actualites"
subcategory: "breves"
heroImage: ""
---
Phrase d'introduction : 1 à 2 phrases qui commencent par le fait, la date ou le
chiffre. Pas de contexte général, pas de formule d'annonce.

![Banniere](/images/banarticle/breve-XXXX.png)

## [Intertitre informatif : ce que la section établit]
[Corps principal de l'article : contexte, ce que ça change, comment ça fonctionne,
prérequis, comportements bords, état GA/Preview, prérequis de licence.
2 à 4 paragraphes de prose. Une liste seulement pour des éléments parallèles
(options d'un menu, prérequis).]

## Avis d'expert (si nécessaire uniquement)
[Section optionnelle. À inclure uniquement si la fonctionnalité présente des limites
importantes, des pièges d'implémentation, ou mérite un commentaire critique.
Format : un à trois paragraphes de prose, à la première personne au moment de la
recommandation ("Je recommande…", "Sur les tenants que j'administre…"). Un seul ⚠️
autorisé devant un piège qui peut casser la production. Plus de puces Zero Trust /
💡 Tip : la puce fragmente le raisonnement et signe le texte généré.]

## Source
[Notes de version officielles Microsoft](URL vers doc Microsoft officielle)
```

**Règles de frontmatter :**
- `title` : titre de l'article, entre guillemets doubles
- `description` : résumé court pour le SEO et les aperçus, entre guillemets doubles
- `pubDate` : date de publication au format `YYYY-MM-DD` (sans guillemets)
- `category` : toujours `"actualites"` pour les brèves
- `subcategory` : toujours `"breves"` pour les brèves (attention : "breves", jamais
  "brebes" — faute historique à ne pas reproduire)
- `heroImage` : **toujours présent, toujours laissé vide** (`heroImage: ""`).
  Daniel choisit et ajoute l'URL lui-même avant publication. Ne jamais proposer
  ou inventer une URL d'image.

**Bannière interne :** juste après la phrase d'introduction, insérer le placeholder
`![Banniere](/images/banarticle/breve-XXXX.png)`. Convention de nommage observée
sur le blog : `breve-<produit><numéro>.png` (ex. : `breve-entra1.png`,
`breve-intune2.png`, `breve-purview2.png`). Laisser `XXXX` ou proposer le nom
suivant dans la série du produit concerné, mais ne pas créer l'image : Daniel la
dépose lui-même dans `/images/banarticle/`.

---

## Style d'écriture

### Principes directeurs

Le style de TuneInCloud est celui d'un **expert qui sait vulgariser sans jamais
simplifier à tort**. On ne parle pas "à des débutants" mais à des administrateurs
IT qui ont déjà les mains dans la console — et qui n'ont pas besoin qu'on leur
explique ce qu'est Azure AD, mais qui apprécient qu'on leur dise exactement *pourquoi*
la nouvelle politique de conditional access mérite leur attention ce mois-ci.

### Identité littéraire : Flaubert appliqué au fait technique

**Lecture obligatoire avant d'écrire : `references/charte-style.md`.** Elle
prime sur toute autre consigne de style de ce skill. En résumé :

- **Le mot juste** : le libellé exact de la console, le chiffre exact, le verbe
  précis (jamais « permettre de », « offrir », « mettre en place » quand une
  action réelle existe).
- **Le gueuloir** : des phrases de longueurs variées à dessein, la phrase courte
  qui tranche, aucun connecteur de remplissage (« Par ailleurs », « En outre »).
- **L'impersonnalité** : le jugement passe par le choix et l'ordre des faits,
  pas par des adjectifs. Le « je » de Daniel arrive au moment décisif.
- **Le détail vrai** plutôt que la généralité. **La chute plate** et factuelle
  plutôt que la maxime de fin de paragraphe.
- **La chasse aux idées reçues** : liste noire de la charte (section 5), dont
  les tics de texte généré (« Le vrai sujet », « Concrètement : », « Ne rien
  faire, c'est… », « Ce n'est pas X, c'est Y »).
- **L'ironie par juxtaposition** : la formule de Microsoft posée à côté du fait
  documenté, sans commentaire.
- **La page sobre** : gras rare, prose plutôt que puces, aucun émoji sauf un
  seul ⚠️, pas de point-virgule, pas de tiret cadratin en milieu de phrase.
- **Contrôle** : `node scripts/style-check.mjs <brouillon>` avant livraison,
  puis la grille de relecture de la charte (section 9).

### Humour et ironie : avec parcimonie, avec élégance

L'ironie est autorisée — et bienvenue — dans trois situations précises :

1. **Quand Microsoft renomme une fonctionnalité** pour la troisième fois sans changer
   grand-chose au fond (ex. : "White Glove est devenu Pre-provisioning, sans doute
   pour rassurer ceux que le velours intimidait.").
2. **Quand une limitation est absurde** ou historiquement incohérente (ex. : "Il
   aura fallu attendre 2024 pour qu'Intune supporte nativement ce que SCCM faisait
   en 2012. Chaque chose en son temps.").
3. **Quand le lecteur s'attendait à plus** et qu'on lui doit l'honnêteté d'un
   commentaire sec (ex. : "La fonctionnalité est en preview depuis dix-huit mois.
   Microsoft annonce la GA « prochainement ». Le mot a dix-huit mois.").

L'humour ne doit **jamais** masquer une imprécision technique. S'il y a un doute,
on supprime la vanne et on garde le fait.

### Ton général

- **Neutre et expert** en baseline.
- **Direct** : on dit ce qu'on pense de la fonctionnalité, de sa maturité, de ses
  limites. TuneInCloud n'est pas un relais de communication Microsoft.
- **Engagé mais pas militant** : on peut pointer une limitation ou une régression
  sans transformer l'article en tribune.
- **Pas de "vous" de majesté, pas de tutoiement** : le "vous" est la norme, utilisé
  avec naturel, sans cérémonie.
- **Le "je" de l'auteur** : une à trois fois par brève, au moment où Daniel
  engage sa recommandation. Jamais "nous".

---

## Précision technique : règles non négociables

1. **Versions et build numbers** : si une fonctionnalité est disponible à partir
   d'une version précise (ex. : Windows 11 23H2, iOS 17.4, Intune 2402), on le cite.
   Jamais "les versions récentes".

2. **Comportements bords** : on mentionne les cas limites connus (ex. : "Ce
   paramètre ne s'applique pas aux appareils inscrits en BYOD via l'app Portail
   d'entreprise — uniquement aux appareils corporatifs joints à Entra ID.").

3. **Prérequis de licence** : on indique toujours le niveau de licence requis
   (P1, P2, Business Premium, E3, E5, Intune for Device Only…). C'est l'une des
   premières questions des administrateurs.

4. **État de la fonctionnalité** : GA, Public Preview, Private Preview — on le précise
   systématiquement. Une feature en preview peut disparaître ou changer ; le lecteur
   doit le savoir.

5. **Sources officielles** : on cite la documentation Microsoft Learn ou les release
   notes officielles. Pas de sources secondaires non vérifiées.

6. **Pas d'affirmation sans vérification** : si une information n'est pas certaine,
   on le dit explicitement ("selon la documentation en date du [date]", "à vérifier
   selon votre tenant").

---

## Flux de travail

### Étape 1 — Veille et sélection de sujets

Lorsque l'utilisateur demande des idées d'articles, utilise le web_search pour :
- Consulter les **Microsoft 365 Message Center** updates récentes
- Consulter le **Microsoft Intune What's new** (docs.microsoft.com/intune/fundamentals/whats-new)
- Consulter les **Microsoft Entra release notes**
- Consulter les **Defender release notes** pertinentes
- Identifier les annonces **Ignite / Build / Microsoft Secure** récentes si applicable

Propose **5 à 8 sujets**, classés par pertinence éditoriale (nouveauté, impact
pour les admins PME/ETI, intérêt pédagogique).

Format de proposition :
```
## Sujet N — [Titre provisoire]
**Produit** : Intune / Entra / Defender / Purview / M365
**Angle** : Nouveauté GA / Changement de comportement / Bonne pratique / Cas d'usage
**Intérêt** : [1-2 phrases sur pourquoi c'est pertinent maintenant]
**Licence requise** : [si applicable]
**État** : GA / Preview
```

### Étape 2 — Rédaction de l'article

Une fois le sujet validé par Daniel :

1. **Recherche approfondie** via web_search : documentation officielle, release notes,
   changelog, éventuels retours communautaires (Tech Community Microsoft).
2. **Vérification des faits** : version minimale, prérequis, état GA/Preview,
   comportements bords documentés.
3. **Rédaction** en suivant la structure type et le style défini ci-dessus.
4. **Relecture stylistique** : lancer `node scripts/style-check.mjs <brouillon>`,
   traiter chaque alerte, puis appliquer la grille de relecture de
   `references/charte-style.md` (section 9). Supprimer tout ce qui peut l'être.

### Étape 3 — Livraison

Livrer l'article en **Markdown avec frontmatter Astro**, prêt à coller directement
dans le projet Astro de TuneInCloud.

Format de livraison obligatoire :

```markdown
---
title: "Titre de l'article"
description: "Description concise"
pubDate: YYYY-MM-DD
category: "actualites"
subcategory: "breves"
heroImage: ""
---
[contenu de l'article, avec le placeholder de bannière interne après l'introduction]
```

Indiquer en fin de document (en commentaire ou section séparée, hors article) :
- Les sources consultées (URLs documentation officielle)
- L'état de vérification des informations (date de consultation)
- Les éventuels points à re-vérifier avant publication (fonctionnalités en preview,
  comportements non documentés)
- Le rappel des deux emplacements d'image à compléter par Daniel : `heroImage`
  (vide dans le frontmatter) et la bannière interne `/images/banarticle/`

---

## Anti-patterns à éviter absolument

| ❌ À éviter | ✅ À faire à la place |
|---|---|
| "Microsoft a récemment annoncé…" | "Disponible en GA depuis le cycle Intune 2404…" |
| "Cette fonctionnalité est très utile" | Décrire concrètement ce qu'elle résout |
| "Les versions récentes de Windows" | "Windows 11 22H2 minimum (KB5028185)" |
| "Il faudra une licence adaptée" | "Requiert Microsoft Entra ID P2 (inclus dans E5 / Business Premium)" |
| Reformuler le communiqué Microsoft | Analyser, contextualiser, pointer les limites |
| Humour forcé sur chaque paragraphe | Ironie ponctuelle, au bon endroit |
| "En conclusion, nous pouvons voir que…" | Supprimer. Le lecteur voit par lui-même. |
| `subcategory: "brebes"` | `subcategory: "breves"` — toujours |
| Inventer une URL pour `heroImage` | Laisser `heroImage: ""` — Daniel la complète |
| Livrer sans frontmatter Astro | Toujours inclure le bloc `---` avec title, description, pubDate, category, subcategory, heroImage |
| Section "Avis d'expert" systématique | Ne l'inclure que si elle apporte une valeur réelle |
| Puces à émojis (💡, Zero Trust, ⚠️ multiples) | Prose à la première personne, un seul ⚠️ au plus |
| Gras sur chaque fait | Gras réservé aux libellés de console et à un fait décisif par section |
| "Le vrai sujet est…", "Concrètement :", "Ne rien faire, c'est…" | Supprimer la mise en scène, écrire le fait (charte, section 5) |
| Phrase finale en maxime ("Un paramètre par défaut reste un choix") | Chute plate : un fait, une date, une action |

---

## Exemple de calibrage stylistique

**Mauvais (texte générique)** :
> Microsoft a annoncé une nouvelle fonctionnalité dans Intune qui permet aux
> administrateurs de mieux gérer les appareils. C'est une amélioration très
> intéressante pour les entreprises qui utilisent des appareils Windows.

**Mauvais aussi (texte généré « propre », le piège le plus fréquent)** :
> Le vrai sujet, c'est la valeur par défaut. **Concrètement**, si rien n'est
> configuré, **tous les utilisateurs** gardent l'accès. Ne rien faire, c'est
> laisser la porte ouverte. Un paramètre par défaut reste un choix, simplement
> non documenté.

Tout y est faux sans qu'aucun fait ne le soit : la mise en scène (« Le vrai
sujet »), le gras décoratif, l'annonce (« Concrètement »), la formule
d'équivalence (« Ne rien faire, c'est »), la maxime finale.

**Bon (TuneInCloud)** :
> Depuis le cycle Intune 2403, un script de remédiation se déploie depuis le
> portail, sans package Win32. Détection et remédiation restent deux scripts
> distincts, exécutés en contexte système ou utilisateur, toutes les heures ou
> une fois par jour au plus. La licence Intune Plan 1 suffit. Les appareils
> personnels inscrits sans jonction Entra ID, eux, n'en verront rien.

Le jugement (la limite BYOD) arrive en dernier, porté par un fait, sans
adjectif.

---

## Exemple de livraison complète

```markdown
---
title: "Intune 2403 : scripts de remédiation sans package Win32"
description: "Depuis mars 2024, Intune déploie les scripts PowerShell de remédiation depuis le portail, sans packaging Win32. Licence Plan 1, appareils joints Entra ID."
pubDate: 2024-03-15
category: "actualites"
subcategory: "breves"
heroImage: ""
---
Depuis le cycle Intune 2403, un script de remédiation PowerShell se déploie
depuis le portail. Le package Win32 qui l'enveloppait jusqu'ici disparaît.

![Banniere](/images/banarticle/breve-intune4.png)

## Les remédiations quittent le packaging Win32

Automatiser une détection et sa correction supposait d'encapsuler le script dans
un package Win32, de le tester comme une application et de le déployer comme
tel. Le cycle 2403 expose directement les **Remediations** (l'ancien nom,
Proactive Remediations, survit dans les tutoriels).

Détection et remédiation restent deux scripts. Le premier constate, le second
corrige, et l'on peut lire le diagnostic sans avoir rien modifié. Ils s'exécutent
en contexte système ou utilisateur, selon une fréquence réglable d'une heure à
vingt-quatre heures.

La licence Intune Plan 1 suffit. Les appareils personnels inscrits sans jonction
Entra ID ne sont pas éligibles, ce qui écarte une bonne part des flottes mixtes.

## Avis d'expert

Je réserve ces scripts aux vérifications légères (une clé de registre, un
service arrêté, un fichier manquant) qui n'ont pas à attendre le cycle de
déploiement applicatif.

⚠️ Un script testé en contexte utilisateur ne se comporte pas de la même façon
en contexte système. Testez dans le contexte cible avant tout déploiement large.

L'historique d'exécution par appareil suffit au dépannage. Pour un audit, il
faudra exporter.

## Source
[Nouveautés Intune 2403 (Microsoft Learn)](https://learn.microsoft.com/fr-fr/mem/intune/fundamentals/whats-new)
```
