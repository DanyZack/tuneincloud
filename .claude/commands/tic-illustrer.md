---
description: Illustrer un brouillon TuneInCloud : hero image Canva, bannière 748x172, schémas (dossiers et guides).
argument-hint: <chemin du brouillon, ou slug> [consignes : "régénère le hero", "sujet photo : ...", "pas de schéma"]
---

Lance l'agent `tic-illustrateur` (outil Agent, `subagent_type: tic-illustrateur`)
avec :

$ARGUMENTS

Si l'argument est un slug plutôt qu'un chemin, cherche d'abord le fichier dans
`src/content/draft/` et transmets le chemin complet. Transmets aussi toute consigne
donnée après le chemin (régénération forcée, sujet photo souhaité, recadrage).
Restitue le rapport final de l'agent tel quel, et montre les images produites avec
l'outil SendUserFile pour que Daniel les voie sans ouvrir les fichiers.
