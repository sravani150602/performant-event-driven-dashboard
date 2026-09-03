# AI-assisted development record

This repository treats AI as a reviewed engineering aid, not as evidence of correctness.

## Where AI helped

- Proposed edge cases for duplicate, stale, and out-of-order event delivery.
- Suggested extra semantic labels and keyboard-focus checks for the component tests.
- Identified repeated event-shaping logic that was extracted into `applyEventBatch`.
- Generated candidate Playwright scenarios that were reduced to stable user journeys.

## Human review gates

Every suggestion must pass TypeScript, ESLint, unit coverage thresholds, the 15K-event performance budget, Playwright accessibility analysis, and reviewed visual snapshots. No AI output bypasses code review. Security-sensitive or production-infrastructure changes require an accountable human owner.

## Reproducibility

The committed tests, performance harness, and CI workflow—not the use of any specific AI product—are the source of truth. This keeps the project vendor-neutral and makes each claim independently verifiable.
