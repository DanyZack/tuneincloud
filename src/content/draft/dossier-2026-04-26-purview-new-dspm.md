---
title: "Microsoft Purview DSPM : le nouveau plan de contrôle unifié pour la sécurité des données"
description: "Le nouveau DSPM Purview fusionne DSPM classic et DSPM for AI en une expérience unifiée. Tour d'horizon complet : architecture, fonctionnalités, licences, limites et roadmap."
pubDate: 2026-04-25
category: "dossiers"
subcategory: "purview"
heroImage: "https://i.ytimg.com/vi/5JEQ69TfTXc/maxresdefault.jpg"
---

Deux tableaux de bord, deux expériences, deux logiques de navigation : le DSPM classic
surveillait les données non protégées dans Microsoft 365, le DSPM for AI scrutait les
interactions Copilot et le shadow AI. Depuis décembre 2025, Microsoft fusionne les deux
en une seule interface. Ce n'est pas qu'un simple lifting visuel.

## Contexte et enjeux

### Deux solutions pour un même problème, sans se parler

Le DSPM classic (disponible depuis 2023) corrélait les signaux DLP, Insider Risk
Management et Information Protection pour produire des recommandations de posture. Il
répondait à une question précise : quelles données sensibles ne sont pas couvertes par
une politique ?

Le DSPM for AI (sorti en preview en 2024 sous le nom "AI Hub", renommé puis déclaré
GA à Ignite 2024) s'attaquait à un problème différent : comment superviser ce que les
utilisateurs envoient dans Copilot, ChatGPT ou Gemini, et comment détecter le
surpartage de données accessible aux agents IA ?

Ces deux outils vivaient dans le même portail Purview mais sans intégration réelle. Un
administrateur devait naviguer entre deux expériences pour avoir une vision cohérente de
la posture data de son organisation. La frontière artificielle entre "risque humain" et
"risque IA" ne correspondait plus à la réalité opérationnelle.

### L'accélérateur : les agents IA autonomes

40 % des incidents de sécurité des données surviennent désormais dans des applications
IA, selon une étude commandée par Microsoft en juillet 2025 auprès de 1 700 professionnels
de la sécurité. Cette statistique traduit un changement de nature du risque : les agents
IA peuvent accéder à des volumes de données bien supérieurs à ce qu'un utilisateur
humain consulterait en une journée, et ils agissent de manière autonome, souvent sans
que l'IT en soit informé.

Les outils existants — axés sur les comportements humains, les endpoints et les politiques
statiques — n'étaient pas conçus pour évaluer le risque d'un agent créé dans Copilot
Studio et accédant à SharePoint en mode délégué. Le nouveau DSPM adresse directement
ce cas.

---

## Architecture et fonctionnement

![Architecture Globale DSPM](/images/schemas/purview-dspm-archiglobale.png)

### Un plan de contrôle centré sur la donnée, pas sur l'infrastructure

Le DSPM unifié repose sur un principe structurant : la sécurité des données ne s'organise
pas autour des endpoints, des réseaux ou des identités, mais autour de la donnée
elle-même. Quatre questions articulent toute l'expérience :

1. Quelles données sensibles avons-nous ?
2. Où résident-elles ?
3. Qui peut y accéder ?
4. Comment sont-elles protégées ?

Le moteur du DSPM scanne en continu l'environnement, corrèle les signaux issus de DLP,
Insider Risk Management, Information Protection et Data Security Investigations, et
produit une vue consolidée de la posture.

### Les cinq espaces fonctionnels du nouveau DSPM

**Posture** est le tableau de bord central. Il affiche un score global de posture,
une tendance sur 30 jours, les principaux objectifs à adresser par ordre de risque,
et une vue instantanée de l'état du patrimoine de données. C'est aussi l'espace
d'entrée pour les prompts Security Copilot intégrés, qui permettent d'interroger
le DSPM en langage naturel.

**Objectifs** remplace la logique de recommandations disparates des versions classiques
par des workflows guidés orientés résultats. L'administrateur choisit un objectif (par
exemple : "Prévenir le surpartage de données sensibles") et accède à un plan de
remédiation incluant les métriques pertinentes, les patterns de risque identifiés, et
des actions directement exécutables depuis l'interface. Chaque objectif est traité
comme un programme de travail, avec suivi de progression.

**AI Observability** est la nouveauté fonctionnelle la plus significative. Elle
traite les agents IA comme des entités de première classe dans la posture de sécurité
des données : inventaire complet des agents actifs sur le tenant (M365 Copilot, Copilot
Studio, Azure AI Foundry, Agent 365, tiers), niveau de risque assigné par agent
en fonction de son comportement, métriques de posture individuelles, et activité sur
30 jours. C'est la fusion entre la visibilité agent d'Entra Agent ID et la dimension
data du DSPM.

**Rapports** a été substantiellement enrichi. L'expérience classique proposait quelques
tendances analytiques ; le nouveau DSPM expose 12 rapports au lancement de la preview
(ce nombre est destiné à croître), couvrant la couverture des étiquettes de sensibilité,
l'efficacité de l'auto-labeling, la dérive de posture via les transitions de labels,
l'activité DLP, les comportements utilisateurs et les risques agents. Chaque rapport
supporte filtrage avancé et vue personnalisée.

**Découverte** regroupe trois sous-espaces : Apps and agents (tableau de bord des
applications IA utilisées dans l'organisation, avec détail des données sensibles
accédées par les 20 agents les plus récents), Activity explorer (journal des activités
liées aux contenus étiquetés ou contenant des informations sensibles, avec un onglet
dédié aux interactions IA), et Data risk assessments (évaluation du surpartage).

### Le Posture Agent : l'IA qui analyse votre posture data

Le nouveau DSPM intègre un agent Security Copilot dédié, appelé "Data Security Posture
Agent", accessible depuis l'onglet Agent de l'Asset explorer. Cet agent utilise des LLM
pour effectuer des recherches en langage naturel sur les fichiers SharePoint et OneDrive,
les messages Teams, les emails Exchange et les interactions Copilot. Il ne repose pas
sur des classifieurs ou des types d'informations sensibles préconfigurés : il comprend
le contexte. Un second agent, le "Data Security Triage Agent", automatise le triage des
alertes DLP et IRM en filtrant le bruit et en remontant les incidents les plus critiques.

---

## La nouveauté structurante : l'extension aux sources tierces

### Un problème réel : les données ne vivent pas seulement dans Microsoft 365

Les agents IA référencent des données stockées dans Salesforce, Databricks, Snowflake,
ou Google Cloud Platform. Un DSPM limité à l'écosystème Microsoft produit une vision
partielle du risque, ce qui est précisément le type de fausse confiance qui précède les
incidents.

### L'architecture d'intégration tierce via Microsoft Sentinel

L'intégration des sources externes passe par le Sentinel Data Lake. L'administrateur
connecte un workspace Sentinel depuis les Setup Tasks du DSPM, puis active les
connecteurs partenaires disponibles dans le Sentinel Content Hub. Les signaux remontent
dans l'Asset explorer du DSPM sous forme de métadonnées d'assets (permissions,
localisation, types d'informations sensibles).

Les quatre partenaires initiaux sont Varonis pour Salesforce, BigID pour Databricks,
Cyera pour Snowflake, et OneTrust pour Google Cloud Platform. D'autres sources sont
annoncées "coming soon" sans calendrier précis.

**Point de facturation critique** : ces signaux tiers sont facturés en pay-as-you-go
via les compteurs de consommation Microsoft Sentinel. Ce n'est pas inclus dans la
licence E5 ou E5 Compliance. L'administrateur doit configurer la facturation PAYG
pour son organisation avant d'activer ces connecteurs, et anticiper les coûts associés
au volume de données ingérées.