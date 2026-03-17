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
  type: "content",
  schema: z.object({
    title: z.string(),
    url: z.url(),
    description: z.string().optional(),
    hidden: z.boolean().default(false),
  }),
});

export const collections = { posts, pages, projects };
