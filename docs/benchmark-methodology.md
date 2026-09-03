# Benchmark methodology

The benchmark is intentionally reproducible and narrowly scoped.

- **Workload:** 15,000 unique events followed by a replay of the first 500.
- **Operation:** normalization, sequence comparison, idempotent reconciliation, indexed insertion, and cursor advancement.
- **Sampling:** 12 complete runs in one Node.js process; samples are sorted and the nearest-rank p95 is reported.
- **Budget:** p95 must remain below 300 ms or the command exits with a failure.
- **Artifact:** each run overwrites `benchmarks/latest.json` with raw samples, runtime version, timestamp, and pass/fail result.

Run with `npm run benchmark`. Hardware, operating system, Node version, and background load influence timing. The result is not a claim about public-network transit, browser paint, API Gateway cold starts, or a specific production region. Production reporting should add CloudWatch/Lambda telemetry and browser Resource Timing data around the same event contract.
