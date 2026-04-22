---
title: "Inscription iOS/iPadOS"
date: 2023-03-16
categories: 
  - "inscription-ios-ipados"
  - "ios-ipados"
coverImage: "titre-apple-2.png"
---

Microsoft Intune propose la possibilité de gérer les appareils fonctionnant sous iOS et iPadOS via des scénarios d'enrôlement Apple. Les scénarios qui seront présentés ci-après sont des modes développés par Apple sur lesquels Microsoft Intune fera office d'autorité de gestion. Il est donc important de comprendre que les possibilités de gestions de ces appareils peuvent impliquer à la fois Microsoft & Apple.

## I - Présentation des méthodes d'enrôlement

![](images/enrollios-2.png)

### A. Périphériques d'Entreprise

Côté Apple, il n'existe qu'un seul mode de périphérique d'entreprise, parfois appelé COD (Corporate Owned Device) et d'autre fois appelé "mode supervisé". Quoi qu'il en soit, pas possible de se tromper quand on parle de périphérique inscrit avec scénario professionnel sur iOS ou iPadOS. Contrairement à Android qui propose un mode COPE, l'inscription pro Apple s'apparenterait plus à un mode COBO. Il est également possible de configurer des périphériques en kiosque côté Apple mais pas de mode COSU non plus. La mise en place d'un kiosque se fait post enrôlement via des stratégies de configuration.

<!--more-->

La chose très importante à savoir sur l'inscription d'entreprise Apple, est qu'il est impossible de la faire aboutir sans passer par un service Apple. Microsoft Intune ne propose pas la possibilité de créer de manière autonome via QR Code des profils d'inscription comme pour Android.

Version minimum d'iOS requis : 14.0

_**Enrôlement professionnel :** Le périphérique doit impérativement être **neuf ou réinitialisé** afin d'avoir accès à ce scénario d'enrôlement._

Il existe deux scénarios d'inscription des périphériques professionnels via services Apple :

1. **Inscription automatique ADE.** Solution à privilégier. Comme pour tous les autres scénarios d'enrôlement automatique (Autopilot, KME, ZTE), l'inscription ADE se prépare avec son revendeur d'équipement qui ajoute à l'achat les périphériques Apple dans le portail **Apple Business Manager** (ABM) de l'entreprise. Un connecteur avec le serveur MDM Intune doit y être configuré pour que les appareils puissent arriver en "provisionnement" sur Intune. L'affectation du profil se fera directement dans Intune. _Voir article sur l'inscription automatique ADE pour plus d'informations._

3. **Inscription via Apple Configurator.** Solution à la marge pour les périphériques absents de l'ABM. Cette méthode permet d'utiliser un mac d'administration sur lequel on installe l'application Apple Configurator. Il est ensuite possible de brancher des périphériques en USB et de soit : les ajouter dans l'ABM et repartir sur le scénario 1, soit : exporter la configuration Intune et de lancer l'enrôlement de l'appareil directement depuis Apple Configurator. _Voir article sur l'inscription Apple Configurator pour plus d'informations._

### B. Périphériques Personnels

**BYOD "Inscription de l'appareil" :** Appareils inscrits par un utilisateur via connexion à l'application Portail d'Entreprise. Même s'il s'agit d'un scénario d'inscription BYOD l'appareil est considéré comme appartenant à l'entreprise. Attention du coup à la généralisation de ce mode d'inscription sur des périphériques appartenant aux utilisateurs, car cette inscription est plus intrusive qu'une inscription BYOD classique.

**GESTION DES Données :**

![](images/ko-2.png)

**Informations / Actions non accessibles par l'informatique**

- Afficher l’historique de navigation sur l’appareil

- Voir les emails, documents, contacts ou calendriers personnels

- Accéder aux mots de passe

- Voir, modifier ou supprimer les photos

- Voir l’emplacement du périphérique

![](images/okv2.png)

**Informations / Actions accessibles par l'informatique**

- Voir le modèle, le numéro de série et le système d’exploitation

- Identifier l’appareil par son nom

- Réinitialiser **complètement le périphérique**

- Voir les informations collectées par les applications et réseaux d’entreprise

- **Inventaire des applications installées sur l’appareil**

- **Voir le numéro de téléphone**

**Retour d’expérience :** Ce scénario fonctionne correctement, mais est souvent considéré comme trop intrusif pour du BYOD. Il est très intéressant cependant pour rattraper des périphériques achetés par l'entreprise, mais lâchés dans la nature sans solution de gestion. La réinitialisation n'étant pas nécessaire, il est souvent plus simple de passer par le portail d'entreprise dans un premier temps avant de profiter d'un plan de renouvellement des postes pour lancer le vrai scénario d'enrôlement professionnel.

* * *

**BYOD "Inscription de l'utilisateur" :** Appareils inscrits par un utilisateur via connexion à l'application Portail d'Entreprise. Appartenant à l'utilisateur. Ce scénario ne propose pas deux conteneurs pro/perso comme sur Android, mais permet aux utilisateurs d'avoir une gestion des données **professionnelles et personnelles** au sein des applications compatibles. Il est par exemple possible d'avoir des Notes personnelles et des Notes professionnelles. Lors de la désinscription BYOD, seules les données professionnelles sont supprimées de l'application.

Pour fonctionner, ce scénario nécessite la gestion d'un "Apple ID géré". Ces ID Apple se gèrent à partir de l'Apple Business Manager.

Pour généraliser ce **scénario, il est donc très important de fédérer les identités Apple ID gérées et les identités Azure AD.** En ajoutant l'application Apple Businness Manager dans la liste des applications fédérées dans Azure.

Dans ce mode d'enrôlement, seules les **applications VPP** peuvent être installées (pas d'applications de l'Apple Store géré).

**GESTION DES Données :**

![](images/ko-2.png)

Informations / Actions non accessibles par l'informatique

- Afficher l’historique de navigation sur l’appareil

- Voir les emails, documents, contacts ou calendriers personnels

- Accéder aux mots de passe

- Voir, modifier ou supprimer les photos

- Voir l’emplacement du périphérique

- Supprimer les données personnelles (photos, **applications …)**

![](images/okv2.png)

Informations / Actions accessibles par l'informatique

- Voir le modèle, le numéro de série et le système d’exploitation

- Identifier l’appareil par son nom

- Afficher les applications gérées par l’entreprise

- Voir les informations collectées par les applications et réseaux d’entreprise

**Retour d’expérience :** Ce scénario prometteur est celui qui est le plus adapté à un vrai scénario BYOD pour des périphériques personnels sur le papier. Cependant, certains problèmes connus peuvent rendre le déploiement de ce mode d'enrôlement compliqué. (Par exemple, des bugs de licences VPP peuvent rendre l'utilisation de certaines applications impossible même après réinitialisation de l'appareil). Il est donc conseillé de renforcer la recette technique sur ce type de périphérique. Statut début 2023 : Un nouveau mode d'enrôlement (nommé Account Driven User Enrollment) corrigeant ses problèmes est en phase de développement et de test. Sujet à surveiller.

* * *

**Non-inscrits :** "Appareils non gérés" - Types d'appareils souvent oubliés par les administrateurs, il s'agit des appareils n'ayant effectué aucune opération d'inscription, mais accèdent aux ressources d'entreprise. Ces périphériques ne remontent pas dans la console Intune, cependant la sécurisation de ces appareils doit être prise en compte. Par exemple par la mise en place de stratégies de protection d'applications (MAM) ou la mise en place de règles d'Accès conditionnels. _Il serait contre-productif de sécuriser les scénarios d'inscription d'entreprise en laissant les périphériques non gérés avoir un accès libre aux applications/services d'entreprise._

_Ces appareils ne sont donc pas considérés comme des appareils BYOD auprès d'Intune._

* * *

## II - Création des profils d'enrôlement

### Prérequis :

Afin de pouvoir accéder aux profils d'enrôlement Apple, il est nécessaire de lier Intune à Apple via le certificat Push MDM. Pour ce faire :

* * *

### A. Profils d'enrôlement ADE

L'inscription ADE propose deux expériences utilisateurs différentes : l'inscription via Portail d'Entreprise et l'inscription via Assistant Apple :

**Enrôlement Portail Entreprise**

L’enrôlement s’effectue en 2 étapes :  
1\. Configuration du périphérique via l’assistant Apple  
2\. Configuration de l’affinité utilisateur via le portail d’entreprise

_Entre les deux étapes, le périphérique se bloque en attendant l’installation de l’application Portail d’Entreprise. Une fois le téléchargement et l’installation terminés, l’application se lance automatiquement afin de passer à la deuxième étape de l’enrôlement._

Ce scénario force la connexion à l’application Portail d’Entreprise, indispensable pour gérer complétement le périphérique. Cependant, cette phase de blocage peut paraitre déroutante pour l’utilisateur final qui devra être accompagner par des canaux de communication durant la phase d’enrôlement.

**Enrôlement via Assistant Apple**

L’enrôlement s’effectue en une seule étape via l’assistant de configuration Apple.

_Attention, dans le cadre d’un enrôlement sécurisé via authentification forte, ce scénario n’est envisageable que pour les périphériques iOS/iPadOS version 13.0 et ultérieur._

Ce scénario, plus naturel pour l’utilisateur final ne bloque pas l’utilisateur jusqu’à l’utilisation du Portail d’Entreprise. L’application s’installera tout de même en arrière plan.

_Cependant, tant que l’utilisateur final n’a pas opéré de connexion au Portail d’Entreprise, le périphérique sera dans un état d’enrôlement inachevé :_

- _La conformité ne pourra pas être contrôlé_

- _Les applications d’entreprise ne pourront pas être utilisées_

- _L’appareil sera considéré comme périphérique non PE pour les accès conditionnels_

Ce scénario doit donc s'accompagner d'une communication utilisateur afin de s'assurer que la connexion au Portail Entreprise est effectuée.

Création d'un profil ADE :

* * *

### B. Enrôlements BYOD

Comme évoqué ci-dessus, il existe deux modes d'enrôlement BYOD. Par défaut, les deux modes sont activés et c'est au choix de l'utilisateur lors du processus d'enrôlement d'intégrer son appareil dans un mode d'inscription, appareil ou inscription utilisateur.

Il est cependant possible de fixer la valeur du mode d'enrôlement BYOD souhaité :

- Sur **Intune**, dans la partie **Inscription iOS/iPadOS**

- Cliquez sur le bouton **"Types d'inscription"**  
    ![](images/capture-decran-2023-03-30-095651.png)

- Cliquez sur **"+ Créer un profil"** et définir un nom de profil

- Choisir le type d'inscription souhaité (utilisateur ou appareil)  
    ![](images/capture-decran-2023-03-30-095843.png)

- Valider la configuration du profil en l'affectant aux utilisateurs souhaités

Comme évoqué ci-dessus, l'enrôlement BYOD ne se fait pas via l'administrateur, mais via action utilisateur :

## Articles associés

[![](images/liens-abm.png)](https://tuneincloud.fr/2023/03/17/configurer-lenrolement-automatique-avec-apple-business-manager-ade/)

Lien vers Article **"Configurer l’enrôlement automatique avec Apple Business Manager (ADE)"**

[![](images/liens-appleconfigurator.png)](https://tuneincloud.fr/2023/03/17/configurer-lajout-dappareils-professionnels-avec-apple-configurator/)

Lien vers Article **"Configurer l'ajout d'appareils professionnels avec Apple Configurator"** - _en cours de rédaction_
