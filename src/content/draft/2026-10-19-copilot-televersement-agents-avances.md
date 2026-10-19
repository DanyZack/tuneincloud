---
title: "Copilot : qui téléverse des agents avancés ? Choix au 25/10"
description: "MC1472007 : un paramètre Copilot restreint le téléversement d'agents avec actions ou serveur MCP. Sans choix au 25 octobre 2026, il reste ouvert à tous."
pubDate: 2026-10-19
category: "actualites"
subcategory: "breves"
heroImage: "/images/hero/copilot-televersement-agents-avances.webp"
---
Microsoft demande aux administrateurs de décider, avant le 25 octobre 2026, qui peut téléverser des agents et plugins « avancés » dans Microsoft 365 Copilot. Sans réponse, la porte reste ouverte à tous les utilisateurs.

![Banniere](/images/banarticle/breve-copilot1.png)

## Un paramètre, trois options, une valeur par défaut permissive

Annoncé par le message **MC1472007**, le réglage **Advanced package uploads** se trouve dans le Centre d'administration Microsoft 365, sous **Copilot > Settings**. Trois options : **tous les utilisateurs**, **aucun utilisateur**, ou **des utilisateurs et groupes Entra ID précis**. Le déploiement, annoncé en disponibilité générale (GA) mondiale, a commencé le 25 septembre 2026 et doit s'achever fin octobre. Le message ne nomme ni rôle d'administration ni licence : à vérifier dans votre tenant.

La distinction tient au contenu du package. Un package est **avancé** s'il contient un **agent déclaratif avec actions** ou un **serveur MCP** (Model Context Protocol) ; tous les autres sont **basiques** et restent téléversables sans changement. Le paramètre ne vise que les packages téléversés par les utilisateurs, pas les agents conçus par Microsoft ou des éditeurs tiers. Il n'est pas rétroactif : seuls les packages téléversés après l'arrivée du contrôle sont concernés. Les packages des utilisateurs apparaissent comme « shared » dans le Centre d'administration, avec leurs composants.

Le vrai sujet est la valeur par défaut. Si aucune option n'est choisie au 25 octobre, le comportement actuel est conservé : **tout utilisateur peut téléverser un agent avancé**. Or une action ou un serveur MCP, c'est précisément ce qui permet à un agent d'appeler une API ou un service externe avec le contexte de l'utilisateur. Ne rien faire, c'est laisser chacun brancher Copilot sur le point de terminaison de son choix.

## Avis d'expert

- **Zero Trust** : choisissez **des utilisateurs et groupes précis**, avec un groupe Entra ID dédié aux développeurs d'agents et une revue des actions et serveurs MCP par l'équipe sécurité avant tout ajout au groupe. Vos agents méritent la même rigueur que vos applications, ce que nous défendions déjà dans notre dossier sur [Microsoft Entra Agent ID](/blog/dossier-2026-04-15-entra-agent-id/).
- ⚠️ **Aucun utilisateur** est l'option la plus sûre, mais elle risque de bloquer aussi vos propres équipes qui testent des agents avec le Microsoft 365 Agents Toolkit, que le message inclut dans son périmètre sans détailler l'effet. Prévoyez l'exception.
- 💡 Avec **MC1484008**, Microsoft déploie un **registre de plugins** (fin septembre à fin octobre 2026). Un plugin peut regrouper agents, compétences, connecteurs et serveurs MCP : le téléversement avancé d'aujourd'hui est le plugin de demain.
- Comme pour l'[activation de Claude dans Copilot](/blog/2026-04-29-article-claude-copilot-m365/), la décision mérite une trace écrite : un paramètre laissé à sa valeur par défaut reste un choix, simplement non documenté.

## Source

- [MC1472007 : Manage who can upload advanced agents and plugins (Message Center, miroir mc.merill.net)](https://mc.merill.net/message/MC1472007)
- [Manage Microsoft Copilot Settings (Microsoft Learn)](https://learn.microsoft.com/en-us/microsoft-365/copilot/microsoft-365-copilot-page)
- [Upload Microsoft Copilot custom agents (Microsoft Learn)](https://learn.microsoft.com/en-us/microsoft-365/copilot/agent-essentials/agent-lifecycle/agent-upload-agents)
- [MC1484008 : Introducing the Microsoft plugin registry for Microsoft Copilot experiences (Message Center, miroir mc.merill.net)](https://mc.merill.net/message/MC1484008)
- [Introducing the plugin registry, one place to discover and govern plugins for Microsoft Copilot (Tech Community, 30/09/2026)](https://techcommunity.microsoft.com/blog/microsoft-copilot-blog/introducing-the-plugin-registry---one-place-to-discover-and-govern-plugins-for-m/4559682)
