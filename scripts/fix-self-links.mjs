/**
 * Fixes self-referential links to the old nathanpitman.com URL structure.
 *
 * Old format:  http://nathanpitman.com/131/slug
 *              http://nathanpitman.com/journal/32/slug
 * New format:  https://nathanpitman.com/posts/slug
 *
 * Run: node scripts/fix-self-links.mjs [--dry-run]
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const POSTS_DIR = path.resolve(__dirname, '../src/content/posts');
const DRY_RUN = process.argv.includes('--dry-run');

// Build current slug set from post filenames
const postFiles = fs.readdirSync(POSTS_DIR).filter(f => f.endsWith('.md'));
const slugSet = new Set(postFiles.map(f => f.replace(/\.md$/, '')));

// Also build a normalized slug map for fuzzy matching
// Key: slug with hyphens condensed around numbers (e.g. "firefox-0-9" → "firefox-09")
function normalizeSlug(s) {
  return s.toLowerCase()
    .replace(/-(\d)-/g, (_, n) => `-${n}`) // strip isolated digit hyphens
    .replace(/-+/g, '-');
}
const normalizedMap = new Map(); // normalized → original slug
for (const slug of slugSet) {
  normalizedMap.set(normalizeSlug(slug), slug);
}

// Explicit slug rewrites for known renames (old slug → current slug)
const KNOWN_RENAMES = {
  'going-it-alone-john-oxton':   '10-questions-for-john-oxton-going-it-alone',
  'going-it-alone-paul-farnell': '10-questions-for-paul-farnell-going-it-alone',
  'going-it-alone-craig-grannell': '10-questions-for-craig-grannell-going-it-alone',
  'going-it-alone-darren-miller': '10-questions-for-darren-miller-going-it-alone',
  'going-it-alone-david-longworth': '10-questions-for-david-longworth-going-it-alone',
  'going-it-alone-jon-hicks':    '10-questions-for-jon-hicks-going-it-alone',
};

function resolveSlug(rawSlug) {
  if (!rawSlug) return null;
  const slug = rawSlug.toLowerCase().replace(/'+$/, '').trim();

  // 1. Exact match
  if (slugSet.has(slug)) return slug;

  // 2. Known rename
  if (KNOWN_RENAMES[slug]) return KNOWN_RENAMES[slug];

  // 3. Truncated slug — old URL has full title but filename was truncated at ~60 chars
  //    Find slug that starts with the first 55 chars of the URL slug
  if (slug.length > 55) {
    const prefix = slug.slice(0, 55);
    const match = [...slugSet].find(s => s.startsWith(prefix.slice(0, 50)));
    if (match) return match;
  }
  // Also try: current slug starts with URL slug (URL was the truncated one)
  {
    const match = [...slugSet].find(s => s.startsWith(slug.slice(0, 50)));
    if (match && match.length >= slug.length - 5) return match;
  }

  // 4. Normalized number-hyphen match (e.g. firefox-09 ↔ firefox-0-9)
  const norm = normalizeSlug(slug);
  if (normalizedMap.has(norm)) return normalizedMap.get(norm);

  // 5. Partial prefix (last-resort for long slugs)
  const slug55 = slug.slice(0, 55);
  const prefixMatch = [...slugSet].find(s => {
    const s55 = s.slice(0, 55);
    return s55 === slug55;
  });
  if (prefixMatch) return prefixMatch;

  return null;
}

// Regex to find old nathanpitman.com links (handles both http and https, with or without www)
// Captures: full URL match
const OLD_URL_PATTERN = /https?:\/\/(www\.)?nathanpitman\.com(?:\/[^\s)"<>\]]*)?/g;

function extractOldSlug(url) {
  // Pattern: /NNN/slug
  let m = url.match(/\/\d+\/([a-z0-9-]+[a-z0-9])(?:\s*'?$)?/i);
  if (m) return m[1];
  // Pattern: /journal/NNN/slug
  m = url.match(/\/journal\/\d+\/([a-z0-9-]+[a-z0-9])(?:\s*'?$)?/i);
  if (m) return m[1];
  // Pattern: /journal/slug (no ID)
  m = url.match(/\/journal\/([a-z][a-z0-9-]+[a-z0-9])(?:\s*'?$)?/i);
  if (m) return m[1];
  return null;
}

let totalFilesChanged = 0;
let totalReplacementsApplied = 0;
let totalSkipped = 0;
const skippedUrls = [];

for (const file of postFiles.sort()) {
  const filePath = path.join(POSTS_DIR, file);
  const original = fs.readFileSync(filePath, 'utf8');

  // Split into frontmatter and body — only replace URLs in the markdown body,
  // not in the YAML frontmatter (source/archive are provenance fields).
  const fmMatch = original.match(/^---\n([\s\S]*?\n)---\n([\s\S]*)$/);
  if (!fmMatch) continue;
  const [, frontmatter, body] = fmMatch;

  let updatedBody = body;
  let fileChanged = false;
  let fileReplacements = 0;

  // Find all old nathanpitman.com URLs in the body only
  const matches = [...body.matchAll(OLD_URL_PATTERN)];
  if (matches.length === 0) continue;

  for (const match of matches) {
    const oldUrl = match[0].replace(/[.,;:!?']+$/, ''); // strip trailing punctuation
    const oldSlug = extractOldSlug(oldUrl);
    const newSlug = resolveSlug(oldSlug);

    if (newSlug) {
      const newUrl = `https://nathanpitman.com/posts/${newSlug}`;
      if (oldUrl !== newUrl && updatedBody.includes(oldUrl)) {
        updatedBody = updatedBody.split(oldUrl).join(newUrl);
        fileReplacements++;
        totalReplacementsApplied++;
        if (DRY_RUN) {
          console.log(`[DRY] ${file}: ${oldUrl} → ${newUrl}`);
        }
      }
    } else {
      // Can't resolve — record it
      const alreadyRecorded = skippedUrls.some(s => s.url === oldUrl);
      if (!alreadyRecorded) {
        skippedUrls.push({ url: oldUrl, file });
        totalSkipped++;
      }
    }
  }

  if (fileReplacements > 0) {
    totalFilesChanged++;
    fileChanged = true;
    if (!DRY_RUN) {
      const rebuilt = `---\n${frontmatter}---\n${updatedBody}`;
      fs.writeFileSync(filePath, rebuilt, 'utf8');
    }
    if (!DRY_RUN) {
      console.log(`Updated ${file}: ${fileReplacements} replacement(s)`);
    }
  }
}

console.log('\n=== Self-link fix summary ===');
console.log(`Files changed:      ${totalFilesChanged}`);
console.log(`Links updated:      ${totalReplacementsApplied}`);
console.log(`Unresolvable URLs:  ${totalSkipped}`);

if (skippedUrls.length > 0) {
  console.log('\nUnresolvable self-links (file resources, unmapped posts, etc.):');
  for (const { url, file } of skippedUrls) {
    console.log(`  ${file}: ${url}`);
  }
}
