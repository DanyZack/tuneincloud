# Rapport de relecture : Entra ID, remplacer les règles memberOf avant le 3 novembre

**Fichier** : `src/content/draft/2026-10-12-entra-memberof-groupes-dynamiques.md`
**Format** : Guide (`guides` / `entra`)
**Date de publication prévue** : 2026-10-12
**Date de relecture** : 2026-10-12
**Mode** : brouillon (corrections en place, aucune opération git)
**Verdict global** (révisé le 2026-10-12, passe n°2) : ⚠️ Publiable après corrections. Corrections de fond appliquées, point bloquant MC1488839 **levé** par le texte du rappel final lu par Daniel. Restent à l'illustrateur la bannière et la hero image, et deux arbitrages mineurs de Daniel (voir « Passe n°2 »).

*Verdict initial (passe n°1) : ⚠️ Publiable après corrections, avec une décision bloquante sur MC1488839.*

## Synthèse

Le fond technique est solide : échéance, comportement des objets figés, limites de la preview (membres directs, non-combinaison, mise à jour défaillante à la suppression d'un groupe source, quota de 15 000), conversion qui conserve nom et ID, statuts de traitement et alerte des 24 heures correspondent tous mot pour mot aux pages Learn actuelles (lues dans `MicrosoftDocs/entra-docs`, branche `main`). Le script d'inventaire est correct sur le fond ; un test fragile (`ContainsKey`) a été remplacé. Deux écarts de fond corrigés : la licence des politiques d'attribution automatique (Entra Suite oubliée) et l'étape 2 qui limitait la cartographie Intune aux groupes d'appareils. Reste un point majeur que la relecture n'a pas pu trancher : un message **MC1488839 (6 octobre 2026)**, connu uniquement par des miroirs tiers, prolongerait jusqu'au **31 mars 2027** les configurations `memberOf` existantes pour les tenants **Entra ID Governance**, avec un remplaçant annoncé « fin 2026 ». S'il est confirmé, le titre, l'introduction, le calendrier et le rollback sont inexacts pour une partie du lectorat.

## Pré-contrôles mécaniques

| Contrôle | Résultat |
|---|---|
| Tirets cadratins en milieu de phrase | 0 occurrence |
| Faute « brebes » | aucune (guide, sans objet) |
| Liens internes | `/blog/2026-04-14-entra-backupandrecovery/` → fichier présent ; `/blog/2026-10-08-intune-baseline-windows-11-26h2/` → fichier présent |
| Frontmatter | `category: guides`, `subcategory: entra` valides (Zod) ; `title` 60 caractères (cible 55-60) ; `description` **161 caractères** avant correction, 159 après |
| Nombre de mots du corps | 1 598 avant, 1 627 après (dont ~140 mots de code et ~140 mots de consignes schéma/capture qui disparaîtront). Fourchette guide : 800-2 500. Conforme |
| Bannière | `/images/banarticle/guide-entra1.png` : **fichier absent** (aucune bannière `guide-*` n'existe). À produire par l'illustrateur |
| `heroImage` | vide (`""`), à fournir par l'illustrateur |

## 1. Sources

Contexte : `learn.microsoft.com` renvoie 403 via le proxy ; `mc.merill.net`, `office365itpros.com`, `pupuweb.com`, `msmessagecenter.com`, `petri.com` ne résolvent pas (DNS). Les pages Learn ont été lues en Markdown source sur GitHub (`MicrosoftDocs/entra-docs` et `microsoftgraph/microsoft-graph-docs-contrib`, branche `main`). Le navigateur intégré n'était pas disponible dans cette session.

| URL | État | Vérifié le | Commentaire |
|---|---|---|---|
| `mc.merill.net/message/MC1448379` | ⚠️ Non résolue (DNS) | 2026-10-12 | Titre et date du 5 août 2026 confirmés par résultats de recherche (index mc.merill.net, entradiff, BornCity du 11/08). Corps non lu |
| `mc.merill.net/message/MC1488834` | ⚠️ Non résolue (DNS) | 2026-10-12 | Titre « Final reminder… by November 3, 2026 » confirmé par l'index ; date du 5 octobre 2026 confirmée par extrait de recherche uniquement |
| `learn.microsoft.com/en-us/entra/identity/users/groups-dynamic-rule-member-of` | ✅ OK (source GitHub) | 2026-10-12 | `ms.date` 08/04/2026. Échéance 3/11/2026, « stop updating and remain in their last known state », Teams/SharePoint/CA/licences/packages cités, motif « can slow dynamic membership processing for all groups », remplaçant « continuing to develop » sans date, limites de preview conformes. **Aucune mention d'une prolongation 2027** |
| `learn.microsoft.com/en-us/entra/id-governance/entitlement-management-access-package-auto-assignment-policy` | ✅ OK (source GitHub) | 2026-10-12 | `ms.date` 08/05/2026. Politiques « quarantined », assignations ni ajoutées ni retirées. Section « Find automatic assignment policies that use the memberOf attribute », script lecture seule, `EntitlementManagement.Read.All`, sortie `memberof-auto-assignment-policies.csv`. Licence : include « Microsoft Entra ID Governance or Microsoft Entra Suite » |
| `learn.microsoft.com/en-us/entra/identity/users/groups-dynamic-membership` | ✅ OK (source GitHub) | 2026-10-12 | P1 ou Intune for Education par utilisateur unique ; pas de licence pour les appareils ; 15 000 groupes ; `extensionAttribute1-15` utilisateur et appareil |
| `learn.microsoft.com/en-us/entra/identity/users/groups-change-type` | ✅ OK (source GitHub) | 2026-10-12 | `ms.date` 07/10/2025. Nom et ID conservés ; Groups Administrator ; libellé **Assigned (static)** dans le texte ; note sur la perte d'accès pendant le traitement |
| `learn.microsoft.com/en-us/entra/identity/users/groups-create-rule` | ✅ OK (source GitHub) | 2026-10-12 | `Dynamic rule processing status` / `Update complete` / `Last membership change` sur la page de vue d'ensemble ; alerte au-dessus de **All groups** après 24 h sans traitement |
| `learn.microsoft.com/en-us/entra/identity/role-based-access-control/admin-units-members-dynamic` | ✅ OK (source GitHub) | 2026-10-12 | P1/P2 membres et administrateurs ; Privileged Role Administrator ; **Properties → Membership type → Assigned** ; « current members remain intact » |
| `learn.microsoft.com/en-us/graph/api/group-list` | ✅ OK (source GitHub) | 2026-10-12 | Ressource `group` : `membershipRule` filtrable en `eq, ne, not, ge, le, startsWith` (pas `contains`, l'affirmation de l'article est exacte) ; `groupTypes` filtrable ; `assignedLicenses` exige `$select` |
| `office365itpros.com/2022/06/08/dynamic-azure-ad-group-members/` | ⚠️ Non résolue (DNS) | 2026-10-12 | Date de juin 2022 cohérente avec l'URL. Source tierce (exception tolérée pour un fait historique) |
| `office365itpros.com/2026/08/07/memberof-rule-operator/` | ⚠️ Non résolue (DNS) | 2026-10-12 | Existe (indexée). Contenu non lu |

Pages consultées en appui (non citées) : ressource Graph `administrativeUnit` v1.0 (`membershipType` = `dynamic`/`assigned`, `null` par défaut) ; permissions et rôles de `GET /identity/conditionalAccess/policies` (Policy.Read.All, Global Reader admis), `GET /directory/administrativeUnits` (AdministrativeUnit.Read.All), `GET /identityGovernance/entitlementManagement/assignmentPolicies` (EntitlementManagement.Read.All, Global Reader admis).

## 2. Exactitude technique

Réponses aux dix points transmis par le rédacteur :

1. **Dates MC** : 5 août 2026 (MC1448379) confirmé par plusieurs extraits concordants ; 5 octobre 2026 (MC1488834) confirmé par un seul extrait. Liens mc.merill.net non lus. **Découverte : MC1488839** (voir Points pour Daniel).
2. **Script** :
   - `` `$filter `` et `` `$select `` en chaîne double : échappement correct.
   - `ContainsKey('membershipType')` : fonctionne avec le Hashtable par défaut d'`Invoke-MgGraphRequest`, mais casse si la sortie devient un `OrderedDictionary` ou un PSObject (`-OutputType PSObject`). Remplacé par `if ($o.membershipType)` : seules les unités administratives exposent la propriété, et toute UA portant une règle a un `membershipType` non nul. Correction n°5.
   - Pagination : **le point soulevé ne s'applique pas**, les trois appels (CA, groupes, UA) passent par `Get-GraphAll`, qui suit `@odata.nextLink`.
   - Autres contrôles : filtre `groupTypes/any(...)` admis par Graph ; `assignedLicenses` bien demandé en `$select` ; `.displayName` sur une collection de hashtables fonctionne par énumération de membres ; `if` en valeur de hashtable valide. Script non exécuté sur un tenant.
3. **« Assigned » vs « Assigned (static) »** : la page groupes de Learn écrit « Assigned (static) », la page UA écrit « Assigned ». Laissé « **Assigned** » (préfixe commun aux deux libellés). Libellé exact du portail non vérifié.
4. **Export des groupes** : Learn dit seulement « Export dynamic membership groups from the Microsoft Entra admin center », sans chemin ni bouton. Le chemin **Entra ID → Groups → All groups** a été retiré. Correction n°6.
5. **Licence des politiques d'attribution automatique** : include Learn = « Microsoft Entra ID Governance **or Microsoft Entra Suite** ». Complété. Correction n°4.
6. **Global Reader** : suffisant. Les pages Graph listent Global Reader pour la lecture des stratégies CA et des politiques d'Entitlement Management ; groupes et UA sont lisibles par tout administrateur en lecture. Aucune correction.
7. **Conservation des membres à la conversion dynamique → attribué** : documentée pour les **unités administratives** (« current members remain intact »), **pas pour les groupes**. Le texte n'affirme rien d'explicite pour les groupes : aucune correction, à tester en tenant.
8. **Statut d'un groupe figé après le 3/11** : non documenté. L'article ne l'affirme pas. La phrase d'introduction « aucune alerte n'est prévue » reposait sur des sources tierces : reformulée en « Microsoft ne documente aucune alerte ». Correction n°2.
9. **Chemins Intune de l'étape 2** : l'article ne donne aucun chemin de menu précis, seulement des types d'affectation. Rien à vérifier. En revanche l'étape limitait la cartographie aux groupes d'**appareils**, alors que les groupes d'utilisateurs portent aussi des affectations Intune (applications, conformité, profils). Correction n°7.
10. **Entra Backup and Recovery** : la phrase est prudente (« vérifiez dans votre tenant ce qu'elle restaure réellement ») et n'affirme rien. Conservée.

Autres points vérifiés :

- Motif officiel : Learn écrit « can slow », pas un constat généralisé. Correction n°3.
- Rollback avant le 3/11 : rétablir une règle `memberOf` impose l'éditeur de syntaxe (**Edit**), le générateur de règles ne la prend pas en charge (Learn). Précisé. Correction n°8.
- Rôles : Groups Administrator, Privileged Role Administrator, Identity Governance Administrator : conformes à Learn.
- Nomenclature : Microsoft Entra ID, Entra Connect, Intune : conformes.

## 3. Style et ton

- Aucun tiret cadratin, aucun jargon marketing, vouvoiement respecté.
- Concision : 1 455 mots hors code avant relecture. Pas de rembourrage manifeste : les sections suivent le gabarit guide. Les ~140 mots des blocs « Schéma à générer » et « Capture à insérer » disparaîtront au passage de l'illustrateur, ce qui ramène la prose autour de 1 340 mots après corrections. Aucune coupe imposée, pour préserver la voix de l'auteur.

## 4. Évolutions techniques depuis la publication

Sans objet (brouillon daté du jour). Voir toutefois MC1488839, évolution postérieure aux sources citées.

## Corrections appliquées

### Correction N°1 : Frontmatter (description)

**Avant** :
> Inventaire Graph, dépendances CA, licences et Intune, remplacement et contrôle.

**Après** :
> Inventaire Graph, dépendances CA, licences et Intune, remplacement, contrôle.

**Raison** : 161 caractères, au-dessus de la cible 140-160. Passée à 159. `title` et `pubDate` inchangés.

### Correction N°2 : Technique (introduction)

**Avant** :
> Rien n'est supprimé et aucune alerte n'est prévue : les groupes concernés…

**Après** :
> Rien n'est supprimé et Microsoft ne documente aucune alerte : les groupes concernés…

**Raison** : aucune source Microsoft lue n'affirme qu'il n'y aura pas d'alerte ; on ne peut affirmer que l'absence de documentation.

### Correction N°3 : Technique (motif officiel)

**Avant** :
> pendant la preview, `memberOf` a ralenti le traitement dynamique de **tous** les groupes du tenant.

**Après** :
> pendant la preview, `memberOf` peut ralentir le traitement dynamique de **tous** les groupes du tenant.

**Raison** : Learn : « we observed that using `memberOf` can slow dynamic membership processing for all groups in a tenant ».

### Correction N°4 : Technique (licence)

**Avant** :
> Les politiques d'attribution automatique relèvent de Microsoft Entra ID Governance.

**Après** :
> Les politiques d'attribution automatique relèvent de Microsoft Entra ID Governance ou Microsoft Entra Suite.

**Raison** : include Learn `entra-entra-governance-license.md` utilisé par la page des politiques d'attribution automatique.

### Correction N°5 : Technique (script)

**Avant** :
> `Type = if ($o.ContainsKey('membershipType')) { 'AdministrativeUnit' } else { 'Group' }`

**Après** :
> `Type = if ($o.membershipType) { 'AdministrativeUnit' } else { 'Group' }`

**Raison** : `ContainsKey` dépend du type exact de dictionnaire renvoyé ; le test de valeur fonctionne avec Hashtable, OrderedDictionary et PSObject. Toute UA avec règle a `membershipType` renseigné (ressource Graph `administrativeUnit`).

### Correction N°6 : Source (export des groupes)

**Avant** :
> …par export des groupes dynamiques depuis **Entra ID → Groups → All groups**.

**Après** :
> …par export des groupes dynamiques depuis le centre d'administration Microsoft Entra.

**Raison** : Learn ne donne ni chemin ni bouton ; on s'en tient à ce que la source affirme.

### Correction N°7 : Technique (étape 2)

**Avant** :
> 1. Pour chaque groupe d'**appareils** de l'inventaire, ouvrir le **centre d'administration Intune**…

**Après** :
> 1. Pour chaque groupe de l'inventaire, d'**utilisateurs** comme d'**appareils** (règle en `user.memberof` ou `device.memberof`), ouvrir le **centre d'administration Intune**…

**Raison** : les affectations Intune (applications, conformité, profils) ciblent aussi des groupes d'utilisateurs ; limiter aux appareils laissait un angle mort. Le type se lit dans la colonne `Rule` du CSV.

### Correction N°8 : Technique (rollback)

**Avant** :
> …via **Properties → Membership type → Dynamic User / Dynamic Device**. Elle fonctionne…

**Après** :
> …via **Properties → Membership type → Dynamic User / Dynamic Device**, en saisissant la règle dans l'éditeur de syntaxe (**Edit**), le générateur de règles ne gérant pas `memberOf`. Elle fonctionne…

**Raison** : Learn : « MemberOf isn't yet supported in the rule builder UI. Select **Edit** to write the rule in the **Rule syntax** box. »

## Ce qui n'a PAS pu être vérifié

- Texte intégral de MC1448379 et MC1488834 (mc.merill.net inaccessible) ; dates connues par extraits de recherche.
- **MC1488839** (prolongation au 31/03/2027 pour Entra ID Governance) : connu uniquement par l'index de recherche et des miroirs tiers (pupuweb), tous inaccessibles en lecture.
- Les deux articles Office 365 IT Pros (DNS).
- Libellés exacts du portail : « Assigned » vs « Assigned (static) », bouton d'export des groupes et présence de la règle dans l'export.
- Conservation des membres lors de la conversion d'un **groupe** dynamique en attribué (documentée seulement pour les UA).
- Exécution réelle du script sur un tenant.
- Ce que Entra Backup and Recovery restaure pour un groupe dynamique (règle comprise ou non).

## Points pour Daniel

1. **Bloquant : MC1488839.** Selon des miroirs tiers, Microsoft a publié le 6 octobre 2026 « Microsoft Entra ID: Support for existing MemberOf rule operator configurations extended through March 31, 2027 », réservé aux organisations disposant d'**Entra ID Governance**, avec un remplaçant annoncé pour fin 2026 (un extrait évoque une migration automatique). La page Learn (`ms.date` 04/08/2026) n'en dit rien. Lire le message dans le Message Center du tenant. S'il est confirmé : nuancer le titre, l'introduction, le calendrier (ajouter une ligne), la phrase « Un remplaçant est en développement, sans date » et le rollback « Après le 3 novembre : il n'y a plus de retour possible ». Je ne l'ai pas intégré : nouvelle source non vérifiable, hors du rôle de relecture.
2. Bannière `guide-entra1.png` et hero image à produire (illustrateur).
3. Ligne « Juin 2022 » du calendrier : source tierce non relue (Office 365 IT Pros). Conserver ou retirer.
4. Tester en tenant la conversion d'un groupe `memberOf` en **Assigned** (membres conservés ?) avant de recommander ce repli sans réserve.

---

## Passe n°2 : recalage sur le rappel final du Message Center (2026-10-12)

**Mode** : brouillon, corrections en place, aucune opération git.

### Nouvelle source

Daniel a copié depuis le Message Center de son tenant le texte intégral du rappel final (« Action requise d'ici le 3 nov. 2026 »). Ce texte renvoie explicitement à « MC1448379 (August 5, 2026) ». L'ID du message ne figure pas dans le copier-coller.

| Source | État | Vérifié le | Commentaire |
|---|---|---|---|
| Rappel final, Message Center du tenant de Daniel | ✅ Lu (texte intégral fourni par Daniel) | 2026-10-12 | Échéance unique **3 novembre 2026, Worldwide**, pour groupes dynamiques, UA dynamiques **et** politiques d'attribution automatique d'Entitlement Management. Aucune exception, aucune prolongation, aucun remplaçant annoncé |
| ID MC1488834 et date du 5 octobre 2026 | ⚠️ Cohérents, non lus dans le texte | 2026-10-12 | Le titre indexé (« Final reminder to replace MemberOf rule operator configurations by November 3, 2026 ») correspond au contenu fourni ; aucune source ne contredit l'ID ni la date. Citation retenue : « Message Center Microsoft, rappel final (MC1488834, 5 octobre 2026) » |
| MC1448379, 5 août 2026 | ✅ Date confirmée | 2026-10-12 | Confirmée par le rappel final lui-même |
| `mc.merill.net/message/MC1488834` | ⚠️ Non résolue | 2026-10-12 | Le proxy refuse la connexion (CONNECT 403). Lien conservé comme miroir public du message |

### Point bloquant MC1488839 : levé

Le rappel final lu dans le tenant fixe le 3 novembre 2026 pour tous les objets, Entitlement Management compris, sans exception ni remplaçant annoncé. MC1488839 (prolongation au 31/03/2027 pour les tenants Entra ID Governance) reste non vérifié et **n'est pas mentionné dans l'article**. Titre et calendrier maintenus au 3 novembre. Réserve : Daniel peut rechercher MC1488839 dans son tenant ; s'il existe et s'applique, le titre, l'introduction, le calendrier et le rollback seraient à nuancer pour les tenants Governance.

### Corrections appliquées (passe n°2)

#### Correction N°9 : Technique (introduction, services touchés)

**Avant** :
> …vos licences par groupe et vos affectations Intune.

**Après** :
> …vos licences par groupe, vos affectations Intune, Teams et SharePoint.

**Raison** : le rappel final cite Teams, SharePoint et les applications dépendantes parmi les impacts.

#### Correction N°10 : Source (calendrier)

**Avant** :
> | 5 octobre 2026 | MC1488834 : rappel final | Message Center |
> | 3 novembre 2026 | … | Microsoft Learn |

**Après** :
> | 5 octobre 2026 | MC1488834 : rappel final, aucune exception | Message Center |
> | 3 novembre 2026 | … | Message Center, Microsoft Learn |

**Raison** : le rappel final ne prévoit aucune exception et fixe lui-même l'échéance.

#### Correction N°11 : Technique (motif officiel)

**Avant** :
> Motif officiel : pendant la preview, `memberOf` peut ralentir le traitement dynamique de **tous** les groupes du tenant. Un remplaçant est en développement, sans date.

**Après** :
> Motif officiel : pendant la preview, Microsoft a constaté que `memberOf` peut affecter le traitement dynamique de **tout le tenant**, même avec une seule règle `memberOf`. La fonctionnalité n'est pas recommandée en production. Learn évoque un remplaçant en développement, sans date ; le rappel final n'en annonce aucun.

**Raison** : « can affect dynamic membership processing across a tenant, even when only a single MemberOf rule is present » ; « not recommended for production use ». Le remplaçant n'apparaît que dans Learn (`ms.date` 04/08/2026), pas dans le rappel final.

#### Correction N°12 : Technique (étape 1, méthode officielle par type d'objet)

**Avant** :
> Microsoft Learn propose aussi un contrôle croisé par export des groupes dynamiques depuis le centre d'administration Microsoft Entra.

**Après** :
> Méthode Microsoft : export depuis le centre d'administration Microsoft Entra pour les groupes, Graph PowerShell pour les unités administratives et l'attribution automatique. Croisez le script avec cet export.

**Raison** : le rappel final prescrit une méthode par type d'objet ; l'export portail n'est pas un simple contrôle croisé pour les groupes, c'est la méthode officielle.

#### Correction N°13 : Technique (étape 2, applications dépendantes)

**Avant** :
> Reste Intune, qui ne se voit pas depuis Entra.

**Après** :
> Restent Intune, invisible depuis Entra, puis Teams, SharePoint et les applications qui lisent l'appartenance au groupe.

**Raison** : impacts listés par le rappel final, absents de la cartographie.

#### Correction N°14 : Technique (étape 3, conversion et suppression)

**Avant** :
> | Aucune logique d'attribut possible | Convertir en groupe attribué, maintenu par une automatisation (…) |

**Après** :
> | Aucune logique d'attribut possible | Convertir en groupe attribué (repli recommandé par Microsoft), maintenu par une automatisation (…) |
> | Groupe ou unité administrative sans usage | Le supprimer, comme le recommande Microsoft |

**Raison** : « Convert groups to assigned membership if a supported dynamic rule alternative is not available » ; « Remove groups / administrative units that are no longer required ».

#### Correction N°15 : Technique (étape 3, conservation des membres)

**Avant** :
> Le groupe garde son nom et son ID : accès conditionnel, licences et affectations Intune continuent de pointer dessus. Lors d'un passage…

**Après** :
> …continuent de pointer dessus. La conservation des membres en **Assigned** n'est documentée que pour les unités administratives : comparez l'effectif au CSV. Lors d'un passage…

**Raison** : la conversion est désormais sourcée, la conservation des membres d'un groupe ne l'est toujours pas (ni Learn ni le rappel final).

#### Correction N°16 : Technique (étape 3, packages d'accès)

**Avant** :
> Pour un package d'accès, modifier la règle de la politique dans **ID Governance → Entitlement management → Access package**.

**Après** :
> … ; sans règle équivalente, Microsoft demande de prévoir une autre méthode d'attribution.

**Raison** : « Plan an alternate assignment approach if no equivalent rule is available ».

#### Correction N°17 : Technique (étape 4, validation)

**Avant** :
> ### Étape 4 : contrôler après le 3 novembre
> 3. Comparer l'effectif de chaque groupe avec le CSV d'inventaire.

**Après** :
> ### Étape 4 : contrôler après chaque remplacement et après le 3 novembre
> 3. Comparer l'effectif de chaque groupe et unité administrative avec le CSV d'inventaire. Pour une unité administrative, vérifier aussi le périmètre administratif ; pour un package d'accès, ses attributions.

**Raison** : « Validate membership results after making changes » ; « Validate both membership and administrative scope » (UA) ; « Validate access package assignments after making changes ».

#### Correction N°18 : Source (liste des sources)

**Avant** :
> [MC1488834, Microsoft Entra ID: Final reminder … (5 octobre 2026)](https://mc.merill.net/message/MC1488834)

**Après** :
> [Message Center Microsoft, rappel final (MC1488834, 5 octobre 2026) : Microsoft Entra ID: Final reminder …](https://mc.merill.net/message/MC1488834)

**Raison** : libellé de citation demandé ; ID et date cohérents avec l'index.

Frontmatter, `title` et `pubDate` : **inchangés** lors de cette passe.

### Pré-contrôles après passe n°2

| Contrôle | Résultat |
|---|---|
| Tirets cadratins | 0 |
| Nombre de mots du corps | 1 522 avant, **1 646** après (plafond fixé ~1 650 ; fourchette guide 800-2 500) |
| Mention de MC1488839 dans l'article | 0 |
| Bannière `guide-entra1.png` | toujours absente |
| `heroImage` | toujours vide |
| Schéma 1 | présent |

### Non vérifié (passe n°2)

- ID MC1488834 et date du 5 octobre 2026 : absents du copier-coller, cohérence établie uniquement par l'index de recherche.
- MC1488839 : toujours non lu.
- Page Learn « Create simpler, more efficient rules for dynamic membership groups », citée en « Learn more » du rappel final : non citée dans l'article, non ajoutée (rôle de relecture). À ajouter aux sources si Daniel le souhaite.
- Conservation des membres lors de la conversion d'un groupe en Assigned : toujours non documentée.

### Décisions restantes pour Daniel

1. **MC1488839** (non bloquant) : le rechercher dans le Message Center du tenant. S'il existe, prévenir le rédac chef pour nuancer titre, introduction, calendrier et rollback.
2. Ligne « Juin 2022 » du calendrier (source tierce non relue) : conserver ou retirer.
3. Tester en tenant la conservation des membres lors du passage d'un groupe `memberOf` en **Assigned**.
4. Bannière `guide-entra1.png` et hero image à produire (illustrateur) avant publication.
