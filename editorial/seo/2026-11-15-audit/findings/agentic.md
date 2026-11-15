# Audit agent-readiness : tuneincloud.fr (2026-11-15)

Outils : lighthouse_agentic.py, agentic_check.py, agent_ux_check.py (claude-seo 2.6.2). Faits de référence vérifiés le 2026-09-23 (vendor-matrix). Contenu récupéré traité comme donnée non fiable. Aucun avertissement de bac à sable navigateur.

## Lighthouse Agentic Browsing

Non disponible : PageSpeed Insights a répondu HTTP 429 (quota quotidien dépassé, mobile et desktop). Aucune fraction X/N à rapporter, aucune valeur supposée. Pour relancer : configurer une clé API Google (`/seo google setup`, identifiants dans `~/.config/claude-seo/tuneincloud/`), puis `lighthouse_agentic.py --strategy both`.

Indication partielle issue de agentic_check : llms.txt échoue la règle Lighthouse (voir Moyenne). Les autres audits liés (ai-catalog, WebMCP) sont non applicables ou facultatifs.

## Score Agent-UX (heuristique 0-100, distinct de Lighthouse)

| Page | Score | Statut | Détail |
|---|---|---|---|
| Accueil | 100 | complet | 234 nœuds, 23 liens interactifs tous nommés, 12 landmarks, 0 bouton, 0 widget div onclick |
| Article `2026-10-12-entra-memberof-groupes-dynamiques` | 100 | complet | 1210 nœuds, 18 liens nommés, 5 landmarks, 0 problème |

## Constats

### Critique
Aucun. Contenu servi sans JavaScript (361 mots sur l'accueil, pas de coquille JS), robots.txt accessible (200), 404 correct (pas de catch-all 200).

### Haute
Aucun.

### Moyenne
1. **llms.txt : échec de la règle Lighthouse "contient des liens Markdown"** (P1, spécification communautaire llmstxt.org, non ratifiée ; Google Search l'ignore). Le fichier (2350 octets, 200, text/plain) contient 7 URL nues (LinkedIn, site, Cladéys, RSS, sitemap, À propos) et aucune syntaxe `[nom](url)`. Les sections "Auteur", "Piliers éditoriaux", "Politique IA" sont des listes de texte sans lien.
   Correctif : écrire les URL en `[RSS](https://tuneincloud.fr/rss.xml)`, etc., et ajouter une section "Articles de référence" listant 10 à 20 articles clés en `- [Titre](https://tuneincloud.fr/blog/<id>/): une ligne de résumé`. Idéalement générer le fichier au build (route Astro `llms.txt.ts` depuis la collection `blog`) pour qu'il reste à jour. Aucun effet de classement ou de citation n'est garanti. `llms-full.txt` : 404, facultatif.

### Basse
2. **Content-Signal absent de robots.txt** (brouillon IETF + politique Cloudflare, simple préférence, Google déclare ne pas l'appliquer). Facultatif. Si souhaité, par exemple `Content-Signal: search=yes, ai-input=yes, ai-train=yes` dans le groupe `*`, cohérent avec la politique IA déjà déclarée dans llms.txt. Choisir `ai-train` selon votre décision éditoriale.
3. **Livraison Markdown absente** (opportunité, pas un défaut) : pas de négociation `Accept: text/markdown`, pas de `rel="alternate" type="text/markdown"`, `/index.md` en 404. Aucun agent grand public confirmé ne la demande. Pour un blog dont les sources sont déjà des fichiers `.md`, une route Astro `/blog/<id>.md` plus un lien alternate serait peu coûteuse. À faire seulement si utile.
4. **robots.txt, hygiène** : (a) `Disallow: /draft/` n'est que dans le groupe `*` ; les groupes nommés (GPTBot, etc.) avec `Allow: /` ne le reprennent pas. Sans impact réel car `/draft/` n'est pas publié, mais le répéter si ce chemin devait exister. (b) Les agents Claude-SearchBot et Claude-User, Google-Agent et OAI-AdsBot tombent dans le groupe `*` (autorisés), ce qui est cohérent avec la politique. (c) Bytespider, Amazonbot, anthropic-ai, Claude-Web sont des groupes ouverts supplémentaires, sans effet négatif.

### Non pertinent pour un blog (ne pas traiter)
- **WebMCP** (brouillon/proposition, vérifié 2026-09-23) : 0 appel `registerTool`, 0 formulaire, `navigator.modelContext` absent. Un blog sans recherche interne, réservation ou formulaire n'a rien à exposer. Opportunité nulle pour l'instant.
- **/.well-known** : api-catalog, oauth-protected-resource, oauth-authorization-server, agent-card.json, ucp : tous 404, tous sans objet (aucun service correspondant).
- **ai-catalog.json** (brouillon, vérifié 2026-09-23) : 404, non signalé. À publier seulement si vous exposez un serveur MCP, un agent A2A ou des skills. Lighthouse le traite comme non applicable.
- Web Bot Auth (proposition) : sans objet pour un éditeur qui ne fait pas de requêtes sortantes.

## Lignes de politique d'accès (robots.txt, déclaré)

- Entraînement : GPTBot, ClaudeBot, CCBot, Google-Extended, Applebot-Extended (jeton de contrôle) : autorisés (`Allow: /`).
- Recherche IA : OAI-SearchBot, PerplexityBot (groupes nommés), Claude-SearchBot (via `*`) : autorisés.
- Déclenché par l'utilisateur : ChatGPT-User, Perplexity-User, Claude-User, Google-Agent : autorisés ; robots.txt n'a pas forcément d'effet sur ChatGPT-User, Perplexity-User et Google-Agent (comportement documenté "peut ne pas s'appliquer / ignore généralement"). Aucun test d'user-agent réel (`--ua-matrix`) n'a été fait, non autorisé.

## Notes de statut des standards (vérifiées le 2026-09-23)

- llms.txt : proposition communautaire, non ratifiée.
- Content-Signal : brouillon IETF + politique Cloudflare, préférence non contraignante.
- WebMCP, ai-catalog.json, Web Bot Auth : brouillons ou propositions.

## Résumé des priorités

Un seul correctif concret utile : rendre llms.txt conforme (liens Markdown + liste d'articles, idéalement généré au build). Le reste est facultatif ou sans objet. Relancer Lighthouse quand le quota PSI le permet.
