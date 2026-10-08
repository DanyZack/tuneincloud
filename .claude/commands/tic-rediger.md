---
description: Rédiger un brouillon TuneInCloud (brève, article, dossier ou guide) dans src/content/draft/, sans relecture ni illustration.
argument-hint: <format optionnel + sujet, ou "sujet N de la veille du YYYY-MM-DD">
---

Lance l'agent `tic-redacteur` (outil Agent, `subagent_type: tic-redacteur`) avec
cette demande, transmise telle quelle :

$ARGUMENTS

Ne rédige rien toi-même. Quand l'agent a terminé, restitue son rapport final sans le
résumer (chemin du brouillon, format, nombre de mots, sources, points à vérifier),
puis rappelle les suites possibles : `/tic-relire <chemin>` pour la relecture,
`/tic-illustrer <chemin>` pour les visuels, `/tic-publier <slug>` pour publier.
