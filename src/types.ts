export type EventSeverity = 'info' | 'warning' | 'critical';
export type StreamEvent = {
  id: string;
  sequence: number;
  source: string;
  category: string;
  severity: EventSeverity;
  message: string;
  timestamp: string;
  value: number;
};
export type EventEnvelope = { cursor: number; events: StreamEvent[]; generatedAt: string };
export type EventState = {
  byId: Map<string, StreamEvent>;
  order: string[];
  cursor: number;
  duplicates: number;
};
