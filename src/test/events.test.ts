import { describe, expect, it } from 'vitest';
import { applyEventBatch, emptyEventState, generateEvents, summarizeEvents } from '../lib/events';

describe('event orchestration', () => {
  it('accepts 15,000 unique events and ignores a replay idempotently', () => {
    const initial = applyEventBatch(emptyEventState(), generateEvents(15_000));
    const replayed = applyEventBatch(initial, generateEvents(500));
    expect(replayed.byId).toHaveLength(15_000);
    expect(replayed.duplicates).toBe(500);
    expect(replayed.cursor).toBe(15_000);
  });
  it('allows a higher-sequence correction without duplicating order', () => {
    const envelope = generateEvents(1);
    const initial = applyEventBatch(emptyEventState(), envelope);
    const correction = { ...envelope, cursor: 2, events: [{ ...envelope.events[0], sequence: 2, value: 99 }] };
    const updated = applyEventBatch(initial, correction);
    expect(updated.byId.get('evt-1')?.value).toBe(99);
    expect(updated.order).toEqual(['evt-1']);
  });
  it('summarizes severity and sources', () => {
    expect(summarizeEvents(applyEventBatch(emptyEventState(), generateEvents(20)))).toEqual({ total: 20, critical: 5, warning: 5, sources: 5 });
  });
  it.each([0, 1, 10, 120])('generates a valid envelope of %i events', (count) => {
    const result = generateEvents(count);
    expect(result.events).toHaveLength(count);
    expect(result.cursor).toBe(count);
  });
});
