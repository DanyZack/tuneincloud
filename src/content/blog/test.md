---
title: "Entra Backup and Recovery : Microsoft intègre nativement la sauvegarde du tenant"
description: "En Public Preview, Entra propose des snapshots quotidiens avec 5 jours de rétention."
pubDate: 2026-04-14
category: "actualites"
subcategory: "breves"
---

Microsoft intègre enfin nativement la sauvegarde des objets Entra ID.
La fonctionnalité est disponible en **Public Preview** depuis l'Entra admin center.

## Ce que ça change concrètement

Récupérer un objet Entra supprimé par erreur imposait jusqu'ici de fouiller
la corbeille (30 jours, limitée) ou d'utiliser un outil tiers.

**Entra Backup and Recovery** génère automatiquement un **snapshot quotidien
de votre tenant** avec une rétention de **5 jours**. Depuis l'Entra admin
center, vous pouvez naviguer dans ces snapshots et déclencher une restauration
ciblée sur les utilisateurs, groupes, applications et Conditional Access policies.

## Points d'attention

- 5 jours de rétention uniquement — pas un remplacement d'une stratégie longue durée
- Restauration ciblée par objet, pas un rollback global du tenant
- Fonctionnalité en preview : ne pas en faire un composant critique avant la GA
- Prérequis minimum : **Microsoft Entra ID P1**

## Source

[Microsoft Entra — What's new](https://learn.microsoft.com/fr-fr/entra/fundamentals/whats-new)