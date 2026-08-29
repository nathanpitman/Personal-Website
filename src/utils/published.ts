import type { CollectionEntry } from 'astro:content';

/**
 * A post counts as published once it's not hidden and its `date` has
 * arrived (i.e. is not in the future). Used to keep posts dated ahead of
 * time (e.g. a monthly log finished early and merged before month end)
 * out of listings, feeds, tag pages, and their own page until that date.
 *
 * The site only rebuilds on push plus a daily scheduled run (see
 * .github/workflows/deploy.yml), so a post becomes visible on the first
 * build that happens on or after its date — not necessarily the instant
 * the date turns over.
 */
export function isPublished(post: CollectionEntry<'posts'>): boolean {
  return !post.data.hidden && post.data.date.getTime() <= Date.now();
}
