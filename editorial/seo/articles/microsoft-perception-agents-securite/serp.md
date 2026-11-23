# SERP à rebours : Microsoft Perception (article presse)

Analyse du 2026-11-23, agent seo-sxo (plugin claude-seo), lancée par `/tic-pipeline`.
Slug provisoire : `microsoft-perception-agents-securite`.

**Limite de méthode.** DataForSEO n'est pas branché. La recherche web gratuite
est localisée US : les SERP françaises, belges, suisses et canadiennes sont
**estimées** à partir de requêtes en français et en anglais, pas relevées sur
google.fr / .be / .ch / .ca. Pas de volumes, pas de positions réelles, pas de
lecture des fonctionnalités SERP (PAA, AI Overview) : les questions récurrentes
viennent des FAQ officielles et des titres de résultats. SecurityWeek et Dark
Reading renvoient un 403 au fetch : lus uniquement par leurs extraits.

## 1. Type de page attendu

| Requête testée | Résultats dominants (estimés) | Type |
|---|---|---|
| Microsoft Perception generally available Ignite 2026 | SecurityWeek, Petri, Windows Report, Let's Data Science, pbxscience | actualité |
| Microsoft Perception sécurité agents disponibilité générale | page produit microsoft.com (fr-fr, fr-be, fr-ch, fr-ca), blog Tech Community Perception, IT-Connect, TechRepublic FR, Clubic | produit + actualité |
| "Microsoft Perception" SOC agentique Defender | blog Tech Community, billet Microsoft Security, WWT, Futurum, Forrester, Clubic | officiel + analyse |
| Microsoft Perception red blue green agents criticism | Learn (catégories d'agents), Forrester, Dark Reading, Futurum, TechRepublic | doc + analyse |
| Microsoft Perception licensing pricing | pages Security Copilot pricing, Learn SCU, Aragon Research | produit (mauvaise correspondance) |

**Consensus : actualité / analyse (environ 60 %)**, puis pages officielles
(produit et Learn, environ 35 %). Aucune page de procédure dans le haut des
résultats. Le format **article presse** de TuneInCloud est **ALIGNÉ** avec la
SERP. Un guide serait un décalage (MEDIUM) tant que la SERP reste au stade de
l'annonce.

## 2. Intentions

- **Dominante : informationnelle (actualité)**. « Qu'est-ce que Perception, qu'est-ce qui est sorti à Ignite ? »
- **Secondaire : commerciale (évaluation)**. « Combien ça coûte, est-ce compris dans mon E5, que devient Security Copilot, puis-je laisser les agents agir ? » La requête licence tombe aujourd'hui sur les pages Security Copilot : aucune page ne répond pour Perception, c'est la meilleure fenêtre.

## 3. Format TuneInCloud conseillé

**Article presse, `actualites` / `articles`, 1100 à 1400 mots.** Confirme le
cluster. Structure suggérée (H2) :

1. Ce qui est en GA, ce qui reste en preview (tableau rouge / bleu / vert, statut, ce que l'agent peut faire seul)
2. Ce que l'agent fait sans vous : le Triage Agent ferme seul les faux positifs
3. Les garde-fous que l'admin règle (identité Agent ID, URBAC, approbations, pause, arrêt)
4. Licence : une facture à l'outcome, hors Security Copilot
5. Phishing Triage Agent et Security Copilot : ce qui change
6. Des agents pour gouverner des agents : lecture critique

Schema conseillé : `NewsArticle` + `BreadcrumbList` (standard du site). Pas de `FAQPage` (sans effet en SERP pour un site commercial ou éditorial depuis 2023), mais une section de questions courtes reste utile pour les moteurs IA.

## 4. Questions récurrentes

Issues de la FAQ de la page produit Microsoft (11 questions) et des titres de presse :

1. Qu'est-ce que Microsoft Perception, et en quoi diffère-t-il de Security Copilot ?
2. Que font les agents rouges, bleus et verts ?
3. Quels agents sont en GA, lesquels en preview ?
4. Comment garder l'humain dans la boucle ? Quelles actions exigent une approbation ?
5. Comment Perception est-il facturé ? Comment estimer le coût ?
6. Qu'est-ce que l'AI Flex Plan ?
7. Est-ce inclus dans Microsoft 365 E5 / E7 ? (non posée par Microsoft, posée par la recherche « licensing »)
8. Que devient mon Phishing Triage Agent ?
9. Comment commencer prudemment (quel agent en premier) ?

## 5. Angles absents des cinq premiers résultats

Lus : IT-Connect (18/11, environ 1300 mots), Clubic (28/07, environ 650 mots, preview), TechTarget (04/08, environ 450 mots), page produit Microsoft, blog Tech Community. SecurityWeek, Petri et Windows Report vus par extraits.

| Angle | Couvert par la SERP ? |
|---|---|
| Statut GA / preview **agent par agent**, et divergence avec Learn | non (IT-Connect et Tech Community ne donnent que la plateforme GA) |
| Ce que chaque agent fait **seul** (lecture seule, recommandation, action) | non |
| Le Triage Agent qui **résout automatiquement** les faux positifs | non |
| Garde-fous concrets : Agent ID, URBAC, groupes de devices MDE, permission « Execute hard actions », réduction des approbations | non (formule générique « humans in control ») |
| Modèle de facturation à l'**outcome** (alerte triée, rapport d'enquête) et budget qui n'est pas un plafond | non. IT-Connect parle de SCU, ce que Learn ne dit pas |
| Inclusion E5 / E7 : rien n'indique que l'enveloppe SCU couvre Perception | non |
| Remplacement du Phishing Triage Agent par le Triage Agent | non |
| Prérequis de licence par type d'alerte (MDO P2, Entra ID P2, MDI, MDCA, Defender for Cloud) | non |
| Lecture critique « des agents qui gouvernent des agents » | partiel (Dark Reading, Forrester, Futurum en anglais, rien en français) |
| Lecture pour un SOC de taille moyenne | non |

## 6. Faits officiels relevés

### Statuts

Annonce officielle, billet Microsoft Security du 17 novembre :
<https://microsoft.com/en-us/security/blog/2026/11/17/security-for-the-agentic-era-powered-by-microsoft-perception>

| Agent | Équipe | Statut (billet du 17/11) | Ce qu'il fait seul (Learn) |
|---|---|---|---|
| Recon Agent | rouge | GA | évaluation en lecture seule, n'exécute pas d'attaque, ne corrige rien |
| Web App Pen Test Agent | rouge | preview | teste une application web autorisée |
| Alert Triage Agent (« Triage Agent » dans Learn) | bleu | GA | en déclenchement automatique, classe l'alerte et **résout seul les faux positifs** ; les vrais positifs restent ouverts pour l'analyste |
| Attack Investigation Agent | bleu | GA | rapport d'enquête et recommandations ; les actions critiques demandent approbation |
| Detection Authoring Agent | bleu | GA | propose des détections testées sur 14 jours d'historique, **ne les déploie pas** |
| Threat Intelligence Agent | bleu | GA | rapport TI, ne bloque aucun indicateur |
| Posture Prioritization Agent | vert | GA | rapport priorisé, ne corrige rien |
| Risk Reduction Agent | vert | public preview | exécute un plan (patch Intune, shielding) **après approbation** ; l'identité de l'agent reçoit « Execute hard actions » |
| Identity Risk Reduction Agent | vert | non précisé (absent du billet) | recommande des changements d'accès conditionnel à approuver |

Autres éléments en preview selon le même billet : vulnerability shielding,
intégrations SIEM / SOAR tierces, MAI-Cyber-2 ; AI Readiness Initiatives en preview
en janvier 2027.

Sources Learn :
- Catégories d'agents (ms.date 2026-11-13) : <https://learn.microsoft.com/en-us/security/agentic-security/agentic-security-agent-categories>
- Triage Agent (ms.date 2026-11-18) : <https://learn.microsoft.com/en-us/security/agentic-security/triage-agent>
- Risk Reduction Agent (ms.date 2026-11-16) : <https://learn.microsoft.com/en-us/security/agentic-security/risk-reduction-agent>
- Résultats et coûts (ms.date 2026-11-16) : <https://learn.microsoft.com/en-us/security/agentic-security/agentic-security-outcomes>

**Divergence à signaler dans l'article.** Plusieurs pages Learn portent encore,
au 2026-11-23, le bandeau « Limited Public Preview, invitation-only » : Get
started (ms.date 2026-07-31), Triage Agent (2026-11-18), Risk Reduction Agent
(2026-11-16). La page Vue d'ensemble n'a pas de bandeau. Le statut GA repose
donc sur le billet du 17/11 et la page produit, pas sur Learn. Learn nomme aussi
« Triage Agent » ce que le billet appelle « Alert Triage Agent ».

Le blog Perception sur Tech Community
(<https://techcommunity.microsoft.com/blog/perception-blog/whats-new-with-microsoft-perception-at-ignite-2026/4571834>)
**a pu être lu** cette fois par WebFetch. Il annonce la GA de la plateforme mais
n'étiquette aucun agent GA ou preview, et ne dit rien de la licence ni de
Security Copilot. Le tableau des statuts vient du billet Microsoft Security.

### Garde-fous (Learn)

- Agent ID Entra créé à la configuration, permissions minimales proposées par l'assistant, accès aux groupes de devices MDE à accorder à la main.
- Rôles : Security Administrator pour configurer, Security Reader pour lancer et suivre une session. URBAC requis sur toutes les charges Defender.
- Session « Waiting for input » : approuver, rejeter, suggérer une alternative ; arrêt définitif possible. Pause / Run par agent.
- Learn invite à « réduire les approbations » pour les agents à fort taux d'acceptation, via les réglages de l'agent : c'est l'autonomie qui s'élargit, à surveiller.
- Playbooks gérés par Microsoft, non modifiables.
- Journalisation dans Purview audit (FAQ du Triage Agent).

Sources : <https://learn.microsoft.com/en-us/security/agentic-security/agentic-security-get-started>,
<https://learn.microsoft.com/en-us/security/agentic-security/agentic-security-supervise-work>

### Licence et consommation

- **Facturation à la consommation**, payée à l'usage ou par engagement (AI Flex Plan sur 1 ou 3 ans, ou MACC). **Tarifée séparément de Security Copilot** (« AI that acts » contre « AI that assists »). Page produit : <https://www.microsoft.com/fr-fr/security/business/microsoft-perception-agentic-system> (corps en anglais).
- Unité de coût : l'**outcome d'agent** (une alerte triée, un rapport d'enquête, un rapport de détection, un rapport TI, une évaluation de posture, une reconnaissance). Le coût varie selon la complexité. Learn ne fixe pas de règle pour les exécutions échouées ou relancées. Source : page Résultats et coûts ci-dessus.
- Estimateur (`aka.ms/perceptioncostestimator`), budgets avec alertes e-mail. **Le budget n'est pas un plafond** : Perception continue de tourner une fois le montant atteint. Données de coût décalées jusqu'à 24 h. Source : <https://learn.microsoft.com/en-us/security/agentic-security/agentic-security-manage-costs> (ms.date 2026-11-20).
- **Aucune grille de prix publique** relevée.
- **Rien sur une inclusion E5 / E7 ni sur les SCU** dans les pages Perception. L'enveloppe E5 (400 SCU par mois pour 1 000 licences, plafond 10 000) concerne Security Copilot : <https://learn.microsoft.com/en-us/copilot/security/security-copilot-inclusion>. IT-Connect écrit que Perception est facturé en SCU, ce que contredisent la page produit et Learn : **à vérifier**, à ne pas reprendre sans confirmation.
- Prérequis de licence du Triage Agent selon le type d'alerte : Defender for Office 365 P2 (e-mail), Defender for Cloud et Containers (cloud), Entra ID P2 + Defender for Identity + Defender for Cloud Apps (identité). Source : page Triage Agent.

### Security Copilot et Phishing Triage Agent (Learn, FAQ du Triage Agent)

- Perception ne change rien automatiquement au Phishing Triage Agent. Une fois le Triage Agent de Perception configuré, **il remplace le Phishing Triage Agent** et reprend l'historique, les métriques et les réglages. Un seul agent de triage actif à la fois. Retour arrière possible en supprimant le Triage Agent.
- Le Triage Agent active toujours les plugins Security Copilot (Defender XDR, Threat Intelligence, Triage Agent, Phishing Triage Agent) et demande la permission « Security Copilot (read) ». La géographie GPU est encore gérée par Security Copilot. Perception s'appuie donc sur l'infrastructure Security Copilot tout en étant facturé à part.

## 7. Recommandations pour le brief

- Titre : « Microsoft Perception » en tête, plus « GA » et l'angle tri (exemple : « Microsoft Perception en GA : ce que les agents font vraiment seuls »). Ne pas mettre « Phishing Triage Agent » ni « Security Copilot E5 » dans le titre ou un H2 (règle du cluster).
- Le tableau des statuts est l'actif différenciant : il n'existe nulle part en français. L'appuyer sur le billet du 17/11, signaler une fois la divergence avec Learn.
- Licence : un paragraphe, appuyé sur Learn (outcome, budget non bloquant, facturation séparée de Security Copilot), avec la question E5 marquée « non documentée ».
- Lecture critique : la recommandation Learn de « réduire les approbations » et la clôture automatique des faux positifs sont des faits concrets, plus parlants que la formule de Dark Reading.
- Sources et dates nommées une fois en tête, puis section Sources. Pas d'attribution phrase à phrase.

## Limites

- SERP non localisées (recherche US), positions et volumes inconnus.
- PAA, AI Overview et extraits optimisés non observés.
- SecurityWeek et Dark Reading non lus (403). Next.ink non relu ici (lu par la veille).
- Les statuts proviennent d'une annonce : les revérifier sur Learn le jour de la publication (les bandeaux preview peuvent tomber d'ici là).

## Liens utiles

Concurrence lue : <https://www.it-connect.fr/microsoft-perception-disponibilite-generale-ignite/>,
<https://www.clubic.com/actualite-623047-microsoft-devoile-perception-son-armee-d-agents-ia-concus-pour-automatiser-la-reponse-aux-cybermenaces.html>,
<https://www.techtarget.com/cybersecurity/opinion/Microsoft-Perception-Adding-agents-and-retooling-AIs-costs>,
<https://securityweek.com/microsoft-takes-perception-agentic-security-platform-out-of-preview>,
<https://darkreading.com/cybersecurity-operations/ai-agents-insider-threats-inside-microsoft-unified-security-stack>,
<https://www.forrester.com/blogs/microsofts-project-perception-announcement-and-how-to-implement-it-right/>,
<https://futurumgroup.com/insights/microsofts-project-perception-bets-on-agents-that-act-not-just-alert/>
