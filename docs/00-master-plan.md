# 00 — Linkrai Master Plan

## 1. Product Vision

Build **Linkrai**, an AI-powered personal link memory app.

Users can save any URL from browsers, social platforms, video platforms, newsletters, articles, tools, or notes. Linkrai understands the link, stores it, summarizes it, categorizes it, generates tags, and makes it searchable by exact keyword or semantic meaning.

## 2. Positioning

> **Linkrai — Your AI memory for saved links.**

Arabic:

> **لينكراي — ذاكرتك الذكية لكل رابط حفظته.**

This is not a traditional bookmark manager. The core value is **retrieval by meaning**.

## 3. Brand Naming

- Official product name: **Linkrai**
- Arabic display name: **لينكراي**
- Logo treatment may visually emphasize `AI` as `LinkrAI`, but official text usage should remain **Linkrai** for clarity.
- Domain candidates discussed: `linkrai.app`, `linkrai.io`, `linkrai.link`, `linkrai.ai`.

## 4. Target Users

Initial target users:

1. Founders and executives who save strategic content.
2. Product managers and marketers who collect ideas and references.
3. Developers and technical teams who save docs, articles, tools, and tutorials.
4. Students and researchers who save learning resources.
5. Content creators who save inspiration from multiple platforms.
6. Knowledge workers who currently save links in WhatsApp, Telegram, browser bookmarks, and notes.

## 5. MVP Scope

### Must Have

- Registration/login.
- Save URL manually.
- Save URL from mobile share sheet.
- Metadata extraction.
- AI summary.
- Auto category.
- Tags/keywords.
- Library view.
- Item details view.
- Basic search.
- Semantic search.
- Usage limits.
- Subscription-ready structure.
- Processing status.
- Light and dark theme support.

### Can Wait

- PDF analysis.
- Deep YouTube transcript support.
- Browser extension.
- Team workspaces.
- Public collections.
- Collaboration.
- Bookmark import.
- Advanced note editor.
- Advanced automations.
- Knowledge graph.

## 6. Recommended Architecture

```text
Flutter Mobile App
        |
        v
NestJS API  ---> PostgreSQL + pgvector
        |
        v
Redis Queue / BullMQ
        |
        v
Worker Service
        |
        v
AI Providers + Extraction Services
```

## 7. Recommended Stack

### Mobile

- Flutter.
- Riverpod.
- GoRouter.
- Dio.
- Drift/SQLite.
- Firebase Cloud Messaging.
- Native Share Extension.

### Backend

- NestJS + TypeScript.
- PostgreSQL.
- Prisma.
- Redis.
- BullMQ.
- pgvector.
- Supabase Auth JWT verification.

### Worker

- Node.js/TypeScript.
- BullMQ processors.
- URL extraction utilities.
- AI provider abstraction.
- Retry and failure handling.

### Web Dashboard

- Next.js App Router.
- Tailwind CSS.
- shadcn/ui.
- API integration with NestJS.

### Billing

- RevenueCat for mobile subscriptions.
- Stripe/web billing later.
- Backend-controlled entitlements and usage limits.

### Observability

- Sentry.
- PostHog.
- Structured logging.

## 8. Repository Structure

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
    00-master-plan.md
    01-product-requirements.md
    02-backend-plan.md
    03-mobile-plan.md
    04-ai-pipeline-plan.md
    05-billing-subscription-plan.md
    06-web-dashboard-plan.md
    07-devops-qa-plan.md
    08-codex-execution-guide.md
    09-sprint-prompts.md
    10-database-schema.md
    11-api-contracts.md
    12-review-checklists.md
    13-project-glossary.md
    14-quickstart-for-ahmed.md
    15-linkrai-app-brief.md
    16-brand-naming-and-domains.md
  DESIGN.md
  AGENTS.md
  README.md
```

## 9. Phases

### Phase 0 — Foundation

Set up monorepo, documentation, environment templates, Docker Compose, and CI baseline.

### Phase 1 — Backend Foundation

Auth, users, plans, subscriptions, usage limits.

### Phase 2 — Saved Links Core

Save links, list items, item details, URL normalization, usage enforcement.

### Phase 3 — AI Pipeline

Queue-based processing, extraction, metadata, summarization, categorization, tags.

### Phase 4 — Search & Organization

Full-text search, semantic search, categories, tags, filters.

### Phase 5 — Mobile MVP

Flutter login, library, save link, item details, search, local cache.

### Phase 6 — Share Extension

Android share intent and iOS share extension.

### Phase 7 — Subscription & Paywall

RevenueCat SDK, paywall, purchases, restore purchases, backend webhook.

### Phase 8 — Web Dashboard

Next.js dashboard for library, search, account, usage, subscription.

### Phase 9 — Beta Hardening

Tests, logging, Sentry, PostHog, rate limits, deployment, privacy/terms.

## 10. Sprint Roadmap

| Sprint | Scope |
|---|---|
| Sprint 0 | Monorepo setup and docs |
| Sprint 1 | Backend auth and users |
| Sprint 2 | Plans, subscriptions, usage limits |
| Sprint 3 | Saved items core API |
| Sprint 4 | Queue and worker foundation |
| Sprint 5 | Link extraction and metadata |
| Sprint 6 | AI summaries, categories, tags |
| Sprint 7 | Embeddings and semantic search |
| Sprint 8 | Flutter app foundation |
| Sprint 9 | Flutter library and save flow |
| Sprint 10 | Share extension |
| Sprint 11 | Subscription and paywall |
| Sprint 12 | Web dashboard |
| Sprint 13 | Beta hardening |

## 11. Delivery Strategy

The project must be delivered incrementally. Each sprint should produce a testable outcome. Do not implement features ahead of the current sprint.

Give Codex the full documentation as context, but assign one sprint at a time.
