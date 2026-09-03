import { mkdir, writeFile } from 'node:fs/promises';
import { orchestrate, buildSimulation } from '../lambda/orchestrator.ts';

const samples = Array.from({ length: 12 }, () => orchestrate(buildSimulation(15_000)).durationMs).sort((a, b) => a - b);
const p95 = samples[Math.min(samples.length - 1, Math.ceil(samples.length * 0.95) - 1)];
const result = { eventCount: 15_000, duplicateReplayCount: 500, samples: samples.map((sample) => Number(sample.toFixed(3))), p95Ms: Number(p95.toFixed(3)), budgetMs: 300, passed: p95 < 300, runtime: `Node ${process.version}`, generatedAt: new Date().toISOString() };
await mkdir('benchmarks', { recursive: true });
await writeFile('benchmarks/latest.json', `${JSON.stringify(result, null, 2)}\n`);
console.log(JSON.stringify(result, null, 2));
if (!result.passed) process.exitCode = 1;
