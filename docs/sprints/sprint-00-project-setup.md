# Sprint 0 Tasks — Project Setup

## Goal

Set up the Linkrai monorepo structure and local development foundation.

## Tasks

- [x] Create the monorepo folder structure:
  - `apps/mobile`
  - `apps/web`
  - `services/api`
  - `services/worker`
  - `packages/shared-types`
  - `infra/docker`
  - `docs`
- [x] Add root `README.md` with project overview and setup instructions.
- [x] Keep existing documentation files.
- [x] Add `.env.example` with required placeholders.
- [x] Add `docker-compose.yml` for PostgreSQL and Redis.
- [x] Add basic `.gitignore`.
- [x] Add formatting/linting baseline where applicable.
- [x] Add a simple GitHub Actions workflow that validates repository structure.

## Acceptance Criteria

- [x] Repository has the expected folder structure.
- [x] Docker Compose starts PostgreSQL and Redis.
- [x] README explains local setup.
- [x] No backend, mobile, web, or worker implementation is added yet.
- [x] Output a clear summary of created files and next recommended task.

## Notes

Docker Compose startup was verified with healthy PostgreSQL and Redis containers.
