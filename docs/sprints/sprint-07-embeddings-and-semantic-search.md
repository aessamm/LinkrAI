# Sprint 7 Tasks — Embeddings and Semantic Search

## Goal

Add embeddings and semantic search using pgvector.

## Tasks

- [ ] Enable pgvector.
- [ ] Add embedding storage.
- [ ] Generate embedding for saved item after summary/content extraction.
- [ ] Add `SearchModule`.
- [ ] Add `GET /saved-items/search?q=&mode=keyword|semantic|hybrid`.
- [ ] Implement keyword search.
- [ ] Implement semantic search.
- [ ] Implement hybrid search.
- [ ] Enforce semantic search usage limits.
- [ ] Add `category_id` filter.
- [ ] Add `tag` filter.
- [ ] Add `source_platform` filter.
- [ ] Add date range filter.
- [ ] Add tests with seeded embeddings where practical.

## Acceptance Criteria

- [ ] User can search by meaning.
- [ ] Search only returns the user's own items.
- [ ] Semantic usage is counted.

## Scope Guard

Do not implement Flutter screens, mobile share extension, RevenueCat, or web dashboard work in this sprint.
