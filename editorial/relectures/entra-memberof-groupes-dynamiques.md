# Relecture éditoriale : Entra ID, remplacer les règles memberOf avant le 3 novembre

- **Article** : `src/content/blog/2026-10-12-entra-memberof-groupes-dynamiques.md` (guide, `guides` / `entra`, publié le 2026-10-12)
- **Date de relecture** : 2026-11-03
- **Mode** : article publié, branche `claude/quirky-galileo-uppd5z` + pull request vers `master`
- **Périmètre** : strict. Correction des seuls points-virgules en prose (lignes 28, 35, 36, 121, 127, 145). Aucun autre changement de fond ou de style. Frontmatter et `pubDate` non modifiés.
- **Relecture précédente** : `editorial/relectures/entra-memberof-groupes-dynamiques-20261012.md`

## Verdict

⚠️ **Publiable après corrections**, corrections appliquées. Les six points-virgules de prose sont supprimés. D'autres écarts à la charte restent relevés ci-dessous, non appliqués (hors périmètre), en attente de décision de Daniel.

## Contrôle outillé

Le script `scripts/style-check.mjs` **n'existe pas dans le repo** (ni sur cette branche, ni dans l'historique git : `scripts/` ne contient que `make-banner.mjs`, `make-hero.mjs`, `svg2png.mjs`). Il n'a donc pas pu être exécuté. Le contrôle a été fait à la main :

- `grep -n ";"` avant correction : lignes 28, 35, 36, 77, 121, 127, 145 (conforme à la liste fournie).
- `grep -n ";"` après correction : **seule la ligne 77 subsiste**, `CAPolicies = ($caHits.displayName -join '; ')`, dans le bloc de code PowerShell. Volontairement non modifiée.
- `npm run build` : OK (35 pages).

## Corrections appliquées (6, catégorie style : point-virgule)

| # | Ligne | Avant | Après |
|---|---|---|---|
| 1 | 28 | « Learn évoque un remplaçant en développement, sans date ; le rappel final n'en annonce aucun. » | « Learn évoque un remplaçant en développement, sans date. Le rappel final n'en annonce aucun. » |
| 2 | 35 | « … pour chaque utilisateur membre d'un groupe dynamique ; P1 ou P2 pour les membres… » | « … pour chaque utilisateur membre d'un groupe dynamique. P1 ou P2 pour les membres… » |
| 3 | 36 | « Global Reader pour l'inventaire ; Groups Administrator pour … ; Privileged Role Administrator pour … ; Identity Governance Administrator pour … ; Intune Administrator pour les affectations. » | « Global Reader pour l'inventaire, Groups Administrator pour …, Privileged Role Administrator pour …, Identity Governance Administrator pour …, Intune Administrator pour les affectations. » (énumération, virgules) |
| 4 | 121 | « … **ID Governance → Entitlement management → Access package** ; sans règle équivalente, Microsoft demande… » | « … **ID Governance → Entitlement management → Access package**. Sans règle équivalente, Microsoft demande… » |
| 5 | 127 | « … vérifier aussi le périmètre administratif ; pour un package d'accès, ses attributions. » | « … vérifier aussi le périmètre administratif. Pour un package d'accès, ses attributions. » |
| 6 | 145 | « … dans la limite de 15 000 par tenant ; préférez la conversion, qui garde l'ID. » | « … dans la limite de 15 000 par tenant. Préférez la conversion, qui garde l'ID. » |

## Autres alertes relevées, NON appliquées

Faute de script, ces alertes viennent du contrôle manuel contre `CLAUDE.md`.

1. **Numéros de Message Center dans le corps** (lignes 24 et 25, tableau du calendrier) : `MC1448379` et `MC1488834`. La charte les réserve à la section Source.
2. **Hero image externe** (ligne 7) : `https://sbd.org.uk/images/entra-directory-enumeration.webp`, domaine tiers sans lien évident avec TuneInCloud, avec une espace en fin de ligne. Pour un article neuf (octobre 2026), la charte demande un chemin local `public/images/hero/entra-memberof-groupes-dynamiques.webp`.
3. **Longueurs frontmatter** : titre de 60 caractères, description de 159 caractères. Conformes.
4. **Longueur du corps** : environ 1 609 mots (bloc de code compris), dans la fourchette d'un guide (800-2500).
5. **Tirets cadratins, « nous/notre/nos », « brebes »** : aucun.
6. **Fraîcheur** : l'échéance du 3 novembre 2026 tombe aujourd'hui. Le titre (« avant le 3 novembre ») et l'intro sont écrits au futur et vont dater dès demain. Une mise à jour (`updatedDate`, titre au passé, constat après l'échéance) est à prévoir. Contrôle n°4 du skill hors périmètre de cette passe.

## Ce que je n'ai PAS vérifié

- Les sources (aucune URL résolue dans cette passe, périmètre limité aux points-virgules).
- L'exactitude technique du script PowerShell et des chemins de navigation du portail.
- Les alertes que `scripts/style-check.mjs` aurait pu remonter, puisque le script est absent.

## Décisions pour Daniel

1. Retirer les numéros MC du tableau du calendrier (lignes 24-25) et les garder uniquement dans Source ?
2. Remplacer la hero image externe `sbd.org.uk` par une image locale ?
3. Programmer une mise à jour après l'échéance du 3 novembre (titre, intro, `updatedDate`) ?
4. Ajouter le script `scripts/style-check.mjs` au repo s'il existe ailleurs, ou le faire créer.
