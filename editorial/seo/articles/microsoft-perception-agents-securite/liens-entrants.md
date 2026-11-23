# Liens entrants : Microsoft Perception

Cible : `/blog/{{ID}}/` (le publieur remplace `{{ID}}` par l'id définitif,
`<date>-microsoft-perception-agents-securite`). Préparé le 2026-11-23 d'après
`editorial/seo/articles/microsoft-perception-agents-securite/cluster.md` (section 7)
et la matrice de `editorial/seo/2026-11-15-audit/findings/cluster.md`.

Trois liens, une phrase ajoutée en fin de ligne existante pour chacun, aucun
nouveau paragraphe. Les fichiers utilisent des fins de ligne LF. Commit prévu :
`seo: linking — liens entrants vers <id>`, par `tic-publieur` avec le même « OK publie ».

## Lien 1 (obligatoire)

- **Fichier source** : `src/content/blog/2026-04-29-article-phishing-triage-agent.md`
- **Ligne** : 32 (section « Le premier d'une famille qui s'étend », paragraphe des étapes Secure 2025 et Ignite 2025)
- **Ancre** : « Microsoft Perception »
- **Ajout** : « Le Triage Agent de Microsoft Perception remplace désormais le Phishing Triage Agent, une fois configuré. » (15 mots)
- **Pourquoi ici** : le paragraphe retrace les étapes du catalogue d'agents. Perception en est l'étape suivante, et le lecteur de l'article doit savoir que l'agent décrit cède la place au Triage Agent. Constat factuel seulement, le rafraîchissement complet (périmètre ligne 52, overage, compteur de 37 agents) reste à faire à part.

Texte avant :

```
À Microsoft Secure en mars 2025, onze agents inauguraux pour défricher le terrain : phishing triage, vulnerability remediation (Intune), conditional access optimization (Entra), threat intelligence briefing (Security Copilot), DLP triage et IRM triage (Purview), plus cinq agents partenaires. À Ignite en novembre 2025, le catalogue passe à trente-sept agents, dont douze nouveaux Microsoft (Defender, Entra, Intune, Purview) et plus de trente partenaires. Au passage, la consommation des agents tiers est intégrée à l'enveloppe SCU E5, ce qui ouvre l'écosystème sans alourdir la facture.
```

Texte après :

```
À Microsoft Secure en mars 2025, onze agents inauguraux pour défricher le terrain : phishing triage, vulnerability remediation (Intune), conditional access optimization (Entra), threat intelligence briefing (Security Copilot), DLP triage et IRM triage (Purview), plus cinq agents partenaires. À Ignite en novembre 2025, le catalogue passe à trente-sept agents, dont douze nouveaux Microsoft (Defender, Entra, Intune, Purview) et plus de trente partenaires. Au passage, la consommation des agents tiers est intégrée à l'enveloppe SCU E5, ce qui ouvre l'écosystème sans alourdir la facture. Le Triage Agent de [Microsoft Perception](/blog/{{ID}}/) remplace désormais le Phishing Triage Agent, une fois configuré.
```

## Lien 2 (obligatoire)

- **Fichier source** : `src/content/blog/dossier-2026-04-15-entra-agent-id.md`
- **Ligne** : 74 (section « Le modèle d'objet », paragraphe **L'Agent Identity**, dernière ligne)
- **Ancre** : « les agents de sécurité de Microsoft Perception »
- **Ajout** : « Les agents de sécurité de Microsoft Perception reçoivent chacun une identité de ce type, avec un rôle limité. » (18 mots)
- **Pourquoi ici** : le paragraphe définit l'Agent Identity. Perception en crée une par agent, avec un rôle restreint aux permissions nécessaires (brouillon, section « Les garde-fous que l'administrateur règle »). Exemple concret d'agent Microsoft gouverné par Agent ID, et lien retour vers le hub du pilier.

Texte avant :

```
Un agent peut avoir une ou plusieurs identités selon son déploiement.
```

Texte après :

```
Un agent peut avoir une ou plusieurs identités selon son déploiement. Les [agents de sécurité de Microsoft Perception](/blog/{{ID}}/) reçoivent chacun une identité de ce type, avec un rôle limité.
```

## Lien 3 (recommandé)

- **Fichier source** : `src/content/blog/2026-07-08-dossier-dspm.md`
- **Ligne** : 135 (section « Le Data Security Posture Agent : encore en preview », fin de la phrase sur le Data Security Triage Agent)
- **Ancre** : « Microsoft Perception »
- **Ajout** : « Pour les alertes du portail Defender, ce tri revient au Triage Agent de Microsoft Perception. » (15 mots)
- **Pourquoi ici, et pas sur la phrase du Data Security Posture Agent** : le cluster suggérait l'ancre « plateforme agentique Microsoft Perception » au paragraphe du Data Security Posture Agent. Mais rien dans le brouillon ni dans les sources Learn citées ne rattache cet agent Purview à Perception, qui travaille sur Defender XDR et Sentinel. Le lien y laisserait croire à une appartenance non vérifiée. La phrase sur le Data Security Triage Agent (tri des alertes DLP et IRM) offre un parallèle exact : tri des alertes Purview d'un côté, tri des alertes Defender de l'autre. Le lecteur du dossier DSPM y gagne le pendant côté SOC.

Texte avant :

```
alertes DLP et IRM en filtrant le bruit et en remontant les incidents les plus critiques.
```

Texte après :

```
alertes DLP et IRM en filtrant le bruit et en remontant les incidents les plus critiques. Pour les alertes du portail Defender, ce tri revient au Triage Agent de [Microsoft Perception](/blog/{{ID}}/).
```

## Écarté

- `2026-10-19-copilot-televersement-agents-avances` (optionnel dans le cluster) : article sur les agents Copilot M365, aucune phrase existante sur les agents de sécurité. Rien à forcer.

## Contrôles

- Charte : pas de tiret cadratin, pas de point-virgule, pas de « nous », aucune date ni attribution de source ajoutée, aucun numéro MC.
- Chaque ajout compte au plus 18 mots.
- Après pose des liens : `npm run build`, puis `node scripts/seo-check.mjs <fichier> --stage final` sur les trois fichiers source.
