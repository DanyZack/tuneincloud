---
description: Lancer la revue de veille datajournaliste à la demande (hors routine du lundi) : revue scorée dans editorial/veille/ + issue GitHub.
argument-hint: [périmètre optionnel : "Purview", "Intune et Entra", "fenêtre 7 jours"]
---

Lance l'agent `tic-veille` (outil Agent, `subagent_type: tic-veille`) avec le
cadrage suivant (vide = périmètre complet, 14 jours) :

$ARGUMENTS

Ne fais aucune recherche toi-même. Restitue le rapport final de l'agent tel quel
(titres et scores des sujets, chemin du fichier, commit, numéro et URL de l'issue),
puis rappelle : « Pour lancer la rédaction : /tic-pipeline sujet N de la veille du
YYYY-MM-DD ».
