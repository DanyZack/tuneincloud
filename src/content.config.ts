import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    heroImage: z.string().optional(),
    category: z.enum(['actualites', 'guides', 'dossiers']),
    subcategory: z.enum([
      // Actualités
      'breves',
      'articles',
      // Guides
      'entra',
      'intune',
      'defender',
      'purview',
      'ia',
      'autre',
    ]).optional(),
  }),
});

export const collections = { blog };