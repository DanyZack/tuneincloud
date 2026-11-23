---
title: "Microsoft Perception en GA : ce que les agents font seuls"
description: "Microsoft Perception en GA : quels agents Defender et Sentinel agissent seuls, quels garde-fous régler et comment lire la facturation au résultat pour un SOC."
pubDate: 2026-11-23
heroImage: "/images/hero/microsoft-perception-agents-securite.webp"
category: "actualites"
subcategory: "articles"
---

Microsoft Perception est passé en disponibilité générale mi-novembre 2026, à Ignite, annonce parue sur le blog Microsoft Security et sur Tech Community. Présentée en juillet sous le nom Project Perception, la plateforme fait travailler des agents dans le portail Microsoft Defender, sur les données de Defender XDR et de Microsoft Sentinel, en trois équipes : rouge pour simuler l'attaquant, bleue pour trier et enquêter, verte pour corriger. Six agents sont en GA. Microsoft Perception est facturé au résultat, à part de Security Copilot, sans inclusion documentée dans Microsoft 365 E5. En mode automatique, le Triage Agent clôt seul les faux positifs.

![Banniere](/images/banarticle/article-defender2.png)

## Six agents de Microsoft Perception en GA, le reste en preview

Six agents de Microsoft Perception sont en GA : le Recon Agent, le Triage Agent, l'Attack Investigation Agent, le Detection Authoring Agent, le Threat Intelligence Agent et le Posture Prioritization Agent. Le Risk Reduction Agent est en Public Preview. Le Web App Pen Test Agent, le blindage de vulnérabilités (vulnerability shielding) et le modèle MAI-Cyber-2 restent en preview.

| Agent | Équipe | Statut | Ce qu'il fait seul |
|---|---|---|---|
| Recon Agent | rouge | GA | cartographie les chemins d'attaque en lecture seule |
| Web App Pen Test Agent | rouge | preview | teste une application web autorisée |
| Triage Agent (Alert Triage Agent) | bleue | GA | résout les faux positifs en mode automatique, laisse les vrais positifs à l'analyste |
| Attack Investigation Agent | bleue | GA | rédige un rapport d'enquête, recommande sans exécuter |
| Detection Authoring Agent | bleue | GA | propose des détections testées, ne les déploie pas |
| Threat Intelligence Agent | bleue | GA | produit un rapport TI, ne bloque aucun indicateur |
| Posture Prioritization Agent | verte | GA | classe les risques de posture, ne corrige rien |
| Risk Reduction Agent | verte | Public Preview | exécute un plan (patch Intune, shielding) après approbation |
| Identity Risk Reduction Agent | verte | non précisé | recommande des changements d'accès conditionnel |

Le billet Microsoft Security annonce la GA, alors que les pages Microsoft Learn du Triage Agent, de l'Attack Investigation Agent, du Risk Reduction Agent et de la prise en main portent toujours le bandeau « Limited Public Preview », réservé à des clients invités. Learn écrit aussi « Triage Agent » là où le billet dit « Alert Triage Agent ». Avant de planifier quoi que ce soit, ouvrez **Perception > Agents** et regardez ce que votre tenant affiche.

## Ce que chaque agent fait sans validation humaine

Le niveau d'autonomie compte davantage que la couleur de l'équipe.

- **Lecture seule.** Le Recon Agent évalue les chemins d'attaque à travers Azure et Entra ID. Le Threat Intelligence Agent transforme un article de menace en rapport. Le Posture Prioritization Agent classe les risques et rédige un plan. Aucun ne modifie l'environnement.
- **Proposition.** Le Detection Authoring Agent écrit des détections KQL sur les données de Defender XDR et de Microsoft Sentinel, testées sur jusqu'à 14 jours d'historique du tenant, qu'un analyste active ou non. L'Attack Investigation Agent reconstitue l'attaque et recommande de contenir un compte ou d'isoler un appareil.
- **Action.** Le Triage Agent en déclenchement automatique résout seul les faux positifs. Le Risk Reduction Agent exécute un plan de correction (patch Intune, shielding), mais seulement après approbation.

Le Triage Agent automatique démarre à la création d'une alerte du type choisi, se l'attribue et étiquette l'incident **Agent**. Un faux positif est classé et résolu. Un vrai positif reste ouvert pour l'analyste. La configuration désactive au passage les règles de réglage intégrées qui résolvaient déjà ces alertes.

Microsoft annonce que le Triage Agent couvre environ 80 % des alertes d'une file Defender type. Ce chiffre mesure une couverture globale sur environ 8 millions d'alertes analysées par Microsoft, pas un taux garanti pour un client.

## Les garde-fous que l'administrateur règle

L'assistant crée pour chaque agent une identité Microsoft Entra Agent ID, le mécanisme que décrit mon dossier sur l'[identité d'agent dans Entra](/blog/dossier-2026-04-15-entra-agent-id/), avec un rôle limité aux permissions nécessaires. L'accès aux groupes d'appareils Defender for Endpoint s'accorde à la main, sinon les sessions échouent ou travaillent sur des données incomplètes. Le RBAC unifié (URBAC) doit être activé sur toutes les charges de travail Defender.

Le rôle Security Administrator d'Entra ID configure, met en pause ou supprime un agent, alors que Security Reader suffit pour lancer une session sur n'importe quel agent configuré. Une session en attente passe à **Waiting for input**, où l'analyste approuve, rejette ou suggère une autre voie. L'arrêt d'une session est définitif.

Le Risk Reduction Agent reçoit à la configuration la permission URBAC « Execute hard actions ». L'humain qui approuve doit détenir « Approve hard actions », plus Intune Administrator et Groups Administrator pour un patch Intune. Les playbooks, gérés par Microsoft, ne se modifient pas. Le Triage Agent, lui, consigne chaque décision dans l'audit Microsoft Purview.

## Quelle licence pour Microsoft Perception ?

Microsoft Perception se paie à la consommation, à l'usage ou par un engagement AI Flex Plan d'un ou trois ans. Ces deux modes comptent dans un MACC, et Security Copilot est facturé à part.

L'unité de coût est l'outcome d'agent, un résultat livré :

- une alerte triée (un verdict)
- un rapport d'enquête, de détection ou de renseignement
- une évaluation de posture
- une reconnaissance

Le prix d'un outcome varie avec la complexité de l'analyse. Aucune grille publique n'existe, et aucune règle ne couvre les exécutions échouées ou relancées. L'estimateur et les budgets se trouvent sous **Cost & usage**, avec des données décalées jusqu'à 24 heures.

⚠️ Le budget n'est pas un plafond. Le montant atteint, vous recevez un e-mail et Perception continue de tourner.

L'inclusion de Microsoft Perception dans Microsoft 365 E5 ou E7 n'est pas documentée, ce qui ne veut pas dire exclue. E5 figure en revanche parmi les prérequis de l'Attack Investigation Agent, avec Defender XDR et l'intégration au data lake Microsoft Defender. Le Triage Agent exige Defender for Office 365 P2 pour l'e-mail, Defender for Cloud et Defender for Containers pour le cloud, Entra ID P2, Defender for Identity et Defender for Cloud Apps pour les identités.

## Security Copilot reste, l'agent de triage de 2025 s'efface

Activer Microsoft Perception ne désactive pas l'agent de tri du phishing, [le premier agent de triage Defender](/blog/2026-04-29-article-phishing-triage-agent/), qui tourne tant que le Triage Agent n'est pas configuré. Ensuite, le Triage Agent le remplace et reprend son historique, ses métriques et ses réglages. Un seul agent de triage reste actif. Supprimer le Triage Agent rouvre la porte à l'agent de tri du phishing, et efface tous les retours d'analystes appris.

Microsoft présente Perception en « AI that acts », Security Copilot en « AI that assists ». Le Triage Agent active pourtant quatre plugins Security Copilot, demande la permission « Security Copilot (read) », et sa géographie GPU se règle dans Security Copilot. Les factures sont séparées. La tuyauterie est commune.

## Des agents pour gouverner des agents, mon avis

Fin octobre, avant Ignite, Dark Reading a recueilli les doutes d'experts sur les Guardian Agents, chargés de surveiller d'autres agents. Andras Cser, de Forrester, y reprend la « least agency » défendue par sa collègue Allie Mellen, qui limite ce qu'un agent décide seul et pas seulement ce qu'il touche. Il reconnaît à Perception le moindre privilège, pas encore la least agency. Ce jugement porte sur la plateforme entière, agents du SOC compris.

La page Learn de supervision invite à réduire les approbations des agents qui affichent un taux d'acceptation élevé et peu d'erreurs. Aucun seuil n'est fixé, et rien ne dit comment la décision est consignée. L'autonomie s'élargit par un réglage, sur la foi d'une statistique.

Je ne crains pas d'abord l'erreur de l'agent, car un analyste se trompe aussi et Purview garde chaque verdict, mais qu'une alerte close sans regard humain devienne la norme sans que personne l'ait décidé. Je traite donc chaque élargissement d'autonomie comme une attribution de droits privilégiés, écrite, datée et validée par le RSSI. Copilot avait posé la même question : [qui a le droit de déployer des agents](/blog/2026-10-19-copilot-televersement-agents-avances/).

## Par quel agent commencer dans un SOC de taille moyenne ?

Microsoft conseille de commencer par le Threat Intelligence Agent et le Triage Agent. Mon ordre diffère.

1. Le Posture Prioritization Agent et le Threat Intelligence Agent, en lecture seule, pour mesurer le coût d'un outcome.
2. Un budget et des seuils d'alerte, avant la première session.
3. Le Triage Agent en manuel, ses verdicts comparés à ceux des analystes pendant quelques semaines, puis l'automatique sur un seul type d'alerte.
4. Le Risk Reduction Agent, après sa sortie de preview.

Mieux vaut savoir, avant de cliquer sur **Set up** à l'étape 3, que configurer le Triage Agent remplace l'agent de tri du phishing.

## Sources

Pages consultées le 23 novembre 2026.

- [Security for the agentic era, powered by Microsoft Perception](https://www.microsoft.com/en-us/security/blog/2026/11/17/security-for-the-agentic-era-powered-by-microsoft-perception/) (Microsoft Security Blog, statuts GA et preview)
- [What's new with Microsoft Perception at Ignite 2026](https://techcommunity.microsoft.com/blog/perception-blog/whats-new-with-microsoft-perception-at-ignite-2026/4571834) (Microsoft Perception Blog, Tech Community, couverture de 80 % des alertes)
- [What is Perception?](https://learn.microsoft.com/en-us/security/agentic-security/agentic-security-overview) (Microsoft Learn)
- [Agent categories in Project Perception](https://learn.microsoft.com/en-us/security/agentic-security/agentic-security-agent-categories) (Microsoft Learn)
- [Triage Agent](https://learn.microsoft.com/en-us/security/agentic-security/triage-agent) (Microsoft Learn, remplacement de l'agent de tri du phishing, prérequis de licence, audit Purview)
- [Attack Investigation Agent](https://learn.microsoft.com/en-us/security/agentic-security/attack-investigation-agent) (Microsoft Learn, prérequis Microsoft 365 E5 et data lake Defender)
- [Risk Reduction Agent](https://learn.microsoft.com/en-us/security/agentic-security/risk-reduction-agent) (Microsoft Learn)
- [Get started with Project Perception](https://learn.microsoft.com/en-us/security/agentic-security/agentic-security-get-started) (Microsoft Learn)
- [Approve, reject, or stop agentic work](https://learn.microsoft.com/en-us/security/agentic-security/agentic-security-supervise-work) (Microsoft Learn)
- [Perception agent outcomes and cost factors](https://learn.microsoft.com/en-us/security/agentic-security/agentic-security-outcomes) (Microsoft Learn, unités facturées, données Defender XDR et Sentinel du Detection Authoring Agent)
- [Manage Microsoft Perception costs](https://learn.microsoft.com/en-us/security/agentic-security/agentic-security-manage-costs) (Microsoft Learn, budget non bloquant, décalage de 24 heures)
- [Microsoft Perception, page produit](https://www.microsoft.com/fr-fr/security/business/microsoft-perception-agentic-system) (Microsoft, facturation, AI Flex Plan, séparation avec Security Copilot)
- [Inside Microsoft's Bet on a Unified Security Stack to Contain AI Agents](https://www.darkreading.com/cybersecurity-operations/ai-agents-insider-threats-inside-microsoft-unified-security-stack) (Dark Reading, source tierce, octobre 2026)
