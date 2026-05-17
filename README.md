# Linkrai

**Linkrai** is an AI-powered personal link memory app.

Users save URLs from social media, websites, videos, articles, newsletters, and tools. Linkrai will
analyze saved links, generate summaries, categories, tags, and embeddings, then help users search
their saved library by keyword or semantic meaning.

> Linkrai — Your AI memory for saved links.

Arabic display:

> لينكراي — ذاكرتك الذكية لكل رابط حفظته.

## Sprint 0 Scope

This repository currently contains the local development foundation only:

- Monorepo folder structure.
- Documentation pack.
- Environment variable template.
- Docker Compose for PostgreSQL and Redis.
- Formatting baseline.
- GitHub Actions workflow that validates the expected repository structure.

No backend, mobile, web dashboard, or worker implementation has been added yet.

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
