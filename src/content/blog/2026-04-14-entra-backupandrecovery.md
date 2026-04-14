---
title: "Entra Backup and Recovery : Microsoft intègre nativement la sauvegarde du tenant"
description: "En Public Preview, Entra propose des snapshots quotidiens de votre tenant avec 5 jours de rétention — restauration d'objets et de Conditional Access policies incluse."
pubDate: 2026-04-14
category: "actualites"
subcategory: "breves"
---
Microsoft intègre enfin nativement ce que les solutions tierces faisaient depuis des années : sauvegarder et restaurer les objets Entra ID. La fonctionnalité est disponible en **Public Preview** depuis l'Entra admin center.

## Ce que ça change concrètement

Jusqu'ici, récupérer un objet Entra supprimé par erreur — un groupe, un compte de service, une Conditional Access policy mal configurée — imposait soit de fouiller la corbeille (30 jours, mais limitée en types d'objets), soit de s'appuyer sur un outil tiers comme **EntraExporter**, **AzureAD Backup**, ou autre.

**Entra Backup and Recovery** change la donne : Microsoft génère automatiquement un **snapshot quotidien de votre tenant** avec une rétention de **5 jours**. Depuis l'Entra admin center, vous pouvez naviguer dans ces snapshots, comparer l'état d'un objet entre deux dates, et déclencher une restauration ciblée.

Les objets concernés incluent — selon la documentation en preview — les utilisateurs, les groupes, les applications, et les Conditional Access policies. C'est précisément sur ce dernier point que la valeur est la plus immédiate : une CA policy mal publiée en production peut verrouiller des accès en quelques minutes. Avoir un point de restauration daté de la veille, accessible en quelques clics, n'est pas un luxe.

**État** : Public Preview — comportement et périmètre d'objets susceptibles d'évoluer avant GA.  
**Prérequis de licence** : à confirmer selon votre tenant au moment de l'activation ; la documentation preview mentionne **Microsoft Entra ID P1** comme niveau minimum, avec certaines fonctionnalités réservées à **P2**.

## Points d'attention

- ⚠️ 5 jours de rétention, c'est court. Pour les environnements soumis à des exigences de conformité ou d'audit, ce n'est pas un remplacement d'une stratégie de backup longue durée — c'est un filet de sécurité opérationnel.
- 💡 La restauration est **ciblée par objet**, pas un rollback global du tenant. Pensez-y comme un "undo" granulaire, pas comme un snapshot VM.
- La fonctionnalité est en preview : ne pas en faire un composant critique de votre plan de continuité avant la GA.

## Source
[Microsoft Entra — What's new in Microsoft Entra](https://learn.microsoft.com/fr-fr/entra/fundamentals/whats-new)