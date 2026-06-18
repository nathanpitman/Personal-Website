import { describe, it, expect } from 'vitest';
import { parseBlueskyRkey, buildAtUri } from './bluesky';

describe('parseBlueskyRkey', () => {
  it('extracts rkey from a standard bsky.app post URL', () => {
    expect(parseBlueskyRkey('https://bsky.app/profile/nathanpitman.com/post/3k2abcxyz123'))
      .toBe('3k2abcxyz123');
  });

  it('extracts rkey when URL has a trailing slash', () => {
    expect(parseBlueskyRkey('https://bsky.app/profile/nathanpitman.com/post/3k2abcxyz123/'))
      .toBe('3k2abcxyz123');
  });

  it('returns null for a profile URL with no post segment', () => {
    expect(parseBlueskyRkey('https://bsky.app/profile/nathanpitman.com')).toBeNull();
  });

  it('returns null for an unrelated URL', () => {
    expect(parseBlueskyRkey('https://example.com/foo')).toBeNull();
  });

  it('returns null for an empty string', () => {
    expect(parseBlueskyRkey('')).toBeNull();
  });
});

describe('buildAtUri', () => {
  it('builds an AT-URI from a post URL and DID', () => {
    expect(buildAtUri('https://bsky.app/profile/nathanpitman.com/post/3k2abcxyz123', 'did:plc:test123'))
      .toBe('at://did:plc:test123/app.bsky.feed.post/3k2abcxyz123');
  });

  it('returns null when the URL has no parseable rkey', () => {
    expect(buildAtUri('https://bsky.app/profile/nathanpitman.com', 'did:plc:test123')).toBeNull();
  });

  it('uses the default DID constant when none is supplied', () => {
    expect(buildAtUri('https://bsky.app/profile/nathanpitman.com/post/abc')).toMatch(/^at:\/\/did:/);
  });
});
