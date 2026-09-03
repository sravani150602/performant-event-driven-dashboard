import type { EventEnvelope, EventState } from '../src/types.ts';
import { applyEventBatch, emptyEventState, generateEvents } from '../src/lib/events.ts';

export type OrchestrationResult = { state: EventState; accepted: number; duplicates: number; durationMs: number };
export function orchestrate(envelopes: EventEnvelope[]): OrchestrationResult {
  const start = performance.now();
  const state = envelopes.reduce(applyEventBatch, emptyEventState());
  return { state, accepted: state.byId.size, duplicates: state.duplicates, durationMs: performance.now() - start };
}
export const buildSimulation = (count = 15_000) => [generateEvents(count), generateEvents(Math.min(500, count))];
