import type { EventEnvelope } from '../types';
import { generateEvents } from './events';

const delay = (milliseconds: number) => new Promise((resolve) => setTimeout(resolve, milliseconds));

export async function fetchEvents(cursor = 0, count = 120): Promise<EventEnvelope> {
  await delay(35);
  return generateEvents(count, cursor);
}
