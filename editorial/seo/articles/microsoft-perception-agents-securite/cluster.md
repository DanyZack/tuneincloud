# Cluster : Microsoft Perception (article presse)

Analyse du 2026-11-23 pour le slug provisoire `microsoft-perception-agents-securite`.
Agent : seo-cluster (plugin claude-seo), lancé par `/tic-pipeline`.

**Limite de méthode.** DataForSEO n'est pas branché. Les SERP ont été lues avec
la recherche web gratuite, localisée US et en anglais. Les recouvrements cités
plus bas sont des estimations (URL communes repérées dans les résultats), pas
des comptages top 10 sur google.fr. Aucun volume de recherche disponible.

## 1. Cluster de rattachement

- **Pilier** : IA, Copilot et Defender (hub provisoire `/blog/dossier-2026-04-15-entra-agent-id/`).
- **Cluster** : Agents de sécurité. Confirmé.
- **Rôle proposé** : l'article Perception devient la page de tête du cluster
  Agents de sécurité (la plus large du sujet : plateforme, équipes rouge, bleue,
  verte, garde-fous, licence). Le Phishing Triage Agent et la future page
  Security Copilot E5 s'y rattachent. C'est aussi la première pierre du futur
  pilier Defender, qui restera fusionné tant qu'il n'a pas trois ou quatre pages
  (candidat suivant : Sentinel dans Defender, ISOC, sujet 3 de la même veille).
- **Format** : article presse (`actualites` / `articles`, 800-1500 mots). Il n'a
  pas la taille d'un pilier (2500-4000 mots) : c'est un nœud de cluster, pas le
  hub. Le hub reste le dossier Entra Agent ID jusqu'à la création d'un dossier
  Defender.

## 2. Mot-clé principal et variantes

**Mot-clé principal retenu : « Microsoft Perception »** (marque, nouvelle, SERP
encore faible en français : Next.ink et IT-Connect restent au niveau de
l'annonce). Intention : informationnelle et commerciale (évaluation). Gabarit :
article presse à angle critique (ce qui est GA, ce qui agit seul, licence).

| Variante (FR) | Intention | Usage conseillé |
|---|---|---|
| Microsoft Perception GA | informationnelle (actualité) | titre ou H1 |
| agents de sécurité Microsoft Perception | informationnelle | H2 « quels agents sont en GA » |
| agents Defender | informationnelle | corps, H2 ; trop large pour un mot-clé principal |
| agents Sentinel / Perception Defender Sentinel | informationnelle | description, un H2 sur le périmètre portail Defender |
| SOC agentique | informationnelle (concept) | introduction et conclusion ; Microsoft l'emploie (« agentic SOC »), la presse FR aussi |
| équipe rouge, bleue, verte (agents red team, blue team, green team) | informationnelle | H2 dédié, formulation idéale pour un extrait GEO |
| Alert Triage Agent | informationnelle | une mention, lien vers l'article Phishing Triage |
| Security Copilot agents | commerciale | une section « ce que devient Security Copilot », sans en faire le titre |
| Project Perception | navigationnelle (ancien nom de la preview de juillet) | une mention dans l'introduction pour capter l'ancien nom |
| licence Microsoft Perception | commerciale | H2 licence, si le modèle est confirmé par Learn |

Écartés : « Security Copilot Microsoft 365 E5 » (réservé à une autre page, voir 4),
« Phishing Triage Agent » (déjà pris).

## 3. Recouvrement de SERP estimé

| Paire | URL communes repérées | Lecture |
|---|---|---|
| Microsoft Perception GA / Security Copilot agents M365 E5 | 0 | séparés : la première SERP est faite d'actualités Ignite 2026 et du Learn Perception, la seconde des pages produit Microsoft « Security Copilot in Microsoft 365 E5 » et du billet de novembre 2025 |
| Microsoft Perception / Phishing Triage Agent | 0 | séparés : Learn defender-xdr, Marketplace, arXiv d'un côté, presse Ignite de l'autre |
| Microsoft Perception / SOC agentique Defender Sentinel | 1 à 2 (billet Microsoft Security, Tech Community) | maillage, pas fusion |
| Security Copilot agents M365 E5 / Phishing Triage Agent | 1 (billet E5 de novembre 2025) | maillage |

Microsoft sépare d'ailleurs les deux produits sur sa page Project Perception :
Perception est le système agentique (« AI that acts »), Security Copilot
l'interface conversationnelle d'assistance (« AI that assists »). Pas de
renommage constaté au 2026-11-23.

## 4. Sort de la ligne « Security Copilot Microsoft 365 E5 »

**Décision proposée : les deux mots-clés coexistent. La ligne n'est pas
remplacée.**

Raisons :
1. SERP distinctes (0 URL commune estimée) et intentions distinctes : la ligne
   E5 est une requête de licence et de capacité (SCU inclus, 400 par tranche de
   1 000 licences, plafond, throttling, overage), la page Perception est une
   requête d'actualité produit.
2. Security Copilot n'est pas absorbé : Microsoft présente les deux comme
   complémentaires. Les agents de 2025 migrent vers le portail Defender et
   Perception, mais la marque et l'enveloppe SCU E5 restent.
3. Fusionner forcerait l'article presse à traiter un sujet de licence en
   profondeur, au-delà de 1500 mots.

Mise à jour à faire dans `editorial/seo/mots-cles.md` (par `/tic-pipeline` à la
création du brief, pas par cet agent) :

| Mot-clé principal | Page | Statut | Cluster |
|---|---|---|---|
| Microsoft Perception | `/blog/<date>-microsoft-perception-agents-securite/` | planifié | Agents de sécurité (tête de cluster) |
| Security Copilot Microsoft 365 E5 | à créer (guide `ia` ou `defender`... voir note) | à créer | Agents de sécurité |

Note : la subcategory `defender` existe dans le schéma Zod. Le futur guide
Security Copilot E5 (capacité SCU, activation, choix des agents) irait en
`guides/defender`. À réévaluer si Microsoft fusionne la facturation SCU dans
Perception : la ligne pourrait alors devenir « licence Microsoft Perception ».

Garde-fou contre la cannibalisation interne : l'article Perception traite la
licence en un paragraphe (ce qui est connu, ce qui est « à vérifier ») et
renvoie à la page E5 quand elle existera. Il ne met « Security Copilot E5 » ni
dans le titre, ni dans un H2.

## 5. Cannibalisation avec l'existant

Vérification sur les 25 titres de `src/content/blog/*.md`.

| Page existante | Risque | Verdict |
|---|---|---|
| `2026-04-29-article-phishing-triage-agent` (« Phishing Triage Agent : la tête de pont du virage agentique de Microsoft Defender ») | moyen sur le thème « virage agentique de Defender », nul sur le mot-clé | **pas de cannibalisation**, à condition que l'article Perception ne reprenne ni « Phishing Triage Agent » ni « virage agentique de Defender » dans titre, H1, H2 ou description. L'ancien article garde l'histoire de l'agent (2025), le nouveau la plateforme (2026) |
| `dossier-2026-04-15-entra-agent-id` | faible (identités des agents) | aucune : Perception configure une identité et des rôles par agent, c'est un lien, pas un recouvrement |
| `2026-10-19-copilot-televersement-agents-avances` | nul (agents Copilot M365, pas sécurité) | aucune |
| `2026-04-29-article-claude-copilot-m365` | nul | aucune |
| `2026-07-08-dossier-dspm` | nul (cite le Data Security Posture Agent) | aucune, lien optionnel |

**Cannibalisation : non.**

## 6. L'article Phishing Triage Agent doit-il être rafraîchi ?

**Oui, rafraîchissement léger, après publication de l'article Perception.**
Pas de réécriture : la page garde son mot-clé et son angle historique.

Points constatés :
- Microsoft présente désormais le Security Alert Triage Agent comme
  l'évolution du Phishing Triage Agent (phishing, puis alertes identité et
  cloud), et l'Alert Triage Agent figure parmi les quatre agents bleus GA de
  Perception. L'article dit encore que l'extension identité et cloud n'est
  « pas encore active » : à corriger après vérification sur Learn.
- Le mode overage à 6 $ par SCU était « à venir » en avril : à vérifier.
- Le compteur « trente-sept agents » est daté d'Ignite 2025.
- La page n'a **aucun lien interne** sortant. Elle est orpheline côté maillage.
- Hors SEO pur : hero externe `i.ytimg.com` (toléré sur l'existant),
  `pubDate: 2026-04-27` alors que le fichier est daté du 29 (sans effet sur
  l'URL, à laisser).

Forme du rafraîchissement : `updatedDate`, un encadré court en tête
(« Depuis Ignite 2026, l'agent devient l'Alert Triage Agent de Microsoft
Perception », lien vers le nouvel article), correction du paragraphe
« Le périmètre », ajout de deux liens internes. Commit `seo: fraîcheur — ...`
via `/tic-seo` après OK de Daniel.

## 7. Liens à poser

### Sortants (depuis l'article Perception)

| Cible | Ancre suggérée | Emplacement | Niveau |
|---|---|---|---|
| `/blog/2026-04-29-article-phishing-triage-agent/` | « le Phishing Triage Agent, premier agent Defender en GA » | section Security Copilot / Alert Triage | obligatoire (même cluster) |
| `/blog/dossier-2026-04-15-entra-agent-id/` | « identité d'agent dans Entra » | section garde-fous (identité et rôles des agents) | obligatoire (hub du pilier) |
| future page Security Copilot E5 | « l'enveloppe SCU incluse dans E5 » | section licence | à poser quand la page existe |
| future page Sentinel dans Defender (ISOC) | « Sentinel dans le portail Defender » | section périmètre | à poser quand la page existe |
| `/blog/2026-10-19-copilot-televersement-agents-avances/` | « qui a le droit de déployer des agents » | conclusion (gouvernance des agents) | optionnel |

### Entrants (vers l'article Perception, commit `seo: linking — liens entrants vers <id>`)

| Source | Ancre suggérée | Où | Niveau |
|---|---|---|---|
| `/blog/2026-04-29-article-phishing-triage-agent/` | « Microsoft Perception » | encadré de mise à jour en tête + section « Le premier d'une famille qui s'étend » | obligatoire |
| `/blog/dossier-2026-04-15-entra-agent-id/` | « les agents de sécurité de Microsoft Perception » | partie sur les agents Microsoft gouvernés par Agent ID | obligatoire |
| `/blog/2026-07-08-dossier-dspm/` | « plateforme agentique Microsoft Perception » | paragraphe Data Security Posture Agent | recommandé |
| `/blog/2026-10-19-copilot-televersement-agents-avances/` | « agents de sécurité » | si une phrase sur les agents hors Copilot M365 s'y prête, sinon ne rien forcer | optionnel |

Cible : trois liens entrants au moins (Phishing Triage, Entra Agent ID, DSPM).
Seuil de la checklist atteint. Le Phishing Triage Agent passe en même temps de
zéro à deux liens sortants.

## 8. Contrôles

- Un seul mot-clé principal par page : oui (Perception, Phishing Triage, Security Copilot E5 distincts).
- Page Perception reliée au hub : oui (Entra Agent ID, bidirectionnel).
- Pas d'orpheline après maillage : la page Phishing Triage cesse de l'être.
- Gabarit conforme à l'intention (actualité informationnelle, article presse) : oui.
- Taille du cluster Agents de sécurité : 2 pages publiées ou planifiées + 1 à créer, dans la contrainte 2-4.
- Licence et statut GA/preview par agent : à vérifier sur Learn avant rédaction (la veille ne l'a pas relevé, la presse non plus).

## Sources consultées

- Microsoft Learn, « What is Perception? » (agentic-security-overview), mis à jour fin octobre 2026.
- Microsoft Security Blog, billet Perception du 17 novembre 2026, et blog Tech Community Perception (Ignite 2026), via les résultats de recherche.
- Page produit Microsoft Project Perception (positionnement Perception / Security Copilot).
- Microsoft Learn, Phishing Triage Agent, et fiche Marketplace Security Alert Triage Agent.
- Microsoft Security Blog, « Security Copilot with Microsoft 365 E5 », novembre 2025.
- Presse : SecurityWeek, Petri, Windows Report, IT-Connect, Next.ink (titres et extraits de SERP).
