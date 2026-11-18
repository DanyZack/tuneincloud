# Rapport de relecture : Intune Windows Server, ce que vaut vraiment la préversion

**Fichier** : `src/content/draft/2026-11-18-intune-gestion-windows-server.md` (brouillon, corrigé en place)
**Format** : article presse (`actualites` / `articles`)
**Date de publication prévue** : 2026-11-18 (`pubDate` non modifiée)
**Date de relecture** : 2026-11-18
**Verdict global** : ⚠️ Publiable après corrections. Corrections appliquées, il reste deux décisions de Daniel : le bloc `[À COMPLÉTER PAR DANIEL]` et le retrait de Neowin.

## Synthèse

Le fond tient. Toutes les sources Microsoft se résolvent et confirment l'essentiel : build 29621.1000+, Desktop Experience, exclusions, 57 groupes du catalogue, anneaux de mises à jour, absence d'Autopatch dans le guide, risques RBAC et Azure. J'ai corrigé cinq imprécisions techniques : CA/MFA « sans rien afficher », filtres « ignorés », hotpatch attribué à Azure Update Manager, bascule Defender présentée comme définitive, date « ouverte le 17 novembre ». J'ai aussi retiré une source tierce non lue (Neowin), attribué les exclusions au billet Biswas pour Autopilot et l'inscription en masse, et appliqué l'essentiel des réécritures GEO. Le texte compte maintenant 1 499 mots (seo-check), soit la limite haute du format : la phrase de terrain de Daniel le fera dépasser d'une vingtaine de mots, ce qui reste acceptable.

## Pré-contrôles mécaniques

| Contrôle | Résultat |
|---|---|
| Tirets cadratins | 0 (avant et après) |
| Points-virgules dans le corps | 0 |
| Liens internes | 4/4 existent : `old-modejonctionwindows`, `2026-10-08-intune-baseline-windows-11-26h2`, `2026-04-27-intune-datawarehouse`, `2026-04-16-intunesuite-in-m365` |
| Frontmatter | `category: actualites`, `subcategory: articles` valides (Zod). `title` 58 caractères, `description` 157 caractères. `heroImage: ""` à renseigner par l'illustrateur (accepté par Zod, mais pas d'image OG). |
| Longueur | 1 385 mots avant, 1 499 après (seo-check). Fourchette 800-1 500 respectée de justesse. |
| « brebes » | absent |
| `seo-check --stage draft` | aucune alerte (avant et après) |
| `style-check` | avant : 4 intertitres en question + rythme monotone (8 suites). Après : 4 intertitres en question, **rythme monotone résolu**. Zéro alerte bloquante. |

Les 4 intertitres en question sont maintenus. Ce ne sont pas des questions rhétoriques mais les requêtes réelles des internautes (PAA), et geo.md recommande de les garder.

## 1. Sources

| URL | État | Vérifié le | Commentaire |
|---|---|---|---|
| learn.microsoft.com/en-us/intune/intune-service/fundamentals/whats-new | ✅ OK | 2026-11-18 | Entrée « Manage Windows Server devices with Microsoft Intune (Insider preview) » sous « Week of November 16, 2026 (Service release 2611) ». Hors production uniquement. |
| learn.microsoft.com/en-us/intune/solutions/end-to-end-guides/windows-server-endpoints-get-started | ✅ OK | 2026-11-18 | `ms.date` 2026-11-16, `updated_at` 2026-11-17. Tout le contenu cité est confirmé (voir section 2). Aucune occurrence de « Autopatch ». La FAQ cite « Windows Server 2028 Insider Preview ». |
| techcommunity.microsoft.com/…/manage-windows-servers-alongside-pcs-with-microsoft-intune/4572643 | ✅ OK (navigateur) | 2026-11-18 | Arnab Biswas, 17 novembre 2026. Cibles conformes. Mises à jour : « maintenance window policies using Windows Autopatch ». Exclusions : Autopilot, inscription en masse, MDM-only, inscription automatique des appareils co-gérés. |
| techcommunity.microsoft.com/…/what's-new-in-microsoft-intune-at-ignite/4570003 | ⚠️ Redirigée | 2026-11-18 | Redirige vers le slug `…-at-microsoft-ignite/4570003`. **URL corrigée.** Contenu : « incorporates Windows Autopatch for update management ». Jason Roszak, 17 novembre 2026. |
| techcommunity.microsoft.com/…/windows-server-2028-a-trusted-foundation-…/4574112 | ✅ OK (navigateur) | 2026-11-18 | « Windows Server 2028 is now in Public Preview! », 17 novembre 2026. Le billet dit aussi qu'Intune pour Windows Server est « now in Preview », sans le mot Insider (voir section 4). |
| blogs.windows.com/…/windows-security-at-ignite-2026-… | ✅ OK | 2026-11-18 | 17 novembre 2026. Mentionne l'extension d'Intune et de Windows Autopatch à Windows Server, en préversion. Cité seulement en Sources, ce qui est cohérent. |
| learn.microsoft.com/en-us/azure/azure-arc/servers/prerequisites | ✅ OK | 2026-11-18 | Windows Server 2012 R2 à 2025, Desktop et Server Core. Tableau exact. |
| learn.microsoft.com/en-us/azure/azure-arc/servers/modernize-server-management | ✅ OK | 2026-11-18 | `ms.date` 2025-08-19. « Analogous to Microsoft Intune for client endpoints, Azure delivers… ». Pas de surcoût avec SA, Windows Server PAYG ou VM Azure, sinon paiement à l'usage. Tableau exact. |
| learn.microsoft.com/en-us/windows-server/get-started/hotpatch | ⚠️ Écart | 2026-11-18 | Hotpatch WS 2025 hors Azure : machines connectées à Azure Arc. Azure Update Manager est **un** des outils d'orchestration (avec la GPO, SConfig et des outils tiers). Intune n'est cité que pour Windows client. **Phrase corrigée.** |
| learn.microsoft.com/en-us/intune/configmgr/…/supported-operating-systems-for-clients-and-devices | ✅ OK | 2026-11-18 | Serveurs 2016 à 2025, Server Core compris. |
| learn.microsoft.com/en-us/intune/configmgr/…/product-and-licensing-faq | ✅ OK | 2026-11-18 | SA ou abonnement équivalent pour la current branch. |
| Neowin (sans URL) | ❌ Non vérifiable | 2026-11-18 | Article non lu par le rédacteur (403), introuvable par recherche. **Retiré** du texte et des Sources (voir Correction 3). |

## 2. Exactitude technique

Points vérifiés et confirmés : build 29621.1000+, Desktop Experience, physique ou VM ; jonction Entra ou hybride + GPO ; « Server devices » bloquée par défaut ; exclusions Server Core, multisession, non persistants, sans utilisateur, co-management et déconnectés ; modèles Antivirus, Disk encryption, Firewall, ASR et LAPS ; actions Sync à Wipe, rotation BitLocker et LAPS, Defender Scan et Update ; anneaux WUfB avec reports, échéances, fenêtres de maintenance et redémarrages ; exclusion des stratégies Quality, Feature et Driver updates ; Azure Update Manager ; conformité pare-feu, antivirus et antispyware exclue ; débordement « All devices », utilisateurs et groupes dynamiques ; effacement de VM Azure sans RBAC Azure ni JIT ; aucun rôle RBAC nouveau ; FAQ Intune ou Arc, tenants séparés, licence.

Réponses aux points transmis par le rédacteur :

1. **Bloc `[À COMPLÉTER PAR DANIEL]`** : laissé en place, non modifié. Décision de Daniel.
2. **Neowin** : retiré. Le skill refuse les sources secondaires non vérifiées, et un article non lu ne l'est pas. L'introduction dit déjà que Microsoft ne fixe aucune date. Daniel peut le rétablir s'il lit l'article.
3. **Autopatch** : l'écart est maintenant posé en entier. Le blog Ignite (« incorporates Windows Autopatch ») et le billet Biswas (fenêtres de maintenance sous Windows Autopatch) sont mis face au guide Learn (aucune occurrence, anneaux seulement). C'est la juxtaposition de l'article.
4. **Defender / EDR** : formulation factuelle (« ne figure pas dans la liste des modèles de la préversion »), sans conclure à une impossibilité. Correct. J'ai ajouté « pas encore » à la bascule depuis security settings management, car le guide écrit « isn't supported yet ».
5. **Contrôleurs de domaine** : bien présenté comme analyse (« C'est mon analyse, pas une position de Microsoft »). Le raisonnement s'appuie sur un fait sourcé (inscription sans utilisateur exclue). Conservé.
6. **57 groupes** : recompté dans la section « Supported settings catalog groups » du guide. Il y en a bien **57**. Phrase attribuée au guide (réécriture GEO 5).
7. **Ironie Configuration Manager vers Arc** : exacte. La page date du 2025-08-19 (mise à jour le 2025-11-25) et écrit « Analogous to Microsoft Intune for client endpoints, Azure delivers… ». La page dit « Azure », pas « Arc » : j'ai corrigé le sujet. C'est une juxtaposition sans commentaire, conforme à la charte. Conservée.
8. **vNext / Windows Server 2028** : le texte ne relie pas les deux, ce qui est correct. La FAQ du guide cite seulement « Windows Server 2028 Insider Preview » dans un scénario de test. Rien à corriger.
9. **NIS2** : la phrase énonçait une obligation de preuve sans source (« doit se prouver »). Elle est réécrite à la première personne, en recommandation de Daniel (Correction 12).

## 3. Style et ton

- Tirets cadratins : aucun.
- Rythme monotone (8 suites) résolu par cinq coupes ou fusions (Corrections 13 à 17).
- Maxime en fin de paragraphe : « Intune n'y a pas de place. » remplacée par un fait (Correction 6). La phrase NIS2 avait le même défaut (Correction 12).
- Voix : 3 « je » (« je crains », « Je range », « je ne m'appuierais pas »), plus « mon analyse ». C'est dans la fourchette de la charte, aux moments où Daniel prend position.
- Un seul ⚠️, devant un piège réel (effacement de VM Azure). Conforme.
- Les deux listes Avantages / Inconvénients sont des éléments parallèles et courts. Elles sont tolérées et `style-check` ne signale pas d'excès de puces.

## 4. Évolutions depuis la publication

Sans objet : brouillon daté du jour.

Point à surveiller : le billet Windows Server 2028 écrit qu'Intune pour Windows Server est « now in Preview », sans le mot Insider. Le What's new, le guide et le billet Biswas disent tous « Insider preview ». L'article suit les sources Intune, et c'est le bon choix.

## SEO (arbitrage de geo.md)

**Appliquées**
- GEO 1, **modifiée** : « ouverte le 17 novembre 2026 à Ignite » est inexact. Le What's new place l'entrée dans la semaine du 16 novembre (SR 2611), le guide est daté du 16, les billets Ignite et Biswas du 17. Texte retenu : « Depuis la semaine du 16 novembre 2026, Microsoft Intune peut gérer Windows Server, en Insider preview seulement. Microsoft l'a annoncé le 17 novembre, à Ignite. » La réponse littérale est là, l'entité exacte aussi, et la date est juste.
- GEO 2, **ajustée** : la dernière phrase devient « Aucune source Microsoft n'associe Windows Server 2025 à la gestion par Intune. »
- GEO 3 : les trois réécritures (FAQ sourcée dans la phrase, phrase d'introduction du tableau, page d'août 2025). J'ai remplacé « Arc » par « Azure » pour coller à la page.
- GEO 4, **partielle** : licence appliquée telle quelle. « Faut-il franchir le pas » : « l'essai est utile » est écarté (adjectif d'appréciation) au profit de « oui », et « Pas en production. » est gardé comme phrase courte.
- GEO 5 : dates absolues pour Autopatch, « Selon le guide Microsoft Learn » devant les 57 groupes, « Microsoft Defender for Endpoint » à la première occurrence, « L'Insider preview expose… sur le serveur inscrit ».
- Remarques secondaires : fusion de la phrase Biswas sur les cibles, et phrase hotpatch rendue autonome.

**Écartées**
- « l'essai est utile » (GEO 4) : adjectif d'appréciation, interdit par la charte (section 2).
- Aucune FAQ ajoutée et aucun H2 supplémentaire. geo.md ne le demandait pas, et c'est cohérent avec la charte.

**Laissées à Daniel**
- Le bloc d'expérience terrain, seul marqueur E-E-A-T de l'article. geo.md le signale aussi.
- `heroImage` vide : il revient à l'illustrateur.

## Bannière proposée

`/images/banarticle/article-intune1.png` : **avis favorable** sur le nom. Il suit la convention `<format>-<produit>N` et la série `article-*` (`article-copilot1`, `article-defender1`). Le fichier **n'existe pas encore** dans `public/images/banarticle/` : l'illustrateur doit le créer en 748×172 avant publication, sinon l'image sera cassée. Réutiliser `breve-intune*` dans un article presse brouillerait la convention de format.

## Corrections appliquées

### Correction N°1 : Technique / Source (date)
**Avant** : « Le 17 novembre 2026, à Ignite, Microsoft a ouvert la gestion Intune Windows Server, en Insider preview. »
**Après** : « Depuis la semaine du 16 novembre 2026, Microsoft Intune peut gérer Windows Server, en Insider preview seulement. Microsoft l'a annoncé le 17 novembre, à Ignite. »
**Raison** : la documentation (What's new, guide du 16 novembre) précède l'annonce d'Ignite. « Intune Windows Server » n'est pas un nom de produit.

### Correction N°2 : Technique (ambiguïté Public Preview)
**Avant** : « Le même jour, Microsoft a ouvert la préversion publique de Windows Server 2028. Son billet de lancement écrit « Public Preview » en tête. Le guide Intune écrit « nonproduction testing and evaluation only ». […] Aucune source Microsoft ne le dit. »
**Après** : « Le même jour, Microsoft a ouvert la préversion publique de Windows Server 2028, dont le billet de lancement écrit « Public Preview » en tête. La gestion de Windows Server par Intune reste une Insider preview, que le guide Microsoft Learn réserve à « nonproduction testing and evaluation only ». […] Aucune source Microsoft n'associe Windows Server 2025 à la gestion par Intune. »
**Raison** : chaque phrase nomme son sujet (GEO 2). « Ne le dit » était flou.

### Correction N°3 : Source (Neowin retiré)
**Avant** : paragraphe « Neowin avance une préversion publique au printemps 2027. Je n'ai pas pu lire l'article […] » et ligne Sources « Neowin, Intune et Autopatch (article non consulté, accès refusé) ».
**Après** : supprimés.
**Raison** : source tierce non lue et introuvable. Le skill refuse les sources secondaires non vérifiées. L'introduction dit déjà qu'aucune date n'est fixée. **Réversible si Daniel lit l'article.**

### Correction N°4 : Source (attribution des exclusions)
**Avant** : « Restent exclus Server Core, […], Windows Autopilot, l'inscription en masse, […] »
**Après** : « Le guide et le billet d'Arnab Biswas excluent Server Core, […] »
**Raison** : Autopilot et l'inscription en masse ne figurent que dans le billet Biswas, pas dans le guide.

### Correction N°5 : Technique (prérequis d'inscription)
**Avant** : « La plateforme « Server devices » passée à « Allow » dans les restrictions d'inscription, où elle est bloquée par défaut. »
**Après** : « […] où elle est bloquée par défaut, avec « Personally owned devices » pour l'inscription depuis les paramètres. »
**Raison** : le guide exige les deux réglages pour l'inscription par « add work or school account » dans les paramètres.

### Correction N°6 : Technique (hotpatch)
**Avant** : « Le hotpatch de Windows Server 2025 hors Azure passe, selon sa page Learn, par Azure Arc et Azure Update Manager. Intune n'y a pas de place. »
**Après** : « Le hotpatch de Windows Server 2025 hors Azure exige, selon sa page Learn, une connexion à Azure Arc. Cette page ne cite Intune que pour Windows client. »
**Raison** : Azure Update Manager n'est qu'un des outils d'orchestration (avec la GPO, SConfig et des outils tiers). La maxime finale est remplacée par un fait vérifiable.

### Correction N°7 : Technique (Autopatch, point 3)
**Avant** : « Le blog Intune d'Ignite annonce que la gestion des serveurs « incorporates Windows Autopatch ». Le guide technique publié la veille ne cite pas Autopatch une seule fois. »
**Après** : « Le blog Intune d'Ignite, publié le 17 novembre 2026, annonce que la gestion des serveurs « incorporates Windows Autopatch », et le billet d'Arnab Biswas place les fenêtres de maintenance sous Windows Autopatch. Le guide Microsoft Learn daté du 16 novembre ne cite pas Windows Autopatch une seule fois. Il ne documente que les anneaux de mises à jour. »
**Raison** : l'écart couvre les deux billets, et les dates deviennent absolues (GEO 5).

### Correction N°8 : Technique (Defender)
**Avant** : « […] ne peut pas basculer vers l'inscription MDM. Le guide le dit en une ligne, dans ses limitations connues. »
**Après** : « […] ne peut pas encore basculer vers l'inscription MDM. Le guide le range dans ses limitations connues. »
**Raison** : le guide écrit « isn't supported yet ». La limite figure aussi dans son tableau des approches, donc « en une ligne » était inexact. Ajouts GEO 5 : « Microsoft Defender for Endpoint », « sur le serveur inscrit », « liste des modèles de la préversion ».

### Correction N°9 : Technique (filtres)
**Avant** : « Les scripts PowerShell et les ensembles de stratégies ignorent les filtres d'affectation. »
**Après** : « […] ne prennent pas en charge les filtres d'affectation. »
**Raison** : libellé du guide (« don't support assignment filters »).

### Correction N°10 : Technique (MFA)
**Avant** : « […] peut interrompre la synchronisation d'un serveur sans rien afficher. »
**Après** : « […] sans inviter l'utilisateur à se reconnecter. »
**Raison** : le guide précise que « Device sync status » affiche un message d'échec. Ce qui manque, c'est l'invite de connexion.

### Correction N°11 : Technique (catalogue)
**Avant** : « Intune lui applique les mêmes réglages du catalogue » / « le catalogue de paramètres (57 groupes listés) »
**Après** : « les réglages du catalogue pris en charge » / « Selon le guide Microsoft Learn, le serveur inscrit reçoit 57 groupes du catalogue de paramètres »
**Raison** : seuls 57 groupes sont pris en charge, pas l'ensemble du catalogue client. Le nombre est vérifié.

### Correction N°12 : Style / Technique (NIS2)
**Avant** : « Pour une entité soumise à NIS2, la gestion des correctifs des serveurs doit se prouver, et une préversion non prise en charge ne porte pas cette preuve. »
**Après** : « Pour une entité soumise à NIS2, je ne m'appuierais pas sur une préversion que Microsoft ne prend pas en charge pour documenter la gestion des correctifs de ses serveurs. »
**Raison** : obligation réglementaire non sourcée, sous forme de maxime. Elle devient une recommandation de Daniel, sans fond ajouté.

### Correction N°13 à 17 : Style (rythme)
- Introduction : la première phrase est coupée en deux (Correction 1).
- Mises à jour : « …sont exclues de la préversion, et cette exclusion ne touche pas les reports des mises à jour qualité réglés dans les anneaux. » La précision vient du guide (« doesn't apply to quality-update deferral settings within update rings »).
- PAW : « …manquent à la liste, et chaque réglage sera repris puis testé sur le serveur. » devient « …manquent à la liste. Chaque réglage sera repris à la main, puis testé sur le serveur. »
- « Pas en production, puisque Microsoft l'exclut. » devient « Pas en production. Microsoft exclut tout usage de production pendant l'Insider preview. »
- « Le travail utile précède toute inscription. Exclure… » devient « Le travail utile précède toute inscription : exclure… »
- Licence : « La FAQ du guide précise que la réponse ne vaut pas pour les conditions futures. » devient « Cette réponse, précise la FAQ, ne vaut que pour la préversion. »

### Correction N°18 : Source (URL)
**Avant** : `…/what%E2%80%99s-new-in-microsoft-intune-at-ignite/4570003`
**Après** : `…/what%E2%80%99s-new-in-microsoft-intune-at-microsoft-ignite/4570003`
**Raison** : redirection vers le slug canonique.

### Corrections GEO de forme (sans changement de fond)
Phrase d'introduction du tableau, FAQ sourcée dans la phrase (section Arc), page d'août 2025, licence et « Faut-il franchir le pas » (voir section SEO).

**Frontmatter** : non modifié (`title`, `description`, `pubDate`, `heroImage` intacts).

## Ce que je n'ai PAS pu vérifier

- L'article Neowin (date « printemps 2027 ») : introuvable, d'où son retrait.
- La date exacte d'ouverture d'Ignite 2026 : les billets du 17 novembre écrivent « this week at Microsoft Ignite ». L'article ne dit que « annoncé le 17 novembre, à Ignite », ce qui est couvert.
- L'inclusion de l'Intune Suite dans Microsoft 365 E3/E5 : elle vient de l'article interne lié et n'a pas été revérifiée ici.
- Le comportement réel en console (libellés « Server devices », « Personally owned devices ») : repris du guide, sans test sur un tenant.

## Décisions pour Daniel

1. **Bloc `[À COMPLÉTER PAR DANIEL]`** (section « Mon avis : ce que la préversion règle ») : ajouter une expérience vécue sur des serveurs de rebond, des RDSH ou des serveurs d'agence gérés par GPO et scripts ? Sinon, supprimer le bloc avant publication. Le publier tel quel est exclu.
2. **Neowin** : retiré. Le rétablir seulement après lecture de l'article et avec son URL.
3. **Longueur** : 1 499 mots. Avec la phrase de terrain, l'article dépassera légèrement la borne de 1 500. C'est acceptable, ou il faut couper ailleurs.
4. **Bannière `article-intune1.png`** : à créer par l'illustrateur (fichier absent).
