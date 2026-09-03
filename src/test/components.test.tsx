import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { EventTable } from '../components/EventTable';
import { LatencyChart } from '../components/LatencyChart';
import { MetricCard } from '../components/MetricCard';
import { generateEvents } from '../lib/events';

describe('dashboard components', () => {
  it('renders an accessible metric', () => { render(<MetricCard label="Events" value="15,000" detail="Processed"/>); expect(screen.getByText('15,000')).toBeVisible(); });
  it('renders a semantically labelled latency visualization', () => { render(<LatencyChart/>); expect(screen.getByRole('img', { name: /latency trend/i })).toBeVisible(); });
  it('renders event rows with a caption', () => { render(<EventTable events={generateEvents(2).events}/>); expect(screen.getByText('Most recently processed consumer events')).toBeInTheDocument(); expect(screen.getAllByRole('row')).toHaveLength(3); });
});
