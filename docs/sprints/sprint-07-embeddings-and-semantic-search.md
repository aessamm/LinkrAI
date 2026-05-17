# Sprint 7 Tasks — Embeddings and Semantic Search

## Goal

Add embeddings and semantic search using pgvector.

## Tasks

- [x] Enable pgvector.
- [x] Add embedding storage.
- [x] Generate embedding for saved item after summary/content extraction.
- [x] Add `SearchModule`.
- [x] Add `GET /saved-items/search?q=&mode=keyword|semantic|hybrid`.
- [x] Implement keyword search.
- [x] Implement semantic search.
- [x] Implement hybrid search.
- [x] Enforce semantic search usage limits.
- [x] Add `category_id` filter.
- [x] Add `tag` filter.
- [x] Add `source_platform` filter.
- [x] Add date range filter.
- [x] Add tests with seeded embeddings where practical.

## Acceptance Criteria

- [x] User can search by meaning.
- [x] Search only returns the user's own items.
- [x] Semantic usage is counted.

## Scope Guard

Do not implement Flutter screens, mobile share extension, RevenueCat, or web dashboard work in this sprint.
