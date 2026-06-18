import { describe, it, expect } from 'vitest';
import { parseMastodonUrl } from './mastodon';

describe('parseMastodonUrl', () => {
  it('extracts instance and status id from a standard status URL', () => {
    expect(parseMastodonUrl('https://mastodon.social/@nathanpitman/112345678901234567'))
      .toEqual({ instance: 'mastodon.social', statusId: '112345678901234567' });
  });

  it('extracts instance and status id when URL has a trailing slash', () => {
    expect(parseMastodonUrl('https://mastodon.social/@nathanpitman/112345678901234567/'))
      .toEqual({ instance: 'mastodon.social', statusId: '112345678901234567' });
  });

  it('returns null for a profile URL with no status segment', () => {
    expect(parseMastodonUrl('https://mastodon.social/@nathanpitman')).toBeNull();
  });

  it('returns null for an unrelated URL', () => {
    expect(parseMastodonUrl('https://example.com/foo')).toBeNull();
  });

  it('returns null for an empty string', () => {
    expect(parseMastodonUrl('')).toBeNull();
  });

  it('works with a different instance domain', () => {
    expect(parseMastodonUrl('https://fosstodon.org/@someone/998877'))
      .toEqual({ instance: 'fosstodon.org', statusId: '998877' });
  });
});
