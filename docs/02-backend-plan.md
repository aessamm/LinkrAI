# 02 — Backend Plan

## 1. Backend Goal

Build a scalable NestJS API that owns authentication verification, user records, saved links, plan limits, subscription state, usage enforcement, and search endpoints.

## 2. Backend Responsibilities

- Verify Supabase JWT tokens.
- Create local user records.
- Enforce access control.
- Store saved items.
- Enforce plan limits.
- Expose APIs for mobile and web.
- Dispatch background processing jobs.
- Receive billing webhooks.
- Provide search endpoints.

## 3. Technology

- NestJS + TypeScript
- Prisma ORM
- PostgreSQL
- pgvector
- Redis
- BullMQ
- class-validator
- Jest

## 4. Modules

```text
AuthModule
UsersModule
PlansModule
SubscriptionsModule
UsageModule
SavedItemsModule
CategoriesModule
TagsModule
SearchModule
BillingModule
QueueModule
HealthModule
```

## 5. Auth Design

Mobile/web clients authenticate using Supabase Auth.

API receives:

```http
Authorization: Bearer <supabase_jwt>
```

The backend must:

1. Verify JWT using `SUPABASE_JWT_SECRET`.
2. Extract Supabase user id and email.
3. Create local user if not found.
4. Attach local user to request context.

## 6. Subscription Design

Backend must never trust the Flutter app for paid access.

Backend determines user plan using:

1. Active subscription in `user_subscriptions`.
2. If no active paid subscription exists, fallback to FREE.

## 7. Usage Design

Monthly usage is tracked using `period_key` in format `YYYY-MM`.

Usage service methods:

```ts
getCurrentPlan(userId)
getCurrentUsage(userId)
canSaveLink(userId)
canGenerateSummary(userId)
canUseSemanticSearch(userId)
incrementUsage(userId, usageType)
```

## 8. Saved Items Design

Saved items are created with:

```text
processing_status = pending
extraction_status = null
```

After creation, API enqueues a processing job.

## 9. API Endpoints

### Auth/User

```http
GET /me
GET /me/subscription
```

### Saved Items

```http
POST /saved-items
GET /saved-items
GET /saved-items/:id
PATCH /saved-items/:id
DELETE /saved-items/:id
```

### Categories

```http
GET /categories
POST /categories
PATCH /categories/:id
DELETE /categories/:id
```

### Tags

```http
GET /tags
POST /tags
DELETE /tags/:id
```

### Search

```http
GET /saved-items/search?q=&mode=keyword|semantic|hybrid
```

### Billing

```http
POST /webhooks/revenuecat
```

### Health

```http
GET /health
```

## 10. Sprint Implementation Order

### Sprint 1

- NestJS app
- Prisma
- users/user_profiles
- Supabase AuthGuard
- GET /me

### Sprint 2

- plans
- subscriptions
- usage counters
- seed plans
- GET /me/subscription

### Sprint 3

- saved_items
- categories/tags
- saved item CRUD
- usage enforcement

### Sprint 4

- Redis
- BullMQ
- Queue module
- Worker dispatch

### Sprint 7

- Search module
- pgvector integration

## 11. Backend Acceptance Standards

- All protected routes require auth.
- Users can only access their own records.
- Business logic is tested.
- Database changes are migration-based.
- Webhook raw events are stored.
- No secret is hardcoded.
