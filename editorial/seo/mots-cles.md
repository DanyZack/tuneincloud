# Carte des mots-clés TuneInCloud

Mémoire SEO du site : un mot-clé principal par page, jamais deux pages sur le
même. Lue par `tic-veille` (choix des sujets), par l'étape SEO 0 de
`/tic-pipeline` (brief) et par `/tic-seo` (cannibalisation, suivi). Mise à jour
par `/tic-pipeline` à la création du brief, par `tic-publieur` à la publication
et par `/tic-seo suivi` avec les données réelles (positions, clics).

Statuts : `publié`, `brouillon`, `planifié` (brief fait), `à créer` (trou de
cluster identifié). Positions et clics : renseignés quand Search Console sera
branchée (`/seo google setup`), sinon `n/d`.

Mots-clés initiaux déduits des titres et du rapport de clustering du
2026-11-15 (`editorial/seo/2026-11-15-audit/findings/cluster.md`), sans
données de volume (recherche web localisée US). À confirmer avec Search
Console.

## Pilier Intune

Hub à créer : « Enrôlement Intune » (dossier `intune`). Les guides `old-*`
deviennent ses rayons.

| Mot-clé principal | Page | Statut | Cluster | Position | Clics 28 j |
|---|---|---|---|---|---|
| enrôlement Intune | hub à créer (dossier intune) | à créer | Enrôlement | n/d | n/d |
| inscription Windows Intune | `/blog/old-windowsenroll/` | publié | Enrôlement Windows | n/d | n/d |
| modes de jonction Entra ID Windows | `/blog/old-modejonctionwindows/` | publié | Enrôlement Windows | n/d | n/d |
| profil Autopilot Entra joined | `/blog/old-enrollautopilotcloud/` | publié | Enrôlement Windows | n/d | n/d |
| Autopilot device preparation | à créer (guide intune) | à créer | Enrôlement Windows | n/d | n/d |
| inscription iOS iPadOS Intune | `/blog/old-ios-entreprise/` | publié | Enrôlement Apple | n/d | n/d |
| Apple Business Manager ADE Intune | `/blog/old-enrollabm/` | publié | Enrôlement Apple | n/d | n/d |
| SSO macOS Linux Intune | `/blog/2026-05-18-sso-linux-macos/` | publié | Enrôlement Apple | n/d | n/d |
| Android Enterprise Intune | `/blog/old-android-entreprise/` | publié | Enrôlement Android | n/d | n/d |
| Samsung Knox Mobile Enrollment Intune | `/blog/old-enrollkme/` | publié | Enrôlement Android | n/d | n/d |
| baseline sécurité Windows 11 Intune | `/blog/2026-10-08-intune-baseline-windows-11-26h2/` | publié | Sécurité et licences | n/d | n/d |
| Intune Suite Microsoft 365 E3 E5 | `/blog/2026-04-16-intunesuite-in-m365/` | publié | Sécurité et licences | n/d | n/d |
| Endpoint Privilege Management Intune | à créer (guide intune) | à créer | Sécurité et licences | n/d | n/d |
| Intune Data Warehouse OData | `/blog/2026-04-27-intune-datawarehouse/` | publié | Sécurité et licences | n/d | n/d |
| Intune Windows Server | `/blog/2026-11-19-intune-gestion-windows-server/` | publié | Sécurité et licences | n/d | n/d |

## Pilier Entra ID

| Mot-clé principal | Page | Statut | Cluster | Position | Clics 28 j |
|---|---|---|---|---|---|
| passkeys Entra ID Windows | `/blog/2026-04-22-windows-entra-passkeys/` | publié | Authentification | n/d | n/d |
| déployer passkeys Entra ID | à créer (guide entra) | à créer | Authentification | n/d | n/d |
| memberOf groupes dynamiques Entra | `/blog/2026-10-12-entra-memberof-groupes-dynamiques/` | publié | Gouvernance | n/d | n/d |
| groupe dynamique Entra ID | à créer (guide entra) | à créer | Gouvernance | n/d | n/d |
| Entra Backup and Recovery | `/blog/2026-04-14-entra-backupandrecovery/` | publié | Résilience | n/d | n/d |
| Entra Agent ID | `/blog/dossier-2026-04-15-entra-agent-id/` | publié | Identités des agents (pont IA) | n/d | n/d |

## Pilier Purview

Hub : `/blog/2026-07-08-dossier-dspm/`.

| Mot-clé principal | Page | Statut | Cluster | Position | Clics 28 j |
|---|---|---|---|---|---|
| Purview DSPM | `/blog/2026-07-08-dossier-dspm/` | publié | DSPM (hub) | n/d | n/d |
| DSPM unifié GA | `/blog/2026-05-05-dspm-unifie/` | publié | DSPM, brève qui doit pointer vers le hub | n/d | n/d |
| DLP réseau Entra Internet Access | `/blog/2026-07-20-purview-entrainternetaccess/` | publié | DLP et IA | n/d | n/d |
| DLP Copilot Purview | à créer (guide purview) | à créer | DLP et IA | n/d | n/d |

## Pilier IA, Copilot et Defender

Hub provisoire : `/blog/dossier-2026-04-15-entra-agent-id/`. Defender n'a pas
encore assez d'articles pour un pilier propre.

| Mot-clé principal | Page | Statut | Cluster | Position | Clics 28 j |
|---|---|---|---|---|---|
| Claude Microsoft 365 Copilot | `/blog/2026-04-29-article-claude-copilot-m365/` | publié | Gouvernance Copilot | n/d | n/d |
| téléverser agents Copilot | `/blog/2026-10-19-copilot-televersement-agents-avances/` | publié | Gouvernance Copilot | n/d | n/d |
| Phishing Triage Agent Defender | `/blog/2026-04-29-article-phishing-triage-agent/` | publié | Agents de sécurité | n/d | n/d |
| Security Copilot Microsoft 365 E5 | à créer (article) | à créer | Agents de sécurité | n/d | n/d |

## Microsoft 365 (transverse)

| Mot-clé principal | Page | Statut | Cluster | Position | Clics 28 j |
|---|---|---|---|---|---|
| faille Outlook NTLM | `/blog/2026-11-16-outlook-faille-ntlm-microsoft-365-apps/` | publié | Sécurité des apps | n/d | n/d |
| panne Microsoft 365 12 novembre | `/blog/2026-11-17-panne-microsoft-365-12-novembre/` | publié | Résilience du service | n/d | n/d |

## Cannibalisations connues

| Mot-clé | Pages en concurrence | Décision |
|---|---|---|
| Purview DSPM | dossier DSPM et brève DSPM unifié | le dossier est la page cible, la brève doit pointer vers lui (à valider par Daniel) |
| inscription ADE Intune | `old-ios-entreprise` et `old-enrollabm` | réduire la partie ADE d'`old-ios-entreprise` à un résumé avec lien (à valider) |
