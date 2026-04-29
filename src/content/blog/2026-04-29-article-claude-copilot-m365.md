---
title: "Claude dans Microsoft 365 Copilot : ce que les DSI françaises doivent décider avant le 4 mai 2026"
description: "L'activation par défaut des modèles Anthropic dans Copilot M365 arrive au 4 mai 2026 pour les tenants EU/EFTA/UK. Une décision de gouvernance à instruire, pas un simple paramètre à laisser glisser."
pubDate: 2026-04-29
category: "actualites"
subcategory: "articles"
heroImage: "https://www.fusionsol.com/wp-content/uploads/sites/2/2025/09/Claude-in-Microsoft-365-Copilot.jpg"
---

L'arrivée de Claude dans Microsoft 365 Copilot n'est plus un sujet d'opt-in volontaire. À partir du 4 mai 2026, un nouveau réglage activé par défaut rendra les modèles Anthropic disponibles dans Copilot pour Excel et PowerPoint, y compris pour les tenants situés en EU, EFTA et UK. Word suivra à l'été. Microsoft a structuré la bascule de telle manière que ne rien faire revient à autoriser. Pour les DSI et RSSI français, l'enjeu n'est pas technique. Il est juridique et organisationnel : Anthropic est intégré comme sous-traitant Microsoft, mais le traitement des données se fait hors EU Data Boundary. La case à cocher mérite une décision documentée, pas un clic distrait.

![Banniere](/images/banarticle/article-copilot1.png)

## Une intégration en trois temps

Microsoft n'a pas annoncé Claude dans Copilot M365 d'un seul coup, et c'est cette montée progressive qui rend la situation actuelle particulière. Trois jalons structurent le calendrier.

Le 24 septembre 2025, première arrivée. Claude Sonnet 4 et Claude Opus 4.1 sont rendus disponibles dans deux expériences ciblées de Copilot M365 : l'agent Researcher et Copilot Studio. À ce stade, l'usage est conditionné à un opt-in explicite de l'administrateur, doublé de l'acceptation de conditions commerciales propres à Anthropic. L'AI provider est volontaire, contractuellement séparé, et reste cantonné à des fonctions d'agent.

Le 7 janvier 2026, deuxième jalon. Anthropic est intégré comme **sous-traitant Microsoft** ("Microsoft subprocessor"). Le toggle séparé est déprécié et remplacé par un nouveau réglage unifié, situé dans le Microsoft 365 admin center sous *Copilot > Settings > AI providers operating as Microsoft subprocessors*. Pour la plupart des tenants commerciaux mondiaux, l'option est positionnée sur ON par défaut. Pour les tenants EU, EFTA et UK, le toggle est sur OFF par défaut. À partir de cette date, l'usage de Claude dans Copilot relève des Microsoft Product Terms, du Data Protection Addendum (DPA) et du Customer Copyright Commitment. Plus besoin de contractualiser avec Anthropic en parallèle.

Le 3 avril 2026, troisième jalon, le moins commenté mais le plus structurant pour la France. Microsoft introduit un **second réglage**, distinct du premier, intitulé *Copilot in M365 apps with Anthropic models in EU/EFTA and UK*. Ce paramètre concerne spécifiquement Copilot dans Word, Excel et PowerPoint. Et il est conçu pour s'activer automatiquement à compter du 4 mai 2026 sur les tenants EU/EFTA/UK existants, sauf modification explicite par l'administrateur.

## Deux réglages, deux portées, deux décisions

C'est ici que la lecture devient exigeante. Beaucoup de communications sur le sujet entretiennent la confusion entre les deux toggles. Ils n'ont ni la même portée, ni le même comportement par défaut.

Le **toggle global** (*AI providers operating as Microsoft subprocessors*) gouverne l'usage des modèles Anthropic dans l'ensemble de l'écosystème Copilot : Researcher, Copilot Studio, Power Platform, Agent Mode in Excel, agents Word, Excel et PowerPoint. Pour les tenants EU/EFTA/UK, ce toggle reste sur OFF par défaut depuis le 7 janvier 2026. Activer ce toggle vaut acceptation, par l'administrateur, des conditions Anthropic en tant que sous-traitant Microsoft. Sans cette activation, aucun usage de Claude n'est possible dans Copilot.

Le **toggle applicatif** (*Copilot in M365 apps with Anthropic models*) ne concerne que Copilot dans Word, Excel et PowerPoint. Il est secondaire au précédent : si le toggle global est désactivé, le toggle applicatif n'a aucun effet. Mais si le toggle global est activé, ou si Microsoft pousse une activation par défaut comme prévu le 4 mai 2026 pour les tenants EU/EFTA/UK, alors Claude devient le modèle par défaut dans les expériences Copilot des trois applications bureautiques (avec Word qui rejoindra le périmètre durant l'été 2026).

La logique Microsoft est cohérente, mais elle exige de l'administrateur une compréhension fine des deux niveaux. Désactiver le toggle global est radical : on perd l'accès à Researcher avec Claude, à Copilot Studio avec Claude, aux agents Word/Excel/PowerPoint, à l'Agent Mode in Excel. Désactiver uniquement le toggle applicatif ne supprime pas Claude des autres expériences, mais empêche son utilisation par défaut dans les applications Office.

## La question de l'EU Data Boundary

L'enjeu de fond ne tient pas à un paramètre, mais à une réalité documentée par Microsoft elle-même : **les modèles Anthropic ne sont pas inclus dans l'EU Data Boundary**. Quand un utilisateur français lance une requête Copilot sur un document Word ou un classeur Excel et que Claude répond, le contenu de ce document transite et est traité en dehors de la frontière européenne des données, vraisemblablement aux États-Unis où Anthropic opère ses infrastructures.

Microsoft entoure cette sortie de garanties contractuelles : Anthropic agit comme sous-traitant sous Product Terms et DPA, l'Enterprise Data Protection s'applique, aucune donnée n'est stockée hors EUDB de manière persistante, le transit est chiffré. Pour beaucoup d'organisations, ce cadre suffira. Pour d'autres, notamment celles qui ont pris des engagements de souveraineté vis-à-vis de leurs clients ou qui opèrent dans des secteurs régulés (santé, défense, services financiers, secteur public), c'est précisément le scénario qu'elles ont voulu éviter en s'appuyant sur l'EUDB.

La distinction est importante, parce que les engagements EUDB de Microsoft, communiqués à grand renfort de campagne ces dernières années, restent vrais pour les autres composants de Copilot, mais ne s'appliquent plus dès que Claude entre dans la boucle. Activer Anthropic, c'est donc accepter un mode de traitement à deux vitesses au sein du même produit.

## La marche à suivre concrète pour les tenants français

Pour un tenant Microsoft 365 situé en France, la procédure dépend de l'arbitrage retenu en interne. Trois scénarios sont à instruire.

**Scénario 1 : refuser l'usage de Claude dans Copilot.** Le toggle global reste sur OFF (sa valeur par défaut depuis le 7 janvier 2026). Aucune action n'est strictement requise pour l'empêcher, mais une vérification explicite est recommandée. Procédure : Microsoft 365 admin center > Copilot > Settings > View All > AI providers operating as Microsoft subprocessors. Confirmer que Anthropic est désactivé. Conséquence : perte d'accès à Researcher avec Claude, aux agents Copilot Studio avec Claude, aux agents Word/Excel/PowerPoint, et à l'Agent Mode in Excel. Pour des organisations qui n'utilisent pas activement ces fonctions Frontier, l'impact opérationnel est nul.

**Scénario 2 : activer Claude pour l'ensemble de l'écosystème Copilot.** Le toggle global passe sur ON après acceptation des conditions Anthropic comme sous-traitant Microsoft. Cette acceptation engage l'organisation : il est prudent de la faire valider en amont par le DPO, de mettre à jour le registre des sous-traitants, et de réviser l'AIPD si une analyse d'impact existe pour Copilot. Procédure : même chemin, sélectionner *Enable Anthropic as a Microsoft subprocessor*. Microsoft propose en outre un ciblage par utilisateurs ou groupes Entra ID, ce qui permet d'ouvrir Claude à des populations restreintes (équipe innovation, R&D, juridique pilote) avant un déploiement plus large.

**Scénario 3 : activer Claude pour les fonctions agents tout en bloquant l'usage dans Word/Excel/PowerPoint.** Le toggle global passe sur ON. Le toggle applicatif (*Copilot in M365 apps with Anthropic models*) est explicitement positionné sur OFF avant le 4 mai 2026. Cette configuration permet de réserver Claude aux usages volontaires (Researcher, agents Copilot Studio) tout en empêchant son activation silencieuse dans les requêtes Copilot quotidiennes des utilisateurs Office. C'est probablement la posture la plus défendable pour une DSI qui veut explorer la valeur des modèles Anthropic sans engager l'ensemble de la base utilisateur sur un traitement hors EUDB.

À noter : la procédure officielle Microsoft précise que les organisations EU/EFTA/UK qui avaient opté pour l'ancien toggle (avant le 7 janvier 2026) doivent **réopter explicitement** sur le nouveau toggle. La continuité n'est pas automatique. Une vérification s'impose pour les tenants qui avaient activé Claude lors de la première vague de septembre 2025.

## Un signal stratégique au-delà du paramètre

Au-delà du cas Anthropic, l'épisode dit quelque chose de la trajectoire Copilot. Microsoft assume désormais ouvertement une stratégie multi-modèles, où OpenAI cohabite avec Anthropic dans les expériences phares. Le partenariat capacitaire entre Microsoft et Anthropic (deal Azure de 30 milliards de dollars annoncé en novembre 2025) en est la pierre angulaire. Pour les architectes IT, cela signifie que Copilot M365 n'est plus un produit à modèle unique, et que la question "quel modèle traite ma donnée" devient une question de gouvernance permanente, pas un paramètre d'installation à figer.

C'est aussi un avertissement pour la suite. Si Anthropic est aujourd'hui le premier sous-traitant non OpenAI à entrer dans Copilot, d'autres pourraient suivre, et chaque nouveau sous-traitant introduira potentiellement le même type d'arbitrage : performance contre conformité de résidence, fonctionnalités exclusives contre garanties EUDB. Les DSI qui auront construit un cadre de décision clair pour Anthropic disposeront de la grille pour les suivants. Celles qui laisseront filer la décision du 4 mai 2026 devront la rejouer à chaque vague.

Le sujet n'est donc pas le modèle. Le sujet est la maturité du dispositif de gouvernance AI dans l'organisation. La date du 4 mai 2026 est un test, pas un terminus.

## Sources

- [Anthropic as a subprocessor for Microsoft Online Services (Microsoft Learn)](https://learn.microsoft.com/en-us/copilot/microsoft-365/connect-to-ai-subprocessor)
- [Copilot in Microsoft 365 apps with Anthropic models (Microsoft Learn)](https://learn.microsoft.com/en-us/microsoft-365/copilot/copilot-anthropic-apps)
- [Expanding model choice in Microsoft 365 Copilot (Microsoft 365 Blog, septembre 2025)](https://www.microsoft.com/en-us/microsoft-365/blog/2025/09/24/expanding-model-choice-in-microsoft-365-copilot/)
- [Anthropic joins the multi-model lineup in Microsoft Copilot Studio (Microsoft Copilot Blog)](https://www.microsoft.com/en-us/microsoft-copilot/blog/copilot-studio/anthropic-joins-the-multi-model-lineup-in-microsoft-copilot-studio/)
- [Coming Soon: Anthropic models will be available by default in Copilot experiences (Microsoft 365 Admin)](https://m365admin.handsontek.net/coming-soon-anthropic-models-will-available-default-copilot-experiences/)

<!--
Notes de livraison :
- Sources consultées le 2026-04-29.
- Angle retenu : gouvernance et compliance pour les DSI françaises, à la lumière
  de l'activation par défaut du 4 mai 2026 sur les tenants EU/EFTA/UK.
- Cible éditoriale : DSI, RSSI, DPO et architectes Microsoft 365.
- Décompte de mots : ~1450 mots (dans la fourchette 800-1500).
- Aucun tiret cadratin en milieu de phrase (vérifié).
- Points à re-vérifier avant publication :
  * La date du 4 mai 2026 pour l'activation par défaut du toggle applicatif
    (sourcée mais à reconfirmer dans le Message Center MC1269241 du tenant).
  * Le calendrier "été 2026" pour Word reste à préciser quand Microsoft
    confirmera la date exacte.
  * Vérifier que la procédure exacte du Microsoft 365 admin center reste
    valide (Microsoft a déjà déplacé le toggle entre Data access et User
    access, voir le commentaire de Tony Redmond chez office365itpros.com).
  * Le chiffre "30 milliards de dollars" pour le deal Azure-Anthropic est
    sourcé presse (VentureBeat, Winbuzzer), pas par Microsoft directement.
- Aucune information en preview privée, tout est documenté publiquement.

NOTE IMPORTANTE À DANIEL :
- Tu as demandé une "brève" mais déclenché le skill "article". J'ai produit
  un article (1450 mots) car ton sujet portait deux dimensions (annonce +
  marche à suivre Europe), ce qui dépasse le format short (250-500 mots).
- Si tu voulais vraiment une brève, dis-le et je te livre une version courte
  via le skill skill-tuneincloud-short.
-->
