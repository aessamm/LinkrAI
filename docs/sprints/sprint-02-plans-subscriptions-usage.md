# Sprint 2 Tasks — Plans, Subscriptions, Usage

## Goal

Add plan definitions, subscription state, and monthly usage limit enforcement.

## Tasks

- [x] Add Prisma models and migrations for `plans`.
- [x] Add Prisma models and migrations for `user_subscriptions`.
- [x] Add Prisma models and migrations for `usage_counters`.
- [x] Seed plans: `FREE`, `PRO`, `POWER`.
- [x] Make every new user fallback to `FREE` if no active subscription exists.
- [x] Implement `UsageService.getCurrentPlan(userId)`.
- [x] Implement `UsageService.getCurrentUsage(userId)`.
- [x] Implement `UsageService.canSaveLink(userId)`.
- [x] Implement `UsageService.canGenerateSummary(userId)`.
- [x] Implement `UsageService.canUseSemanticSearch(userId)`.
- [x] Implement `UsageService.incrementUsage(userId, usageType)`.
- [x] Add `GET /me/subscription` endpoint.
- [x] Add tests for new user getting `FREE`.
- [x] Add tests for limit checks.
- [x] Add tests for usage increment.
- [x] Add tests for active paid subscription.
- [x] Add tests for expired subscription fallback to `FREE`.

## Acceptance Criteria

- [x] Plans are seeded.
- [x] Current user subscription and usage are returned.
- [x] Usage checks work.
- [x] No AI processing logic is implemented.

## Notes

Sprint 3 had already added saved-items logic before this sprint was backfilled. Sprint 2 completed
the missing plans, subscription state, usage service methods, plan seeding, and subscription endpoint.

## Scope Guard

Do not implement saved items, queues, workers, AI processing, embeddings, mobile, or web dashboard work in this sprint.
