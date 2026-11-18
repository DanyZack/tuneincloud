---
title: "Intune Windows Server : ce que vaut vraiment la préversion"
description: "Intune Windows Server en Insider preview, builds vNext seulement et aucune date de GA. Mises à jour, Defender, Azure Arc, licence : faut-il franchir le pas ?"
pubDate: 2026-11-19
heroImage: "/images/hero/intune-gestion-windows-server.webp"
category: "actualites"
subcategory: "articles"
---

Depuis la semaine du 16 novembre 2026, Microsoft Intune peut gérer Windows Server, en Insider preview seulement. Microsoft l'a annoncé le 17 novembre, à Ignite. Le guide Microsoft Learn daté du 16 novembre réserve la préversion aux builds Windows Server vNext Insider 29621.1000 ou ultérieures, en Desktop Experience, sur des serveurs de test. Windows Server 2019, 2022 et 2025 restent hors périmètre, et Microsoft ne fixe aucune date de préversion publique ni de disponibilité générale. Pour les postes d'administration et les serveurs d'agence, l'annonce comble un vide. Pour le reste du parc, elle fait sortir Intune de son métier de gestion des endpoints, et ce déplacement a un prix.

![Banniere](/images/banarticle/article-intune1.png)

## Ce que Microsoft a annoncé le 17 novembre

Le What's new d'Intune de la semaine du 16 novembre 2026 (service release 2611) contient l'entrée « Manage Windows Server devices with Microsoft Intune (Insider preview) », limitée aux tests hors production. Le guide Learn de bout en bout, mis à jour le 17 novembre, précise que Microsoft ne prend pas en charge cet usage en production.

Le billet d'Arnab Biswas sur Tech Community, publié le 17 novembre, nomme les cibles : les serveurs utilisés comme postes (PAW, jump boxes, hôtes RDSH, terminaux d'atelier), les serveurs d'agence ou edge, et les sessions RDSH persistantes.

Le même jour, Microsoft a ouvert la préversion publique de Windows Server 2028, dont le billet de lancement écrit « Public Preview » en tête. La gestion de Windows Server par Intune reste une Insider preview, que le guide Microsoft Learn réserve à « nonproduction testing and evaluation only ». Quelques pages tierces ont fusionné les deux annonces, jusqu'à évoquer Windows Server 2025. Aucune source Microsoft n'associe Windows Server 2025 à la gestion par Intune.

## Intune Windows Server : quels serveurs et quelles versions ?

Le guide Learn fixe les prérequis suivants.

- Un abonnement Microsoft Intune et Microsoft Entra ID existant.
- Windows Server vNext Insider, build 29621.1000 ou ultérieure, en Desktop Experience, physique ou virtuel.
- Un serveur persistant, inscrit par jonction Entra ou par [jonction hybride Entra ID](/blog/old-modejonctionwindows/) avec la GPO d'inscription automatique.
- La plateforme « Server devices » passée à « Allow » dans les restrictions d'inscription, où elle est bloquée par défaut, avec « Personally owned devices » pour l'inscription depuis les paramètres.

Le guide et le billet d'Arnab Biswas excluent Server Core, les hôtes multisession ou non persistants, l'inscription sans utilisateur, Windows Autopilot, l'inscription en masse, le co-management Configuration Manager et les serveurs déconnectés.

Selon le guide Microsoft Learn, le serveur inscrit reçoit 57 groupes du catalogue de paramètres, les modèles Endpoint security Antivirus, Disk encryption, Firewall, Attack surface reduction et LAPS, des applications Win32 et des stratégies de conformité. Les actions à distance vont de la synchronisation à l'effacement, en passant par la rotation des clés BitLocker et du mot de passe LAPS.

## Mises à jour et Defender, ce que la préversion apporte au parc de serveurs

Les mises à jour automatiques sont le premier motif de regarder Intune Windows Server. Le guide autorise les anneaux Windows Update for Business, avec reports, échéances, fenêtres de maintenance et redémarrages. Les stratégies « Quality updates », « Feature updates » et « Driver updates » sont exclues de la préversion, et cette exclusion ne touche pas les reports des mises à jour qualité réglés dans les anneaux.

Le blog Intune d'Ignite, publié le 17 novembre 2026, annonce que la gestion des serveurs « incorporates Windows Autopatch », et le billet d'Arnab Biswas place les fenêtres de maintenance sous Windows Autopatch. Le guide Microsoft Learn daté du 16 novembre ne cite pas Windows Autopatch une seule fois. Il ne documente que les anneaux de mises à jour.

Sur une VM aussi suivie par Azure Update Manager, le guide prévient que le comportement des mises à jour peut changer. Le hotpatch de Windows Server 2025 hors Azure exige, selon sa page Learn, une connexion à Azure Arc. Cette page ne cite Intune que pour Windows client.

Le second motif est Microsoft Defender for Endpoint. L'Insider preview expose deux actions Defender sur le serveur inscrit, l'analyse et la mise à jour, et applique les modèles Antivirus et Firewall. Les contrôles de conformité pare-feu, antivirus et antispyware sont exclus, et le modèle « Endpoint detection and response », qui sert à l'onboarding des postes, ne figure pas dans la liste des modèles de la préversion. Un serveur géré aujourd'hui par la gestion des paramètres de sécurité de Defender for Endpoint (security settings management) ne peut pas encore basculer vers l'inscription MDM. Le guide le range dans ses limitations connues.

## Intune, Azure Arc ou Configuration Manager pour vos serveurs ?

Selon la FAQ du guide Microsoft Learn, Intune vise les serveurs « de type poste » associés à une identité utilisateur. Azure Arc reste le plan de gestion que Microsoft recommande pour tout le reste, production et serveurs critiques en tête.

Le tableau compare les trois outils d'après les pages Microsoft Learn citées en sources, au 18 novembre 2026.

| Critère | Intune (Insider preview) | Azure Arc | Configuration Manager |
|---|---|---|---|
| Production | Non, test uniquement | Recommandé par Microsoft | Pris en charge (current branch) |
| Windows Server | vNext Insider 29621.1000+, Desktop Experience | 2012 R2 à 2025, Server Core compris | 2016 à 2025, Server Core compris |
| Mises à jour de l'OS | Anneaux Windows Update for Business | Azure Update Manager, hotpatch 2025 | Correctifs de l'OS, fonction native |
| Droits d'usage | Rien de plus pendant la préversion | Sans surcoût avec Software Assurance Windows Server, sinon à l'usage | Software Assurance ou abonnement équivalent |

La page Microsoft Learn d'août 2025 consacrée au passage de Configuration Manager à Azure Arc présente Azure comme l'équivalent, pour les serveurs, de ce qu'Intune est pour les postes.

## Mon avis : ce que la préversion règle

Une PAW ou une jump box est un poste d'administration sous Windows Server, et elle échappe souvent à la rigueur imposée au parc client. Intune lui applique les réglages du catalogue pris en charge, la même rotation LAPS, et une conformité que l'accès conditionnel exige avant d'ouvrir les ressources protégées. Les modèles de baseline, dont la [baseline de sécurité Windows 11 dans Intune](/blog/2026-10-08-intune-baseline-windows-11-26h2/), manquent à la liste. Chaque réglage sera repris à la main, puis testé sur le serveur.

Le serveur d'agence suit la même logique. Une console, des anneaux avec fenêtres de maintenance, et un inventaire que les [rapports Intune via OData](/blog/2026-04-27-intune-datawarehouse/) exposent déjà pour les postes. Les scripts planifiés et les GPO écrites pour ces cas limites n'auraient plus de raison d'être.

## Mon avis : pourquoi ça pourrait ne pas l'être

Un serveur n'est pas un endpoint. Il n'a souvent aucun utilisateur, il survit à plusieurs générations de postes, ses redémarrages passent en comité de changement, et sa panne arrête un service entier. En l'absorbant, Intune cesse d'être un MDM pour devenir l'outil de gestion de tout Windows, et je crains qu'il y perde sa cohérence.

Le guide documente lui-même les risques. Les stratégies affectées à « All devices », aux utilisateurs ou à des groupes dynamiques atteignent les serveurs dès leur inscription. Les scripts PowerShell et les ensembles de stratégies ne prennent pas en charge les filtres d'affectation. Une stratégie d'accès conditionnel qui exige la MFA peut interrompre la synchronisation d'un serveur sans inviter l'utilisateur à se reconnecter.

⚠️ Sur une VM Azure inscrite, un administrateur Intune doté des rôles adéquats peut lancer un effacement sans appartenir aux groupes RBAC Azure de la VM ni passer par l'accès juste-à-temps (JIT). Intune n'ajoute aucun rôle propre aux serveurs. Les rôles et balises d'étendue des postes s'appliquent tels quels.

Pour une entité soumise à NIS2, je ne m'appuierais pas sur une préversion que Microsoft ne prend pas en charge pour documenter la gestion des correctifs de ses serveurs.

## Faut-il franchir le pas demain ?

Pas en production. Microsoft exclut tout usage de production pendant l'Insider preview. En laboratoire, sur un tenant de test distinct comme le recommande la FAQ du guide Microsoft Learn, oui.

Avantages si le périmètre s'élargit :

- PAW, jump boxes et RDSH persistants alignés sur les stratégies des postes
- anneaux de mises à jour avec fenêtres de maintenance, sans WSUS
- conformité du serveur exigée par l'accès conditionnel

Inconvénients à mesurer :

- débordement des stratégies existantes sur les serveurs inscrits
- RBAC Intune qui donne la main sur des VM Azure
- deux plans de gestion, Intune et Arc, à départager charge par charge

Le travail utile précède toute inscription : exclure les serveurs des affectations larges, revoir le RBAC et les balises d'étendue, inventorier les candidats et les autres. Je range les contrôleurs de domaine parmi les autres. Microsoft ne les mentionne pas, mais un DC n'a pas d'utilisateur principal et l'inscription sans utilisateur est exclue. C'est mon analyse, pas une position de Microsoft.

## Quelle licence faut-il pour gérer Windows Server avec Intune ?

Pendant l'Insider preview, gérer Windows Server avec Intune ne demande aucun abonnement supplémentaire, selon la FAQ du guide Microsoft Learn. Les droits existants s'appliquent, ceux de Microsoft Intune, de l'accès conditionnel Microsoft Entra et de Microsoft Defender for Endpoint pour les serveurs. Cette réponse, précise la FAQ, ne vaut que pour la préversion. La licence de la disponibilité générale reste inconnue au 18 novembre 2026.

## Sources

- [What's new in Microsoft Intune, semaine du 16 novembre 2026 (Microsoft Learn)](https://learn.microsoft.com/en-us/intune/intune-service/fundamentals/whats-new)
- [End-to-end guide to get started with Windows Server Insider preview (Microsoft Learn, 16 novembre 2026, mis à jour le 17)](https://learn.microsoft.com/en-us/intune/solutions/end-to-end-guides/windows-server-endpoints-get-started)
- [Manage Windows Servers alongside PCs with Microsoft Intune (Tech Community, 17 novembre 2026)](https://techcommunity.microsoft.com/blog/IntuneCustomerSuccess/manage-windows-servers-alongside-pcs-with-microsoft-intune/4572643)
- [What's new in Microsoft Intune at Microsoft Ignite (Tech Community, 17 novembre 2026)](https://techcommunity.microsoft.com/blog/microsoftintuneblog/what%E2%80%99s-new-in-microsoft-intune-at-microsoft-ignite/4570003)
- [Windows Server 2028: A trusted foundation for an evolving enterprise (Tech Community, 17 novembre 2026)](https://techcommunity.microsoft.com/blog/windowsservernewsandbestpractices/windows-server-2028-a-trusted-foundation-for-an-evolving-enterprise/4574112)
- [Windows security at Ignite 2026 (Windows Experience Blog, 17 novembre 2026)](https://blogs.windows.com/windowsexperience/2026/11/17/windows-security-at-ignite-2026-start-secure-protect-what-matters-prepare-for-ai/)
- [Connected Machine agent prerequisites (Microsoft Learn, Azure Arc)](https://learn.microsoft.com/en-us/azure/azure-arc/servers/prerequisites)
- [How to modernize server management from Configuration Manager to Azure Arc (Microsoft Learn)](https://learn.microsoft.com/en-us/azure/azure-arc/servers/modernize-server-management)
- [Hotpatch for Windows Server (Microsoft Learn)](https://learn.microsoft.com/en-us/windows-server/get-started/hotpatch)
- [Supported clients and devices, Configuration Manager (Microsoft Learn)](https://learn.microsoft.com/en-us/intune/configmgr/core/plan-design/configs/supported-operating-systems-for-clients-and-devices)
- [Product and licensing FAQ, Configuration Manager (Microsoft Learn)](https://learn.microsoft.com/en-us/intune/configmgr/core/understand/product-and-licensing-faq)