import { describe, expect, it } from 'vitest';
import { handler } from '../../lambda/handler';
import { buildSimulation, orchestrate } from '../../lambda/orchestrator';

describe('AWS Lambda boundary', () => {
  it('orchestrates 15K events below the 300ms budget', () => { const result = orchestrate(buildSimulation()); expect(result.accepted).toBe(15_000); expect(result.duplicates).toBe(500); expect(result.durationMs).toBeLessThan(300); });
  it('caps response batches at 1,000 records', async () => { const response = await handler({ queryStringParameters: { count: '5000' } } as never, {} as never, () => undefined); expect(response).toBeTruthy(); const body = JSON.parse((response as { body: string }).body); expect(body.events).toHaveLength(1_000); });
});
