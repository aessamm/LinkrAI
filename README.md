# Linkrai

**Linkrai** is an AI-powered personal link memory app.

Users save URLs from social media, websites, videos, articles, newsletters, and tools. Linkrai will
analyze saved links, generate summaries, categories, tags, and embeddings, then help users search
their saved library by keyword or semantic meaning.

> Linkrai — Your AI memory for saved links.

Arabic display:

> لينكراي — ذاكرتك الذكية لكل رابط حفظته.

## Current Scope

This repository currently contains:

- Monorepo folder structure.
- Documentation pack.
- Environment variable template.
- Docker Compose for PostgreSQL and Redis.
- Formatting baseline.
- GitHub Actions workflow that validates the expected repository structure.
- Sprint 1 NestJS API foundation with Supabase JWT verification and local user profiles.
- Sprint 2 plans, subscription state, plan seeding, usage limits, and `GET /api/me/subscription`.
- Sprint 3 saved-items API for authenticated URL save/list/detail/update/delete with saved-link
  usage enforcement.
- Sprint 4 Redis/BullMQ queue integration and a worker foundation that simulates link processing.
- Sprint 5 worker extraction for metadata, canonical URL, source domain, content type, readable
  article text, and extraction status.

No AI summarization, embeddings, mobile, or web dashboard implementation has been added yet.

## Repository Structure

```text
linkrai/
  apps/
    mobile/
    web/
  services/
    api/
    worker/
  packages/
    shared-types/
  infra/
    docker/
  docs/
  .github/
    workflows/
  AGENTS.md
  DESIGN.md
  README.md
  docker-compose.yml
```

## Recommended Stack

- Mobile: Flutter
- Web dashboard: Next.js App Router
- Backend API: NestJS + TypeScript
- Database: PostgreSQL + pgvector
- Queue: Redis + BullMQ
- Worker: Node.js/TypeScript
- Auth: Supabase Auth JWT verified by NestJS
- Subscriptions: RevenueCat for mobile, Stripe/web billing later

## Local Setup

1. Copy the environment template:

   ```bash
   cp .env.example .env
   ```

2. Start local infrastructure:

   ```bash
   docker compose up -d
   ```

3. Confirm services are running:

   ```bash
   docker compose ps
   ```

4. Stop local infrastructure when finished:

   ```bash
   docker compose down
   ```

Default local service URLs:

- PostgreSQL: `postgresql://linkrai:linkrai@localhost:5432/linkrai`
- Redis: `redis://localhost:6379`

## Backend API Setup

The Sprint 1 API service lives in `services/api`.

1. Install API dependencies:

   ```bash
   cd services/api
   npm install
   ```

2. Set local environment variables:

   ```bash
   export DATABASE_URL="postgresql://linkrai:linkrai@localhost:5432/linkrai"
   export REDIS_URL="redis://localhost:6379"
   export SUPABASE_JWT_SECRET="replace-me"
   ```

   On PowerShell:

   ```powershell
   $env:DATABASE_URL="postgresql://linkrai:linkrai@localhost:5432/linkrai"
   $env:REDIS_URL="redis://localhost:6379"
   $env:SUPABASE_JWT_SECRET="replace-me"
   ```

3. Run Prisma migrations:

   ```bash
   npm run prisma:migrate
   ```

4. Start the API:

   ```bash
   npm run start:dev
   ```

5. Call the authenticated user endpoint:

   ```http
   GET http://localhost:3000/api/me
   Authorization: Bearer <supabase_jwt>
   ```

Sprint 3 saved-items endpoints are also available:

```http
POST http://localhost:3000/api/saved-items
GET http://localhost:3000/api/saved-items?page=1&limit=20
GET http://localhost:3000/api/saved-items/:id
PATCH http://localhost:3000/api/saved-items/:id
DELETE http://localhost:3000/api/saved-items/:id
Authorization: Bearer <supabase_jwt>
```

`POST /api/saved-items` creates a saved item immediately with `processing_status = pending` and
enqueues a BullMQ job on `link-processing.queue`.

Useful API commands:

```bash
npm run build
npm test
npm run prisma:generate
npm run prisma:seed
npm run prisma:deploy
```

## Worker Setup

The worker service lives in `services/worker`. It consumes `link-processing.queue`, marks a saved
item as `processing`, fetches the saved URL, extracts metadata/readable text when available, then
marks it as `completed`. If extraction fails, it records the failure and marks the item as `failed`.

1. Install worker dependencies:

   ```bash
   cd services/worker
   npm install
   ```

2. Generate the worker Prisma client:

   ```bash
   npm run prisma:generate
   ```

3. Set local environment variables:

   ```bash
   export DATABASE_URL="postgresql://linkrai:linkrai@localhost:5432/linkrai"
   export REDIS_URL="redis://localhost:6379"
   ```

   On PowerShell:

   ```powershell
   $env:DATABASE_URL="postgresql://linkrai:linkrai@localhost:5432/linkrai"
   $env:REDIS_URL="redis://localhost:6379"
   ```

4. Start the worker:

   ```bash
   npm run start:dev
   ```

Useful worker commands:

```bash
npm run build
npm test
npm run prisma:generate
```

Sprint 5 extraction stores:

- `title`
- `description`
- `thumbnail_url`
- `canonical_url`
- `source_domain`
- `content_type`
- `raw_text`
- `extraction_status`
- `processing_error` when extraction fails

## Formatting

This Sprint 0 baseline includes Prettier config for repository metadata and the root README. The
existing documentation pack is intentionally ignored so Sprint 0 does not rewrite it.

Run:

```bash
npm run format:check
```

To format supported files:

```bash
npm run format
```

## Documentation

Important project documents:

- `AGENTS.md` — AI agent working rules.
- `DESIGN.md` — Linkrai design system.
- `docs/00-master-plan.md` — Product strategy, architecture, phases, and sprints.
- `docs/15-linkrai-app-brief.md` — Product brief and feature summary.
- `docs/16-brand-naming-and-domains.md` — Brand naming and domain guidance.

## Development Rule

Implement one sprint at a time. Do not build future phases until that sprint is explicitly
requested.
