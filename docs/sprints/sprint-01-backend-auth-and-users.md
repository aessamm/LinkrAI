# Sprint 1 Tasks — Backend Auth and Users

## Goal

Create the NestJS backend foundation with authentication and local user management.

## Tasks

- [x] Create NestJS app under `services/api`.
- [x] Add PostgreSQL connection using Prisma.
- [x] Create Prisma schema for `users` and `user_profiles`.
- [x] Add database migration.
- [x] Implement Supabase JWT AuthGuard.
- [x] AuthGuard reads `Authorization: Bearer <token>`.
- [x] AuthGuard verifies token using `SUPABASE_JWT_SECRET`.
- [x] AuthGuard extracts user id and email.
- [x] AuthGuard creates local user if one does not exist.
- [x] AuthGuard attaches user to request.
- [x] Add `GET /me` endpoint.
- [x] Add validation pipe and global exception handling.
- [x] Add tests for missing token.
- [x] Add tests for invalid token.
- [x] Add tests for valid token creating a user.
- [x] Add tests for `GET /me` returning authenticated user.
- [x] Update README with API setup instructions.

## Acceptance Criteria

- [x] API runs locally.
- [x] Database migration works.
- [x] `GET /me` works with valid Supabase JWT.
- [x] Invalid auth requests are rejected.
- [x] No plans, subscriptions, saved items, or AI logic is implemented.

## Scope Guard

Do not implement plans, subscriptions, saved items, queues, workers, AI processing, mobile, or web dashboard work in this sprint.
