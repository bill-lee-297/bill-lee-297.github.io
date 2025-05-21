import { glob } from 'astro/loaders';
import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  // Load Markdown and MDX files in the `src/content/blog/` directory.
  loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
  // Type-check frontmatter using a schema
  schema: z.object({
    title: z.string(),
    description: z.string(),
    // Transform string to Date object
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    heroImage: z.string().optional(),
  }),
});

const info = defineCollection({
  loader: glob({ base: './src/content/info', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    title: z.string(),
    subtitle: z.string(),
    skills: z.array(z.string()),
    links: z.array(z.object({
      title: z.string(),
      link: z.string(),
    })),
    experiences: z.array(z.object({
      company: z.string(),
      period: z.string(),
      role: z.string(),
    })),
  }),
});

export const collections = { blog, info };
