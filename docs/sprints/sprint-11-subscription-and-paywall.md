# Sprint 11 Tasks — Subscription and Paywall

## Goal

Add RevenueCat integration, paywall, and backend webhook sync.

## Tasks

- [ ] Add RevenueCat SDK to Flutter.
- [ ] Fetch offerings.
- [ ] Create paywall screen.
- [ ] Implement purchase.
- [ ] Implement restore purchases.
- [ ] Add backend RevenueCat webhook endpoint.
- [ ] Verify webhook secret.
- [ ] Store raw billing events.
- [ ] Update user subscription state.
- [ ] Refresh `GET /me/subscription` after purchase.
- [ ] Handle `upgrade_required` flow.

## Acceptance Criteria

- [ ] User can view paywall.
- [ ] Purchase flow is implemented.
- [ ] Webhook updates backend.
- [ ] Backend plan unlocks higher limits.

## Scope Guard

Do not implement Stripe/web billing, public collections, team workspaces, browser extension, or unrelated monetization features in this sprint.
