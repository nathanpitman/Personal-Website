# Follow-up Tasks

## Astro 5 — Full Content Layer Migration

**Context:** The site was upgraded from Astro 4 to Astro 5 using the `legacy.collections: true` flag in `astro.config.mjs`. This preserves all existing Content Collections behaviour (`post.slug`, `await post.render()`, `src/content/config.ts`) but is explicitly deprecated by Astro and will be removed in a future major version. The work below migrates to the native Content Layer API.

**Trigger for this work:** `@bryanguffey/astro-standard-site@1.0.3` required Astro 5, prompting the upgrade.

---

### Step 1 — Move and rewrite the content config

**File:** `src/content/config.ts` → `src/content.config.ts` (move to `src/`, out of `src/content/`)

Replace `type: "content"` / `type: "data"` with `loader: glob(...)`:

```ts
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const posts = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/posts' }),
  schema: z.object({ /* unchanged */ }),
});

const pages = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/pages' }),
  schema: z.object({ /* unchanged */ }),
});

const projects = defineCollection({
  loader: glob({ pattern: '*.json', base: './src/content/projects' }),
  schema: z.array(z.object({ /* unchanged */ })),
});

const recommended = defineCollection({
  loader: glob({ pattern: '*.json', base: './src/content/recommended' }),
  schema: z.array(z.object({ /* unchanged */ })),
});

export const collections = { posts, pages, projects, recommended };
```

**Warning on IDs:** By default `glob` sets `id` to the filename including extension (e.g. `my-post.md`). Add a `generateId` transform to strip `.md` and preserve URL compatibility:

```ts
loader: glob({
  pattern: '**/*.md',
  base: './src/content/posts',
  generateId: ({ entry }) => entry.replace(/\.md$/, ''),
}),
```

This is critical — without it all 430 post URLs break. Verify with `astro build` and spot-check against `post.id` values before deploying.

---

### Step 2 — Replace `post.slug` with `post.id`

`post.slug` no longer exists on Content Layer entries. Replace every use:

| File | What to change |
|------|----------------|
| `src/pages/posts/[...slug].astro` | `params: { slug: post.slug }` → `params: { slug: post.id }`; `post.slug` in redirect path, URL construction, JSON-LD |
| `src/pages/index.astro` | `post.slug` in `<a href>` and render call |
| `src/pages/tag/[tag].astro` | `post.slug` in `<a href>` |
| `src/pages/archives.astro` | `post.slug` in URL construction |
| `src/pages/feed.xml.ts` | `post.slug` in `link` field |
| `src/pages/feed.json.ts` | `post.slug` in `id` and `url` fields |
| `src/components/SidebarRelated.astro` | `postMap` key built from `p.slug` → `p.id`; `relatedPosts` items are matched by slug so also update `scripts/generate-related-posts.mjs` to write `id` values |

Also audit `scripts/generate-related-posts.mjs` and `scripts/generate-descriptions.ts` — both read/write `slug` values embedded in frontmatter (`relatedPosts[].slug`). Either rename the frontmatter field to `id`, or keep it as `slug` and note that it's a user-defined field (not the Astro-generated one).

---

### Step 3 — Replace `await post.render()` with `render(post)`

In Astro 5 Content Layer, `render` is a named import from `astro:content`:

```ts
import { render } from 'astro:content';
// ...
const { Content } = await render(post);
```

Files to update:

- `src/pages/posts/[...slug].astro`
- `src/pages/index.astro`
- `src/pages/tag/[tag].astro`

---

### Step 4 — Remove the legacy flag

Once steps 1–3 are done and the build passes with all URLs intact, remove from `astro.config.mjs`:

```js
legacy: {
  collections: true,
},
```

---

### Step 5 — Smoke-test URL preservation

URL preservation is a hard constraint (see CLAUDE.md). After the migration:

1. Run `astro build`
2. Spot-check at least 5 canonical post slugs: confirm `dist/posts/<slug>/index.html` exists
3. Check that the redirect paths (`YYYY-MM-DD-<slug>`) also generate correctly
4. Validate the RSS and JSON feeds reference correct URLs
5. Check the Pagefind index still works (search for a known post title)

---

### Notes

- `post.body` is still available on glob-loader entries — no changes needed there.
- `src/env.d.ts` triple-slash reference (`/// <reference types="astro/client" />`) should be fine as-is.
- `@astrojs/rss` and `@astrojs/sitemap` have no peer dep constraints — they will continue to work.
- `astro-pagefind` was upgraded to v2.0.0 (Astro 5 compatible) as part of the initial upgrade.
