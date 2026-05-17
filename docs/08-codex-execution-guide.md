# 08 — Codex Execution Guide

## 1. Recommended Workflow

Do not ask Codex to build the full project in one prompt.

Recommended workflow:

```text
1. Create GitHub repository.
2. Add this documentation pack to the repository.
3. Commit documentation.
4. Connect repository to Codex.
5. Configure Codex environment.
6. Run Sprint 0 prompt.
7. Review diff.
8. Run tests locally.
9. Commit changes.
10. Continue sprint by sprint.
```

## 2. Codex Working Model

Codex should receive:

1. Full docs as context.
2. One sprint prompt only.
3. Clear acceptance criteria.
4. Rule: do not implement future sprints.

## 3. Setup Steps

### Step 1 — Create Repository

Create a new repository named:

```text
linkrai
```

### Step 2 — Add Documentation

Copy these files into the repository root.

### Step 3 — Commit Initial Docs

```bash
git add .
git commit -m "Add project planning documentation"
```

### Step 4 — Open Codex

Use Codex web/app/CLI depending on your setup.

### Step 5 — Give Sprint 0 Prompt

Use the prompt in `09-sprint-prompts.md`.

### Step 6 — Review Output

Check:

- Files created
- Scope compliance
- No future sprint implementation
- README updated
- Docker Compose works

### Step 7 — Commit

```bash
git add .
git commit -m "Sprint 0: setup project foundation"
```

## 4. Codex Task Rules

Include this block in every Codex task:

```text
Rules:
- Implement only the requested sprint.
- Do not add unrelated features.
- Do not implement future sprints.
- Do not hardcode secrets.
- Update README if setup changes.
- Add tests for implemented business logic.
- Return a summary of changed files and assumptions.
```

## 5. Review Checklist After Every Sprint

```text
- Does it match acceptance criteria?
- Did it implement extra scope?
- Does it run locally?
- Are secrets excluded?
- Are migrations included when schema changed?
- Are tests included?
- Is README updated?
- Are errors handled?
```

## 6. Suggested Branching

```text
main
develop
sprint/00-setup
sprint/01-backend-auth
sprint/02-plans-usage
...
```

## 7. Commit Strategy

Commit after each accepted sprint. Do not mix unrelated changes.

Example:

```bash
git checkout -b sprint/01-backend-auth
# run Codex task
# review and test
git add .
git commit -m "Sprint 1: add backend auth and users"
```
