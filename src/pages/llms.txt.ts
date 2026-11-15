// /llms.txt généré au build depuis la collection blog (remplace public/llms.txt).
import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

const LINKEDIN = 'https://www.linkedin.com/in/daniel-pol%C3%B2nio-19b081110/';

const SECTIONS: { category: string; title: string }[] = [
	{ category: 'dossiers', title: 'Dossiers de référence' },
	{ category: 'guides', title: 'Guides' },
	{ category: 'actualites', title: 'Actualités (brèves et articles)' },
];

export const GET: APIRoute = async ({ site }) => {
	const origin = site ?? new URL('https://tuneincloud.fr');
	const url = (path: string) => new URL(path, origin).href;
	const posts = (await getCollection('blog')).sort(
		(a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf(),
	);

	const sections = SECTIONS.map(({ category, title }) => {
		const items = posts
			.filter((p) => p.data.category === category)
			.map((p) => {
				const date = (p.data.updatedDate ?? p.data.pubDate).toISOString().slice(0, 10);
				return `- [${p.data.title}](${url(`/blog/${p.id}/`)}) (${date}) : ${p.data.description}`;
			});
		return items.length ? `## ${title}\n\n${items.join('\n')}` : '';
	})
		.filter(Boolean)
		.join('\n\n');

	const body = `# TuneInCloud

> Blog d'expertise Microsoft (Intune, Entra ID, Defender, Purview, Microsoft 365,
> Copilot) en français, par Daniel POLÒNIO, Architecte Expert Microsoft Modern
> Work et Cybersécurité, fondateur de Cladéys (architecture, conseil,
> cybersécurité). Articles de référence pour les DSI, RSSI, DPO, architectes IT,
> consultants et administrateurs francophones qui veulent comprendre avant
> d'appliquer. Chaque fait daté est sourcé Microsoft (Learn, Message Center,
> roadmap).

## Auteur

- [Daniel POLÒNIO, à propos](${url('/about/')}) : Architecte Expert Microsoft Modern Work et Cybersécurité, fondateur de Cladéys
- Expérience : depuis 2016, plus de 40 clients accompagnés (PME, ETI, grands comptes)
- [Profil LinkedIn](${LINKEDIN})
- [Cladéys](https://cladeys.fr)

## Piliers éditoriaux

- **Microsoft Intune** : gestion des terminaux Windows, iOS, Android, macOS, Autopilot, MDM, Intune Suite, Endpoint Privilege Management
- **Microsoft Entra ID** : identité, Conditional Access, MFA, passkeys, PIM, groupes dynamiques, Entra Backup and Recovery, agents non humains (Entra Agent ID)
- **Microsoft Defender** : XDR, Defender for Endpoint, Defender for Identity, Defender for Cloud Apps, Defender for Office 365, Security Copilot
- **Microsoft Purview** : gouvernance des données, DSPM, DLP, sensitivity labels, Insider Risk, eDiscovery, RGPD
- **Microsoft 365 et IA** : Copilot, agents, Modern Workplace
- **Transverses** : Zero Trust, EU Data Boundary, conformité (RGPD, NIS2, DORA, EU AI Act)

${sections}

## Politique IA

TuneInCloud autorise l'exploration par les robots des moteurs de réponse
(OAI-SearchBot, Claude-SearchBot, PerplexityBot, Googlebot, Bingbot) et par
les agents agissant à la demande d'un utilisateur (ChatGPT-User, Claude-User,
Perplexity-User). Les robots de collecte pour l'entraînement des modèles
(GPTBot, ClaudeBot, Google-Extended, Applebot-Extended, CCBot) sont également
autorisés. La politique complète figure dans [robots.txt](${url('/robots.txt')}).

Les citations doivent préserver l'attribution à Daniel POLÒNIO et à
TuneInCloud, et inclure idéalement un lien vers l'article cité.

## Ressources

- [Flux RSS](${url('/rss.xml')})
- [Sitemap](${url('/sitemap-index.xml')})
- [Accueil](${url('/')})
`;

	return new Response(body, {
		headers: { 'Content-Type': 'text/plain; charset=utf-8' },
	});
};
