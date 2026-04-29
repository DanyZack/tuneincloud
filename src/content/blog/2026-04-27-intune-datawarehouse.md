---
title: "Intune Data Warehouse : retrait du connecteur Power BI beta, transition OData obligatoire"
description: "Microsoft retire le connecteur Power BI beta de l'Intune Data Warehouse à partir du 20 avril 2026. La transition vers le flux OData est obligatoire pour conserver l'accès aux données de reporting Intune."
pubDate: 2026-04-26
category: "actualites"
subcategory: "breves"
heroImage: "https://www.ewsolutions.com/wp-content/uploads/2025/08/Data-Warehouse-Testing.jpg"
---
Microsoft a démarré le 20 avril 2026 le retrait progressif du connecteur Power BI beta de l'Intune Data Warehouse. Pour les équipes qui ont construit leurs dashboards de reporting Intune sur ce connecteur, l'action est simple mais obligatoire : passer au flux OData récupérable depuis le centre d'administration Intune.

![Banniere](/images/banarticle/breve-intune2.png)

## Ce qui change concrètement

L'Intune Data Warehouse fournit un accès structuré aux données historiques Intune via une API OData. Il alimente les dashboards Power BI et Excel personnalisés, typiquement utilisés pour les rapports de conformité, d'inventaire d'appareils, ou de suivi des déploiements applicatifs.

Jusqu'ici, deux mécanismes de connexion coexistaient : le connecteur Power BI beta (interface dédiée, accès simplifié) et le flux OData (URL générée depuis le centre d'administration, plus universel). Microsoft retire le connecteur beta dans le cadre d'une modernisation plus large de l'infrastructure de reporting.

Le rollout du retrait s'étale sur deux semaines à partir du 20 avril 2026. Les communications client commencent fin avril 2026. **Les organisations qui ne migrent pas perdent l'accès aux données via le connecteur beta après son retrait définitif.**

## Ce qu'il faut faire, concrètement

1. **Inventorier les rapports impactés**. Tout rapport Power BI ou Excel utilisant le connecteur beta `Intune Data Warehouse` doit être identifié.
2. **Récupérer l'URL du flux OData** depuis le centre d'administration Intune : Reports > Intune Data warehouse > Data warehouse.
3. **Reconfigurer les rapports** pour utiliser le flux OData. L'authentification est gérée via Microsoft Entra ID (OAuth 2.0), avec respect des rôles RBAC Intune existants.
4. **Sauvegarder les données historiques** que vous souhaitez conserver. Une mise à jour parallèle de l'architecture du Data Warehouse, désormais attendue mi-juin 2026, va réinitialiser l'historique à environ 30 jours et régénérer les clés de substitution.

## Points d'attention

- ⚠️ **Deux changements à ne pas confondre**. Le retrait du connecteur Power BI beta (avril 2026) est distinct de la mise à jour de l'architecture du Data Warehouse (mi-juin 2026, repoussée depuis février). La première impose une migration de connecteur, la seconde réinitialisera l'historique et changera les définitions de licensing.
- ⚠️ **Reset de l'historique à 30 jours**. Lors de la mise à jour d'architecture en juin, les données historiques seront réduites à environ 30 jours. Pour les organisations soumises à des obligations de conservation ou à des audits, sauvegarder les données antérieures avant la mise à jour est non négociable.
- 💡 **Clés de substitution régénérées**. Si vos rapports utilisent des jointures sur des surrogate keys, prévoir un refresh complet après la mise à jour de juin. Les correspondances précédentes ne seront plus valides.
- 💡 **Définitions de licensing mises à jour**. Les rapports basés sur des champs de licensing (allocation de licences, utilisation par produit) doivent être revalidés après la mise à jour, les définitions évoluant avec la nouvelle architecture.
- L'OData v4.0 reste le standard d'accès. Tout outil analytique compatible OAuth 2.0 et OData v4.0 continue de fonctionner (Power BI Desktop, Excel, Tableau, scripts personnalisés).

## Source
[Microsoft Learn — What's new in Microsoft Intune](https://learn.microsoft.com/en-us/intune/whats-new/)  
[MC1188216 — Plan for Change: Update to Intune Data Warehouse infrastructure](https://mc.merill.net/message/MC1188216)  
[Microsoft Learn — Connect to the Data Warehouse With Power BI](https://learn.microsoft.com/en-us/intune/developer/data-warehouse/connect-power-bi)