<!-- sdlc:auto:start adr -->
# ADR-0002: Use FastAPI 0.115 for Backend

Status: Accepted  
Date: 2026-10-28

## Context and Problem Statement

Which Backend technology does the project use? Decided in architecture v1.

## Considered Options

- FastAPI 0.115
- Flask
- Express

## Decision Outcome

Chosen option: FastAPI 0.115, because Named as a formal placeholder for the backend layer. This product has no server-side logic -- calculation is client-side and nothing is saved -- so no FastAPI service is provisioned in this design.

## Consequences

No trade-off is realised because no backend runs. If a tiny server is ever wanted (e.g. a later analytics endpoint), FastAPI 0.115 is a lightweight, low-cost starting point that would not get in the way.
<!-- sdlc:auto:end adr -->