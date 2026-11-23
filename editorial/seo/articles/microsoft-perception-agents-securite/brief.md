# Brief SEO : microsoft-perception-agents-securite

Date : 2026-11-23. Format : **article presse** (`category: "actualites"`,
`subcategory: "articles"`). Longueur cible : **1 100 à 1 400 mots** (plage
format 800-1 500, conforme à `serp.md`).

Entrées : `cluster.md` et `serp.md` du même dossier, section 2 de la veille
`editorial/veille/2026-11-23-revue.md`, carte `editorial/seo/mots-cles.md`.
Quand `serp.md` et la veille divergent, `serp.md` fait foi (sources Learn
relues le 2026-11-23).

Étape Find appliquée (framework et prompts © Daniel Agrici, CC BY 4.0 :
github.com/AgriciDaniel/flow). DataForSEO non branché : aucun volume, aucune
position. Intentions et SERP sont des estimations (voir limites de `serp.md`).

## 1. Mots-clés et intention

**Mot-clé principal : Microsoft Perception.** Marque nouvelle, SERP française
encore au stade de l'annonce (IT-Connect, Next.ink, Clubic). Aucune page du
site ne le vise.

Secondaires (repris de `cluster.md`, à répartir dans l'intro, les H2 et le corps) :

1. Microsoft Perception GA (title, intro)
2. agents de sécurité Microsoft Perception (H2 sur les statuts)
3. agents Defender et agents Sentinel (description, corps, H2 périmètre)
4. SOC agentique (intro et conclusion)
5. équipe rouge, bleue, verte (H2 dédié, formulation d'extrait)
6. Alert Triage Agent / Triage Agent (une section, lien vers l'article de 2025)
7. Security Copilot agents (section « ce que devient Security Copilot », jamais en title)
8. Project Perception (une mention en intro, ancien nom de la preview de juillet)
9. licence Microsoft Perception (H2 licence)

Termes sémantiques à faire vivre sans les forcer : Recon Agent, Web App Pen
Test Agent, Attack Investigation Agent, Detection Authoring Agent, Threat
Intelligence Agent, Posture Prioritization Agent, Risk Reduction Agent,
Identity Risk Reduction Agent, playbook, outcome d'agent, AI Flex Plan, MACC,
Agent ID, URBAC, « Execute hard actions », vulnerability shielding,
MAI-Cyber-2, portail Defender.

Interdits (condition anti-cannibalisation de `cluster.md`) : ni « Phishing
Triage Agent », ni « virage agentique de Defender », ni « Security Copilot E5 »
dans le title, le H1, un H2 ou la description. Le nom de l'agent de 2025
apparaît dans le corps seulement, avec le lien vers son article.

**Intention.** Dominante : informationnelle-actualité (qu'est-ce qui sort à
Ignite, qu'est-ce qui est vraiment GA). Secondaire : commerciale-évaluation
(combien, est-ce dans mon E5, que devient Security Copilot, puis-je laisser
un agent agir seul). La requête licence tombe aujourd'hui sur des pages
Security Copilot : c'est la meilleure fenêtre.

Lecteur visé : responsable SOC ou RSSI d'une organisation de taille moyenne
(équipe de quelques analystes, Defender XDR déjà en place, Sentinel parfois),
qui doit décider quoi activer en premier et à quel prix.

## 2. Title, description, slug

| Champ | Proposition | Longueur |
|---|---|---|
| `title` | Microsoft Perception en GA : ce que les agents font seuls | **57 caractères** |
| `description` | Microsoft Perception en GA : quels agents Defender et Sentinel agissent seuls, quels garde-fous régler et ce que coûte la facturation au résultat pour un SOC. | **158 caractères** |

- Mot-clé en tête du title et de la description. Aucune échéance datée, pas
  de tiret cadratin, aucun terme interdit par `cluster.md`.
- « Ce que les agents font seuls » porte l'angle (tri, autonomie réelle) et
  distingue la page des reprises d'annonce. La variante de `serp.md` avec
  « vraiment » fait 66 caractères : écartée.
- « Facturation au résultat » traduit l'« outcome » de Learn. Le terme anglais
  peut être donné une fois dans le corps.
- H1 : identique au `title` (le layout le reprend).
- `<slug>` : **`microsoft-perception-agents-securite`** (4 mots, mot-clé en
  tête, validé dans `cluster.md`). Pas de meilleure raison d'en changer.
- Fichier : `YYYY-MM-DD-microsoft-perception-agents-securite.md`, date fixée
  par `tic-publieur` au jour de la publication (exemple :
  `2026-11-25-microsoft-perception-agents-securite.md`, URL
  `/blog/2026-11-25-microsoft-perception-agents-securite/`).
- Hero : `public/images/hero/microsoft-perception-agents-securite.webp`.
  Bannière : `article-defender1` existe (au choix de l'illustrateur, ou
  `article-defender2`). Pas de schéma (format article).

## 3. Plan H2 indicatif

Ordres de grandeur. Les H2 en question servent les PAA et les moteurs IA.

**Intro, sans H2 (100-130 mots). Réponse directe, cible d'extrait.**
Dans les 100 premiers mots : Microsoft Perception, présenté en juillet sous le
nom Project Perception, passe en GA à Ignite 2026 (mi-novembre). C'est la
plateforme agentique de Defender et Sentinel : agents rouges qui simulent
l'attaque, bleus qui trient, enquêtent, écrivent des détections et produisent
du renseignement, verts qui corrigent. Six agents en GA, le reste en preview.
Facturation au résultat, séparée de Security Copilot, aucune inclusion E5
documentée. Source nommée ici une fois (billet Microsoft Security et Learn),
puis renvoi à la section Sources.

Bannière après l'introduction.

1. **H2 : Quels agents de Microsoft Perception sont vraiment en GA ?** (250 mots + tableau)
   Secondaire : « agents de sécurité Microsoft Perception », « équipe rouge,
   bleue, verte ». Le tableau de la section 6. Signaler **une fois** le
   décalage : le billet annonce la GA, plusieurs pages Learn portent encore le
   bandeau « Limited Public Preview, invitation-only » (Get started, Triage
   Agent, Risk Reduction Agent). Learn dit « Triage Agent », le billet
   « Alert Triage Agent ». Conseil pratique : vérifier le statut dans son
   propre tenant avant de planifier.

2. **H2 : Ce que chaque agent fait sans vous** (200 mots)
   Secondaire : « agents Defender ». Trois niveaux, en puces : lecture seule
   (Recon, Threat Intelligence, Posture Prioritization), proposition sans
   déploiement (Detection Authoring, testé sur 14 jours d'historique,
   Attack Investigation), action (Triage Agent qui **clôt seul les faux
   positifs** en déclenchement automatique, Risk Reduction Agent qui patche
   via Intune ou applique le shielding **après approbation**). C'est la
   question que personne ne traite dans la SERP.

3. **H2 : Les garde-fous que l'administrateur règle** (200 mots)
   Identité Agent ID dans Entra créée à la configuration, permissions
   minimales proposées, accès aux groupes de devices MDE accordé à la main,
   URBAC obligatoire, rôles Security Administrator (configurer) et Security
   Reader (lancer, suivre). Sessions « Waiting for input » (approuver,
   rejeter, proposer une alternative), Pause / Run par agent, arrêt définitif.
   Playbooks gérés par Microsoft, non modifiables. Journalisation dans l'audit
   Purview. Lien vers le dossier Entra Agent ID.

4. **H2 : Quelle licence pour Microsoft Perception ?** (180 mots)
   Secondaire : « licence Microsoft Perception ». Un seul paragraphe dense
   plus une liste : facturation à l'outcome d'agent (alerte triée, rapport
   d'enquête, rapport de détection, rapport TI, évaluation de posture,
   reconnaissance), paiement à l'usage ou engagement AI Flex Plan (1 ou 3 ans)
   ou MACC, tarification séparée de Security Copilot, aucune grille publique,
   estimateur et budgets avec alertes, **le budget n'est pas un plafond**,
   données de coût décalées jusqu'à 24 h. Rien sur une inclusion E5 ou E7 :
   écrire « non documenté », pas « non inclus ». Prérequis de licence du
   Triage Agent par type d'alerte (MDO P2, Defender for Cloud, Entra ID P2 +
   MDI + MDCA). Pas de développement sur l'enveloppe SCU de E5 (réservée à une
   future page, voir `cluster.md` section 4).

5. **H2 : Que deviennent Security Copilot et l'ancien agent de triage ?** (180 mots)
   Secondaires : « Security Copilot agents », « Alert Triage Agent ».
   Perception ne touche à rien automatiquement. Une fois configuré, le Triage
   Agent **remplace** l'agent de triage du phishing de 2025 et reprend son
   historique, ses métriques et ses réglages. Un seul agent de triage actif.
   Retour arrière en supprimant le Triage Agent. Perception s'appuie sur
   l'infrastructure Security Copilot (plugins, permission « Security Copilot
   (read) », géographie GPU) tout en étant facturé à part. Microsoft présente
   les deux comme complémentaires (« AI that acts », « AI that assists »).
   Lien vers l'article Phishing Triage Agent, nom de l'agent dans le corps
   seulement.

6. **H2 : Des agents pour gouverner des agents, mon avis** (200 mots)
   Lecture critique de Daniel (voir section 5). Appuyée sur deux faits de
   Learn plutôt que sur une formule : la clôture automatique des faux
   positifs, et l'invitation à « réduire les approbations » des agents à fort
   taux d'acceptation. L'autonomie s'élargit par réglage, sans seuil fixé par
   Microsoft. Confronter à l'argument de Dark Reading (des agents qui
   surveillent des agents multiplient le risque), puis trancher.

7. **H2 : Par quel agent commencer dans un SOC de taille moyenne ?** (120 mots, puces)
   Réponse nette et ordonnée : commencer par les agents en lecture seule
   (Posture Prioritization, Threat Intelligence), puis le Triage Agent en mode
   manuel avant le déclenchement automatique, budget et alertes posés avant
   la première exécution, Risk Reduction Agent seulement après sortie de
   preview. C'est **mon analyse**, pas une recommandation Microsoft.

8. **Section Sources** (hors décompte) : sources primaires de la section 8,
   MC éventuel sans lien.

Pas de bloc FAQ séparé (les H2 en question suffisent, et le schéma FAQPage
n'apporte rien en SERP pour un site éditorial).

## 4. Questions auxquelles répondre (reprises de `serp.md`)

1. Qu'est-ce que Microsoft Perception, et en quoi diffère-t-il de Security Copilot ? Système agentique qui agit, facturé à part, contre assistant conversationnel.
2. Que font les agents rouges, bleus et verts ? Simuler l'attaque, détecter et enquêter, corriger.
3. Quels agents sont en GA, lesquels en preview ? Tableau, avec le décalage Learn signalé une fois.
4. Comment garder l'humain dans la boucle ? Quelles actions exigent une approbation ? Sessions en attente, Pause / Run, « Execute hard actions » pour le Risk Reduction Agent.
5. Comment Perception est-il facturé ? Comment estimer le coût ? Outcome d'agent, estimateur, budget non bloquant.
6. Qu'est-ce que l'AI Flex Plan ? Engagement de consommation sur 1 ou 3 ans, alternative au paiement à l'usage et au MACC.
7. Est-ce inclus dans Microsoft 365 E5 ou E7 ? Non documenté.
8. Que devient mon Phishing Triage Agent ? Remplacé par le Triage Agent dès sa configuration, historique repris, retour arrière possible.
9. Par quel agent commencer prudemment ? Lecture seule d'abord, triage en manuel ensuite.

## 5. Apport original attendu

Ce que l'article apporte et qu'aucun des cinq premiers résultats ne donne :

- **Le statut agent par agent**, avec ce que chacun fait seul. Le tableau
  n'existe nulle part en français.
- **Le décalage entre l'annonce et Learn**, dit une fois, avec la conséquence
  pratique : la GA du billet ne vaut pas disponibilité dans votre tenant.
- **La clôture automatique des faux positifs** par le Triage Agent, fait le
  plus concret de l'autonomie, absent de la SERP.
- **Les garde-fous réels** (Agent ID, URBAC, groupes de devices, « Execute
  hard actions », playbooks non modifiables) au lieu de la formule
  « humans in control ».
- **La licence telle que Learn la décrit** : outcome, budget qui n'est pas un
  plafond, facturation séparée, inclusion E5 non documentée. Correction
  implicite d'IT-Connect (SCU), sans la nommer comme une erreur tant qu'elle
  n'est pas confirmée.
- **La lecture critique de Daniel** sur « gouverner des agents par des
  agents » : la question n'est pas de savoir si l'agent se trompe, mais qui
  décide d'élargir son autonomie, sur quel indicateur, et qui le voit. La
  réduction des approbations est un réglage d'admin, pas une décision de
  gouvernance tracée comme telle.
- **La lecture pour un SOC de taille moyenne** : ordre d'activation, budget
  posé avant, triage en manuel d'abord.
- **Contexte européen, une ou deux phrases au plus, seulement s'il sert le
  propos** : un agent qui clôt une alerte ou modifie une configuration
  engage la traçabilité exigée par NIS2 pour la gestion des incidents.
  L'audit Purview répond en partie. Ne pas qualifier Perception au regard de
  l'AI Act sans source (aucune classification publiée), ne pas avancer de
  règle EU Data Boundary (la géographie GPU passe par Security Copilot : à
  citer seulement comme fait Learn).

Marqueur d'expérience attendu (E-E-A-T) : une phrase de terrain de Daniel sur
la charge de triage d'un SOC client ou sur l'usage du Phishing Triage Agent
depuis 2025. Ne rien inventer : laisser un emplacement à valider par Daniel.

## 6. Éléments GEO attendus

- **Réponse directe dans les 100 premiers mots** : GA à Ignite 2026,
  plateforme agentique Defender et Sentinel, trois équipes, six agents GA,
  facturation au résultat séparée de Security Copilot, inclusion E5 non
  documentée.
- **Chiffres exacts, sources en fin d'article.** Règle « Sources et dates sans
  lourdeur » du 2026-11-19, qui prime sur la recommandation GEO habituelle :
  la source (billet Microsoft Security, Learn) est nommée une ou deux fois en
  tête, puis les faits sont énoncés sans « selon », « d'après la FAQ » à
  chaque paragraphe, et tout est renvoyé à la section Sources. Dates à la
  granularité utile (« mi-novembre ») et dites une fois. Les chiffres restent
  précis (14 jours d'historique, 24 h de décalage, 1 ou 3 ans d'engagement).
  Phrases extractibles de 15 à 30 mots, une idée par phrase.
- **Tableau obligatoire** (H2 n° 1) :

  | Agent | Équipe | Statut | Ce qu'il fait seul |
  |---|---|---|---|
  | Recon Agent | rouge | GA | évaluation en lecture seule, n'attaque pas, ne corrige rien |
  | Web App Pen Test Agent | rouge | preview | teste une application web autorisée |
  | Triage Agent (Alert Triage Agent) | bleu | GA | classe l'alerte et clôt seul les faux positifs en mode automatique, laisse les vrais positifs à l'analyste |
  | Attack Investigation Agent | bleu | GA | rapport d'enquête et recommandations, actions critiques soumises à approbation |
  | Detection Authoring Agent | bleu | GA | propose des détections testées sur 14 jours, ne les déploie pas |
  | Threat Intelligence Agent | bleu | GA | rapport TI, ne bloque aucun indicateur |
  | Posture Prioritization Agent | vert | GA | rapport priorisé, ne corrige rien |
  | Risk Reduction Agent | vert | public preview | exécute un plan (patch Intune, shielding) après approbation |
  | Identity Risk Reduction Agent | vert | à confirmer | recommande des changements d'accès conditionnel à approuver |

  Une note sous le tableau : statuts du billet de mi-novembre, bandeau preview
  encore présent sur certaines pages Learn.
- **Listes à puces** : les trois niveaux d'autonomie (H2 n° 2), les éléments
  de facturation (H2 n° 4), l'ordre d'activation (H2 n° 7).
- **H2 en question** : n° 1, 4, 5, 7.
- **Entités nommées exactes** : Microsoft Perception, Project Perception,
  Microsoft Defender XDR, Microsoft Sentinel, portail Microsoft Defender,
  Microsoft Security Copilot, Microsoft Entra Agent ID, Microsoft Intune,
  Microsoft Purview (audit), Defender for Office 365 P2, Defender for
  Identity, Defender for Cloud Apps, Defender for Cloud, Entra ID P2,
  AI Flex Plan, MACC, MAI-Cyber-2, et les noms d'agents du tableau.
- Pas de numéro MC dans le corps.
- Schéma : `NewsArticle` (ou `Article` standard du site) + `BreadcrumbList`.

## 7. Liens internes sortants

Fichiers vérifiés dans `src/content/blog/` le 2026-11-23.

| Fichier | URL | Ancre suggérée | Emplacement | Niveau |
|---|---|---|---|---|
| `2026-04-29-article-phishing-triage-agent.md` | `/blog/2026-04-29-article-phishing-triage-agent/` | le premier agent de triage Defender, présenté en 2025 | H2 n° 5 | obligatoire |
| `dossier-2026-04-15-entra-agent-id.md` | `/blog/dossier-2026-04-15-entra-agent-id/` | identité d'agent dans Entra | H2 n° 3 | obligatoire (hub du pilier) |
| `2026-10-19-copilot-televersement-agents-avances.md` | `/blog/2026-10-19-copilot-televersement-agents-avances/` | qui a le droit de déployer des agents | H2 n° 6 | recommandé |
| `2026-07-08-dossier-dspm.md` | `/blog/2026-07-08-dossier-dspm/` | les agents de posture de Purview | H2 n° 2 ou 6 (agents de posture) | optionnel |

L'ancre vers l'article de 2025 ne reprend pas « virage agentique ». Liens à
poser plus tard : future page Security Copilot E5 (H2 n° 4), future page
Sentinel dans Defender (intro ou H2 n° 1). Liens entrants : `cluster.md`
section 7, commit `seo: linking` par `tic-publieur`.

## 8. Sources primaires à citer

1. Microsoft Security Blog, « Security for the agentic era, powered by Microsoft
   Perception » (17/11/2026), **source des statuts** :
   https://microsoft.com/en-us/security/blog/2026/11/17/security-for-the-agentic-era-powered-by-microsoft-perception
2. Microsoft Learn, What is Perception? (vue d'ensemble) :
   https://learn.microsoft.com/en-us/security/agentic-security/agentic-security-overview
3. Microsoft Learn, catégories d'agents (13/11/2026) :
   https://learn.microsoft.com/en-us/security/agentic-security/agentic-security-agent-categories
4. Microsoft Learn, Triage Agent (18/11/2026), FAQ incluse (remplacement de
   l'agent de 2025, prérequis de licence, audit Purview) :
   https://learn.microsoft.com/en-us/security/agentic-security/triage-agent
5. Microsoft Learn, Risk Reduction Agent (16/11/2026) :
   https://learn.microsoft.com/en-us/security/agentic-security/risk-reduction-agent
6. Microsoft Learn, résultats et coûts (16/11/2026) :
   https://learn.microsoft.com/en-us/security/agentic-security/agentic-security-outcomes
7. Microsoft Learn, gérer les coûts (20/11/2026) :
   https://learn.microsoft.com/en-us/security/agentic-security/agentic-security-manage-costs
8. Microsoft Learn, Get started et superviser le travail des agents :
   https://learn.microsoft.com/en-us/security/agentic-security/agentic-security-get-started
   et https://learn.microsoft.com/en-us/security/agentic-security/agentic-security-supervise-work
9. Page produit Microsoft Perception (positionnement, facturation séparée) :
   https://www.microsoft.com/fr-fr/security/business/microsoft-perception-agentic-system
10. Tech Community, blog Perception, Ignite 2026 (lu par WebFetch le 23/11) :
    https://techcommunity.microsoft.com/blog/perception-blog/whats-new-with-microsoft-perception-at-ignite-2026/4571834
11. Contexte critique, source tierce : Dark Reading (lu par extrait seulement,
    403 au fetch) :
    https://darkreading.com/cybersecurity-operations/ai-agents-insider-threats-inside-microsoft-unified-security-stack

## 9. À confirmer, ne pas écrire comme un fait

- **Facturation en SCU** (IT-Connect) : contredite par la page produit et
  Learn. Ne pas la reprendre sans confirmation Microsoft.
- **Statut de l'Identity Risk Reduction Agent** : absent du billet, non
  précisé par Learn. Écrire « statut non précisé ».
- **Statut GA par agent** : repose sur le billet, pas sur Learn (bandeaux
  preview). À revérifier le jour de la publication.
- **Inclusion E5 ou E7** : non documentée. Ne pas écrire « exclue ».
- **Règle pour les exécutions échouées ou relancées** : Learn ne la fixe pas.
- **Grille de prix** : aucune publique.
- Numéro Message Center : aucun trouvé. S'il apparaît, section Sources
  seulement.

## 10. Après publication

- Carte `mots-cles.md` : passer la ligne « Microsoft Perception » en `publié`
  avec l'URL réelle. La ligne « Security Copilot Microsoft 365 E5 » reste
  `à créer`.
- Rafraîchissement léger de l'article Phishing Triage Agent (`cluster.md`
  section 6), via `/tic-seo` après OK de Daniel.
- Fraîcheur : relecture quand les bandeaux preview tombent sur Learn ou à la
  sortie de preview du Risk Reduction Agent.
