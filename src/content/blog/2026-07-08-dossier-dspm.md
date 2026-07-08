---
title: "Microsoft Purview DSPM : le nouveau plan de contrôle unifié pour la sécurité des données"
description: "Le nouveau DSPM Purview fusionne DSPM classic et DSPM for AI en une expérience unifiée, GA depuis fin mai 2026. Architecture, cas d'usage, licences, limites et compte à rebours vers septembre 2026."
pubDate: 2026-07-08
category: "dossiers"
heroImage: "https://i.ytimg.com/vi/xr5DGzAs4no/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLC9pReDIU7l4TIkm9Xdl8yhGnDogw" 
---

Deux tableaux de bord, deux expériences, deux logiques de navigation : le DSPM classic
surveillait les données non protégées dans Microsoft 365, le DSPM for AI scrutait les
interactions Copilot et le shadow AI. Depuis décembre 2025, Microsoft fusionne les deux
en une seule interface. Depuis fin mai 2026, cette interface est officiellement GA. Et
les versions classiques n'ont plus que jusqu'au 30 septembre 2026 pour vivre.

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

Les outils existants, axés sur les comportements humains, les endpoints et les politiques
statiques, n'étaient pas conçus pour évaluer le risque d'un agent créé dans Copilot
Studio et accédant à SharePoint en mode délégué. Le nouveau DSPM adresse directement
ce cas.

---

## État de disponibilité au 8 juillet 2026

Le nouveau DSPM est en disponibilité générale mondiale depuis fin mai 2026, selon
MC1191257 mis à jour le 10 avril 2026 (rollout débuté début mai, complété fin mai).
La documentation Microsoft Learn confirme officiellement cet état. Deux capacités restent
en preview après la GA du plan de contrôle principal :

- **Les connecteurs partenaires** pour les sources tierces (Varonis, BigID, Cyera,
  OneTrust). Aucune date de GA annoncée à ce jour.
- **Le Data Security Posture Agent** (agent Security Copilot dédié). GA initialement
  prévue fin mai, repoussée à mi-juin, puis à fin juillet 2026 selon MC1318248.

Les versions classiques (DSPM classic et DSPM for AI classic) restent disponibles en
parallèle jusqu'au **30 septembre 2026**. Aucune politique existante n'est modifiée
par l'activation du nouveau DSPM ; les onboarding steps sont automatiquement importés.

---

## Architecture et fonctionnement

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

![SCHEMA 1](/images/schemas/purview-dspm-archiglobale.png)

### Les cinq espaces fonctionnels du nouveau DSPM

**Posture** est le tableau de bord central. Il affiche un score global de posture,
une tendance sur 30 jours, les principaux objectifs à adresser par ordre de risque,
et une vue instantanée de l'état du patrimoine de données. C'est aussi l'espace
d'entrée pour les prompts Security Copilot intégrés, qui permettent d'interroger
le DSPM en langage naturel.

**Objectives** remplace la logique de recommandations disparates des versions classiques
par des workflows guidés orientés résultats. L'administrateur choisit un objectif (par
exemple : "Prevent oversharing of sensitive data") et accède à un plan de remédiation
incluant les métriques pertinentes, les patterns de risque identifiés, et des actions
directement exécutables depuis l'interface. Chaque objectif est traité comme un programme
de travail, avec suivi de progression. L'objectif "Prevent exfiltration to risky
destinations" intègre depuis juin 2026 les proactive AI insights de DSI qui rafraîchissent
automatiquement une investigation toutes les 24 heures, avec cinq catégories fixes de
risque.

**AI Observability** est la nouveauté fonctionnelle la plus significative. Elle
traite les agents IA comme des entités de première classe dans la posture de sécurité
des données : inventaire complet des agents actifs sur le tenant (M365 Copilot, Copilot
Studio, Azure AI Foundry, Agent 365, tiers), niveau de risque assigné par agent
en fonction de son comportement, métriques de posture individuelles, et activité sur
30 jours. C'est la fusion entre la visibilité agent d'Entra Agent ID et la dimension
data du DSPM. Cette capacité, ainsi que l'Insider Risk Management for Agents, sont
GA depuis fin mai 2026 pour les tenants disposant de M365 E7 ou Agent 365.

**Reports** a été substantiellement enrichi. L'expérience classique proposait quelques
tendances analytiques ; le nouveau DSPM expose 12 rapports au lancement de la preview
(ce nombre est destiné à croître), couvrant la couverture des étiquettes de sensibilité,
l'efficacité de l'auto-labeling, la dérive de posture via les transitions de labels,
l'activité DLP, les comportements utilisateurs et les risques agents. Chaque rapport
supporte filtrage avancé et vue personnalisée.

**Discover** regroupe trois sous-espaces : Apps and agents (tableau de bord des
applications IA utilisées dans l'organisation, avec détail des données sensibles
accédées par les 20 agents les plus récents), Activity explorer (journal des activités
liées aux contenus étiquetés ou contenant des informations sensibles, avec un onglet
dédié aux interactions IA), et Data risk assessments (évaluation du surpartage).

### Le Data Security Posture Agent : encore en preview

Le nouveau DSPM intègre un agent Security Copilot dédié, appelé "Data Security Posture
Agent", accessible depuis l'onglet Agent de l'Asset explorer. Cet agent utilise des LLM
pour effectuer des recherches en langage naturel sur les fichiers SharePoint et OneDrive,
les messages Teams, les emails Exchange et les interactions Copilot. Il ne repose pas
sur des classifieurs ou des types d'informations sensibles préconfigurés : il comprend
le contexte. Un second agent, le "Data Security Triage Agent", automatise le triage des
alertes DLP et IRM en filtrant le bruit et en remontant les incidents les plus critiques.

À noter : ces deux agents restent en preview après la GA du plan de contrôle DSPM.
La GA du Data Security Posture Agent est prévue pour fin juillet 2026 selon MC1318248,
sans engagement de disponibilité tant que la preview n'a pas été clôturée.

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

Les quatre partenaires disponibles au 8 juillet 2026 sont Varonis pour Salesforce,
BigID pour Databricks, Cyera pour Snowflake, et OneTrust pour Google Cloud Platform.
Les quatre passent désormais par Sentinel Data Lake, contrairement à la situation
d'avril 2026 où Varonis pour Salesforce nécessitait un chemin d'activation distinct.
D'autres sources sont annoncées "coming soon" sans calendrier précis.

![SCHEMA 2](/images/schemas/schema-sentinel-data-lake.png)

**Point de facturation critique** : ces signaux tiers sont facturés en pay-as-you-go
via les compteurs de consommation Microsoft Sentinel. Ce n'est pas inclus dans la
licence E5 ou E5 Compliance. L'administrateur doit configurer la facturation PAYG
pour son organisation avant d'activer ces connecteurs, et anticiper les coûts associés
au volume de données ingérées.

---

## Prérequis et licences

### Licence de base

Le nouveau DSPM (GA) est disponible pour les tenants disposant d'une licence
**Microsoft 365 E5** ou **Microsoft 365 E5 Compliance**. C'est le même seuil que les
versions classiques. Les clients **Business Premium** peuvent accéder à une partie
des capacités via l'add-on **Microsoft Purview Suite**, mais certaines fonctionnalités
IA avancées restent réservées à E5 Compliance.

Pour les fonctionnalités spécifiques aux agents IA (DSPM AI Observability et Insider
Risk Management for Agents), la licence requise est **Microsoft 365 E7** ou
**Agent 365** (15 $/utilisateur/mois en standalone). Agent 365 est passé en GA le 1er
mai 2026. Ces capacités agents ne sont pas incluses dans E5.

![SCHEMA 3](/images/schemas/schema-licences-agents.png)

### Prérequis techniques à activer avant le premier accès

Deux prérequis sont obligatoires pour que le DSPM produise des données exploitables.
Leur activation est déclenchée automatiquement lors du premier "Get started" dans
l'interface, mais l'administrateur doit vérifier qu'ils ne sont pas bloqués par une
politique existante.

**Microsoft Purview Audit** doit être activé. Pour la majorité des tenants, il l'est
par défaut. Si ce n'est pas le cas, l'activation se fait depuis le portail Purview.
Sans audit, aucune activité utilisateur ni IA n'est capturée.

**Analytics dans DLP et Insider Risk Management** doivent être activés. L'opt-in DSPM
les active automatiquement s'ils ne l'étaient pas encore. Ces deux services sont le
moteur de corrélation du DSPM : sans eux, les recommandations et rapports restent vides.

Après activation, compter environ une journée avant que les premières données du tenant
soient disponibles dans l'interface.

### Prérequis additionnels selon les scénarios

Pour la **visibilité sur les sites IA tiers** (ChatGPT, Gemini, DeepSeek, etc.) :
l'extension navigateur Microsoft Purview Compliance doit être déployée sur les postes
Windows (Edge, Chrome, Firefox). Elle est requise pour les politiques IRM de détection
des visites vers des sites IA, et pour l'endpoint DLP sous Chrome.

Pour les **sources tierces** (Salesforce, Snowflake, Databricks, GCP) : un workspace
Microsoft Sentinel avec Sentinel Data Lake configuré est nécessaire. La facturation
PAYG doit être activée via le Usage Center de Purview.

Pour l'**item-level scanning** sur SharePoint (GA depuis mars 2026 selon MC1254556) :
une app registration Entra est requise pour permettre les actions de remédiation
directes sur les items. La configuration s'effectue via un processus d'authentification
unique la première fois qu'un item-level scan est lancé.

Pour les **évaluations de risque sur Microsoft Fabric** : une app registration Entra
est requise pour l'authentification service principal vers Fabric, avec les credentials
fédérés (recommandé) ou client secret. Un administrateur Fabric doit participer à
la configuration.

### Rôles et permissions

L'accès complet au DSPM (lecture, création, édition) nécessite un des rôles suivants :
rôle Entra **Compliance Administrator**, ou groupe de rôles **Microsoft Purview
Compliance Administrator**. Depuis juin 2026, un nouveau rôle **Data Security
Investigation Contributor** est automatiquement accordé aux membres de plusieurs groupes
Purview (Compliance Administrator, Organization Management), sans assignation manuelle.

L'utilisation de Security Copilot dans le DSPM requiert en plus le rôle
**Data Security Viewer**.

---

## Mise en œuvre : les premières étapes

### 1. Activer le DSPM

Depuis le portail Purview : Solutions > DSPM. Ne pas confondre avec
"Data Security Posture Management (classic)" et "DSPM for AI (classic)", qui
restent accessibles en parallèle jusqu'au 30 septembre 2026. L'activation suit les
Setup Tasks proposées à la première connexion.

### 2. Configurer les politiques de collection IA

Deux politiques de collection sont disponibles en opt-in depuis les Setup Tasks.

La politique **"Capture interactions for Copilot experiences"** capture les prompts
et réponses de Copilot in Fabric et Security Copilot pour la conformité réglementaire
et la gestion du cycle de vie des données. Elle est gérée dans eDiscovery et Data
Lifecycle Management.

La politique **"Detect sensitive info shared with AI via network"** détecte les
informations sensibles partagées avec des applications IA via les navigateurs,
APIs et add-ins. Elle nécessite une intégration SASE ou SSE configurée dans
les paramètres DLP.

Ces politiques portent le préfixe "DSPM for AI" hérité de la version classique.
Leur gestion reste dans les solutions Purview correspondantes (Communication
Compliance, DLP) : le DSPM les centralise en lecture, il ne les remplace pas.

### 3. Travailler par objectif, pas par outil

C'est le changement opérationnel le plus important. Les versions classiques
invitaient l'administrateur à parcourir des tableaux de recommandations. Le nouveau
DSPM propose de choisir un objectif de sécurité parmi les suivants :

- Prevent data exposure in Microsoft 365 Copilot interactions
- Prevent oversharing of sensitive data
- Prevent exfiltration to risky destinations
- Discover sensitive data in the organization

Chaque objectif regroupe automatiquement les solutions Purview pertinentes (DLP,
IRM, Information Protection, eDiscovery) et propose un plan de remédiation priorisé
avec impact estimé. Les politiques peuvent être créées en un clic depuis ce contexte.

**Avertissement d'expert** : ne jamais activer une politique DLP ou IRM directement
en mode "enforce" depuis les recommandations DSPM sans tester sur un groupe pilote
au préalable. Le DSPM ne connaît pas les exceptions métier, les exemptions légales
ou les workflows particuliers. Toujours démarrer en audit mode, analyser les faux
positifs, puis étendre progressivement.

### 4. Connecter les sources tierces

Depuis Setup Tasks > "Extend your insights with data discovery" : connecter le
workspace Sentinel si ce n'est pas encore fait, configurer le Sentinel Data Lake,
puis activer les connecteurs partenaires disponibles dans le Sentinel Content Hub
(Varonis pour Salesforce, BigID pour Databricks, Cyera pour Snowflake, OneTrust pour
GCP). Les quatre partenaires passent désormais par la même architecture d'ingestion.

---

## AI Observability : focus sur la couche agents

### Agents "classic" vs agents avec Agent ID

L'AI Observability distingue deux types d'agents dans son inventaire.

Les agents sans Agent ID (créés avant l'activation de la plateforme Entra Agent ID,
ou via des app registrations standard) apparaissent dans la page "Apps and agents"
de la section Discover. Pour les 20 agents les plus récents, le DSPM affiche les
données sensibles accédées et la couverture des politiques Purview.

Les agents avec Agent ID (créés via Copilot Studio avec Entra Agent Identity activé,
Foundry, ou la plateforme Entra Agent ID) apparaissent dans la page AI Observability
dédiée. Pour chaque agent : niveau de risque insider (basé sur le comportement),
métriques de posture, activité sur 30 jours, couverture des politiques, identité
de l'owner, et actions recommandées.

Agent 365, désormais en GA depuis le 1er mai 2026, est spécifiquement couvert dans
AI Observability. L'inventaire de la page AI Observability inclut les agents Microsoft
Agent 365 depuis la release de la preview.

### Ce que l'AI Observability détecte concrètement

Les indicateurs de risque pour les agents incluent : accès à des données non
couvertes par une politique de protection, interactions avec des contenus non étiquetés,
patterns d'accès inhabituels, et correspondances avec des indicateurs de risque
Insider Risk Management spécifiques aux agents (IRM for Agents, GA depuis fin mai 2026).

---

## Cinq cas d'usage concrets

### Cas d'usage 1 : Préparation d'un déploiement Microsoft 365 Copilot

Le déploiement de Copilot dans une organisation qui n'a pas fait le ménage sur ses
permissions SharePoint amplifie mécaniquement l'exposition. Un site partagé trop
largement passait inaperçu pendant des années ; pointez Copilot dessus, et son contenu
peut apparaître instantanément dans une réponse de synthèse.

Le DSPM sert de gate de readiness. Étapes concrètes :

1. Lancer un Data Risk Assessment sur les 100 sites SharePoint les plus fréquentés.
2. Utiliser l'item-level scan (GA depuis mars 2026) pour identifier les fichiers
   spécifiques à risque, avec sensitivity label et lien de partage associé.
3. Remédiation directe depuis l'interface : appliquer un label, notifier l'owner
   du site, retirer le lien de partage anonyme.
4. Activer l'objectif "Prevent data exposure in Copilot interactions" pour un suivi
   continu post-déploiement.

C'est le cas d'usage le plus fréquent en PME et ETI françaises engagées dans un projet
Copilot. Le retour d'expérience terrain converge : sans phase de nettoyage préalable,
30 à 60 % des interactions Copilot des premiers jours remontent des contenus qui
n'auraient pas dû être accessibles.

### Cas d'usage 2 : Encadrement du Shadow AI

Un commercial colle une liste de prospects dans ChatGPT pour rédiger un mail. Un
développeur soumet un extrait de code propriétaire à Claude pour du debug. Un
consultant partage des données RH avec Gemini pour construire un tableau. C'est la
réalité quotidienne dans les organisations.

Le DSPM couvre ce cas via trois politiques préconfigurées via l'extension navigateur
Microsoft Purview Compliance :

- **Detect sensitive info shared in AI prompts in Edge** : politique de collection qui
  capture les prompts envoyés à ChatGPT, Copilot, DeepSeek, Gemini.
- **Detect when users visit AI sites** : politique IRM qui trace les visites navigateur
  vers des sites IA.
- **Detect sensitive info pasted or uploaded to AI sites** : politique endpoint DLP
  qui capture les copies-collers et uploads sur Edge, Chrome, Firefox.

Les trois politiques s'activent en mode audit par défaut. La bonne pratique consiste
à laisser tourner en audit pendant 30 à 60 jours, puis à publier une communication
interne appuyée sur des chiffres réels avant de basculer en enforcement. La liste
officielle de sites IA supportés par le DSPM couvre plus de 100 applications
génératives à date.

### Cas d'usage 3 : Gouvernance des agents Copilot Studio créés par les métiers

Copilot Studio permet à un utilisateur métier de créer un agent en quelques clics,
sans validation IT. Un agent RH peut accéder à des données financières, un agent
commercial peut lire les emails du dirigeant, un agent créé "pour tester" peut rester
actif six mois.

Le DSPM AI Observability inventorie ces agents et affiche pour chacun :

- Le niveau de risque insider (calculé par IRM for Agents)
- Les données sensibles auxquelles il a accédé sur 30 jours
- La couverture des politiques de protection
- L'identité de l'owner et son statut (encore présent dans l'organisation ?)

Un agent classé "High risk" doit déclencher une investigation croisée dans Entra
Agent ID pour vérifier ses permissions et son sponsor, puis une décision : suspension,
révocation des permissions, ou validation formelle par la DSI.

### Cas d'usage 4 : Investigation post-incident d'exfiltration

Un poste utilisateur détecté comme compromis, un départ suspect avec téléchargement
massif, une alerte d'exfiltration levée par IRM. Les proactive AI insights de DSI
(rollout juin 2026) simplifient l'investigation.

L'objectif "Prevent exfiltration to risky destinations" crée automatiquement une
investigation Data Security Investigations rafraîchie toutes les 24 heures, avec les
cinq catégories fixes de risque : propriété intellectuelle, données financières,
credentials, données personnelles, et données sanitaires. L'analyste n'a plus besoin
de reconstituer manuellement le périmètre : les documents concernés sont classés,
priorisés, et les liens vers le contexte utilisateur sont directement accessibles.

Combiné à Security Copilot dans le DSPM, le temps d'investigation moyen est réduit
significativement (Microsoft ne publie pas de chiffres précis à date, mais les retours
Microsoft Community Hub convergent sur des réductions de 40 à 60 % du temps de
triage).

### Cas d'usage 5 : Preuve de conformité RGPD et AI Act européen

L'AI Act européen impose depuis 2024 une transparence sur la gouvernance des données
utilisées par les systèmes IA. Le RGPD, lui, exige de démontrer les mesures techniques
et organisationnelles de protection des données personnelles. Le DSPM produit
directement les artefacts d'audit nécessaires :

- Le Purview Audit log enregistre toutes les activités d'accès aux données par les
  agents IA, exportable pour un audit externe.
- Les rapports DSPM (couverture des étiquettes, activité DLP, tendance de posture)
  constituent une preuve documentaire de la mise en œuvre des mesures.
- L'onglet "Guided assistance to AI regulations" dans les Recommendations connecte
  directement au Compliance Manager pour cartographier les contrôles Purview aux
  exigences réglementaires.

Pour une PME ou ETI qui subit un audit RGPD ou un contrôle CNIL, la capacité à
exporter en quelques clics l'inventaire des flux de données sensibles vers les IA
et les mesures de protection associées est un différenciant opérationnel majeur.

---

## Cas limites et comportements bords

**Les versions classiques restent accessibles jusqu'au 30 septembre 2026.** Le nouveau
DSPM coexiste avec DSPM (classic) et DSPM for AI (classic). Aucune politique existante
n'est modifiée par l'activation du nouveau DSPM. Les onboarding steps des versions
classiques sont automatiquement importées. La migration est additive, pas destructrice.
Passé fin septembre 2026, les administrateurs qui n'auraient pas basculé leurs runbooks
et documentation internes se retrouveront sans porte d'entrée classique.

**La limite d'item-level scanning dans les data risk assessments** reste fixée à
200 000 items par emplacement pour les évaluations personnalisées. Au-delà de
100 000 fichiers par emplacement, le décompte rapporté peut être inexact.
OneDrive n'est pas encore supporté pour le scan au niveau item. Le scanning
de sites SharePoint est plafonné à 10 sites pour l'item-level scan.

**L'Asset explorer ne couvre que Microsoft 365 dans l'onglet Standard.** Les
sources tierces (Salesforce, Snowflake, etc.) sont visibles dans Asset explorer,
mais uniquement via les signaux Sentinel partenaires. Les données Azure et Fabric
n'apparaissent pas encore dans l'onglet Standard de l'Asset explorer. Elles sont
accessibles via d'autres vues du DSPM.

**Les politiques "DSPM for AI" héritées conservent leur préfixe.** Une politique
créée depuis le nouveau DSPM via les Setup Tasks s'appellera toujours "DSPM for AI
- Detect sensitive info shared with AI via network". Ce n'est pas un bug : c'est
l'héritage des politiques de l'ancienne version, qui continuent de fonctionner
à l'identique.

**L'intégration Sentinel Data Lake est une dépendance non triviale pour les PME.**
Connecter les sources tierces nécessite un workspace Microsoft Sentinel actif avec
le Data Lake configuré. Pour les organisations qui n'utilisent pas Sentinel comme
SIEM, cela représente un prérequis de déploiement significatif, avec sa propre
courbe d'apprentissage et ses propres coûts de stockage et d'ingest.

**La facturation PAYG pour les signaux tiers peut surprendre.** Les connecteurs
partenaires (Varonis, BigID, Cyera, OneTrust) sont facturés via les compteurs de
consommation Sentinel. Le volume de métadonnées ingérées dépend de la taille du
patrimoine de données dans les plateformes tierces. Il est conseillé d'activer
le Usage Center dans Purview pour suivre la consommation avant et après l'activation
des connecteurs.

**Pause automatique pour tenants inactifs.** Une nouveauté à connaître : depuis
la GA, le traitement des données Microsoft 365 est mis en pause pour les tenants
inactifs plus de 60 jours dans la solution DSPM, et reprend automatiquement dès qu'un
administrateur y retourne. Pour une PME qui utiliserait le DSPM de façon ponctuelle,
cela peut se traduire par une latence de plusieurs heures à la reprise.

---

## Surveillance et opérations

### Tableau de bord Posture : l'indicateur de tendance 30 jours

La valeur la plus utile en opérations quotidiennes n'est pas le score absolu de
posture, mais sa tendance sur 30 jours. Un score qui baisse avec un volume de données
en croissance peut être normal. Un score qui baisse avec un volume stable indique une
dégradation réelle de la couverture ou une augmentation des comportements à risque.

### Alertes à configurer en priorité

Depuis les objectifs, la première politique à activer en audit mode est celle couvrant
le surpartage de données sensibles. C'est le risque le plus commun dans les tenants
Microsoft 365 et le plus directement actionnable : les Data Risk Assessments
identifient les sites SharePoint avec des permissions excessives, et la remédiation
peut être exécutée en masse (désactivation de liens Anyone) directement depuis le DSPM.

Pour les tenants ayant déployé des agents Copilot Studio, activer l'AI Observability
et surveiller le niveau de risque agent est la priorité suivante. Un agent classé
"High risk" dans AI Observability doit déclencher une investigation dans Entra Agent ID
pour vérifier ses permissions et son sponsor.

### Usage Center

Le Usage Center, disponible depuis le portail Purview, donne une vue de la
consommation de licences et de facturation PAYG pour l'ensemble des solutions
Purview actives. C'est l'outil de référence pour anticiper les coûts liés à
l'intégration des sources tierces avant d'activer les connecteurs Sentinel.

### Unified alert experience (preview)

Une nouvelle expérience unifiée combine le Triage Agent et le dashboard d'alertes
standard en une seule liste, avec preview des résumés d'agent, détails d'alerte et
utilisateur directement sur la liste. Les profils utilisateurs sont enrichis de signaux
Entra (localisation bureau, type d'employé, département, dernier jour travaillé). Cette
expérience reste en preview au 8 juillet 2026.

---

## Compte à rebours vers septembre 2026

Le 30 septembre 2026 marque la fin de vie des versions classiques. Concrètement :

**Ce qui doit être fait avant le 30 septembre :**

- Auditer les runbooks internes qui pointent encore vers DSPM classic ou DSPM for AI
  classic. Ils devront être réécrits pour cibler la nouvelle expérience.
- Vérifier que les rôles et permissions personnalisés fonctionnent correctement dans
  le nouveau DSPM (le mapping n'est pas toujours 1:1).
- Former les analystes SOC à la nouvelle logique orientée objectifs.
- Documenter les politiques "DSPM for AI" héritées, qui conservent leur préfixe.
- Valider que les Data Risk Assessments programmés continueront à s'exécuter sans
  interruption.

**Ce qui ne changera pas :**

- Les politiques existantes DLP, IRM, Information Protection restent identiques.
- Les configurations onboarding sont automatiquement importées.
- Aucun changement de licence n'est requis pour continuer à utiliser le DSPM (E5 ou
  E5 Compliance suffit).

---

## Roadmap et jalons connus

| Jalon | Date | Note |
|---|---|---|
| Preview mondiale du nouveau DSPM | Déc. 2025 à avr. 2026 | Rollout progressif, tenants E5 / E5 Compliance |
| GA du nouveau DSPM | Fin mai 2026 (fait) | MC1191257, rollout complété |
| GA AI Observability et IRM for Agents | Fin mai 2026 (fait) | M365 E7 ou Agent 365 requis |
| GA Agent 365 | 1er mai 2026 (fait) | 15 $/u/mois ou inclus dans M365 E7 |
| Item-level scanning SharePoint | Mars 2026 (fait) | MC1254556 |
| Proactive AI insights (DSI) | Rollout juin 2026 | Nécessite DSI + DSPM configurés |
| Data Security Posture Agent | GA prévue fin juillet 2026 | MC1318248, cible plusieurs fois repoussée |
| Retraite DSPM classic et DSPM for AI classic | 30 septembre 2026 | Migration à finaliser d'ici là |
| Sources tierces | Preview | Aucune date de GA annoncée |

---

## Synthèse

| Dimension | Situation au 8 juillet 2026 |
|---|---|
| État du nouveau DSPM | GA mondiale depuis fin mai 2026 |
| Licence d'accès | M365 E5 ou E5 Compliance |
| AI Observability et IRM for Agents | GA depuis fin mai 2026 (M365 E7 ou Agent 365) |
| Data Security Posture Agent | Preview, GA prévue fin juillet 2026 |
| Sources tierces | Preview, PAYG Sentinel |
| Item-level SharePoint | GA depuis mars 2026 |
| Versions classiques | Coexistent jusqu'au 30 septembre 2026 |
| Prérequis minimaux | Purview Audit + Analytics DLP + Analytics IRM |
| Setup temps réel | Non, compter environ 1 jour après activation |
| Limite item-level scan | 200 000 items par emplacement, 10 sites SharePoint max |
| Agents couverts en AI Observability | M365 Copilot, Copilot Studio, Foundry, Agent 365, tiers |
| Nouveau rôle | Data Security Investigation Contributor |
| Rétention traitement | Pause automatique après 60 jours d'inactivité tenant |

---

## Sources et références

- [Learn about the new version of DSPM, Microsoft Learn](https://learn.microsoft.com/en-us/purview/data-security-posture-management-learn-about), vérifié le 8 juillet 2026
- [What's new in Microsoft Purview, Microsoft Learn](https://learn.microsoft.com/en-us/purview/whats-new), vérifié le 8 juillet 2026
- [Prevent oversharing with data risk assessments, Microsoft Learn](https://learn.microsoft.com/en-us/purview/data-security-posture-management-oversharing), vérifié le 8 juillet 2026
- [Beyond Visibility: The new Purview DSPM experience, Microsoft Tech Community](https://techcommunity.microsoft.com/blog/microsoft-security-blog/beyond-visibility-the-new-microsoft-purview-data-security-posture-management-dsp/4470984), décembre 2025
- [Securing AI Agents End-to-End: Connecting Purview DSPM, Agent 365, and the AI Security Dashboard, Microsoft Tech Community](https://techcommunity.microsoft.com/blog/microsoft-security-blog/securing-ai-agents-end%E2%80%91to%E2%80%91end-connecting-purview-dspm-agent-365-and-the-ai-secur/4521155), mai 2026
- [MC1191257, GA du nouveau DSPM, Message Center Archive](https://mc.merill.net/message/MC1191257), mis à jour le 10 avril 2026
- [MC1254556, Item-level investigation and remediation SharePoint, Message Center Archive](https://mc.merill.net/message/MC1254556), mars 2026
- [MC1318248, Data Security Posture Agent GA, Message Center Archive](https://mc.merill.net/message/MC1318248), mai 2026
- [Microsoft Purview for Agents GA, M365 Admin](https://m365admin.handsontek.net/microsoft-purview-agents-ai-observability-insider-risk-management-now-generally-available/), avril 2026
- [Microsoft Agent 365 becomes GA, M365 Admin](https://m365admin.handsontek.net/microsoft-agent-365-becomes-generally-available-ga/), mai 2026
- [Data-and-Agent-Governance-and-Security-Accelerator, Microsoft GitHub](https://github.com/microsoft/Data-and-Agent-Governance-and-Security-Accelerator), mai 2026

**Points à re-vérifier avant publication :**

- Date effective de GA du Data Security Posture Agent : cible fin juillet 2026 selon
  MC1318248, à vérifier dans le Message Center avant publication car la cible a déjà
  été repoussée plusieurs fois.
- Nouveaux connecteurs partenaires pour sources tierces : à vérifier dans le Sentinel
  Content Hub, susceptibles d'évoluer.
- Support OneDrive pour l'item-level scan : non supporté à date, à vérifier si annoncé
  dans les release notes Purview.
- Éventuelles annonces Microsoft à Inspire 2026 (juillet) ou Ignite 2026 (novembre)
  concernant l'évolution du DSPM ou l'intégration avec Defender for AI.
