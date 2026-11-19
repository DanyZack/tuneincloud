---
title: "Intune Windows Server : ce que vaut vraiment la préversion"
description: "Intune Windows Server en Insider preview, builds vNext seulement et aucune date de GA. Mises à jour, Defender, Azure Arc, licence : faut-il franchir le pas ?"
pubDate: 2026-11-19
updatedDate: 2026-11-19
heroImage: "/images/hero/intune-gestion-windows-server.webp"
category: "actualites"
subcategory: "articles"
---

Microsoft Intune peut désormais gérer Windows Server, mais en Insider preview seulement. Microsoft l'a annoncé mi-novembre 2026, à Ignite, dans le What's new d'Intune et un guide Microsoft Learn. La préversion se limite aux serveurs de test sous Windows Server vNext Insider, build 29621.1000 ou ultérieure, en Desktop Experience. Windows Server 2019, 2022 et 2025 restent hors périmètre. Aucune date n'est fixée, ni pour une préversion publique ni pour la disponibilité générale. Pour l'instant, j'y vois surtout un recouvrement de plus entre Intune, Azure Arc et Configuration Manager.

![Banniere](/images/banarticle/article-intune1.png)

## Ce que Microsoft a annoncé à Ignite

L'entrée du What's new s'intitule « Manage Windows Server devices with Microsoft Intune (Insider preview) » et réserve la fonction aux tests hors production, puisque Microsoft ne prend pas en charge cet usage en production. Les cibles visées sont les serveurs utilisés comme postes (PAW, jump boxes, hôtes RDSH, terminaux d'atelier), les serveurs d'agence ou edge, et les sessions RDSH persistantes.

Le même jour, Microsoft a ouvert la préversion publique de Windows Server 2028, alors que la gestion par Intune reste une Insider preview réservée à « nonproduction testing and evaluation only ». Quelques pages tierces ont fusionné les deux annonces, jusqu'à évoquer Windows Server 2025. Aucune source Microsoft n'associe Windows Server 2025 à la gestion par Intune.

## Intune Windows Server : quels serveurs et quelles versions ?

Il faut réunir quatre conditions.

- Un abonnement Microsoft Intune et Microsoft Entra ID existant.
- Windows Server vNext Insider, build 29621.1000 ou ultérieure, en Desktop Experience, physique ou virtuel.
- Un serveur persistant, inscrit par jonction Entra ou par [jonction hybride Entra ID](/blog/old-modejonctionwindows/) avec la GPO d'inscription automatique.
- La plateforme « Server devices » passée à « Allow » dans les restrictions d'inscription, où elle est bloquée par défaut, avec « Personally owned devices » pour l'inscription depuis les paramètres.

Server Core, les hôtes multisession ou non persistants, l'inscription sans utilisateur, Windows Autopilot, l'inscription en masse, le co-management Configuration Manager et les serveurs déconnectés restent exclus. Le serveur inscrit reçoit 57 groupes du catalogue de paramètres. S'y ajoutent les modèles Endpoint security Antivirus, Disk encryption, Firewall, Attack surface reduction et LAPS, des applications Win32 et des stratégies de conformité. Les actions à distance vont de la synchronisation à l'effacement, en passant par la rotation des clés BitLocker et du mot de passe LAPS.

## Mises à jour et Defender, ce que la préversion apporte au parc de serveurs

Les mises à jour automatiques sont le premier motif de regarder Intune Windows Server. Les anneaux Windows Update for Business fonctionnent, avec reports, échéances, fenêtres de maintenance et redémarrages. Les stratégies « Quality updates », « Feature updates » et « Driver updates » sont exclues de la préversion, ce qui ne touche pas les reports des mises à jour qualité réglés dans les anneaux.

Windows Autopatch, lui, n'apparaît que dans la communication. Le blog Intune d'Ignite et le billet d'Arnab Biswas sur Tech Community le rattachent à la gestion des serveurs, mais le guide Learn ne le cite jamais et ne documente que les anneaux.

Sur une VM déjà suivie par Azure Update Manager, le comportement des mises à jour peut changer. Le hotpatch de Windows Server 2025 hors Azure exige quant à lui une connexion à Azure Arc, et sa documentation ne cite Intune que pour Windows client.

Le second motif est Microsoft Defender for Endpoint. Le serveur inscrit accepte deux actions Defender, l'analyse et la mise à jour, ainsi que les modèles Antivirus et Firewall. Les contrôles de conformité pare-feu, antivirus et antispyware sont exclus, et le modèle « Endpoint detection and response », qui sert à l'onboarding des postes, manque à la liste. Un serveur géré aujourd'hui par la gestion des paramètres de sécurité de Defender for Endpoint (security settings management) ne peut pas encore basculer vers l'inscription MDM, une limitation connue de la préversion.

## Intune, Azure Arc ou Configuration Manager pour vos serveurs ?

Intune vise les serveurs « de type poste » associés à une identité utilisateur. Pour tout le reste, production et serveurs critiques en tête, Microsoft recommande Azure Arc.

| Critère | Intune (Insider preview) | Azure Arc | Configuration Manager |
|---|---|---|---|
| Production | Non, test uniquement | Recommandé par Microsoft | Pris en charge (current branch) |
| Windows Server | vNext Insider 29621.1000+, Desktop Experience | 2012 R2 à 2025, Server Core compris | 2016 à 2025, Server Core compris |
| Mises à jour de l'OS | Anneaux Windows Update for Business | Azure Update Manager, hotpatch 2025 | Correctifs de l'OS, fonction native |
| Droits d'usage | Rien de plus pendant la préversion | Sans surcoût avec Software Assurance Windows Server, sinon à l'usage | Software Assurance ou abonnement équivalent |

Dans sa page consacrée au passage de Configuration Manager à Azure Arc, Microsoft présente d'ailleurs Azure comme l'équivalent, pour les serveurs, de ce qu'Intune est pour les postes.

## Mon avis : ce que la préversion règle, et pour qui

Microsoft range les PAW parmi ses cibles. Un PAW est pourtant, en général, un poste Windows 11 Enterprise qu'Intune gère déjà comme un client, et la question ne se pose guère. Les cas serveurs sont les serveurs de rebond et les hôtes RDSH d'administration, qui échappent souvent à la rigueur imposée au parc client. Intune leur applique les réglages du catalogue, la rotation LAPS et une conformité exigée par l'accès conditionnel. Les modèles de baseline, dont la [baseline de sécurité Windows 11 dans Intune](/blog/2026-10-08-intune-baseline-windows-11-26h2/), manquent à la liste, et chaque réglage sera repris à la main.

Inscrire dans Intune une machine dédiée à réduire la surface d'attaque ne se défend que si Intune est traité comme un plan de contrôle du même niveau de confiance, car quiconque l'administre peut y pousser un script exécuté en SYSTEM ou effacer la machine. Multi Admin Approval, qui soumet les scripts Windows et l'effacement à un second administrateur, devient alors un préalable.

Le serveur d'agence gagnerait une console, des anneaux avec leurs fenêtres de maintenance, et un inventaire que les [rapports Intune via OData](/blog/2026-04-27-intune-datawarehouse/) exposent déjà pour les postes. Azure Arc lui donne l'essentiel aujourd'hui, de Windows Server 2012 R2 à 2025, Server Core compris.

## Mon avis : pourquoi je n'y vois pas de plus-value

Un serveur n'est pas un endpoint. Il n'a souvent aucun utilisateur, il survit à plusieurs générations de postes, ses redémarrages passent en comité de changement, et sa panne arrête un service entier. En l'absorbant, Intune cesse d'être un MDM pour devenir l'outil de gestion de tout Windows, et sa portée se dilue.

On reproche souvent à Microsoft des frontières de plus en plus floues entre ses produits, et Azure Arc, Intune et Configuration Manager savent désormais tous prendre en charge le même serveur Windows. Le besoin existe, mais le découpage existant y répondait presque entièrement. Microsoft recommande toujours Arc pour la production.

Microsoft documente lui-même les risques. Les stratégies affectées à « All devices », aux utilisateurs ou à des groupes dynamiques atteignent les serveurs dès leur inscription. Les scripts PowerShell et les ensembles de stratégies ne prennent pas en charge les filtres d'affectation. Une stratégie d'accès conditionnel qui exige la MFA peut interrompre la synchronisation d'un serveur sans inviter l'utilisateur à se reconnecter.

⚠️ Sur une VM Azure inscrite, un administrateur Intune doté des rôles adéquats peut lancer un effacement sans appartenir aux groupes RBAC Azure de la VM ni passer par l'accès juste-à-temps (JIT). Intune n'ajoute aucun rôle propre aux serveurs, et les rôles et balises d'étendue des postes s'appliquent tels quels.

Pour une entité soumise à NIS2, je ne m'appuierais pas sur une préversion que Microsoft ne prend pas en charge pour documenter la gestion des correctifs de ses serveurs.

## Faut-il franchir le pas demain ?

Non, pas pour l'instant. La production est exclue pendant l'Insider preview, et je ne conseille pas non plus de jouer les bêta-testeurs de la gestion des serveurs dans Intune. Le hotpatch exige Azure Arc. Un serveur géré par Defender ne peut pas encore basculer vers l'inscription MDM, et la licence de la disponibilité générale reste inconnue.

Si vous testez malgré tout, sur un tenant distinct comme Microsoft le recommande, le travail utile précède l'inscription : exclure les serveurs des affectations larges, revoir le RBAC et les balises d'étendue, inventorier les candidats et les autres. Je range les contrôleurs de domaine parmi les autres. Microsoft ne les mentionne pas, mais un DC n'a pas d'utilisateur principal et l'inscription sans utilisateur est exclue.

## Quelle licence faut-il pour gérer Windows Server avec Intune ?

Pendant l'Insider preview, gérer Windows Server avec Intune ne demande aucun abonnement supplémentaire. Les droits existants s'appliquent, ceux de Microsoft Intune, de l'accès conditionnel Microsoft Entra et de Microsoft Defender for Endpoint pour les serveurs. Cette réponse ne vaut que pour la préversion, et la licence de la disponibilité générale reste inconnue.

La gestion des serveurs dans Intune peut encore évoluer, et je reverrai mon avis à la disponibilité générale. Aujourd'hui, je n'en vois pas la plus-value face à Azure Arc.

## Sources

- [What's new in Microsoft Intune, semaine du 16 novembre 2026, service release 2611 (Microsoft Learn)](https://learn.microsoft.com/en-us/intune/intune-service/fundamentals/whats-new)
- [Guide de démarrage Windows Server Insider preview : prérequis, limites, FAQ et licence (Microsoft Learn, 16 novembre 2026, mis à jour le 17)](https://learn.microsoft.com/en-us/intune/solutions/end-to-end-guides/windows-server-endpoints-get-started)
- [Arnab Biswas, gérer les serveurs Windows aux côtés des PC : cibles, exclusions, Autopatch (Tech Community, 17 novembre 2026)](https://techcommunity.microsoft.com/blog/IntuneCustomerSuccess/manage-windows-servers-alongside-pcs-with-microsoft-intune/4572643)
- [Nouveautés Intune à Ignite, mention de Windows Autopatch (Tech Community, 17 novembre 2026)](https://techcommunity.microsoft.com/blog/microsoftintuneblog/what%E2%80%99s-new-in-microsoft-intune-at-microsoft-ignite/4570003)
- [Windows Server 2028 en préversion publique (Tech Community, 17 novembre 2026)](https://techcommunity.microsoft.com/blog/windowsservernewsandbestpractices/windows-server-2028-a-trusted-foundation-for-an-evolving-enterprise/4574112)
- [Sécurité Windows à Ignite 2026 (Windows Experience Blog, 17 novembre 2026)](https://blogs.windows.com/windowsexperience/2026/11/17/windows-security-at-ignite-2026-start-secure-protect-what-matters-prepare-for-ai/)
- [Multi Admin Approval dans Intune, scripts Windows et effacement soumis à un second administrateur (Microsoft Learn)](https://learn.microsoft.com/en-us/intune/fundamentals/role-based-access-control/multi-admin-approval)
- [Prérequis de l'agent Azure Arc, versions de Windows Server prises en charge (Microsoft Learn)](https://learn.microsoft.com/en-us/azure/azure-arc/servers/prerequisites)
- [Passer de Configuration Manager à Azure Arc (Microsoft Learn, août 2025)](https://learn.microsoft.com/en-us/azure/azure-arc/servers/modernize-server-management)
- [Hotpatch pour Windows Server, connexion Azure Arc hors Azure (Microsoft Learn)](https://learn.microsoft.com/en-us/windows-server/get-started/hotpatch)
- [Systèmes pris en charge par Configuration Manager (Microsoft Learn)](https://learn.microsoft.com/en-us/intune/configmgr/core/plan-design/configs/supported-operating-systems-for-clients-and-devices)
- [FAQ produit et licences de Configuration Manager (Microsoft Learn)](https://learn.microsoft.com/en-us/intune/configmgr/core/understand/product-and-licensing-faq)
