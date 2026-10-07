---
title: "Intune : baseline de sécurité Windows 11 26H2 disponible"
description: "Depuis le 6 octobre 2026, Intune propose la baseline de sécurité Windows 11 26H2. Deux changements réels, un réglage absent, et une mise à niveau manuelle."
pubDate: 2026-10-08
category: "actualites"
subcategory: "breves"
heroImage: "/images/hero/2026-10-07-intune-baseline-windows-11-26h2.webp"
---
Depuis le 6 octobre 2026, la version 26H2 de la « Security Baseline for Windows 10 and later » est disponible dans Intune, une semaine après la sortie de Windows 11 26H2. Vos profils existants restent en 25H2 tant que vous n'agissez pas.

![Banniere](/images/banarticle/breve-intune4.png)

## Deux changements, pas davantage

Le billet du 29 septembre 2026 de l'équipe Microsoft Security Baselines recense exactement deux écarts par rapport à la version 25H2 :

- **Printers > Configure Windows Ready Print driver ranking**, nouveau réglage, positionné sur *Enabled*. Pour une imprimante découverte en USB ou par multicast, Windows installe le pilote de classe IPP intégré plutôt que le pilote OEM V3 ou V4. Les imprimantes ajoutées en TCP/IP direct ne sont pas concernées. Objectif : réduire la surface d'attaque du spouleur, sujet récurrent depuis PrintNightmare.
- **Internet Explorer > Turn off encryption support** : la valeur recommandée passe de TLS 1.1 + 1.2 à TLS 1.2 + 1.3. TLS 1.1 sort enfin de la baseline.

Microsoft annonce « plusieurs changements » ; le tableau en compte deux.

## Ce qui manque : NetBIOS

Le réglage **Configure NetBIOS settings** est absent de la version Intune : le CSP n'existe que sur les builds Insider et n'est pas encore dans le catalogue de paramètres. Microsoft prévoit de l'ajouter dans une version ultérieure. Si vous désactivez NetBIOS par GPO ou par script, conservez ce mécanisme.

## Mise à niveau : manuelle, et pas sans frottement

Les profils existants ne basculent pas d'eux-mêmes. Dès la publication d'une nouvelle version, les réglages des profils 25H2 passent en lecture seule (nom, description et affectations restent modifiables). Pour migrer : **Endpoint security > Security baselines > Security Baseline for Windows 10 and later**, cocher le profil, puis **Update Version**. Deux options : conserver vos personnalisations ou repartir des valeurs par défaut. Dans les deux cas, Intune crée un nouveau profil à côté de l'ancien, sans ses affectations ni ses scope tags. Réassignez le nouveau, puis retirez les affectations de l'ancien pour éviter les conflits.

**Prérequis** : licence Intune Plan 1 (incluse dans Microsoft 365 E3 et E5, dont le périmètre Intune s'élargit [depuis juillet 2026](/blog/2026-04-16-intunesuite-in-m365/)). Rôle minimal : Policy and Profile Manager. Windows 11 26H2 est en disponibilité générale depuis le 29 septembre 2026 (build 26300.9550). Pour cette baseline, Microsoft indique seulement « Applies to: Windows 11 », sans version minimale : testez-la sur vos appareils [inscrits dans Intune](/blog/old-windowsenroll/) encore en 24H2 ou 25H2 avant de généraliser.

## Points d'attention

- ⚠️ Testez le pilote de classe IPP sur votre parc d'imprimantes avant tout déploiement large : les fonctions propres aux pilotes OEM (bacs, finition, comptabilisation) ne sont pas garanties avec le pilote de classe.
- 💡 Un réglage qui sort du périmètre d'une baseline n'est pas forcément remis à zéro sur l'appareil : selon le CSP concerné, il peut conserver sa dernière valeur jusqu'à ce qu'une autre stratégie le reprenne.
- La baseline Intune n'est pas la copie du package Security Compliance Toolkit (NetBIOS le rappelle) : comparez-les avant d'affirmer une équivalence en audit.

## Source

- [What's new in Microsoft Intune, semaine du 5 octobre 2026](https://learn.microsoft.com/en-us/intune/intune-service/fundamentals/whats-new)
- [Windows 11, version 26H2 security baseline, Tech Community](https://techcommunity.microsoft.com/blog/microsoft-security-baselines/windows-11-version-26h2-security-baseline/4560382)
- [Configure security baseline policies in Microsoft Intune](https://learn.microsoft.com/en-us/intune/device-security/security-baselines/configure-baselines)
- [Microsoft Intune Settings Catalog updated to support Windows 11, version 26H2, Intune Support Team](https://techcommunity.microsoft.com/blog/intunecustomersuccess/microsoft-intune-settings-catalog-updated-to-support-windows-11-version-26h2/4560815)
