import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    heroImage: z.string().optional(),
    category: z.enum([
      'windows',
      'ios',
      'android',
      'macos',
      'securite',
      'autre'
    ]).default('autre'),
  }),
});

export const collections = { blog };