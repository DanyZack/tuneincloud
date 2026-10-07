# Rapport de relecture — Intune : baseline de sécurité Windows 11 26H2 disponible

**Fichier** : `src/content/draft/2026-10-07-intune-baseline-windows-11-26h2.md`
**Format** : Brève (short)
**Date de publication prévue** : 2026-10-07
**Date de relecture** : 2026-10-07
**Mode** : brouillon (corrections en place, aucune opération git)
**Verdict global** : ⚠️ Publiable après corrections (corrections appliquées ; deux décisions restent à prendre avant publication, voir « Points pour Daniel »)

## Synthèse

Le fond est solide : les deux changements de la baseline, l'absence de NetBIOS, la procédure de mise à niveau et les prérequis correspondent mot pour mot à ce que disent aujourd'hui le billet Security Baselines du 29 septembre 2026, le What's new Intune (semaine du 5 octobre 2026) et la page Learn « Configure security baseline policies ». Deux affirmations dépassaient les sources et ont été recadrées : le comportement d'un réglage sorti de la baseline (Microsoft écrit « might not revert », pas « conserve sa dernière valeur ») et l'application de la baseline aux appareils 24H2/25H2 (Microsoft indique seulement « Applies to: Windows 11 »). Reste à trancher la date du 6 octobre, exacte mais non couverte par les sources listées, et la bannière `breve-intune4.png` qui n'existe pas encore.

## Pré-contrôles mécaniques

| Contrôle | Résultat |
|---|---|
| Tirets cadratins en milieu de phrase | 0 occurrence |
| Faute « brebes » | aucune |
| Liens internes | `/blog/2026-04-16-intunesuite-in-m365/` → `2026-04-16-IntuneSuite-in-M365.md` OK (minuscules gérées par le loader) ; `/blog/old-windowsenroll/` → `old-windowsenroll.md` OK |
| Frontmatter | `category: actualites` et `subcategory: breves` valides (Zod) ; `title` 58 caractères (cible 55-60) ; `description` 160 caractères (borne haute de 140-160) |
| Nombre de mots du corps | 513 avant correction, 536 après (fourchette brève : 250-500). Dépassement de 7 %, voir Points pour Daniel |
| Bannière | `/images/banarticle/breve-intune4.png` : **fichier absent**. Seules `breve-intune1..3.png` existent |
| `heroImage` | vide (`""`), à fournir par l'illustrateur avant publication |

## 1. Sources

| URL | État | Vérifié le | Commentaire |
|---|---|---|---|
| `learn.microsoft.com/en-us/intune/intune-service/fundamentals/whats-new` | ✅ OK | 2026-10-07 | Entrée « Intune security baseline for Windows 11, version 26H2 » sous « Week of October 5, 2026 », rubrique Device security. Mention NetBIOS (Insider builds, ajout futur après disponibilité dans le catalogue de paramètres). « Applies to: Windows 11 ». Page `ms.date` 2026-10-05 |
| `techcommunity.microsoft.com/blog/microsoft-security-baselines/windows-11-version-26h2-security-baseline/4560382` | ✅ OK | 2026-10-07 | Lu via le navigateur intégré (WebFetch ne rend que le titre). Billet Rick Munck, 29 sept. 2026. « This release includes several changes… » puis tableau de deux lignes (Printers ranking Enabled ; IE Turn off encryption support TLS 1.1+1.2 → TLS 1.2+1.3). Détail USB / multicast / IPP / V3-V4 / TCP-IP conforme à l'article |
| `learn.microsoft.com/en-us/intune/device-security/security-baselines/configure-baselines` | ✅ OK | 2026-10-07 | `updated_at` 2026-08-27. Intune Plan 1, rôle Policy and Profile Manager (moins privilégié), profils existants en lecture seule (nom, description, affectations modifiables), Update Version, deux options, copie côte à côte sans scope tags ni affectations. Section « Remove a security baseline assignment » : « might not revert… each CSP can handle the change removal differently » |

Pages consultées en appui (non citées dans l'article) :

- `learn.microsoft.com/en-us/intune/device-security/security-baselines/ref-windows-mdm-settings?pivots=mdm-26h2` : « Security Baseline for Windows, version 26H2 », Printers ranking = Enabled, Turn off encryption support = Enabled / « Use TLS 1.2 and TLS 1.3 », pas de Configure NetBIOS settings. Confirme le contenu.
- `techcommunity.microsoft.com/blog/IntuneCustomerSuccess/microsoft-intune-settings-catalog-updated-to-support-windows-11-version-26h2/4560815` : billet Intune Support Team du 29 sept., mis à jour le 6 oct. 2026 : « 10.06.26 Update: The Windows security baseline for Windows 11, version 26H2 is now available for all customers in Microsoft Intune ». C'est la seule source Microsoft qui date la disponibilité au 6 octobre.
- `learn.microsoft.com/en-us/windows/release-health/windows11-release-information` : 26H2 GA Channel, disponibilité 2026-09-29, build 26300.9550 (KB5124010, 2026-09 D) et 26300.9457 à la même date. La build citée est exacte.

## 2. Exactitude technique

Vérifié conforme aux sources : nom du billet et date (29 septembre 2026), deux changements et leurs valeurs, mécanique Windows Ready Print (USB, multicast, IPP, pilote V3/V4, TCP/IP exclu), NetBIOS absent et raison, lecture seule des anciens profils, chemin de menu, option Update Version, deux modes de mise à niveau, nouveau profil sans affectations ni scope tags, licence Intune Plan 1, rôle Policy and Profile Manager, date GA et build 26H2, lien interne « depuis juillet 2026 » cohérent avec l'article IntuneSuite (1er juillet 2026).

Écarts corrigés :

1. **Réglage sorti de la baseline** : formulation absolue (« conserve sa dernière valeur ») alors que la page Learn, pour les baselines au format post-mai 2023, écrit « might not revert to a premanaged configuration depending on the settings… each CSP can handle the change removal differently ». La formulation absolue vient de la section consacrée aux anciens formats (avant mai 2023). Corrigé (Correction n°1).
2. **Application aux appareils 24H2/25H2** : aucune source ne l'affirme. Le What's new indique « Applies to: Windows 11 » sans version minimale ; la page Learn dit que la fonctionnalité baselines vise Windows 11 et Windows 10 1809+. Reformulé en recommandation de test, sans affirmer ni nier (Correction n°2).

Signalements du rédacteur traités sans modification :

- « plusieurs changements » / tableau de deux lignes : exact, le billet dit « several changes » et liste deux lignes. L'ironie est factuelle et ciblée, conservée.
- « sujet récurrent depuis PrintNightmare » : non mentionné dans le billet Microsoft. Fait historique (CVE-2021-34527, juillet 2021) relevant de la culture générale du lectorat, pas d'une affirmation datée nouvelle. Conservé, à la discrétion de Daniel.
- Bullet ⚠️ sur les fonctions OEM non garanties avec le pilote de classe IPP : déduction d'expert, formulée au conditionnel prudent (« ne sont pas garanties »). Aucune source Microsoft dans l'article ne la documente. Conservée comme conseil opérationnel, à la discrétion de Daniel.
- Date « 6 octobre 2026 » : exacte (mise à jour du 6 octobre du billet Intune Support Team), mais aucune des trois sources listées ne la porte ; le What's new dit « semaine du 5 octobre ». Non modifiée, voir Points pour Daniel.

## 3. Style et ton

Aucun tiret cadratin. Pas de jargon marketing. Vouvoiement constant. Ironie limitée à deux touches (« plusieurs changements », « TLS 1.1 sort enfin ») sur une formulation Microsoft, dans les cas autorisés. Terminologie cohérente (baseline, profil, réglage). Rien à corriger.

Observation : la section finale est intitulée « ## Source » avec trois entrées ; les deux graphies (« Source » 7 articles, « Sources » 4 articles) coexistent dans le blog, pas de correction imposée.

## 4. Évolutions techniques depuis la publication

Sans objet : brouillon daté du jour.

## Corrections appliquées

### Correction n°1 — Technique

**Avant** :
> 💡 Un réglage qui sort du périmètre d'une baseline n'est pas remis à zéro sur l'appareil : il conserve sa dernière valeur jusqu'à ce qu'une autre stratégie le reprenne.

**Après** :
> 💡 Un réglage qui sort du périmètre d'une baseline n'est pas forcément remis à zéro sur l'appareil : selon le CSP concerné, il peut conserver sa dernière valeur jusqu'à ce qu'une autre stratégie le reprenne.

**Raison** : la page Learn « Configure security baseline policies » (section Remove a security baseline assignment) écrit « might not revert… each CSP can handle the change removal differently ». L'affirmation absolue n'est valable que pour les baselines d'ancien format.

### Correction n°2 — Technique / Source

**Avant** :
> Windows 11 26H2 est en disponibilité générale depuis le 29 septembre 2026 (build 26300.9550), mais la baseline s'applique aussi aux appareils [inscrits dans Intune](/blog/old-windowsenroll/) en 24H2 ou 25H2.

**Après** :
> Windows 11 26H2 est en disponibilité générale depuis le 29 septembre 2026 (build 26300.9550). Pour cette baseline, Microsoft indique seulement « Applies to: Windows 11 », sans version minimale : testez-la sur vos appareils [inscrits dans Intune](/blog/old-windowsenroll/) encore en 24H2 ou 25H2 avant de généraliser.

**Raison** : aucune source Microsoft ne confirme l'application aux appareils 24H2/25H2. La reformulation s'en tient à ce que dit le What's new et transforme l'affirmation en recommandation de test. Le lien interne est conservé.

Aucune modification du frontmatter.

## Ce que je n'ai PAS pu vérifier

- Le comportement réel de la baseline 26H2 sur un appareil 24H2 ou 25H2 (le réglage Printers ranking a-t-il un effet sur ces versions ?) : non documenté par Microsoft à ce jour.
- Les limitations fonctionnelles du pilote de classe IPP par rapport aux pilotes OEM (bacs, finition, comptabilisation) : affirmation d'expert, pas de page Microsoft consultée pour la confirmer dans le cadre de cette relecture.
- Le texte du Message Center (MC) correspondant à l'annonce Intune, non consulté.

## Points pour Daniel

1. **Date du 6 octobre 2026** (introduction et `description`). Elle est exacte mais sourcée uniquement par la mise à jour du 6 octobre du billet Intune Support Team (`.../IntuneCustomerSuccess/microsoft-intune-settings-catalog-updated-to-support-windows-11-version-26h2/4560815`), absent de la section Source. Deux options : ajouter ce billet comme quatrième source (je ne l'ai pas fait, le rédacteur en chef n'ajoute pas de sources), ou remplacer par « depuis la semaine du 5 octobre 2026 » pour coller au What's new.
2. **Bannière** `/images/banarticle/breve-intune4.png` inexistante : à produire par l'illustrateur ou à remplacer par `breve-intune1..3.png` avant publication. `heroImage` est vide.
3. **Longueur** : 536 mots pour une fourchette de 250-500. Si vous voulez repasser sous 500, le troisième bullet des Points d'attention (Security Compliance Toolkit) ou la phrase « Microsoft annonce « plusieurs changements » ; le tableau en compte deux. » sont les candidats les plus détachables, sans perte factuelle.
4. **PrintNightmare** et **bullet ⚠️ pilote IPP** : conservés comme apport d'expertise non sourcé dans le billet Microsoft. À retirer si vous préférez une brève strictement adossée aux sources.
