import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const listings = defineCollection({
  loader: glob({
    pattern: '**/*.md',
    base: './src/content/listings',
  }),
  schema: z.object({
    name: z.string(),
    url: z.string().url(),
    category: z.string(),
    price: z.string(),
    auditResults: z.array(
      z.object({
        item: z.string(),
        result: z.string(),
      }),
    ),
  }),
});

export const collections = { listings };
