const IMAGE_PATTERN = /!\[[^\]]*\]\(\s*([^\s)]+)(?:\s+"[^"]*")?\s*\)|<img\b[^>]*\bsrc=["']([^"']+)["']/i;

export function extractFirstImagePath(body: string): string | null {
  const match = IMAGE_PATTERN.exec(body);
  if (!match) return null;
  return match[1] ?? match[2] ?? null;
}
