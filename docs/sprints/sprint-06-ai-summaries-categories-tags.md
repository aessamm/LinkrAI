# Sprint 6 Tasks — AI Summaries, Categories, Tags

## Goal

Add AI enrichment for summaries, categories, and tags.

## Tasks

- [x] Create AI provider abstraction.
- [x] Add provider implementation using `OPENAI_API_KEY`.
- [x] Generate summary.
- [x] Generate short summary.
- [x] Generate language.
- [x] Generate keywords/tags.
- [x] Generate suggested category.
- [x] Prefer existing categories if available.
- [x] Create category if needed.
- [x] Attach tags to saved item.
- [x] Increment AI summary usage only after successful generation.
- [x] Add mocked tests for AI provider.
- [x] Add mocked tests for worker logic.

## Acceptance Criteria

- [x] Processed item gets summary, category, and tags.
- [x] AI failures do not break saved item permanently.
- [x] Usage is tracked.
- [x] No embeddings or semantic search yet.

## Notes

The worker skips AI enrichment when `OPENAI_API_KEY` is not configured or when the monthly AI summary
limit is exhausted. In both cases, extraction can still complete.

## Scope Guard

Do not implement embeddings, semantic search, mobile, web dashboard, RevenueCat, or billing purchase flows in this sprint.
