import type { EventEnvelope, EventSeverity, EventState, StreamEvent } from '../types';

export const emptyEventState = (): EventState => ({ byId: new Map(), order: [], cursor: 0, duplicates: 0 });

export function applyEventBatch(state: EventState, envelope: EventEnvelope): EventState {
  const byId = new Map(state.byId);
  const order = [...state.order];
  let duplicates = state.duplicates;
  for (const event of envelope.events) {
    const existing = byId.get(event.id);
    if (existing && existing.sequence >= event.sequence) { duplicates += 1; continue; }
    byId.set(event.id, event);
    if (!existing) order.unshift(event.id);
  }
  return { byId, order, duplicates, cursor: Math.max(state.cursor, envelope.cursor) };
}

export function generateEvents(count: number, offset = 0): EventEnvelope {
  const severities: EventSeverity[] = ['info', 'info', 'warning', 'critical'];
  const sources = ['checkout', 'identity', 'search', 'delivery', 'payments'];
  const events: StreamEvent[] = Array.from({ length: count }, (_, index) => {
    const sequence = offset + index + 1;
    return {
      id: `evt-${sequence}`,
      sequence,
      source: sources[sequence % sources.length],
      category: sequence % 3 === 0 ? 'conversion' : sequence % 3 === 1 ? 'traffic' : 'reliability',
      severity: severities[sequence % severities.length],
      message: `Consumer event ${sequence.toLocaleString('en-US')} processed`,
      timestamp: new Date(1_735_689_600_000 + sequence * 1_000).toISOString(),
      value: (sequence * 17) % 101
    };
  });
  return { cursor: offset + count, events, generatedAt: new Date(1_735_689_600_000).toISOString() };
}

export function summarizeEvents(state: EventState) {
  const events = state.order.map((id) => state.byId.get(id)!).filter(Boolean);
  return {
    total: events.length,
    critical: events.filter((event) => event.severity === 'critical').length,
    warning: events.filter((event) => event.severity === 'warning').length,
    sources: new Set(events.map((event) => event.source)).size
  };
}
