# Rapport de relecture : Panne Microsoft 365 du 12 novembre : chronologie et leçons

**Fichier** : `src/content/draft/2026-11-16-panne-microsoft-365-12-novembre.md` (brouillon, corrigé en place)
**Format** : Dossier (`dossiers` / `autre`)
**Date de publication prévue** : 2026-11-16 (`pubDate` non modifiée, à refixer par le publieur au jour de la mise en ligne)
**Date de relecture** : 2026-11-17
**Verdict global** : ⚠️ Publiable après corrections (corrections appliquées, il reste trois décisions pour Daniel et la bannière à produire)

## Synthèse

Le dossier est solide. J'ai extrait le texte du rapport préliminaire depuis la copie 365fanatic (PDF de 7 pages, daté du 15 novembre 2026) et je l'ai comparé ligne à ligne avec le fil de Charles Lamanna : les deux concordent mot pour mot sur tous les passages communs, et la chronologie de l'article suit fidèlement la section « Actions Taken ». Les défauts trouvés sont des glissements : des formulations plus fortes que la source (« personne ne la voit », « s'est arrêté », « arrive quand l'incident est clos »), un chiffre de presse non sourcé (130 000 signalements), un compte faux dans un schéma (« sept autres » au lieu de six) et trois maximes de fin de paragraphe. Cinq des sept cas « à confirmer » ont pu être remontés à leur source primaire.

## Pré-contrôles mécaniques

| Contrôle | Résultat |
|---|---|
| Tirets cadratins | 0 |
| Liens internes | 3/3 valides : `2026-11-16-outlook-faille-ntlm-microsoft-365-apps`, `2026-04-29-article-phishing-triage-agent`, `2026-04-14-entra-backupandrecovery` |
| `category` / `subcategory` | `dossiers` / `autre`, valeurs autorisées par le schéma Zod |
| `title` | 59 caractères, OK |
| `description` | 162 caractères avant, 155 après correction n°1 |
| Mots | 4 122 au total avec la section Source et les blocs de schéma, environ 3 390 de texte. Dans la fourchette dossier (1 500-4 000) |
| « brebes » | 0 |
| `heroImage` | `""` (chaîne vide, acceptée par Zod et sans rendu cassé, `ArticleBanner` teste la valeur). À remplir par l'illustrateur |
| Point-virgule, « nous » | 0 |
| `style-check.mjs` | 0 alerte bloquante. Seules restent les alertes émoji et deux-points des 5 blocs « Schéma à générer » (voir section 3) |

## 1. Sources

| URL | État | Vérifiée le | Commentaire |
|---|---|---|---|
| 365fanatic.com/.../PostIncidentReport.pdf | ✅ OK | 2026-11-17 | PDF lu en entier (extraction texte). Rapport préliminaire daté du 15/11/2026, ID `EX1550543/MO1550821`, final annoncé « within five business days » et ligne « 11/20/2026 » dans les mesures. Copie tierce, l'original reste à comparer par Daniel dans le centre d'administration |
| x.com/clamanna/status/2122209697226948729 | ✅ OK (navigateur) | 2026-11-17 | Identique au rapport, avec quatre omissions : « Windows » (serveurs, processus interne, code rétabli), « for scale reasons », et « partially » devant « restored earlier ». Lamanna conserve la phrase « neither the underlying defect nor the fix applies to broader Windows deployments » |
| x.com/MSFT365Status/status/2122205066157257160 | ✅ OK (navigateur) | 2026-11-17 | 16/11 : publication du rapport préliminaire, accessible sous MO1550821 et EX1550543 |
| x.com/MSFT365Status/status/2121485746334777593 | ✅ OK (navigateur) | 2026-11-17 | 14/11 : rétablissement terminé, renvoi vers MO1550821 |
| azure.status.microsoft/.../history/ | ✅ OK | 2026-11-17 | Derniers PIR datés de septembre 2026, aucun pour le 12 ou le 13 novembre |
| learn.microsoft.com/.../view-service-health | ✅ OK | 2026-11-17 | Mis à jour le 30/10/2026. Confirme **Health > Service health**, status.cloud.microsoft si l'accès au centre d'administration est impossible, @MSFT365status, **Customize > Email**, deux adresses au plus par administrateur, application mobile Microsoft 365 Admin |
| learn.microsoft.com/.../serviceannouncement-list-issues | ✅ OK | 2026-11-17 | v1.0, `GET /admin/serviceAnnouncement/issues`, `ServiceHealth.Read.All` |
| learn.microsoft.com/.../servicehealthissue-incidentreport | ✅ OK | 2026-11-17 | v1.0, `/issues/{id}/incidentReport`, `ServiceHealth.Read.All`, le rapport n'est disponible qu'au statut `PostIncidentReviewPublished` |
| x.com/downdetector/status/2120981125145174504 | ✅ OK (navigateur) | 2026-11-17 | Tous les chiffres de l'article sont confirmés (74 pays, 17 h 25, 19 650/min à 18 h 25, < 15, plus de 2 000 fois, 3 sur 10, Azure environ ×100, 11 000 à 19 h 38, et 16 h 17 attribué à Microsoft) |
| theregister.com/saas/2026/11/12/... | ✅ OK | 2026-11-17 | Defender for Office 365, accès d'administration à Intune et au Microsoft 365 Apps Admin Center perdu, « aucun changement récent » puis « small number of recent configuration updates ». Début vers 18 h 00 UTC |
| securityweek.com/... | ✅ OK | 2026-11-17 | Retour arrière d'un changement de configuration réseau qui coïncidait avec le début. Aucune preuve d'activité malveillante (mise à jour du vendredi 13) |
| office-watch.com/2026/microsoft-365-outage-explained/ | ✅ OK | 2026-11-17 | Résumé conforme au rapport |
| cybersecuritynews.com/microsoft-outage-incident-report/ | ✅ OK | 2026-11-17 | Titre : « Microsoft Reveals How a Hidden Windows Bug Took Down Microsoft 365 Services Worldwide ». C'est lui qui fonde la mention « bug Windows caché » |
| migalhas.com.br/... | ✅ OK | 2026-11-17 | STF, résolution 923/26, délais des 12 et 13/11 suspendus, reprise le 16, code d'accès par courriel non reçu |
| pharmaceutical-journal.com/... | ✅ OK | 2026-11-17 | Accès à la messagerie du NHS perdu, NPA : « delays to some prescriptions » |
| abc.net.au/news/2026-11-13/... | ✅ OK | 2026-11-17 | Ashwin Pal, associé chez RSM Australia : « hundreds of thousands of dollars per hour » pour les cabinets d'avocats ou de comptables |
| en.wikipedia.org/wiki/2026_Microsoft_outage | ✅ OK | 2026-11-17 | Source secondaire. Ses références ont été remontées (voir ci-dessous) |
| theregister.com/2026/01/23/microsoft_365_outage/ | ✅ OK | 2026-11-17 | 22/01/2026, Amérique du Nord, de 19 h 37 à 05 h 33 UTC, « près de dix heures » |
| bleepingcomputer.com/... | ✅ OK | 2026-11-17 | 31/08/2026, « core authentication configuration issues », Teams, SharePoint, Purview, Defender XDR (entre autres), résolu le 3/09 |

**Sources primaires remontées depuis Wikipédia** (lues, mais **non ajoutées** à la section Source, conformément à la règle « le rédacteur en chef n'enrichit pas ») :

| Source | État | Confirme |
|---|---|---|
| theguardian.com/technology/2026/nov/13/how-microsoft-outage-has-affected-key-public-services-in-the-uk | ✅ lu (navigateur) | Des centaines d'hôpitaux, de cabinets et de services du NHS touchés, des soignants revenus aux dossiers papier |
| bbc.com/news/articles/cqp9d58eldlro | ✅ lu (navigateur) | Code gris chez Unity Health Toronto, plateforme commune du gouvernement japonais, Cour suprême des Philippines. Mentionne aussi Euronext (voir décision n°3) |
| bbc.com/news/articles/cxzd9171m51qo | ✅ lu (navigateur) | 430 millions = utilisateurs de Microsoft 365 dans le monde, pas le nombre de personnes touchées |
| nippon.com/en/articles/-/57370 | ✅ lu | Jiji, 13/11 : plateforme « government solution services » perturbée |
| cbc.ca/news/world/microsoft-outage-friday-activity-9.7420313 | ❌ 403 (WebFetch et navigateur) | Non lu. Toronto confirmé par la BBC |
| edition.cnn.com/... (Anderson Economic Group) | ❌ 451 depuis la France | Non lu. **7 milliards de dollars : reste à confirmer** |
| Richemont (BBC live, Bloomberg) | Non lu | Aucune trace trouvée par recherche. **Reste à confirmer** |
| « 130 000 signalements » | Aucune source trouvée | **Retiré** du texte |

## 2. Exactitude technique

Concordance rapport / article vérifiée point par point : trois facteurs, 01 h 07, environ quinze heures, 14 %, plus de 80 %, moins de deux heures, cloisons et « separate issue », « for scale reasons », 50 % et plus d'une région, chronologie complète, cinq mesures terminées et liste complète au 20/11. Toutes les heures du tableau correspondent au rapport, et le passage à l'heure de Paris (UTC+1) est juste. Les dates aussi : le 12/11/2026 est un jeudi, le 10/11 le Patch Tuesday, le 20/11 un vendredi.

Imprécisions relevées et corrigées (détail dans les corrections) :

- « serveurs Windows préparés pour cet usage » : c'est le correctif qui a été préparé pour les serveurs de la passerelle, pas les serveurs eux-mêmes (n°7).
- « Chaque passerelle se compose de milliers d'unités » : le rapport ne le dit que de « the network gateway » (n°8).
- Incubation « que personne ne voit » : le rapport signale entre 01 h 07 et 16 h 00 des défaillances isolées, traitées par l'automatisation (n°14).
- « ne pouvaient rien contre » : le rapport dit « unable to quickly revert » (n°11).
- Le laboratoire différait aussi par la composition du trafic (« traffic mix »), pas seulement par le matériel (n°10).
- Les messages de statut évoquaient des « recent configuration updates », pas un « changement de la veille » (n°16).
- Defender : le rapport dit « delayed », pas une distribution arrêtée (n°18).
- Schéma 4 : « sept autres » faux. Sur les 14 services de la liste, l'anneau 2 en nomme 7 hors Exchange, il en reste **six** (Fabric, Planner, Power Apps, To Do, Power BI, Universal Print) (n°21).
- Graph et Learn : endpoints, permission et chemins de menu exacts.
- Nomenclature : Microsoft Entra ID, Defender for Office 365, Defender XDR, Microsoft 365 Copilot. Rien de périmé.
- Titre de Charles Lamanna (« EVP Copilot, Agents and Platform ») : confirmé par la presse (GeekWire), pas par une page Microsoft.

**Points transmis par le rédacteur :**

1. **Rapport préliminaire** : concordance établie (voir tableau des sources). Le texte dit désormais explicitement que le dossier s'appuie sur le préliminaire (n°5) et que je l'ai lu sur une copie tierce (n°6).
2. **EX1550543 / MO1550821** : j'ai tranché, **on les garde**. La règle de CLAUDE.md vise les numéros de Message Center (MCxxxxxxx), qui sont des annonces de changement à durée de vie courte. Les identifiants Service Health sont la clé de recherche du rapport post-incident dans le centre d'administration, et @MSFT365Status les publie lui-même sur X. Le contrôle du script (`MC\d{6,}`) ne les vise pas. J'ai retiré le gras (deux numéros en gras dans un paragraphe d'ouverture, c'est trop). Daniel peut étendre la règle s'il le souhaite (décision n°1).
3. **Chiffres à confirmer** : 430 millions confirmé comme base d'utilisateurs (BBC) et reformulé. NHS, Toronto, Japon et Philippines confirmés à la source primaire. 130 000 retiré. 7 milliards (Anderson) et Richemont conservés « à confirmer ».
4. **Intune, Defender for Office 365, messages de statut** : confirmés dans The Register et SecurityWeek. Le tableau des impacts attribue déjà ces deux lignes à The Register. Rien à changer.
5. **Entra ID** : absent de la liste, confirmé. L'entrée de 15 h 05 suit le transfert du trafic vers « alternative connection paths », ce qui oriente plutôt vers la connexion côté passerelle. J'ai ajouté ce contexte, tiré du rapport, et gardé la prudence (n°17).
6. **« Processus interne de Windows »** : l'écart est réel, mais le texte en tirait un peu plus que ce que Microsoft dit. Lamanna retire « Windows » à trois endroits, pas seulement devant « processus interne », et garde la phrase sur les « broader Windows deployments ». J'ai précisé les trois omissions, nommé le média qui titre sur le « bug Windows caché » (Cyber Security News) et remplacé « rien n'est à corriger dans votre tenant », qui mélangeait deux plans, par « rien à corriger sur vos serveurs ni sur vos postes » (n°12). Ce n'est pas surinterprété.
7. **Alertes de style maintenues** : voir section 3.

## 3. Style et ton

- `style-check.mjs` : **0 alerte bloquante**. L'alerte « rythme monotone » (7 suites au départ) a disparu après correction. Il reste 2 suites, qui chevauchent une frontière de paragraphe.
- **Alertes maintenues** : l'émoji 📊 et les deux-points des 5 blocs `> 📊 **Schéma à générer**`. Ce sont des consignes pour l'illustrateur, qui remplacera chaque bloc par `![SCHEMA n](...)`. Ils ne seront jamais publiés tels quels. Le publieur doit vérifier qu'il n'en reste aucun.
- Tirets cadratins : aucun.
- Trois maximes de fin de paragraphe réécrites ou supprimées (n°9, 10, 16). Je garde « Downdetector mesure ce que les utilisateurs croient en panne » et « Les causes diffèrent. Le service qui tombe est le même. » (chute plate, fait vérifiable).
- Une ironie retirée en conclusion (« aura enfin une seconde porte »), parce qu'elle prêtait au rapport définitif un contenu qu'il n'a pas encore (n°28).
- « Je » : quatre occurrences, toutes à leur place.
- Grille de la section 9 passée : la première phrase porte une date et un fait, les fins de paragraphe sont factuelles, aucun verbe faible n'est signalé, le gras est limité aux libellés de console et à « passerelle réseau ».

## 4. Évolutions techniques depuis la publication

Sans objet : brouillon non publié, `pubDate` 2026-11-16.

## Bannière

Les deux bannières proposées n'existent pas encore dans `public/images/banarticle/`. Ma recommandation est **`dossier-m3651.png`** (nouvelle série). La cause est une passerelle commune à « many Microsoft 365 services », la liste officielle compte 14 services et le titre dit « Microsoft 365 ». Une bannière `dossier-exchange1` mettrait sur le seul Exchange un incident que Microsoft attribue à l'infrastructure de Microsoft 365, et la série « exchange » resterait isolée. Le nom suit la convention `<format>-<produit>N`. L'illustrateur doit la produire (748×172, `scripts/make-banner.mjs`) avant publication, sinon l'image est cassée.

## Corrections appliquées

### Correction n°1 : Style, frontmatter (`description`)
**Avant** : « … Cause racine, chronologie UTC, impacts mesurés et ce que les administrateurs doivent changer. » (162 caractères)
**Après** : « … Cause racine, chronologie UTC, impacts et ce que les administrateurs doivent préparer. » (155 caractères)
**Raison** : la longueur dépassait la cible de 140-160 caractères, et le dossier conclut que rien ne se corrige depuis un tenant. « Préparer » est cohérent avec ce constat. **Modification du frontmatter.**

### Correction n°2 : Technique
**Avant** : « Les boîtes aux lettres sont restées fermées 23 heures et 50 minutes, et il a fallu pour les rouvrir annuler un correctif déployé en juillet. »
**Après** : « Microsoft compte 23 heures et 50 minutes d'incident. Pour en sortir, il a fallu annuler un correctif déployé en juillet. »
**Raison** : 23 h 50, c'est l'écart entre le début et la fin officiels de l'incident. Le rapport précise que l'impact « varied by region, connection method, and time », et l'Europe était rétablie à 11 h 35 UTC.

### Correction n°3 : Technique
**Avant** : « ce qu'un administrateur peut corriger dès cette semaine. »
**Après** : « ce qu'un administrateur peut préparer dès cette semaine. »
**Raison** : la phrase contredisait la section finale (« Rien … ne se corrigeait depuis un tenant »).

### Correction n°4 : Style
**Avant** : « **EX1550543** couvre … **MO1550821** … »
**Après** : les mêmes identifiants, sans gras.
**Raison** : la charte limite le gras aux libellés de console et à un fait décisif par section.

### Correction n°5 : Source (point n°1)
**Avant** : « Tout ce qui suit peut encore bouger. »
**Après** : « Ce dossier s'appuie sur le préliminaire, et tout ce qui suit peut encore bouger. »

### Correction n°6 : Source
**Avant** : « Informations vérifiées le 16 novembre 2026. Le rapport préliminaire, réservé aux administrateurs, a été lu dans une copie diffusée par un site tiers, conforme à la version abrégée de Charles Lamanna. »
**Après** : « Informations vérifiées le 17 novembre 2026. Le rapport préliminaire est réservé aux administrateurs. Je l'ai lu dans une copie diffusée par un site tiers, identique à la version abrégée de Charles Lamanna sur tous les passages communs. »
**Raison** : date de ma vérification, concordance établie, et rythme.

### Correction n°7 : Technique
**Avant** : « Elle tourne sur des serveurs Windows préparés pour cet usage. »
**Après** : « Elle tourne sur des serveurs Windows. »
**Raison** : le rapport dit « a fix that was prepared specifically for Microsoft 365 networking gateway servers ». C'est le correctif qui a été préparé pour ces serveurs, pas les serveurs eux-mêmes.

### Correction n°8 : Technique
**Avant** : « Chaque passerelle se compose de milliers d'unités de capacité … Au-dessus, un système de gestion du trafic … »
**Après** : « La passerelle se compose de milliers d'unités de capacité … Un système de gestion du trafic … »
**Raison** : le rapport ne décrit la structure que de « the network gateway », et rien ne situe la gestion du trafic « au-dessus ».

### Correction n°9 : Style et technique
**Avant** : « Le détail qui explique la suite tient en une phrase du rapport. … Le service le plus utilisé de Microsoft 365 est celui qui n'a pas d'issue de secours. »
**Après** : « Une phrase du rapport explique la suite. … « pour des raisons d'échelle ». »
**Raison** : la maxime de fin portait un superlatif non sourcé (« le plus utilisé »), et l'ouverture était une mise en scène. Le paragraphe finit désormais sur la citation.

### Correction n°10 : Technique et style
**Avant** : « Les tests de charge portaient sur des machines plus faibles, avec moins de cœurs, alors que la contention s'aggrave sur le matériel récent. Le banc d'essai mesurait un autre parc que la production. »
**Après** : « Les tests de charge portaient surtout sur du matériel plus faible, avec moins de cœurs, alors que la contention s'aggrave sur les machines récentes qui en ont davantage. Le laboratoire ne reproduisait pas non plus la composition du trafic de production. »
**Raison** : le rapport écrit « tended to focus » et cite deux causes, « traffic mix and SKUs ». La maxime est remplacée par le second fait.

### Correction n°11 : Technique et rythme
**Avant** : « La remise en service a buté sur le même mécanisme. Un serveur redémarré … retombait. La récupération automatique …, et le retour arrière, le flighting et les feature flags ne pouvaient rien contre un code installé depuis quatre mois. »
**Après** : « La remise en service a buté sur le même mécanisme, car un serveur redémarré … retombait. La récupération automatique … répondre. Le retour arrière, le flighting et les feature flags ne permettaient pas d'annuler vite un code installé depuis quatre mois. »
**Raison** : le rapport dit « unable to quickly revert ». La fusion des deux premières phrases casse une suite monotone.

### Correction n°12 : Technique (point n°6)
**Avant** : « La version abrégée … parle d'un processus interne, sans le mot Windows. Une partie de la presse a titré sur un bug Windows caché. Les deux textes de Microsoft s'accordent sur le point qui vous concerne : ni le défaut ni le correctif ne s'appliquent aux déploiements Windows ordinaires, et rien n'est à corriger dans votre tenant. »
**Après** : « La version abrégée … dit seulement « processus interne », et retire aussi le mot Windows des serveurs et du code rétabli. Cyber Security News a titré sur un bug Windows caché. Les deux textes de Microsoft gardent la même phrase sur le point qui vous concerne : ni le défaut ni le correctif ne s'appliquent aux autres déploiements de Windows. Il n'y a rien à corriger sur vos serveurs ni sur vos postes. »
**Raison** : l'écart couvre trois omissions et non une seule. « Une partie de la presse » reposait sur un titre identifiable. La conséquence pratique de la phrase de Microsoft porte sur les machines Windows, pas sur le tenant.

### Correction n°13 : Technique (tableau de chronologie)
**Avant** : « hausse des échecs de connexion » / « Downdetector compte 19 650 signalements par minute » / « pas du trafic »
**Après** : « hausse des problèmes de connectivité » / « … par minute (cinq services cumulés) » / « pas d'une hausse du trafic »
**Raison** : traductions plus fidèles (« connectivity issues », « not driven by an overall increase in traffic ») et chiffre Downdetector remis dans son périmètre.

### Correction n°14 : Technique
**Avant** : « L'incubation dure quinze heures, … et personne ne la voit. »
**Après** : « … et ne se signale que par des défaillances isolées que l'automatisation traite une à une. »
**Raison** : le rapport indique « Isolated server failures began in some regions during this period, automated mitigations applied ».

### Correction n°15 : Source
**Avant** : « Downdetector cite 16 h 17 UTC, l'heure des premières redirections automatiques, la presse 17 h 00, 17 h 54 ou 18 h 26 UTC selon le message de statut lu. »
**Après** : « Downdetector attribue à Microsoft un début à 16 h 17 UTC, l'heure des premières redirections automatiques dans le rapport. La presse donne des heures comprises entre 17 h 00 et 18 h 30 UTC selon le message de statut lu, vers 18 h 00 pour The Register. »
**Raison** : Downdetector écrit « Microsoft says … began at 16:17 UTC ». Je n'ai trouvé 17 h 54 et 18 h 26 dans aucune source citée. J'ai vérifié 17 h 00 (BBC) et environ 18 h 00 (The Register, The Pharmaceutical Journal).

### Correction n°16 : Technique et style
**Avant** : « Les messages de la nuit décrivaient correctement le symptôme. La cause a été cherchée là où elle se trouve presque toujours, dans le changement de la veille. »
**Après** : « Les messages de la nuit décrivaient correctement le symptôme, des serveurs qui échouaient aux contrôles de santé automatisés. La cause a d'abord été cherchée parmi les changements récents. »
**Raison** : « presque toujours » est une généralité non sourcée, et les messages parlaient de « recent configuration updates », pas d'un changement de la veille. Le symptôme est celui que cite The Register.

### Correction n°17 : Technique (point n°5)
**Avant** : « Le rapport mentionne seulement, à 15 h 05 UTC le 13 novembre, une amélioration … »
**Après** : « … à 15 h 05 UTC le 13 novembre, après le transfert du trafic client éligible vers d'autres chemins de connexion, une amélioration … »
**Raison** : c'est le contexte exact de l'entrée de 15 h 05 dans le rapport.

### Correction n°18 : Technique
**Avant** : « … ne reçoivent rien quand Exchange Online ne distribue plus. Aucune source consultée ne dit comment elles ont rattrapé la file. »
**Après** : « … dépendent de la distribution du courrier, que le rapport dit retardée pour de nombreux utilisateurs. Aucune source consultée ne dit comment elles ont rattrapé le retard. »
**Raison** : le rapport écrit « email delivery was delayed for many users ». La distribution n'était pas arrêtée.

### Correction n°19 : Source (point n°3)
**Avant** : « La presse grand public cite un pic d'environ 130 000 signalements et 430 millions d'utilisateurs touchés, ce second chiffre étant la base d'utilisateurs de Microsoft 365. Les deux sont à confirmer. »
**Après** : « Le chiffre de 430 millions, repris par la presse grand public, désigne selon la BBC la base mondiale d'utilisateurs de Microsoft 365, pas le nombre de personnes touchées. »
**Raison** : aucune source trouvée pour 130 000, et Wikipédia ne le mentionne pas. La BBC confirme que 430 millions est la base d'utilisateurs.

### Correction n°20 : Source (point n°3)
**Avant** : « D'autres cas, recensés par Wikipédia …, restent à confirmer : hôpitaux britanniques revenus au papier, code gris …, réseau gouvernemental japonais …, Cour suprême des Philippines, chiffrage de 7 milliards … »
**Après** : « Wikipédia recense d'autres cas, que j'ai retrouvés dans les articles qu'elle cite. Le Guardian décrit … La BBC rapporte … confirmée par Nippon.com, … Restent à confirmer le chiffrage de 7 milliards de dollars attribué à Anderson Economic Group et le report des résultats de Richemont. »
**Raison** : quatre cas vérifiés à la source primaire. CNN (Anderson) est inaccessible (451) et je n'ai trouvé aucune trace de Richemont. Ce dernier ne figurait pas dans le texte du rédacteur, mais il était dans sa liste de points à vérifier. Il est signalé ici comme non confirmé.

### Correction n°21 : Technique (schéma 4)
**Avant** : « … Purview, Intune et sept autres »
**Après** : « … Purview, Intune et six autres »
**Raison** : 14 services dans la liste du rapport, dont Exchange (anneau 1) et 7 nommés dans l'anneau 2. Il en reste 6.

### Correction n°22 : Rythme
**Avant** : « Le document du 15 novembre se déclare préliminaire, et plusieurs zones restent dans l'ombre. »
**Après** : « Le document du 15 novembre se déclare préliminaire. »
**Raison** : la suite énumère ces zones, et la phrase cassée rompt une suite monotone.

### Correction n°23 : Rythme
**Avant** : « Tout ce qui entoure la panne, en revanche, se prépare. »
**Après** : « Tout ce qui l'entoure se prépare. »

### Correction n°24 : Technique
**Avant** : « … envoyée à une boîte Exchange Online arrive quand l'incident est clos. »
**Après** : « … risque d'arriver après la fin de l'incident. »
**Raison** : l'affirmation absolue n'était pas vérifiable, et la distribution a été retardée, pas suspendue.

### Correction n°25 : Technique
**Avant** : « Un script … prévient avant le premier appel d'utilisateur. »
**Après** : « Un script … vous prévient dès la publication de l'incident. Le 12 novembre, EX1550543 a précédé de treize minutes le premier ticket client. »
**Raison** : la promesse devient un fait tiré du rapport (16 h 20 contre 16 h 33).

### Correction n°26 : Technique et style
**Avant** : « À 17 h 20, heure de Paris, personne ne le savait. Un plan de continuité … parie sur l'architecture interne de Microsoft. Une liste d'appel … coûtent moins cher que ce pari. »
**Après** : « Un plan de continuité … parie sur un détail d'architecture que le client découvre dans le rapport post-incident. Une liste d'appel … coûtent moins cher. »
**Raison** : « personne ne le savait » n'était pas vérifiable (les utilisateurs de Teams constataient qu'il fonctionnait). Le fait est que la raison n'a été connue qu'avec le rapport. Le raccourcissement corrige aussi le rythme.

### Correction n°27 : Technique
**Avant** : « … tout processus … s'est arrêté le 12 novembre … »
**Après** : « … a été bloqué ou retardé le 12 novembre … »
**Raison** : le rapport décrit un accès impossible pour la plupart des utilisateurs et une distribution retardée, pas un arrêt total.

### Correction n°28 : Style et technique (fin d'article)
**Avant** : « Il dira ce qui a percé les cloisons, et si Exchange Online aura enfin une seconde porte. »
**Après** : « Le rapport définitif est attendu le vendredi 20 novembre, avec la liste complète des mesures correctives. Deux questions restent ouvertes d'ici là : ce qui a percé les cloisons et pourquoi Exchange Online ne peut pas changer de passerelle. »
**Raison** : la phrase prêtait au rapport définitif un contenu qu'il n'a pas encore, avec une ironie appuyée (« enfin »). La fin donne la date suivante et la question ouverte (charte, section 5).

### Correction n°29 : Rythme
**Avant** : « … multipliés par cent environ. L'historique de statut Azure ne mentionne aucun incident. »
**Après** : « … multipliés par cent environ, alors que l'historique de statut Azure ne contient aucun rapport post-incident pour ces deux jours. »
**Raison** : la page ne liste que des rapports post-incident, d'où la précision. La fusion casse aussi une suite monotone.

## Ce que je n'ai PAS pu vérifier

- L'**original** du rapport préliminaire dans le centre d'administration (EX1550543 / MO1550821). Seule la copie 365fanatic a été lue. **À comparer par Daniel.**
- Le **chiffrage de 7 milliards de dollars** d'Anderson Economic Group (CNN, HTTP 451 depuis la France, aucune autre trace trouvée).
- **Richemont** (BBC live, Bloomberg non lus).
- La page **CBC** sur Toronto (403). Le fait reste confirmé par la BBC.
- « ThousandEyes, Cloudflare Radar et Kentik n'avaient publié aucune analyse au 16 novembre » : affirmation négative du rédacteur, non revérifiée.
- Les heures de presse « 17 h 54 » et « 18 h 26 » (retirées).
- Le titre de Charles Lamanna sur une page Microsoft. Seule la presse (GeekWire) le confirme.
- Les messages de statut eux-mêmes (le Service Health est réservé aux administrateurs). Je ne les connais que par The Register et SecurityWeek.

## Décisions qui reviennent à Daniel

1. **Identifiants d'incident dans le corps** : je les ai gardés (voir point n°2). À confirmer, ou étendre la règle « pas de MC » aux EX/MO.
2. **Sources primaires non listées** : le texte cite désormais le Guardian, la BBC et Nippon.com, vérifiés mais absents de la section Source (le relecteur n'ajoute pas de source). Je propose d'ajouter ces trois URL : theguardian.com/technology/2026/nov/13/how-microsoft-outage-has-affected-key-public-services-in-the-uk, bbc.com/news/articles/cqp9d58eldlro, bbc.com/news/articles/cxzd9171m51qo, nippon.com/en/articles/-/57370. Sinon, il faut revenir à « recensés par Wikipédia ».
3. **« Aucun impact propre à la France »** : la BBC mentionne Euronext, qui a demandé aux sociétés cotées de communiquer par téléphone. Ce n'est pas un impact propre à la France, mais un lecteur français pourrait le relever. À garder tel quel ou à nuancer.
4. **7 milliards et Richemont** : garder avec « à confirmer » (choix actuel) ou retirer.
5. **Bannière** : valider `dossier-m3651` (ma recommandation) et la faire produire avant publication.
6. **Avant publication** : vérifier que l'illustrateur a remplacé les 5 blocs « Schéma à générer » et rempli `heroImage`. Le rapport définitif du 20/11 pourra justifier une mise à jour (`updatedDate`).
