import { describe, it, expect } from 'vitest';
import { readdirSync, readFileSync, existsSync } from 'fs';
import { join, basename } from 'path';
import matter from 'gray-matter';
import { slugify } from './slugify';
import { parseSourceUrl, parseSourceId } from './routing';

const POSTS_DIR = join(process.cwd(), 'src/content/posts');
const MIN_POST_COUNT = 430;

interface PostData {
  slug: string;
  file: string;
  data: {
    title?: string;
    date?: unknown;
    source?: string;
    tags?: string[];
    hidden?: boolean;
  };
}

function loadPosts(): PostData[] {
  const files = readdirSync(POSTS_DIR).filter(f => f.endsWith('.md'));
  return files.map(file => {
    const raw = readFileSync(join(POSTS_DIR, file), 'utf-8');
    const { data } = matter(raw);
    const slug = basename(file, '.md');
    return { slug, file, data };
  });
}

describe('content integrity', () => {
  let posts: PostData[];

  // Load once and share across tests
  try {
    posts = loadPosts();
  } catch {
    posts = [];
  }

  it(`has at least ${MIN_POST_COUNT} posts`, () => {
    expect(posts.length).toBeGreaterThanOrEqual(MIN_POST_COUNT);
  });

  it('no two visible posts share a slug', () => {
    const visible = posts.filter(p => !p.data.hidden);
    const seen = new Map<string, string>(); // slug → filename
    const duplicates: string[] = [];

    for (const post of visible) {
      if (seen.has(post.slug)) {
        duplicates.push(`"${post.slug}": ${seen.get(post.slug)} and ${post.file}`);
      } else {
        seen.set(post.slug, post.file);
      }
    }

    expect(duplicates).toEqual([]);
  });

  it('all posts have a non-empty title', () => {
    const missing = posts.filter(p => !p.data.title || typeof p.data.title !== 'string').map(p => p.file);
    expect(missing).toEqual([]);
  });

  it('all posts have a parseable date', () => {
    const invalid = posts
      .filter(p => {
        if (!p.data.date) return true;
        const d = new Date(p.data.date as string);
        return isNaN(d.getTime());
      })
      .map(p => p.file);
    expect(invalid).toEqual([]);
  });

  it('all source URLs that exist match the expected pattern', () => {
    const failing: string[] = [];

    for (const post of posts) {
      if (!post.data.source) continue;
      const result = parseSourceUrl(post.data.source);
      if (!result) {
        failing.push(`${post.file}: "${post.data.source}"`);
      }
    }

    expect(failing).toEqual([]);
  });

  it('source IDs are unique across all posts', () => {
    const seen = new Map<string, string>(); // id → filename
    const duplicates: string[] = [];

    for (const post of posts) {
      if (!post.data.source) continue;
      const parsed = parseSourceUrl(post.data.source);
      if (!parsed) continue;

      if (seen.has(parsed.id)) {
        duplicates.push(`ID ${parsed.id}: ${seen.get(parsed.id)} and ${post.file}`);
      } else {
        seen.set(parsed.id, post.file);
      }
    }

    expect(duplicates).toEqual([]);
  });

  it('all tags produce non-empty slugs', () => {
    const badTags: string[] = [];
    const seen = new Set<string>();

    for (const post of posts) {
      for (const tag of (post.data.tags ?? [])) {
        if (seen.has(tag)) continue;
        seen.add(tag);
        if (!slugify(tag)) {
          badTags.push(`"${tag}" in ${post.file}`);
        }
      }
    }

    expect(badTags).toEqual([]);
  });

  it('no slug is an empty string', () => {
    const empty = posts.filter(p => !p.slug).map(p => p.file);
    expect(empty).toEqual([]);
  });
});

describe('legacy ?id=NNN redirect map', () => {
  // Reconstruct the idMap exactly as 404.astro does at build time,
  // so tests break if the mapping logic drifts from the real content.
  const posts = loadPosts();
  const idMap: Record<string, string> = {};
  for (const post of posts) {
    if (post.data.hidden) continue;
    const id = parseSourceId(post.data.source);
    if (!id) continue;
    idMap[id] = post.slug;
  }

  it('covers all visible posts that have a source URL', () => {
    const visibleWithSource = posts.filter(p => !p.data.hidden && p.data.source);
    expect(Object.keys(idMap).length).toBe(visibleWithSource.length);
  });

  it('does not include hidden posts', () => {
    const hiddenIds = posts
      .filter(p => p.data.hidden && p.data.source)
      .map(p => parseSourceId(p.data.source))
      .filter(Boolean);

    for (const id of hiddenIds) {
      expect(idMap).not.toHaveProperty(id as string);
    }
  });

  it('every mapped slug exists as a post file', () => {
    const missing: string[] = [];
    for (const [id, slug] of Object.entries(idMap)) {
      if (!existsSync(join(POSTS_DIR, `${slug}.md`))) {
        missing.push(`id=${id} → "${slug}" has no matching file`);
      }
    }
    expect(missing).toEqual([]);
  });

  // Spot-checks using the real-world examples from the original issue
  it('?id=629 redirects to the-tools-of-my-trade', () => {
    expect(idMap['629']).toBe('the-tools-of-my-trade');
  });

  it('?id=220 redirects to the-ipod-remixed-again', () => {
    expect(idMap['220']).toBe('the-ipod-remixed-again');
  });
});
