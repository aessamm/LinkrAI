# 03 — Mobile Plan

## 1. Mobile Goal

Build a Flutter app that makes saving links extremely fast and retrieving saved links easy.

## 2. Mobile Responsibilities

- Registration/login
- Display library
- Manual add link
- Receive shared URLs from other apps
- Display processing status
- Display summaries, categories, and tags
- Search saved items
- Show usage and subscription status
- Trigger purchase flow later
- Local cache for smoother experience

## 3. Technology

- Flutter
- Riverpod
- GoRouter
- Dio
- Drift/SQLite
- flutter_secure_storage
- Firebase Cloud Messaging
- RevenueCat SDK later

## 4. App Screens

### Auth

- Login
- Register
- Forgot password
- Email verification state

### Onboarding

- Welcome
- Explain save/share flow
- Choose preferred language
- Ask for notification permission later

### Main

- Library
- Search
- Categories
- Saved item details
- Add link
- Usage/subscription
- Settings

### Paywall Later

- Plan comparison
- Subscribe
- Restore purchases
- Upgrade required

## 5. Navigation

Recommended routes:

```text
/login
/register
/onboarding
/library
/library/:id
/search
/categories
/add-link
/subscription
/settings
```

## 6. State Management

Use Riverpod providers for:

- Auth state
- Current user
- Subscription/usage
- Saved items
- Search
- Categories/tags
- API client
- Local cache repository

## 7. Share Extension

### Android

- Use intent filters for shared text/URLs.
- Extract URL from shared content.
- Open app confirmation screen or quick-save flow.

### iOS

- Use native Share Extension.
- Use App Groups to pass shared URL to main app.
- Main Flutter app reads pending shared URL and creates saved item.

## 8. Offline / Cache Strategy

Use local database for:

- Last loaded saved items
- Item details
- Categories/tags
- Pending save actions if network fails

## 9. User Experience Rules

- Saving a link should feel instant.
- Show "Saved. AI processing started."
- Do not block user while processing.
- Use clear statuses:
  - Pending
  - Processing
  - Completed
  - Failed
- If extraction is partial, show a friendly note.

## 10. Sprint Implementation Order

### Sprint 8

- Flutter project
- Theme
- Routing
- Riverpod
- API client
- Auth screens

### Sprint 9

- Library
- Add link
- Item details
- Local cache
- Error/empty states

### Sprint 10

- Android share intent
- iOS share extension
- Shared URL save flow

### Sprint 11

- RevenueCat SDK
- Paywall
- Restore purchases
- Upgrade-required handling

## 11. Mobile Acceptance Standards

- App handles loading/error/empty states.
- Token is stored securely.
- All API failures are handled gracefully.
- App does not unlock paid features without backend confirmation.
