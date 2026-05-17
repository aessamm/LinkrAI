# Sprint 4 Tasks — Queue and Worker Foundation

## Goal

Create Redis/BullMQ queue integration and worker foundation.

## Tasks

- [x] Add Redis config.
- [x] Add BullMQ queue to `services/api`.
- [x] Create `services/worker` Node.js/TypeScript worker service.
- [x] Enqueue a link-processing job when a saved item is created.
- [x] Worker picks jobs from the queue.
- [x] Worker marks item as processing.
- [x] Worker simulates processing for now.
- [x] Worker marks item as completed after simulated processing.
- [x] Worker marks item as failed on errors.
- [x] Add retry policy.
- [x] Add basic logging.
- [x] Add tests or integration checks where practical.
- [x] Update README with worker run instructions.

## Acceptance Criteria

- [x] Saving item creates queue job.
- [x] Worker consumes job.
- [x] Processing status changes.
- [x] No real extraction or AI summarization is implemented yet.

## Notes

The worker uses a local Prisma schema mirror for client generation. API-owned migrations remain in
`services/api/prisma/migrations`.

## Scope Guard

Do not implement real URL extraction, metadata parsing, AI summaries, embeddings, mobile, or web dashboard work in this sprint.
