export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

export function stripDatePrefix(slug: string): string {
  return slug.replace(/^\d{4}-\d{2}-\d{2}-/, '');
}
