# Citabilité IA (GEO) : microsoft-perception-agents-securite

Date : 2026-11-23. Objet : brouillon `src/content/draft/2026-11-23-microsoft-perception-agents-securite.md`
(non publié, analyse sur le fichier). Mot-clé principal : **Microsoft Perception**.
DataForSEO non branché : aucune mesure de visibilité réelle, appréciation qualitative.

Contrainte appliquée : règle maison « Sources et dates sans lourdeur » (2026-11-19).
Aucune réécriture ci-dessous n'ajoute de « selon », « d'après » ou de date de
publication dans une phrase. Le levier utilisé : sujet explicite + fait exact.

## Appréciation globale

**Score de citabilité estimé : 78/100.** Brouillon déjà solide pour les moteurs IA.

Points forts :
- Intro de 103 mots qui répond à la question « qu'est-ce que c'est, qu'est-ce qui est GA, combien » : GA mi-novembre à Ignite, ancien nom Project Perception, trois équipes, six agents GA, facturation au résultat séparée de Security Copilot, E5 non documenté.
- Tableau des agents complet (9 lignes, 4 colonnes, statut par agent). C'est le passage le plus extractible de l'article, et il n'existe pas ailleurs en français.
- Chiffres exacts et vérifiables : 14 jours d'historique, 80 % des alertes, 8 millions d'alertes, 24 heures de décalage, 1 ou 3 ans d'AI Flex Plan.
- Entités nommées exactes : noms d'agents en anglais tels que Learn, permissions URBAC entre guillemets (« Execute hard actions », « Approve hard actions »), rôles Entra (Security Administrator, Security Reader), licences (Defender for Office 365 P2, Entra ID P2, Defender for Identity, Defender for Cloud Apps).
- Deux H2 en question (licence, par quel agent commencer), et le décalage GA / Learn dit une seule fois.
- 1 400 mots hors Sources, dans la cible du brief.

Faiblesses :
1. **Microsoft Sentinel n'apparaît nulle part dans le corps**, alors que la description promet « agents Defender et Sentinel » et que le brief en fait une entité attendue. Un moteur IA qui répond à « agents Sentinel » ne trouvera aucun passage à citer.
2. Plusieurs phrases clés commencent par un renvoi (« les quatre agents bleus », « l'agent », « la note de bas de page », « Perception ne touche à rien », « les deux », « L'étape 3 ») : elles perdent leur sens une fois extraites.
3. Une puce sans verbe (niveau « Action ») sur le fait le plus important de l'article.
4. La première phrase du H2 licence ne répond pas nettement à la question posée par le titre, et « les deux » est ambigu après trois modes cités.
5. Images : hero vide, bannière seule, pas de texte alternatif utile (le format article n'a pas de schéma, c'est conforme). Hors citabilité stricte, à traiter par l'illustrateur.

## Scores par dimension (estimation)

| Dimension | Poids | Score | Commentaire |
|---|---|---|---|
| Citabilité | 25 % | 76 | Faits exacts, mais 6 phrases clés anaphoriques |
| Lisibilité structurelle | 20 % | 85 | Tableau, puces, 2 H2 en question sur 7 |
| Multimodal | 15 % | 55 | Hero absent, pas de visuel informatif (normal pour un article) |
| Autorité et marque | 20 % | 85 | 12 sources Microsoft + 1 tierce, avis signé, liens internes |
| Accessibilité technique | 20 % | 90 | Astro SSR, robots.txt et llms.txt déjà en place (non revérifiés ici) |
| **Total pondéré** | | **≈ 79** | |

## Cinq réécritures prioritaires

### 1. Intro : nommer Sentinel et donner un sujet à chaque fait

Avant :
> La facturation se fait au résultat, à part de Security Copilot, et aucune inclusion dans Microsoft 365 E5 n'est documentée. Le Triage Agent, lui, clôt déjà seul les faux positifs.

Après :
> Microsoft Perception est facturé au résultat, à part de Security Copilot, et aucune inclusion dans Microsoft 365 E5 n'est documentée. En mode automatique, le Triage Agent clôt seul les faux positifs.

Et, **seulement si le billet ou Learn le confirme** (le brief l'affirme, le corps ne le dit pas) :
> ... la plateforme fait travailler des agents de sécurité dans le portail Microsoft Defender, sur les données de Defender XDR et de Microsoft Sentinel, en trois équipes ...

Sinon, retirer « et Sentinel » de la description pour ne pas promettre ce que le corps ne traite pas.

### 2. H2 statuts : liste nominative des six agents GA

Avant :
> Le Recon Agent, les quatre agents bleus et le Posture Prioritization Agent sont en GA. Le Risk Reduction Agent est en Public Preview.

Après :
> Six agents de Microsoft Perception sont en GA : le Recon Agent, le Triage Agent, l'Attack Investigation Agent, le Detection Authoring Agent, le Threat Intelligence Agent et le Posture Prioritization Agent. Le Risk Reduction Agent est en Public Preview.

Option, **changement de structure, à valider par Daniel** : passer le H2 en question, comme le prévoyait le brief : « Quels agents de Microsoft Perception sont en GA ? ».

### 3. Niveau « Action » : une phrase complète par agent

Avant :
> - **Action.** Le Triage Agent en déclenchement automatique, et le Risk Reduction Agent après approbation.

Après :
> - **Action.** Le Triage Agent en déclenchement automatique résout seul les faux positifs. Le Risk Reduction Agent exécute un plan de correction (patch Intune, shielding), mais seulement après approbation.

### 4. Chiffre des 80 % : sujet explicite, plus de « note de bas de page »

Avant :
> Microsoft annonce que l'agent couvre environ 80 % des alertes d'une file Defender type. La note de bas de page parle d'une moyenne sur 8 millions d'alertes, sans taux garanti pour un client.

Après :
> Microsoft annonce que le Triage Agent couvre environ 80 % des alertes d'une file Defender type. Ce chiffre est une moyenne calculée sur 8 millions d'alertes, sans taux garanti pour un client.

(« Microsoft annonce » est conservé, pas ajouté : c'est une revendication d'éditeur, l'attribution porte le sens. La référence au support, « la note de bas de page », disparaît.)

### 5. H2 licence : réponse directe en tête

Avant :
> Perception se paie à la consommation, à l'usage ou par un engagement AI Flex Plan d'un ou trois ans, et les deux comptent dans un MACC. Security Copilot est facturé à part.

Après :
> Microsoft Perception se paie à la consommation, de deux façons : à l'usage, ou par un engagement AI Flex Plan d'un ou trois ans. Les deux modes comptent dans un MACC. Security Copilot est facturé à part.

Même section, retouche légère :
> L'inclusion dans Microsoft 365 E5 ou E7 n'est pas documentée, ce qui ne veut pas dire exclue.

devient
> L'inclusion de Microsoft Perception dans Microsoft 365 E5 ou E7 n'est pas documentée, ce qui ne veut pas dire exclue.

## Retouches secondaires (même logique, sans fait nouveau)

| Passage | Avant | Après |
|---|---|---|
| H2 Security Copilot, 1re phrase | Perception ne touche à rien de lui-même. | Activer Microsoft Perception ne désactive pas l'agent de tri du phishing. |
| H2 Security Copilot, retour arrière | Supprimer le nouveau rouvre la porte à l'ancien, et efface tous les retours d'analystes appris. | Supprimer le Triage Agent rouvre la porte à l'agent de tri du phishing, et efface tous les retours d'analystes appris. |
| H2 Security Copilot, fin | La tuyauterie est commune. | Perception et Security Copilot partagent la même tuyauterie. |
| H2 statuts, décalage | Les deux sources Microsoft se contredisent sur un point. | Le billet Microsoft Security et Microsoft Learn se contredisent sur le statut des agents. |
| H2 garde-fous, URBAC | URBAC doit couvrir toutes les charges Defender. | Le RBAC unifié (URBAC) de Defender doit couvrir toutes les charges de travail Defender. |
| H2 « par quel agent », fin | L'étape 3 remplace l'agent de tri du phishing. | Configurer le Triage Agent, à l'étape 3, remplace l'agent de tri du phishing. |

Note : « Le billet Microsoft Security et Microsoft Learn se contredisent » décrit l'écart entre deux sources, qui est le fait lui-même. Ce n'est pas une attribution ajoutée (la phrase actuelle nomme déjà « le billet » et « les pages Microsoft Learn » juste après).

## Tableau des agents

Conforme et très citable. Deux ajustements facultatifs, sans fait nouveau :
- Ligne Triage Agent : « résout les faux positifs en mode automatique, laisse les vrais positifs à l'analyste » (fait déjà présent plus bas dans le corps).
- Ligne Attack Investigation Agent : « rédige un rapport d'enquête, recommande sans exécuter » est exact, rien à changer.

## Hors périmètre GEO, signalé

- `heroImage: ""` : à remplir par `tic-illustrateur` avant publication.
- Statut GA à revérifier le jour de la publication (bandeaux Learn), comme le note le brief.
