---
title: "Claude Sonnet dans Microsoft 365 Copilot : ce que les DSI françaises doivent décider, et comment"
description: "L'activation par défaut des modèles Anthropic dans Copilot M365 arrive au 4 mai 2026 pour les tenants EU/EFTA/UK. Une décision de gouvernance à instruire, pas un simple paramètre à laisser glisser."
pubDate: 2026-04-29
category: "actualites"
subcategory: "articles"
heroImage: "https://www.fusionsol.com/wp-content/uploads/sites/2/2025/09/Claude-in-Microsoft-365-Copilot.jpg"
---

L'arrivée de Claude Sonnet dans Microsoft 365 Copilot Chat n'est pas une nouveauté à activer sans réflexion. Pour les tenants situés en Union européenne, dans l'AELE et au Royaume-Uni, le modèle d'Anthropic est désactivé par défaut. L'opt-in administratif est une option, pas une obligation, mais c'est précisément ce qui rend la décision intéressante : ne rien faire est un choix défendable, activer aussi, à condition de comprendre que Claude opère comme sous-traitant Microsoft hors EU Data Boundary. Pour les DSI, RSSI et DPO français, l'enjeu n'est pas technique. Il est juridique et organisationnel. La case à cocher mérite une décision documentée.

![Banniere](/images/banarticle/article-copilot1.png)

## Ce qui change concrètement

Microsoft a confirmé via le Message Center que Claude Sonnet est désormais disponible dans Copilot Chat de Microsoft 365 Copilot pour les utilisateurs sous licence, aux côtés des derniers modèles OpenAI. Le modèle est sélectionnable depuis le sélecteur de modèles dans Copilot Chat. Le déploiement général sur web, desktop, macOS et mobile, initialement prévu pour fin mars, a été repoussé pour un achèvement attendu début avril 2026.

L'intégration se présente sous une forme volontairement modeste : un choix utilisateur dans une interface, là où Microsoft aurait pu pousser une bascule plus structurante. Mais cette modestie apparente masque un travail de fond plus important. Anthropic est désormais intégré comme **sous-traitant Microsoft** ("Microsoft subprocessor"), au sens du Data Protection Addendum. L'usage de Claude dans Copilot relève des Microsoft Product Terms, du DPA et du Customer Copyright Commitment. L'Enterprise Data Protection continue de s'appliquer sans changement. Concrètement, l'administrateur n'a plus à contractualiser séparément avec Anthropic : c'est la chaîne contractuelle Microsoft existante qui couvre l'usage.

Le périmètre de cette mise à disposition englobe désormais plusieurs surfaces : Copilot Chat (web, desktop, mobile), Researcher, Copilot Studio, Power Platform, Agent Mode dans Excel, et les agents dédiés Word, Excel et PowerPoint au fur et à mesure de leur déploiement.

## Le statut spécifique des tenants EU/EFTA/UK

C'est ici que la situation française se distingue. Microsoft a explicitement défini les modalités par région. Pour la plupart des tenants commerciaux dans le monde, Claude est activé par défaut. Pour les tenants en Union européenne, dans l'Espace économique européen (EFTA) et au Royaume-Uni, **Anthropic est désactivé par défaut et nécessite un opt-in administratif**. Pour les clouds gouvernementaux et souverains (GCC, GCC High, DoD), Claude n'est pas disponible et n'apparaît pas dans le sélecteur de modèles, faute notamment de certification FedRAMP.

La raison de ce traitement différencié est documentée par Microsoft elle-même : **les modèles Anthropic sont actuellement exclus de l'EU Data Boundary et des engagements de traitement in-country applicables**. Quand un utilisateur français lance une requête Copilot et choisit Claude, le contenu transmis pour traitement sort de la frontière européenne des données.

Microsoft entoure cette sortie de garanties contractuelles : Anthropic agit comme sous-traitant sous Product Terms et DPA, l'Enterprise Data Protection s'applique, le transit est chiffré. Pour beaucoup d'organisations, ce cadre suffira. Pour d'autres, notamment celles qui ont pris des engagements de souveraineté vis-à-vis de leurs clients ou qui opèrent dans des secteurs régulés (santé, défense, services financiers, secteur public), c'est précisément le scénario que la stratégie EUDB de Microsoft était censée écarter.

L'épisode rappelle une vérité utile : les engagements EU Data Boundary, communiqués à grand renfort de campagne ces dernières années, restent vrais pour les composants de Copilot servis par les modèles OpenAI hébergés dans les datacenters européens, mais cessent de s'appliquer dès que Claude entre dans la boucle. Activer Anthropic, c'est accepter un mode de traitement à deux vitesses au sein du même produit. Ce n'est pas illégitime, ce n'est pas dissimulé, mais cela mérite d'être instruit.

## La marche à suivre pour un tenant français

Pour un administrateur Microsoft 365 en France, le Message Center ne réclame **aucune action obligatoire**. Le tenant reste sur la configuration par défaut (Anthropic désactivé), et rien ne se produit sans intervention explicite. Microsoft recommande seulement de revoir les guidelines internes et de communiquer aux utilisateurs sur la disponibilité de l'option.

Trois scénarios sont à instruire selon la politique retenue.

**Scénario 1 : laisser Claude désactivé.** C'est l'état par défaut, aucune action n'est requise. Une vérification explicite reste recommandée pour confirmer que la configuration applicable au tenant correspond bien au choix souhaité, en particulier si l'organisation avait opté pour les modèles Anthropic sous l'ancien toggle (avant son remplacement). La procédure officielle Microsoft précise que les organisations EU/EFTA/UK qui avaient opté pour l'ancien dispositif doivent **réopter explicitement** sur le nouveau toggle. La continuité n'est pas automatique.

**Scénario 2 : activer Claude pour l'ensemble de l'écosystème Copilot.** Le toggle global passe sur ON après acceptation des conditions Anthropic comme sous-traitant Microsoft. Cette acceptation engage l'organisation. Trois actions complémentaires à anticiper : faire valider la décision par le DPO, mettre à jour le registre des sous-traitants au titre du RGPD, et réviser l'AIPD si une analyse d'impact existe pour Copilot. Procédure officielle : Microsoft 365 admin center, Copilot, Settings, View All, *AI providers operating as Microsoft subprocessors*, sélectionner *Enable Anthropic as a Microsoft subprocessor*. Microsoft propose en outre un ciblage par utilisateurs ou groupes Entra ID, ce qui permet d'ouvrir Claude à des populations restreintes (équipe innovation, R&D, juridique pilote) avant un déploiement plus large.

**Scénario 3 : activer Claude de manière encadrée.** L'organisation active le toggle global pour disposer du modèle dans les fonctions volontaires (Researcher, Copilot Studio), mais combine cette activation avec une politique interne explicite sur les types de contenus autorisés. Cette posture suppose un travail de gouvernance amont (sensibilisation des utilisateurs, mise à jour des chartes, exclusion des données les plus sensibles via classification Purview) plutôt qu'un simple paramétrage. C'est probablement la voie la plus défendable pour une DSI qui veut explorer la valeur des modèles Anthropic sans engager l'ensemble de la base utilisateur sans précaution.

À noter également : Microsoft a indiqué qu'un réglage complémentaire spécifique aux applications Microsoft 365 (Word, Excel, PowerPoint) pour les tenants EU/EFTA/UK est en cours de déploiement. La date exacte de bascule applicable à votre tenant figure dans le Message Center MC1269241 et peut varier d'une organisation à l'autre. C'est cette notification qui fait foi pour votre tenant, pas les communications généralistes circulant en dehors.

## Un signal stratégique au-delà du paramètre

Au-delà du cas Anthropic, l'épisode dit quelque chose de la trajectoire Copilot. Microsoft assume désormais ouvertement une stratégie multi-modèles, où OpenAI cohabite avec Anthropic dans les expériences phares. Pour les architectes IT, cela signifie que Copilot M365 n'est plus un produit à modèle unique, et que la question "quel modèle traite ma donnée" devient une question de gouvernance permanente, pas un paramètre d'installation à figer une fois pour toutes.

C'est aussi un avertissement pour la suite. Si Anthropic est aujourd'hui le premier sous-traitant non OpenAI à entrer dans Copilot, d'autres pourraient suivre, et chaque nouveau sous-traitant introduira potentiellement le même type d'arbitrage : performance contre conformité de résidence, fonctionnalités exclusives contre garanties EUDB. Les DSI qui auront construit un cadre de décision clair pour Anthropic disposeront de la grille de lecture pour les suivants. Celles qui esquiveront la décision devront la rejouer à chaque vague.

Le sujet n'est donc pas le modèle. Le sujet est la maturité du dispositif de gouvernance AI dans l'organisation. Le défaut désactivé pour les tenants français n'est pas une protection définitive, c'est un sursis qui rend la décision possible dans de bonnes conditions. À chacun d'en faire bon usage.

## Sources

- [Anthropic as a subprocessor for Microsoft Online Services (Microsoft Learn)](https://learn.microsoft.com/en-us/copilot/microsoft-365/connect-to-ai-subprocessor)
- [Copilot in Microsoft 365 apps with Anthropic models (Microsoft Learn)](https://learn.microsoft.com/en-us/microsoft-365/copilot/copilot-anthropic-apps)
- [Expanding model choice in Microsoft 365 Copilot (Microsoft 365 Blog)](https://www.microsoft.com/en-us/microsoft-365/blog/2025/09/24/expanding-model-choice-in-microsoft-365-copilot/)
- Microsoft 365 Message Center, notification MC1269241 (consultable depuis le Microsoft 365 admin center du tenant, mise à jour du 17 avril 2026)