# Rapport de relecture : Microsoft Perception en GA, ce que les agents font seuls

**Fichier** : `src/content/draft/2026-11-23-microsoft-perception-agents-securite.md` (brouillon)
**Format** : article presse (`actualites` / `articles`)
**Date de publication** : 2026-11-23 (pubDate provisoire, non modifiée)
**Date de relecture** : 2026-11-23
**Verdict global** : ⚠️ Publiable après corrections (corrections appliquées dans le fichier, restent les décisions de Daniel listées en fin de rapport)

## Synthèse

Brouillon solide et bien sourcé : sur les 13 URL, aucune n'est cassée et les faits techniques (rôles, permissions URBAC, licences du Triage Agent, budget non bloquant, 24 heures de décalage) tiennent face à Learn. J'ai trouvé quatre écarts de fond. Le premier concerne Microsoft Sentinel, réellement utilisé par les agents mais jamais nommé dans le corps. Viennent ensuite une note de bas de page mal lue (le chiffre de 80 % est une couverture, pas une moyenne), une généralisation de l'audit Purview à tous les agents alors que Learn ne le documente que pour le Triage Agent, et une lecture inexacte de Dark Reading (la critique de la « least agency » vise Perception en entier, pas seulement les Guardian Agents). Le style passe désormais `style-check` sans alerte de rythme. Les deux H2 en question sont maintenus et la décision revient à Daniel.

## Pré-contrôles mécaniques

| Contrôle | Résultat |
|---|---|
| Tiret cadratin | 0 (avant et après) |
| Liens internes | 3/3 existent : `dossier-2026-04-15-entra-agent-id`, `2026-04-29-article-phishing-triage-agent`, `2026-10-19-copilot-televersement-agents-avances` |
| Frontmatter | `actualites` / `articles` valides. Title 57 caractères. Description 160 caractères, **non modifiée** (voir décision Sentinel) |
| Mots du corps | 1 475 (`wc -w` hors frontmatter, hors Sources), 1 397 selon `seo-check`, dans la fourchette 800-1 500 |
| « brebes » | absent |
| `seo-check --stage draft` | 0 alerte. Une alerte est apparue en cours de relecture (intro de 118 mots après l'ajout de Sentinel), elle a été corrigée (intro ramenée à 101 mots) |
| `style-check` | avant : 2 H2 en question + rythme monotone (4 suites). Après : 2 H2 en question seulement (maintenus, décision Daniel) |
| Anti-cannibalisation | ni « Phishing Triage Agent » ni « virage agentique » dans le title, les H2 ou la description |

## 1. Sources

| URL | État | Vérifié le | Commentaire |
|---|---|---|---|
| microsoft.com/en-us/security/blog/2026/11/17/security-for-the-agentic-era-powered-by-microsoft-perception/ | ✅ OK | 2026-11-23 | Six agents GA, Web App Pen Test en preview, Risk Reduction en public preview, shielding et MAI-Cyber-2 en preview. Identity Risk Reduction absent. Le chiffre de 80 % ne figure **pas** dans ce billet (il est dans Tech Community, ce que la section Sources indique déjà correctement) |
| techcommunity.microsoft.com/…/whats-new-with-microsoft-perception-at-ignite-2026/4571834 | ✅ OK (navigateur) | 2026-11-23 | 80 % avec une note : couverture agrégée sur environ 8 millions d'alertes, sans taux garanti. Project Perception présenté en juillet. Recommandations « contain an account / isolate a device » confirmées. Le billet dit à la fois « will be generally available » et « now generally available » |
| learn…/agentic-security-overview | ✅ OK | 2026-11-23 | Trois équipes, portail Defender. Pas de bandeau |
| learn…/agentic-security-agent-categories | ✅ OK | 2026-11-23 | Identity Risk Reduction Agent listé, sans statut. La page ne liste ni le Risk Reduction Agent ni le Web App Pen Test Agent |
| learn…/triage-agent | ✅ OK | 2026-11-23 | Bandeau « Limited Public Preview, invitation-only » toujours présent. Remplacement de l'agent de tri du phishing, licences, plugins, audit Purview confirmés |
| learn…/attack-investigation-agent | ✅ OK | 2026-11-23 | Bandeau toujours présent. Prérequis : Microsoft 365 E5, Defender XDR, onboarding au data lake Microsoft Defender. Section dédiée à l'accès aux espaces de travail Microsoft Sentinel |
| learn…/risk-reduction-agent | ✅ OK | 2026-11-23 | Bandeau toujours présent (« Project Perception »). Permissions confirmées |
| learn…/agentic-security-get-started | ✅ OK | 2026-11-23 | Bandeau toujours présent. URBAC sur toutes les charges, groupes d'appareils MDE à la main, scoping Sentinel dans URBAC. Conseil « Threat Intelligence Agent et Triage Agent » en premier |
| learn…/agentic-security-supervise-work | ✅ OK | 2026-11-23 | Waiting for input, arrêt irréversible, « Trust high-performing agents » sans seuil |
| learn…/agentic-security-outcomes | ✅ OK | 2026-11-23 | Six types d'outcome. Le Detection Authoring Agent écrit ses requêtes sur « Defender XDR and supported Microsoft Sentinel data ». 14 jours. Aucune règle pour les exécutions échouées ou relancées |
| learn…/agentic-security-manage-costs | ✅ OK | 2026-11-23 | Budget « not a hard cap », e-mail, décalage de 24 heures |
| microsoft.com/fr-fr/security/business/microsoft-perception-agentic-system | ✅ OK | 2026-11-23 | Paiement à l'usage ou AI Flex Plan (1 ou 3 ans), les deux comptent dans un MACC, prix séparé de Security Copilot, « AI that acts / AI that assists ». Pas d'E5 |
| darkreading.com/…/ai-agents-insider-threats-inside-microsoft-unified-security-stack | ✅ OK (navigateur, source tierce) | 2026-11-23 | Daté du 23 octobre 2026. Voir correction n°9 |

Toutes les pages Learn sont en `/en-us/` : il n'en existe pas de version française à jour pour ce produit, c'est acceptable.

## 2. Exactitude technique

### Sentinel (point prioritaire) : confirmé

Learn confirme que Perception travaille sur les données de Microsoft Sentinel, à trois endroits.
- Outcomes : le Detection Authoring Agent écrit ses requêtes sur « Microsoft Defender XDR and supported Microsoft Sentinel data », et le Threat Intelligence Agent compare les indicateurs au renseignement Microsoft Sentinel existant.
- Attack Investigation Agent : les incidents peuvent contenir des alertes issues d'un espace de travail Sentinel connecté au portail Defender. L'agent doit avoir accès à cet espace (URBAC ou rôle Microsoft Sentinel Reader).
- Get started : le scoping Sentinel passe par URBAC.

**Décision** : Sentinel est nommé deux fois dans le corps, dans l'intro (« sur les données de Defender XDR et de Microsoft Sentinel ») et dans la puce « Proposition » (Detection Authoring Agent). La description **reste inchangée** (160 caractères). Réserve : les agents ne sont pas des « agents Sentinel » au sens produit, ce sont des agents du portail Defender qui lisent des données Sentinel. La formule « agents Defender et Sentinel » de la description reste défendable. Si Daniel la veut plus exacte, voici une variante de 160 caractères : « Microsoft Perception en GA : quels agents agissent seuls sur les données Defender et Sentinel, quels garde-fous régler, comment lire la facturation au résultat. »

Ne pas confondre avec une autre annonce du billet du 17/11 : les clients Defender Suite, E5 et E7 éligibles reçoivent les fonctions SIEM de Sentinel (en preview). C'est un autre sujet, je ne l'ai pas repris.

### Points transmis par le rédacteur

1. **Statut GA** : confirmé tel quel. Le billet annonce la GA, alors que les bandeaux « Limited Public Preview » sont toujours présents le 23/11 sur Get started, Triage Agent, Attack Investigation Agent et Risk Reduction Agent. La contradiction tient désormais en une phrase (correction n°4).
2. **Identity Risk Reduction Agent** : confirmé. La page des catégories le liste sans statut et le billet ne le cite pas. « non précisé » est juste. L'intro disait « les autres en preview », ce qui était inexact pour cet agent. La formule a été retirée de l'intro (correction n°1).
3. **E5 et Attack Investigation Agent** : confirmé. Learn exige Microsoft 365 E5, Defender XDR **et** l'onboarding au data lake Microsoft Defender. Ce troisième prérequis manquait, il est ajouté (correction n°8). Rien n'indique une inclusion de Perception dans E5 : « non documenté » est la bonne formule.
4. **Dark Reading** : à corriger (correction n°9). L'article est daté du 23 octobre, donc avant Ignite. La critique « non-deterministic squared » vise bien les Guardian Agents. En revanche, la « least agency » est une notion d'Allie Mellen, avancée après le lancement de juillet, donc à propos des agents du SOC. Andras Cser juge que Microsoft remplit le moindre privilège, pas la least agency, et ce jugement porte sur Perception en général. La phrase « La critique visait les agents de surveillance des IA. Elle vaut pour ceux du SOC » attribuait à Cser un périmètre trop étroit.
5. **Facturation** : confirmé. Aucune grille publique. Learn précise que les définitions d'outcome « don't define charging rules for failed runs or reruns ». Les SCU d'IT-Connect ne sont pas reprises, c'est la bonne décision.
6. **Phrase de pratique** : maintenue telle quelle, à valider par Daniel (voir décisions).
7. **Chiffres** : 14 jours ✅ (outcomes), 80 % ✅ mais mal qualifié (correction n°6), 24 heures ✅, AI Flex Plan sur 1 ou 3 ans ✅.

### Autres écarts

- **Audit Purview** : Learn ne documente la consignation dans l'audit Purview que pour le Triage Agent (FAQ). « L'activité des agents est consignée » généralisait ce fait (correction n°7).
- **« statistique produite par l'agent lui-même »** : Learn parle de taux d'approbation et d'erreur, sans dire qui les calcule. Un taux d'approbation est produit par les décisions humaines. J'ai retiré la proposition finale (correction n°10).
- **URBAC** : Learn demande que URBAC soit *activé* sur toutes les charges Defender. « Couvrir » était flou (correction n°5).
- Vérifiés sans écart : Security Administrator et Security Reader, Waiting for input, arrêt définitif, « Execute hard actions » et « Approve hard actions », Intune Administrator et Groups Administrator, playbooks non modifiables, quatre plugins Security Copilot, permission « Security Copilot (read) », géographie GPU, licences par type d'alerte, remplacement de l'agent de tri du phishing (historique, métriques et réglages repris, retours d'analystes effacés à la suppression), désactivation des règles de réglage, conseil Microsoft de démarrage, Recon Agent sur Azure et Entra ID en lecture seule.

## 3. Style et ton

- Tirets cadratins : 0. Points-virgules : 0. Aucun « nous ».
- Rythme monotone (4 suites signalées) : corrigé (corrections n°11 à 14). `style-check` ne le signale plus.
- H2 en question (l.52 et l.83) : maintenus. Ils servent les PAA et le brief les prévoyait, mais la charte les déconseille. Décision de Daniel.
- **Attributions restantes dans le corps : 8**, toutes justifiées, aucune ajoutée. Je compte une attribution de plus que le rédacteur (7), sans doute le conseil Microsoft de la dernière section.
  1. Intro : annonce parue sur le blog Microsoft Security et sur Tech Community (nommée une fois).
  2. « Le billet Microsoft Security annonce la GA, alors que les pages Microsoft Learn… » : deux sources qui se contredisent, cas prévu par la charte.
  3. « Learn écrit aussi « Triage Agent » là où le billet dit « Alert Triage Agent » » : divergence de nom.
  4. « Microsoft annonce que le Triage Agent couvre environ 80 % » : revendication d'éditeur, l'attribution porte le sens.
  5. « Microsoft présente Perception en « AI that acts » » : base de la juxtaposition.
  6. Dark Reading, Andras Cser et Allie Mellen : source tierce. Allie Mellen est un nom de plus, pas une source de plus, et il corrige l'origine de la notion.
  7. « La page Learn de supervision invite à réduire les approbations » : le fait que ce soit Microsoft qui le recommande fonde l'avis.
  8. « Microsoft conseille de commencer par… » : nécessaire pour poser « Mon ordre diffère ».
  « selon », « d'après » et « précise » : 0.
- **Dates restantes dans le corps : 4**. « mi-novembre 2026 » (intro), « en juillet » (intro), « Fin octobre, avant Ignite » (Dark Reading), « de 2025 » (H2 sur Security Copilot). Plus « Pages consultées le 23 novembre 2026 » dans Sources. Aucune date n'est répétée.

## 4. Évolutions depuis la publication

Sans objet : brouillon daté du jour. À revérifier à la publication : les bandeaux Learn « Limited Public Preview » (s'ils tombent, il faut réécrire le paragraphe sur la contradiction) et le statut de l'Identity Risk Reduction Agent.

## SEO (arbitrage de `geo.md`)

### Appliqué
- **R1** (intro) : sujet explicite (« Microsoft Perception est facturé… », « En mode automatique, le Triage Agent… »). Sentinel nommé, puisque Learn le confirme.
- **R2** : liste nominative des six agents GA.
- **R3** : puce « Action » en phrases complètes.
- **R4** : chiffre des 80 % avec un sujet explicite, et « note de bas de page » supprimée. J'ai corrigé au passage « moyenne » en « couverture globale », plus fidèle à la note.
- **R5** : H2 licence avec réponse directe et sujet explicite. Ma version diffère de la proposition pour garder un seul deux-points par paragraphe (« de deux façons : » aurait fait un deuxième deux-points avec la liste des outcomes).
- Retouche E5 : « L'inclusion de Microsoft Perception dans… ».
- Retouches secondaires : « Activer Microsoft Perception ne désactive pas l'agent de tri du phishing » (fusionnée avec la phrase suivante pour éviter la répétition), « Supprimer le Triage Agent rouvre la porte à l'agent de tri du phishing », décalage entre le billet et Learn nommé en une phrase, URBAC développé une fois, étape 3 rendue explicite.
- Tableau : ligne Triage Agent complétée (« laisse les vrais positifs à l'analyste »).

### Écarté
- **« Perception et Security Copilot partagent la même tuyauterie »** : écarté. « Les factures sont séparées. La tuyauterie est commune. » est la juxtaposition flaubertienne de l'article (charte, section 4), et le sujet est posé deux phrases plus haut. L'explicitation tuerait l'ironie pour un gain de citabilité marginal.
- **H2 statuts en question** (« Quels agents de Microsoft Perception sont en GA ? ») : changement de structure, non appliqué, remonté à Daniel.

### Laissé à Daniel
- H2 en question : faut-il garder les deux existants (l.52 et l.83) et ajouter le troisième proposé ?
- E-E-A-T : le brief attend « une phrase de terrain » (charge de triage d'un SOC client, usage de l'agent de tri du phishing depuis 2025). Rien n'a été ajouté. Ajouter une expérience vécue ?

## Corrections appliquées

### Correction n°1 : Technique / SEO (intro)
**Avant** : « Microsoft Perception est passé en disponibilité générale mi-novembre 2026, à Ignite. Microsoft l'a annoncé sur son blog Microsoft Security et sur le blog Perception de Tech Community. […] la plateforme fait travailler des agents de sécurité dans le portail Microsoft Defender, en trois équipes […]. Six agents sont en GA, les autres en preview. La facturation se fait au résultat, à part de Security Copilot, et aucune inclusion dans Microsoft 365 E5 n'est documentée. Le Triage Agent, lui, clôt déjà seul les faux positifs. »
**Après** : « Microsoft Perception est passé en disponibilité générale mi-novembre 2026, à Ignite, annonce parue sur le blog Microsoft Security et sur Tech Community. […] la plateforme fait travailler des agents dans le portail Microsoft Defender, sur les données de Defender XDR et de Microsoft Sentinel, en trois équipes […]. Six agents sont en GA. Microsoft Perception est facturé au résultat, à part de Security Copilot, sans inclusion documentée dans Microsoft 365 E5. En mode automatique, le Triage Agent clôt seul les faux positifs. »
**Raison** : Sentinel est confirmé par Learn (outcomes, Attack Investigation Agent). « les autres en preview » était faux pour l'Identity Risk Reduction Agent. L'intro est ramenée à 101 mots, sous le seuil de `seo-check`.

### Correction n°2 : SEO (H2 statuts)
**Avant** : « Le Recon Agent, les quatre agents bleus et le Posture Prioritization Agent sont en GA. »
**Après** : « Six agents de Microsoft Perception sont en GA : le Recon Agent, le Triage Agent, l'Attack Investigation Agent, le Detection Authoring Agent, le Threat Intelligence Agent et le Posture Prioritization Agent. »
**Raison** : la phrase se comprend une fois extraite (R2 de `geo.md`).

### Correction n°3 : SEO (tableau)
**Avant** : « résout les faux positifs en mode automatique »
**Après** : « résout les faux positifs en mode automatique, laisse les vrais positifs à l'analyste »
**Raison** : fait déjà présent dans le corps, confirmé par Learn.

### Correction n°4 : Style / SEO (contradiction GA et Learn)
**Avant** : « Les deux sources Microsoft se contredisent sur un point. Le billet annonce la GA, alors que les pages Microsoft Learn… »
**Après** : « Le billet Microsoft Security annonce la GA, alors que les pages Microsoft Learn… »
**Raison** : la contradiction tient en une seule phrase, avec le billet nommé. Les bandeaux sont toujours en place au 23/11.

### Correction n°5 : Technique (URBAC)
**Avant** : « URBAC doit couvrir toutes les charges Defender. »
**Après** : « Le RBAC unifié (URBAC) doit être activé sur toutes les charges de travail Defender. »
**Raison** : Learn, Get started, « URBAC enabled across all Defender workloads ».

### Correction n°6 : Technique / SEO (80 %)
**Avant** : « Microsoft annonce que l'agent couvre environ 80 % des alertes d'une file Defender type. La note de bas de page parle d'une moyenne sur 8 millions d'alertes, sans taux garanti pour un client. »
**Après** : « Microsoft annonce que le Triage Agent couvre environ 80 % des alertes d'une file Defender type. Ce chiffre mesure une couverture globale sur environ 8 millions d'alertes analysées par Microsoft, pas un taux garanti pour un client. »
**Raison** : la note de Tech Community parle d'une couverture agrégée (« aggregate coverage ») d'environ 8 millions d'alertes, pas d'une moyenne. Le sujet est rendu explicite (R4).

### Correction n°7 : Technique (audit Purview)
**Avant** : « L'activité des agents est consignée dans l'audit Microsoft Purview. »
**Après** : « Le Triage Agent, lui, consigne chaque décision dans l'audit Microsoft Purview. »
**Raison** : Learn ne le documente que dans la FAQ du Triage Agent.

### Correction n°8 : Technique / SEO (H2 licence)
**Avant** : « Perception se paie à la consommation, à l'usage ou par un engagement AI Flex Plan d'un ou trois ans, et les deux comptent dans un MACC. Security Copilot est facturé à part. L'unité de coût est l'outcome d'agent : » et « L'inclusion dans Microsoft 365 E5 ou E7 […] avec Defender XDR. »
**Après** : « Microsoft Perception se paie à la consommation, à l'usage ou par un engagement AI Flex Plan d'un ou trois ans. Ces deux modes comptent dans un MACC, et Security Copilot est facturé à part. » / « L'unité de coût est l'outcome d'agent, un résultat livré : » et « L'inclusion de Microsoft Perception dans Microsoft 365 E5 ou E7 […] avec Defender XDR et l'intégration au data lake Microsoft Defender. »
**Raison** : R5 et retouche E5. Le « les deux » ambigu disparaît. Le prérequis du data lake manquait (Learn, Attack Investigation Agent).

### Correction n°9 : Source / Technique (Dark Reading)
**Avant** : « Fin octobre, Dark Reading a recueilli les doutes d'experts sur les agents chargés d'en surveiller d'autres. Andras Cser, de Forrester, y reconnaît à Microsoft le moindre privilège, pas la « least agency », la limite de ce qu'un agent décide seul. La critique visait les agents de surveillance des IA. Elle vaut pour ceux du SOC. »
**Après** : « Fin octobre, avant Ignite, Dark Reading a recueilli les doutes d'experts sur les Guardian Agents, chargés de surveiller d'autres agents. Andras Cser, de Forrester, y reprend la « least agency » défendue par sa collègue Allie Mellen, qui limite ce qu'un agent décide seul et pas seulement ce qu'il touche. Il reconnaît à Perception le moindre privilège, pas encore la least agency. Ce jugement porte sur la plateforme entière, agents du SOC compris. »
**Raison** : dans l'article, la least agency est une notion d'Allie Mellen formulée après le lancement de juillet, donc à propos des agents du SOC, et le jugement de Cser porte sur Perception en général. La version précédente le réduisait aux Guardian Agents puis l'étendait par un raisonnement de l'auteur.

### Correction n°10 : Technique (supervision)
**Avant** : « L'autonomie s'élargit par un réglage, sur la foi d'une statistique produite par l'agent lui-même. »
**Après** : « L'autonomie s'élargit par un réglage, sur la foi d'une statistique. »
**Raison** : Learn ne dit pas qui calcule le taux d'approbation, et ce taux découle des décisions humaines. L'affirmation n'était pas vérifiable.

### Corrections n°11 à 14 : Style (rythme, reformulations)
- « Le rôle Security Administrator […] supprime un agent. Security Reader suffit pour lancer une session, sur tous les agents configurés. » → une phrase, « …supprime un agent, alors que Security Reader suffit pour lancer une session sur n'importe quel agent configuré. »
- « Je ne crains pas d'abord l'erreur de l'agent. Un analyste se trompe aussi, et Purview garde chaque verdict. Je crains qu'une alerte close… » → « Je ne crains pas d'abord l'erreur de l'agent, car un analyste se trompe aussi et Purview garde chaque verdict, mais qu'une alerte close… ». La phrase de pratique qui suit n'a pas été touchée.
- « La question s'était déjà posée pour Copilot, quand il fallait choisir [qui a le droit…] » → « Copilot avait posé la même question : [qui a le droit de déployer des agents]. » L'ancre est conservée.
- « L'étape 3 remplace l'agent de tri du phishing. Mieux vaut le savoir avant de cliquer sur **Set up**. » → « Mieux vaut savoir, avant de cliquer sur **Set up** à l'étape 3, que configurer le Triage Agent remplace l'agent de tri du phishing. »
- « Mon ordre diffère, et c'est mon analyse, pas celle de l'éditeur. » → « Mon ordre diffère. » La redondance est supprimée, l'opposition à la recommandation Microsoft reste explicite.
- H2 sur Security Copilot, premier paragraphe : « Perception ne touche à rien de lui-même. L'agent de tri du phishing, […], tourne… » → « Activer Microsoft Perception ne désactive pas l'agent de tri du phishing, […], qui tourne… ». « Supprimer le nouveau rouvre la porte à l'ancien » → « Supprimer le Triage Agent rouvre la porte à l'agent de tri du phishing ».
- Puce « Proposition » : « écrit des détections KQL sur les données de Defender XDR et de Microsoft Sentinel, testées sur… ». Puce « Action » réécrite en deux phrases complètes (R3).

### Section Sources (annotations seulement, aucune URL ajoutée)
- Attack Investigation Agent : « prérequis Microsoft 365 E5 et data lake Defender ».
- Outcomes : « unités facturées, données Defender XDR et Sentinel du Detection Authoring Agent ».

### Frontmatter
Inchangé (title, description, pubDate, heroImage, category, subcategory).

## Bannière

`article-defender2.png` : avis favorable. `article-defender1` illustre déjà l'article sur l'agent de tri du phishing, du même cluster. Deux pages voisines avec le même visuel brouilleraient le maillage. **Attention** : le fichier `public/images/banarticle/article-defender2.png` n'existe pas encore. L'illustrateur doit le créer, sinon l'image sera cassée à la publication. Il faut aussi ajouter `article-defender2` à la liste des séries dans `CLAUDE.md`. Le `heroImage` est vide, à remplir par l'illustrateur.

## Ce que je n'ai pas pu vérifier

- Le statut réel des agents dans un tenant (seul le portail le montre).
- La version du 17/11 du billet de Tech Community : il dit à la fois « will be generally available » et « now generally available ». Je ne vois aucun effet sur le texte, je le signale seulement.
- Le shielding exécuté (et pas seulement planifié) par le Risk Reduction Agent : Learn parle de « temporary protection planning » et le billet de Tech Community de « help shield ». La ligne du tableau « exécute un plan (patch Intune, shielding) après approbation » est exacte pour le patch Intune. Pour le shielding, elle reste plausible mais pas strictement documentée comme exécution.
- Les pages Learn propres au Recon Agent, au Detection Authoring Agent et au Threat Intelligence Agent n'ont pas été ouvertes. Leurs faits sont confirmés par la page outcomes, déjà citée.
- Hors périmètre : le fichier `2026-04-29-article-phishing-triage-agent.md` a une `pubDate` au 2026-04-27, ce qui ne correspond pas à la date de son nom de fichier.

## Décisions pour Daniel

1. **Phrase de pratique** : « Je traite donc chaque élargissement d'autonomie comme une attribution de droits privilégiés, écrite, datée et validée par le RSSI. » Elle ne cite aucun client. Est-ce bien votre pratique ? À garder, à reformuler ou à retirer.
2. **H2 en question** : garder les deux H2 existants (licence, par quel agent commencer) ? Passer le H2 des statuts en question comme le propose le SEO ?
3. **Description** : garder « agents Defender et Sentinel », ou passer à la variante plus exacte « sur les données Defender et Sentinel » (160 caractères) ?
4. **E-E-A-T** : ajouter une expérience vécue sur la charge de triage d'un SOC ou sur l'agent de tri du phishing ?
5. **Statut GA** : à revérifier le jour de la publication (bandeaux Learn).
