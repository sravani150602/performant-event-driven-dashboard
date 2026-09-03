import { memo } from 'react';

const points = [42, 58, 47, 71, 66, 88, 79, 102, 94, 83, 117, 108];
export const LatencyChart = memo(function LatencyChart() {
  const path = points.map((point, index) => `${index ? 'L' : 'M'} ${index * 72} ${140 - point}`).join(' ');
  return <section className="panel chart-panel" aria-labelledby="latency-heading"><div className="panel-heading"><div><span className="eyebrow">Live telemetry</span><h2 id="latency-heading">End-to-end latency</h2></div><span className="status"><i /> Within budget</span></div><svg viewBox="0 0 800 170" role="img" aria-label="Latency trend remains below the 300 millisecond performance budget"><defs><linearGradient id="area" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#4ee1a0" stopOpacity=".35"/><stop offset="1" stopColor="#4ee1a0" stopOpacity="0"/></linearGradient></defs><path className="chart-area" d={`${path} L 792 160 L 0 160 Z`} /><path className="chart-line" d={path}/><line x1="0" y1="20" x2="800" y2="20" className="budget-line"/><text x="650" y="15">300 ms budget</text></svg></section>;
});
