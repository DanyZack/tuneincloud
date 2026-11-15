// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig, fontProviders } from 'astro/config';
import { readdirSync, readFileSync } from 'node:fs';

// Frontmatter minimal des articles, lu au build pour le sitemap
// (lastmod et exclusion des pages catégorie vides).
const BLOG_DIR = new URL('./src/content/blog/', import.meta.url);
const posts = readdirSync(BLOG_DIR)
	.filter((f) => /\.(md|mdx)$/.test(f))
	.map((f) => {
		const fm = readFileSync(new URL(f, BLOG_DIR), 'utf8').split(/^---\s*$/m)[1] ?? '';
		const field = (k) => fm.match(new RegExp(`^${k}:\\s*["']?([^"'\\r\\n]+)`, 'm'))?.[1]?.trim();
		const date = field('updatedDate') ?? field('pubDate');
		return {
			id: f.replace(/\.(md|mdx)$/, '').toLowerCase(),
			category: field('category'),
			subcategory: field('subcategory'),
			lastmod: date ? new Date(date) : undefined,
		};
	});

const latest = (list) =>
	list.reduce((max, p) => (p.lastmod && (!max || p.lastmod > max) ? p.lastmod : max), undefined);

// Articles couverts par une URL du site (undefined = page hors blog).
function postsFor(pathname) {
	const article = pathname.match(/^\/blog\/([^/]+)\/$/);
	if (article && article[1] !== 'category') return posts.filter((p) => p.id === article[1]);
	const cat = pathname.match(/^\/blog\/category\/([^/]+)\/(?:([^/]+)\/)?$/);
	if (cat) return posts.filter((p) => p.category === cat[1] && (!cat[2] || p.subcategory === cat[2]));
	if (pathname === '/' || pathname === '/blog/') return posts;
	return undefined;
}

// https://astro.build/config
export default defineConfig({
	site: 'https://tuneincloud.fr',
	integrations: [
		mdx(),
		sitemap({
			// Exclut les pages catégorie sans article (noindex)
			filter: (page) => {
				const list = postsFor(new URL(page).pathname);
				return list === undefined || list.length > 0;
			},
			serialize: (item) => {
				const list = postsFor(new URL(item.url).pathname);
				const lastmod = list && latest(list);
				if (lastmod) item.lastmod = lastmod.toISOString();
				return item;
			},
		}),
	],
	fonts: [
		{
			provider: fontProviders.local(),
			name: 'Atkinson',
			cssVariable: '--font-atkinson',
			fallbacks: ['sans-serif'],
			options: {
				variants: [
					{
						src: ['./src/assets/fonts/atkinson-regular.woff'],
						weight: 400,
						style: 'normal',
						display: 'swap',
					},
					{
						src: ['./src/assets/fonts/atkinson-bold.woff'],
						weight: 700,
						style: 'normal',
						display: 'swap',
					},
				],
			},
		},
	],
});
