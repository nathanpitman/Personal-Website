export interface MastodonRef {
  instance: string;
  statusId: string;
}

export function parseMastodonUrl(url: string): MastodonRef | null {
  const match = url.match(/^https?:\/\/([^/]+)\/@[^/]+\/(\d+)\/?$/);
  return match ? { instance: match[1], statusId: match[2] } : null;
}
