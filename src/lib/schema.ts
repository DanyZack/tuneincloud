// Données structurées Schema.org (JSON-LD) de TuneInCloud.
// Graphe relié par @id : WebSite, Organization (éditeur), Person (auteur),
// BlogPosting, BreadcrumbList, ProfilePage.

import type { CollectionEntry } from 'astro:content';
import { SITE_TITLE } from '../consts';

type Graph = Record<string, unknown>;

const ORIGIN = 'https://tuneincloud.fr';
const abs = (path: string) => new URL(path, ORIGIN).href;

export const IDS = {
	website: abs('/#website'),
	publisher: abs('/#publisher'),
	person: abs('/about/#daniel-polonio'),
};

const CATEGORY_LABELS: Record<string, string> = {
	actualites: 'Actualités',
	guides: 'Guides',
	dossiers: 'Dossiers',
};

export function person(): Graph {
	return {
		'@type': 'Person',
		'@id': IDS.person,
		name: 'Daniel POLÒNIO',
		url: abs('/about/'),
		jobTitle: 'Architecte Expert Microsoft Modern Work et Cybersécurité',
		worksFor: {
			'@type': 'Organization',
			name: 'Cladéys',
			url: 'https://cladeys.fr',
		},
		knowsAbout: [
			'Microsoft Intune',
			'Microsoft Entra ID',
			'Microsoft Defender',
			'Microsoft Purview',
			'Microsoft 365',
			'Microsoft 365 Copilot',
			'Zero Trust',
		],
		sameAs: [
			'https://www.linkedin.com/in/daniel-pol%C3%B2nio-19b081110/',
			'https://github.com/DanyZack',
		],
	};
}

export function publisher(): Graph {
	return {
		'@type': 'Organization',
		'@id': IDS.publisher,
		name: SITE_TITLE,
		url: abs('/'),
		logo: {
			'@type': 'ImageObject',
			url: abs('/tuneincloud.png'),
			width: 428,
			height: 303,
		},
		founder: { '@id': IDS.person },
	};
}

export function website(): Graph {
	return {
		'@type': 'WebSite',
		'@id': IDS.website,
		url: abs('/'),
		name: SITE_TITLE,
		description: "Blog d'expertise Microsoft (Intune, Entra ID, Defender, Purview, Copilot) en français, par Daniel POLÒNIO.",
		inLanguage: 'fr-FR',
		publisher: { '@id': IDS.publisher },
	};
}

export function homeGraph(): Graph {
	return {
		'@context': 'https://schema.org',
		'@graph': [website(), publisher(), person()],
	};
}

export function profileGraph(): Graph {
	const url = abs('/about/');
	return {
		'@context': 'https://schema.org',
		'@graph': [
			{
				'@type': 'ProfilePage',
				'@id': `${url}#profilepage`,
				url,
				name: 'À propos de Daniel POLÒNIO',
				inLanguage: 'fr-FR',
				isPartOf: { '@id': IDS.website },
				mainEntity: { '@id': IDS.person },
			},
			person(),
			website(),
			publisher(),
		],
	};
}

export function articleGraph(
	data: CollectionEntry<'blog'>['data'],
	pathname: string,
	fallbackImage: string,
): Graph {
	const url = abs(pathname);
	const image = abs(data.heroImage ?? fallbackImage);
	const category = data.category;
	return {
		'@context': 'https://schema.org',
		'@graph': [
			{
				'@type': 'BlogPosting',
				'@id': `${url}#article`,
				headline: data.title,
				description: data.description,
				image,
				datePublished: data.pubDate.toISOString(),
				dateModified: (data.updatedDate ?? data.pubDate).toISOString(),
				inLanguage: 'fr-FR',
				articleSection: CATEGORY_LABELS[category] ?? category,
				author: { '@id': IDS.person },
				publisher: { '@id': IDS.publisher },
				isPartOf: { '@id': IDS.website },
				mainEntityOfPage: { '@type': 'WebPage', '@id': url },
			},
			{
				'@type': 'BreadcrumbList',
				'@id': `${url}#breadcrumb`,
				itemListElement: [
					{ '@type': 'ListItem', position: 1, name: 'Accueil', item: abs('/') },
					{ '@type': 'ListItem', position: 2, name: 'Blog', item: abs('/blog/') },
					{
						'@type': 'ListItem',
						position: 3,
						name: CATEGORY_LABELS[category] ?? category,
						item: abs(`/blog/category/${category}/`),
					},
					{ '@type': 'ListItem', position: 4, name: data.title, item: url },
				],
			},
			person(),
			publisher(),
			website(),
		],
	};
}
