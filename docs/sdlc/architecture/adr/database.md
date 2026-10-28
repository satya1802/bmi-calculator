<!-- sdlc:auto:start adr -->
# ADR-0003: Use PostgreSQL 16 for Database

Status: Accepted  
Date: 2026-10-28

## Context and Problem Statement

Which Database technology does the project use? Decided in architecture v1.

## Considered Options

- PostgreSQL 16
- SQLite
- DynamoDB

## Decision Outcome

Chosen option: PostgreSQL 16, because Named to satisfy the required database layer. The app stores nothing -- no accounts, no history, no results (NFR-002, AC-017) -- so there is no data to keep and no database instance is provisioned.

## Consequences

PostgreSQL 16 would hold zero records here, so it is intentionally left unprovisioned; it remains the standard default should persisting results ever be added later.
<!-- sdlc:auto:end adr -->