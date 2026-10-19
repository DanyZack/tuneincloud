# Rapport de relecture : Copilot, qui téléverse des agents avancés ? Choix au 25/10

**Fichier** : `src/content/draft/2026-10-19-copilot-televersement-agents-avances.md`
**Format** : Brève (`actualites` / `breves`)
**Date de publication prévue** : 2026-10-19
**Date de relecture** : 2026-10-19
**Mode** : brouillon (corrections en place, aucune opération git)
**Verdict global (après deuxième passe)** : ✅ Publiable. Les faits de MC1472007 sont désormais vérifiés sur le texte intégral du Message Center fourni par Daniel (voir « Deuxième passe, 2026-10-19 » en fin de rapport). Verdict de la première passe : ⚠️ publiable après corrections.

## Synthèse

La brève est juste sur l'essentiel : définition avancé/basique, trois options, périmètre (packages téléversés par l'organisation, hors agents Microsoft et tiers), échéance du 25 octobre et valeur par défaut permissive, tous concordants sur 6 à 8 extraits indépendants. Quatre écarts ont été corrigés : le chemin de console traduit (libellés français non vérifiés), un statut « sans phase preview » remplacé par le statut GA effectivement annoncé, une mention de rôle qui contredisait la phrase où elle se trouvait, et une liste de boutons incomplète pour MC1484008. Une déduction (impact sur Agents Toolkit) était présentée comme un fait. Elle est maintenant donnée comme hypothèse. Le point faible reste structurel : ni le Message Center ni Learn n'ont pu être lus en direct.

## Pré-contrôles mécaniques

| Contrôle | Résultat |
|---|---|
| Tirets cadratins | 0 occurrence (avant et après) |
| Faute « brebes » | aucune, `subcategory: "breves"` |
| Liens internes | `/blog/dossier-2026-04-15-entra-agent-id/` : fichier présent ; `/blog/2026-04-29-article-claude-copilot-m365/` : fichier présent |
| Frontmatter | `category` et `subcategory` valides (Zod) ; `title` 59 car. ; `description` 152 car. ; **aucune modification du frontmatter** ; `pubDate` 2026-10-19 inchangée |
| Nombre de mots du corps | 494 avant, 500 après (fourchette brève 250-500 : conforme, à la limite haute) |
| Bannière | `/images/banarticle/breve-copilot1.png` : **fichier absent** (nouvelle série, seul `article-copilot1.png` existe). À produire par l'illustrateur |
| `heroImage` | vide (`""`), toléré par le schéma et les gabarits (test de vérité), à fournir par l'illustrateur |

## 1. Sources

Contexte d'accès : `learn.microsoft.com` est refusé par le proxy de sortie (403 sur CONNECT, refus de politique, non contourné) ; `mc.merill.net` et `techcommunity.microsoft.com` ne résolvent pas en DNS via WebFetch ; l'API GitHub n'est pas ouverte sur les dépôts `MicrosoftDocs` dans cette session ; navigateur intégré indisponible. Vérification faite par recoupement d'extraits WebSearch (miroirs Message Center : mc.merill.net, msmessagecenter.com, cloudscout, pupuweb, m365admin.handsontek, mwpro, topedia, kmo.partners).

| URL | État | Dernière vérification | Commentaire |
|---|---|---|---|
| `mc.merill.net/message/MC1472007` | ⚠️ Non lu en direct | 2026-10-19 | Indexé avec le titre exact. Contenu recoupé sur 8 extraits : options, définition avancé/basique, périmètre, 25/10, défaut permissif, « General Availability (Worldwide) » concordants. Un miroir indique un début au 12/10/2026 (voir décision 1) |
| `learn.microsoft.com/en-us/microsoft-365/copilot/microsoft-365-copilot-page` | ⚠️ Non lu en direct (403 proxy) | 2026-10-19 | Indexé sous « Manage Microsoft Copilot Settings ». Extrait citant le chemin **Copilot > Settings > All settings > Advanced package uploads** |
| `learn.microsoft.com/en-us/microsoft-365/copilot/agent-essentials/agent-lifecycle/agent-upload-agents` | ⚠️ Non lu en direct (403 proxy) | 2026-10-19 | Indexé sous « Upload Microsoft Copilot custom agents ». L'extrait décrit le téléversement de ZIP par l'admin (Agents > Upload custom agent) ; il ne mentionne pas le paramètre avancé. Source de contexte, pertinente |
| `mc.merill.net/message/MC1484008` | ⚠️ Non lu en direct | 2026-10-19 | Indexé avec le titre exact, publié le 30/09/2026. Calendrier concordant ; liste des boutons remplacés : Agents, **Agents & Skills**, Customize (corrigé) |
| `techcommunity.microsoft.com/.../4559682` | ⚠️ Non lu en direct (DNS) | 2026-10-19 | Indexé. Contenu (plugins regroupant agents, compétences, connecteurs, serveurs MCP) concordant avec les pages Learn `copilot-plugins/overview` vues en extrait |

Aucune URL n'a été constatée en 404 ou redirigée, mais aucune n'a pu être résolue. Les sources primaires sont des miroirs du Message Center (mc.merill.net) : usage admis sur le blog, à condition de les nommer comme miroirs, ce que fait l'article.

## 2. Exactitude technique

- **Statut** : « sans phase preview annoncée » est une formulation par la négative. Les miroirs reprennent « General Availability (Worldwide) ». Corrigé en « annoncé en disponibilité générale (GA) mondiale ».
- **Rôle d'administration** : la parenthèse « (il s'adresse aux administrateurs IA) » contredisait la phrase (« ne précise pas le rôle requis »). Un seul résumé tiers parle d'« AI Administrators », aucun extrait officiel. Parenthèse retirée, la mention « à vérifier dans votre tenant » est conservée.
- **Licence** : aucune source ne la précise. L'article le dit honnêtement. Conforme à la charte (mention explicite de l'inconnu).
- **Chemin de console** : « Copilot > Paramètres > Tous les paramètres » était une traduction non vérifiée des libellés. Remplacé par le libellé anglais vérifié en extrait (`Copilot > Settings > All settings > Advanced package uploads`), cohérent avec le nom du paramètre resté en anglais.
- **Valeur par défaut** : « ouvert à tous si aucun choix au 25/10, comportement actuel conservé » confirmé par au moins 5 extraits concordants (« If no action is taken, advanced-package uploads remain allowed by default »). Conservé.
- **MC1484008** : boutons remplacés = Agents, Agents & Skills et Customize. Corrigé. Calendrier (registre fin septembre à fin octobre, bouton Plugins fin octobre à fin novembre 2026) confirmé.
- **Agents Toolkit** : l'affirmation « elle bloque aussi vos propres équipes qui testent avec le Microsoft 365 Agents Toolkit » est une déduction, non documentée. Reformulée au conditionnel avec mention explicite.
- Nomenclature : Microsoft 365 Copilot, Microsoft Entra ID, Model Context Protocol, Microsoft 365 Agents Toolkit : conformes.

## 3. Style et ton

- 0 tiret cadratin.
- Pas de jargon marketing. Ton direct, vouvoiement respecté.
- « ce que nous défendions déjà dans notre dossier » : « nous » éditorial léger, non autoritaire, laissé en l'état (voix de l'auteur).
- Cohérence des libellés : les libellés de console et de boutons sont désormais tous en anglais (Settings, All settings, Agents & Skills, Customize). Les options (« tous les utilisateurs », etc.) restent décrites en français, en minuscules, comme descriptions et non comme libellés exacts.

## 4. Évolutions depuis la publication

Sans objet (brouillon daté du jour).

## Corrections appliquées

### Correction N°1 : Source / Technique (chemin de console)

**Avant** :
> **Copilot > Paramètres > Tous les paramètres > Advanced package uploads**

**Après** :
> **Copilot > Settings > All settings > Advanced package uploads**

**Raison** : seul le libellé anglais est attesté (extrait de la page Learn « Manage Microsoft Copilot Settings »). Les libellés français étaient une traduction du rédacteur.

### Correction N°2 : Technique (statut)

**Avant** :
> Le déploiement a commencé le 25 septembre 2026 et doit s'achever fin octobre, sans phase preview annoncée.

**Après** :
> Le déploiement, annoncé en disponibilité générale (GA) mondiale, a commencé le 25 septembre 2026 et doit s'achever fin octobre.

**Raison** : la charte exige le statut GA/Preview explicite ; le MC le donne (« General Availability (Worldwide) »).

### Correction N°3 : Technique (rôle)

**Avant** :
> Le message ne précise ni la licence des utilisateurs concernés ni le rôle d'administration requis (il s'adresse aux administrateurs IA), à vérifier dans votre tenant.

**Après** :
> Le message ne précise ni la licence des utilisateurs concernés ni le rôle d'administration requis, à vérifier dans votre tenant.

**Raison** : parenthèse contradictoire avec la phrase et non sourcée officiellement (un seul résumé tiers mentionne « AI Administrators »).

### Correction N°4 : Technique (déduction présentée comme un fait)

**Avant** :
> mais elle bloque aussi vos propres équipes qui testent des agents avec le Microsoft 365 Agents Toolkit.

**Après** :
> mais elle risque de bloquer aussi vos propres équipes qui testent des agents avec le Microsoft 365 Agents Toolkit (cas non documenté par Microsoft).

**Raison** : aucune source ne décrit l'effet du paramètre sur le chargement de test via Agents Toolkit.

### Correction N°5 : Source (MC1484008, liste des boutons)

**Avant** :
> remplace les boutons Agents et Personnaliser par un bouton **Plugins**

**Après** :
> remplace les boutons Agents, Agents & Skills et Customize par un bouton **Plugins**

**Raison** : le MC cite trois boutons ; libellés gardés en anglais par cohérence avec la correction N°1 (libellé français de « Agents & Skills » inconnu).

## Décisions pour Daniel

1. **Date de début MC1472007** : 25/09/2026 (majorité des miroirs) conservée. Un miroir indique « Rollout begins October 12, 2026 », peut-être une révision du message. À trancher en lisant le MC dans votre Centre d'administration ; si le 12/10 est la version en vigueur, corriger la phrase.
2. **Rôle d'administration** : si vous confirmez dans votre tenant le rôle requis (AI Administrator ou Global Administrator), l'ajouter : c'est la première question du lecteur.
3. **Libellés en anglais** : choix fait faute de libellés français vérifiés. Si votre console en français affiche d'autres libellés, les substituer.

## Ce qui n'a PAS pu être vérifié

- Texte intégral de MC1472007 et MC1484008 (aucune lecture directe, extraits seulement).
- Contenu actuel des deux pages Learn (403 proxy) et du billet Tech Community (DNS).
- Date de début exacte (25/09 ou 12/10).
- Licence requise et rôle d'administration.
- Effet de l'option « aucun utilisateur » sur Microsoft 365 Agents Toolkit.
- Libellés français de la console.
- Existence de la bannière `breve-copilot1.png` (absente, à créer) et hero image (à fournir).

---

## Deuxième passe, 2026-10-19

**Source primaire de référence** : texte intégral de MC1472007 copié par Daniel depuis le Message Center de son tenant le 2026-10-19 (mise à jour du message datée du 15/09/2026). Le lien de la brève reste le miroir `mc.merill.net/message/MC1472007`, désormais considéré comme vérifié par ce texte. Aucune autre source n'a été relue (pas de nouvel accès à Learn, Tech Community ni MC1484008).

### Confrontation au texte du MC

| Affirmation de la brève | Texte du MC | Résultat |
|---|---|---|
| Échéance du 25/10/2026, choix entre tous, aucun, utilisateurs/groupes Entra ID | « admins will have until October 25th to select their preference of all users, no users or specific users or groups » | ✅ |
| Défaut permissif, comportement actuel conservé | « Starting October 25th, Advanced-package uploads will be enabled by default unless the admin has selected no users or specific users or groups » ; « No action is required to maintain current behavior » | ✅ |
| GA mondiale, début 25/09, fin attendue fin octobre 2026 | « General Availability (Worldwide): Rollout begins September 25th » ; « Expected completion by the end of October 2026 » | ✅ Le 12/10 d'un miroir est écarté (décision 1 de la première passe tranchée) |
| Définition avancé / basique | « a Declarative Agent with actions or with an MCP server. All other packages are considered basic » | ✅ |
| Hors agents Microsoft et tiers | « only applicable to user uploaded packages and does not cover 1P or 3P built agents » | ✅ |
| Chemin `Copilot > Settings > All settings > Advanced package uploads` | « visible in MAC under Copilot Settings » ; capture « Advanced package uploads » | ⚠️ Le niveau « All settings » n'est pas dans le MC (il venait d'un extrait Learn non lu en direct). Corrigé (N°6) |
| Rôle et licence non précisés | « Microsoft 365 administrators responsible for managing Copilot agents and plugins » ; aucune licence | ✅ Formulation resserrée sans rien inventer (N°7) |
| Agents Toolkit « cas non documenté » | « Platforms/Services: Microsoft 365 Copilot and Cowork surfaces, ATK » | ⚠️ L'ATK est dans le périmètre, l'effet n'est pas décrit. Reformulé (N°9) |
| Non-rétroactivité, visibilité admin | « applies only to advanced agents and plugins uploaded after the control becomes available » ; « IT admins can view user uploaded packages as shared in MAC » | ➕ Absent de la brève, ajouté en remplacement de texte (N°8) |

### Pré-contrôles mécaniques (deuxième passe)

| Contrôle | Résultat |
|---|---|
| Tirets cadratins | 0 |
| Faute « brebes » | aucune |
| Liens internes | les deux fichiers cibles existent dans `src/content/blog/` |
| Frontmatter | **inchangé** (titre et description restent exacts) ; `pubDate` 2026-10-19 inchangée |
| Images | `public/images/hero/copilot-televersement-agents-avances.webp` et `public/images/banarticle/breve-copilot1.png` présents (le constat « absent » de la première passe est caduc) ; lignes d'images conservées |
| Nombre de mots du corps | 500 avant, **498** après (432 hors section Source) ; fourchette brève 250-500 respectée |

### Corrections appliquées

#### Correction N°6 : Source / Technique (chemin de console)

**Avant** :
> le paramètre se trouve dans le Centre d'administration Microsoft 365 : **Copilot > Settings > All settings > Advanced package uploads**.

**Après** :
> le réglage **Advanced package uploads** se trouve dans le Centre d'administration Microsoft 365, sous **Copilot > Settings**.

**Raison** : le MC atteste « Copilot Settings » et le libellé « Advanced package uploads », pas le niveau intermédiaire « All settings ».

#### Correction N°7 : Technique (rôle et licence)

**Avant** :
> Le message ne précise ni la licence des utilisateurs concernés ni le rôle d'administration requis, à vérifier dans votre tenant.

**Après** :
> Le message ne nomme ni rôle d'administration ni licence : à vérifier dans votre tenant.

**Raison** : le MC vise « Microsoft 365 administrators responsible for managing Copilot agents and plugins » sans rôle Entra précis et ne parle d'aucune licence. Formulation plus courte, sans invention.

#### Correction N°8 : Technique (non-rétroactivité et visibilité admin, en remplacement)

**Avant** :
> Le paramètre ne vise que les packages téléversés par les membres de l'organisation : les agents publiés par Microsoft ou par des éditeurs tiers n'entrent pas dans son périmètre.

**Après** :
> Le paramètre ne vise que les packages téléversés par les utilisateurs, pas les agents conçus par Microsoft ou des éditeurs tiers. Il n'est pas rétroactif : seuls les packages téléversés après l'arrivée du contrôle sont concernés. Les packages des utilisateurs apparaissent comme « shared » dans le Centre d'administration, avec leurs composants.

**Raison** : deux faits du MC utiles à l'administrateur (les agents avancés déjà téléversés ne sont pas touchés ; ils sont visibles dans le MAC). « Conçus » suit le « 1P or 3P built agents » du MC. Phrase du périmètre resserrée pour financer l'ajout.

#### Correction N°9 : Technique (Agents Toolkit)

**Avant** :
> avec le Microsoft 365 Agents Toolkit (cas non documenté par Microsoft).

**Après** :
> avec le Microsoft 365 Agents Toolkit, que le message inclut dans son périmètre sans détailler l'effet.

**Raison** : le MC liste « ATK » dans les plateformes concernées. L'impact sur les tests reste une hypothèse (verbe « risque » conservé). Lecture de « ATK » comme Microsoft 365 Agents Toolkit : interprétation de l'acronyme, non développé dans le MC.

#### Correction N°10 : Style (rembourrage, arbitrage de longueur)

**Avant** :
> déploie un **registre de plugins** (fin septembre à fin octobre 2026) et remplace les boutons Agents, Agents & Skills et Customize par un bouton **Plugins** (fin octobre à fin novembre 2026).

**Après** :
> déploie un **registre de plugins** (fin septembre à fin octobre 2026).

**Raison** : détail de MC1484008 hors sujet principal, retiré pour rester sous 500 mots après la correction N°8. MC1484008 reste cité en source.

### Non retenu

- Recommandations du MC (mettre à jour la documentation d'administration et du helpdesk, informer le support) : testées en fin de dernière puce, retirées faute de place. À réintégrer si Daniel préfère sacrifier une autre phrase (par exemple la phrase finale du troisième paragraphe).

### Décisions pour Daniel (mises à jour)

1. Date de début : **tranchée**, 25/09/2026 (texte du MC).
2. Rôle d'administration : le MC n'en nomme aucun. Si vous le constatez dans votre tenant (AI Administrator, Global Administrator), vous pouvez l'ajouter en le présentant comme constat de terrain.
3. Libellés en anglais : maintenus (« Copilot > Settings », « Advanced package uploads », « shared »). À remplacer si votre console en français affiche d'autres libellés.
4. « Tout utilisateur peut téléverser un agent avancé » : exact au sens du MC (comportement actuel conservé), mais un tenant qui bloque déjà le chargement d'applications personnalisées par d'autres réglages n'est pas « ouvert ». Le MC ne traite pas ce cas ; laissé en l'état.
5. Bouton Plugins de MC1484008 : retiré pour la longueur (N°10). À rétablir si vous préférez.

### Ce qui n'a toujours PAS pu être vérifié

- Pages Learn citées et billet Tech Community (non relus dans cette passe).
- Texte intégral de MC1484008.
- Licence et rôle requis (non précisés par le MC).
- Effet concret de l'option « aucun utilisateur » sur Agents Toolkit.
- Libellés français de la console.

## Troisième passe, 2026-10-19

**Verdict** : ⚠️ publiable après corrections (corrections appliquées dans le brouillon ; reste les décisions ci-dessous).

### Confrontation à MC1484008 (texte intégral fourni par Daniel)

| Affirmation de la brève (avant) | Texte de MC1484008 | État |
|---|---|---|
| Registre de plugins déployé fin septembre à fin octobre 2026 | « Plugin registry: Rollout began in late September 2026 and is expected to complete by late October 2026 », GA mondiale | ✅ Exact |
| Un plugin peut regrouper agents, compétences, connecteurs et serveurs MCP | « Plugins can bundle agents, skills, connectors, and Model Context Protocol (MCP) servers into a single package » | ✅ Exact (« compétences » = skills) |
| « Le téléversement avancé d'aujourd'hui est le plugin de demain » | Le MC ne relie pas le registre au réglage Advanced package uploads et ne parle pas de remplacement | ❌ Extrapolation non sourcée, retirée |
| (absent) Deuxième déploiement : bouton Plugins | « User interface changes: Rollout begins in late October 2026 and is expected to complete by late November 2026 » ; Agents, Agents & Skills et Customize remplacés par Plugins | Rétabli (décision 5 de la 2e passe) |

Lien avec le sujet, vérifié sur MC1472007 : « An advanced agent is a package that has either a Declarative Agent with actions or with an MCP server », réglage limité aux « user uploaded packages », plateformes listant « Copilot plugins ». Un plugin téléversé par un utilisateur et contenant un serveur MCP entre donc dans la définition. La brève ne dit rien de l'application du réglage aux plugins publiés via le registre par les administrateurs : MC1484008 ne le traite pas.

Faits de MC1484008 non repris faute de place (brève à 500 mots) : gestion centrale sous **Tools** dans le Centre d'administration Microsoft 365 et dans Microsoft Agent 365 ; gestion des agents maintenue dans **Agents settings** ; aucune action ni migration requise ; recommandations (mettre à jour documentation et supports de formation, préparer les utilisateurs au bouton Plugins, revoir les capacités de plugins à ouvrir). Candidats si Daniel préfère sacrifier une autre phrase.

### Pré-contrôles mécaniques (troisième passe)

1. Tirets cadratins : 0.
2. Liens internes : `dossier-2026-04-15-entra-agent-id` et `2026-04-29-article-claude-copilot-m365` existent.
3. Frontmatter : inchangé, valeurs valides.
4. Mots du corps : 498 avant, **500** après (plafond de la brève atteint).
5. « brebes » : absent.

### Corrections appliquées

#### Correction N°11 : Technique / Source (MC1484008)

**Avant** :
> 💡 Avec **MC1484008**, Microsoft déploie un **registre de plugins** (fin septembre à fin octobre 2026). Un plugin peut regrouper agents, compétences, connecteurs et serveurs MCP : le téléversement avancé d'aujourd'hui est le plugin de demain.

**Après** :
> 💡 **MC1484008** : un **registre de plugins** arrive (fin septembre à fin octobre 2026), puis un bouton **Plugins** remplace **Agents**, **Agents & Skills** et **Customize** d'ici fin novembre. S'il embarque un serveur MCP, un plugin téléversé par un utilisateur est « avancé » au sens de MC1472007.

**Raison** : la formule « le téléversement avancé d'aujourd'hui est le plugin de demain » n'a aucun appui dans MC1484008. Remplacée par un lien vérifiable avec la définition de MC1472007, limité aux téléversements par les utilisateurs. Bouton Plugins rétabli d'après le texte primaire. Libellés de console en anglais.

#### Correction N°12 : Style (longueur, compensation)

**Avant** :
> Le déploiement, annoncé en disponibilité générale (GA) mondiale, a commencé le 25 septembre 2026 et doit s'achever fin octobre.

**Après** :
> Déploiement en disponibilité générale (GA) mondiale, prévu du 25 septembre à fin octobre 2026.

**Raison** : même information (« prévu » conserve le caractère prévisionnel de « Expected completion »), six mots de moins.

#### Correction N°13 : Style (longueur, compensation)

**Avant** : « tous les autres sont **basiques** » ; « après l'arrivée du contrôle sont concernés ».
**Après** : « les autres sont **basiques** » ; « après son arrivée sont concernés ».
**Raison** : trois mots gagnés sans perte de sens.

### Décisions pour Daniel (troisième passe)

1. Bouton Plugins : **rétabli** (N°11). Décision 5 de la deuxième passe close.
2. Gestion sous **Tools** et maintien d'**Agents settings** : utiles à l'admin, non repris faute de place. Pour les intégrer, sacrifier par exemple la phrase « Les packages des utilisateurs apparaissent comme « shared »… » ou la dernière phrase du troisième paragraphe.
3. Brève à 500 mots pile : toute addition impose une coupe.

### Ce qui n'a toujours PAS pu être vérifié

- Miroirs mc.merill.net et billet Tech Community : non résolus dans cette passe (résolution DNS impossible depuis l'environnement). Le contenu de MC1484008 est vérifié sur le texte fourni par Daniel ; l'URL du miroir et la date du billet (30/09/2026) restent à confirmer.
- Pages Learn citées : non relues.
- Licence et rôle requis, effet de « aucun utilisateur » sur Agents Toolkit, libellés français de la console : inchangé.
- Articulation entre le réglage Advanced package uploads et les plugins publiés via le registre par les administrateurs : non documentée par Microsoft.

## Quatrième passe, 2026-10-19

**Verdict : ⚠️ publiable après corrections** (inchangé ; les points non vérifiés listés plus haut restent ouverts).

**Décision explicite de Daniel** : intégrer les faits de MC1484008 laissés de côté en troisième passe. **Pour cette brève uniquement, Daniel lève la limite de 500 mots.** Le dépassement de la fourchette brève (250-500 mots) est donc assumé et ne constitue pas un écart à corriger. Aucune coupe compensatoire n'a été faite ailleurs.

Source : texte intégral de MC1484008 fourni par Daniel depuis le Message Center de son tenant (2026-10-19).

### Correction N°14 : Technique / Source (MC1484008, ajout décidé par Daniel)

**Avant** : (absent)

**Après** (nouvelle puce dans « Avis d'expert », juste après la puce MC1484008) :
> **Côté administration**, toujours selon MC1484008 : les plugins se découvrent, se publient, se gouvernent et se gèrent de façon centrale sous **Tools**, dans le Centre d'administration Microsoft 365 et dans **Microsoft Agent 365** ; les agents restent gérés dans les **Agents settings**. Aucune action ni migration technique n'est requise. Microsoft recommande de mettre à jour documentation interne, formation et supports d'adoption qui mentionnent **Agents**, **Agents & Skills** ou **Customize**, de préparer les utilisateurs au bouton **Plugins** et de revoir quelles capacités de plugins rendre disponibles selon votre gouvernance.

**Correspondance avec le texte primaire** :

| Phrase ajoutée | Texte de MC1484008 | État |
|---|---|---|
| Gestion centrale sous Tools, Centre d'administration et Agent 365 | « discover, publish, govern, and manage plugins centrally under Tools in the Microsoft 365 admin center and Microsoft Agent 365 » | ✅ Exact |
| Agents gérés dans Agents settings | « Admins will continue to manage agents in the Agents settings within the Microsoft 365 admin center and Microsoft Agent 365 » | ✅ Exact |
| Aucune action ni migration | « No action or setup is required to enable this change, and no technical migration is required » | ✅ Exact |
| Trois recommandations | « Update internal documentation, training, and adoption materials… » ; « Prepare users… new Plugins button » ; « Review which plugin capabilities should be available to users based on your organization's governance requirements » | ✅ Exact |

**Raison** : décision de Daniel. Aucun lien ajouté avec le réglage Advanced package uploads au-delà de la phrase existante de la puce précédente. Libellés de console en anglais. Aucune nouvelle source (MC1484008 est déjà listée).

### Pré-contrôles mécaniques (quatrième passe)

1. Tirets cadratins : 0.
2. Liens internes : `dossier-2026-04-15-entra-agent-id` et `2026-04-29-article-claude-copilot-m365` existent.
3. Frontmatter : inchangé (title, description, pubDate, heroImage, category, subcategory). Lignes d'images inchangées.
4. Mots du corps : 500 avant, **588** après (au-delà de la fourchette brève, par décision explicite de Daniel).
5. « brebes » : absent.

### Décisions pour Daniel (quatrième passe)

- Décision 2 de la troisième passe (Tools, Agents settings) : close par N°14.
- Décision 3 de la troisième passe (plafond 500 mots) : levée par Daniel pour cette brève.
- Aucune nouvelle décision ouverte. Les points de « Ce qui n'a toujours PAS pu être vérifié » restent valables.
