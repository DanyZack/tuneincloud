---
title: "Modes de jonctions des appareils dans Azure AD"
description: "Comprendre les différents mode de jonction des appreils Windows avec Microsoft Intune."
pubDate: 2023-02-27
category: "guides"
subcategory: "intune"
coverImage: "titre-windows2-1.png"
---

Il existe 3 modes de jonctions d'appareils dans Azure AD pour les postes de travail **Windows 10/11** :

- Azure AD registered

- Hybrid Azure AD joined

- Azure AD Joined

/!\\ _Concernant les autres systèmes d'exploitation (Android, iOS, macOS, Linux, ...) : les appareils remontent systématiquement en "Azure AD registered", et ce peu importe le mode de gestion_.

Ces 3 modes de jonction Azure AD représentent un maillon essentiel dans la mise en place des Accès conditionnels qui pourront se baser sur ces informations afin de contrôler l'accès aux données de l'entreprise.

## I - Description des modes de jonction

### A- Hybrid Azure AD Joined

Les appareils en mode "Hybrid Azure AD Joined" appartiennent à l'entreprise et sont connectés avec un compte de services de domaine Active Directory appartenant à cette organisation. L'objet "appareil" existe alors dans un AD on-premise et dans Azure AD.

/!\\ La liaison entre l'objet on-premise et l'object cloud ne doit pas être rompu sous risque de passer l'appareil en mode "Azure AD Registered"

![](/images/old/hybridaad.png)

**Périphériques Windows d'entreprise**

Pour les organisations hybrides ayant une infrastructure avec au moins un Active Directory local. **Comptes utilisateurs professionnels** uniquement.

Systèmes d'exploitation clients éligibles : Windows 8.1 et ultérieur

********Types de gestion des appareils possibles :********

![](/images/old/mini-gpo-2.png)

![](/images/old/mini-sccm-1.png)

![](/images/old/mini-intune-1.png)

![](/images/old/mini-cogestion-1.png)

<!--more-->

* * *

### B- Azure AD Joined

Les appareils en mode "Azure Joined" sont des appareils d'entreprise inscrits uniquement en mode cloud (uniquement dans Azure AD). Ces appareils sont généralement inscrits via un scénario Microsoft Intune.

![](/images/old/aadjoined.png)

**Périphériques Windows d'entreprise**

Obligatoire pour les organisations utilisant uniquement le cloud mais pouvant également s'intégrer dans des environnements hybrides. **Comptes utilisateurs professionnels** uniquement.

Systèmes d'exploitation clients éligibles : Windows 10 et ultérieur

******Types de gestion des appareils possibles :******

![](/images/old/mini-sccm-1.png)

![](/images/old/mini-intune-1.png)

![](/images/old/mini-cogestion-1.png)

* * *

### C-Azure AD Registered

Les appareils en mode "Azure AD Registered" sont généralement des appareils personnels qui ont opéré une connexion avec un compte Microsoft d'entreprise afin d'accéder à des ressources professionnelles.

![](/images/old/aadregistered.png)

**Périphériques Personnels**

Pour les organisations souhaitant donner accès aux ressources d'entreprise sur des appareils personnels (gérés ou non). Mais également pour l'ensemble des périphériques MDM non Windows. **Comptes utilisateurs professionnels** **ou personnels**.

Systèmes d'exploitation clients éligibles : Windows 10 et ultérieur, iOS, Android, macOS, Ubuntu

**Types de gestion des appareils possibles :**

![](/images/old/mini-intune-1.png)

![](/images/old/mini-no.png)

* * *

## II - Chemins et gestion des appareils

### A- Hybrid Azure AD Joined

Il existe deux façons d'inscrire des appareils Windows en mode "Hybrid Azure AD joined" :

- La jonction d'un poste existant dans un environnement local (AD) par un administrateur via un serveur AD Connect ou un serveur ADFS.

- L'inscription d'un poste depuis le cloud (via Autopilot) puis sa jonction automatique dans le domaine local via stratégie de configurations.

![](/images/old/chemin-hybride.png)

* * *

### B- Azure AD Joined

Il existe trois façons d'inscrire des appareils Windows en mode "Azure AD Joined" :

- L'inscription d'un poste depuis le cloud (via Autopilot) en mode "full cloud" et donc intégration automatique dans AAD uniquement

- L'inscription par l'utilisateur final en mode BYOD via l'ajout de compte "professionnel ou scolaire"

- L'inscription en bloc des appareils via la configuration d'un package d'approvisionnement

![](/images/old/chemin-aadjoined-1.png)

* * *

### C-Azure AD Registered

Les périphériques en Azure AD Registered représentent l'ensemble des périphériques renseigné dans Azure AD (parfois uniquement à des fins de logs) qui ne sont pas répertoriés dans les scénarios précédents. Il existe donc un tas de façon de voir apparaître des appareils en "Azure AD Registered" sur l'Azure Active Directory. Cependant, les méthodes de jonctions les plus répandues sont les suivantes :

- Ensemble des périphériques MDM (non Windows) : Android, iOS, iPadOS, macOS, Linux, ... Qu'ils soient inscrits en mode BYOD ou inscrits en mode professionnel.

- Périphériques non gérés, n'ayant effectué aucune action d'inscription (même BYOD), mais accédant à des applications/ressources d'entreprise

- Les périphériques ayant effectué une inscription BYOD via l'application **"Portail d'Entreprise Intune"**

![](/images/old/chemin-aadregistered.png)

* * *

## III - Accès conditionnels

L'intérêt premier de connaître les différents modes de jonctions et les autorités de gestion des appareils de son organisation concerne la mise en place des accès conditionnels. Le type de périphériques à partir duquel les utilisateurs accèdent aux ressources d'entreprise est un élément essentiel dans la mise en place de ces stratégies.

Il faut dans un premier temps se poser quatre questions concernant le filtrage des accès dépendamment des périphériques sources :

1. **Quel système d'exploitation (Plateforme d'appareils) ?** Entre les différentes plateformes pouvant accéder aux ressources Azure : Android / iOS / Windows / Mac OS / Linux

3. **Quel mode de jonction Azure AD ?** Comme présenté ci-dessus, nous pouvons déjà conclure :
    - Hybride Azure AD : Ces périphériques sont forcément des appareils d'entreprise. Reste à déterminer si la conformité peut être gérée par Intune pour aller plus loin.
    
    - Azure AD joined : Ces périphériques sont forcément des appareils d'entreprise. Reste à déterminer si la conformité peut être gérée par Intune pour aller plus loin.
    
    - **Azure AD registered :** Ce mode de jonction ne permet pas de conclure quoi que ce soit sur les périphériques

5. **Ai-je la volonté de filtrer de manière encore plus précise mes périphériques ?** Si la plateforme de l'appareil et le type de jonction ne suffisent pas à séparer de manière logique le parc d'appareil de l'organisation, il est possible d'ajouter des filtres permettant de créer des règles spécifiques à certains appareils. _Par exemple : Nom du profil d'enrôlement, Propriété Entreprise ou Personnelle, Valeur d'un ExtensionAttribute, ..._

7. **Quel est l'autorité de gestion de mes appareils ?** Si mes appareils sont gérés par Intune (directement ou en cogestion), alors j'ai la possibilité d'augmenter l'efficacité des accès conditionnels. Au lieu de valider les accès aux ressources d'entreprise en fonction du type de jonction, j'ai la possibilité de valider ces accès en fonction de la conformité des appareils. La conformité des appareils étant évaluée en temps réel, en fonction des stratégies créées, les périphériques sont considérés comme étant de confiance.

_La mise en place de critères de conformité des périphériques et la mise en place d'accès conditionnels feront l'objet d'autres articles sur le blog._
