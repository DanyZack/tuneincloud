# Liens entrants : intune-gestion-windows-server

Date : 2026-11-18. Cible : `/blog/{{ID}}/` (le publieur remplace `{{ID}}` par
l'identifiant définitif, date comprise). Trois liens, chacun ajouté en fin de
ligne existante, sans nouveau paragraphe. Faits repris du brouillon
`src/content/draft/2026-11-18-intune-gestion-windows-server.md` (préversion
Insider, modèles de baseline absents, licence de la GA inconnue, inscription par
jonction Entra ou jonction hybride).

À appliquer après publication, en commit `seo: linking`, après OK de Daniel.

## Lien 1 (obligatoire)

- Fichier source : `src/content/blog/2026-10-08-intune-baseline-windows-11-26h2.md`
- Ligne : 30 (paragraphe « Prérequis »)
- Ancre : « gérer Windows Server avec Intune »
- Ajout (15 mots) : la baseline ne vise que Windows 11, et la préversion serveur
  n'offre aucun modèle de baseline. Le lecteur qui l'applique à ses PAW ou jump
  boxes y trouve la réponse.

Texte avant :

```markdown
**Prérequis** : licence Intune Plan 1 (incluse dans Microsoft 365 E3 et E5, dont le périmètre Intune s'élargit [depuis juillet 2026](/blog/2026-04-16-intunesuite-in-m365/)). Rôle minimal : Policy and Profile Manager. Windows 11 26H2 est en disponibilité générale depuis le 29 septembre 2026 (build 26300.9550). Pour cette baseline, Microsoft indique seulement « Applies to: Windows 11 », sans version minimale : testez-la sur vos appareils [inscrits dans Intune](/blog/old-windowsenroll/) encore en 24H2 ou 25H2 avant de généraliser.
```

Texte après :

```markdown
**Prérequis** : licence Intune Plan 1 (incluse dans Microsoft 365 E3 et E5, dont le périmètre Intune s'élargit [depuis juillet 2026](/blog/2026-04-16-intunesuite-in-m365/)). Rôle minimal : Policy and Profile Manager. Windows 11 26H2 est en disponibilité générale depuis le 29 septembre 2026 (build 26300.9550). Pour cette baseline, Microsoft indique seulement « Applies to: Windows 11 », sans version minimale : testez-la sur vos appareils [inscrits dans Intune](/blog/old-windowsenroll/) encore en 24H2 ou 25H2 avant de généraliser. Pour [gérer Windows Server avec Intune](/blog/{{ID}}/), en préversion, aucun modèle de baseline n'est encore proposé.
```

## Lien 2 (obligatoire)

- Fichier source : `src/content/blog/2026-04-16-IntuneSuite-in-M365.md`
- Ligne : 33 (premier point d'attention, sur la licence)
- Ancre : « gestion de Windows Server par Intune »
- Ajout (16 mots) : le point d'attention traite déjà de licence et de
  facturation. Le lecteur E3/E5 se demandera si les serveurs entrent dans ses
  droits, question que le nouvel article traite dans sa dernière section.

Texte avant :

```markdown
- ⚠️ Si votre organisation a souscrit l'Intune Suite en standalone, ce add-on reste disponible à l'achat pour les tenants hors M365 E3/E5. Pour les tenants E3/E5, vérifiez à votre prochaine facturation si la ligne add-on est encore présente après août 2026.
```

Texte après :

```markdown
- ⚠️ Si votre organisation a souscrit l'Intune Suite en standalone, ce add-on reste disponible à l'achat pour les tenants hors M365 E3/E5. Pour les tenants E3/E5, vérifiez à votre prochaine facturation si la ligne add-on est encore présente après août 2026. La [gestion de Windows Server par Intune](/blog/{{ID}}/), en préversion depuis novembre 2026, attend encore sa licence définitive.
```

## Lien 3 (recommandé)

- Fichier source : `src/content/blog/old-modejonctionwindows.md`
- Ligne : 20 (paragraphe d'introduction sur les jonctions et l'accès conditionnel)
- Ancre : « Intune pour Windows Server »
- Ajout (20 mots) : le guide prérequis de la préversion exige une jonction Entra
  ou une jonction hybride. Le lien prolonge le guide sans laisser croire qu'un
  serveur s'inscrit en mode « registered » (seuls les deux modes de jonction
  sont cités).

Texte avant :

```markdown
Ces 3 modes de jonction Azure AD représentent un maillon essentiel dans la mise en place des Accès conditionnels qui pourront se baser sur ces informations afin de contrôler l'accès aux données de l'entreprise.
```

Texte après :

```markdown
Ces 3 modes de jonction Azure AD représentent un maillon essentiel dans la mise en place des Accès conditionnels qui pourront se baser sur ces informations afin de contrôler l'accès aux données de l'entreprise. La jonction Entra et la jonction hybride servent aussi, en préversion, à inscrire un serveur dans [Intune pour Windows Server](/blog/{{ID}}/).
```

## Contrôles

- Aucun tiret cadratin, aucun point-virgule, aucun « nous » dans les ajouts.
- Aucun nouveau paragraphe ni nouvelle puce : chaque ajout prolonge une ligne existante.
- Non retenu : `2026-11-16-outlook-faille-ntlm-microsoft-365-apps` (ne traite pas
  des mises à jour serveur, lien forcé).
- Après remplacement de `{{ID}}`, vérifier que `src/content/blog/<id>.md` existe
  et lancer `npm run build`.
