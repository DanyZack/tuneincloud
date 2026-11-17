# Suivi SEO des articles publiés

Une ligne par article publié depuis la mise en place du pipeline SEO. Ajoutée
par `tic-publieur` à la publication. Traitée par la routine hebdomadaire
`/tic-seo hebdo`, qui exécute les contrôles arrivés à échéance et coche la
colonne correspondante.

- **J+7** : indexation (Search Console), premières requêtes, taux de clic. Si
  le CTR est faible, proposition de title ou de description.
- **J+30** : position et clics sur le mot-clé principal, citations IA,
  décision : laisser, enrichir, mieux relier.

Sans Search Console, J+7 se limite à la présence dans le sitemap, à la
comparaison drift et à une recherche `site:` (indicative).

| Publication | Page | Mot-clé principal | J+7 (date) | J+7 fait | J+30 (date) | J+30 fait | Décision |
|---|---|---|---|---|---|---|---|
