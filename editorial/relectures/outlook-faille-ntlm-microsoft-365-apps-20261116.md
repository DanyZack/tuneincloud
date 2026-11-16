# Rapport de relecture : Faille Outlook exploitée : le correctif passe par Office

**Fichier** : `src/content/draft/2026-11-16-outlook-faille-ntlm-microsoft-365-apps.md` (brouillon, corrigé en place, sans commit)
**Format** : Brève (`actualites` / `breves`)
**Date de publication prévue** : 2026-11-16 (non modifiée)
**Date de relecture** : 2026-11-16
**Verdict global** : ⚠️ Publiable après corrections (corrections appliquées, deux décisions de Daniel en attente)

## Synthèse

Le fond tient : l'avis MSRC, les builds du 10 novembre, l'échéance CISA et l'unification des canaux sont confirmés tels que la brève les rapporte. Une erreur de licence était bloquante : la brève excluait Defender for Business de la page Weaknesses, alors que Defender for Business inclut la gestion des vulnérabilités de base. Le rapport Discovered apps était aussi décrit de façon trop généreuse (« par appareil »). Le paragraphe d'avis empruntait les atténuations de CVE-2023-23397 sans le dire assez nettement, c'est maintenant explicite. Il reste deux décisions : la source Defender for Business à ajouter, et la bannière.

## Pré-contrôles mécaniques

| Contrôle | Résultat |
|---|---|
| Tiret cadratin `—` | 0 occurrence (avant et après) |
| Point-virgule | 0 |
| Liens internes | `/blog/2026-10-08-intune-baseline-windows-11-26h2/` et `/blog/2026-04-29-article-phishing-triage-agent/` : fichiers présents dans `src/content/blog/` |
| `category` / `subcategory` | `actualites` / `breves` : valeurs autorisées par `src/content.config.ts` |
| `title` | 56 caractères (cible 55-60) |
| `description` | 160 caractères (cible 140-160) |
| `heroImage` | `""` (chaîne vide, accepté par Zod, à remplir par l'illustrateur) |
| Mots hors Source | 486 avant, 498 après selon `style-check` (500 avec `wc -w`, qui compte les puces). Fourchette brève : 250-500 |
| « brebes » | absent |
| `node scripts/style-check.mjs` | aucune alerte, avant et après |

## 1. Sources

| URL | État | Vérification | Commentaire |
|---|---|---|---|
| `msrc.microsoft.com/update-guide/vulnerability/CVE-2026-124194` | ✅ OK (lu via `api.msrc.microsoft.com/sug/v2.0`) | 2026-11-16 | Une seule révision (v1, 10/11/2026, « Information published »). Moderate, Spoofing, CVSS 3.1 6,5 (temporel 6,2), Exploited: Yes, Publicly disclosed: No, CWE-356. FAQ : fichier piégé ouvert dans Outlook, connexion sans avertissement de contenu externe, fuite du hachage NTLMv2, volet de lecture non vecteur. Aucune section Mitigations ni Workarounds. Produits : M365 Apps for Enterprise (32/64), Office LTSC 2024 (16.0.17932.21140), Office LTSC 2021 (16.0.14334.21048). Office 2019 absent. |
| `learn.microsoft.com/en-us/officeupdates/microsoft365-apps-security-updates` | ✅ OK | 2026-11-16 | Mise à jour le 10/11/2026. CVE-2026-124194 listée. Builds de la brève exacts : CC 2610 (20527.20196), MEC 2610/2609/2608 (20527.20194, 20430.20264, 20326.20320), SAEC « receives Monthly Enterprise Channel builds » 2610/2609/2608 (20527.20192, 20430.20262, 20326.20318), LTSC 2024 17932.21140, LTSC 2021 14334.21048. Pas de 2508. |
| `learn.microsoft.com/en-us/microsoft-365-apps/updates/unified-update-channels` | ✅ OK | 2026-11-16 | Unification à partir de la version 2606 (juillet 2026), MC1274325. Version 2508 « supported through September 8, 2026 ». Décalage mineur et volontaire des numéros de build. |
| `cisa.gov/known-exploited-vulnerabilities-catalog` | ✅ OK | 2026-11-16 | Ajout le 2026-11-10, échéance 2026-11-24. |
| `learn.microsoft.com/en-us/defender-vulnerability-management/tvm-weaknesses` | ✅ OK | 2026-11-16 | Existants : **Weaknesses** sous Vulnerability management. Preview (Defender XDR + Defender for Identity) : **Exposure management > Vulnerability management > Vulnerabilities**. Liste des appareils exposés par CVE. Correction reflétée « typically within 24–48 hours ». |
| `learn.microsoft.com/en-us/defender-vulnerability-management/defender-vulnerability-management-capabilities` | ⚠️ OK mais trompeuse | 2026-11-16 | La note « Defender Vulnerability Management isn't currently available to Microsoft Defender for Business customers » vise l'offre DVM (add-on, Standalone), pas la gestion des vulnérabilités de base. C'est elle qui a induit l'erreur de licence (correction n°1). La page confirme que les clients Defender for Endpoint P1 et Microsoft 365 E3 doivent passer par Standalone. |
| `learn.microsoft.com/en-us/intune/app-management/discovered-apps` | ✅ OK, structure canonique | 2026-11-16 | Chemin **Apps > Monitor > Discovered apps** exact, export CSV. Le rapport agrégé donne nom, version et **nombre** d'appareils, pas la version par appareil (correction n°2). Win32 : appareils d'entreprise seulement, toutes les 24 h, via l'IME. |
| `msrc.microsoft.com/update-guide/vulnerability/CVE-2023-23397` | ✅ OK (lu via l'API) | 2026-11-16 | Atténuations : groupe Protected Users, blocage TCP 445/SMB sortant (pare-feu périmétrique, pare-feu local, VPN). La stratégie Restrict NTLM n'y figure pas (elle est sourcée par la ligne suivante, ce que le texte corrigé respecte). |
| `learn.microsoft.com/en-us/previous-versions/.../network-security-restrict-ntlm-outgoing-ntlm-traffic-to-remote-servers` | ⚠️ OK, page archivée | 2026-11-16 | Page « previous-versions », marquée archivée, s'applique à Windows 10 et 11. Contenu confirmé : Audit all journalise chaque requête, Deny all peut casser des applications, liste d'exceptions via « Add remote server exceptions for NTLM authentication », journal **Applications and Services Log\Microsoft\Windows\NTLM**. Acceptable faute de page courante, à signaler. |

Source manquante (non ajoutée, voir décisions) : `learn.microsoft.com/en-us/defender-business/mdb-overview` (tableau de comparaison, ligne « Vulnerability management (core capabilities) » cochée pour Defender for Business et Defender for Endpoint Plan 2, pas pour Plan 1, page mise à jour le 2026-10-01).

## 2. Exactitude technique

Points transmis par le rédacteur :

1. **Révision de l'avis MSRC** : aucune. Une seule révision, datée du 10/11. Sévérité, produits et absence d'atténuation inchangés.
2. **Chemin du portail Defender** : les deux libellés existent selon que le tenant est inscrit ou non à la preview Defender XDR + Defender for Identity. Texte précisé (correction n°3).
3. **Licence** : faux tel qu'écrit. Defender for Business inclut la gestion des vulnérabilités de base, donc la page Weaknesses. Ce qui n'est pas disponible pour Defender for Business, c'est l'offre Defender Vulnerability Management (premium). C'est Defender for Endpoint Plan 1 (et donc Microsoft 365 E3) qui ne donne pas accès à la page (correction n°1).
4. **TCP 445 / Restrict NTLM** : défendable. CVE-2023-23397 relève du même mécanisme (Outlook se connecte à un emplacement de l'attaquant et livre le hachage NTLMv2), et le blocage du 445 sortant y était l'atténuation officielle. La brève ne le disait pas assez clairement (« comme Microsoft le recommandait ») : le texte dit maintenant qu'il n'existe pas d'atténuation officielle pour la nouvelle CVE et que celle de 2023 est empruntée (correction n°4). Limite à connaître, non ajoutée au texte : le blocage du 445 ne couvre que SMB. Si l'emplacement distant est joint en WebDAV sur HTTP, il ne suffit pas. L'avis de 2026 ne précise pas le protocole. « Audit all » ne protège pas, il prépare un « Deny all » : précisé.
5. **CISA KEV** : ajout le 10/11, échéance le 24/11, confirmés.

Autres vérifications :

- **Builds du 10/11** : tous exacts (voir tableau).
- **Semi-Annual Enterprise Channel** : la brève disait « les builds du canal mensuel ». Microsoft dit que le SAEC reçoit les versions et le contenu du Monthly Enterprise Channel, avec un numéro de build décalé. Le décalage constaté est de deux unités sur les trois versions. « N'est plus prise en charge depuis le 8 septembre » : la page dit « supported through September 8, 2026 », la formulation « hors support depuis le 8 septembre 2026 » est retenue (écart d'un jour sans portée pratique).
- **Discovered apps** : le rapport agrégé ne donne pas la version « par appareil » (correction n°2).
- **Office 2019** : a reçu un build le 10/11 (10417.20236) mais n'est pas listé pour cette CVE. La brève a raison de ne pas le citer.
- **Phishing Triage Agent** : l'article lié confirme que l'agent ne traite que les messages signalés par les utilisateurs. La phrase reste exacte.

## 3. Style et ton

- Zéro tiret cadratin, zéro point-virgule, zéro alerte `style-check`, avant comme après.
- Dernière phrase « Le build Office reste la seule correction. » : maxime de fin, troisième répétition de l'idée du chapeau et de la description. Remplacée par un fait daté (correction n°6).
- Un seul ⚠️, un « je » placé dans l'avis, aucun « nous » : conforme.
- Gras : uniquement des libellés de console, deux par paragraphe au plus dans la section Defender : conforme.
- « Le correctif n'est pas dans le cumulatif Windows. Il est dans le build Office. » : forme « ce n'est pas X, c'est Y », une seule occurrence, tolérée par la charte, conservée.
- Longueur : les corrections de fond ajoutaient une cinquantaine de mots. Le texte a été resserré pour rester sous 500 mots (corrections n°5 et n°7).

## 4. Évolutions depuis la publication

Sans objet : brouillon daté du jour (pubDate 2026-11-16).

## Corrections appliquées

### Correction N°1 : Technique (licence)

**Avant** :
> Il faut Defender for Endpoint Plan 2 ou Defender Vulnerability Management Standalone, pas Defender for Business. Une mise à jour y apparaît sous 24 à 48 heures.

**Après** :
> La page exige Defender for Endpoint Plan 2, Defender for Business ou Defender Vulnerability Management Standalone, et non le Plan 1. Un poste corrigé en sort sous 24 à 48 heures.

**Raison** : la page `mdb-overview` coche « Vulnerability management (core capabilities) » pour Defender for Business et Plan 2, pas pour Plan 1. La note de la page capabilities vise l'offre DVM, pas la fonction de base. Le délai de 24 à 48 h porte sur la disparition d'un poste corrigé (« typically »), pas sur l'apparition d'une mise à jour.

### Correction N°2 : Technique (Intune)

**Avant** :
> Sans cette licence, **Apps > Monitor > Discovered apps** dans Intune donne la version de Microsoft 365 Apps par appareil, exportable en CSV. Le rapport ne couvre que les appareils d'entreprise et se rafraîchit toutes les 24 heures.

**Après** :
> Sans ces licences, **Apps > Monitor > Discovered apps** dans Intune donne chaque version de Microsoft 365 Apps et son nombre d'appareils, exportable en CSV. Sur Windows, l'inventaire ne couvre que les appareils d'entreprise et se rafraîchit toutes les 24 heures.

**Raison** : le rapport agrégé liste nom, version, nombre d'appareils et éditeur. La règle « appareils d'entreprise, 24 heures » ne vaut que pour les applications Win32 sous Windows (les autres plateformes sont à sept jours).

### Correction N°3 : Technique (navigation Defender)

**Avant** :
> Dans le portail Defender, la page **Weaknesses** de Vulnerability management (Vulnerabilities pour les tenants en preview) cherche la CVE par son identifiant et liste les appareils exposés.

**Après** :
> Dans le portail Defender, **Vulnerability management > Weaknesses** (**Vulnerabilities** sous Exposure management pour les tenants en preview) liste les appareils exposés à chaque CVE.

**Raison** : libellés exacts de `tvm-weaknesses`, et une page ne « cherche » pas.

### Correction N°4 : Technique (atténuation empruntée)

**Avant** :
> En attendant le dernier poste, je bloque le port TCP 445 sortant au pare-feu et dans le VPN, comme Microsoft le recommandait en 2023 pour CVE-2023-23397. Je passe aussi la stratégie « Network security: Restrict NTLM: Outgoing NTLM traffic to remote servers » en « Audit all ».

**Après** :
> Faute d'atténuation officielle, j'emprunte celle que Microsoft publiait en 2023 pour CVE-2023-23397, faille Outlook qui livrait déjà le hachage NTLMv2. En attendant le dernier poste, je bloque le port TCP 445 sortant au pare-feu et dans le VPN. Je passe la stratégie « Network security: Restrict NTLM: Outgoing NTLM traffic to remote servers » en « Audit all », qui journalise sans bloquer.

**Raison** : le lecteur doit savoir que la mesure ne vient pas de l'avis de 2026. « Audit all » n'est pas une protection (page de la stratégie).

### Correction N°5 : Technique et style (SAEC)

**Avant** :
> Le Semi-Annual Enterprise Channel reçoit depuis la version 2606 de juillet 2026 les builds du canal mensuel, avec un numéro légèrement décalé (20527.20192, 20430.20262, 20326.20318). La version 2508, conservée par ceux qui retardaient l'unification, n'est plus prise en charge depuis le 8 septembre 2026. Elle n'a pas de build de novembre.

**Après** :
> Depuis la version 2606 de juillet 2026, le Semi-Annual Enterprise Channel reçoit les versions du Monthly Enterprise Channel, avec un build décalé de deux unités (20527.20192, 20430.20262, 20326.20318). La version 2508, hors support depuis le 8 septembre 2026, n'a pas de build de novembre.

**Raison** : nom exact du canal (« canal mensuel » est ambigu avec Current Channel), décalage chiffré plutôt qu'adjectif, phrase resserrée pour la limite de 500 mots.

### Correction N°6 : Style (chute)

**Avant** :
> Le build Office reste la seule correction.

**Après** :
> La faille ne se ferme qu'avec le build Office du 10 novembre.

**Raison** : maxime de fin remplacée par une fin sur une date (charte, section 3).

### Correction N°7 : Style et technique (resserrement)

- « le journal Microsoft\Windows\NTLM » devient « le journal Applications and Services Logs\Microsoft\Windows\NTLM » (chemin complet de la page Microsoft).
- « Le hachage récupéré sert ensuite à s'authentifier sous l'identité de la victime. » devient « Le hachage sert ensuite à s'authentifier comme la victime. »
- « le hachage NTLMv2 de l'utilisateur à un serveur » devient « le hachage NTLMv2 à un serveur ».
- « ne propose aucune mesure d'atténuation » devient « ne propose aucune atténuation ».

**Raison** : exactitude du chemin et respect de la fourchette de 500 mots.

Frontmatter : **aucune modification** (title, description, pubDate, category, subcategory, heroImage intacts).

## Bannière `breve-outlook1.png`

Le fichier n'existe pas dans `public/images/banarticle/`, et `editorial/assets/icons/` ne contient pas d'icône Outlook (seulement Copilot, Intune, Defender, Entra, Purview). Une série « outlook » risque de rester à un seul exemplaire. Mon avis : une série `breve-office1` (ou `breve-m365apps1`) servirait aussi aux prochaines CVE Office et aux changements de canal. Il faut une icône Office ou Outlook dans les assets, qui viendrait du OneDrive `Tune in Cloud\Icons`. À défaut, `breve-defender1` correspond à l'angle « trouver les postes vulnérables », mais pas au sujet principal. Le lien est laissé tel quel dans le brouillon en attendant la décision.

## Ce que je n'ai pas pu vérifier

- Si Defender Vulnerability Management détecte effectivement CVE-2026-124194 sur les postes (couverture réelle de la CVE dans le portail). Seul un tenant peut le montrer.
- Le protocole utilisé par l'exploitation (SMB ou WebDAV). L'avis ne le dit pas, donc l'efficacité du blocage du 445 n'est pas garantie.
- L'identité des attaquants et l'ampleur de l'exploitation : aucune source Microsoft ne les donne.
- La page MSRC rendue en HTML (lecture faite via l'API officielle `api.msrc.microsoft.com`, qui alimente la page).
- La version française des pages Learn (sources laissées en `/en-us/`, libellés de console en anglais).

## Décisions qui reviennent à Daniel

1. **Ajouter la source** `https://learn.microsoft.com/en-us/defender-business/mdb-overview` en section Source pour appuyer « Defender for Business » (je ne l'ai pas ajoutée, le rédacteur en chef n'enrichit pas). Sans elle, la seule source de licence citée semble dire le contraire.
2. **Bannière** : garder `breve-outlook1` (et fournir une icône Outlook) ou ouvrir une série plus large (`breve-office1`).
3. **Limite WebDAV** du blocage TCP 445 : la mentionner ou non. C'est un ajout de fond, que je n'ai pas fait.
