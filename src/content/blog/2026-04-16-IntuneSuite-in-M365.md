---
title: "M365 E3/E5 : l'Intune Suite intégrée nativement dès juillet 2026"
description: "Microsoft intègre les fonctionnalités de l'Intune Suite dans les licences M365 E3 et E5 à partir de juillet 2026. Ce que ça change concrètement pour votre organisation."
pubDate: 2026-04-14
category: "actualites"
subcategory: "breves"
heroImage: "https://www.schneider.im/media/2023/03/SCHNEIDER-IT-MANAGEMENT-2023-03-17-Update-Microsoft-Intune-suite-available-website-picture.jpg"
---
À partir du 1er juillet 2026, les fonctionnalités de l'Intune Suite rejoignent le socle M365 E3 et E5. Pour les organisations qui hésitaient à franchir le pas depuis 2023, la question ne se pose plus vraiment.

## Ce qui change

Depuis son lancement en mars 2023, l'Intune Suite était disponible uniquement en add-on payant, facturé environ 10 $/utilisateur/mois. Conséquence directe : peu d'organisations ont déployé l'ensemble du catalogue. Les sondages informels aux conférences spécialisées indiquaient des taux d'adoption très faibles, et les quelques clients qui avaient souscrit négociaient des remises de l'ordre de 60 à 70 %.

Microsoft tire la conclusion logique en intégrant ces fonctionnalités directement dans les plans M365 E3 et E5, sans surcoût de licence supplémentaire. Le déploiement débutera au troisième trimestre 2026 et sera finalisé pour l'ensemble des tenants éligibles au 1er août 2026. Un avis de 30 jours sera posté dans le Message Center avant activation sur votre tenant. Aucune action n'est requise de la part de l'administrateur.

**Ce qui est inclus dans M365 E3 (via EMS E3)**

- Intune Remote Help : assistance à distance sécurisée, sessions enregistrées et liées à l'identité Entra
- Intune Advanced Analytics : tableaux de bord de santé des appareils, détection proactive des anomalies
- Intune Plan 2 : Microsoft Tunnel pour MAM (VPN applicatif mobile), gestion des appareils spécialisés (kiosques, appareils partagés), mises à jour firmware OTA

**Ce qui est inclus dans M365 E5 (en supplément)**

- Endpoint Privilege Management (EPM) : élévation de privilèges just-in-time, sans compte administrateur local permanent
- Enterprise Application Management (EAM) : déploiement et cycle de vie applicatif depuis un catalogue géré
- Microsoft Cloud PKI : infrastructure de certificats cloud, sans PKI on-premises à maintenir

## Points d'attention

- ⚠️ Si votre organisation a souscrit l'Intune Suite en standalone, ce add-on reste disponible à l'achat pour les tenants hors M365 E3/E5. Pour les tenants E3/E5, vérifiez à votre prochaine facturation si la ligne add-on est encore présente après août 2026.
- ⚠️ EPM, EAM et Cloud PKI sont réservés à M365 E5. Ils ne sont **pas** inclus dans EMS E5 seul ; la distinction est importante pour les organisations qui ont acheté EMS E5 indépendamment du M365 E5.
- 💡 Le déploiement est automatique, mais le **paramétrage** ne l'est pas. Remote Help, EPM et Cloud PKI nécessitent une configuration explicite avant d'être opérationnels. Anticipez les phases de pilote avant la date d'activation dans votre tenant.

## Source
[Microsoft 365 Packaging and Pricing Updates FAQ](https://www.microsoft.com/en-us/licensing/news/2026-M365-Packaging-Pricing-Updates-FAQ)  
[Microsoft Intune Blog — Microsoft 365 adds advanced Intune solutions at scale](https://techcommunity.microsoft.com/blog/microsoftintuneblog/microsoft-365-adds-advanced-microsoft-intune-solutions-at-scale/4474272)