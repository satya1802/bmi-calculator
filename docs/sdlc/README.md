# bmi calculator — SDLC Documentation

> Maintained by QuorQ AI SDLC. Text between `sdlc:auto` markers is regenerated; anything outside them is yours and is kept.

<!-- sdlc:auto:start overview -->
simple bmi

**Documentation version:** v2
<!-- sdlc:auto:end overview -->

## Contents

<!-- sdlc:auto:start contents -->
| Document | State |
|---|---|
| [Requirements](requirements/README.md) | v1 approved |
| [Architecture](architecture/README.md) | 9 entries |
| [Development](development/README.md) | 1 entry |
| [Testing](testing/README.md) | 1 entry |
| [Deployment](deployment/README.md) | 1 entry |
| [Maintenance](maintenance/README.md) | 1 entry |
| [Data model](architecture/data-model.md) | generated |
| [API (OpenAPI)](architecture/api/openapi.yaml) | generated |
| [Decisions (ADRs)](architecture/adr/README.md) | 4 decisions |
| [Sprint plan](development/sprint-plan.md) | not generated yet |
| [Developer guide](development/developer-guide.md) | not generated yet |
| [API reference](development/api-reference.md) | 0 routes |
| [Test report](testing/test-report.md) | not run yet |
| [Tests](testing/test-cases.md) | 0 tests |
| [Deployment guide](deployment/deployment-guide.md) | not deployed yet |
| [Runbook](deployment/runbook.md) | not deployed yet |
| [Release notes](deployment/release-notes.md) | 0 releases |
| [Traceability matrix](traceability-matrix.md) | 7 requirements |
| [Changelog](CHANGELOG.md) | 2 versions |
<!-- sdlc:auto:end contents -->

## Open gaps

<!-- sdlc:auto:start open-gaps -->
### Architecture

- Input does not explicitly map this architecture to the known requirement keys US-001 through US-007; traceability from components/critical path to specific user stories is inferred only, not stated.
- Requirement/acceptance-criteria ids NFR-002 and AC-017 are referenced by the architecture input but are not among the known requirement keys (US-001..US-007) supplied for this phase, so full traceability to the requirements phase cannot be confirmed here.

### Development

- Development phase has not started; no implementation or planning input provided -- it is unknown whether any of the approved user stories (US-001 to US-007) have been built.

### Testing

- Testing phase has not started; no test plan or results provided -- none of the acceptance criteria (AC-001 through AC-020) have confirmed test evidence.

### Deployment

- No deployment recorded yet -- the AWS S3/CloudFront hosting named in requirements has not been confirmed as provisioned or live.

### Maintenance

- No maintenance/post-deployment notes exist; this is expected given no deployment has occurred yet.
<!-- sdlc:auto:end open-gaps -->
