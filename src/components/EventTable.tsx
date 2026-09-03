import { memo } from 'react';
import type { StreamEvent } from '../types';

type EventTableProps = { events: StreamEvent[] };
export const EventTable = memo(function EventTable({ events }: EventTableProps) {
  return <div className="table-wrap" tabIndex={0} aria-label="Recent event stream">
    <table><caption className="sr-only">Most recently processed consumer events</caption><thead><tr><th scope="col">Event</th><th scope="col">Source</th><th scope="col">Severity</th><th scope="col">Value</th><th scope="col">Time</th></tr></thead>
    <tbody>{events.map((event) => <tr key={event.id}><td><strong>{event.message}</strong><small>{event.id}</small></td><td>{event.source}</td><td><span className={`pill pill--${event.severity}`}>{event.severity}</span></td><td>{event.value}</td><td>{new Date(event.timestamp).toLocaleTimeString('en-US')}</td></tr>)}</tbody></table>
  </div>;
});
