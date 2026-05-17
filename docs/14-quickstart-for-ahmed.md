# 14 — Quickstart for Ahmed

## 1. Project Name

Use:

```text
Linkrai
```

Arabic:

```text
لينكراي
```

Recommended repo name:

```text
linkrai
```

## 2. First Setup Steps

1. Create a new GitHub repository named `linkrai`.
2. Copy this documentation pack into the repository root.
3. Commit the documentation first.
4. Open Codex and connect the repository.
5. Ask Codex to implement **Sprint 0 only** using `docs/09-sprint-prompts.md`.

## 3. Codex Working Rule

Give Codex the full docs as context, but only assign one sprint at a time.

Use this rule in every prompt:

```text
Implement only this sprint. Do not implement future sprints.
```

## 4. First Codex Task

Open:

```text
docs/09-sprint-prompts.md
```

Copy **Sprint 0 Prompt — Project Setup** only.

## 5. After Codex Finishes Sprint 0

Review:

```text
docs/12-review-checklists.md
```

Confirm:

- Folder structure exists.
- Docker Compose starts PostgreSQL and Redis.
- `.env.example` exists.
- README setup instructions are clear.
- No backend/mobile/web implementation was added yet.

Then commit:

```bash
git add .
git commit -m "Sprint 0: setup Linkrai project foundation"
```

## 6. Next Task

After Sprint 0 is reviewed and committed, run **Sprint 1 Prompt — Backend Auth and Users**.
