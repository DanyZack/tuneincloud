---
title: "Microsoft Entra Agent ID : gouverner les agents IA comme des identités à part entière"
description: "Entra Agent ID étend l'IAM Microsoft aux agents IA : Conditional Access, Identity Protection, gouvernance du cycle de vie. État de l'art, limitations et roadmap à connaître avant de déployer."
pubDate: 2026-04-15
category: "dossiers"
heroImage: "https://learn.microsoft.com/fr-fr/entra/agent-id/media/index/hero-image-security-flow.png"
---

![Banniere](/images/banarticle/dossier-entraagentid.png)

Vos utilisateurs ont une identité dans Entra ID. Vos applications ont des service principals. 
Vos agents IA, eux, avaient jusqu'ici... un app registration bricolé, ou rien du tout.
Microsoft Entra Agent ID comble ce vide, et la question n'est pas de savoir si vous allez
en avoir besoin, mais quand.

![SCHEMA 1](/images/schemas/entraagentid-archiglobale.png)
**Schéma 1** : *Architecture générale Entra Agent ID*

## Contexte et enjeux

### L'agent sprawl : le nouveau shadow IT

On estime à 1,3 milliard le nombre d'agents IA déployés dans les organisations d'ici trois
ans. Le phénomène est déjà en cours : des agents sont créés dans Copilot Studio par les
métiers, dans Azure AI Foundry par les développeurs, dans des outils tiers sans que l'IT en
soit informé. Chacun accède à des ressources, dispose de permissions, et génère des actions sans identité formelle, sans propriétaire assigné, sans traçabilité.

C'est l'"agent sprawl" : la prolifération non contrôlée d'agents autonomes, avec les mêmes
risques que le shadow IT SaaS des années 2010, mais avec un facteur aggravant. Un agent peut
agir de manière autonome, à grande échelle, à toute heure. Une identité compromise ou un
agent mal configuré ne génère pas une fuite de données ponctuelle : il peut exécuter des
actions en continu sur des systèmes sensibles.

### Ce que les modèles d'identité existants ne couvrent pas

Les identités utilisateurs sont conçues pour des humains : elles supposent une authentification
interactive, un MFA, un cycle de vie lié à un contrat de travail. Les service principals /
app registrations sont conçus pour des applications stables, maintenues par l'IT, avec un
cycle de vie connu.

Les agents IA brisent ces deux modèles :

- Un agent peut être créé dynamiquement par un utilisateur en quelques clics (Copilot Studio)
  ou par un pipeline en quelques secondes (Foundry). Des milliers d'instances peuvent être
  créées et détruites en une journée.
- Un agent peut agir de manière autonome (accès à Microsoft Graph, envoi d'emails, création
  de fichiers) ou sur délégation d'un utilisateur humain, avec des permissions distinctes
  dans les deux cas.
- La notion de "propriétaire" est floue : qui est responsable si un agent Copilot Studio créé
  par un utilisateur RH accède à des données financières ?

Microsoft Entra Agent ID répond à ces questions en introduisant un nouveau type d'objet
d'identité, distinct des utilisateurs et des applications, avec ses propres primitives de
sécurité et de gouvernance.

---

## Architecture et fonctionnement

### Le modèle d'objet : Blueprint, Agent Identity, Agent User

Entra Agent ID introduit quatre nouveaux types d'objets dans le répertoire Entra.

**L'Agent Identity Blueprint** est le modèle : un template à partir duquel sont créées les
identités agents individuelles. Il définit les politiques de sécurité qui s'appliquent à
toutes ses instances filles. Techniquement, il se compose d'une application (Blueprint App)
et d'un principal (Blueprint Principal), par analogie avec la relation App Registration /
Enterprise Application. Désactiver un blueprint bloque l'authentification de toutes ses
identités enfants.

**L'Agent Identity** est l'identité individuelle d'un agent. C'est un objet immuable avec un
Object ID unique, comme un compte utilisateur. Elle hérite des politiques du blueprint, et
peut disposer de permissions propres (Microsoft Graph, rôles Azure RBAC, rôles applicatifs).
Un agent peut avoir une ou plusieurs identités selon son déploiement.

**L'Agent User** est optionnel. Il s'agit d'un compte utilisateur Entra spécial, couplé en
direct avec une Agent Identity, permettant à l'agent d'opérer avec un contexte utilisateur
quand les systèmes cibles l'exigent. C'est le support du flux OBO (voir section
authentification).

**Le Blueprint Principal** est la représentation du blueprint dans un tenant spécifique,
analogue à l'Enterprise Application d'un app registration multi-tenant.

**Agents "classic" vs agents "modern"** : les agents créés avant la plateforme Entra Agent ID
(app registrations standard) sont qualifiés de "classic". Ils apparaissent dans l'Agent
Registry avec la mention "Has Agent ID: No". Ils ne bénéficient pas des protections Entra
Agent ID (Conditional Access for Agents, Identity Protection). Microsoft a annoncé un outil
de migration, sans date publiée à ce jour.

![SCHEMA 2](/images/schemas/entraagentid-hierachie.png)

### Les deux flux d'authentification

Entra Agent ID supporte deux modèles d'authentification, dont les implications sur la
gouvernance et la licence sont fondamentalement différentes.

**Flux OBO - On-Behalf-Of (délégation)**

L'agent reçoit un token délégué de l'utilisateur humain et agit avec les permissions de cet
utilisateur. C'est le modèle d'une automatisation Power Automate : l'agent ne dispose pas
de permissions propres, il "emprunte" celles de l'utilisateur sponsor. Ce flux est le seul
couvert par Agent 365 à la disponibilité générale du 1er mai 2026.

Avantage : traçabilité forte, consentement utilisateur explicite, conformité naturelle.
Limite critique : si l'utilisateur quitte l'organisation ou voit sa licence supprimée,
l'agent cesse de fonctionner. C'est le problème historique des Power Automate cloud flows
liés à un compte nominatif.

**Flux autonome - Agent Identity Authentication (app-only)**

L'agent s'authentifie avec ses propres credentials (credentials du blueprint), dispose de
ses propres permissions et agit sans contexte utilisateur. C'est le modèle pour les tâches
planifiées, la surveillance, les actions sans supervision humaine. Ce flux reste en preview
Frontier à date du 15 avril 2026, sans date de GA annoncée.

Tous les agents opèrent en tant que confidential clients. Les flux interactifs (redirect
URL, public client) ne sont pas supportés pour les agents.

---

## Les quatre piliers de sécurité

### 1. Conditional Access for Agents

Il s'agit très certainement de la fonctionnalitée principales pour les équipes sécurité. L'extension du Conditional Access aux agents permet d'appliquer des politiques adaptatives
sur les tentatives d'accès des agents aux ressources. Les politiques s'articulent autour de
deux scénarios principaux.

**Scénario A - contrôle d'accès positif** : seuls les agents approuvés peuvent accéder à
une ressource donnée. La mise en œuvre recommandée passe par les Custom Security Attributes,
assignés à l'agent et à la ressource, puis ciblés dans une politique de blocage avec
exclusion. L'object picker dans l'admin center permet également une sélection directe par
agent identity ou blueprint.

**Scénario B - blocage basé sur le risque** : les agents détectés comme à risque élevé sont
bloqués automatiquement via une condition "Agent risk" (High / Medium / Low), alimentée par
Identity Protection. Les managed policies Microsoft fournissent une baseline sécurisée pour
ce scénario.

Point d'attention : le Conditional Access s'applique à **l'Agent Identity et à l'Agent User**
lors de leurs tentatives d'acquisition de token, pas au Blueprint lui-même. La politique se
configure sur le Blueprint pour couvrir toutes ses identités filles, mais c'est bien
l'identité individuelle qui est évaluée.

### 2. Identity Protection for Agents

Le moteur de détection des risques Entra est étendu aux agents. Les détections disponibles
en preview couvrent :

- **Accès inhabituel à des ressources** : l'agent accède à une ressource qu'il ne consulte
  pas habituellement (Unfamiliar resource access).
- **Pic de connexions** : l'agent effectue significativement plus de sign-ins que sa
  fréquence normale (Sign-in spike).

D'autres détections sont annoncées sans calendrier précis. Le rapport "Risky agents" dans
l'admin center Identity Protection donne une vue par niveau de risque (High / Medium / Low),
avec historique des détections sur 90 jours via les Risk Detections.

Les actions disponibles après investigation : Confirm compromise (déclenche les politiques
Conditional Access configurées en blocage sur High risk), Confirm safe (efface le risque,
informe le modèle ML), Dismiss risk (efface sans feedback au modèle).

ID Protection for Agents est inclus dans la licence **Microsoft Entra P2** pendant la
preview.

### 3. Identity Governance for Agents

La gouvernance couvre l'ensemble du cycle de vie d'une identité agent, avec les mêmes
mécanismes que pour les identités humaines.

**Sponsor obligatoire** : chaque agent doit avoir un sponsor humain. La personne
responsable de ses permissions et de ses actions. Les Lifecycle Workflows automatisent les
notifications et la désactivation de l'agent en cas de départ ou de changement de rôle du
sponsor. Un agent sans sponsor est identifiable dans le registre.

**Access packages** : les permissions accordées à un agent peuvent être encapsulées dans des
access packages (timebound, avec processus d'approbation), identiques à ceux utilisés pour
les utilisateurs humains dans Entitlement Management.

**Expiration automatique** : l'accès d'un agent ne persiste pas indéfiniment. La gouvernance
impose que les droits soient intentionnels, auditables et limités dans le temps.

### 4. Network Controls for Agents

Via l'intégration avec Global Secure Access (Microsoft Entra Internet Access), des contrôles
réseau peuvent être appliqués au trafic généré par les agents :

- Logging de l'activité réseau des agents pour audit et détection de menaces.
- Filtrage par catégorie web (ex. : bloquer l'accès des agents à des sites dans la catégorie
  "Artificial Intelligence" non approuvés).
- Filtrage par type de fichier pour prévenir l'exfiltration.
- Détection et blocage des attaques par prompt injection tentant de manipuler le comportement
  de l'agent via des instructions malveillantes.
- Intégration avec Copilot Studio via le Power Platform Admin Center.

Ces contrôles réseau sont en preview et nécessitent une licence **Microsoft Entra Internet
Access** (incluse dans l'Entra Suite ou le bundle E7).

---

## Prérequis et licences

![SCHEMA 3](/images/schemas/entraagentid-licence.png)

**Conditions d'accès à la preview :**

- Licence **Microsoft 365 Copilot** active sur le tenant (au minimum une licence).
- Activation du programme **Frontier** : M365 admin center > Copilot > Settings > User access
  > Copilot Frontier. Depuis novembre 2025, les assignments se font par utilisateur individuel.
- Les tenants Frontier reçoivent automatiquement **25 licences Agent 365** valides jusqu'en
  décembre 2026.

**Modèle de licence à la GA (1er mai 2026) :**

Agent 365 est un SKU distinct, non inclus dans les plans M365 existants, y compris E5. Il
est disponible à 15 $/utilisateur/mois en standalone, ou inclus dans M365 E7 à
99 $/utilisateur/mois (annoncé le 9 mars 2026). La licence est assignée aux utilisateurs
humains, pas aux agents eux-mêmes : elle couvre l'ensemble des agents OBO opérant pour le
compte d'un utilisateur licensé. Les agents autonomes (Agent Identity Authentication) ne sont
pas couverts par ce modèle de licence à la GA, leur pricing n'est pas encore annoncé.

---

## Limitations actuelles (Preview - avril 2026)

### Limitations fonctionnelles

**Agents "classic" exclus des protections avancées.** Les agents existants créés comme app
registrations standard ne bénéficient pas du Conditional Access for Agents ni de l'Identity
Protection for Agents. La migration vers des agent identities "modernes" n'est pas encore
disponible en self-service. Microsoft annonce un outil, sans date publiée.

**Flux autonome (app-only) hors scope GA.** Le scénario où l'agent agit avec sa propre
identité, indépendamment de tout utilisateur humain, reste en Frontier preview. C'est
pourtant le scénario le plus puissant (agents planifiés, monitoring autonome, "AI teammates"
avec mailbox et OneDrive propres). Les licences Frontier ont été silencieusement prolongées
jusqu'à décembre 2026, signal clair que ce scénario ne sera pas GA de sitôt.

**Détections Identity Protection limitées.** Seules deux détections sont documentées à ce
jour (accès inhabituel, pic de connexions). La couverture est nettement inférieure à ce qui
existe pour les utilisateurs humains. D'autres détections sont annoncées "over time".

**Posture de sécurité et détection/réponse en preview post-GA.** Security posture management
pour Foundry et Copilot Studio, ainsi que les capacités de détection et réponse, resteront
en preview au-delà du 1er mai 2026. Le "Agent 365 tools gateway" (protection runtime) entre
en preview en avril 2026, ce qui signifie qu'il ne sera pas GA à la date de lancement.

**Agent Registry dans Entra admin center retiré le 1er mai 2026.** Les blades "Agent
registry" et "Agent collections" dans l'admin center Entra sont retirés à la date de GA
d'Agent 365. La vue consolidée migre vers l'admin center M365. Les agents enregistrés via
l'API Graph actuelle devront être ré-enregistrés via la nouvelle API Agent 365 (l'ancienne
est dépréciée).

**Pas de SLA en preview.** Aucun engagement de disponibilité ou de performance pendant la
période de preview. À prendre en compte avant tout déploiement en production.

### Limitations structurelles à anticiper

**Le modèle OBO hérite des faiblesses du modèle délégué.** Un agent OBO cesse de fonctionner
si l'utilisateur sponsor perd sa licence ou quitte l'organisation, exactement comme un cloud
flow Power Automate lié à un compte nominatif. La résolution passe par des comptes "service
accounts" dédiés, ce qui n'est ni élégant ni scalable pour des milliers d'agents.

**La complexité du modèle objet nécessite une montée en compétence.** La relation Blueprint /
Blueprint Principal / Agent Identity / Agent User est conceptuellement proche de App
Registration / Enterprise Application, mais avec une couche de token exchange multi-étapes qui n'a pas d'équivalent dans les modèles existants.
Les SDKs officiels (Microsoft.Identity.Web, Agent ID SDK) sont fortement recommandés : toute
implémentation manuelle du protocole OAuth est décrite comme "complex and error-prone" par
Microsoft lui-même.

**L'écosystème partenaire est encore limité.** La documentation mentionne un "rapidly growing
ecosystem of partners" pour l'Agent Identity Platform, mais la liste effective de partenaires
intégrés reste restreinte. Les agents tiers non construits sur Copilot Studio ou Foundry
nécessitent une intégration via API/SDK, avec une charge de développement significative.

---

## Ce qui arrive : roadmap et signaux

### Agent 365 GA - 1er mai 2026

Le plan de contrôle OBO devient généralement disponible. En pratique : inventaire unifié
dans l'admin center M365, Conditional Access for Agents opérationnel, Identity Governance
(lifecycle, sponsors, access packages), audit logs des agents. C'est la fondation de
gouvernance, pas encore le "digital worker" autonome.

### Agents autonomes avec identité propre - horizon Ignite 2026

Les "AI teammates" avec mailbox, OneDrive et identité indépendante restent dans Frontier
preview jusqu'à au moins fin 2026. Les Frontier trial licenses ont été prolongées jusqu'en
décembre 2026, ce qui positionne Ignite 2026 (novembre) comme la prochaine étape naturelle
d'annonce sur ce sujet. Le modèle de licence pour ces agents pleinement autonomes n'est pas
encore défini (combinaison de per-user, per-agent, et capacity-based semble probable).

### Migration des agents "classic"

Un outil de migration des app registrations existants vers des agent identities "modernes"
est annoncé sans date. Priorité opérationnelle : auditer maintenant quels agents du tenant
sont "classic" (visible dans l'Agent Registry avec "Has Agent ID: No") pour anticiper le
scope de la migration.

### Détections Identity Protection étendues

Le catalogue de détections pour agents va s'enrichir progressivement, par analogie avec
l'évolution historique d'Identity Protection pour les utilisateurs. Aucune feuille de route
publique détaillée à date.

---

## Points d'attention pour un décideur informatique

### Commencer par la visibilité, pas par le contrôle

La première action utile est un audit du tenant : combien d'agents existent, sur quelle
plateforme ont-ils été créés, ont-ils un Agent ID ou sont-ils "classic", qui en est le
propriétaire ? Cette visibilité est disponible maintenant dans l'Agent Registry, sans
nécessiter de licence Agent 365. C'est le prérequis à toute décision de gouvernance.

### Ne pas confondre Agent 365 et la plateforme de construction d'agents

Agent 365 est un plan de contrôle : il observe, gouverne et sécurise. Il ne construit pas
d'agents. La construction reste dans Copilot Studio (low-code), Microsoft Foundry
(pro-code), ou des outils tiers. Les coûts de consommation (tokens, messages) sont facturés
séparément sur la facture Azure ou Copilot Studio. Agent 365 à 15 $/mois/utilisateur ne
couvre que la gouvernance.

### Aligner les parties prenantes maintenant

La gouvernance des agents touche simultanément le RSSI (risques d'identité, exfiltration),
la DSI (intégration IT, lifecycle management), les équipes conformité (audit, RGPD), et les
métiers (qui créent des agents Copilot Studio sans en informer l'IT). L'alignement sur le
modèle de propriété (qui est sponsor de quel agent), les standards d'accès et les exigences
d'audit doit précéder le déploiement, pas le suivre.

### Traiter le flux OBO avec les mêmes précautions qu'un Power Automate cloud flow

Un agent OBO est fonctionnellement équivalent à un cloud flow lié à un compte utilisateur.
Les organisations qui ont déjà géré le problème des "zombie flows" savent ce que cela
implique : préférer un compte de service dédié comme sponsor quand possible, documenter
les dépendances, planifier la continuité en cas de départ du sponsor.

### Le preview sans SLA est un vrai risque en production

Toutes les fonctionnalités Entra Agent ID sont en preview. Aucun SLA de disponibilité.
Les comportements peuvent changer substantiellement avant la GA. Déployer en production
critique requiert une tolérance aux interruptions non planifiées et une stratégie de
fallback.

---

## Synthèse

| Dimension | Situation actuelle (avril 2026) |
|---|---|
| État général | Public Preview - pas de SLA |
| Flux OBO | GA le 1er mai 2026 (Agent 365) |
| Flux autonome | Preview Frontier - horizon Ignite 2026 |
| Licence d'accès preview | M365 Copilot + Frontier activé |
| Licence GA | Agent 365 $15/u/mois · M365 E7 $99/u/mois |
| Agents "classic" | Non protégés par Agent ID - migration à venir |
| Sponsor obligatoire | Oui, dès la preview |
| Intégration native | Copilot Studio, Foundry, Security Copilot |
| Intégration tiers | Via API/SDK - charge de dev non négligeable |
| Détections IP disponibles | 2 (accès inhabituel, pic de connexions) |

La plateforme est réelle, la direction est claire, et la problématique qu'elle adresse est
urgente. Ce qui n'est pas encore là, c'est la maturité pour un déploiement en production
critique - et la partie la plus prometteuse du produit (les agents avec identité propre)
reste derrière le rideau du programme Frontier.

---

## Sources et références

- [What is Microsoft Entra Agent ID — Microsoft Learn](https://learn.microsoft.com/en-us/entra/agent-id/identity-professional/microsoft-entra-agent-identities-for-ai-agents) — vérifié le 15 avril 2026
- [What are agent identities — Microsoft Learn](https://learn.microsoft.com/en-us/entra/agent-id/identity-platform/what-is-agent-id) — vérifié le 15 avril 2026
- [Governing Agent Identities — Microsoft Entra ID Governance](https://learn.microsoft.com/en-us/entra/id-governance/agent-id-governance-overview) — vérifié le 15 avril 2026
- [ID Protection for Agents — Microsoft Learn](https://learn.microsoft.com/en-us/entra/id-protection/concept-risky-agents) — vérifié le 15 avril 2026
- [Conditional Access for Agent Identities — Microsoft Learn](https://learn.microsoft.com/en-us/entra/identity/conditional-access/agent-id) — vérifié le 15 avril 2026
- [Agent identity blueprints — Microsoft Learn](https://learn.microsoft.com/en-us/entra/agent-id/identity-platform/agent-blueprint) — vérifié le 15 avril 2026
- [Microsoft Entra releases and announcements — Microsoft Learn](https://learn.microsoft.com/en-us/entra/fundamentals/whats-new) — vérifié le 15 avril 2026
- [Microsoft Agent 365 overview — Microsoft Learn](https://learn.microsoft.com/en-us/microsoft-agent-365/overview) — vérifié le 15 avril 2026
- [Authentication protocols in agents — Microsoft Learn](https://learn.microsoft.com/en-us/entra/agent-id/agent-oauth-protocols) — vérifié le 15 avril 2026
- [Surfing the AI Wave : Manage, Govern, and Protect AI Agents — Microsoft Tech Community](https://techcommunity.microsoft.com/blog/microsoft-entra-blog/surfing-the-ai-wave-manage-govern-and-protect-ai-agents-with-microsoft-entra-age/2464407) — décembre 2025
- [Agent 365 Licensing — SAMexpert](https://samexpert.com/agent-365/) — mars 2026 (croisé avec Microsoft Learn)
- [May 1 GA is not yet the final frontier for Agent 365 — The Licensing Guide](https://licensing.guide/may-1-ga-is-not-yet-the-final-frontier-for-agent-365/) — mars 2026 (analyse indépendante)
- [Microsoft Entra Agent ID : A Practical Guide to Blueprints — Thalpius Security Blog](https://thalpius.com/2026/03/28/microsoft-entra-agent-id-a-practical-guide-to-blueprints-and-agent-identities/) — mars 2026
