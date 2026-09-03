import { memo } from 'react';

type MetricCardProps = { label: string; value: string | number; detail: string; tone?: 'default' | 'warning' | 'critical' };
export const MetricCard = memo(function MetricCard({ label, value, detail, tone = 'default' }: MetricCardProps) {
  return <article className={`metric metric--${tone}`}><span>{label}</span><strong>{value}</strong><small>{detail}</small></article>;
});
