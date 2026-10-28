# Developer Guide

> Maintained by QuorQ AI SDLC. Text between `sdlc:auto` markers is regenerated; anything outside them is yours and is kept.

<!-- sdlc:auto:start status -->
_Up to date._
<!-- sdlc:auto:end status -->

<!-- sdlc:auto:start source -->
Generated from commit `877f88d` · model `claude-sonnet-5`
<!-- sdlc:auto:end source -->

<!-- sdlc:auto:start overview -->
This is a generated full-stack scaffold for a BMI calculator: a Vite + React 19 single-page frontend with approved, reviewed screens that currently render seeded sample data, and a FastAPI 0.115 backend that has no approved architecture yet beyond a health check. The backend uses SQLAlchemy against SQLite by default (swappable to Postgres via DATABASE_URL) and ships a Dockerfile; a docker-compose.yml provides a local Postgres 16 instance if/when the backend is pointed at it.
<!-- sdlc:auto:end overview -->

<!-- sdlc:auto:start prerequisites -->
- Node.js (for Vite 6 / React 19 / npm scripts)
- Python 3.12 (matches backend/Dockerfile)
- pip
- Docker and Docker Compose (optional, for the Postgres service in docker-compose.yml)
<!-- sdlc:auto:end prerequisites -->

<!-- sdlc:auto:start setup -->
1. cd frontend && npm install
2. cd backend && pip install -r requirements.txt
3. (optional) from repo root, docker-compose up -d to start a local Postgres 16 database
4. (optional) set DATABASE_URL to point the backend at Postgres instead of the default SQLite ./app.db
5. (optional) copy .env.example to .env and fill in values such as ALLOWED_ORIGINS for the backend and VITE_API_BASE_URL / VITE_API_SECRET_KEY for the frontend
<!-- sdlc:auto:end setup -->

<!-- sdlc:auto:start run -->
| Name | Command | Description |
|---|---|---|
| frontend dev | `npm run dev` | Starts the Vite dev server for the React SPA (run from frontend/) |
| frontend build | `npm run build` | Bundles the app with Vite (does not typecheck) |
| frontend preview | `npm run preview` | Serves the production build locally |
| backend dev | `uvicorn app.main:app --reload` | Runs the FastAPI app with auto-reload (run from backend/) |
| db | `docker-compose up -d` | Starts a local Postgres 16 container defined in docker-compose.yml (run from repo root) |
<!-- sdlc:auto:end run -->

<!-- sdlc:auto:start structure -->
| Path | Purpose |
|---|---|
| `backend/` | FastAPI service: app package, routers, models, schemas, tests, Dockerfile, requirements |
| `backend/app/` | Application code: main.py entrypoint, database.py engine/session, models.py SQLAlchemy models, schemas.py Pydantic models, routers/ package |
| `backend/tests/` | Pytest tests, currently covering the health endpoint |
| `frontend/` | Vite + React SPA: approved screens running on seeded sample data |
| `frontend/src/` | App source: lib/ (api client, UI components, icons, navigation), index.css, main.tsx entrypoint |
| `frontend/e2e/` | Playwright acceptance tests |
| `.quorq/` | Platform handoff metadata for the Quorq AI SDLC platform |
<!-- sdlc:auto:end structure -->

<!-- sdlc:auto:start conventions -->
- Backend: one router per architecture component that owns endpoints, imported into app/main.py
- Backend: unimplemented routes return a typed StubResponse (Pydantic) rather than erroring, keeping OpenAPI complete before handlers exist
- Backend: all models share a single SQLAlchemy DeclarativeBase (app.database.Base); tables are created via Base.metadata.create_all at startup (no migrations yet)
- Backend: configuration via environment variables (DATABASE_URL, ALLOWED_ORIGINS) with sane local defaults
- Frontend: TypeScript + React function components, path alias '@/' maps to src/
- Frontend: API access centralized in src/lib/api.ts (apiFetch helper, bearer auth via VITE_API_SECRET_KEY), though screens are not yet wired to it
- Frontend: styling via Tailwind CSS v4 (@tailwindcss/vite) and CSS variables in index.css
- Frontend: Vitest component tests live beside the components they test; Playwright specs live under e2e/
<!-- sdlc:auto:end conventions -->

<!-- sdlc:auto:start testing -->
| Name | Command | Description |
|---|---|---|
| backend tests | `pytest` | Runs backend unit tests (requires pythonpath config in pytest.ini; run from backend/) |
| backend lint | `ruff check .` | Lints backend Python code |
| backend format | `ruff format .` | Formats backend Python code |
| frontend unit tests | `npm run test` | Runs Vitest component tests |
| frontend e2e tests | `npm run test:e2e` | Runs Playwright acceptance tests from e2e/; builds/serves the app (and boots the backend) unless E2E_BASE_URL is set |
| frontend e2e install | `npm run test:e2e:install` | Installs the Chromium browser Playwright needs |
| frontend lint | `npm run lint` | Runs ESLint over the frontend app; this is a development gate |
| frontend typecheck | `npm run typecheck` | Runs tsc --noEmit (not run by npm run build) |
<!-- sdlc:auto:end testing -->

<!-- sdlc:auto:start troubleshooting -->
| Problem | Solution |
|---|---|
| Frontend calls to the backend are blocked by CORS | Set ALLOWED_ORIGINS (comma-separated) as an env var for the backend, or rely on the default dev origins http://localhost:5173 / http://127.0.0.1:5173 |
| `pytest` fails with ModuleNotFoundError: app | Run pytest from the backend/ directory so pytest.ini's pythonpath = . takes effect |
| `npm run build` succeeds but the app is broken in ways tsc would catch | Run npm run typecheck (tsc --noEmit) separately, since build does not typecheck |
| Playwright e2e tests fail to start | Run npm run test:e2e:install first to fetch the Chromium browser; without E2E_BASE_URL set, Playwright also expects to boot the backend from backend/.venv and build/preview the frontend |
| Backend has no persistent/shared database in production | Set DATABASE_URL to a Postgres connection string (e.g. matching docker-compose.yml's db service) instead of the default SQLite ./app.db |
<!-- sdlc:auto:end troubleshooting -->
