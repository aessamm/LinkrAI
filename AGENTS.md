# AGENTS.md — Linkrai AI Agent Instructions

These instructions apply to Codex and any AI coding agent working on the **Linkrai** repository.

## Product Context

Linkrai is an AI-powered personal link memory app. Users save links from social media, websites, videos, articles, newsletters, and tools. The system analyzes saved URLs, generates summaries, categories, tags, and embeddings, then helps users find saved links later by keyword or semantic meaning.

Official product naming:

- Product name: **Linkrai**
- Arabic display: **لينكراي**
- Tagline: **Your AI memory for saved links.**
- Arabic tagline: **ذاكرتك الذكية لكل رابط حفظته.**

## Core Rule

Implement only the sprint or task explicitly requested. Do not implement future phases unless the prompt explicitly asks for them.

## Working Style

- Read the relevant docs before making changes.
- Keep implementation modular and testable.
- Do not hardcode secrets.
- Use environment variables.
- Update README when setup steps change.
- Add tests for business logic.
- Document assumptions in the final implementation summary.
- Keep product terminology consistent with **Linkrai**.

## Technical Direction

- Mobile: Flutter.
- Backend: NestJS + TypeScript.
- Database: PostgreSQL + pgvector.
- Queue: Redis + BullMQ.
- Worker: Node.js/TypeScript.
- Auth: Supabase Auth JWT verification in NestJS.
- Billing: RevenueCat for mobile subscriptions; Stripe/web billing later.
- Web dashboard: Next.js App Router.

## Product Rules

- Backend is the source of truth for subscription state and usage limits.
- Flutter must never unlock paid features based only on local state.
- Save links immediately, then process in the background.
- If full content extraction fails, keep the link and mark it as partial or metadata-only.
- Do not claim full AI analysis when only metadata was available.
- Search must evolve toward semantic retrieval, not only keyword matching.

## Design Rules

- Use `DESIGN.md` as the source of truth for UI direction.
- Support light and dark themes from the beginning.
- Keep UI clean, premium, mobile-first, and productivity-focused.
- Use navy/blue as the primary visual foundation and warm orange as the accent.
- Keep the product bilingual-ready for Arabic/English and future RTL.

## Sprint Rules

For every sprint:

1. Implement only the requested sprint.
2. Keep changes focused.
3. Add or update tests.
4. Update docs only when needed.
5. Provide a concise summary of changed files.
6. List any assumptions or blockers.

## Forbidden

- Do not implement unrelated future features.
- Do not introduce a different tech stack without explicit approval.
- Do not bypass usage limits on the backend.
- Do not store secrets in code.
- Do not change product name away from Linkrai unless explicitly requested.
