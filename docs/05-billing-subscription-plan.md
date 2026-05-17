# 05 — Billing and Subscription Plan

## 1. Goal

Support a freemium SaaS model with clear usage limits and paid upgrades.

## 2. Billing Principle

The backend is the source of truth for access control and usage limits.

Flutter can display RevenueCat purchase state, but the backend decides what the user can do.

## 3. Plan Model

### FREE

```text
monthly_link_limit: 30
monthly_ai_summary_limit: 20
monthly_semantic_search_limit: 10
max_categories: 3
```

### PRO

```text
monthly_link_limit: 500
monthly_ai_summary_limit: 500
monthly_semantic_search_limit: 500
max_categories: unlimited
```

### POWER

```text
monthly_link_limit: 2000
monthly_ai_summary_limit: 2000
monthly_semantic_search_limit: 2000
max_categories: unlimited
```

## 4. Providers

### Mobile

- RevenueCat
- Apple In-App Purchase
- Google Play Billing

### Web Later

- Stripe directly or via RevenueCat web billing
- Paddle/Lemon Squeezy can be evaluated later

## 5. Subscription Status

Supported statuses:

```text
active
trialing
cancelled
expired
past_due
```

## 6. Entitlements

Recommended entitlements:

```text
free
pro
power
```

If no active paid entitlement exists, fallback to `free`.

## 7. Backend Webhook

Endpoint:

```http
POST /webhooks/revenuecat
```

Responsibilities:

1. Verify shared secret.
2. Store raw event in `billing_events`.
3. Identify user/customer.
4. Update `user_subscriptions`.
5. Recalculate current plan.
6. Return success.

## 8. Events to Handle

At minimum:

```text
INITIAL_PURCHASE
RENEWAL
CANCELLATION
EXPIRATION
BILLING_ISSUE
PRODUCT_CHANGE
```

## 9. Upgrade Required Response

When a user exceeds a limit, return:

```json
{
  "code": "upgrade_required",
  "message": "You have reached your monthly limit.",
  "current_plan": "free",
  "required_action": "upgrade",
  "limit_type": "saved_links"
}
```

HTTP status:

```http
402 Payment Required
```

## 10. Flutter Subscription Flow

```text
1. App calls GET /me/subscription.
2. If user hits limit, backend returns 402.
3. App shows paywall.
4. App fetches RevenueCat offerings.
5. User purchases.
6. RevenueCat confirms entitlement.
7. RevenueCat webhook updates backend.
8. App refreshes GET /me/subscription.
9. Backend confirms upgraded limits.
```

## 11. Acceptance Standards

- Free users start on FREE.
- Paid status comes from backend.
- Webhook raw event is stored.
- Expired users fallback to FREE.
- Usage limits are enforced server-side.
