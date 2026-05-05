---
title: "Purview DSPM unifié : la nouvelle expérience de gouvernance data passe en GA en mai 2026"
description: "Microsoft consolide DSPM classique et DSPM for AI dans une expérience unifiée et finalise sa GA fin mai 2026. Workflows guidés outcome-based, signaux tiers, observabilité des agents IA. Un dossier complet arrive bientôt sur TuneInCloud."
pubDate: 2026-05-05
category: "actualites"
subcategory: "breves"
heroImage: "https://tbourke-solutions.com.au/wp-content/uploads/purview-global-security.webp"
---
Microsoft finalise en ce mois de mai 2026 la GA mondiale de la nouvelle expérience Purview Data Security Posture Management (DSPM). Annoncée à Ignite 2025, en Public Preview depuis décembre 2025, l'évolution est désormais à portée de tous les tenants éligibles. Sujet structurant pour les organisations qui déploient Copilot et qui veulent en finir avec la fragmentation de leurs outils de gouvernance data.

![Banniere](/images/banarticle/breve-purview1.png)

## Ce qui change concrètement

Jusqu'ici, Purview proposait deux DSPM distincts : DSPM (classique), centré sur les risques data traditionnels (oversharing SharePoint, DLP, Insider Risk), et DSPM for AI, dédié aux risques liés à Copilot et aux applications IA. Deux portails, deux expériences, deux logiques.

La nouvelle version unifie les deux dans une expérience unique, AI-powered, organisée autour de **workflows guidés outcome-based**. Concrètement, l'administrateur ne démarre plus par "quelle policy je crée ?", mais par "quel objectif je veux atteindre ?". Exemple typique : sélectionner l'objectif **"Prevent data exposure in Microsoft 365 Copilot and Microsoft Copilot interactions"** déroule un parcours guidé qui propose les bonnes policies DLP, suggère les sensitivity labels manquants, et active la policy IRM "Risky AI usage" pertinente. L'administrateur passe de l'analyse à l'action sans naviguer entre solutions.

**Les principales nouveautés** :

- **Asset explorer étendu aux sources tierces**. Via des partenariats Microsoft Sentinel Data Lake, DSPM ingère désormais des signaux de Salesforce (via Varonis), Databricks (via BigID), Snowflake (via Cyera) et Google Cloud Platform (via OneTrust). Facturation pay-as-you-go à travers les compteurs Sentinel. Les partner solutions restent en preview à la GA.
- **AI Observability pour les agents**. Inventaire des agents (Copilot Studio, Foundry, agents tiers), niveau de risque assigné par agent, comportements suspects (oversharing, accès à des données sensibles), recommandations contextuelles. C'est le pendant data security de ce qu'Agent 365 fait côté identité et endpoint.
- **Item-level remediation pour l'oversharing**. Désactivation en masse des liens de partage SharePoint trop ouverts, application en bulk de sensitivity labels depuis un résultat de recherche, intégration directe avec Data Security Investigations (DSI).
- **Reports out-of-the-box enrichis**. Une douzaine de rapports prêts à l'emploi sur la couverture sensitivity labels, l'activité DLP, les tendances de posture. Filtres et drill-downs pour identifier les gaps de protection.
- **Security Copilot agents intégrés**. Triage Agent dans Insider Risk Management (GA), Data Security Posture Agent en preview avec recherche en langage naturel sans dépendance aux SITs ou classifiers.

## Calendrier et conditions

- **Public Preview worldwide** : démarrée début décembre 2025, finalisée début avril 2026.
- **GA worldwide** : démarrée début mai 2026, finalisation prévue fin mai 2026 (calendrier confirmé dans le Message Center MC1191257, mis à jour le 10 avril 2026 — initialement annoncé pour avril, repoussé à mai).
- **Aucune action admin requise**. Pour les clients déjà onboardés sur DSPM classique ou DSPM for AI classique, les étapes d'onboarding sont automatiquement reportées sur la nouvelle expérience.
- **Coexistence assurée jusqu'en juin 2026**. DSPM (classique) et DSPM for AI (classique) restent disponibles jusqu'en juin 2026, après quoi la nouvelle expérience devient la solution centralisée.

## Points d'attention

- ⚠️ **Licensing**. La nouvelle expérience DSPM est disponible pour les clients **Microsoft 365 E5 et E5 Compliance**. Pour les organisations en Business Premium, l'accès reste plus limité, sauf si la Purview Suite for Business Premium a été ajoutée. Les capacités étendues type AI Observability pour agents nécessitent en pratique Agent 365 ou M365 E7.
- ⚠️ **Connecteurs tiers en preview à la GA**. Les intégrations partenaires (Varonis, BigID, Cyera, OneTrust) restent en Public Preview à la GA. Pour une organisation qui veut industrialiser sa gouvernance multi-cloud, prévoir une phase pilote.
- ⚠️ **Administrative units**. Le support des administrative units arrive avec la nouvelle expérience pour atteindre la parité avec les versions classiques. Les admins restreints ne peuvent pas créer les policies "one-click" qui s'appliquent à tous les utilisateurs.
- 💡 **Démarrer en mode simulation**. Les policies recommandées par DSPM peuvent être activées directement en mode simulation. Indispensable pour mesurer l'impact sans interrompre les utilisateurs avant de basculer en enforcement.
- 💡 **Couverture Microsoft-centric**. L'observabilité des agents reste centrée sur l'écosystème Microsoft (Copilot Studio, Foundry). Pour les agents construits sur LangChain, CrewAI ou autres frameworks open source, la visibilité native reste limitée.

## Et après

> 📚 **À venir sur TuneInCloud** : un dossier complet sur le nouveau DSPM unifié, avec déploiement pas à pas, mapping des objectifs aux policies, retours d'expérience sur les workflows guidés, et analyse détaillée du modèle de licensing. Restez connectés.

## Source
[Microsoft Tech Community — Beyond Visibility: The new Microsoft Purview DSPM experience](https://techcommunity.microsoft.com/blog/microsoft-security-blog/beyond-visibility-the-new-microsoft-purview-data-security-posture-management-dsp/4470984)  
[MC1191257 — New Microsoft Purview data security posture management experience](https://mc.merill.net/message/MC1191257)  
[Microsoft Learn — What's new in Microsoft Purview](https://learn.microsoft.com/en-us/purview/whats-new)  
[Microsoft Tech Community — From Oversharing to Enforcement: A Practical Guide to AI Data Security with Microsoft Purview](https://techcommunity.microsoft.com/blog/microsoft-purview-blog/from-oversharing-to-enforcement-a-practical-guide-to-ai-data-security-with-micro/4513727)