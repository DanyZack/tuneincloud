# Rapport de relecture : Copilot, qui téléverse des agents avancés ? Choix au 25/10

**Fichier** : `src/content/draft/2026-10-19-copilot-televersement-agents-avances.md`
**Format** : Brève (`actualites` / `breves`)
**Date de publication prévue** : 2026-10-19
**Date de relecture** : 2026-10-19
**Mode** : brouillon (corrections en place, aucune opération git)
**Verdict global** : ⚠️ Publiable après corrections. Corrections appliquées. Restent l'illustration (bannière, hero) et trois arbitrages de Daniel. Aucune source n'a pu être lue en direct : tous les faits sont recoupés via des extraits de recherche web.

## Synthèse

La brève est juste sur l'essentiel : définition avancé/basique, trois options, périmètre (packages téléversés par l'organisation, hors agents Microsoft et tiers), échéance du 25 octobre et valeur par défaut permissive, tous concordants sur 6 à 8 extraits indépendants. Quatre écarts ont été corrigés : le chemin de console traduit (libellés français non vérifiés), un statut « sans phase preview » remplacé par le statut GA effectivement annoncé, une mention de rôle qui contredisait la phrase où elle se trouvait, et une liste de boutons incomplète pour MC1484008. Une déduction (impact sur Agents Toolkit) était présentée comme un fait. Elle est maintenant donnée comme hypothèse. Le point faible reste structurel : ni le Message Center ni Learn n'ont pu être lus en direct.

## Pré-contrôles mécaniques

| Contrôle | Résultat |
|---|---|
| Tirets cadratins | 0 occurrence (avant et après) |
| Faute « brebes » | aucune, `subcategory: "breves"` |
| Liens internes | `/blog/dossier-2026-04-15-entra-agent-id/` : fichier présent ; `/blog/2026-04-29-article-claude-copilot-m365/` : fichier présent |
| Frontmatter | `category` et `subcategory` valides (Zod) ; `title` 59 car. ; `description` 152 car. ; **aucune modification du frontmatter** ; `pubDate` 2026-10-19 inchangée |
| Nombre de mots du corps | 494 avant, 500 après (fourchette brève 250-500 : conforme, à la limite haute) |
| Bannière | `/images/banarticle/breve-copilot1.png` : **fichier absent** (nouvelle série, seul `article-copilot1.png` existe). À produire par l'illustrateur |
| `heroImage` | vide (`""`), toléré par le schéma et les gabarits (test de vérité), à fournir par l'illustrateur |

## 1. Sources

Contexte d'accès : `learn.microsoft.com` est refusé par le proxy de sortie (403 sur CONNECT, refus de politique, non contourné) ; `mc.merill.net` et `techcommunity.microsoft.com` ne résolvent pas en DNS via WebFetch ; l'API GitHub n'est pas ouverte sur les dépôts `MicrosoftDocs` dans cette session ; navigateur intégré indisponible. Vérification faite par recoupement d'extraits WebSearch (miroirs Message Center : mc.merill.net, msmessagecenter.com, cloudscout, pupuweb, m365admin.handsontek, mwpro, topedia, kmo.partners).

| URL | État | Dernière vérification | Commentaire |
|---|---|---|---|
| `mc.merill.net/message/MC1472007` | ⚠️ Non lu en direct | 2026-10-19 | Indexé avec le titre exact. Contenu recoupé sur 8 extraits : options, définition avancé/basique, périmètre, 25/10, défaut permissif, « General Availability (Worldwide) » concordants. Un miroir indique un début au 12/10/2026 (voir décision 1) |
| `learn.microsoft.com/en-us/microsoft-365/copilot/microsoft-365-copilot-page` | ⚠️ Non lu en direct (403 proxy) | 2026-10-19 | Indexé sous « Manage Microsoft Copilot Settings ». Extrait citant le chemin **Copilot > Settings > All settings > Advanced package uploads** |
| `learn.microsoft.com/en-us/microsoft-365/copilot/agent-essentials/agent-lifecycle/agent-upload-agents` | ⚠️ Non lu en direct (403 proxy) | 2026-10-19 | Indexé sous « Upload Microsoft Copilot custom agents ». L'extrait décrit le téléversement de ZIP par l'admin (Agents > Upload custom agent) ; il ne mentionne pas le paramètre avancé. Source de contexte, pertinente |
| `mc.merill.net/message/MC1484008` | ⚠️ Non lu en direct | 2026-10-19 | Indexé avec le titre exact, publié le 30/09/2026. Calendrier concordant ; liste des boutons remplacés : Agents, **Agents & Skills**, Customize (corrigé) |
| `techcommunity.microsoft.com/.../4559682` | ⚠️ Non lu en direct (DNS) | 2026-10-19 | Indexé. Contenu (plugins regroupant agents, compétences, connecteurs, serveurs MCP) concordant avec les pages Learn `copilot-plugins/overview` vues en extrait |

Aucune URL n'a été constatée en 404 ou redirigée, mais aucune n'a pu être résolue. Les sources primaires sont des miroirs du Message Center (mc.merill.net) : usage admis sur le blog, à condition de les nommer comme miroirs, ce que fait l'article.

## 2. Exactitude technique

- **Statut** : « sans phase preview annoncée » est une formulation par la négative. Les miroirs reprennent « General Availability (Worldwide) ». Corrigé en « annoncé en disponibilité générale (GA) mondiale ».
- **Rôle d'administration** : la parenthèse « (il s'adresse aux administrateurs IA) » contredisait la phrase (« ne précise pas le rôle requis »). Un seul résumé tiers parle d'« AI Administrators », aucun extrait officiel. Parenthèse retirée, la mention « à vérifier dans votre tenant » est conservée.
- **Licence** : aucune source ne la précise. L'article le dit honnêtement. Conforme à la charte (mention explicite de l'inconnu).
- **Chemin de console** : « Copilot > Paramètres > Tous les paramètres » était une traduction non vérifiée des libellés. Remplacé par le libellé anglais vérifié en extrait (`Copilot > Settings > All settings > Advanced package uploads`), cohérent avec le nom du paramètre resté en anglais.
- **Valeur par défaut** : « ouvert à tous si aucun choix au 25/10, comportement actuel conservé » confirmé par au moins 5 extraits concordants (« If no action is taken, advanced-package uploads remain allowed by default »). Conservé.
- **MC1484008** : boutons remplacés = Agents, Agents & Skills et Customize. Corrigé. Calendrier (registre fin septembre à fin octobre, bouton Plugins fin octobre à fin novembre 2026) confirmé.
- **Agents Toolkit** : l'affirmation « elle bloque aussi vos propres équipes qui testent avec le Microsoft 365 Agents Toolkit » est une déduction, non documentée. Reformulée au conditionnel avec mention explicite.
- Nomenclature : Microsoft 365 Copilot, Microsoft Entra ID, Model Context Protocol, Microsoft 365 Agents Toolkit : conformes.

## 3. Style et ton

- 0 tiret cadratin.
- Pas de jargon marketing. Ton direct, vouvoiement respecté.
- « ce que nous défendions déjà dans notre dossier » : « nous » éditorial léger, non autoritaire, laissé en l'état (voix de l'auteur).
- Cohérence des libellés : les libellés de console et de boutons sont désormais tous en anglais (Settings, All settings, Agents & Skills, Customize). Les options (« tous les utilisateurs », etc.) restent décrites en français, en minuscules, comme descriptions et non comme libellés exacts.

## 4. Évolutions depuis la publication

Sans objet (brouillon daté du jour).

## Corrections appliquées

### Correction N°1 : Source / Technique (chemin de console)

**Avant** :
> **Copilot > Paramètres > Tous les paramètres > Advanced package uploads**

**Après** :
> **Copilot > Settings > All settings > Advanced package uploads**

**Raison** : seul le libellé anglais est attesté (extrait de la page Learn « Manage Microsoft Copilot Settings »). Les libellés français étaient une traduction du rédacteur.

### Correction N°2 : Technique (statut)

**Avant** :
> Le déploiement a commencé le 25 septembre 2026 et doit s'achever fin octobre, sans phase preview annoncée.

**Après** :
> Le déploiement, annoncé en disponibilité générale (GA) mondiale, a commencé le 25 septembre 2026 et doit s'achever fin octobre.

**Raison** : la charte exige le statut GA/Preview explicite ; le MC le donne (« General Availability (Worldwide) »).

### Correction N°3 : Technique (rôle)

**Avant** :
> Le message ne précise ni la licence des utilisateurs concernés ni le rôle d'administration requis (il s'adresse aux administrateurs IA), à vérifier dans votre tenant.

**Après** :
> Le message ne précise ni la licence des utilisateurs concernés ni le rôle d'administration requis, à vérifier dans votre tenant.

**Raison** : parenthèse contradictoire avec la phrase et non sourcée officiellement (un seul résumé tiers mentionne « AI Administrators »).

### Correction N°4 : Technique (déduction présentée comme un fait)

**Avant** :
> mais elle bloque aussi vos propres équipes qui testent des agents avec le Microsoft 365 Agents Toolkit.

**Après** :
> mais elle risque de bloquer aussi vos propres équipes qui testent des agents avec le Microsoft 365 Agents Toolkit (cas non documenté par Microsoft).

**Raison** : aucune source ne décrit l'effet du paramètre sur le chargement de test via Agents Toolkit.

### Correction N°5 : Source (MC1484008, liste des boutons)

**Avant** :
> remplace les boutons Agents et Personnaliser par un bouton **Plugins**

**Après** :
> remplace les boutons Agents, Agents & Skills et Customize par un bouton **Plugins**

**Raison** : le MC cite trois boutons ; libellés gardés en anglais par cohérence avec la correction N°1 (libellé français de « Agents & Skills » inconnu).

## Décisions pour Daniel

1. **Date de début MC1472007** : 25/09/2026 (majorité des miroirs) conservée. Un miroir indique « Rollout begins October 12, 2026 », peut-être une révision du message. À trancher en lisant le MC dans votre Centre d'administration ; si le 12/10 est la version en vigueur, corriger la phrase.
2. **Rôle d'administration** : si vous confirmez dans votre tenant le rôle requis (AI Administrator ou Global Administrator), l'ajouter : c'est la première question du lecteur.
3. **Libellés en anglais** : choix fait faute de libellés français vérifiés. Si votre console en français affiche d'autres libellés, les substituer.

## Ce qui n'a PAS pu être vérifié

- Texte intégral de MC1472007 et MC1484008 (aucune lecture directe, extraits seulement).
- Contenu actuel des deux pages Learn (403 proxy) et du billet Tech Community (DNS).
- Date de début exacte (25/09 ou 12/10).
- Licence requise et rôle d'administration.
- Effet de l'option « aucun utilisateur » sur Microsoft 365 Agents Toolkit.
- Libellés français de la console.
- Existence de la bannière `breve-copilot1.png` (absente, à créer) et hero image (à fournir).
