---
description: Chaîne complète TuneInCloud : rédaction → relecture rédac chef → illustration → issue GitHub de relecture. S'arrête avant publication.
argument-hint: <sujet, brief de veille ou format + sujet>
---

Tu orchestres la chaîne de publication TuneInCloud pour le sujet suivant :

$ARGUMENTS

Lis `CLAUDE.md` à la racine du repo. Enchaîne les agents ci-dessous avec l'outil
Agent, un à la fois, en transmettant à chacun le résultat du précédent. Ne rédige
pas toi-même, ne corrige pas toi-même : chaque étape appartient à son agent.

## Étape 1 : rédaction

Lance `tic-redacteur` avec le sujet ou le brief tel quel. Récupère dans son rapport
le chemin du brouillon, le format, le nombre de mots, les points à re-vérifier.

## Étape 2 : relecture

Lance `tic-redac-chef` sur ce chemin, en lui transmettant les points à re-vérifier
du rédacteur. Récupère le verdict, le chemin du rapport, les décisions qui
reviennent à Daniel.

Si le verdict est ❌ (à retravailler en profondeur) : n'illustre pas, passe
directement à l'étape 4 en le signalant, et propose à Daniel soit de relancer la
rédaction avec ses consignes, soit d'abandonner le sujet.

## Étape 3 : illustration

Lance `tic-illustrateur` sur le brouillon. Récupère la liste des fichiers créés.

## Étape 4 : sauvegarde du brouillon et demande de relecture

1. Commit du brouillon et de ses fichiers, puis push (le dossier `draft/` n'est pas
   compilé par Astro, rien n'est publié). Ajoute les fichiers un par un, uniquement
   ceux qui existent (jamais `-A`, jamais de motif sans correspondance) : le
   brouillon, `public/images/hero/<slug>.webp`, la bannière, les schémas PNG et SVG
   éventuels, le rapport `editorial/relectures/<slug>-*.md`.
   ```bash
   git add <fichier1> <fichier2> ...
   git commit -m "Brouillon : <titre court>" -m "Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>"
   git push origin master
   ```
2. Crée une issue GitHub (outil `issue_write`, owner `DanyZack`, repo `tuneincloud`,
   label `relecture` si possible) :
   - Titre : `Relecture : <titre de l'article>`
   - Corps, en français, avec :
     - format, produit, nombre de mots, verdict du rédac chef ;
     - lien vers le brouillon sur GitHub :
       `https://github.com/DanyZack/tuneincloud/blob/master/src/content/draft/<fichier>.md` ;
     - lien vers le rapport de relecture sur GitHub ;
     - les images hero et bannière en Markdown via
       `https://raw.githubusercontent.com/DanyZack/tuneincloud/master/public/images/...` ;
     - la liste des décisions qui reviennent à Daniel ;
     - la phrase : « Pour publier : répondre "OK publie <slug>" dans Claude Code. »
3. Si la création de l'issue échoue (connecteur indisponible), dis-le et donne le
   même contenu dans ta réponse.

## Étape 5 : compte rendu et arrêt

Réponds à Daniel de façon compacte : titre, format, nombre de mots, verdict,
chemin du brouillon, numéro et URL de l'issue, décisions à prendre, et la
consigne pour publier. **Ne lance pas `tic-publieur`.** Il ne sera lancé que sur
un message explicite de Daniel du type « OK publie <slug> », auquel cas tu lui
transmettras le chemin du brouillon et le numéro de l'issue.
