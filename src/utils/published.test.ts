import { describe, it, expect, vi, afterEach } from 'vitest';
import { isPublished } from './published';

function makePost(overrides: { hidden?: boolean; date: Date }) {
  return { data: { hidden: false, ...overrides } } as any;
}

describe('isPublished', () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it('is true for a post dated today or earlier', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-08-29T12:00:00Z'));

    expect(isPublished(makePost({ date: new Date('2026-08-29T00:00:00Z') }))).toBe(true);
    expect(isPublished(makePost({ date: new Date('2026-07-31T00:00:00Z') }))).toBe(true);
  });

  it('is false for a post dated in the future', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-08-29T12:00:00Z'));

    expect(isPublished(makePost({ date: new Date('2026-08-31T00:00:00Z') }))).toBe(false);
  });

  it('is false for a hidden post even if its date has passed', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-08-29T12:00:00Z'));

    expect(isPublished(makePost({ hidden: true, date: new Date('2026-01-01T00:00:00Z') }))).toBe(false);
  });
});
