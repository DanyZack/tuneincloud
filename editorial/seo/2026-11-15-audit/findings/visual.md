# Audit visuel : tuneincloud.fr (2026-11-15)

Pages : accueil, /blog/, /blog/2026-10-12-entra-memberof-groupes-dynamiques/.
Captures : `editorial/seo/2026-11-15-audit/screenshots/` (`home|blog|article` x `desktop|laptop|tablet|mobile`.png).
Mesures : Edge headless via Playwright, viewports 375x812 et 1920x1080. Le rendu s'est fait avec le navigateur du système (Edge), le Chromium du plugin n'étant pas installé.

## Synthèse

| Page | Desktop | Mobile |
|---|---|---|
| Accueil | Bon. H1 visible (y 150-361), pas de CTA | H1 visible (y 183-315), nav absente, aucun débordement |
| /blog/ | Mise en page cassée (colonne 960 px collée à gauche), pas de H1 | Débordement horizontal (scrollWidth 960 pour 375), titres coupés, pas de H1 |
| Article | Bon. H1 visible (y 157-253) | H1 visible (y 192-250), léger débordement (388 px) |

## Critique

1. **/blog/ : débordement horizontal sur mobile.** `scrollWidth` = 960 pour une fenêtre de 375 px. Cause : `width: 960px` fixe dans `src/pages/blog/index.astro` (ligne ~21), reste du gabarit Astro de départ. Sur mobile, les images débordent et les titres sont tronqués (« Copilot : qui téléve… », capture `blog-mobile.png`). Remède : `max-width: 960px; width: 100%`.
2. **/blog/ : mise en page hors charte sur desktop.** Contenu calé à gauche sur 960 px, moitié droite de l'écran vide, en-tête non centré par rapport au contenu. Titres de cartes en 2 tailles disparates, dates en anglais (« Oct 19, 2026 », lecture en `en-US`) alors que l'accueil affiche « 19 octobre 2026 ». C'est la page qui porte le maillage vers tous les articles : elle doit reprendre les cartes de l'accueil.
3. **/blog/ : aucun H1** (`h1count` = 0). Page d'archive sans titre principal : pénalisant pour le SEO et l'accessibilité.

## Haute

4. **Navigation absente sur mobile (<= 768 px).** `Header.astro` : `.nav-links { display: none }` sans menu burger de remplacement. Sur téléphone, aucun accès à Actualités, Guides, Dossiers, À propos, et donc aucun lien interne dans le gabarit. Ajouter un bouton burger (cible 48x48, `aria-expanded`) ou rendre la nav en ligne défilante.
5. **Cibles tactiles trop petites.** Liens de nav 11,2 px de haut (16 px mesurés en desktop), « Lire l'article » 123x21 px sur l'accueil (6 occurrences, mobile). Minimum visé : 44-48 px. Ajouter du `padding` vertical (~0,75rem) sur ces liens.
6. **Images de /blog/ sans attribut `alt`** : 14 sur 15. Les cartes ne donnent aucun texte alternatif (`alt=""` ou absent). À remplacer par le titre ou une description. Même constat sur la bannière d'article (`ArticleBanner.astro` ligne 37 : `alt=""`, acceptable si purement décorative, à confirmer).

## Moyenne

7. **Article mobile : léger débordement horizontal** (`scrollWidth` 388 pour 375). Les blocs de code (`CODE`, `SPAN.line`) dépassent à 1766 px : le `pre` doit avoir `overflow-x: auto; max-width: 100%`. Vérifier aussi les tableaux (calendrier à 3 colonnes, colonne Date très étroite sur desktop, « 5 octobre / 2026 » sur 2 lignes).
8. **Textes trop petits.** Slogan de l'en-tête 9,3 px (0,58 rem) en blanc à 40 % d'opacité : contraste faible, illisible sur mobile, où il passe en plus sur 2 lignes (« Daniel / Polònio »). Liens du menu 11,2 px, sous-menus 11,2 px. Corps de texte 16 px : correct. Relever le slogan à 0,7 rem minimum et l'opacité à 0,7.
9. **Sur mobile, l'en-tête (~104 px) est sticky** et occupe 13 % de la hauteur. Le réduire (logo plus petit, slogan masqué) laisserait plus de place au H1 et au contenu.
10. **Accueil : aucun appel à l'action au-dessus de la ligne de flottaison**, ni sur desktop ni sur mobile (bouton « Derniers articles », abonnement RSS ou newsletter absents). Le H1 et le sous-titre sont bien visibles. Sur mobile, le premier article n'apparaît qu'à y ~690 px (hors écran sur 812 px à peine) : bien, mais un lien « Voir les articles » aiderait.

## Basse

11. **H1 accueil : accent circonflexe de « Maîtrisez » décalé** (capture `home-desktop.png`, le « ^ » flotte au-dessus du « î » à y ~160). Défaut de rendu de la police Cormorant Garamond avec la ligature ; vérifier `font-feature-settings` ou le sous-ensemble de police chargé. Le texte du DOM concatène aussi les 3 lignes du H1 sans espace (« Maîtrisezvotre environnementMicrosoft. ») : ajouter un espace ou des `<br>` pour les lecteurs d'écran et la lecture du titre par les robots.
12. **Bande tricolore (bleu/blanc/rouge) de 4-8 px au bord gauche de la bannière d'article.** Probablement voulue (clin d'oeil français), mais sur mobile elle fait 8 px et ressemble à un défaut. À confirmer.
13. **Bannière interne 748x172** : absente de l'article contrôlé (pas de `![Banniere]` visible au-dessus de la ligne de flottaison). Le hero 1200x630 de l'en-tête joue ce rôle. Rien à corriger.
14. **Tiret cadratin dans le sous-titre de l'accueil** (« Microsoft — entièrement en français »), en contradiction avec la charte de style. Virgule ou point conseillés.
15. **Texte en pied de capture mobile de l'article** : interligne très large (~1,8) sur 25 caractères par ligne en moyenne. Lisible, mais réduire la marge latérale (64 px par côté sur 750 px rendus) gagnerait des caractères par ligne.

## Points positifs

- Viewport correct (`width=device-width, initial-scale=1`), corps 16 px.
- Accueil : aucun débordement horizontal à 375 px, H1 unique et visible, hiérarchie claire, grille de 3 cartes cohérente en desktop.
- Article : H1 unique en 24 px mobile / 40 px desktop, visible dès le premier écran, colonne de lecture étroite et confortable.
- Hero image de l'article chargée, sans décalage visible.

## Rendu sans bac à sable

Le résultat du rendu n'indique pas `sandbox: false`. Le navigateur utilisé pour les mesures est Edge (canal `msedge`).
