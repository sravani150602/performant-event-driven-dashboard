import { useMemo, useState } from 'react';
import { EventTable } from './components/EventTable';
import { LatencyChart } from './components/LatencyChart';
import { MetricCard } from './components/MetricCard';
import { useEventStream } from './hooks/useEventStream';

export default function App() {
  const { state, summary, load, loading } = useEventStream();
  const [filter, setFilter] = useState('all');
  const events = useMemo(() => state.order.map((id) => state.byId.get(id)!).filter((event) => event && (filter === 'all' || event.severity === filter)).slice(0, 12), [state, filter]);
  return <div className="app-shell"><aside><a className="brand" href="#main" aria-label="Pulseboard home"><span>P</span> pulseboard</a><nav aria-label="Primary navigation"><a className="active" href="#overview">Overview</a><a href="#events">Event stream</a><a href="#latency-heading">Performance</a><a href="#settings">Settings</a></nav><div className="aside-note"><strong>System healthy</strong><span>5 sources connected</span></div></aside>
    <main id="main"><header><div><span className="eyebrow">Consumer intelligence</span><h1>Event operations</h1><p>Real-time visibility across every customer touchpoint.</p></div><button className="primary" onClick={load} disabled={loading}>{loading ? 'Streaming…' : summary.total ? 'Load next batch' : 'Start event stream'}</button></header>
      <section className="metrics" id="overview" aria-label="Event metrics"><MetricCard label="Events processed" value={summary.total.toLocaleString()} detail="Idempotent client state"/><MetricCard label="Active sources" value={summary.sources || 5} detail="Orchestrated streams"/><MetricCard label="Warnings" value={summary.warning} detail="Needs review" tone="warning"/><MetricCard label="Critical" value={summary.critical} detail="Escalated events" tone="critical"/></section>
      <LatencyChart />
      <section className="panel events-panel" id="events"><div className="panel-heading"><div><span className="eyebrow">Normalized feed</span><h2>Recent events</h2></div><label>Severity <select value={filter} onChange={(event) => setFilter(event.target.value)}><option value="all">All events</option><option value="info">Info</option><option value="warning">Warning</option><option value="critical">Critical</option></select></label></div>{events.length ? <EventTable events={events}/> : <div className="empty"><span>↗</span><h3>No events loaded</h3><p>Start the event stream to populate the dashboard.</p></div>}</section>
      <footer><span>Duplicate deliveries ignored: {state.duplicates}</span><span>Cursor: {state.cursor.toLocaleString()}</span></footer>
    </main></div>;
}
