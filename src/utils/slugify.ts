export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

export function displayTag(tag: string): string {
  if (!tag) return tag;
  // Preserve all-caps tags (e.g. "AI", "PHP", "CSS")
  if (/^[A-Z0-9]+$/.test(tag)) return tag;
  return tag.charAt(0).toUpperCase() + tag.slice(1).toLowerCase();
}

export function stripDatePrefix(slug: string): string {
  return slug.replace(/^\d{4}-\d{2}-\d{2}-/, '');
}
