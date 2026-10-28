# Deployment Guide

> Maintained by QuorQ AI SDLC. Text between `sdlc:auto` markers is regenerated; anything outside them is yours and is kept.

<!-- sdlc:auto:start how-it-deploys -->
Pushes to `main` run `.github/workflows/deploy.yml`, which builds the API image (if there is a backend) and deploys the SPA to AWS Amplify. Commits touching only `docs/sdlc/**` don't deploy. Deployments can also be started from the platform's Deployment tab.
<!-- sdlc:auto:end how-it-deploys -->

<!-- sdlc:auto:start environments -->
| Name | Service | Runtime | Scaling | Environment |
|---|---|---|---|---|
| Static Assets Bucket | AWS S3 | Static file storage (HTML/JS/CSS build output) | Managed by AWS, effectively unlimited object serving | dev |
| Content Delivery Network | AWS CloudFront | Edge cache / HTTPS distribution | Global edge auto-scaling, pay-per-use | dev |
<!-- sdlc:auto:end environments -->

<!-- sdlc:auto:start live -->
_Not deployed yet._
<!-- sdlc:auto:end live -->

<!-- sdlc:auto:start topology -->
```mermaid
graph LR
  n_Static_Assets_Bucket["Static Assets Bucket<br/>AWS S3"]
  n_Content_Delivery_Network["Content Delivery Network<br/>AWS CloudFront"]
  n_Content_Delivery_Network -->|"HTTPS"| n_Static_Assets_Bucket
```
<!-- sdlc:auto:end topology -->
