---
title: "Purview étend la DLP au niveau réseau via Entra Internet Access"
description: "Microsoft Purview inspecte désormais le trafic réseau via Entra Internet Access : prompts IA, uploads vers le cloud personnel, webmails. Public Preview en cours, GA attendue entre fin septembre et fin octobre 2026."
pubDate: 2026-07-20
category: "actualites"
subcategory: "breves"
heroImage: "https://i0.wp.com/workingtogether.fun/wp-content/uploads/2026/07/wn.png?fit=1200%2C800&ssl=1"
---
La DLP Purview sait déjà atteindre les applications tierces : connecteurs API et session policies de Defender for Cloud Apps pour les apps sanctionnées, Endpoint DLP pour bloquer les uploads depuis les postes onboardés, intégration Edge for Business pour les interactions IA au niveau navigateur. Mais chacun de ces canaux a son angle mort : l'un inspecte la donnée après coup, l'autre exige une session navigateur fédérée, le troisième un poste managé. Microsoft ajoute le plan d'enforcement qui manquait : le réseau lui-même, via Entra Internet Access. La fonctionnalité, baptisée Purview Network Data Security, est en Public Preview.

![Banniere](/images/banarticle/breve-purview1.png)

## Ce qui change concrètement

L'intégration fait travailler ensemble les classifieurs Purview (SITs, Exact Data Match, trainable classifiers) et le Security Service Edge de Microsoft. Entra Internet Access intercepte le trafic HTTP et HTTPS, le transmet à Purview pour classification et évaluation de policy, puis applique la décision. Pour les policies DLP, l'évaluation se fait en temps réel : le blocage intervient avant que la donnée ne quitte l'organisation. Pour les collection policies (découverte et monitoring sans blocage), la communication est asynchrone.

La différence avec l'existant tient au point d'inspection. Là où les session policies MDCA exigent une session navigateur sur une application fédérée Entra, et là où Endpoint DLP exige un poste onboardé, l'inspection réseau voit passer le contenu quel que soit le client : application native, API, add-in, navigateur non géré. Le référentiel d'applications est d'ailleurs celui du Cloud App Catalog de Defender for Cloud Apps, soit plus de 34 000 applications référencées.

Quatre activités sont supportées : texte envoyé vers une app cloud ou IA, fichier uploadé, texte reçu, fichier téléchargé. Trois familles d'usage concentrent l'intérêt :

- **Les interactions avec l'IA générative** via navigateurs, applications et add-ins : ChatGPT, Gemini, Claude. Le texte des prompts est inspecté, pas seulement les fichiers joints.
- **Les uploads vers les fournisseurs de stockage cloud non sanctionnés** : Dropbox, Box, Google Drive.
- **Les emails et pièces jointes envoyés vers des webmails personnels**, Gmail en tête.

Les alertes et incidents remontent dans Purview et dans le portail Microsoft Defender, avec les signaux Insider Risk Management pour identifier les comportements utilisateurs à risque. La décision de blocage combine l'identité, l'activité de l'utilisateur et le contexte de la donnée.

## Calendrier et prérequis

Le rollout s'étale de juillet à octobre 2026, avec une GA worldwide annoncée entre fin septembre et fin octobre 2026 (MC1419797, Roadmap ID 566528). L'intégration apparaît automatiquement dans les tenants éligibles.

Côté prérequis, la liste est exigeante :

1. **Entra Internet Access déployé** (Global Secure Access), avec les clients GSA sur les postes
2. **TLS inspection activée** : sans déchiffrement du trafic, pas d'inspection de contenu. Cela suppose le déploiement du certificat racine Entra sur les appareils
3. **Purview DLP** avec les classifieurs configurés
4. **Facturation pay-as-you-go** : Purview Network Data Security s'appuie sur un modèle à la consommation, à provisionner via un abonnement Azure

## Points d'attention

- ⚠️ **La TLS inspection est un projet en soi**. Déchiffrer le trafic des collaborateurs soulève des questions juridiques et sociales réelles en France : information des instances représentatives, exclusions à prévoir (santé, banque, syndicats), documentation CNIL. Le volet technique est le plus simple des deux.
- ⚠️ **Modèle de coût à cadrer avant d'activer**. Le pay-as-you-go sur de l'inspection de trafic réseau peut chiffrer vite sur une flotte complète. Commencer par des collection policies en mode découverte sur un périmètre pilote donne une base de dimensionnement avant tout blocage.
- ⚠️ **Preview jusqu'à l'automne**. Périmètre applicatif et comportements susceptibles d'évoluer avant la GA. Ne pas bâtir de contrôle de conformité opposable sur cette brique avant fin octobre 2026.
- 💡 **Trois plans d'enforcement, trois périmètres**. Endpoint DLP reste nécessaire pour les canaux hors réseau (USB, impression, presse-papiers) et les postes hors GSA. La browser data security couvre Edge, y compris sur postes non onboardés. Les session policies MDCA gardent leur intérêt pour le contrôle fin des apps fédérées. La couche réseau complète l'ensemble : elle voit ce que les trois autres ne voient pas, sans les remplacer.
- 💡 Pour les organisations déjà engagées sur le nouveau DSPM unifié, cette brique s'inscrit dans la même trajectoire : suivre la donnée là où elle circule, et non plus seulement là où elle repose. Le trio DSPM, DLP Copilot et DLP réseau commence à former une couverture cohérente du shadow AI.

## Source
[Microsoft Entra Blog — Protect sensitive data in motion across SaaS and AI apps with Microsoft Purview and Microsoft Entra](https://techcommunity.microsoft.com/blog/microsoft-entra-blog/protect-sensitive-data-in-motion-across-saas-and-ai-apps-with-microsoft-purview-/4529310)  
[Microsoft Learn — Learn about Microsoft Purview Network Data Security](https://learn.microsoft.com/en-us/purview/dlp-network-data-security-learn)  
[MC1419797 — Extend Purview data security to the network layer via Entra GSA integration](https://mc.merill.net/message/MC1419797)