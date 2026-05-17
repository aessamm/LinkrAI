# Sprint 6 Tasks — AI Summaries, Categories, Tags

## Goal

Add AI enrichment for summaries, categories, and tags.

## Tasks

- [ ] Create AI provider abstraction.
- [ ] Add provider implementation using `OPENAI_API_KEY`.
- [ ] Generate summary.
- [ ] Generate short summary.
- [ ] Generate language.
- [ ] Generate keywords/tags.
- [ ] Generate suggested category.
- [ ] Prefer existing categories if available.
- [ ] Create category if needed.
- [ ] Attach tags to saved item.
- [ ] Increment AI summary usage only after successful generation.
- [ ] Add mocked tests for AI provider.
- [ ] Add mocked tests for worker logic.

## Acceptance Criteria

- [ ] Processed item gets summary, category, and tags.
- [ ] AI failures do not break saved item permanently.
- [ ] Usage is tracked.
- [ ] No embeddings or semantic search yet.

## Scope Guard

Do not implement embeddings, semantic search, mobile, web dashboard, RevenueCat, or billing purchase flows in this sprint.
