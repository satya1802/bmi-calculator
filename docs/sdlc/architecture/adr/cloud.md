<!-- sdlc:auto:start adr -->
# ADR-0004: Use AWS for Cloud

Status: Accepted  
Date: 2026-10-28

## Context and Problem Statement

Which Cloud technology does the project use? Decided in architecture v1.

## Considered Options

- AWS
- Cloudflare Pages
- Netlify

## Decision Outcome

Chosen option: AWS, because The product is a single static page, so hosting means serving a handful of files fast and cheaply worldwide. AWS S3 plus CloudFront does exactly this, costs almost nothing at low traffic, and scales effortlessly.

## Consequences

Setting up S3 and CloudFront is slightly more involved than a one-click static host, but it is the standard, durable home for the site and keeps everything within the approved cloud.
<!-- sdlc:auto:end adr -->