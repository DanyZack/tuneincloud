---
title: "Copilot : qui téléverse des agents avancés ? Choix au 25/10"
description: "Un nouveau paramètre Copilot restreint le téléversement d'agents avec actions ou serveur MCP. Sans choix au 25 octobre 2026, il reste ouvert à tous."
pubDate: 2026-10-19
category: "actualites"
subcategory: "breves"
heroImage: "/images/hero/copilot-televersement-agents-avances.webp"
---
Microsoft demande aux administrateurs de décider, avant le 25 octobre 2026, qui peut téléverser des agents et plugins « avancés » dans Microsoft 365 Copilot. Sans réponse, la porte reste ouverte à tous les utilisateurs.

![Banniere](/images/banarticle/breve-copilot1.png)

## Un paramètre, trois options, une valeur par défaut permissive

Le réglage **Advanced package uploads** se trouve dans le Centre d'administration Microsoft 365, sous **Copilot > Settings**. Trois options : **tous les utilisateurs**, **aucun utilisateur**, ou **des utilisateurs et groupes Entra ID précis**. Déploiement en disponibilité générale (GA) mondiale, prévu du 25 septembre à fin octobre 2026.

La distinction tient au contenu du package. Un package est **avancé** s'il contient un **agent déclaratif avec actions** ou un **serveur MCP**. Les autres sont **basiques** et restent téléversables sans changement. Le paramètre ne vise que les packages téléversés par les utilisateurs, pas les agents conçus par Microsoft ou des éditeurs tiers. Il n'est pas rétroactif : seuls les packages téléversés après son arrivée sont concernés. Les packages des utilisateurs apparaissent comme « shared » dans le Centre d'administration, avec leurs composants.

Le vrai sujet est la valeur par défaut. Si aucune option n'est choisie au 25 octobre, le comportement actuel est conservé : **tout utilisateur peut téléverser un agent avancé**. Or une action ou un serveur MCP, c'est précisément ce qui permet à un agent d'appeler une API ou un service externe avec le contexte de l'utilisateur. Ne rien faire, c'est laisser chacun brancher Copilot sur le point de terminaison de son choix.

## Avis d'expert

- **Zero Trust** : choisissez **des utilisateurs et groupes précis**, avec un groupe Entra ID dédié aux développeurs d'agents et une revue des actions et serveurs MCP par l'équipe sécurité avant tout ajout au groupe. Vos agents méritent la même rigueur que vos applications, ce que je défendais déjà dans mon dossier sur [Microsoft Entra Agent ID](/blog/dossier-2026-04-15-entra-agent-id/).
- ⚠️ **Aucun utilisateur** est l'option la plus sûre, mais elle risque de bloquer aussi vos propres équipes qui testent des agents avec le Microsoft 365 Agents Toolkit, que Microsoft inclut dans le périmètre sans détailler l'effet. Prévoyez l'exception.
- 💡 **Registre de plugins** : un catalogue central arrive (fin septembre à fin octobre 2026), puis un bouton **Plugins** remplace **Agents**, **Agents & Skills** et **Customize** d'ici fin novembre. S'il embarque un serveur MCP, un plugin téléversé par un utilisateur est lui aussi « avancé ».
- **Côté administration**, les plugins se découvrent, se publient, se gouvernent et se gèrent de façon centrale sous **Tools**, dans le Centre d'administration Microsoft 365 et dans **Microsoft Agent 365**. Les agents restent gérés dans les **Agents settings**. Aucune action ni migration technique n'est requise. Microsoft recommande de mettre à jour documentation interne, formation et supports d'adoption qui mentionnent **Agents**, **Agents & Skills** ou **Customize**, de préparer les utilisateurs au bouton **Plugins** et de revoir quelles capacités de plugins rendre disponibles selon votre gouvernance.
- Comme pour l'[activation de Claude dans Copilot](/blog/2026-04-29-article-claude-copilot-m365/), la décision mérite une trace écrite : un paramètre laissé à sa valeur par défaut reste un choix, simplement non documenté.

## Source

- MC1472007 : Manage who can upload advanced agents and plugins (Message Center Microsoft 365)
- [Manage Microsoft Copilot Settings (Microsoft Learn)](https://learn.microsoft.com/en-us/microsoft-365/copilot/microsoft-365-copilot-page)
- [Upload Microsoft Copilot custom agents (Microsoft Learn)](https://learn.microsoft.com/en-us/microsoft-365/copilot/agent-essentials/agent-lifecycle/agent-upload-agents)
- MC1484008 : Introducing the Microsoft plugin registry for Microsoft Copilot experiences (Message Center Microsoft 365)
- [Introducing the plugin registry, one place to discover and govern plugins for Microsoft Copilot (Tech Community, 30/09/2026)](https://techcommunity.microsoft.com/blog/microsoft-copilot-blog/introducing-the-plugin-registry---one-place-to-discover-and-govern-plugins-for-m/4559682)
