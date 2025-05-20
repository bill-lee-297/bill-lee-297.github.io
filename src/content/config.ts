import { defineCollection, z } from 'astro:content';

const infoCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    subtitle: z.string(),
    skills: z.array(z.string()),
    experiences: z.array(
      z.object({
        company: z.string(),
        period: z.string(),
        role: z.string(),
      })
    ),
  }),
});

export const collections = {
  'info': infoCollection,
}; 