# 09 — Sprint Prompts for Codex

Use one prompt at a time.

---

# Sprint 0 Prompt — Project Setup

```text
You are working on a new monorepo project called Linkrai.

Read:
- README.md
- AGENTS.md
- docs/00-master-plan.md
- DESIGN.md
- docs/15-linkrai-app-brief.md
- docs/16-brand-naming-and-domains.md

Product summary:
This is an AI-powered personal link memory app. Users can share URLs from any platform to the app. The backend extracts metadata and content, summarizes the link using AI, auto-generates categories and tags, creates embeddings, and allows users to search saved links by keyword or semantic meaning.

Official naming:
- Product name: Linkrai
- Arabic display: لينكراي
- Primary tagline: Your AI memory for saved links.
- Use Linkrai consistently across docs, README, comments, UI labels, and package descriptions.

Recommended stack:
- Mobile: Flutter
- Web dashboard: Next.js App Router
- Backend API: NestJS + TypeScript
- Database: PostgreSQL
- Vector search: pgvector
- Queue: Redis + BullMQ
- Worker: Node.js/TypeScript worker service
- Auth: Supabase Auth JWT verified by NestJS
- Subscriptions: RevenueCat for mobile, Stripe/web billing later

Implementation rule:
Do not implement the entire product.
Implement Sprint 0 only.

Sprint 0 goal:
Set up the monorepo structure and local development foundation.

Tasks:
1. Create the monorepo folder structure:
   apps/mobile
   apps/web
   services/api
   services/worker
   packages/shared-types
   infra/docker
   docs
2. Add root README.md with project overview and setup instructions.
3. Keep existing documentation files.
4. Add .env.example with placeholders:
   DATABASE_URL
   REDIS_URL
   SUPABASE_JWT_SECRET
   REVENUECAT_WEBHOOK_SECRET
   OPENAI_API_KEY
   SENTRY_DSN
   POSTHOG_KEY
5. Add docker-compose.yml for PostgreSQL and Redis.
6. Add basic .gitignore.
7. Add formatting/linting baseline where applicable.
8. Add a simple GitHub Actions workflow that validates repository structure.

Acceptance criteria:
- Repository has the expected folder structure.
- Docker Compose starts PostgreSQL and Redis.
- README explains local setup.
- No backend, mobile, web, or worker implementation is added yet.
- Output a clear summary of created files and next recommended task.
```

---

# Sprint 1 Prompt — Backend Auth and Users

```text
Read:
- AGENTS.md
- docs/00-master-plan.md
- docs/02-backend-plan.md
- docs/10-database-schema.md
- docs/11-api-contracts.md

Implement Sprint 1 only.

Sprint 1 goal:
Create the NestJS backend foundation with authentication and local user management.

Tasks:
1. Create NestJS app under services/api.
2. Add PostgreSQL connection using Prisma.
3. Create Prisma schema for:
   - users
   - user_profiles
4. Add database migration.
5. Implement Supabase JWT AuthGuard.
6. AuthGuard should:
   - Read Authorization: Bearer token
   - Verify token using SUPABASE_JWT_SECRET
   - Extract user id and email
   - Create local user if not exists
   - Attach user to request
7. Add GET /me endpoint.
8. Add validation pipe and global exception handling.
9. Add basic tests for:
   - missing token
   - invalid token
   - valid token creates user
   - GET /me returns authenticated user
10. Update README with API setup instructions.

Acceptance criteria:
- API runs locally.
- Database migration works.
- GET /me works with valid Supabase JWT.
- Invalid auth requests are rejected.
- No plans, subscriptions, saved items, or AI logic is implemented.
```

---

# Sprint 2 Prompt — Plans, Subscriptions, Usage

```text
Read:
- AGENTS.md
- docs/00-master-plan.md
- docs/02-backend-plan.md
- docs/05-billing-subscription-plan.md
- docs/10-database-schema.md
- docs/11-api-contracts.md

Implement Sprint 2 only.

Sprint 2 goal:
Add plan definitions, subscription state, and monthly usage limit enforcement.

Tasks:
1. Add Prisma models/migrations for:
   - plans
   - user_subscriptions
   - usage_counters
2. Seed plans:
   FREE, PRO, POWER
3. Every new user should fallback to FREE if no active subscription exists.
4. Implement UsageService:
   - getCurrentPlan(userId)
   - getCurrentUsage(userId)
   - canSaveLink(userId)
   - canGenerateSummary(userId)
   - canUseSemanticSearch(userId)
   - incrementUsage(userId, usageType)
5. Add GET /me/subscription endpoint.
6. Add tests for:
   - new user gets FREE
   - limit checks
   - usage increment
   - active paid subscription
   - expired subscription fallback to FREE

Acceptance criteria:
- Plans are seeded.
- Current user subscription/usage is returned.
- Usage checks work.
- No saved item or AI processing logic is implemented.
```

---

# Sprint 3 Prompt — Saved Items Core API

```text
Read:
- AGENTS.md
- docs/00-master-plan.md
- docs/02-backend-plan.md
- docs/10-database-schema.md
- docs/11-api-contracts.md

Implement Sprint 3 only.

Sprint 3 goal:
Allow authenticated users to save, list, update, and delete URLs with usage enforcement.

Tasks:
1. Add Prisma models/migrations for:
   - saved_items
   - categories
   - tags
   - saved_item_tags
2. Implement SavedItemsModule.
3. Add endpoints:
   POST /saved-items
   GET /saved-items
   GET /saved-items/:id
   PATCH /saved-items/:id
   DELETE /saved-items/:id
4. POST /saved-items:
   - Auth required
   - Input: url
   - Validate URL
   - Normalize URL
   - Check canSaveLink(userId)
   - If exceeded, return 402 with upgrade_required payload
   - Create item with processing_status = pending
   - Increment saved_links_count
5. Ensure ownership checks on all item operations.
6. Add pagination to GET /saved-items.
7. Add tests for:
   - save link within limit
   - save link over limit
   - user cannot access another user's item
   - update item
   - delete item

Acceptance criteria:
- Authenticated user can save a URL.
- Limit is enforced.
- Saved item starts as pending.
- Ownership checks work.
- No AI processing is implemented yet.
```

---

# Sprint 4 Prompt — Queue and Worker Foundation

```text
Read:
- AGENTS.md
- docs/00-master-plan.md
- docs/02-backend-plan.md
- docs/04-ai-pipeline-plan.md

Implement Sprint 4 only.

Sprint 4 goal:
Create Redis/BullMQ queue integration and worker foundation.

Tasks:
1. Add Redis config.
2. Add BullMQ queue to services/api.
3. Create services/worker Node.js/TypeScript worker service.
4. When saved item is created, enqueue link-processing job.
5. Worker should:
   - Pick job
   - Mark item processing
   - Simulate processing for now
   - Mark item completed
   - Mark failed on errors
6. Add retry policy.
7. Add basic logging.
8. Add tests or integration checks where practical.
9. Update README with worker run instructions.

Acceptance criteria:
- Saving item creates queue job.
- Worker consumes job.
- Processing status changes.
- No real extraction or AI summarization is implemented yet.
```

---

# Sprint 5 Prompt — Link Extraction and Metadata

```text
Read:
- AGENTS.md
- docs/00-master-plan.md
- docs/04-ai-pipeline-plan.md
- docs/10-database-schema.md

Implement Sprint 5 only.

Sprint 5 goal:
Extract metadata and available text from saved links.

Tasks:
1. Add fields needed for extraction output if missing.
2. Implement URL fetcher with timeout.
3. Extract:
   - title
   - description
   - image
   - canonical URL
   - source domain
4. Detect content type:
   article, video, social_post, pdf, unknown
5. Extract readable article text when possible.
6. Store extraction_status:
   full_content, partial_content, metadata_only, failed
7. Save extraction error if failed.
8. Add tests with mocked HTML responses.

Acceptance criteria:
- Article links extract useful content.
- Metadata-only links still produce saved output.
- Failed extraction is recorded cleanly.
- No AI summarization is implemented yet.
```

---

# Sprint 6 Prompt — AI Summaries, Categories, Tags

```text
Read:
- AGENTS.md
- docs/00-master-plan.md
- docs/04-ai-pipeline-plan.md
- docs/10-database-schema.md

Implement Sprint 6 only.

Sprint 6 goal:
Add AI enrichment for summaries, categories, and tags.

Tasks:
1. Create AI provider abstraction.
2. Add provider implementation using OPENAI_API_KEY.
3. Generate:
   - summary
   - short_summary
   - language
   - keywords/tags
   - suggested category
4. Prefer existing categories if available.
5. Create category if needed.
6. Attach tags to saved item.
7. Increment AI summary usage only after successful generation.
8. Add mocked tests for AI provider and worker logic.

Acceptance criteria:
- Processed item gets summary, category, and tags.
- AI failures do not break saved item permanently.
- Usage is tracked.
- No embeddings or semantic search yet.
```

---

# Sprint 7 Prompt — Embeddings and Semantic Search

```text
Read:
- AGENTS.md
- docs/00-master-plan.md
- docs/04-ai-pipeline-plan.md
- docs/10-database-schema.md
- docs/11-api-contracts.md

Implement Sprint 7 only.

Sprint 7 goal:
Add embeddings and semantic search using pgvector.

Tasks:
1. Enable pgvector.
2. Add embedding storage.
3. Generate embedding for saved item after summary/content extraction.
4. Add SearchModule.
5. Add endpoint:
   GET /saved-items/search?q=&mode=keyword|semantic|hybrid
6. Implement:
   - keyword search
   - semantic search
   - hybrid search
7. Enforce semantic search usage limits.
8. Add filters:
   category_id
   tag
   source_platform
   date range
9. Add tests with seeded embeddings where practical.

Acceptance criteria:
- User can search by meaning.
- Search only returns user's own items.
- Semantic usage is counted.
```

---

# Sprint 8 Prompt — Flutter App Foundation

```text
Read:
- AGENTS.md
- docs/00-master-plan.md
- docs/03-mobile-plan.md
- docs/11-api-contracts.md

Implement Sprint 8 only.

Sprint 8 goal:
Create Flutter app foundation with auth and API integration.

Tasks:
1. Create Flutter app under apps/mobile.
2. Add Riverpod.
3. Add GoRouter.
4. Add Dio API client.
5. Add secure token storage.
6. Add app theme.
7. Add screens:
   - Login
   - Register
   - Forgot password
   - Onboarding placeholder
   - Library placeholder
8. Integrate with backend auth flow.
9. Call GET /me after login.
10. Add basic loading/error states.

Acceptance criteria:
- Flutter app runs.
- User can log in/register.
- Token is stored securely.
- App can call GET /me.
- No link library implementation yet.
```

---

# Sprint 9 Prompt — Flutter Library and Save Flow

```text
Read:
- AGENTS.md
- docs/00-master-plan.md
- docs/03-mobile-plan.md
- docs/11-api-contracts.md

Implement Sprint 9 only.

Sprint 9 goal:
Add library, manual save, item details, and local cache.

Tasks:
1. Add Library screen.
2. Add Add Link screen.
3. Add Saved Item Details screen.
4. Add processing status UI.
5. Add pull-to-refresh.
6. Add pagination support.
7. Add Drift/SQLite local cache.
8. Add empty/error states.
9. Handle 402 upgrade_required response.

Acceptance criteria:
- User can manually save URL.
- User can see saved links.
- User can open item details.
- Processing status is visible.
- Upgrade required response shows appropriate UI.
```

---

# Sprint 10 Prompt — Mobile Share Extension

```text
Read:
- AGENTS.md
- docs/00-master-plan.md
- docs/03-mobile-plan.md

Implement Sprint 10 only.

Sprint 10 goal:
Allow users to share URLs from other apps into Linkrai.

Tasks:
1. Implement Android share intent support.
2. Implement iOS Share Extension.
3. Extract shared URL from incoming shared text.
4. Pass URL to Flutter app.
5. Create saved item automatically or show quick confirmation.
6. Show success/failure feedback.
7. Handle unauthenticated user by storing pending shared URL until login.

Acceptance criteria:
- Android share to app works.
- iOS share to app works.
- Shared URL appears in library.
- Processing starts automatically.
```

---

# Sprint 11 Prompt — Subscription and Paywall

```text
Read:
- AGENTS.md
- docs/00-master-plan.md
- docs/05-billing-subscription-plan.md
- docs/03-mobile-plan.md
- docs/11-api-contracts.md

Implement Sprint 11 only.

Sprint 11 goal:
Add RevenueCat integration, paywall, and backend webhook sync.

Tasks:
1. Add RevenueCat SDK to Flutter.
2. Fetch offerings.
3. Create paywall screen.
4. Implement purchase.
5. Implement restore purchases.
6. Add backend RevenueCat webhook endpoint.
7. Verify webhook secret.
8. Store raw billing events.
9. Update user subscription state.
10. App refreshes GET /me/subscription after purchase.
11. Handle upgrade_required flow.

Acceptance criteria:
- User can view paywall.
- Purchase flow is implemented.
- Webhook updates backend.
- Backend plan unlocks higher limits.
```

---

# Sprint 12 Prompt — Web Dashboard

```text
Read:
- AGENTS.md
- docs/00-master-plan.md
- docs/06-web-dashboard-plan.md
- docs/11-api-contracts.md

Implement Sprint 12 only.

Sprint 12 goal:
Create a Next.js dashboard for managing saved links from web.

Tasks:
1. Create Next.js app under apps/web.
2. Add Tailwind CSS and shadcn/ui.
3. Add dashboard layout.
4. Add login page.
5. Add library page.
6. Add item details page.
7. Add search page.
8. Add subscription/usage page.
9. Integrate with backend API.

Acceptance criteria:
- User can log in on web.
- User can view saved links.
- User can search.
- User can view usage/subscription.
```

---

# Sprint 13 Prompt — Beta Hardening

```text
Read:
- AGENTS.md
- docs/00-master-plan.md
- docs/07-devops-qa-plan.md

Implement Sprint 13 only.

Sprint 13 goal:
Prepare product for private beta.

Tasks:
1. Add Sentry.
2. Add PostHog.
3. Add API rate limiting.
4. Add structured logging.
5. Add production Docker setup.
6. Add staging deployment notes.
7. Add integration tests for critical flows.
8. Add privacy policy draft.
9. Add terms draft.
10. Add beta checklist.

Acceptance criteria:
- Critical flows are observable and testable.
- Basic legal docs exist.
- Product is ready for private beta.
```
