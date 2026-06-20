import { describe, it, expect } from 'vitest';
import { extractFirstImagePath } from './og-image';

describe('extractFirstImagePath', () => {
  it('extracts a markdown image path', () => {
    expect(extractFirstImagePath('some text\n\n![alt text](/images/15.jpg)\n\nmore text'))
      .toBe('/images/15.jpg');
  });

  it('extracts a markdown image path with a title', () => {
    expect(extractFirstImagePath('![alt text](/images/15.jpg "A title")'))
      .toBe('/images/15.jpg');
  });

  it('extracts an html img src', () => {
    expect(extractFirstImagePath('<img src="/images/img-1741.jpg" alt="x" width="460" />'))
      .toBe('/images/img-1741.jpg');
  });

  it('extracts an html img src with single quotes', () => {
    expect(extractFirstImagePath("<img src='/images/img-1741.jpg' alt='x' />"))
      .toBe('/images/img-1741.jpg');
  });

  it('returns the earliest occurring image regardless of syntax', () => {
    const body = 'text <img src="/images/first.jpg" /> more ![alt](/images/second.jpg)';
    expect(extractFirstImagePath(body)).toBe('/images/first.jpg');
  });

  it('returns the earliest occurring image when markdown comes first', () => {
    const body = '![alt](/images/first.jpg) text <img src="/images/second.jpg" />';
    expect(extractFirstImagePath(body)).toBe('/images/first.jpg');
  });

  it('extracts a relative asset path', () => {
    expect(extractFirstImagePath('![screenshot](../../assets/posts/foo/bar.png)'))
      .toBe('../../assets/posts/foo/bar.png');
  });

  it('extracts an external https image url', () => {
    expect(extractFirstImagePath('![alt](https://upload.wikimedia.org/foo.png)'))
      .toBe('https://upload.wikimedia.org/foo.png');
  });

  it('returns null when there is no image', () => {
    expect(extractFirstImagePath('just some text with no images at all')).toBeNull();
  });

  it('returns null for an empty body', () => {
    expect(extractFirstImagePath('')).toBeNull();
  });
});
