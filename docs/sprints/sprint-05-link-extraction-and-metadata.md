# Sprint 5 Tasks — Link Extraction and Metadata

## Goal

Extract metadata and available text from saved links.

## Tasks

- [x] Add fields needed for extraction output if missing.
- [x] Implement URL fetcher with timeout.
- [x] Extract title.
- [x] Extract description.
- [x] Extract image.
- [x] Extract canonical URL.
- [x] Extract source domain.
- [x] Detect content type: `article`, `video`, `social_post`, `pdf`, or `unknown`.
- [x] Extract readable article text when possible.
- [x] Store extraction status: `full_content`, `partial_content`, `metadata_only`, or `failed`.
- [x] Save extraction error if failed.
- [x] Add tests with mocked HTML responses.

## Acceptance Criteria

- [x] Article links extract useful content.
- [x] Metadata-only links still produce saved output.
- [x] Failed extraction is recorded cleanly.
- [x] No AI summarization is implemented yet.

## Notes

Existing `saved_items` fields already covered Sprint 5 extraction output, so no schema migration was
needed.

## Scope Guard

Do not implement AI summaries, category generation, tag generation, embeddings, semantic search, mobile, or web dashboard work in this sprint.
