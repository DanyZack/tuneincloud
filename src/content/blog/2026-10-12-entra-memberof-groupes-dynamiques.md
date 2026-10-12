---
title: "Entra ID : remplacer les règles memberOf avant le 3 novembre"
description: "Le 3 novembre 2026, les groupes dynamiques Entra ID basés sur memberOf se figent. Inventaire Graph, dépendances CA, licences et Intune, remplacement, contrôle."
pubDate: 2026-10-12
category: "guides"
subcategory: "entra"
heroImage: "https://sbd.org.uk/images/entra-directory-enumeration.webp" 
---

Le 3 novembre 2026, l'opérateur `memberOf` des règles d'appartenance dynamique Entra ID cesse d'être évalué. Rien n'est supprimé et Microsoft ne documente aucune alerte : les groupes concernés gardent leur dernière composition connue. Un groupe figé continue pourtant d'alimenter vos stratégies d'accès conditionnel, vos licences par groupe, vos affectations Intune, Teams et SharePoint. La panne ne se voit pas, la dérive commence le lendemain.

## Ce que ce guide couvre

- Lister les groupes dynamiques (utilisateurs et appareils) et les unités administratives dynamiques dont la règle contient `memberOf`.
- Retrouver les politiques d'attribution automatique d'Entitlement Management concernées.
- Cartographier ce qui dépend de chaque groupe : accès conditionnel, licences, affectations Intune.
- Choisir un remplacement et le contrôler après le 3 novembre.

## Le calendrier

| Date | Événement | Source |
|---|---|---|
| Juin 2022 | `memberOf` arrive en preview publique, jamais passé en GA | Office 365 IT Pros |
| 5 août 2026 | MC1448379 : « Replace MemberOf rules by November 3, 2026 » | Message Center |
| 5 octobre 2026 | MC1488834 : rappel final, aucune exception | Message Center |
| 3 novembre 2026 | Les groupes, unités administratives et politiques d'attribution automatique basés sur `memberOf` cessent d'être mis à jour | Message Center, Microsoft Learn |

Motif officiel : pendant la preview, Microsoft a constaté que `memberOf` peut affecter le traitement dynamique de **tout le tenant**, même avec une seule règle `memberOf`. La fonctionnalité n'est pas recommandée en production. Learn évoque un remplaçant en développement, sans date ; le rappel final n'en annonce aucun.

![SCHEMA 1](/images/schemas/entra-memberof-groupes-dynamiques-1.png)
*Schéma 1 : un groupe `memberOf` figé au 3 novembre 2026 continue d'alimenter accès conditionnel, licences, Intune et packages d'accès.*

## Prérequis

- **Licence** : Microsoft Entra ID P1 (ou Intune for Education) pour chaque utilisateur membre d'un groupe dynamique ; P1 ou P2 pour les membres et administrateurs d'unités administratives dynamiques. Les politiques d'attribution automatique relèvent de Microsoft Entra ID Governance ou Microsoft Entra Suite.
- **Rôles** : Global Reader pour l'inventaire ; Groups Administrator pour modifier le type d'appartenance d'un groupe ; Privileged Role Administrator pour une unité administrative dynamique ; Identity Governance Administrator pour les packages d'accès ; Intune Administrator pour les affectations.
- **Outils** : module Microsoft Graph PowerShell, consentement aux scopes `Group.Read.All`, `AdministrativeUnit.Read.All`, `Policy.Read.All` et `EntitlementManagement.Read.All`.

## Procédure

### Étape 1 : inventorier les objets basés sur memberOf

Script en lecture seule : il exporte les groupes et unités administratives dynamiques dont la règle contient `memberOf`, avec leurs licences et les stratégies d'accès conditionnel qui les ciblent.

```powershell
Connect-MgGraph -Scopes "Group.Read.All","AdministrativeUnit.Read.All","Policy.Read.All"

function Get-GraphAll([string]$Uri) {
    $items = @()
    while ($Uri) {
        $page  = Invoke-MgGraphRequest -Method GET -Uri $Uri
        $items += $page.value
        $Uri   = $page.'@odata.nextLink'
    }
    $items
}

# Stratégies d'accès conditionnel (inclusions et exclusions de groupes)
$ca = Get-GraphAll "https://graph.microsoft.com/v1.0/identity/conditionalAccess/policies"

# Groupes dynamiques, filtre côté serveur sur groupTypes, filtre memberOf côté client
$groups = Get-GraphAll "https://graph.microsoft.com/v1.0/groups?`$filter=groupTypes/any(c:c eq 'DynamicMembership')&`$select=id,displayName,membershipRule,membershipRuleProcessingState,assignedLicenses"
$aus    = Get-GraphAll "https://graph.microsoft.com/v1.0/directory/administrativeUnits?`$select=id,displayName,membershipType,membershipRule"

$report = foreach ($o in @($groups) + @($aus)) {
    if ([string]$o.membershipRule -notmatch '(?i)memberof') { continue }
    $caHits = $ca | Where-Object {
        $_.conditions.users.includeGroups -contains $o.id -or
        $_.conditions.users.excludeGroups -contains $o.id
    }
    [pscustomobject]@{
        Type       = if ($o.membershipType) { 'AdministrativeUnit' } else { 'Group' }
        Name       = $o.displayName
        Id         = $o.id
        Rule       = $o.membershipRule
        Licences   = ($o.assignedLicenses | Measure-Object).Count
        CAPolicies = ($caHits.displayName -join '; ')
    }
}
$report | Export-Csv .\memberof-inventaire.csv -NoTypeInformation -Encoding UTF8
$report | Format-Table Type, Name, Licences, CAPolicies
```

Le filtre `memberof` est local, car `membershipRule` n'accepte pas `contains` en `$filter`. Conservez le CSV : il contient le texte exact de chaque règle.

Pour les politiques d'attribution automatique, utiliser le script publié par Microsoft (section *Find automatic assignment policies that use the memberOf attribute* de la page Learn citée en source). Il produit `memberof-auto-assignment-policies.csv`.

Méthode Microsoft : export depuis le centre d'administration Microsoft Entra pour les groupes, Graph PowerShell pour les unités administratives et l'attribution automatique. Croisez le script avec cet export.

### Étape 2 : cartographier les dépendances

Le script couvre l'accès conditionnel et les licences. Restent Intune, invisible depuis Entra, puis Teams, SharePoint et les applications qui lisent l'appartenance au groupe.

1. Pour chaque groupe de l'inventaire, d'**utilisateurs** comme d'**appareils** (règle en `user.memberof` ou `device.memberof`), ouvrir le **centre d'administration Intune** et contrôler les affectations des anneaux de mise à jour Windows, des applications (requises et désinstallations), des profils de configuration et des stratégies de conformité.
2. Classer chaque groupe : **exclusion de sécurité**, **ciblage d'accès ou de licence**, **déploiement**.

Traiter les exclusions en premier : un utilisateur sorti du groupe source après le 3 novembre resterait exempté de MFA ou d'un blocage.

### Étape 3 : choisir le remplacement

Une règle `memberOf` ne peut pas être combinée avec un autre critère. Chaque règle de l'inventaire se résume donc à une liste d'identifiants de groupes sources, ce qui simplifie le choix.

| Situation | Remplacement |
|---|---|
| Les membres partagent un attribut fiable (`department`, `companyName`, `country`) | Règle sur attribut, par exemple `user.department -eq "Finance"` |
| Aucun attribut existant ne convient | Attribut d'extension `extensionAttribute1` à `15`, alimenté par Entra Connect, le SIRH ou Graph, puis `user.extensionAttribute5 -eq "Finance"` |
| Appareils | `device.extensionAttribute1` à `15`, à écrire sur l'objet appareil via Graph |
| Deux ou trois groupes sources stables | Cibler directement les groupes sources dans la stratégie, la licence ou l'affectation |
| Aucune logique d'attribut possible | Convertir en groupe attribué (repli recommandé par Microsoft), maintenu par une automatisation (runbook planifié qui recopie les membres des groupes sources) |
| Groupe ou unité administrative sans usage | Le supprimer, comme le recommande Microsoft |

Pour convertir sans casser les références :

1. Aller dans **Entra ID → Groups → All groups**, ouvrir le groupe.
2. Ouvrir **Properties**.
3. Dans **Membership type**, choisir **Assigned** (ou **Dynamic User** / **Dynamic Device** avec la nouvelle règle saisie via **Add dynamic query**).
4. Cliquer sur **Save**.

Le groupe garde son nom et son ID : accès conditionnel, licences et affectations Intune continuent de pointer dessus. La conservation des membres en **Assigned** n'est documentée que pour les unités administratives : comparez l'effectif au CSV. Lors d'un passage vers une nouvelle règle dynamique, les membres qui ne la satisfont pas sont retirés et peuvent perdre leurs accès jusqu'à la fin du traitement : faites-le hors heures ouvrées.

Pour une unité administrative : **Properties → Membership type**, même logique. Pour un package d'accès, modifier la règle de la politique dans **ID Governance → Entitlement management → Access package** ; sans règle équivalente, Microsoft demande de prévoir une autre méthode d'attribution.

### Étape 4 : contrôler après chaque remplacement et après le 3 novembre

1. Relancer le script de l'étape 1 et celui des politiques d'attribution automatique : le résultat attendu est vide.
2. Pour chaque groupe remplacé, ouvrir la page **Overview** et vérifier **Dynamic rule processing status** (`Update complete`) et **Last membership change**.
3. Comparer l'effectif de chaque groupe et unité administrative avec le CSV d'inventaire. Pour une unité administrative, vérifier aussi le périmètre administratif ; pour un package d'accès, ses attributions.
4. Dans Intune, contrôler le statut de déploiement d'un anneau de mise à jour ou d'une application ciblant un groupe converti.

Le traitement dynamique n'est pas instantané. Si aucune mise à jour dynamique n'est traitée dans le tenant pendant plus de 24 heures, une alerte apparaît au-dessus de **All groups**.

## Rollback

- Avant le 3 novembre : rétablir la règle `memberOf` d'origine depuis le CSV, via **Properties → Membership type → Dynamic User / Dynamic Device**, en saisissant la règle dans l'éditeur de syntaxe (**Edit**), le générateur de règles ne gérant pas `memberOf`. Elle fonctionne jusqu'à l'échéance, pas au-delà.
- Après le 3 novembre : il n'y a plus de retour possible vers `memberOf`. Le seul repli est le groupe attribué, alimenté à partir des membres des groupes sources.
- Une exclusion d'accès conditionnel mal remplacée : réintégrer temporairement le groupe source directement dans **Exclude** de la stratégie.

Si vous testez déjà la [sauvegarde native du tenant Entra](/blog/2026-04-14-entra-backupandrecovery/), vérifiez dans votre tenant ce qu'elle restaure réellement pour un groupe avant de compter dessus.

## Pièges fréquents

- **Le groupe est déjà faux.** Learn le précise : la suppression d'un groupe source ou le retrait d'un de ses membres ne met pas à jour le groupe `memberOf` tant que la règle n'est pas modifiée. Comparez les effectifs avant de figer quoi que ce soit.
- **Seuls les membres directs comptent.** Un remplacement par attribut peut faire entrer des utilisateurs que `memberOf` ne voyait pas (membres de sous-groupes). Vérifiez l'effectif avant d'activer.
- **Les anneaux de mise à jour.** Un nouveau poste ajouté au groupe source ne rejoindra plus l'anneau pilote et ne recevra pas sa configuration. Même logique pour une [baseline de sécurité Intune](/blog/2026-10-08-intune-baseline-windows-11-26h2/) affectée par ce biais.
- **Le quota.** Un groupe dynamique recréé compte dans la limite de 15 000 par tenant ; préférez la conversion, qui garde l'ID.

## Source

- [MC1448379, Microsoft Entra ID: Replace MemberOf rules by November 3, 2026 (5 août 2026)](https://mc.merill.net/message/MC1448379)
- [Message Center Microsoft, rappel final (MC1488834, 5 octobre 2026) : Microsoft Entra ID: Final reminder to replace MemberOf rule operator configurations by November 3, 2026](https://mc.merill.net/message/MC1488834)
- [Configure dynamic membership groups with the memberOf operator (preview), Microsoft Learn](https://learn.microsoft.com/en-us/entra/identity/users/groups-dynamic-rule-member-of)
- [Configure an automatic assignment policy for an access package, Microsoft Learn](https://learn.microsoft.com/en-us/entra/id-governance/entitlement-management-access-package-auto-assignment-policy)
- [Manage rules for dynamic membership groups, Microsoft Learn](https://learn.microsoft.com/en-us/entra/identity/users/groups-dynamic-membership)
- [Change static groups to dynamic membership groups, Microsoft Learn](https://learn.microsoft.com/en-us/entra/identity/users/groups-change-type)
- [Create or edit a dynamic membership group and get its processing status, Microsoft Learn](https://learn.microsoft.com/en-us/entra/identity/users/groups-create-rule)
- [Manage users or devices for an administrative unit with dynamic membership rules, Microsoft Learn](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/admin-units-members-dynamic)
- [List groups, Microsoft Graph v1.0](https://learn.microsoft.com/en-us/graph/api/group-list)
- [Microsoft Previews Nested Dynamic Azure AD Groups, Office 365 IT Pros (juin 2022)](https://office365itpros.com/2022/06/08/dynamic-azure-ad-group-members/)
- [Entra ID Drops the memberOf Rule Operator for Dynamic Groups and Dynamic Admin Units, Office 365 IT Pros](https://office365itpros.com/2026/08/07/memberof-rule-operator/)
