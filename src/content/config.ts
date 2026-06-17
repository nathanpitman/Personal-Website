import { defineCollection, z } from "astro:content";

const posts = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    source: z.string().optional(),
    archive: z.string().optional(),
    description: z.string().optional(),
    tags: z.array(z.string()).default([]),
    hidden: z.boolean().default(false),
    relatedPosts: z.array(z.object({
      slug: z.string(),
      source: z.enum(['manual', 'generated']).default('generated'),
    })).optional(),
    bluesky: z.string().url().optional(),
    mastodon: z.string().url().optional(),
  }),
});

const pages = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
  }),
});

const projects = defineCollection({
  type: "data",
  schema: z.array(z.object({
    title: z.string(),
    url: z.string().url(),
    description: z.string(),
    hidden: z.boolean().default(false),
  })),
});

const recommended = defineCollection({
  type: "data",
  schema: z.array(z.object({
    title: z.string(),
    url: z.string().url(),
    description: z.string(),
    hidden: z.boolean().default(false),
    type: z.enum(['blog', 'podcast', 'video']).default('blog'),
  })),
});

export const collections = { posts, pages, projects, recommended };
