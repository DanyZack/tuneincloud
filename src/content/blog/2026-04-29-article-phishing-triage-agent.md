---
title: "Phishing Triage Agent : la tête de pont du virage agentique de Microsoft Defender"
description: "Annoncé en mars 2025, en GA depuis novembre, le Phishing Triage Agent inaugure la famille des agents Security Copilot intégrés à Defender. Au-delà du tri des emails signalés, c'est un changement de paradigme pour le SOC."
pubDate: 2026-04-27
category: "actualites"
subcategory: "articles"
heroImage: "https://i.ytimg.com/vi/zy7Ah6voC1Y/maxresdefault.jpg"
---

Microsoft Defender vient de basculer dans une autre époque, et le Phishing Triage Agent en est l'avant-garde. Annoncé à Microsoft Secure en mars 2025, mis en Public Preview en août, passé en disponibilité générale à Ignite 2025 le 18 novembre, l'agent autonome de tri des emails de phishing est devenu en huit mois la tête de pont d'une famille qui en compte aujourd'hui plus de trente-sept. Derrière la fonctionnalité, une stratégie : injecter du LLM autonome au cœur des workflows SOC, et faire de Defender un socle agentique plutôt qu'un simple XDR.

![Banniere](/images/banarticle/article-defender1.png)

## Une trajectoire produit accélérée

Le calendrier mérite qu'on s'y arrête. Microsoft a dévoilé le Phishing Triage Agent le 24 mars 2025 lors de Microsoft Secure, dans un lot inaugural de onze agents Security Copilot (six estampillés Microsoft, cinq construits par des partenaires). Le passage en Public Preview est intervenu en août 2025, dans le cadre d'un accès limité par trial directement depuis le portail Defender. La GA a été annoncée à Ignite 2025, le 18 novembre, simultanément à l'inclusion de Security Copilot dans les licences Microsoft 365 E5 (avec une enveloppe de 400 SCU par mois pour 1 000 licences, plafonnée à 10 000 SCU).

Huit mois entre l'annonce et la GA, c'est rapide pour un agent autonome qui résout des incidents de sécurité sans intervention humaine. Microsoft documente d'ailleurs publiquement les résultats de ses essais contrôlés randomisés : les analystes équipés de l'agent détecteraient les emails malveillants jusqu'à 550 % plus vite que les équipes témoins. Le chiffre est spectaculaire, mesuré dans des scénarios simulés. Il dit surtout une chose : Microsoft tient à inscrire la trajectoire de cet agent sous le signe d'une efficacité quantifiable, là où la communication initiale sur Security Copilot s'était révélée plus floue.

## Ce que l'agent fait vraiment

Le Phishing Triage Agent traite un cas d'usage borné, mais éprouvant pour les SOC : l'avalanche de signalements utilisateurs. Des emails douteux remontés via le bouton "Signaler" de Outlook, qui atterrissent en masse dans la file d'attente Defender, dont la plupart sont des faux positifs (newsletters, communications RH, factures légitimes), et que les analystes doivent néanmoins traiter un par un.

L'agent applique une analyse sémantique LLM à chaque incident : examen du contenu textuel, inspection des URL, évaluation des pièces jointes, détection d'intention. Il livre un verdict (vrai positif ou faux positif), résout automatiquement les faux positifs, et escalade les cas confirmés à l'analyste humain. Chaque décision s'accompagne d'une explication en langage naturel et d'un arbre de décision visuel, consultable dans le portail. Les analystes peuvent fournir un retour, également en langage naturel, qui est mémorisé par l'agent et appliqué aux exécutions suivantes.

L'architecture mérite un mot. L'agent fonctionne sous une **identité dédiée** dans Entra ID, à laquelle l'administrateur attribue un rôle RBAC selon le principe du moindre privilège. Les actions sont évaluées contre les politiques de Conditional Access avant exécution, et tracées dans les journaux d'audit Microsoft Purview. C'est un point structurant : Microsoft applique à ses propres agents les mêmes contraintes Zero Trust qu'aux utilisateurs humains. Une décision logique, qui anticipe l'arrivée d'Agent 365 (gouvernance des agents IA, GA prévue le 1er mai 2026).

## Le premier d'une famille qui s'étend

C'est ici que l'analyse devient intéressante. Le Phishing Triage Agent n'est pas un produit isolé, c'est le premier maillon d'une stratégie. Microsoft a structuré sa démarche en trois temps.

À Microsoft Secure en mars 2025, onze agents inauguraux pour défricher le terrain : phishing triage, vulnerability remediation (Intune), conditional access optimization (Entra), threat intelligence briefing (Security Copilot), DLP triage et IRM triage (Purview), plus cinq agents partenaires. À Ignite en novembre 2025, le catalogue passe à trente-sept agents, dont douze nouveaux Microsoft (Defender, Entra, Intune, Purview) et plus de trente partenaires. Au passage, la consommation des agents tiers est intégrée à l'enveloppe SCU E5, ce qui ouvre l'écosystème sans alourdir la facture.

La cohérence de la trajectoire saute aux yeux. Microsoft commence par les tâches répétitives à fort volume (tri d'alertes, optimisation de politiques) plutôt que par les décisions critiques (containment, isolation). On donne à l'agent un terrain où l'erreur reste corrigible et où le gain de temps est mesurable. Ce n'est pas un hasard si le premier agent ciblé est le tri du phishing utilisateur : 30 milliards d'emails de phishing détectés par Microsoft en 2024, l'essentiel des signalements utilisateurs sont des faux positifs, et le coût opérationnel de ce traitement est colossal pour les SOC. Cas d'usage idéal pour un proof of concept qui doit emporter la conviction.

## Ce qui change pour les architectes Defender

Pour les architectes et RSSI qui pilotent un environnement Defender, l'arrivée du Phishing Triage Agent en GA n'est pas une simple mise à jour fonctionnelle. C'est un déplacement du modèle opérationnel.

Premier déplacement : la nature même de l'incident change. Jusqu'ici, un incident Defender représentait un événement détecté, qu'un analyste devait traiter. Avec l'agent, certains incidents sont **résolus avant qu'un analyste ne les voie**. Le tableau de bord Defender expose désormais des métriques d'agent (incidents pris en charge, incidents résolus, MTTT, consommation SCU), et le rôle de l'analyste se déplace vers la supervision et l'arbitrage des cas escaladés. La courbe de compétences attendue évolue avec.

Deuxième déplacement : la consommation devient un paramètre d'architecture. L'agent consomme des SCU à chaque exécution, et les SCU s'épuisent. Avec l'inclusion E5 (400 SCU pour 1 000 licences, plafonnée à 10 000 SCU), une organisation de taille moyenne dispose d'une enveloppe correcte pour un usage standard. Mais une organisation qui empile plusieurs agents en parallèle (phishing triage, alert triage DLP, threat intelligence, threat hunting, dynamic threat detection) peut épuiser sa réserve mensuelle bien plus vite qu'anticipé. Le mode overage à 6 $ par SCU annoncé pour l'avenir n'est pas encore disponible : aujourd'hui, dépasser le quota signifie un throttling pur et simple jusqu'à la prochaine remise à zéro mensuelle. La capacité SCU devient un sujet de capacity planning au même titre que les volumes Sentinel ou les seuils Defender for Endpoint.

Troisième déplacement, plus discret mais plus structurant : l'agent introduit une **mémoire organisationnelle**. Les retours analystes alimentent une mémoire persistante (modifiable par l'administrateur), qui ajuste le comportement de l'agent au contexte du tenant. C'est, à petite échelle, un dispositif d'apprentissage continu qui n'existait pas dans l'XDR classique. La gouvernance de cette mémoire (qui peut donner du feedback, qui peut le modifier ou le purger) devient un sujet à intégrer dans les procédures opérationnelles.

## Les zones d'ombre à surveiller

Trois points méritent prudence avant un déploiement en production.

La transparence des décisions, d'abord. Microsoft met en avant l'arbre de décision visuel et l'explication en langage naturel. Sur le papier, c'est exemplaire. Dans la pratique, ces explications restent générées par un LLM, avec les limites usuelles : risque de rationalisation a posteriori, biais de confirmation sur les patterns appris, opacité de la pondération réelle des signaux. Pour une équipe de conformité qui doit défendre un verdict de classification devant un auditeur ou un juge, l'explication LLM ne remplace pas une trace technique formalisée. Les journaux Purview offrent la traçabilité formelle, mais pas la justification métier.

Le périmètre, ensuite. L'agent traite uniquement les emails signalés par les utilisateurs, c'est-à-dire la "dernière ligne" de la défense anti-phishing. Les emails bloqués en amont par Defender for Office 365 ne passent pas par lui. Les comptes étendus aux agents identité et cloud annoncés à Ignite 2025 sont en cours de déploiement, mais pas encore actifs. Pour l'instant, le Phishing Triage Agent reste un outil de triage post-signalement, pas un dispositif de détection upstream.

La dépendance produit, enfin. L'agent réclame un onboarding préalable à Security Copilot, une identité Entra dédiée, des SCU disponibles, et un tenant Defender en ordre de marche. La friction reste mesurée pour les organisations déjà bien outillées. Pour les autres, l'agent reste hors de portée tant que le socle n'est pas en place. C'est moins un défaut qu'une caractéristique de l'écosystème Microsoft : on ne consomme l'agent qu'à condition d'avoir préalablement consommé tout ce qui est en dessous.

## Une bascule à prendre au sérieux

Le Phishing Triage Agent n'est pas un gadget. C'est le premier exemple grand public d'un agent autonome qui résout des incidents de sécurité dans un produit Microsoft d'entreprise, sous gouvernance Zero Trust, avec une boucle d'apprentissage organisationnelle. Sa trajectoire (mars 2025 à novembre 2025, du proof of concept à la GA, du produit isolé à la famille de trente-sept) dessine la direction que prend Microsoft Defender pour les dix-huit prochains mois : un XDR augmenté d'agents spécialisés, intégrés au flux de travail, gouvernés comme des identités à part entière.

Reste à savoir comment cette promesse résiste au volume réel des SOC, à la diversité des contextes organisationnels, et à la pression budgétaire des SCU. Les chiffres de Microsoft (550 % plus rapide en environnement contrôlé) sont à prendre pour ce qu'ils sont : un point de départ. Les retours du terrain, dans six à douze mois, diront si la promesse tient en production. Le calendrier de Microsoft, lui, ne ralentit pas.

## Sources

- [Security Copilot Phishing Triage Agent in Microsoft Defender (Microsoft Learn)](https://learn.microsoft.com/en-us/defender-xdr/phishing-triage-agent)
- [Microsoft unveils Microsoft Security Copilot agents (Microsoft Security Blog, mars 2025)](https://www.microsoft.com/en-us/security/blog/2025/03/24/microsoft-unveils-microsoft-security-copilot-agents-and-new-protections-for-ai/)
- [Announcing Public Preview: Phishing Triage Agent in Microsoft Defender (Microsoft Tech Community, août 2025)](https://techcommunity.microsoft.com/blog/microsoftthreatprotectionblog/announcing-public-preview-phishing-triage-agent-in-microsoft-defender/4438301)
- [Microsoft Ignite 2025: Transforming Phishing Response with Agentic Innovation (Microsoft Tech Community, novembre 2025)](https://techcommunity.microsoft.com/blog/microsoftdefenderforoffice365blog/microsoft-ignite-2025-transforming-phishing-response-with-agentic-innovation/4470791)
- [Agents built into your workflow: Get Security Copilot with Microsoft 365 E5 (Microsoft Security Blog, novembre 2025)](https://www.microsoft.com/en-us/security/blog/2025/11/18/agents-built-into-your-workflow-get-security-copilot-with-microsoft-365-e5/)
- [Security Copilot Agent Responsible AI FAQ (Microsoft Learn)](https://learn.microsoft.com/en-us/copilot/security/rai-faqs-security-copilot-agents)

<!--
Notes de livraison :
- Sources consultées le 2026-04-27.
- Angle retenu : trajectoire produit et virage agentique de Microsoft Defender.
- Cible éditoriale : architectes et RSSI.
- Décompte de mots : ~1310 mots (dans la fourchette 800-1500).
- Aucun tiret cadratin en milieu de phrase (vérifié).
- Points à re-vérifier avant publication :
  * Confirmer que le mode overage à 6 $/SCU est toujours "à venir" à la date
    de publication (sujet en mouvement, voir documentation Microsoft à jour).
  * Confirmer la date GA d'Agent 365 (annoncée pour le 1er mai 2026).
  * Le chiffre "37 agents" reflète l'annonce Ignite 2025 ; vérifier qu'aucune
    annonce intermédiaire n'a fait évoluer ce nombre.
  * Tous les chiffres officiels Microsoft (550 %, 30 milliards d'emails, 400
    SCU pour 1 000 licences) sont sourcés et publiés dans les blogs Microsoft
    Security cités.
- Aucune information en preview privée, tout est documenté publiquement.
-->
