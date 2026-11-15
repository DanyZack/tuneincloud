# Profil de backlinks : tuneincloud.fr (sources gratuites)

Date : 2026-11-15. Palier : 0 (Common Crawl + crawler de vérification). Moz, Bing, Keywords Everywhere et DataForSEO non configurés et non activés.

## Verdict

**DONNÉES INSUFFISANTES.** Aucun score de santé numérique n'est produit : 0 facteur sur 7 dispose d'une source (seuil minimal : 4).

## Présence dans Common Crawl (domaine, confiance 0.50)

Release interrogée : `cc-main-2026-aug-sep-oct` (web graph, trois mois de crawl, interrogé le 2026-11-15).

| Domaine | Dans le crawl | Dans les rangs | PageRank | Harmonic centrality |
|---|---|---|---|---|
| tuneincloud.fr | non | non | n/d | n/d |
| tuneincloud.com (ancien WordPress) | non | non | n/d | n/d |
| cladeys.fr (site rattaché) | non | non | n/d | n/d |

## Autorité à transférer (.com vers .fr)

**Non estimable avec ces sources.** Les deux domaines sont absents du web graph : il n'y a donc aucune valeur à comparer. Le web graph ne couvre que les domaines assez liés et crawlés. Une absence signifie « sous le seuil de visibilité de ce graphe », pas « zéro backlink ». Il ne faut pas en conclure que le .com n'avait aucune autorité : le graphe ne la mesure simplement pas à cette échelle. Le contenu du .com n'a pas été audité, conformément à la consigne.

## Facteurs du score

| Facteur | Poids | Statut |
|---|---|---|
| Domaines référents | 20 % | ignoré (aucune source, Moz/DataForSEO requis) |
| Qualité des domaines | 20 % | ignoré |
| Naturel des ancres | 15 % | ignoré |
| Ratio de liens toxiques | 20 % | ignoré |
| Vélocité des liens | 10 % | ignoré (DataForSEO uniquement) |
| Follow/nofollow | 5 % | ignoré |
| Pertinence géographique | 10 % | ignoré |

## Vérification de backlinks

Non exécutée : aucune liste de backlinks connus n'a été fournie. Le crawler vérifie des liens déjà identifiés, il n'en découvre pas.

## Limites des données

- Common Crawl est un indicateur de domaine uniquement, sans liste de backlinks, d'ancres ni de domaines référents.
- Domaines jeunes ou modestes (le .fr vient de basculer) : absence attendue.
- Aucune donnée de fraîcheur autre que la release CC citée.
- Le validateur `validate_backlink_report.py` n'a pas été lancé : aucun score ni claim chiffré à contrôler.

## Recommandations

| Priorité | Action |
|---|---|
| Haute | Vérifier dans Google Search Console (propriété tuneincloud.fr) le rapport « Liens » : source gratuite et la plus fiable pour les backlinks réels. |
| Haute | Contrôler dans la Search Console du .com (si encore accessible) ou dans les logs les redirections 301 page à page du .com vers le .fr, pour transférer l'autorité des liens existants, et utiliser l'outil de changement d'adresse. |
| Moyenne | Configurer une clé Moz gratuite (2 500 lignes/mois) dans `~/.config/claude-seo/tuneincloud/backlinks-api.json` pour DA, domaines référents et ancres, sur les deux domaines. |
| Moyenne | Enregistrer tuneincloud.fr dans Bing Webmaster Tools (propriétés du même compte seulement pour comparer). |
| Basse | Relancer Common Crawl à la release suivante ; le .fr n'y apparaîtra qu'après crawl et liens entrants suffisants. |
| Basse | Pour E-E-A-T et crawlabilité : `/seo content` et `/seo technical`. |

Sources : Common Crawl (domaine, confiance 0.50). Aucune autre source disponible.
