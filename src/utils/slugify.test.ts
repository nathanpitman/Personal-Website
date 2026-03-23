import { describe, it, expect } from 'vitest';
import { slugify, stripDatePrefix } from './slugify';

describe('slugify', () => {
  it('lowercases and hyphenates words', () => {
    expect(slugify('Hello World')).toBe('hello-world');
  });

  it('leaves already-lowercase single words unchanged', () => {
    expect(slugify('hello')).toBe('hello');
  });

  it('collapses multiple spaces into one hyphen', () => {
    expect(slugify('foo  bar')).toBe('foo-bar');
  });

  it('strips special characters', () => {
    expect(slugify('foo & bar')).toBe('foo-bar');
  });

  it('handles slash in tag (e.g. Marketing/Advertising)', () => {
    expect(slugify('Marketing/Advertising')).toBe('marketing-advertising');
  });

  it('strips leading and trailing hyphens', () => {
    expect(slugify('-foo-')).toBe('foo');
  });

  it('preserves numbers', () => {
    expect(slugify('web 2.0')).toBe('web-2-0');
  });

  it('handles empty string', () => {
    expect(slugify('')).toBe('');
  });

  it('handles all-uppercase', () => {
    expect(slugify('AI')).toBe('ai');
  });

  it('handles tags with parentheses', () => {
    expect(slugify('store (?)')).toBe('store');
  });
});

describe('stripDatePrefix', () => {
  it('strips a standard YYYY-MM-DD- prefix', () => {
    expect(stripDatePrefix('2003-05-14-some-slug')).toBe('some-slug');
  });

  it('leaves a slug with no date prefix unchanged', () => {
    expect(stripDatePrefix('rediscovering-making-things')).toBe('rediscovering-making-things');
  });

  it('handles the case where only the prefix remains', () => {
    expect(stripDatePrefix('2003-05-14-')).toBe('');
  });

  it('does not strip a partial date (missing day)', () => {
    expect(stripDatePrefix('2003-05-something')).toBe('2003-05-something');
  });

  it('does not strip a date that appears mid-slug', () => {
    expect(stripDatePrefix('foo-2003-05-14-bar')).toBe('foo-2003-05-14-bar');
  });

  it('handles empty string', () => {
    expect(stripDatePrefix('')).toBe('');
  });

  it('handles a 2026 date prefix (future posts)', () => {
    expect(stripDatePrefix('2026-03-15-back-from-the-dead')).toBe('back-from-the-dead');
  });
});
