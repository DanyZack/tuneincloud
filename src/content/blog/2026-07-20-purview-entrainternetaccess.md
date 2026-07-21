---
title: "Purview étend la DLP au niveau réseau via Entra Internet Access"
description: "Microsoft Purview inspecte désormais le trafic réseau via Entra Internet Access : prompts IA, uploads vers le cloud personnel, webmails. Public Preview en cours, GA attendue entre fin septembre et fin octobre 2026."
pubDate: 2026-07-20
category: "actualites"
subcategory: "breves"
heroImage: "https://i0.wp.com/workingtogether.fun/wp-content/uploads/2026/07/wn.png?fit=1200%2C800&ssl=1"
---
'extension du périmètre de la DLP Purview suit une trajectoire régulière : d'abord les emplacements Microsoft 365 natifs (Exchange, SharePoint, OneDrive, Teams), puis les endpoints avec Endpoint DLP, puis les applications cloud connectées à Defender for Cloud Apps, puis le navigateur avec l'intégration Edge for Business. Chaque étape a fermé un angle mort, chacune avec sa limite : les connecteurs API inspectent la donnée après coup, les session policies exigent une session navigateur fédérée, Endpoint DLP suppose un poste onboardé. L'étape suivante était logique et la voici : la donnée est désormais inspectée là où elle circule, sur le réseau lui-même. La fonctionnalité s'appelle Purview Network Data Security.

![Banniere](/images/banarticle/breve-purview2.png)

## Ce qui change concrètement

Le principe : une solution SASE (Secure Access Service Edge) intercepte le trafic HTTP et HTTPS, le transmet à Purview pour classification et évaluation de policy, puis applique la décision. Les classifieurs Purview existants (SITs, Exact Data Match, trainable classifiers) sont réutilisés tels quels. Pour les policies DLP, l'évaluation se fait en temps réel : le blocage intervient avant que la donnée ne quitte l'organisation. Pour les collection policies (découverte et monitoring sans blocage), la communication est asynchrone.

Deux voies d'intégration coexistent, et leur maturité diffère :

- **La voie native Microsoft, via Entra Internet Access.** Précision de vocabulaire utile : Entra Internet Access est la brique "trafic internet" de Global Secure Access, la solution chapeau qui regroupe aussi Entra Private Access. C'est le client Global Secure Access déployé sur les postes qui capte le trafic. À ce jour, le network file filtering via Global Secure Access est en préversion et porte sur les fichiers uniquement. L'intégration étendue au texte et aux prompts, celle annoncée par le MC1419797, est en cours de déploiement.
- **Les solutions SASE tierces, déjà en disponibilité générale**, sur le texte comme sur les fichiers. Netskope est le premier partenaire de cet écosystème SSE ouvert, avec son intégration Netskope One for Microsoft Purview DLP. La liste des solutions supportées est maintenue sur la page Microsoft Purview Data Loss Prevention Integrations de la documentation. Une organisation déjà équipée d'un SASE tiers n'a donc pas à attendre la GA de la voie native pour appliquer ses policies Purview au trafic réseau.

La différence avec l'existant tient au point d'inspection. Là où les session policies MDCA exigent une session navigateur sur une application fédérée Entra, et là où Endpoint DLP exige un poste onboardé, l'inspection réseau voit passer le contenu quel que soit le client : application native, API, add-in, navigateur non géré. Le référentiel d'applications est d'ailleurs celui du Cloud App Catalog de Defender for Cloud Apps, soit plus de 34 000 applications référencées. La boucle avec MDCA est bouclée : les mêmes classifications, le même catalogue, un plan d'enforcement de plus.

Quatre activités sont couvertes par la solution : texte envoyé vers une app cloud ou IA, fichier uploadé, texte reçu, fichier téléchargé. Trois familles d'usage concentrent l'intérêt :

- **Les interactions avec l'IA générative** via navigateurs, applications et add-ins : ChatGPT, Gemini, Claude. Le texte des prompts est inspecté, pas seulement les fichiers joints.
- **Les uploads vers les fournisseurs de stockage cloud non sanctionnés** : Dropbox, Box, Google Drive.
- **Les emails et pièces jointes envoyés vers des webmails personnels**, Gmail en tête.

Les alertes et incidents remontent dans Purview et dans le portail Microsoft Defender, avec les signaux Insider Risk Management pour identifier les comportements utilisateurs à risque. La décision de blocage combine l'identité, l'activité de l'utilisateur et le contexte de la donnée.

## Calendrier et prérequis

Pour l'intégration native Entra Internet Access, le rollout s'étale de juillet à octobre 2026, avec une GA worldwide annoncée entre fin septembre et fin octobre 2026 (MC1419797, Roadmap ID 566528). L'intégration apparaît automatiquement dans les tenants éligibles. Les intégrations SASE tierces sont, elles, déjà en disponibilité générale.

Côté prérequis, la liste est exigeante :

1. **Un SASE en place** : Entra Internet Access déployé (avec les clients Global Secure Access sur les postes), ou une solution SASE partenaire supportée
2. **TLS inspection validée** : sans déchiffrement du trafic HTTPS, pas d'inspection de contenu. Le MC1419797 liste explicitement la validation de la TLS inspection dans les actions de préparation
3. **Purview DLP** avec les classifieurs configurés
4. **Facturation pay-as-you-go** : Purview Network Data Security s'appuie sur un modèle à la consommation, à provisionner via un abonnement Azure

## Points d'attention

- ⚠️ **SASE tiers : lisez les petites lignes**. Microsoft l'écrit sans détour dans sa documentation : les partenaires non-Microsoft intégrés peuvent accéder à une partie de la configuration des policies et potentiellement la stocker, identifiants utilisateurs inclus, sous le régime de leurs propres conditions et politique de confidentialité. Pour les organisations soumises à des exigences fortes de localisation ou de minimisation des données, ce point doit passer par le DPO avant l'activation.
- ⚠️ **Modèle de coût à cadrer avant d'activer**. Le pay-as-you-go sur de l'inspection de trafic réseau peut chiffrer vite sur une flotte complète. Commencer par des collection policies en mode découverte sur un périmètre pilote donne une base de dimensionnement avant tout blocage.
- ⚠️ **Préversion jusqu'à l'automne pour la voie native**. Le périmètre de l'intégration Entra Internet Access (aujourd'hui fichiers uniquement en préversion, texte et prompts en cours de déploiement) évoluera d'ici la GA. Ne pas bâtir de contrôle de conformité opposable sur cette brique avant fin octobre 2026.
- 💡 **Trois plans d'enforcement, trois périmètres**. Endpoint DLP reste nécessaire pour les canaux hors réseau (USB, impression, presse-papiers) et les postes hors SASE. La browser data security couvre Edge, y compris sur postes non onboardés. Les session policies MDCA gardent leur intérêt pour le contrôle fin des apps fédérées. La couche réseau complète l'ensemble : elle voit ce que les trois autres ne voient pas, sans les remplacer.
- 💡 Pour les organisations déjà engagées sur le nouveau DSPM unifié, cette brique s'inscrit dans la même trajectoire : suivre la donnée là où elle circule, et non plus seulement là où elle repose. Le trio DSPM, DLP Copilot et DLP réseau commence à former une couverture cohérente du shadow AI.

## Source
[Microsoft Entra Blog - Protect sensitive data in motion across SaaS and AI apps with Microsoft Purview and Microsoft Entra](https://techcommunity.microsoft.com/blog/microsoft-entra-blog/protect-sensitive-data-in-motion-across-saas-and-ai-apps-with-microsoft-purview-/4529310)  
[Microsoft Learn - Learn about Microsoft Purview Network Data Security](https://learn.microsoft.com/en-us/purview/dlp-network-data-security-learn)  
[MC1419797 - Extend Purview data security to the network layer via Entra GSA integration](https://mc.merill.net/message/MC1419797)
