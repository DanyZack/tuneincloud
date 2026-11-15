# Audit Contenu et E-E-A-T : tuneincloud.fr (2026-11-15)

Périmètre : 21 articles de `src/content/blog/` (14 récents 2026, 7 guides `old-*` de 2023) et `src/pages/about.astro`. Brouillons exclus. Vérifications en ligne : une page article rendue (`/blog/2026-10-12-entra-memberof-groupes-dynamiques/`), statut HTTP des anciennes URL WordPress. Fichiers sources lus en lecture seule, aucune modification.

Méthode : extraction scriptée (frontmatter, mots hors code, H2/H3, liens `/blog/`, sources), contrôle des gabarits de métadonnées via `metadata_template.py` (heuristique, sans modèle), lecture qualitative d'un échantillon.

## Scores

| Indicateur | Score |
|---|---|
| **Score Contenu** | **62 / 100** |
| **Score On-Page** | **46 / 100** |
| E-E-A-T pondéré (modèle interne du skill, pas de pondération Google) | 56 / 100 |
| Citabilité IA | 58 / 100 |
| Risque de métadonnées gabarisées | faible (`site_risk: low`, `templated_ratio: 0.0`, aucune `shared_cta_phrases`) |

### E-E-A-T détaillé

| Facteur | Poids | Score | Constat |
|---|---|---|---|
| Experience | 20 % | 55 | Signaux terrain réels dans les dossiers (Entra Agent ID, DSPM) et la brève Copilot (« Avis d'expert »), quasi absents des brèves d'avril à juillet (0 occurrence de « je » ou de retour d'expérience dans 6 brèves). Les guides `old-*` montrent une expérience réelle (captures pas à pas) mais datée. |
| Expertise | 25 % | 70 | Point fort. Statut GA/Preview, licences, dates et mécanismes précis, sources Microsoft Learn et Message Center systématiques sur le récent (Entra Agent ID : 10 liens Microsoft, memberOf : 7). |
| Authoritativeness | 25 % | 50 | La page About est solide (depuis 2016, 40 clients, aMP Bordeaux 2024, Endpoint Summit 2023). Mais aucune page article n'affiche ni ne balise l'auteur : sur la page rendue, aucun nom d'auteur, aucun JSON-LD. L'autorité de Daniel n'est donc pas transmise aux articles. |
| Trustworthiness | 30 % | 50 | Pas d'adresse mail (« mail pro à venir »), aucun `updatedDate` sur 21 articles alors que plusieurs échéances annoncées sont passées, 5 liens internes vers d'anciennes URL WordPress en 404, hero images hébergées sur des sites tiers sans crédit, coquilles sur la page About. |

Note : contenu évalué sur le texte Markdown source, équivalent au `extracted_text` (sans navigation ni pied de page).

## Tableau des métadonnées (title 55-60, description 140-160)

Statut : OK, court, long. Longueurs en caractères Unicode.

| Fichier | Title | Statut | Description | Statut | Mots | pubDate |
|---|---|---|---|---|---|---|
| 2026-04-14-entra-backupandrecovery.md | 80 | long | 166 | long (et contient un tiret cadratin) | 319 | 2026-04-14 |
| 2026-04-16-IntuneSuite-in-M365.md | 64 | long | 168 | long | 411 | 2026-04-14 (nom de fichier : 04-16) |
| 2026-04-22-windows-entra-passkeys.md | 81 | long | 261 | long | 487 | 2026-04-22 |
| 2026-04-27-intune-datawarehouse.md | 89 | long | 203 | long | 506 | 2026-04-26 (nom : 04-27) |
| 2026-04-29-article-claude-copilot-m365.md | 96 | long | 197 | long | 1267 | 2026-04-29 |
| 2026-04-29-article-phishing-triage-agent.md | 81 | long | 220 | long | 1556 | 2026-04-27 (nom : 04-29) |
| 2026-05-05-dspm-unifie.md | 88 | long | 236 | long | 761 | 2026-05-05 |
| 2026-05-18-SSO-Linux-MacOS.md | 72 | long | 290 | long | 1099 | 2026-05-19 (nom : 05-18) |
| 2026-07-08-dossier-dspm.md | 88 | long | 197 | long | 4572 | 2026-07-08 |
| 2026-07-20-purview-entrainternetaccess.md | 63 | long | 214 | long | 1026 | 2026-07-20 |
| 2026-10-08-intune-baseline-windows-11-26h2.md | 56 | OK | 155 | OK | 522 | 2026-10-08 |
| 2026-10-12-entra-memberof-groupes-dynamiques.md | 60 | OK | 159 | OK | 1412 | 2026-10-12 |
| 2026-10-19-copilot-televersement-agents-avances.md | 59 | OK | 148 | OK | 551 | 2026-10-19 |
| dossier-2026-04-15-entra-agent-id.md | 85 | long | 191 | long | 2908 | 2026-04-15 |
| old-android-entreprise.md | 30 | court | 56 | court | 2843 | 2023-02-01 |
| old-enrollabm.md | 69 | long | 50 | court | 802 | 2023-03-17 |
| old-enrollautopilotcloud.md | 79 | long | 47 | court | 1867 | 2023-03-29 |
| old-enrollkme.md | 53 | court | 110 | court | 1098 | 2023-03-08 |
| old-ios-entreprise.md | 22 | court | 116 | court | 1823 | 2023-03-16 |
| old-modejonctionwindows.md | 46 | court | 86 | court (coquille « appreils ») | 955 | 2023-02-27 |
| old-windowsenroll.md | 19 | court | 84 | court | 1752 | 2023-03-20 |

Bilan : 3 titles sur 21 dans la cible, 3 descriptions sur 21. Les trois conformes sont les trois articles les plus récents, produits après la règle 55-60/140-160 : la chaîne éditoriale actuelle fonctionne, c'est le stock qui est à reprendre.

Le `title` sert aussi de H1 (bannière `ArticleBanner.astro`) et de `<title>` sans suffixe de marque. Raccourcir le title raccourcit donc le H1 affiché, ce qui va dans le bon sens ici.

Pistes de titles (longueur entre parenthèses, à ajuster par Daniel) :

| Fichier | Proposition |
|---|---|
| 2026-04-14-entra-backupandrecovery.md | Entra Backup and Recovery : la sauvegarde native du tenant (58) |
| 2026-04-16-IntuneSuite-in-M365.md | L'Intune Suite intégrée à M365 E3 et E5 dès juillet 2026 (57) |
| 2026-04-22-windows-entra-passkeys.md | Passkeys Entra sur Windows : GA et activation par défaut (56) |
| 2026-04-27-intune-datawarehouse.md | Intune Data Warehouse : fin du connecteur Power BI beta (55) |
| 2026-04-29-article-claude-copilot-m365.md | Claude dans Microsoft 365 Copilot : la décision des DSI (55) |
| 2026-04-29-article-phishing-triage-agent.md | Phishing Triage Agent Defender : ce qui change pour le SOC (58) |
| 2026-05-18-SSO-Linux-MacOS.md | SSO macOS et Linux dans Intune : Platform SSO et PRMFA (54) |
| dossier-2026-04-15-entra-agent-id.md | Entra Agent ID : gouverner les agents IA comme identités (56) |
| old-windowsenroll.md | Inscription Windows dans Intune : méthodes et scénarios (55) |
| old-ios-entreprise.md | Inscription iOS et iPadOS dans Intune : méthodes et profils (59) |
| old-enrollautopilotcloud.md | Autopilot : profil d'enrôlement Entra joined (full cloud) (57) |

Exemples de descriptions :
- passkeys (160) : « Les passkeys Entra sur Windows passent en GA fin avril 2026. Si votre profil autorise les clés non attestées, vos utilisateurs s'enregistrent sans action admin. »
- dspm-unifie (156) : « Purview DSPM et DSPM for AI fusionnent dans une expérience unifiée, GA fin mai 2026. Workflows guidés, signaux tiers, observabilité des agents IA, licences. »

## Structure H1/H2

- H1 : un seul par page, généré par la bannière à partir du `title` (vérifié sur la page rendue). Aucun `# ` dans le corps Markdown hors blocs de code. Conforme.
- H2 : hiérarchie claire et descriptive sur le récent (« Ce qui change concrètement », « Points d'attention », « Source »). Bon pour l'extraction IA.
- Faiblesse : les H2 des brèves sont génériques et répétés à l'identique sur 8 articles (« Ce qui change concrètement », « Points d'attention »). Ils ne portent pas l'entité ni le mot-clé, donc un passage extrait hors contexte perd son sujet. À valider par Daniel : intégrer le produit dans au moins un H2 (« Ce que Backup and Recovery restaure », par exemple).
- Guides `old-*` : numérotation romaine (« I - », « II - ») et H2 dupliqués dans la même page (`old-android-entreprise.md` répète 5 fois « Prérequis » et « Étapes de configuration » au niveau H2 au lieu de H3 sous chaque méthode). Un H2 « III - Restrictions d'inscription : » se termine par deux-points (`old-windowsenroll.md`).

## Contenu mince et adéquation au format

Aucun article n'est mince au sens strict : le plus court (`2026-04-14-entra-backupandrecovery.md`, 319 mots) est dans la fourchette brève (250-500).

Écarts au format déclaré :
- Brèves au-delà de 500 mots : `2026-05-18-SSO-Linux-MacOS.md` (1099), `2026-07-20-purview-entrainternetaccess.md` (1026), `2026-05-05-dspm-unifie.md` (761). Ce sont des articles presse par la longueur. À valider par Daniel : passer `subcategory` de `breves` à `articles` (l'URL ne change pas, elle dépend du nom de fichier).
- Dossiers sans `subcategory` : `2026-07-08-dossier-dspm.md` et `dossier-2026-04-15-entra-agent-id.md`. Le champ est optionnel dans Zod, mais la bannière n'affiche que « Dossiers » et les pages de catégorie ne les rangent pas. Proposer `purview` et `entra` (ou `ia` pour Agent ID).

## Doublons et cannibalisation

1. **DSPM, risque réel** : `2026-05-05-dspm-unifie.md` (« Purview DSPM unifié : la nouvelle expérience... ») et `2026-07-08-dossier-dspm.md` (« Microsoft Purview DSPM : le nouveau plan de contrôle unifié... ») visent la même requête (« Purview DSPM unifié »). La brève annonce encore « un dossier complet arrive bientôt » dans sa description et dans sa section « Et après », alors que le dossier existe depuis le 8 juillet. Aucun lien entre les deux. Action : remplacer l'encart « À venir » par un lien vers `/blog/2026-07-08-dossier-dspm/`, retirer la promesse de la description, différencier la brève sur l'annonce et la date de GA.
2. **Guides `old-*` Windows** : `old-windowsenroll.md` (vue d'ensemble des méthodes), `old-enrollautopilotcloud.md` (Autopilot) et `old-modejonctionwindows.md` (modes de jonction) se recouvrent partiellement mais ont des intentions distinctes (hub, procédure, concept). Pas de fusion nécessaire. Il faut en revanche les relier : `old-windowsenroll.md` est conçu comme un hub mais pointe vers des URL WordPress mortes et liste 5 sous-guides « en cours de rédaction » depuis 2023.
3. **Guides `old-*` mobiles** : `old-ios-entreprise.md` (6 mentions ADE/ABM) recoupe `old-enrollabm.md`, et `old-android-entreprise.md` (mentions Knox) recoupe `old-enrollkme.md`. Les descriptions de `old-enrollkme.md` et `old-ios-entreprise.md` sont quasi identiques (« Comprendre les moyens de faire de l'enrôlement automatique avec les périphériques ... sur Microsoft Intune »). Recommandation : un pilier (méthodes par OS) et un satellite (procédure ADE ou KME) qui se citent mutuellement, avec des descriptions distinctes.
4. Le contrôle heuristique des gabarits ne relève aucune paire title/description templatée ni CTA partagé. Les métadonnées sont écrites à la main.

## Maillage interne

6 liens internes contextuels `/blog/...` au total sur 21 articles, tous valides. **15 articles sur 21 ne reçoivent aucun lien depuis un autre article** (ils ne sont atteignables que par les listes et pages de catégorie).

| Article | Liens entrants | Liens sortants |
|---|---|---|
| 2026-04-14-entra-backupandrecovery | 1 (memberof) | 0 |
| 2026-04-16-intunesuite-in-m365 | 1 (baseline) | 0 |
| 2026-04-22-windows-entra-passkeys | 0 | 0 |
| 2026-04-27-intune-datawarehouse | 0 | 0 |
| 2026-04-29-article-claude-copilot-m365 | 1 (copilot) | 0 |
| 2026-04-29-article-phishing-triage-agent | 0 | 0 |
| 2026-05-05-dspm-unifie | 0 | 0 |
| 2026-05-18-sso-linux-macos | 0 | 0 |
| 2026-07-08-dossier-dspm | 0 | 0 |
| 2026-07-20-purview-entrainternetaccess | 0 | 0 |
| 2026-10-08-intune-baseline-windows-11-26h2 | 1 (memberof) | 2 |
| 2026-10-12-entra-memberof-groupes-dynamiques | 0 | 2 |
| 2026-10-19-copilot-televersement-agents-avances | 0 | 2 |
| dossier-2026-04-15-entra-agent-id | 1 (copilot) | 0 |
| old-* (7 fichiers) | 1 seul (old-windowsenroll, depuis baseline) | 0 lien `/blog/`, 5 liens vers `tuneincloud.fr/2023/...` en 404 |

Liens morts (vérifiés, HTTP 404) :
- `old-windowsenroll.md` lignes 20 et 100 : `https://tuneincloud.fr/2023/02/27/modes-de-jonctions-des-appareils-dans-azure-ad/` à remplacer par `/blog/old-modejonctionwindows/`
- `old-windowsenroll.md` ligne 30 : `https://tuneincloud.fr/2023/03/24/i/` à remplacer par `/blog/old-enrollautopilotcloud/`
- `old-enrollautopilotcloud.md` ligne 10 : `https://tuneincloud.fr/2023/03/20/inscription-windows/` à remplacer par `/blog/old-windowsenroll/`
- `old-enrollabm.md` ligne 42 : `https://tuneincloud.fr/2023/03/17/configurer-lajout-dappareils-professionnels-avec-apple-configurator/` (aucun équivalent migré, retirer le lien ou le remplacer par la doc Microsoft Learn)

Aucune redirection n'existe (`public/_redirects` et `netlify.toml` absents). Si les URL WordPress `/2023/...` ont des backlinks, des redirections 301 vers `/blog/old-*/` récupéreraient ce capital (sujet technique, à traiter dans l'audit technique).

Liens à créer en priorité (aucun changement de structure, simple phrase de renvoi) :
- `2026-05-05-dspm-unifie.md` vers `2026-07-08-dossier-dspm` (remplace l'encart « À venir »)
- `2026-07-08-dossier-dspm.md` vers `2026-07-20-purview-entrainternetaccess` (DLP réseau, même produit) et vers `dossier-2026-04-15-entra-agent-id` (section AI Observability)
- `2026-07-20-purview-entrainternetaccess.md` vers `2026-07-08-dossier-dspm`
- `2026-04-29-article-phishing-triage-agent.md` et `dossier-2026-04-15-entra-agent-id.md` entre eux (agents IA, identités et Security Copilot)
- `2026-04-29-article-claude-copilot-m365.md` vers `2026-10-19-copilot-televersement-agents-avances` (lien retour)
- `2026-04-22-windows-entra-passkeys.md` vers `2026-05-18-sso-linux-macos` (authentification sans mot de passe multi-OS) et réciproquement
- `2026-05-18-SSO-Linux-MacOS.md` vers `old-enrollabm` (Platform SSO pendant Setup Assistant suppose l'ADE)
- `2026-04-16-IntuneSuite-in-M365.md` vers `2026-10-08-intune-baseline-windows-11-26h2` (lien retour)
- `old-ios-entreprise` et `old-enrollabm`, `old-android-entreprise` et `old-enrollkme` : liens réciproques pilier et satellite

## Fraîcheur

Aucun des 21 articles n'a de `updatedDate`. Le champ existe dans le schéma et la mise en page l'affiche (« Mis à jour le ... »). Il n'y a donc pas de nouveau champ à créer.

Contenus dont l'échéance annoncée est passée au 15 novembre 2026 :
- `2026-10-12-entra-memberof-groupes-dynamiques.md` : le gel du 3 novembre 2026 est passé. Le title (« avant le 3 novembre ») est désormais faux pour un lecteur arrivant de Google. À mettre à jour en priorité (title, état constaté après le gel, `updatedDate`).
- `2026-10-19-copilot-televersement-agents-avances.md` : date de choix du 25 octobre passée, déploiement du registre de plugins annoncé « d'ici fin novembre ». Mise à jour à prévoir début décembre.
- `2026-07-20-purview-entrainternetaccess.md` : « GA attendue entre fin septembre et fin octobre 2026 ». Vérifier le statut GA (source Microsoft) et dater la mise à jour.
- `2026-07-08-dossier-dspm.md` : section « Compte à rebours vers septembre 2026 » dépassée.
- `2026-05-05-dspm-unifie.md` : « coexistence jusqu'en juin 2026 » et « dossier à venir » dépassés.
- `2026-04-16-IntuneSuite-in-M365.md` (intégration en juillet 2026), `2026-04-22-windows-entra-passkeys.md` (GA fin avril), `2026-04-14-entra-backupandrecovery.md` (Public Preview, statut à revérifier) : écrits au futur pour des événements passés.
- Guides `old-*` (2023) : nomenclature « Azure AD » (27 occurrences dans `old-modejonctionwindows.md`, 5 dans `old-enrollautopilotcloud.md`), rebaptisé Entra ID depuis 2023. Captures d'écran probablement antérieures aux portails actuels. Six sous-guides « en cours de rédaction » depuis 2023 dans `old-windowsenroll.md` : un signal de site abandonné pour un évaluateur.

Incohérences date et nom de fichier (pas d'action URL, à corriger seulement dans `pubDate` si la date réelle est celle du nom de fichier) : IntuneSuite (pubDate 04-14, fichier 04-16), datawarehouse (04-26 et 04-27), phishing (04-27 et 04-29), SSO (05-19 et 05-18).

## Citabilité IA (58/100)

Atouts : faits datés et sourcés, statut GA/Preview explicite, licences nommées, listes « Points d'attention » faciles à extraire, `llms.txt` riche (auteur, piliers). Le guide memberOf (étapes numérotées, rollback, pièges) est le format le plus citable du site.

Freins :
- Aucun balisage structuré sur les articles (vérifié sur la page rendue) : pas de JSON-LD `BlogPosting` ni `Person`, `og:type` vaut `website`, et `og:image` est le placeholder `blog-placeholder-1.jpg` sur toutes les pages, car `heroImage` n'est pas transmis à `BaseHead.astro`. Les moteurs IA n'ont ni auteur, ni `datePublished`, ni `dateModified` exploitables.
- Pas de paragraphe-réponse en tête : l'introduction des brèves est souvent narrative. À valider par Daniel : une première phrase qui répond seule à la question du title (quoi, statut, date, licence), ce que fait déjà très bien la brève Copilot.
- Pas de bloc TL;DR ni de FAQ (seul `2026-04-29-article-phishing-triage-agent.md` a un équivalent). À valider par Daniel, sur les dossiers uniquement (DSPM, Agent ID), un encadré « L'essentiel » de 3 à 5 lignes.
- Hero images sur des domaines tiers (dirteam.com, schneider.im, cyberhoot.com, ytimg, wp.com, sbd.org.uk, etc.) sur 12 articles, avec `alt=""`. Risque de disparition, de droits d'auteur, et aucune valeur sémantique.

## Points de conformité à la charte locale (relevés au passage)

Comptage automatique, à confirmer à la relecture (des occurrences peuvent être dans des citations ou du code) :
- Tirets cadratins : `dossier-2026-04-15-entra-agent-id.md` (26), `old-enrollkme.md` (5), `2026-04-27-intune-datawarehouse.md` (3), `2026-04-22-windows-entra-passkeys.md` (2), `2026-04-14-entra-backupandrecovery.md` (1, dans la description), `2026-04-16-IntuneSuite-in-M365.md` (1). `node scripts/style-check.mjs` permet de les lister.
- Points-virgules : `2026-07-08-dossier-dspm.md` (3), `2026-04-14-entra-backupandrecovery.md`, `2026-04-16-IntuneSuite-in-M365.md`, `2026-10-08-intune-baseline-windows-11-26h2.md` (1 chacun).
- « nous/notre/nos » : 1 occurrence dans `2026-07-08-dossier-dspm.md`, `old-modejonctionwindows.md`, `old-windowsenroll.md`.
- Numéros MC dans le corps (hors section Source) probables dans `2026-07-08-dossier-dspm.md`, `2026-05-05-dspm-unifie.md` (« MC1191257 » dans « Calendrier et conditions »), `2026-07-20-purview-entrainternetaccess.md`, `2026-10-12-entra-memberof-groupes-dynamiques.md`.
- `src/pages/about.astro` : coquilles « leparc », « séucrité », tabulation dans « auprès	d'organisations ». Tirets cadratins dans la liste des conférences (séparateur, pas en milieu de phrase, toléré).

## Constats classés

### Critique
1. **Auteur invisible et non balisé sur toutes les pages article.** Aucun nom, aucune signature, aucun lien vers /about, aucun JSON-LD `BlogPosting`/`Person`. Toute l'expertise décrite sur la page About est perdue pour Google et les moteurs IA. Fichiers : `src/layouts/BlogPost.astro`, `src/components/BaseHead.astro`. Correctif de code, sans nouveau champ frontmatter (auteur unique, valeur fixe dans le layout) : signature « Daniel POLÒNIO » avec lien `/about/` sous la date, JSON-LD `BlogPosting` (`headline`, `datePublished`, `dateModified` depuis `updatedDate`, `author` de type `Person` avec `sameAs` LinkedIn, `image`).

### Haute
2. **Contenu périmé sans `updatedDate`** : title de `2026-10-12-entra-memberof-groupes-dynamiques.md` faux depuis le 3 novembre, échéances passées dans `2026-10-19-copilot-televersement-agents-avances.md`, `2026-07-20-purview-entrainternetaccess.md`, `2026-07-08-dossier-dspm.md`, `2026-05-05-dspm-unifie.md`.
3. **Cannibalisation DSPM** entre `2026-05-05-dspm-unifie.md` et `2026-07-08-dossier-dspm.md`, aggravée par la promesse « dossier à venir » jamais remplacée par un lien.
4. **Maillage interne quasi nul** : 6 liens contextuels, 15 articles sur 21 sans lien entrant, aucun lien sortant depuis 11 articles. Tous les fichiers sauf les trois d'octobre.
5. **Liens internes morts** vers les URL WordPress `/2023/...` (404) : `old-windowsenroll.md` (3), `old-enrollautopilotcloud.md` (1), `old-enrollabm.md` (1).
6. **`og:image` placeholder et `og:type: website`** sur tous les articles : `heroImage` n'est pas transmis à `BaseHead`. Fichiers : `src/layouts/BlogPost.astro`, `src/components/BaseHead.astro`.

### Moyenne
7. **Titles et descriptions hors cible** sur 18 articles sur 21 (tableau ci-dessus). Les 7 `old-*` ont des titles et descriptions trop courts, sans le mot « Intune » pour 4 d'entre eux.
8. **Guides `old-*` datés** : « Azure AD » partout, 6 sous-guides « en cours de rédaction » depuis 2023 (`old-windowsenroll.md`), descriptions quasi dupliquées (`old-enrollkme.md`, `old-ios-entreprise.md`). À valider par Daniel : mise à jour Entra ID avec `updatedDate`, suppression des mentions « en cours de rédaction », restructuration H2/H3 de `old-android-entreprise.md`.
9. **Trois brèves au format article** (`2026-05-18-SSO-Linux-MacOS.md`, `2026-07-20-purview-entrainternetaccess.md`, `2026-05-05-dspm-unifie.md`) et deux dossiers sans `subcategory` (`2026-07-08-dossier-dspm.md`, `dossier-2026-04-15-entra-agent-id.md`).
10. **Signaux d'expérience faibles dans les brèves** d'avril à juillet (aucun « je », aucun retour terrain). À valider par Daniel : généraliser le bloc « Avis d'expert » de la brève Copilot, une recommandation à la première personne par brève.
11. **Page About** : pas de mail de contact, pas de certifications Microsoft ni de photo, coquilles. Fichier : `src/pages/about.astro`. La mention de Cladéys présente dans `llms.txt` est absente de la page About : à aligner.

### Basse
12. Hero images hébergées sur des domaines tiers, sans crédit et avec `alt=""` (12 articles, dont `2026-10-12-entra-memberof-groupes-dynamiques.md`). La règle locale les tolère sur l'existant. Recommandation : rapatrier en local lors de chaque mise à jour.
13. H2 génériques répétés à l'identique sur les brèves (« Ce qui change concrètement »). À valider par Daniel.
14. Résidus de charte : tirets cadratins (`dossier-2026-04-15-entra-agent-id.md` surtout), points-virgules, « nous » isolés, numéros MC dans le corps (voir section dédiée).
15. Incohérences `pubDate` et nom de fichier sur 4 articles. Le champ obsolète `coverImage` subsiste dans 7 `old-*` : ignoré par Zod, sans effet, peut être retiré.
16. Nom de fichier `dossier-2026-04-15-entra-agent-id.md` hors convention `YYYY-MM-DD-<slug>`. Ne pas renommer sans redirection (l'URL changerait).

## Données structurées pour audit-data.json (catégorie Content Quality)

```json
{
  "category": "Content Quality",
  "scores": {"content": 62, "on_page": 46, "eeat": 56, "experience": 55, "expertise": 70, "authoritativeness": 50, "trustworthiness": 50, "ai_citation": 58},
  "metadata_template": {"site_risk": "low", "templated_ratio": 0.0, "shared_cta_phrases": {}},
  "stats": {"articles": 21, "titles_in_range": 3, "descriptions_in_range": 3, "contextual_internal_links": 6, "articles_without_inbound": 15, "dead_internal_links": 5, "articles_with_updatedDate": 0},
  "findings": [
    {"severity": "critical", "id": "author-not-marked-up", "files": ["src/layouts/BlogPost.astro", "src/components/BaseHead.astro"]},
    {"severity": "high", "id": "stale-content-no-updatedDate", "files": ["2026-10-12-entra-memberof-groupes-dynamiques.md", "2026-10-19-copilot-televersement-agents-avances.md", "2026-07-20-purview-entrainternetaccess.md", "2026-07-08-dossier-dspm.md", "2026-05-05-dspm-unifie.md"]},
    {"severity": "high", "id": "cannibalisation-dspm", "files": ["2026-05-05-dspm-unifie.md", "2026-07-08-dossier-dspm.md"]},
    {"severity": "high", "id": "weak-internal-linking", "files": ["*"]},
    {"severity": "high", "id": "dead-legacy-internal-links", "files": ["old-windowsenroll.md", "old-enrollautopilotcloud.md", "old-enrollabm.md"]},
    {"severity": "high", "id": "og-image-placeholder", "files": ["src/layouts/BlogPost.astro", "src/components/BaseHead.astro"]},
    {"severity": "medium", "id": "title-description-length", "files": ["18 articles"]},
    {"severity": "medium", "id": "legacy-guides-outdated", "files": ["old-*.md"]},
    {"severity": "medium", "id": "format-mismatch", "files": ["2026-05-18-SSO-Linux-MacOS.md", "2026-07-20-purview-entrainternetaccess.md", "2026-05-05-dspm-unifie.md", "2026-07-08-dossier-dspm.md", "dossier-2026-04-15-entra-agent-id.md"]},
    {"severity": "medium", "id": "weak-experience-signals-breves", "files": ["brèves avril-juillet 2026"]},
    {"severity": "medium", "id": "about-page-trust", "files": ["src/pages/about.astro"]},
    {"severity": "low", "id": "third-party-hero-images", "files": ["12 articles"]},
    {"severity": "low", "id": "generic-h2", "files": ["brèves"]},
    {"severity": "low", "id": "style-charter-residue", "files": ["dossier-2026-04-15-entra-agent-id.md", "2026-07-08-dossier-dspm.md"]}
  ]
}
```
