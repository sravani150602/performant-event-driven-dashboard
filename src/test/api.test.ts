import { describe, expect, it } from 'vitest';
import { fetchEvents } from '../lib/api';

describe('event API client', () => {
  it('returns a cursor-aware normalized event envelope', async () => {
    const result = await fetchEvents(40, 3);
    expect(result.cursor).toBe(43);
    expect(result.events.map((event) => event.id)).toEqual(['evt-41', 'evt-42', 'evt-43']);
  });
});
