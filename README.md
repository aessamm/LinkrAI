# Linkrai — Project Documentation Pack

This documentation pack is the single source of truth for building **Linkrai**.

## Product Summary

**Linkrai** is an AI-powered personal link memory app. Users can save URLs from social media, websites, articles, videos, tools, newsletters, and other online sources. Linkrai extracts metadata and available content, summarizes the link using AI, auto-categorizes it, generates tags/keywords, creates embeddings, and enables users to search their saved library by exact keyword or semantic meaning.

## Positioning

> **Linkrai — Your AI memory for saved links.**

Arabic positioning:

> **لينكراي — ذاكرتك الذكية لكل رابط حفظته.**

The product should not be positioned as a basic bookmark manager. The core value is **saving links quickly and retrieving them later by meaning**.

## Latest Brand Decision

- **Product name:** Linkrai
- **Arabic display name:** لينكراي
- **Primary tagline:** Your AI memory for saved links.
- **Arabic tagline:** ذاكرتك الذكية لكل رابط حفظته.
- **Domain candidates discussed:** linkrai.app, linkrai.io, linkrai.link, linkrai.ai

Use **Linkrai** as the official product name across code comments, docs, UI labels, design files, prompts, and project references.

## Recommended Stack

- **Mobile:** Flutter
- **Backend API:** NestJS + TypeScript
- **Database:** PostgreSQL + pgvector
- **Queue:** Redis + BullMQ
- **Worker:** Node.js/TypeScript worker service
- **Auth:** Supabase Auth JWT verified by NestJS
- **Billing:** RevenueCat for mobile subscriptions; Stripe/web billing later
- **Web Dashboard:** Next.js App Router + Tailwind CSS + shadcn/ui
- **Observability:** Sentry + PostHog
- **Infra:** Docker + Docker Compose + GitHub Actions

## Documentation Map

- `AGENTS.md` — Codex/AI agent working rules.
- `DESIGN.md` — Complete visual design system with light and dark themes.
- `docs/00-master-plan.md` — Overall project strategy, architecture, phases, and sprints.
- `docs/01-product-requirements.md` — PRD and MVP requirements.
- `docs/02-backend-plan.md` — Backend modules and implementation rules.
- `docs/03-mobile-plan.md` — Flutter mobile implementation plan.
- `docs/04-ai-pipeline-plan.md` — Worker and AI processing plan.
- `docs/05-billing-subscription-plan.md` — Subscription, entitlement, and usage model.
- `docs/06-web-dashboard-plan.md` — Web dashboard scope.
- `docs/07-devops-qa-plan.md` — DevOps, QA, observability, and release plan.
- `docs/08-codex-execution-guide.md` — How to work with Codex safely.
- `docs/09-sprint-prompts.md` — Sprint-by-sprint Codex prompts.
- `docs/10-database-schema.md` — Initial database schema.
- `docs/11-api-contracts.md` — API contracts.
- `docs/12-review-checklists.md` — Sprint review checklists.
- `docs/13-project-glossary.md` — Shared glossary.
- `docs/14-quickstart-for-ahmed.md` — Practical start guide.
- `docs/15-linkrai-app-brief.md` — Product brief, use cases, and feature summary.
- `docs/16-brand-naming-and-domains.md` — Brand naming decision and domain guidance.

## How to Use This Pack

1. Create a new Git repository named `linkrai` or similar.
2. Copy this documentation pack into the repository root.
3. Commit the documentation first.
4. Give Codex the prompt from `docs/09-sprint-prompts.md` for **Sprint 0 only**.
5. Review Codex changes using `docs/12-review-checklists.md`.
6. Commit after each sprint.
7. Move to the next sprint only after the current one passes acceptance criteria.

## Key Rule

Do **not** ask Codex to implement the whole project in one task. Give Codex the full documentation as context, then assign **one sprint at a time**.
