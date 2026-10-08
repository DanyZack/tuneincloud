---
description: Publier un brouillon validé : déplacement dans blog/, date du jour, build, commit, push, contrôle Netlify. Invoquer cette commande vaut accord explicite de publication.
argument-hint: <slug ou chemin du brouillon> [numéro d'issue de relecture à clore]
---

Daniel a donné son accord explicite de publication en invoquant cette commande.
Lance l'agent `tic-publieur` (outil Agent, `subagent_type: tic-publieur`) avec le
message : « OK publie $ARGUMENTS ».

Si l'argument est un slug, cherche d'abord le fichier dans `src/content/draft/` et
transmets le chemin complet. Si un numéro d'issue est donné après le slug,
transmets-le pour clôture. Si aucun fichier ne correspond, arrête-toi et dis-le.
Restitue le rapport final de l'agent tel quel (URL en ligne, commit, fichiers,
délai Netlify).
