import { describe, it, expect } from 'vitest';
import { parseSourceUrl, parseSourceId } from './routing';

describe('parseSourceUrl', () => {
  it('parses a standard source URL', () => {
    expect(parseSourceUrl('http://nathanpitman.com/147/hi-today-i-get-married')).toEqual({
      id: '147',
      legacySlug: 'hi-today-i-get-married',
    });
  });

  it('parses a three-digit ID', () => {
    expect(parseSourceUrl('http://nathanpitman.com/629/the-tools-of-my-trade')).toEqual({
      id: '629',
      legacySlug: 'the-tools-of-my-trade',
    });
  });

  it('parses a single-digit ID', () => {
    const result = parseSourceUrl('http://nathanpitman.com/8/fun-post');
    expect(result).toEqual({ id: '8', legacySlug: 'fun-post' });
  });

  it('parses a very short slug (real post: /463/i)', () => {
    expect(parseSourceUrl('http://nathanpitman.com/463/i')).toEqual({
      id: '463',
      legacySlug: 'i',
    });
  });

  it('handles a URL with a trailing slash', () => {
    expect(parseSourceUrl('http://nathanpitman.com/147/hi-today-i-get-married/')).toEqual({
      id: '147',
      legacySlug: 'hi-today-i-get-married',
    });
  });

  it('returns null for undefined', () => {
    expect(parseSourceUrl(undefined)).toBeNull();
  });

  it('returns null for null', () => {
    expect(parseSourceUrl(null)).toBeNull();
  });

  it('returns null for an empty string', () => {
    expect(parseSourceUrl('')).toBeNull();
  });

  it('returns null for a non-matching URL', () => {
    expect(parseSourceUrl('https://example.com/foo/bar')).toBeNull();
  });

  it('returns null when there is no slug segment after the ID', () => {
    // /147/ has no slug — (.+?) requires at least one character
    expect(parseSourceUrl('http://nathanpitman.com/147/')).toBeNull();
  });

  it('handles the archived URL format with :80 port', () => {
    // Archive URLs sometimes include :80 — these don't appear in source fields
    // but confirm the regex is anchored to the path, not the domain
    expect(parseSourceUrl('http://nathanpitman.com:80/629/the-tools-of-my-trade')).toBeNull();
  });
});

describe('parseSourceId', () => {
  it('extracts the numeric ID from a standard URL', () => {
    expect(parseSourceId('http://nathanpitman.com/147/hi-today-i-get-married')).toBe('147');
  });

  it('extracts a single-digit ID', () => {
    expect(parseSourceId('http://nathanpitman.com/8/fun-post')).toBe('8');
  });

  it('extracts ID even with a short slug', () => {
    expect(parseSourceId('http://nathanpitman.com/463/i')).toBe('463');
  });

  it('returns null for undefined', () => {
    expect(parseSourceId(undefined)).toBeNull();
  });

  it('returns null for null', () => {
    expect(parseSourceId(null)).toBeNull();
  });

  it('returns null for a non-matching URL', () => {
    expect(parseSourceId('https://example.com/foo')).toBeNull();
  });
});

