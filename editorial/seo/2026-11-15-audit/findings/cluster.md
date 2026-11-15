# Clustering sémantique et maillage interne : tuneincloud.fr

Audit du 2026-11-15. Périmètre : 21 articles de `src/content/blog/` (lecture seule), 5 piliers éditoriaux (Entra ID, Intune, Purview, Defender, IA/Copilot).

## 0. Méthode et limites

- Expansion : 30 requêtes candidates, 24 interrogées via WebSearch (formulations françaises, marchés FR/BE/CH/CA/LU).
- **Limite importante** : l'outil de recherche interroge un index US, pas google.fr, et renvoie 15 à 20 URL sans rang organique garanti. Les scores de recouvrement ci-dessous sont donc **estimés** à partir des URL et domaines communs observés entre deux requêtes (Learn, it-connect.fr, petri.com, ninjaone.com/fr, cloudinfra.net, anoopcnair.com, etc.). Ils indiquent une tendance. Ils ne remplacent pas une mesure DataForSEO/GSC sur google.fr (à faire si les identifiants GSC sont disponibles dans `~/.config/claude-seo/tuneincloud/`).
- Constat SERP transversal : sur presque toutes les requêtes, les résultats francophones sont rares (it-connect.fr, ninjaone.com/fr, windowsreport.com/fr, ayinedjimi-consultants.fr). Learn domine, suivi de blogs anglophones (petri, cloudinfra, anoopcnair, petervanderwoude, office365itpros). **La fenêtre francophone est ouverte** sur l'enrôlement Intune, les passkeys et la gouvernance des agents.
- Navigationnelles exclues : « portail Intune », « admin center Entra », « Knox Admin Portal ».

## 1. Inventaire et identifiants (URL = `/blog/<id>/`)

| Code | id (URL) | Format | Pilier |
|---|---|---|---|
| E1 | `2026-04-14-entra-backupandrecovery` | brève | Entra |
| E2 | `2026-04-22-windows-entra-passkeys` | brève | Entra |
| E3 | `2026-10-12-entra-memberof-groupes-dynamiques` | guide entra | Entra |
| E4 | `dossier-2026-04-15-entra-agent-id` | dossier | Entra / IA |
| I1 | `2026-04-16-intunesuite-in-m365` | brève | Intune |
| I2 | `2026-04-27-intune-datawarehouse` | brève | Intune |
| I3 | `2026-05-18-sso-linux-macos` | brève | Intune (Apple/Linux) |
| I4 | `2026-10-08-intune-baseline-windows-11-26h2` | brève | Intune |
| O1 | `old-windowsenroll` | guide intune (2023) | Intune enrôlement |
| O2 | `old-modejonctionwindows` | guide intune (2023) | Intune enrôlement |
| O3 | `old-enrollautopilotcloud` | guide intune (2023) | Intune enrôlement |
| O4 | `old-ios-entreprise` | guide intune (2023) | Intune enrôlement |
| O5 | `old-enrollabm` | guide intune (2023) | Intune enrôlement |
| O6 | `old-android-entreprise` | guide intune (2023) | Intune enrôlement |
| O7 | `old-enrollkme` | guide intune (2023) | Intune enrôlement |
| P1 | `2026-05-05-dspm-unifie` | brève | Purview |
| P2 | `2026-07-08-dossier-dspm` | dossier purview | Purview |
| P3 | `2026-07-20-purview-entrainternetaccess` | brève | Purview |
| D1 | `2026-04-29-article-phishing-triage-agent` | article | Defender |
| C1 | `2026-04-29-article-claude-copilot-m365` | article | IA/Copilot |
| C2 | `2026-10-19-copilot-televersement-agents-avances` | brève | IA/Copilot |

État actuel du maillage : **6 liens internes valides seulement** (E3→E1, E3→I4, I4→I1, I4→O1, C2→E4, C2→C1) et **5 liens cassés** (voir 4.1). 13 articles sur 21 ne reçoivent aucun lien entrant (orphelins) : E2, I2, I3, O2, O3, O4, O5, O6, O7, P1, P2, P3, D1. Le dossier DSPM (P2), deuxième contenu le plus long du site, est orphelin.

## 2. Matrice de recouvrement SERP (estimée)

| # | Requête A | Requête B | Score | Base observée | Décision |
|---|---|---|---|---|---|
| 1 | inscription iOS/iPadOS Intune ADE BYOD | Apple Business Manager Intune ADE | **5** | Learn `device-enrollment-program-enroll-ios`, `setup-automated-ios`, guides Apple Learn communs | même cluster, **risque de cannibalisation** O4/O5 |
| 2 | Purview DSPM posture sécurité données | Purview DSPM for AI configuration | **5** | Learn `data-security-posture-management-learn-about`, admindroid, petri | même cluster, **cannibalisation** P1/P2 |
| 3 | enrôlement Intune Autopilot guide | Autopilot device preparation vs Autopilot | 4 | tutoriels Learn Autopilot, techygeekshome, petri | même cluster (spoke manquant) |
| 4 | inscription appareils Intune méthodes | enrôlement Intune Autopilot | 3 | techtarget « enroll devices », Learn training enroll | interlien (pilier ↔ spoke) |
| 5 | enrôlement Autopilot | Entra joined vs hybrid vs registered | 3 | Learn `cloud-native-endpoints/entra-join-types`, tutoriel cloud native | interlien O3↔O2 |
| 6 | Android Enterprise COBO COPE | Samsung Knox Mobile Enrollment Intune | 3 | inthecloud247 (KME + COPE), petervanderwoude, Learn Android | interlien O6↔O7 |
| 7 | Platform SSO macOS Setup Assistant | Apple Business Manager Intune ADE | 3 | anoopcnair « SSO in macOS ADE », Learn PSSO during enrollment | interlien I3↔O5 |
| 8 | passkey Entra Windows Hello | passkeys Entra déploiement FIDO2 | 3 | Learn `concept-authentication-passwordless`, guides profils passkey | interlien E2 ↔ guide manquant |
| 9 | groupes dynamiques memberOf retrait | créer groupe dynamique Entra Intune | 2 | ninjaone.com/fr, Learn `groups-dynamic-membership` | posts séparés, interlien |
| 10 | DLP réseau Entra Internet Access | DLP Copilot étiquettes sensibilité | 2 | idm.net.au « Copilot gets sensitive data guardrails », techcommunity security | posts séparés, interlien |
| 11 | gouvernance agents Copilot admin | Copilot Studio MCP restreindre | 3 | Learn « Manage tools for agents », collab365 | même cluster IA |
| 12 | Entra Agent ID agents IA | gouvernance agents Copilot | 2 | Agent 365, Microsoft security blog | interlien E4↔C2 |
| 13 | Phishing Triage Agent | Security Copilot inclus E5 | 2 | microsoft.com security blog, Learn Security Copilot | posts séparés, même pilier |
| 14 | Intune Suite E3/E5 | Endpoint Privilege Management | 1 | intunestuff.com (domaine seul) | séparé, interlien éditorial |
| 15 | Entra Backup and Recovery | groupes dynamiques memberOf | 1 | it-connect.fr, office365itpros (domaines, pas d'URL) | séparé, interlien éditorial (déjà fait) |
| 16 | Claude dans Copilot UE | gouvernance agents Copilot | 1 | aucun | séparé, même pilier IA |
| 17 | accès conditionnel stratégies | passkey Entra | 1 | aucun | séparé |
| 18 | baseline sécurité Windows 11 Intune | Intune Suite E3/E5 | 0 | aucun | séparé |

Aucune paire n'atteint 7+ (fusion obligatoire). Les deux paires à 5 concernent des articles **existants** : ce sont les deux cannibalisations prioritaires.

## 3. Architecture hub-and-spoke

### Pilier 1 : Intune (hub à créer, consolidation des old-*)

**Hub proposé** : « Enrôlement Intune : Windows, Apple et Android, le guide complet » (mot-clé : *enrôlement Intune* / *inscription appareils Intune*). Format **dossier `intune`** (2500-4000 mots). Le format guide plafonne à 2500 mots dans le schéma éditorial, insuffisant pour un pilier multiplateforme. Contenu : arbre de décision par plateforme et par propriété (entreprise/BYOD), licences (Intune Plan 1, Entra ID P1), puis renvoi vers chaque spoke. Les old-* restent en ligne comme spokes, rafraîchis (terminologie « Azure AD » → « Entra ID », titres datés).

| Cluster | Spokes existants | Spoke manquant | Intent |
|---|---|---|---|
| A. Windows | O1 inscription Windows, O2 modes de jonction, O3 Autopilot | **Autopilot device preparation vs Autopilot classique** | informationnel / how-to |
| B. Apple | O4 méthodes iOS/iPadOS, O5 ABM/ADE, I3 SSO macOS (actu) | (Platform SSO peut rester dans I3) | how-to |
| C. Android | O6 Android Enterprise, O7 Knox KME | aucun (O7 à rafraîchir : Samsung signale un incident COPE via KME dans une KBA du 10/11/2026, à vérifier avant citation) | how-to |
| D. Sécurité, licences, reporting | I4 baseline 26H2, I1 Intune Suite E3/E5, I2 Data Warehouse | **Endpoint Privilege Management : guide de déploiement** | commercial / how-to |

Remarque : le cluster D n'a pas de recouvrement SERP avec l'enrôlement (scores 0-1). Il dépend du hub Intune par cohérence de pilier, pas par SERP. Il pourra devenir un second hub (« Sécuriser Windows 11 avec Intune ») quand 2 guides evergreen existeront.

### Pilier 2 : Entra ID

**Hub à créer** (priorité 2, après les spokes) : « Sécuriser Entra ID en 2026 : authentification, groupes, résilience ». En attendant, pas de hub : maillage en réseau.

| Cluster | Spokes existants | Spoke manquant |
|---|---|---|
| A. Authentification sans mot de passe | E2 passkeys Windows (actu) | **Passkeys Entra ID : guide de déploiement** (profils, attestation, Authenticator, Windows Hello), option **Accès conditionnel : stratégies de base** |
| B. Gouvernance et résilience de l'annuaire | E3 memberOf, E1 Backup and Recovery | **Groupes dynamiques Entra ID : règles, syntaxe, filtres Intune** |

### Pilier 3 : Purview

**Hub existant** : P2 (dossier DSPM), à renforcer comme page de référence pour *Purview DSPM* et *DSPM for AI*.

| Cluster | Spokes |
|---|---|
| A. Posture et DSPM | P1 (actu GA, à subordonner à P2) |
| B. DLP et IA | P3 DLP réseau via Entra Internet Access, **DLP Purview pour Microsoft 365 Copilot** (manquant) |

### Pilier 4 : IA, agents et Copilot (transverse Entra / Defender / Copilot)

**Hub intérimaire** : E4 (dossier Entra Agent ID), seul contenu long sur la gouvernance des agents. Il cite déjà Copilot Studio, Agent 365, Entra Internet Access et Security Copilot.

| Cluster | Spokes |
|---|---|
| A. Gouvernance Copilot | C1 Claude dans Copilot, C2 téléversement agents avancés |
| B. Agents de sécurité (Defender) | D1 Phishing Triage Agent, **Security Copilot inclus dans M365 E5 : agents, SCU, prérequis** (manquant) |

Defender n'a qu'un article : il ne justifie pas encore un pilier propre. Le rattacher au pilier IA jusqu'à 3 articles.

## 4. Cannibalisations et anomalies

| # | Pages | Requête disputée | Gravité | Action |
|---|---|---|---|---|
| K1 | P1 `2026-05-05-dspm-unifie` vs P2 `2026-07-08-dossier-dspm` | *Purview DSPM unifié* | **Haute** (score 5, titres quasi identiques) | P2 = page cible. Dans P1 : remplacer « Un dossier complet arrive bientôt » (description) par un lien vers P2, recentrer le titre sur l'actualité datée (GA mai 2026). Pas de canonical croisée (contenus distincts). |
| K2 | O4 `old-ios-entreprise` vs O5 `old-enrollabm` | *inscription ADE Intune* | **Moyenne** (score 5) | O4 = méthodes Apple (BYOD, inscription utilisateur par compte, Configurator). O5 = procédure ABM/ADE. Réduire dans O4 la section « A. Profils d'enrôlement ADE » à un résumé + lien vers O5 (O4 dit déjà « Voir article sur l'inscription automatique ADE » sans lien). |
| K3 | O1 / O3 / futur hub | *inscription Windows Intune* / *enrôlement Intune* | Moyenne (à venir) | Le hub vise *enrôlement Intune* (multiplateforme). O1 se recentre sur *inscription Windows Intune*. O3 sur *Autopilot*. Le futur spoke « device preparation » vise *Autopilot device preparation*, pas *Autopilot*. |
| K4 | E2 vs futur guide passkeys | *passkeys Entra* | Faible (anticipée) | E2 reste l'actu GA Windows. Le guide prend *déployer passkeys Entra ID*. |
| K5 | E3 vs futur guide groupes dynamiques | *groupes dynamiques Entra* | Faible (score 2) | E3 = *retrait memberOf*. Le guide = *créer règle groupe dynamique*. |
| K6 | O6 vs O7 | *Android Intune* | Faible (score 3) | Aucune action hors maillage. |

### 4.1 Liens internes cassés (vérifié : HTTP 404 sur `https://tuneincloud.fr/2023/03/20/inscription-windows/`, aucune redirection dans `astro.config.mjs`, pas de `public/_redirects` ni de `netlify.toml`)

| Fichier source | Lien actuel | Remplacement |
|---|---|---|
| `old-windowsenroll.md` l.20 et l.100 | `https://tuneincloud.fr/2023/02/27/modes-de-jonctions-des-appareils-dans-azure-ad/` | `/blog/old-modejonctionwindows/` |
| `old-windowsenroll.md` l.30 | `https://tuneincloud.fr/2023/03/24/i/` | `/blog/old-enrollautopilotcloud/` |
| `old-enrollautopilotcloud.md` l.10 | `https://tuneincloud.fr/2023/03/20/inscription-windows/` | `/blog/old-windowsenroll/` |
| `old-enrollabm.md` l.42 | `https://tuneincloud.fr/2023/03/17/configurer-lajout-dappareils-professionnels-avec-apple-configurator/` | pas d'article Configurator : pointer vers `/blog/old-ios-entreprise/` (section Configurator) ou supprimer |

Recommandation complémentaire (hors maillage) : ajouter des redirections 301 Netlify des anciennes URL WordPress `/2023/...` vers les `/blog/old-*/`, si ces URL ont encore des backlinks.

### 4.2 Autres signaux

- Frontmatter : `pubDate` incohérent avec la date du nom de fichier pour I1 (fichier 04-16, pubDate 04-14), I2 (04-27 / 04-26), D1 (04-29 / 04-27), I3 (05-18 / 05-19). Sans effet sur les URL, mais à aligner pour la fraîcheur affichée.
- `dossier-2026-04-15-entra-agent-id` ne suit pas la convention `YYYY-MM-DD-<slug>`. Ne pas renommer (URL indexée), simplement noter.
- Les 7 old-* datent de 2023 et utilisent « Azure AD » dans titres et H2 : `updatedDate` à poser lors du rafraîchissement.

## 5. Articles manquants prioritaires (7)

| P | Titre de travail | Mot-clé principal | Format | Pilier / cluster | Justification SERP |
|---|---|---|---|---|---|
| 1 | Enrôlement Intune : Windows, Apple, Android, le guide complet | enrôlement Intune | dossier intune, 3000-3500 mots | Intune hub | SERP FR pauvre (ninjaone, it-connect « débuter avec Intune »), consolide 7 old-* dont 6 orphelins |
| 2 | Autopilot device preparation ou Autopilot classique : lequel choisir | Autopilot device preparation | guide intune, 1500 mots | Intune A | SERP 100 % anglophone (Learn compare, cloudinfra, patchmypc), O3 date de 2023 |
| 3 | Passkeys Entra ID : déployer les profils, l'attestation et Authenticator | déployer passkeys Entra ID | guide entra, 1600 mots | Entra A | SERP vendeurs anglophones (corbado, tech-insider), aucun FR |
| 4 | Security Copilot dans Microsoft 365 E5 : agents, SCU et prérequis | Security Copilot E5 | article, 1200 mots | IA B (Defender) | annonces Message Center, rollout avril-juin 2026, pas de FR. Donne à D1 son 3e lien entrant |
| 5 | DLP Purview pour Microsoft 365 Copilot : bloquer prompts et contenus étiquetés | DLP Copilot Purview | guide purview, 1500 mots | Purview B | GA annoncée (Tech Community), Varonis FR seul concurrent |
| 6 | Groupes dynamiques Entra ID : règles, syntaxe et filtres Intune | groupe dynamique Entra ID | guide entra, 1400 mots | Entra B | ninjaone FR seul, demande post-retrait memberOf |
| 7 | Endpoint Privilege Management Intune : déployer l'élévation contrôlée | Endpoint Privilege Management Intune | guide intune, 1400 mots | Intune D | EPM désormais inclus en E5 (cf. I1), SERP anglophone |

Option 8 (si capacité) : « Accès conditionnel Entra ID : les stratégies de base en 2026 » (Entra A). SERP FR plus concurrentiel (it-connect, ayinedjimi, ninjaone), donc après les 7.

## 6. Matrice de liens internes à ajouter (articles existants uniquement)

Priorité : P0 = correction de lien cassé ou de cannibalisation, P1 = obligatoire (même cluster), P2 = recommandé (cross-cluster).

| # | Source | Cible | Ancre suggérée | P |
|---|---|---|---|---|
| 1 | /blog/old-windowsenroll/ | /blog/old-modejonctionwindows/ | modes de jonction des appareils Entra ID | P0 |
| 2 | /blog/old-windowsenroll/ | /blog/old-enrollautopilotcloud/ | inscription via Windows Autopilot | P0 |
| 3 | /blog/old-enrollautopilotcloud/ | /blog/old-windowsenroll/ | méthodes d'inscription Windows | P0 |
| 4 | /blog/old-enrollabm/ | /blog/old-ios-entreprise/ | méthodes d'inscription iOS/iPadOS (Apple Configurator) | P0 |
| 5 | /blog/2026-05-05-dspm-unifie/ | /blog/2026-07-08-dossier-dspm/ | dossier complet sur Purview DSPM | P0 |
| 6 | /blog/old-ios-entreprise/ | /blog/old-enrollabm/ | inscription automatique ADE avec Apple Business Manager | P0 (K2) |
| 7 | /blog/old-modejonctionwindows/ | /blog/old-windowsenroll/ | inscription des appareils Windows dans Intune | P1 |
| 8 | /blog/old-modejonctionwindows/ | /blog/old-enrollautopilotcloud/ | profil Autopilot jonction Entra | P1 |
| 9 | /blog/old-enrollautopilotcloud/ | /blog/old-modejonctionwindows/ | jonction Entra ou hybride | P1 |
| 10 | /blog/old-android-entreprise/ | /blog/old-enrollkme/ | enrôlement automatique Samsung Knox (KME) | P1 |
| 11 | /blog/old-enrollkme/ | /blog/old-android-entreprise/ | profils Android Enterprise COBO, COPE, COSU | P1 |
| 12 | /blog/2026-05-18-sso-linux-macos/ | /blog/old-enrollabm/ | enrôlement ADE via Apple Business Manager | P1 |
| 13 | /blog/old-enrollabm/ | /blog/2026-05-18-sso-linux-macos/ | Platform SSO pendant Setup Assistant | P1 |
| 14 | /blog/old-ios-entreprise/ | /blog/old-android-entreprise/ | équivalent Android (COBO/COPE) | P2 |
| 15 | /blog/old-android-entreprise/ | /blog/old-ios-entreprise/ | inscription iOS/iPadOS | P2 |
| 16 | /blog/2026-04-16-intunesuite-in-m365/ | /blog/2026-04-27-intune-datawarehouse/ | reporting Intune (Data Warehouse) | P2 |
| 17 | /blog/2026-04-27-intune-datawarehouse/ | /blog/2026-04-16-intunesuite-in-m365/ | Advanced Analytics inclus dans E3/E5 | P1 |
| 18 | /blog/2026-04-16-intunesuite-in-m365/ | /blog/2026-10-08-intune-baseline-windows-11-26h2/ | baseline de sécurité Windows 11 26H2 | P2 |
| 19 | /blog/2026-04-14-entra-backupandrecovery/ | /blog/2026-10-12-entra-memberof-groupes-dynamiques/ | groupes dynamiques memberOf figés | P1 |
| 20 | /blog/2026-04-22-windows-entra-passkeys/ | /blog/2026-05-18-sso-linux-macos/ | authentification résistante au phishing sur macOS et Linux | P1 |
| 21 | /blog/2026-05-18-sso-linux-macos/ | /blog/2026-04-22-windows-entra-passkeys/ | passkeys Entra sur Windows | P1 |
| 22 | /blog/2026-04-22-windows-entra-passkeys/ | /blog/old-modejonctionwindows/ | appareils joints ou inscrits dans Entra ID | P2 |
| 23 | /blog/dossier-2026-04-15-entra-agent-id/ | /blog/2026-10-19-copilot-televersement-agents-avances/ | restreindre le téléversement d'agents avancés | P1 |
| 24 | /blog/dossier-2026-04-15-entra-agent-id/ | /blog/2026-04-29-article-phishing-triage-agent/ | Phishing Triage Agent (Security Copilot) | P1 |
| 25 | /blog/2026-04-29-article-phishing-triage-agent/ | /blog/dossier-2026-04-15-entra-agent-id/ | identité des agents IA avec Entra Agent ID | P1 |
| 26 | /blog/dossier-2026-04-15-entra-agent-id/ | /blog/2026-04-29-article-claude-copilot-m365/ | modèles Anthropic dans Copilot | P2 |
| 27 | /blog/2026-04-29-article-claude-copilot-m365/ | /blog/dossier-2026-04-15-entra-agent-id/ | gouverner les agents comme des identités | P1 |
| 28 | /blog/2026-04-29-article-claude-copilot-m365/ | /blog/2026-10-19-copilot-televersement-agents-avances/ | paramètre de téléversement des agents avancés | P1 |
| 29 | /blog/2026-04-29-article-claude-copilot-m365/ | /blog/2026-04-29-article-phishing-triage-agent/ | agents Security Copilot dans Defender | P2 |
| 30 | /blog/dossier-2026-04-15-entra-agent-id/ | /blog/2026-07-08-dossier-dspm/ | observabilité des agents IA dans Purview DSPM | P1 |
| 31 | /blog/2026-07-08-dossier-dspm/ | /blog/dossier-2026-04-15-entra-agent-id/ | Entra Agent ID | P1 |
| 32 | /blog/dossier-2026-04-15-entra-agent-id/ | /blog/2026-07-20-purview-entrainternetaccess/ | contrôles réseau via Entra Internet Access | P2 |
| 33 | /blog/2026-07-08-dossier-dspm/ | /blog/2026-07-20-purview-entrainternetaccess/ | DLP réseau sur les prompts IA | P1 |
| 34 | /blog/2026-07-20-purview-entrainternetaccess/ | /blog/2026-07-08-dossier-dspm/ | Purview DSPM unifié | P1 |
| 35 | /blog/2026-07-08-dossier-dspm/ | /blog/2026-05-05-dspm-unifie/ | annonce de la GA (mai 2026) | P2 |
| 36 | /blog/2026-04-29-article-claude-copilot-m365/ | /blog/2026-07-08-dossier-dspm/ | DSPM for AI pour suivre les usages Copilot | P1 |
| 37 | /blog/2026-07-08-dossier-dspm/ | /blog/2026-04-29-article-claude-copilot-m365/ | Claude dans Copilot : décision de gouvernance | P2 |

Tous les fichiers source et cible existent (vérifiés dans `src/content/blog/`, id passés en minuscules). Les liens #1 à #4 remplacent des liens existants cassés, ils n'en ajoutent pas.

**Après application : aucun orphelin.** Liens entrants par page (existants + ajoutés) :

| ≥ 3 | 2 | 1 |
|---|---|---|
| E4 (4), P2 (4), O1 (3), O2 (3), C1 (3) | O3, O4, O5, O6, E1, I1, I3, I4, P3, D1, C2 | O7, E2, E3, I2, P1 |

Le seuil de 3 liens entrants par spoke n'est atteignable qu'avec le hub Intune et les 7 articles manquants : le hub donne +1 à chaque old-* et à I1, I3, I4 ; chaque nouveau spoke lie son pilier et 2 voisins (voir ci-dessous). P1 restera volontairement peu lié (page d'actualité subordonnée à P2, K1).

### Liens à prévoir dans les nouveaux articles (dès leur rédaction)

- Hub Intune → O1, O2, O3, O4, O5, O6, O7, I1, I3, I4, futur « device preparation », futur EPM. Chaque old-* → hub (bidirectionnel obligatoire).
- « Device preparation » → O3, O2, hub. « EPM » → I1, I4, hub.
- « Passkeys guide » → E2, I3, O2. « Groupes dynamiques » → E3, O3, I4. « Accès conditionnel » (option) → E2, E3, E1.
- « Security Copilot E5 » → D1, E4, I1. « DLP Copilot » → P2, P3, C1.
- Ajouter aussi, au fil des mises à jour : O7 ← hub + « device preparation » n'apporte rien, donc O7 ← hub + O6 + guide « groupes dynamiques » (cas Knox par groupe), E2 ← « passkeys guide » + « accès conditionnel », I2 ← hub Intune (section reporting).

## 7. Checklist de validation

- [x] Aucun mot-clé principal partagé entre deux pages (après actions K1-K5)
- [x] Chaque spoke existant lié à son hub ou hub intérimaire (sauf piliers Intune et Entra, hubs à créer)
- [ ] 3 liens entrants par spoke : 5/21 avec la matrice seule, 21/21 visé après le hub Intune et les 7 articles manquants
- [x] Aucun orphelin après application de la matrice
- [x] Gabarits conformes au schéma Zod (`dossiers`/`guides` + subcategory `entra`/`intune`/`purview`/`ia`/`autre`, pas de `m365`)
- [~] Longueurs : pilier Intune en dossier (3000-3500), spokes guides 1200-1800. Les brèves (250-500) sont des spokes d'actualité, hors norme spoke : c'est pourquoi les guides evergreen manquants sont prioritaires
- [~] Recouvrement SERP ≥ 4 entre pairs de cluster : vérifié pour Apple (5), DSPM (5), Autopilot (4). Clusters Intune D et IA B tiennent par cohérence de pilier, pas par SERP (scores 0-2), assumé

## 8. Données structurées (catégorie Content Architecture, pour audit-data.json)

```json
{
  "category": "Content Architecture",
  "audit_date": "2026-11-15",
  "site": "https://tuneincloud.fr",
  "serp_method": "WebSearch index US, recouvrement estime (pas google.fr top 10)",
  "articles_total": 21,
  "internal_links_valid": 6,
  "internal_links_broken": 5,
  "orphans": ["2026-04-22-windows-entra-passkeys","2026-04-27-intune-datawarehouse","2026-05-18-sso-linux-macos","old-modejonctionwindows","old-enrollautopilotcloud","old-ios-entreprise","old-enrollabm","old-android-entreprise","old-enrollkme","2026-05-05-dspm-unifie","2026-07-08-dossier-dspm","2026-07-20-purview-entrainternetaccess","2026-04-29-article-phishing-triage-agent"],
  "pillars": [
    {"name": "Intune", "hub": "A CREER: enrolement-intune-guide-complet (dossier intune)", "clusters": {
      "windows": ["old-windowsenroll","old-modejonctionwindows","old-enrollautopilotcloud","A CREER: autopilot-device-preparation"],
      "apple": ["old-ios-entreprise","old-enrollabm","2026-05-18-sso-linux-macos"],
      "android": ["old-android-entreprise","old-enrollkme"],
      "securite-licences": ["2026-10-08-intune-baseline-windows-11-26h2","2026-04-16-intunesuite-in-m365","2026-04-27-intune-datawarehouse","A CREER: intune-endpoint-privilege-management"]}},
    {"name": "Entra ID", "hub": "A CREER (priorite 2)", "clusters": {
      "authentification": ["2026-04-22-windows-entra-passkeys","A CREER: deployer-passkeys-entra-id","OPTION: acces-conditionnel-strategies-base"],
      "gouvernance-resilience": ["2026-10-12-entra-memberof-groupes-dynamiques","2026-04-14-entra-backupandrecovery","A CREER: groupes-dynamiques-entra-id"]}},
    {"name": "Purview", "hub": "2026-07-08-dossier-dspm", "clusters": {
      "dspm": ["2026-05-05-dspm-unifie"],
      "dlp-ia": ["2026-07-20-purview-entrainternetaccess","A CREER: dlp-purview-copilot"]}},
    {"name": "IA et agents", "hub": "dossier-2026-04-15-entra-agent-id (interimaire)", "clusters": {
      "gouvernance-copilot": ["2026-04-29-article-claude-copilot-m365","2026-10-19-copilot-televersement-agents-avances"],
      "agents-securite": ["2026-04-29-article-phishing-triage-agent","A CREER: security-copilot-e5-agents"]}}
  ],
  "cannibalization": [
    {"id": "K1", "pages": ["2026-05-05-dspm-unifie","2026-07-08-dossier-dspm"], "query": "purview dspm unifie", "overlap": 5, "severity": "high", "target": "2026-07-08-dossier-dspm"},
    {"id": "K2", "pages": ["old-ios-entreprise","old-enrollabm"], "query": "inscription ADE intune", "overlap": 5, "severity": "medium", "target": "old-enrollabm"},
    {"id": "K3", "pages": ["old-windowsenroll","old-enrollautopilotcloud","HUB A CREER"], "query": "enrolement intune / inscription windows intune", "overlap": 3, "severity": "medium"}
  ],
  "broken_links": [
    {"source": "old-windowsenroll", "href": "https://tuneincloud.fr/2023/02/27/modes-de-jonctions-des-appareils-dans-azure-ad/", "fix": "/blog/old-modejonctionwindows/", "count": 2},
    {"source": "old-windowsenroll", "href": "https://tuneincloud.fr/2023/03/24/i/", "fix": "/blog/old-enrollautopilotcloud/"},
    {"source": "old-enrollautopilotcloud", "href": "https://tuneincloud.fr/2023/03/20/inscription-windows/", "fix": "/blog/old-windowsenroll/"},
    {"source": "old-enrollabm", "href": "https://tuneincloud.fr/2023/03/17/configurer-lajout-dappareils-professionnels-avec-apple-configurator/", "fix": "/blog/old-ios-entreprise/ ou suppression"}
  ],
  "missing_articles_priority": ["enrolement-intune-guide-complet","autopilot-device-preparation","deployer-passkeys-entra-id","security-copilot-e5-agents","dlp-purview-copilot","groupes-dynamiques-entra-id","intune-endpoint-privilege-management"],
  "links_to_add": 37,
  "links_to_add_p0": 6,
  "inbound_after_matrix": {"gte3": 5, "eq2": 11, "eq1": 5, "orphans": 0}
}
```
