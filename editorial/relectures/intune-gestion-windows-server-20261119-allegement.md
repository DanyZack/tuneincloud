# Allègement : Intune Windows Server, ce que vaut vraiment la préversion

- Fichier : `src/content/blog/2026-11-19-intune-gestion-windows-server.md` (article publié, modifié en local, sans git)
- Date : 2026-11-19
- Motif : retour de Daniel (« trop de chez trop » sur les sources et les dates, lecture « limite indigeste »)
- Règle appliquée : charte section 6 « Sources et dates : une fois, puis on avance » et point 7 de la grille
- Verdict : ⚠️ prêt à relire par Daniel avant la mise en ligne (rien n'est commité ni poussé)

## Chiffres avant / après

| Mesure | Avant | Après |
|---|---|---|
| Mots (style-check) | 1 453 | 1 350 |
| Mots (seo-check, stage final) | 1 481 | 1 364 |
| Mots du corps hors section Sources (`wc -w`) | 1 565 | 1 410 |
| Attributions « selon », « d'après », « précise », « indique » dans le corps | 7 | 0 |
| Mentions de source au sens large (« le guide », « la FAQ », « le billet », « le blog », « la page ») | 25 | 4 |
| Dates dans le corps (hors Sources) | 12 | 1 (« mi-novembre 2026 ») |

Les quatre mentions restantes sont voulues : l'attribution unique de l'intro (What's new et guide Learn), la phrase Autopatch où le blog Ignite et le billet d'Arnab Biswas contredisent le guide, et la page Learn sur le passage de Configuration Manager à Azure Arc (la comparaison Azure / Intune n'a de valeur que signée Microsoft).

## Ce qui a été retiré ou déplacé en Sources

- Dates retirées du corps : « semaine du 16 novembre 2026 », « annoncé le 17 novembre », « guide daté du 16 novembre » (deux fois), « mis à jour le 17 novembre », « publié le 17 novembre » (billet Biswas, blog Ignite), « au 18 novembre 2026 » (tableau et licence), « page d'août 2025 ». Elles figurent désormais dans les libellés de la section Sources.
- Mention « service release 2611 » : déplacée dans le libellé du What's new en Sources.
- Attributions supprimées : « Le guide Learn fixe », « Selon le guide Microsoft Learn », « Le guide et le billet d'Arnab Biswas excluent », « le guide prévient », « selon sa page Learn », « Le guide le range dans ses limitations connues », « Selon la FAQ du guide », « d'après les pages Microsoft Learn citées en sources », « comme le recommande la FAQ du guide », « selon la FAQ », « précise la FAQ ». Les faits restent, énoncés directement.
- Phrase d'introduction du tableau (« Le tableau compare les trois outils d'après les pages Microsoft Learn citées en sources, au 18 novembre 2026 ») : supprimée, le tableau suit directement la phrase sur Azure Arc.
- Autopatch : deux phrases ramenées à un court paragraphe (« Windows Autopatch, lui, n'apparaît que dans la communication » puis une phrase qui oppose le blog Ignite et le billet Biswas au guide Learn).
- Sources : les 11 références sont conservées, avec un libellé court en français qui dit ce que chacune appuie (prérequis, limites, FAQ et licence pour le guide, cibles et Autopatch pour le billet Biswas, etc.).

## Fluidité

- Phrases hachées fusionnées : statut production et entrée du What's new, exclusions et contenu reçu par le serveur, serveur d'agence, rôles RBAC, licence, recommandation de laboratoire.
- Rythme : trois suites monotones signalées par style-check en cours de passe, corrigées (intro, paragraphe des exclusions, avis « ce que la préversion règle »).
- Fond inchangé : statut Insider preview, build 29621.1000, Desktop Experience, versions 2019/2022/2025 exclues, Windows Server 2028 en Public Preview, 57 groupes du catalogue, modèles Endpoint security, limites Defender, risques d'affectation, ⚠️ sur l'effacement des VM Azure, avis NIS2, contrôleurs de domaine, tableau Intune / Azure Arc / Configuration Manager, licence. Aucun fait ajouté.
- Les 3 liens internes et la bannière sont conservés. L'intro ouvre toujours sur « Microsoft Intune peut désormais gérer Windows Server ».

## Modifications de structure et de frontmatter (à signaler)

- Frontmatter : ajout de `updatedDate: 2026-11-19` (le schéma Zod accepte `z.coerce.date().optional()` sans contrainte par rapport à `pubDate`). `pubDate` et les autres champs sont intacts.
- H2 « Ce que Microsoft a annoncé le 17 novembre » renommé « Ce que Microsoft a annoncé à Ignite » pour retirer la date de l'intertitre. L'ancre de cette section change. Les autres H2 sont identiques.

## Contrôles

- `node scripts/style-check.mjs` : 0 bloquante. Restent 4 alertes « intertitre en question rhétorique » (H2 orientés requête, conservés pour ne pas toucher à la structure d'un article publié ; à arbitrer par Daniel).
- `node scripts/seo-check.mjs --stage final --keyword "Intune Windows Server"` : 0 bloquante, 1 alerte (mot-clé exact absent des 100 premiers mots, déjà présente avant la passe : l'intro imposée dit « Intune peut désormais gérer Windows Server »).
- Tirets cadratins : 0. Points-virgules : 0.
- Non fait : `npm run build` et nouvelle résolution des URL (sources vérifiées à la publication du jour, aucune URL modifiée).

## Extrait de l'intro réécrite

> Microsoft Intune peut désormais gérer Windows Server, mais en Insider preview seulement. Microsoft l'a annoncé mi-novembre 2026, à Ignite, dans le What's new d'Intune et un guide Microsoft Learn. La préversion se limite aux serveurs de test sous Windows Server vNext Insider, build 29621.1000 ou ultérieure, en Desktop Experience. Windows Server 2019, 2022 et 2025 restent hors périmètre. Aucune date n'est fixée, ni pour une préversion publique ni pour la disponibilité générale.
