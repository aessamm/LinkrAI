# 12 — Review Checklists

## 1. Sprint Review Checklist

Use this after every Codex task.

```text
- Did Codex implement only the requested sprint?
- Did it avoid future-sprint features?
- Does the project run locally?
- Did it update README/setup docs?
- Are tests included where required?
- Are secrets handled through environment variables?
- Are migrations included when schema changes?
- Is error handling acceptable?
- Is code structured by modules?
- Is the final summary clear?
```

## 2. Backend Review Checklist

```text
- Auth guard validates tokens.
- Ownership checks exist.
- DTO validation exists.
- Services contain business logic.
- Controllers stay thin.
- Usage limits are enforced server-side.
- 402 upgrade_required response is implemented.
- Tests cover business logic.
```

## 3. Mobile Review Checklist

```text
- Loading states exist.
- Error states exist.
- Empty states exist.
- Token storage is secure.
- API errors are handled.
- Upgrade-required response is handled.
- UI does not unlock features without backend confirmation.
```

## 4. AI Pipeline Review Checklist

```text
- Processing is async.
- Failed extraction is handled.
- Partial extraction is useful.
- AI usage is tracked.
- AI provider is abstracted.
- Retries exist.
- Failure reasons are stored.
```

## 5. Billing Review Checklist

```text
- Backend verifies webhook secret.
- Raw billing events are stored.
- Expired users fallback to FREE.
- RevenueCat/Flutter state is not blindly trusted.
- Current plan endpoint returns usage and remaining quota.
```

## 6. Beta Readiness Checklist

```text
- User can register/login.
- User can save URL.
- User can share URL from mobile.
- AI summary works.
- Category and tags work.
- Search works.
- Usage limits work.
- Upgrade flow works.
- Error tracking is enabled.
- Product analytics is enabled.
- Basic privacy policy exists.
```
