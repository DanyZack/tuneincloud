---
title: "Passkeys Entra sur Windows : GA fin avril 2026, activation silencieuse par défaut"
description: "Les passkeys Entra sur Windows passent en GA fin avril 2026. Fin de l'opt-in explicite côté admin : si votre profil passkey autorise les credentials device-bound non attestés, vos utilisateurs peuvent s'enregistrer sans que vous ayez configuré quoi que ce soit."
pubDate: 2026-04-22
category: "actualites"
subcategory: "breves"
heroImage: "https://cyberhoot.com/wp-content/uploads/2025/11/Microsoft-Integrating-Passkeys-1000x700.png"
---
Les passkeys Entra sur Windows passent en General Availability fin avril 2026. Le vrai changement n'est pas tant la fonctionnalité, disponible en Public Preview depuis mars, que la disparition de l'opt-in explicite côté administrateur.

![Banniere](/images/banarticle/breve-entra2.png)

## Ce qui change concrètement

Pendant la Public Preview, activer les passkeys Entra sur Windows demandait une configuration explicite : créer un profil passkey (FIDO2), y ajouter les trois AAGUIDs Windows Hello en allow list (Hardware, VBS Hardware, Software), désactiver l'enforcement de l'attestation et assigner le profil à des groupes. Rien ne se passait sans cette étape.

En GA, ce prérequis disparaît. Si votre profil passkey autorise les credentials **device-bound, non attestés**, les utilisateurs scopés peuvent enregistrer et utiliser des passkeys Entra sur leurs machines Windows **sans aucune action supplémentaire de l'administrateur**. Le credential est stocké localement dans le conteneur Windows Hello et s'utilise avec les méthodes Windows Hello habituelles (biométrie ou PIN).

Le rollout GA commence fin avril 2026 pour les tenants commerciaux. Pour les environnements souverains (GCC, GCC High, DoD), le déploiement démarre début juillet et se termine fin juillet 2026.

## Pourquoi c'est utile

Les passkeys Entra sur Windows comblent un manque persistant : l'authentification passwordless résistante au phishing sur des appareils **non-Entra-joined ou non-registered**. Typiquement, les PC personnels des utilisateurs externes, les postes partagés, les environnements BYOD sans MDM. Jusqu'ici, ces scénarios retombaient mécaniquement sur le mot de passe.

Chaque appareil Windows stocke son propre passkey pour chaque compte Entra. Les passkeys ne se synchronisent pas entre appareils. Un utilisateur avec plusieurs comptes Entra sur la même machine peut enregistrer un passkey distinct pour chaque compte.

**Prérequis** : méthode Passkey (FIDO2) activée dans la policy Authentication Methods, profil passkey autorisant les device-bound non attestés. Windows Hello doit être actif sur la machine (a minima un PIN configuré). Si un credential Windows Hello for Business existe déjà pour le même compte sur la même machine, l'enregistrement du passkey est bloqué.

## Points d'attention

- ⚠️ **Posture par défaut inversée** : en Public Preview, ne rien faire = pas de passkey possible. En GA, ne rien faire = vos utilisateurs peuvent enregistrer des passkeys Entra sur n'importe quel PC Windows dès qu'un profil autorise les device-bound non attestés. Si ce comportement ne correspond pas à votre posture de sécurité, il faut **ajouter explicitement les AAGUIDs Windows Hello en block list** dans les profils concernés.
- ⚠️ **Ce n'est pas un remplacement de Windows Hello for Business**. WHfB reste la solution recommandée pour les appareils managés, Entra-joined ou registered. Les passkeys Entra sur Windows complètent WHfB sur les scénarios non managés. Ne supportent pas le sign-in device.
- 💡 Pour bloquer : profil passkey (FIDO2) → block list → ajouter les trois AAGUIDs Windows Hello (Hardware : `08987058-cadc-4b81-b6e1-30de50dcbe96`, VBS Hardware : `9ddd1817-af5a-4672-a2b9-3e3dd95000a9`, Software : `6028b017-b1d4-4c02-b4b3-afcdafc96bb2`).
- L'attestation n'est pas supportée pour les passkeys Entra sur Windows, même en GA. Prévu pour une mise à jour ultérieure. Sans attestation, un attaquant qui compromet un poste peut potentiellement enregistrer un passkey en falsifiant son AAGUID. À prendre en compte dans votre modèle de menace avant de généraliser.

## Source
[MC1282568 — General Availability: Microsoft Entra passkeys on Windows](https://mc.merill.net/message/MC1282568)  
[Microsoft Learn — Enable Microsoft Entra passkey on Windows devices](https://learn.microsoft.com/en-us/entra/identity/authentication/how-to-authentication-entra-passkeys-on-windows)