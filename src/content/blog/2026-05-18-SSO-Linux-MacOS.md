---
title: "SSO macOS et Linux dans Intune : Une vraie avancée sur les deux systèmes"
description: "Avril et mai 2026 marquent un alignement net du SSO macOS et Linux sur ce qu'Intune propose côté Windows. Platform SSO pendant Setup Assistant en GA pour macOS, PRMFA disponible sur Linux via le Microsoft Identity Broker. Le multi-OS managé devient une vraie possibilité, plus une promesse."
pubDate: 2026-05-19
category: "actualites"
subcategory: "breves"
heroImage: "https://www.ordunix.net/wp-content/uploads/2025/06/linux_security_vs_macos_and_windows_locks_data_thinkstock-100748607-orig.webp"
---
Pendant des années, gérer un parc multi-OS dans Intune relevait du compromis : Windows aux petits soins, macOS en mode best effort, Linux quasi inexistant. Les annonces d'avril et mai 2026 changent un peu la donne. Deux évolutions parallèles, côté macOS et côté Linux, rapprochent significativement l'expérience SSO de celle disponible sur Windows. Synthèse de ce qui bouge réellement.

![Banniere](/images/banarticle/breve-intune3.png)

## Côté macOS : Platform SSO pendant Setup Assistant en GA

Platform SSO existe depuis 2024. Le problème qui plombait son adoption en entreprise tient en une phrase : l'enregistrement Platform SSO se déclenchait **après** Setup Assistant, sur le desktop, via une notification que les utilisateurs ignoraient régulièrement. Résultat, des Mac flaggés non-conformes, des authentifications applicatives qui échouent, des tickets helpdesk pour quelque chose qui aurait dû être automatique.

Microsoft a corrigé le tir. Le paramètre **"Enable Registration During Setup"** passe en GA pour les appareils macOS enrôlés via Automated Device Enrollment (ADE). Avec ce paramètre et l'Intune Company Portal 5.2604.0 ou supérieur, l'utilisateur se connecte avec son compte Microsoft Entra **pendant Setup Assistant**, l'enregistrement de l'appareil se finalise avant d'atteindre le desktop, et l'accès aux ressources de travail est immédiat.

Trois éléments doivent être configurés ensemble et assignés aux mêmes groupes statiques d'utilisateurs :

1. Une policy Settings Catalog Platform SSO avec "Enable Registration During Setup" activé
2. L'Intune Company Portal (version 5.2604.0 ou supérieure) déployé comme application LOB
3. Un profil d'enrôlement ADE configuré avec Setup Assistant in modern authentication et **Await final configuration = Yes**

Le bénéfice pratique pour les organisations en migration depuis JAMF ou Workspace ONE est tangible : les Mac arrivent enrôlés, conformes, et SSO-ready sans intervention utilisateur.

## Côté Linux : le Microsoft Identity Broker ouvre enfin la voie au PRMFA

Côté Linux, c'est le Microsoft Identity Broker qui orchestre toute la chaîne d'authentification. Selon la documentation Microsoft officielle, le SSO Linux permet désormais aux utilisateurs des postes Linux de :

- **Enregistrer leurs appareils** auprès de Microsoft Entra ID et de s'enrôler dans la gestion Intune
- **Bénéficier du SSO** pour les applications natives et web (Azure CLI, Microsoft Edge, Teams PWA) avec accès aux ressources Microsoft 365 et Azure
- **Étendre le SSO aux applications tierces** via MSAL pour .NET et MSAL pour Python, ce qui permet d'intégrer le SSO dans des applications custom
- **Appliquer des policies Conditional Access** protégeant les applications web via Microsoft Edge
- **Activer les policies de conformité standard d'Intune** ainsi que le support de scripts Bash pour des policies de conformité personnalisées

Le changement majeur depuis avril 2026 tient au support de la **MFA résistante au phishing (PRMFA)**. À partir de la version 2.0.2 du `microsoft-identity-broker`, trois méthodes d'authentification PRMFA sont supportées sur Linux :

- **Carte à puce** physique
- **Authentification basée sur certificat (CBA)**, implémentée via TLS/SSL avec une infrastructure PKI émettant les certificats utilisateur
- **Tokens USB contenant un applet PIV/SmartCard** (typiquement YubiKey)

L'expérience utilisateur s'aligne donc enfin sur ce qui est disponible côté Windows et macOS depuis plusieurs années.

### Distributions et limitations

Les systèmes d'exploitation officiellement supportés par le SSO Microsoft pour Linux sont précisément :

- **Ubuntu Desktop 24.04 LTS** et **Ubuntu Desktop 22.04 LTS**
- **Red Hat Enterprise Linux 8 LTS** et **Red Hat Enterprise Linux 9 LTS**

À noter : l'intégration **SmartCard** est, à date, supportée sur un périmètre encore plus restreint :

- Ubuntu Desktop 24.04 LTS
- Ubuntu Desktop 22.04 LTS
- Red Hat Enterprise Linux 10 LTS

Autrement dit, si vous voulez du PRMFA via SmartCard sur RHEL 8 ou 9, ce n'est pas couvert officiellement à ce stade. Pour RHEL 10, Microsoft documente des prérequis spécifiques (clé GPG distincte RSA-4096, dépôt EPEL pour `webkitgtk6.0`).

### Installation et désinstallation

L'installation passe par les dépôts Microsoft (`packages.microsoft.com`) ajoutés au gestionnaire de paquets natif (`apt` pour Ubuntu, `dnf` pour RHEL). Un simple `sudo apt install microsoft-identity-broker` ou `sudo dnf install microsoft-identity-broker` après ajout du dépôt suffit, suivi d'un reboot.

À partir de la version 2.5.x du broker, un nouvel utilitaire `dsreg` est inclus pour gérer l'enregistrement de l'appareil avec Microsoft Entra ID. Il permet notamment de désenregistrer un appareil (`sudo dsreg --tenant-id <tenant-guid> --unregister`) ou de nettoyer complètement l'état du broker, certificats et matériel cryptographique inclus (`sudo dsreg --cleanup`).

## Points d'attention

- ⚠️ **macOS : trois conditions cumulatives**. La GA de Platform SSO pendant Setup Assistant n'est utilisable que si Company Portal 5.2604.0+, la policy Settings Catalog et le profil ADE avec Await final configuration sont configurés ensemble. Une seule pièce manquante, et l'enregistrement retombe sur le comportement legacy post-setup.
- ⚠️ **Linux : compliance FIPS pas encore là**. La version 2.0.1 et les versions antérieures du `microsoft-identity-broker` ne supportent pas la compliance FIPS. Pour les organisations soumises à des exigences réglementaires fortes (administration, défense, santé sous obligations FIPS), c'est une limitation à intégrer dans le plan de déploiement.
- ⚠️ **Linux : la désinstallation ne désenrôle pas l'appareil**. Retirer le package `microsoft-identity-broker` ne désenregistre pas automatiquement l'appareil de Microsoft Entra ID, ni ne le désenrôle de la gestion Intune. Pour un nettoyage complet, il faut utiliser `dsreg` (ou `dsregcmd`) ou retirer l'appareil depuis le portail Entra ID.
- ⚠️ **Linux : SmartCard limité à 3 distributions**. Si votre cible PRMFA inclut RHEL 8 ou 9, vous devrez vous rabattre sur l'authentification par certificat (CBA) plutôt que sur la carte à puce. Penser à ce sujet en amont pour ne pas se retrouver bloqué côté déploiement.
- 💡 **Cas d'usage immédiat**. Avec Conditional Access disponible sur les applications web via Microsoft Edge sur Linux, vous pouvez désormais imposer des policies device-based à vos développeurs sous Linux (compliance Intune, MFA, etc.) au même titre qu'à vos collaborateurs sous Windows ou macOS.

## Pour aller plus loin

L'alignement n'est pas encore total. **Platform SSO sur Linux**, au sens où il existe sur macOS, n'est pas formellement disponible aujourd'hui. La documentation actuelle parle d'enregistrement Entra ID, d'enrôlement Intune, de PRMFA et de SSO via Microsoft Edge ou MSAL, mais ne mentionne pas encore un équivalent strict du Platform SSO d'Apple. **Côté macOS**, l'intégration du protocole **Apple ACME (Automated Certificate Management Environment)** pour la device attestation reste sur la feuille de route, sans date confirmée.

Pour les organisations qui repoussaient depuis trois ans le passage de leur parc Linux ou macOS sous Intune en attendant la maturité, cette maturité est suffisamment avancée pour relancer le sujet de manière sérieuse.

## Source
[Microsoft Tech Community - New Platform SSO with registration during Automated Device Enrollment on macOS](https://techcommunity.microsoft.com/blog/intunecustomersuccess/new-platform-sso-with-registration-during-automated-device-enrollment-on-macos/4519846)  
[Microsoft Learn - What is Microsoft single sign-on for Linux?](https://learn.microsoft.com/en-us/entra/identity/devices/sso-linux)  
[Microsoft Learn - What's new in Microsoft single sign-on for Linux](https://learn.microsoft.com/en-us/entra/identity/devices/whats-new-linux)  
[Microsoft Tech Community - What's new in Microsoft Intune – April](https://techcommunity.microsoft.com/blog/microsoftintuneblog/what%E2%80%99s-new-in-microsoft-intune-%E2%80%93-april/4493135)