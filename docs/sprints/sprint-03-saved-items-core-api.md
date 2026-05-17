# Sprint 3 Tasks — Saved Items Core API

## Goal

Allow authenticated users to save, list, update, and delete URLs with usage enforcement.

## Tasks

- [x] Add Prisma models and migrations for `saved_items`.
- [x] Add Prisma models and migrations for `categories`.
- [x] Add Prisma models and migrations for `tags`.
- [x] Add Prisma models and migrations for `saved_item_tags`.
- [x] Implement `SavedItemsModule`.
- [x] Add `POST /saved-items`.
- [x] Add `GET /saved-items`.
- [x] Add `GET /saved-items/:id`.
- [x] Add `PATCH /saved-items/:id`.
- [x] Add `DELETE /saved-items/:id`.
- [x] Require auth for saved item endpoints.
- [x] Validate URL input.
- [x] Normalize URL input.
- [x] Check `canSaveLink(userId)`.
- [x] Return `402` with `upgrade_required` payload when save limit is exceeded.
- [x] Create saved item with `processing_status = pending`.
- [x] Increment `saved_links_count`.
- [x] Ensure ownership checks on all item operations.
- [x] Add pagination to `GET /saved-items`.
- [x] Add tests for saving a link within limit.
- [x] Add tests for saving a link over limit.
- [x] Add tests that users cannot access another user's item.
- [x] Add tests for updating an item.
- [x] Add tests for deleting an item.

## Acceptance Criteria

- [x] Authenticated user can save a URL.
- [x] Limit is enforced.
- [x] Saved item starts as pending.
- [x] Ownership checks work.
- [x] No AI processing is implemented yet.

## Notes

Sprint 2 was implemented after Sprint 3. Saved-item enforcement now uses the completed Sprint 2
`UsageService` and seeded plans. AI processing remains unimplemented.

## Scope Guard

Do not implement queue processing, extraction, AI summaries, embeddings, mobile, or web dashboard work in this sprint.
