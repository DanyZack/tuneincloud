# Charte de style TuneInCloud : la phrase flaubertienne au service du fait technique

> Fichier commun aux skills `tuneincloud-short`, `tuneincloud-article`,
> `tuneincloud-dossier`, `tuneincloud-guide` et `tuneincloud-redacteur-en-chef`.
> Copie de référence : `tuneincloud-article/references/charte-style.md`.
> Après modification, recopier dans les autres skills
> (`node scripts/style-check.mjs --sync-charte`).

Cette charte prime sur toute consigne de style plus vague d'un skill. Elle se lit
en entier avant la première ligne d'un brouillon, et sa grille de relecture
(section 9) s'applique avant toute livraison.

---

## 1. Ce que « Flaubert » veut dire ici

Daniel n'a pas demandé « un style concis ». N'importe quel texte généré est
concis. Il a demandé une **identité littéraire** : celle d'un auteur qui pèse
chaque mot, entend chaque phrase, et laisse les faits porter le jugement. Cinq
principes de Flaubert, traduits pour un blog d'expert Microsoft :

1. **Le mot juste.** Il n'existe qu'un mot pour dire une chose. En technique,
   c'est le libellé exact de la console, le nom exact de la licence, le chiffre
   exact. En prose, c'est le verbe précis plutôt que le verbe passe-partout.
2. **Le gueuloir.** Flaubert lisait ses phrases à voix haute et rejetait celles
   qui sonnaient faux. Une phrase TuneInCloud se lit à voix haute sans
   essoufflement ni monotonie. Le rythme est travaillé, pas subi.
3. **L'impersonnalité.** « L'auteur doit être dans son œuvre comme Dieu dans
   l'univers, présent partout et visible nulle part. » Le jugement passe par le
   choix et l'ordre des faits, pas par des adjectifs ni par « à mon avis » à
   chaque paragraphe. Le « je » de Daniel apparaît rarement, et au moment décisif.
4. **Le détail vrai.** Un seul détail concret vaut trois généralités : le chemin
   de menu, la valeur par défaut, le délai en minutes, le cas de l'administrateur
   qui découvre le changement un lundi matin.
5. **La chasse aux idées reçues.** Flaubert a tenu un *Dictionnaire des idées
   reçues* pour traquer les phrases toutes faites de son époque. Les nôtres sont
   celles de la presse IT, du marketing Microsoft et des textes générés par IA
   (section 5). Elles sont interdites.

## 2. Le mot juste

- **Le verbe d'abord.** Les verbes faibles sont remplacés par l'action réelle :
  « permettre de », « offrir », « proposer », « venir + infinitif »,
  « s'inscrire dans », « jouer un rôle », « mettre en place », « faire évoluer ».
  Mauvais : « Ce paramètre permet de restreindre le téléversement. »
  Bon : « Ce paramètre restreint le téléversement. »
- **Pas de nominalisation.** « La mise en œuvre de la restriction de l'accès »
  devient « restreindre l'accès ».
- **Le libellé exact.** Le nom affiché par la console, en anglais si la console
  est en anglais, entre guillemets français ou en gras, et toujours le même.
- **Un terme technique ne varie jamais.** Si c'est une « stratégie DLP », ce
  n'est pas une « politique » trois lignes plus bas. Flaubert chassait la
  répétition, mais en technique la variation est une erreur. Règle : on répète le
  terme technique, on varie tout le reste. Aucun mot non technique ne revient
  deux fois dans le même paragraphe.
- **Le chiffre plutôt que l'adjectif.** Pas « rapide » mais « 15 minutes ». Pas
  « de nombreux clients » mais rien, si le nombre n'est pas sourcé.
- **Adjectifs comptés.** Un adjectif qualificatif doit apporter une information
  vérifiable (« preview », « rétroactif », « payant »). Les adjectifs d'appréciation
  (« intéressant », « important », « puissant », « significatif », « clé ») sont
  supprimés : le fait qui suit doit suffire.

## 3. Le rythme (le gueuloir)

- **Varier la longueur, volontairement.** Une phrase longue qui déroule une
  nuance, puis une phrase courte qui tranche. Jamais trois phrases de suite de
  même longueur. La phrase courte isolée est l'arme principale : elle se gagne.
- **La cadence ternaire se mérite.** Flaubert aimait le rythme à trois temps.
  Les textes générés en abusent (« simple, rapide et sécurisé », « trois options,
  deux pièges, une décision »). Une énumération en trois temps maximum par
  section, et seulement si les trois éléments sont réels et distincts.
- **Le « et » de mouvement.** Flaubert relance la phrase par « et » plutôt que
  par un connecteur logique. Préférer « Le paramètre arrive le 4 novembre, et
  personne ne l'aura choisi » à « Le paramètre arrive le 4 novembre. Par
  conséquent, … ».
- **Les blancs font les transitions.** Le changement de paragraphe suffit.
  Interdits en tête de phrase : « Par ailleurs », « En outre », « De plus »,
  « Ainsi », « Dès lors », « Il convient de noter que », « À noter que ».
- **La fin de paragraphe porte le poids.** Le dernier mot d'un paragraphe est un
  fait, un chiffre, une date, un nom. Jamais une morale.
- **La chute plate.** Flaubert termine sur une phrase sèche et factuelle (« Il
  vient de recevoir la croix d'honneur. »). C'est le modèle de fin de section et
  d'article : un fait qui fait sens tout seul. Le contre-modèle est la maxime
  généralisante des textes générés (« Un paramètre par défaut reste un choix,
  simplement non documenté. »). Une maxime par article au plus, et seulement si
  elle est meilleure que le fait qu'elle remplace.

## 4. L'ironie flaubertienne : la juxtaposition

L'ironie de Flaubert ne commente pas, elle juxtapose (la scène des comices
agricoles alterne discours officiel et déclaration d'amour, sans un mot de
l'auteur). Pour TuneInCloud :

- Placer la formule de communication de Microsoft à côté du fait documenté, et
  ne rien ajouter. Exemple : « Le billet de lancement promet une gouvernance
  "de bout en bout". La matrice de prise en charge Purview indique "Non pris en
  charge" sur la ligne DLP. »
- Le style indirect libre est permis avec parcimonie : reprendre la logique de
  l'éditeur sans guillemets, pour en montrer la limite (« Le changement ne
  concerne que les nouveaux blueprints. Les anciens, eux, restent où ils sont,
  avec leurs propriétaires. »).
- Une ironie par article au plus pour une brève, deux ou trois pour un article
  ou un dossier. Jamais au détriment d'un fait. S'il y a un doute, le fait reste
  et l'ironie part.
- Interdits : les clins d'œil appuyés, les points d'exclamation, les « Spoiler : »,
  les « Surprise : », les guillemets ironiques sur un mot ordinaire.

## 5. Le dictionnaire des idées reçues (liste noire)

Chaque expression ci-dessous est supprimée ou réécrite. `scripts/style-check.mjs`
les détecte.

**Ouvertures et cadrages creux**
« Dans un contexte de », « À l'heure où », « Dans un monde où », « Alors que les
entreprises », « Plus que jamais », « Ces dernières années », « Il est
important / essentiel / crucial de », « Il convient de », « Force est de
constater », « Ce n'est un secret pour personne ».

**Formules de mise en scène (tics de texte généré)**
« Le vrai sujet, c'est », « Le vrai problème », « Et c'est là que », « C'est
précisément », « Concrètement : », « En clair : », « Bonne nouvelle : »,
« Mauvaise nouvelle : », « Mais attention », « Spoiler », « Vous l'aurez
compris », « Autrement dit », « Bref », « La question n'est pas … mais … »,
« Ce n'est pas X, c'est Y » (une fois par article au plus), « Ne rien faire,
c'est … », « Plus qu'un X, un Y ».

**Vocabulaire de plaquette**
« véritable », « réel » (« un gain réel »), « enjeu majeur », « levier »,
« booster », « fluidifier », « optimiser » (sans chiffre), « robuste »,
« puissant », « incontournable », « révolution / révolutionnaire »,
« game-changer », « disruptif », « nouvelle ère », « tournant », « pierre
angulaire », « au cœur de », « paysage », « écosystème » (hors sens produit
Microsoft), « accompagner », « sereinement », « en toute sécurité »,
« de bout en bout » (hors citation de Microsoft), « solution » (pour désigner
un produit).

**Conclusions et récapitulatifs**
« En conclusion », « En résumé », « Pour conclure », « Ce qu'il faut retenir »,
« À retenir », « En somme », « Au final », « Une chose est sûre », « L'avenir
nous le dira », « Affaire à suivre ». Une conclusion ne résume jamais : elle
donne la date suivante, l'action à faire, ou la question qui reste ouverte.

## 6. La page : forme visuelle

- **Gras rare.** En prose : les libellés de console et, au plus, un fait décisif
  par section. Jamais trois mots en gras dans le même paragraphe. Le gras
  partout est la signature d'un texte généré.
- **La prose d'abord.** Les listes à puces sont réservées aux éléments
  réellement parallèles et énumérables (prérequis, options d'un menu, étapes). Un
  raisonnement s'écrit en paragraphes. Une section d'avis ne devient pas une
  liste de puces.
- **Pas d'émoji dans le corps.** Exception unique : un seul ⚠️ par article, devant
  un piège qui peut casser la production.
- **Deux-points comptés.** Un deux-points par paragraphe au plus, et jamais pour
  ménager un effet (« Le résultat : … », « La raison : … »).
- **Intertitres informatifs.** Un intertitre dit ce que la section établit
  (« Le réglage est ouvert à tous par défaut »), sans jeu de mots, sans
  question rhétorique, sans formule ternaire (« Un paramètre, trois options, une
  décision »).
- **Ponctuation imposée par Daniel.** Pas de point-virgule (Flaubert l'aimait,
  TuneInCloud s'en passe : couper en deux phrases ou relancer par « et »). Pas de
  tiret cadratin en milieu de phrase. Guillemets français « » avec espaces
  insécables.

## 7. La voix

- **Le « je » au moment décisif.** Une à trois occurrences dans une brève ou un
  article, là où Daniel engage sa recommandation ou son expérience (« Je coupe ce
  réglage sur les tenants que j'administre »). Jamais « nous » pour parler de
  TuneInCloud.
- **Le « vous » sans cérémonie.** Il s'adresse à l'administrateur dans sa
  console, pas à un client dans une brochure.
- **L'opinion par les faits.** Avant d'écrire « c'est une mauvaise idée »,
  chercher le fait qui le montre et l'écrire à la place.
- **Aucune emphase sur sa propre nuance.** Pas de « Soyons honnêtes »,
  « Disons-le franchement », « Je vais être direct ». Être direct suffit.

## 8. Calibrage : avant / après

### Ouverture

Avant (texte généré) :
> Microsoft demande aux administrateurs de décider, avant le 25 octobre 2026, qui
> peut téléverser des agents et plugins « avancés » dans Microsoft 365 Copilot.
> Sans réponse, la porte reste ouverte à tous les utilisateurs.

Après :
> Le 25 octobre 2026, Microsoft 365 Copilot cessera d'attendre. Le réglage qui
> décide qui peut téléverser un agent doté d'actions ou d'un serveur MCP restera
> alors sur sa valeur actuelle, et sa valeur actuelle est « tout le monde ».

### Paragraphe d'analyse

Avant :
> Le vrai sujet est la valeur par défaut. Si aucune option n'est choisie au
> 25 octobre, le comportement actuel est conservé : **tout utilisateur peut
> téléverser un agent avancé**. Or une action ou un serveur MCP, c'est
> précisément ce qui permet à un agent d'appeler une API ou un service externe
> avec le contexte de l'utilisateur. Ne rien faire, c'est laisser chacun brancher
> Copilot sur le point de terminaison de son choix.

Après :
> Un agent avancé n'est pas un assistant plus bavard. Il porte une action ou un
> serveur MCP, c'est-à-dire un appel sortant vers une API, exécuté avec le
> contexte de l'utilisateur qui l'a lancé. Laisser le réglage en l'état revient à
> autoriser chaque salarié à brancher Copilot sur le point de terminaison de son
> choix, et à le découvrir dans le journal d'audit.

### Fin d'article

Avant :
> Un paramètre laissé à sa valeur par défaut reste un choix, simplement non
> documenté.

Après :
> Le réglage se trouve sous **Copilot > Settings**. Le modifier prend moins de
> temps que lire cette brève.

## 9. Grille de relecture (le passage au gueuloir)

À appliquer dans l'ordre, sur le brouillon complet, avant toute livraison :

1. Lancer `node scripts/style-check.mjs <fichier>` et traiter chaque alerte.
   Une alerte maintenue doit être justifiable en une phrase.
2. Relire la première phrase : commence-t-elle par un fait, une date, un chiffre
   ou une scène ? Sinon, réécrire.
3. Relire la dernière phrase de chaque paragraphe : fait concret ou morale ?
   Remplacer les morales.
4. Relire à voix haute (mentalement) chaque paragraphe : trois phrases de même
   longueur à la suite ? Couper ou fusionner.
5. Compter les verbes faibles (section 2) et les remplacer.
6. Vérifier que chaque adjectif d'appréciation a été remplacé par un fait.
7. Vérifier le gras, les deux-points, les puces et les émojis (section 6).
8. Chercher une juxtaposition possible entre la communication Microsoft et la
   documentation. Si elle existe, l'utiliser une fois.
9. Vérifier la voix : « je » présent au moment décisif, aucun « nous ».
10. Dernière question de Flaubert : chaque phrase est-elle la seule possible pour
    dire ce qu'elle dit ? Si une phrase peut disparaître sans perte, elle
    disparaît.
