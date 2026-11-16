---
title: "Faille Outlook exploitée : le correctif passe par Office"
description: "CVE-2026-124194, exploitée avant correctif, livre le hachage NTLMv2 via Outlook. Le correctif du 10 novembre 2026 est un build Office, pas le cumulatif Windows."
pubDate: 2026-11-16
category: "actualites"
subcategory: "breves"
heroImage: "/images/hero/outlook-faille-ntlm-microsoft-365-apps.webp"
---
Le 10 novembre 2026, Microsoft a corrigé CVE-2026-124194, une faille d'Outlook déjà exploitée qui livre le hachage NTLMv2 à un serveur de l'attaquant. Le correctif n'est pas dans le cumulatif Windows. Il est dans le build Office.

![Banniere](/images/banarticle/breve-defender1.png)

## Un fichier ouvert suffit à envoyer le hachage

Le Security Update Guide classe la faille en usurpation, sévérité « Moderate », score CVSS 3.1 de 6,5, avec la mention « Exploitation Detected ». L'utilisateur ouvre dans Outlook un fichier piégé, et Outlook se connecte à un emplacement réseau de l'attaquant sans l'avertissement habituel sur le contenu externe. Le volet de lecture n'est pas un vecteur. Le hachage sert ensuite à s'authentifier comme la victime.

La CISA a inscrit la faille à son catalogue KEV le 10 novembre, avec une échéance au 24 novembre pour les agences fédérales américaines. L'avis de Microsoft ne nomme aucun acteur et ne propose aucune atténuation.

## Le canal de mise à jour décide du correctif

Mettre à jour Windows, ou déployer la [baseline de sécurité Windows 11 26H2](/blog/2026-10-08-intune-baseline-windows-11-26h2/), laisse Outlook au build qu'il avait. Microsoft liste trois produits affectés (Microsoft 365 Apps for Enterprise, Office LTSC 2021, Office LTSC 2024) et publie ces builds corrigés :

- Current Channel : version 2610, build 20527.20196
- Monthly Enterprise Channel : versions 2610, 2609 et 2608 (builds 20527.20194, 20430.20264, 20326.20320)
- Office LTSC 2024 : build 17932.21140
- Office LTSC 2021 : build 14334.21048

Depuis la version 2606 de juillet 2026, le Semi-Annual Enterprise Channel reçoit les versions du Monthly Enterprise Channel, avec un build décalé de deux unités (20527.20192, 20430.20262, 20326.20318). La version 2508, hors support depuis le 8 septembre 2026, n'a pas de build de novembre.

## Trouver les postes encore vulnérables

Dans le portail Defender, **Vulnerability management > Weaknesses** (**Vulnerabilities** sous Exposure management pour les tenants en preview) liste les appareils exposés à chaque CVE. La page exige Defender for Endpoint Plan 2, Defender for Business ou Defender Vulnerability Management Standalone, et non le Plan 1. Un poste corrigé en sort sous 24 à 48 heures.

Sans ces licences, **Apps > Monitor > Discovered apps** dans Intune donne chaque version de Microsoft 365 Apps et son nombre d'appareils, exportable en CSV. Sur Windows, l'inventaire ne couvre que les appareils d'entreprise et se rafraîchit toutes les 24 heures.

## Avis d'expert

Faute d'atténuation officielle, j'emprunte celle que Microsoft publiait en 2023 pour CVE-2023-23397, faille Outlook qui livrait déjà le hachage NTLMv2. En attendant le dernier poste, je bloque le port TCP 445 sortant au pare-feu et dans le VPN. Je passe la stratégie « Network security: Restrict NTLM: Outgoing NTLM traffic to remote servers » en « Audit all », qui journalise sans bloquer.

⚠️ « Deny all » sans liste d'exceptions coupe toute application qui s'authentifie encore en NTLM. Lisez le journal Applications and Services Logs\Microsoft\Windows\NTLM avant de durcir.

Un message piégé que personne ne signale n'atteint jamais le [Phishing Triage Agent](/blog/2026-04-29-article-phishing-triage-agent/). La faille ne se ferme qu'avec le build Office du 10 novembre.

## Source

- [CVE-2026-124194, Microsoft Outlook Spoofing Vulnerability (Security Update Guide, MSRC)](https://msrc.microsoft.com/update-guide/vulnerability/CVE-2026-124194)
- [Release notes for Microsoft 365 Apps security updates (Microsoft Learn)](https://learn.microsoft.com/en-us/officeupdates/microsoft365-apps-security-updates)
- [Channel unification: Semi-Annual Enterprise Channel to Monthly Enterprise Channel (Microsoft Learn)](https://learn.microsoft.com/en-us/microsoft-365-apps/updates/unified-update-channels), Message Center MC1274325
- [Known Exploited Vulnerabilities Catalog (CISA)](https://www.cisa.gov/known-exploited-vulnerabilities-catalog)
- [Vulnerabilities in my organization (Microsoft Learn)](https://learn.microsoft.com/en-us/defender-vulnerability-management/tvm-weaknesses)
- [Compare Microsoft Defender Vulnerability Management plans (Microsoft Learn)](https://learn.microsoft.com/en-us/defender-vulnerability-management/defender-vulnerability-management-capabilities)
- [Discovered apps (Microsoft Learn)](https://learn.microsoft.com/en-us/intune/app-management/discovered-apps)
- [CVE-2023-23397, atténuations (Security Update Guide, MSRC)](https://msrc.microsoft.com/update-guide/vulnerability/CVE-2023-23397)
- [Network security: Restrict NTLM: Outgoing NTLM traffic to remote servers (Microsoft Learn)](https://learn.microsoft.com/en-us/previous-versions/windows/it-pro/windows-10/security/threat-protection/security-policy-settings/network-security-restrict-ntlm-outgoing-ntlm-traffic-to-remote-servers)
