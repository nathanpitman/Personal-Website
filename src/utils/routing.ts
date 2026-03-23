/**
 * Parses a legacy source URL like "http://nathanpitman.com/629/the-tools-of-my-trade"
 * into its numeric ID and legacy slug components.
 * Returns null if the URL does not match the expected pattern.
 */
export function parseSourceUrl(url: string | undefined | null): { id: string; legacySlug: string } | null {
  if (!url) return null;
  const match = url.match(/nathanpitman\.com\/(\d+)\/(.+?)(?:\/)?$/);
  if (!match) return null;
  return { id: match[1], legacySlug: match[2] };
}

/**
 * Extracts just the numeric ID from a legacy source URL.
 * Used to build the ?id=NNN → slug map for 404.astro.
 * Returns null if the URL does not match.
 */
export function parseSourceId(url: string | undefined | null): string | null {
  return parseSourceUrl(url)?.id ?? null;
}
