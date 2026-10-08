---
description: Relecture rédac chef d'un brouillon (corrections en place + rapport) ou d'un article publié (branche + pull request).
argument-hint: <chemin du fichier, ou slug>
---

Lance l'agent `tic-redac-chef` (outil Agent, `subagent_type: tic-redac-chef`) sur :

$ARGUMENTS

Si l'argument est un slug plutôt qu'un chemin, cherche d'abord le fichier
correspondant dans `src/content/draft/` puis dans `src/content/blog/` et transmets
le chemin complet à l'agent. Ne corrige rien toi-même. Restitue le rapport final de
l'agent tel quel (verdict, corrections, décisions pour Daniel, chemin du rapport).
