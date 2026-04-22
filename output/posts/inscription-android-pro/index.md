---
title: "Inscription Android Entreprise"
date: 2023-02-01
categories: 
  - "android"
  - "inscription-android"
coverImage: "titre-android4.png"
---

Microsoft Intune propose la possibilité de gérer les appareils fonctionnant sous Android via des scénarios d'enrôlement Android Entreprise. Les scénarios qui seront présentés ci-après sont des modes développés par Android sur lesquelles Microsoft Intune fera office d'autorité de gestion. Il est donc important de comprendre que les possibilités de gestions de ces appareils peuvent impliquer à la fois Microsoft & Google.

_Cet article ne traitera pas des périphériques en mode "**Administrateur des appareils Android**" étant donné que Google réduit et ne supporte plus la prise en charge de cette gestion en France._ Plus d'informations [ici](https://developers.google.com/android/work/device-admin-deprecation?hl=fr)

## I - Présentation des méthodes d'enrôlement

![](images/enrollandroid.png)

### A. Périphériques d'Entreprise

**COBO :** "Complètement Managé" - Appareils **affectés à un utilisateur**, appartenant à l'entreprise (COD) et fournissant un seul environnement de travail complètement géré par Intune.

<!--more-->

![](images/cobo.png)

COBO = **C**orporate **O**wned **B**usiness **O**nly

Ce scénario est à privilégier pour les périphériques d'utilisateurs "standards" destinés uniquement à un usage professionnel.

Version Minimum Android requis : 6.0

_**Enrôlement professionnel :** Le périphérique doit impérativement être **neuf ou réinitialisé** afin d'avoir accès à ce scénario d'enrôlement._

Les appareils enrôlés en mode COBO ont donc la possibilité d'être plus restrictifs que les autres types d'appareils. Laissant à l'administration un contrôlé total sur la façon dont ils sont utilisés. De ce fait, la sécurisation des données y est renforcée et simplifiée. L'ensemble des usages sont retranscris dans les données de rapport.

Les utilisateurs ne risquent pas de mélanger des données personnelles avec des données professionnelles car l'ensemble des données de l'appareil sont considérées comme des données d'entreprise.

Cette sécurisation renforcée des données implique cependant un manque de flexibilité sur les usages ce qui peut générer de la frustration. Les utilisateurs utiliseront très certainement un appareil personnel non géré pour compenser ce manque de flexibilité et la prise en compte des tentatives de connexions via des appareils non gérés peut être accrue.

* * *

**COPE :** "Appareil professionnel avec un espace personnel" - Appareils **affectés à un utilisateur**, appartenant à l'entreprise (COD) et fournissant deux environnements : un espace professionnel et un espace personnel.

![](images/cope.png)

COPE = **C**orporate **O**wned **P**ersonally **E**nabled

Ce scénario est à privilégier pour les périphériques d'utilisateurs "standards" pour lesquels l'entreprise autorise un usage personnel du téléphone d'entreprise tout en protégeant les données professionnelles dans un conteneur chiffré totalement séparé.

Version Minimum Android requis : 8.0 (Il est cependant conseillé de ne pas déployer le COPE en dessous de la version 10, car l'expérience utilisateur est fortement dégradée sur les versions antérieures)

_**Enrôlement professionnel :** Le périphérique doit impérativement être **neuf ou réinitialisé** afin d'avoir accès à ce scénario d'enrôlement._

Les appareils COPE, bien que moins restreints que les appareils COBO, sont des appareils d'entreprise qui fournissent aux administrateurs une autorité de contrôlé quasi complète. Cependant, il s'agit d'un appareil sur lequel l'administration a accepté de fermer les yeux sur les usages personnels des utilisateurs afin de respecter la confidentialité des utilisateurs.

Les données d'entreprise sont tant qu'à elles complétement gérées et l'ensemble du périphérique se verra respecter les exigences de sécurité souhaitée.

En laissant cette liberté aux utilisateurs, il est possible de réduire le risque de Shadow IT voir même l'usage de périphérique non gérés essayant d'accéder aux ressources d'entreprise.

Cependant, la mise en place d'un mode COPE doit généralement s'accompagner de communication utilisateur afin de bien comprendre les différences de gestion entre les données professionnelles et les données personnelles. De plus, les rapports des appareils sont moins complets que pour le mode COBO car l'ensemble des usages personnels ne remontent pas.

Enfin, la mise en place d'un EDR mobile peut être complexifié sur des appareils en mode COPE et nécessitent souvent une intervention manuelle pour sécuriser l'espace personnel.

* * *

**COSU :** "Appareil Kiosque ou Libre Service" - Pas de propriétaire, appartenant à l'entreprise (COD) et fournissant un usage unique du périphérique.

![](images/cosu.png)

COSU = **C**orporate **O**wned **S**ingle **U**se

Réinitialisation Obligatoire

Inscription sans connexion utilisateur : Scan QR uniquement _(attention à la durée du jeton)_

_**Enrôlement professionnel :** Le périphérique doit impérativement être **neuf ou réinitialisé** afin d'avoir accès à ce scénario d'enrôlement._

Les appareil inscrits en mode COSU fournit un environnement kiosque à usage spécifique. Le kiosque peut être soit en mono application : dans ce cas là, l'utilisation du périphérique est restreint à l'application choisie qui est affichée en plein écran et l'utilisateur ne peut pas la quitter. Soit en multi application : dans ce cas là, une page d'accueil "kiosqué" s'affiche avec l'ensemble des applications souhaitées, cependant cette écran d'accueil est entièrement épurée des applications système Android et seules les applications métiers choisies par l'administrateur apparaissent.

De plus, il existe 2 modes d'inscription COSU :

- **Appareil dédié par défaut :** Dans ce mode d'inscription, l'environnement kiosque présenté ci-dessus s'affiche automatiquement au démarrage de l'appareil.

- **Appareil dédié avec mode partagé Azure AD :** Dans ce mode d'inscription, avant de lancer le mode kiosque il est demandé de se connecter à l'appareil avec un compte Azure Active Directory. Ce qui permet à l'utilisateur opérant la connexion d'avoir une expérience utilisateur personnalisée sur les applications présentes sur le kiosque. Il s'agit d'un scénario à privilégier pour les appareils partagés entre plusieurs utilisateurs, pour des employés de premières ligne par exemple. A la fin de son utilisation, l'utilisateur se déconnecte et un autre peut se connecter à son tour. De plus, si les applications utilisées possèdent la **bibliothèque d'authentification Microsoft (MSAL)** alors il est possible de gérer la suppression des données de navigation entre les différentes sessions. Attention du coup pour les applications sans MSAL qui verront certainement leurs données conservées entre les différentes sessions.

* * *

### **B.** ****Périphériques Personnels****

**BYOD :** "Appareils personnels inscrits" - Appareils **inscrits par un utilisateur**, appartenant à l'utilisateur et fournissant deux environnements : un espace professionnel et un espace personnel.

![](images/byod.png)

BYOD = **B**ring **Y**our **O**wn **D**evice

Réinitialisation non nécessaire

Inscription via installation de l'application "Portail d'Entreprise Intune"

_**Périphérique personnel :** L'inscription en mode BYOD se fait durant le cycle de vie de l'appareil au choix de l'utilisateur._

Le BYOD permet, via l'accord de l'utilisateur, de fournir un conteneur professionnel géré sur un appareil personnel qui lui n'est pas géré. Cette opération permet à son organisation d'avoir une certaine confiance en l'appareil avant de lui autoriser l'accès aux applications d'entreprise. Le périphérique remonte alors dans la console Intune et l'administrateur a la possibilité de gérer la conformité de l'appareil et de gérer l'espace professionnel en y chiffrant l'ensemble des données d'entreprise installées. Ce qui permettra par la suite de pouvoir supprimer si besoin le conteneur professionnel sans pour autant impacter l'espace personnel de l'utilisateur.

Ce scénario est souvent utilisé pour rattraper un parc d'appareils d'entreprise existant qui n'était pas géré à la base car il s'agit du seul mode d'enrôlement ne nécessitant pas de réinitialisation de l'appareil. Cependant, même si cette méthode est potentiellement viable dans un scénario de transition, la gestion des appareils d'entreprise en mode BYOD n'est pas un scénario à maintenir sur le long terme. Par définition, l'appareil sera considéré comme personnel et l'utilisateur aura toujours la possibilité de reprendre la main sur le périphérique.

L'expérience utilisateur BYOD est fortement similaire au mode COPE. Dans le mode COPE, il s'agit d'un appareil d'entreprise sur lequel l'entreprise à laisser la possibilité à l'utilisateur d'avoir son espace personnel. Dans le mode BYOD, c'est un appareil personnel sur lequel l'utilisateur a autorisé son entreprise à y gérer une partie professionnelle.

Le mode BYOD est donc un scénario d'inscription très flexible et simple d'intégration. Il permet aux utilisateurs d'être productifs très rapidement.

Cependant, étant donné que seul un conteneur pro est géré, la sécurisation de ces appareils ne peut pas être aussi poussée que pour les périphériques d'entreprise. Que ce soit sur les règles de renforcement de l'appareil ou sur les sujets de confidentialité/extraction des données d'entreprise qui sont un véritable sujet sur ce type d'appareil. _Même si des stratégies de configurations et de protection d'applications peuvent être poussées._

Pas de maitrise des modèles d'appareil : même s'il est possible d'autoriser le BYOD qu'à partir d'une certaine version d'Android, la diversité des constructeurs d'équipements Android et les différents OS personnalisés par ces derniers peuvent générer des problèmes d'utilisations.

* * *

**Non-inscrits :** "Appareils non gérés" - Types d'appareils souvent oubliés par les administrateurs, il s'agit des appareils n'ayant effectué aucune opération d'inscription, mais qui accèdent aux ressources d'entreprise. Ces périphériques ne remontent pas dans la console Intune, cependant la sécurisation de ces appareils doit être prise en compte. Par exemple par la mise en place de stratégies de protection d'applications (MAM) ou la mise en place de règles d'Accès conditionnels. _Il serait contre-productif de sécuriser les scénarios d'inscription d'entreprise en laissant les périphériques non gérés avoir un accès libre aux applications/services d'entreprise._

_Ces appareils ne sont donc pas considérés comme des appareils BYOD auprès d'Intune._

* * *

## II - Création des profils d'enrôlement

### Prérequis :

Afin de pouvoir accéder aux profils d'enrôlement Android, il est nécessaire de lier un compte Google Play géré à Intune. Pour ce faire :

### _A. Profils d'enrôlement COBO_

![](images/notes.png)

_**Mise à jour début Avril 2023 :**  
Auparavant non intégré dans Intune, il est désormais possible de créer des profils d'inscription COBO au même titre que l'enrôlement COPE et COSU. La classification automatique des périphériques à l'enrôlement devient donc désormais possible pour l'ensemble des scénarios d'enrôlement professionnel Android Entreprise_

![](images/screen1.png)

### _B. Profils d'enrôlement COPE_

_Il est donc possible de créer plusieurs profils d'enrôlement COPE (à l'inverse du mode COBO) ce qui peut être intéressant afin de se servir du nom de profil d'enrôlement afin de catégoriser automatiquement les périphériques à l'enrôlement (Scope Tag)._

![](images/screen1-1.png)

### _C. Profils d'enrôlement COSU_

_Les profils COSU étant par définition des comptes sans utilisateurs affectés, le moyen le plus répandu de pousser une configuration sur ce mode est de créer un **groupe dynamique AAD** récupérant le nom du profil créé. Cela permettra d'affecter automatiquement la configuration à l'ensemble des périphériques enrôlés. Il s'agit de l'un des rares cas où l'affectation par groupe d'appareils est exigée. Il sera donc nécessaire de créer un profil d'enrôlement pour chaque configuration technique souhaitée. **Attention** tout de même, toute modification du nom du profil d'enrôlement aura un impact direct sur l'affectation des stratégies._

![](images/screen3.png)

### _D. Enrôlement BYOD_

Comme évoqué ci-dessus, l'enrôlement BYOD ne se fait pas via l'administrateur mais via action utilisateur :

## Articles associés

[![](images/liens-kme.png)](https://intunefrance.wordpress.com/2023/03/08/configurer-lenrolement-automatique-avec-samsung-knox/)

Lien vers Article **"Configurer l'enrôlement automatique avec Samsung Knox"**

[![](images/lien-zte.png)](https://intunefrance.wordpress.com/2023/03/08/configurer-lenrolement-automatique-avec-android-zero-touch/)

Lien vers Article **"Configurer l'enrôlement automatique avec Android Zero Touch"**
