---
title: "Configurer l’enrôlement automatique avec Apple Business Manager (ADE)"
description: "Comprendre l'enrôlement automatique Apple avec ABM"
pubDate: 2023-03-17
category: "guides"
subcategory: "intune"
coverImage: "titre-apple-3.png"
---

L'utilisation de l'Apple Business Manager permet de mettre en place un scénario d'enrôlement automatique ADE au déballage de l'appareil. À l'instar de Autopilot pour les périphériques Windows, ABM permet aux appareils Apple achetés par l'entreprise d'être pré affecté à un profil d'enrôlement Intune.

Il s'agit de l'unique point d'entrée (avec Apple Configurator) pour l'inscription des périphériques en mode professionnel. Le scénario ADE permettra à l'appareil de se démarrer pour la première fois directement sur sa cinématique d'enrôlement professionnel sans aucune manipulation de l'utilisateur ou d'un administrateur.

<figure>

![](/images/old/enroll-auto-abm.png)

<figcaption>

Processus d'enrôlement automatique via Apple Business Manager

</figcaption>

</figure>

<!--more-->

## I - Inscription à Apple Business Manager

Avant de commencer, il est nécessaire de procéder à la création du portail Apple Business Manager (ABM) pour son entreprise. Cette opération doit être effectuée par un membre de l'organisation via le lien suivant : [https://business.apple.com/#/enrollment/form](https://business.apple.com/#/enrollment/form)

Il suffit de suivre les étapes et d'attendre la confirmation d'Apple (cette confirmation peut prendre plusieurs jours). Parmi les informations demandées, il est nécessaire _de fournir le **numéro D-U-N-S** de l'entreprise qui est un numéro universel permettant d'identifier les entreprises dans le monde. Il est donc nécessaire de se rapprocher de son service administratif/juridique avant de procéder à cette inscription._

## II - Configuration de l'enrôlement automatique

### Prérequis :

Les périphériques sur lesquels un scénario d’enrôlement automatique est souhaité doivent impérativement être présents sur la console ABM. Pour ce faire, il existe deux façons :

1. Appareils ajoutés automatiquement par le revendeur - Solution à privilégier. En indiquant sur la console ABM vos différents revendeurs, ces derniers ont la possibilité d'ajouter de manière automatique les périphériques achetés sur l'Apple Business Manager. Aucune action d’administrateur n'est requise et aucun surcoût n'est à prévoir.

3. Appareils ajoutés manuellement via Apple Configurator - Solution de contournement. Si certains appareils n'ont pas pu être intégrés de manière automatique, il est possible de servir d'un périphérique macOS d'administration qui servira d'interface entre la console ABM et les autres périphériques Apple à y intégrer. Pour plus d'informations sur cette méthode d'intégration : se rendre sur l'article ["Configurer l'ajout d'appareils professionnels avec Apple Configurator"](https://tuneincloud.fr/2023/03/17/configurer-lajout-dappareils-professionnels-avec-apple-configurator/).

### A. Ajouter son serveur MDM (Intune) dans ABM

À la différence des méthodes d'enrôlement automatiques Android, l'affectation des profils aux périphériques ne s'effectuera pas sur l'Apple Business Manager, mais directement dans Microsoft Intune. La configuration ABM consiste en l'ajout d'un connecteur au serveur MDM Intune afin de remonter la liste des appareils dans la console Microsoft. Une fois ce connecteur configuré, les appareils remonteront directement dans le jeton présent sur Intune.

Afin de configurer l'assignation du serveur MDM sur ABM, il suffit de :

## Étapes de configuration

### 1. Initialiser le jeton d'inscription dans Intune

Se connecter à la console **[Microsoft Intune](https://endpoint.microsoft.com/)** et se rendre dans la partie "Inscription iOS/iPadOS". Cliquer sur le bouton **"Jetons du programme d'inscription"**, puis sur **"+ Ajouter"**.

![Bouton Jetons du programme d'inscription dans Intune](/images/old/capture-decran-2023-03-20-104604.png)

Cocher la case **"J'accepte"** sous *"J'autorise Microsoft à envoyer des informations sur l'utilisateur et sur l'appareil à Apple."*

Cliquer sur le lien **"Télécharger votre clé publique"** pour récupérer le certificat au format PEM, nécessaire à la création du serveur MDM dans ABM.

---

### 2. Se connecter à Apple Business Manager

Se connecter à la console **[Apple Business Manager](https://business.apple.com/)** avec un compte disposant du rôle **Administrateur**.

---

### 3. Accéder aux préférences

Dans le coin inférieur gauche, cliquer sur son nom d'administrateur puis sur le bouton **"Préférences"**.

![Accès aux préférences dans Apple Business Manager](/images/old/capture-decran-2023-03-20-103533.png)

---

### 4. Ajouter le serveur MDM Intune

À côté de **Vos serveurs MDM**, cliquer sur le bouton **"+ Ajouter"**.

Renseigner un **nom** pour le serveur MDM (par exemple : "Microsoft Intune"). Dans la partie **Réglages du serveur MDM**, importer la clé publique Intune au format PEM précédemment téléchargée.

![Configuration du serveur MDM dans Apple Business Manager](/images/old/capture-decran-2023-03-20-105050.png)

Confirmer en cliquant sur le bouton **"Enregistrer"**.

---

### 5. Télécharger le jeton ABM

Le serveur MDM est maintenant ajouté à la liste dans Apple Business Manager. Se rendre dans le serveur MDM créé et récupérer le jeton ABM en cliquant sur **"Télécharger le jeton"**.

![Bouton de téléchargement du jeton ABM](/images/old/capture-decran-2023-03-20-105329.png)

*Un jeton au format P7M se télécharge sur l'appareil.*

---

### 6. Finaliser la liaison dans Intune

Revenir sur la console **[Microsoft Intune](https://endpoint.microsoft.com/)** sur la création du jeton d'inscription laissée en suspens depuis l'étape 1.

Renseigner l'**identifiant Apple** de l'administrateur ABM, puis charger le **jeton Apple** au format P7M dans le champ *"Chargez votre jeton. Intune va automatiquement synchroniser les appareils à partir de votre compte Apple Business Manager ou Apple School Manager attribué au serveur MDM associé à ce jeton."*

Cliquer sur **"Suivant"**, puis valider la création du jeton en cliquant sur **"Créer"**.

La liaison entre Apple Business Manager et Microsoft Intune est maintenant finalisée.

### B. Affecter des profils d'inscription aux périphériques Apple via ADE

Une fois le connecteur ABM <-> Intune configuré, l'ensemble des périphériques présents dans l'Apple Business Manager redescendent automatiquement dans le jeton du programme d'inscription présent dans la console Intune.

Il faudra tout de même bien vérifier dans ABM que les périphériques sont **affectés au bon serveur MDM.**

