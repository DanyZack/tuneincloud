---
title: "Windows Autopilot : Créer un profil d'enrôlement jonction Azure AD (Full Cloud)"
description: "Guide d'enrôlement Windows Autopilot Full Cloud"
pubDate: 2023-03-29
category: "guides"
subcategory: "intune"
coverImage: "titre-windows-autopilotfullcloud-1.png"
---

Windows Autopilot est un service permettant l'inscription d'appareils Windows sur Microsoft Intune. Même s'il existe différentes façons d'inscrire ses appareils dans Intune (voir article : [Inscription Windows](https://tuneincloud.fr/2023/03/20/inscription-windows/)) est LE service à privilégier pour faire de l'enrôlement moderne.

Windows Autopilot permet de maîtriser l'inscription, la réinitialisation et la réinscription des appareils sans nécessiter de disposer d'une quelconque infrastructure.

## I- Vue d'ensemble

Windows Autopilot simplifie l'inscription des appareils dans Intune.

### A. Ancien Monde

Historiquement, dans une entreprise, les postes de travail étaient déployés par la mise en place d'un master. La création de ce Master consiste à acheter un périphérique à un revendeur, supprimer le système existant afin d'y installer une nouvelle image système "masterisée" comprenant des configurations d'entreprise. La création et la maintenance d'images de système d'exploitation personnalisées sont des processus qui prennent du temps. De plus, ce modèle met en évidence deux limitations importantes :

- Peu évolutif : Afin de mettre à niveau son master, il était souvent nécessaire de modifier entièrement voir d'en créer un nouveau. Ce qui pouvait générer de fortes différences de configurations dans le temps.

- Les configurations poussées par le master ne sont pas managées : étant donné que l'outil de gestion n'intervient qu'après la mastérisation, toutes les configurations mises en place durant la séquence de tâches ne sont pas "managées" nativement par l'outil. L'outil de gestion apportera une configuration supplémentaire au socle technique instauré par le master.

Schématisation des actions **techniques pour un enrôlement historique via création d'une image : "Master Windows"**

![](/images/old/enroll-old.png)

<!--more-->

* * *

### B. Inscription Moderne

Avec Microsoft Intune et Autopilot, il est possible d'envoyer les nouveaux appareils directement à vos utilisateurs finaux sans avoir à créer, gérer et appliquer des images de système d'exploitation personnalisées aux appareils. Lorsque l'on utilise Intune pour gérer les appareils Autopilot, on se sert du système d'exploitation installé par le revendeur afin de lui appliquer directement des stratégies depuis le cloud. Cette méthode permet de simplifier de manière drastique l'inscription des appareils et de permettre d'avoir un contrôle total sur les configurations déployées (même celles qui seront poussées durant le processus d'enrôlement). De ce fait, la relation avec votre revendeur constituera un élément central dans la mise en place de cette solution afin de :

- Récupérer les ID Autopilot des appareils afin de pouvoir préaffecter les configurations souhaitées (provisioning)

- Échanger sur le système Windows installé par défaut sur les appareils qui sera désormais conservé.

Schématisation des actions ****techniques pour un enrôlement moderne via Windows Autopilot****

![](/images/old/enroll-modern.png)

Dans le détail, les actions à mettre en œuvre dans le cadre d'un déploiement avec Windows Autopilot sont les suivantes :

1. Achat de périphérique Windows auprès d'un revendeur partenaire ([liste des partenaires Microsoft sur la partie Autopilot](https://www.microsoft.com/fr-fr/microsoft-365/windows/windows-autopilot))

3. Intégration à la commande des Autopilot ID dans la console Intune. _Par le revendeur directement ou par l'administrateur > Faisable avant la réception des postes._

5. Déploiement du poste automatique lors du premier déballage :
    - Par l'utilisateur directement = User-Driven
    
    - Par un technicien = Préprevisioning _(anciennement White Glove)_

7. Connexion directe à la première session Windows sur poste géré

_Possibilité de récupérer les ID Autopilot de postes existants, manuellement, via script ou scénario d'enrôlement automatique si les postes sont déjà connectés au domaine. Et ainsi reprendre le processus ci-dessus à l'étape 2._

![](/images/old/autopilot.png)

### C. Personnalisation de l'expérience utilisateur

Après avoir affecté un profil Autopilot à un poste, entre le premier démarrage et la connexion à la première session : une cinématique d'inscription, Autopilot se lance alors. Il est possible de personnaliser les différentes étapes suivantes :

![](/images/old/provisioning1.png)

![](/images/old/provisioning2.png)

![](/images/old/provisioning3.png)

_La personnalisation de l'expérience utilisateur lors d'un enrôlement Autopilot fera l'objet d'un article prochain centré sur l'ESP (Windows Autopilot Enrollment Status Page)._

* * *

## II- Les Scénarios Autopilot possibles

![](/images/old/autopilot-scenario-a.png)

Le poste est acheté puis envoyé directement à l'utilisateur final sans passer par l'IT.  
L'utilisateur déballe son poste, se connecte à internet et se retrouve avec une expérience Autopilot à la première ouverture.  
L'utilisateur doit uniquement renseigner son compte utilisateur (qui peut être prérenseigné) et son mot de passe. Une fois la connexion effectuée, la cinématique Autopilot se lance alors. L'utilisateur n'a plus qu'à entendre sagement la fin du processus pour se connecter à sa première session.

**Prérequis :  
**Windows 10 1809 minimum  
Windows 11 (toutes versions)  
Connexion internet

**Pourquoi choisir ce mode ?  
**Il s'agit du mode d'enrôlement à privilégier dans la plupart des cas. Car il offre une grande simplicité dans sa mise en place et dans la gestion du cycle de vie du poste. De plus, il réduit à quasiment zéro les actions des techniciens informatiques. Cependant, en laissant la charge complète à l'utilisateur pour lancer son enrôlement, le temps de déployé en entièrement assumé par ce dernier.  
Il est également important que malgré des dépendances à des infrastructures on-premise, ce mode d'enrôlement doit tout de même être priorisé. Les comptes utilisateurs seront eux bien hybrides, et dans la plupart des cas cela suffit pour accéder à des ressources locales. Le poste de travail n'a pas besoin d'être renseigné comme un objet dans l'AD on-premise.

* * *

![](/images/old/autopilot-scenario-b.png)

Le poste est acheté puis envoyé directement à l'utilisateur final sans passer par l'IT.  
L'utilisateur déballe son poste, se connecte à internet et se retrouve avec une expérience Autopilot à la première ouverture.  
L'utilisateur doit uniquement renseigner son compte utilisateur (qui peut être prérenseigné) et son mot de passe. Une fois la connexion effectuée, la cinématique Autopilot se lance alors. L'utilisateur n'a plus qu'à entendre sagement la fin du processus pour se connecter à sa première session.

**Prérequis :  
**Windows 10 1809 minimum  
Windows 11 (toutes versions)  
Connexion internet  
Infra AD accessible  
Configuration de la jonction au domaine  
Mise en place du connecteur Intune pour l'AD

Pourquoi choisir ce mode ?  
Il s'agit du mode d'enrôlement à mettre en place s'il n'est pas possible de gérer de manière conforme aux exigences de l'entreprise avec un scénario "full cloud". L'objet ordinateur existera donc dans l'Azure AD et dans l'AD on-premise, ce qui augmentera naturellement le maintien en condition opérationnelle du parc. Quant au processus d'inscription Autopilot par l'utilisateur, il est très similaire au mode de jonction AAD uniquement présenté ci-dessus.  
Il est donc nécessaire de mettre en place ce mode d'enrôlement s’il subsiste certaines dépendances à des infrastructures on-premise qui le nécessitent réellement. Faute de quoi, le mode A sera à prioriser.

* * *

![](/images/old/autopilot-scenario-c.png)

Le poste est récupéré par un technicien, qui n'a besoin de renseigner aucun identifiant. Le technicien clique sur suivant sur la page Autopilot et attend la fin de l'installation. Le périphérique opère sa jonction Azure AD automatiquement et pousse une configuration "kiosque" ou "appareil partagé".

**Prérequis :  
**Windows 10 1809 minimum  
Windows 11 (toutes versions)  
Connexion internet  
TPM 2.0

Pourquoi choisir ce mode ?  
Ce mode d'inscription est à appliquer aux périphériques sans affectation utilisateur. Pour tous les périphériques en kiosque (dédiés à des usages très spécifiques), libre-service, partagés, etc. Le système d'exploitation y sera limité à son minimum afin de sécuriser et de ne fournir les seuls usages autorisés. Il est également possible de limiter l'utilisation de ces appareils à une unique application sur laquelle il sera impossible pour les utilisateurs de sortir.

/!\\ Ne pouvait pas être soumis à licence EM+S car aucun utilisateur principal ne sera affecté à ces périphériques. Il sera nécessaire de souscrire à des licence Intune for device only en mode déclaratif afin de respecter les termes de licences Microsoft.

* * *

![](/images/old/autopilot-scenario-d.png)

À la différence des modes A & B, il est également possible de "pré provisionner" le poste avant de l'envoyer à l'utilisateur final. Cette opération consiste à effectuer toute la phase de configuration (avant connexion à la première session) par des équipes techniques et non par l'utilisateur.  
Il est donc envisageable de faire ce préprovisionnement par des équipes IT internes, par un partenaire, voir même directement par le fournisseur d'équipements.  
Ce mode d'enrôlement est possible en mode full cloud et en mode hybride.  
_Ce mode était auparavant appelé "White Glove"._

**Prérequis :  
**Windows 10 1903 minimum  
Windows 11 (toutes versions)  
Connexion internet filaire uniquement  
Connexion Wi-Fi non supportée  
TPM 2.0  
VM non supportée

**Pourquoi choisir ce mode ?  
**L'objectif étant de faire assurer la phase de préparation qui peut parfois s'avérer assez longue (dépendant surtout de la taille des applications affectées et de la connexion internet) par des équipes techniques et réduire au minimum le temps d'attente pour l'utilisateur final.  
Ce scénario génère donc du temps de support technique afin de le faire gagner à l'utilisateur final.

* * *

![](/images/old/autopilot-scenario-e.png)

L'intérêt premier de Windows Autopilot demeure dans l'inscription des nouveaux périphériques. Cependant, dans certains cas, il peut être très intéressant de récupérer les périphériques existants et les intégrer à Autopilot. Le service étant tout aussi utile pour l'inscription que pour la réinscription des appareils. Quoi qu'il en soit, il existe plusieurs façons de récupérer les informations Autopilot pour les périphériques existants, ces derniers pourront profiter d'un scénario d'enrôlement moderne lors de leur prochaine réinitialisation.

**Prérequis :  
**Windows 10 1903 minimum  
**Pour la partie avec Séquence de tâche :  
**Windows 11 importé dans ConfigMgr  
Windows ADK  
Microsoft Configuration Manager Current Branch

**Pourquoi choisir ce mode ?  
**Très simplement : Pour les périphériques existants que l'on souhaite réinitialiser et réinscrire via Autopilot. Pour cela, il y a deux grandes façons de faire :  
**1.** Récupérer automatique l'ID Autopilot > Réinitialiser le périphérique > Lancer un des 4 modes d'enrôlement présentés ci-dessus  
**2.** Configurer les profils Autopilot en mode JSON > Les intégrer dans un package Configuration Manager > Redéployé le poste avec une séquence de tâche qui initiera une inscription Autopilot en fin de séquence _(enrôlement pas complètement moderne, car les éléments configurés dans la séquence de tâche ne sont pas managés nativement par Intune)_.

* * *

## III- Préparation des déploiements

Comme expliqué ci-dessus, l'inscription moderne avec Autopilot permet de réduire de façon considérable les actions techniques des administrateurs. Dans cette partie vous trouverez les actions de MCO à réaliser au quotidien pour le déploiement d'un nouveau périphérique avec Autopilot en fonction des différents modes.

### A. User-Driven jonction Azure AD

![](/images/old/configconsole.png)

1. **Intégrer les appareil dans Autopilot :** Action à réaliser par le revendeur d'équipement en priorité (manuellement si impossible).

3. **Affecter le profil Autopilot :** Affecter une balise de groupe à un appareil Autopilot (Action administrateur). Bonus : Possibilité de préaffecter l'utilisateur principal.

5. **Envoyer le poste à l'utilisateur final**

* * *

### B. User-Driven jonction Hybride Azure AD

1. **Intégrer les appareil dans Autopilot :** Action à réaliser par le revendeur d'équipement en priorité (manuellement si impossible).

3. **Affecter le profil Autopilot :** Affecter une balise de groupe à un appareil Autopilot (Action administrateur). Bonus : Possibilité de préaffecter l'utilisateur principal.

5. **Envoyer le poste à l'utilisateur final**

![](/images/old/configconsole.png)

* * *

### C. Auto déploiement sans utilisateur

![](/images/old/configconsole.png)

1. **Intégrer les appareil dans Autopilot :** Action à réaliser par le revendeur d'équipement en priorité (manuellement si impossible).

3. **Affecter le profil Autopilot :** Affecter une balise de groupe à un appareil Autopilot (Action administrateur).

5. **Lancement du déploiement automatique par un technicien.**

* * *

### D. Pré-provisioning

1. **Intégrer les appareil dans Autopilot :** Action à réaliser par le revendeur d'équipement en priorité (manuellement si impossible).

3. **Affecter le profil Autopilot :** Affecter une balise de groupe à un appareil Autopilot (Action administrateur). Bonus : Possibilité de préaffecter l'utilisateur principal.

5. **Récupération du poste par un technicien, un partenaire ou directement chez le revendeur.**

7. **Lancement de la phase de pré-provisonnement en atelier.**

9. **Envoyer le poste à l'utilisateur final**

![](/images/old/configconsole.png)

* * *

_**Vous trouverez les guides pour la configuration des profils d'enrôlement Windows Autopilot dans leurs articles dédiés (ci-dessous).**_

* * *