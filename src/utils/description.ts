import type { CollectionEntry } from 'astro:content';

export function extractFirstParagraph(body: string): string {
  const stripped = body.replace(/^---[\s\S]*?---\s*/, '');
  const lines = stripped.split('\n');
  let paragraph = '';
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) {
      if (paragraph) break;
      continue;
    }
    if (trimmed.startsWith('#') || trimmed.startsWith('![') || trimmed.startsWith('<')) continue;
    paragraph += (paragraph ? ' ' : '') + trimmed;
  }
  const cleaned = paragraph
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/\\[*_`~[\]]/g, '')
    .replace(/[*_`~]+/g, '')
    .replace(/\s+/g, ' ')
    .trim();
  if (cleaned.length <= 160) return cleaned;
  return cleaned.slice(0, 157).replace(/\s+\S*$/, '') + '...';
}

export function getDescription(post: CollectionEntry<'posts'>): string {
  return post.data.description || extractFirstParagraph(post.body ?? '');
}
