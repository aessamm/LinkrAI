# 06 — Web Dashboard Plan

## 1. Goal

Build a web dashboard for users who prefer managing their saved links from desktop.

## 2. Technology

- Next.js App Router
- Tailwind CSS
- shadcn/ui
- TypeScript
- API integration with NestJS
- Supabase Auth client or backend token flow

## 3. Initial Pages

```text
/login
/dashboard
/dashboard/library
/dashboard/library/[id]
/dashboard/search
/dashboard/categories
/dashboard/subscription
/dashboard/settings
```

## 4. MVP Features

- Login
- Library table/grid
- Search
- Filters
- Item details
- Edit category/tags
- Delete item
- Usage/subscription page

## 5. Dashboard Layout

Recommended sections:

- Sidebar navigation
- Top search bar
- Main content
- Usage badge
- Upgrade CTA for free users

## 6. UI Requirements

- Clean SaaS interface
- Responsive layout
- Fast search UX
- Empty states
- Loading skeletons
- Error states

## 7. API Integration

Use the same backend API as mobile:

```text
GET /me
GET /me/subscription
GET /saved-items
GET /saved-items/:id
PATCH /saved-items/:id
DELETE /saved-items/:id
GET /saved-items/search
```

## 8. Sprint Implementation

Web dashboard starts after the mobile MVP and core backend are stable.

### Sprint 12

- Create Next.js app
- Add login
- Add dashboard layout
- Add library
- Add item details
- Add search
- Add subscription/usage page

## 9. Future Enhancements

- Browser extension
- Bulk import
- Export
- Collections
- Public share pages
- Team workspace
