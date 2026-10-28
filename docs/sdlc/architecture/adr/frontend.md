<!-- sdlc:auto:start adr -->
# ADR-0001: Use React 19 for Frontend

Status: Accepted  
Date: 2026-10-28

## Context and Problem Statement

Which Frontend technology does the project use? Decided in architecture v1.

## Considered Options

- React 19
- Vue 3
- Svelte

## Decision Outcome

Chosen option: React 19, because React 19 is the only working layer: it renders the single responsive page, handles the metric/imperial toggle, re-runs the pure BMI calculation on every valid input change, and shows the category and disclaimer -- all in the browser with no round-trip (NFR-001, NFR-002).

## Consequences

React carries more baseline weight than Svelte for such a tiny app, but its maturity, hooks model and ubiquitous tooling make the interactive form and instant recalculation straightforward and maintainable.
<!-- sdlc:auto:end adr -->