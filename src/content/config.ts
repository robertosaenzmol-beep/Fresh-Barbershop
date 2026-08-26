import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title:       z.string(),
    date:        z.date(),
    category:    z.string(),
    excerpt:     z.string(),
    coverImage:  z.string().optional(),
  }),
});

export const collections = { blog };
