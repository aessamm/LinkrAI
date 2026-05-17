# 11 — API Contracts

Base URL:

```text
/api
```

All protected endpoints require:

```http
Authorization: Bearer <token>
```

## 1. GET /me

### Response

```json
{
  "id": "uuid",
  "email": "user@example.com",
  "display_name": "Ahmed",
  "profile": {
    "preferred_language": "en",
    "timezone": "Africa/Cairo",
    "onboarding_completed": false
  }
}
```

## 2. GET /me/subscription

### Response

```json
{
  "plan": {
    "code": "free",
    "name": "Free",
    "limits": {
      "monthly_link_limit": 30,
      "monthly_ai_summary_limit": 20,
      "monthly_semantic_search_limit": 10,
      "max_categories": 3
    }
  },
  "subscription": {
    "status": "active",
    "entitlement": "free",
    "current_period_start": "2026-05-01T00:00:00.000Z",
    "current_period_end": "2026-05-31T23:59:59.000Z"
  },
  "usage": {
    "period_key": "2026-05",
    "saved_links_count": 4,
    "ai_summaries_count": 3,
    "semantic_search_count": 1
  },
  "remaining": {
    "saved_links": 26,
    "ai_summaries": 17,
    "semantic_searches": 9
  }
}
```

## 3. POST /saved-items

### Request

```json
{
  "url": "https://example.com/article"
}
```

### Success Response

```json
{
  "id": "uuid",
  "url": "https://example.com/article",
  "normalized_url": "https://example.com/article",
  "title": null,
  "processing_status": "pending",
  "created_at": "2026-05-17T12:00:00.000Z"
}
```

### Limit Exceeded Response

HTTP status:

```http
402 Payment Required
```

```json
{
  "code": "upgrade_required",
  "message": "You have reached your monthly saved links limit.",
  "current_plan": "free",
  "required_action": "upgrade",
  "limit_type": "saved_links"
}
```

## 4. GET /saved-items

### Query Params

```text
page
limit
category_id
tag
source_domain
processing_status
from
to
```

### Response

```json
{
  "items": [
    {
      "id": "uuid",
      "title": "Article title",
      "url": "https://example.com/article",
      "thumbnail_url": "https://example.com/image.jpg",
      "short_summary": "Short summary here.",
      "category": {
        "id": "uuid",
        "name": "AI"
      },
      "tags": ["ai", "productivity"],
      "processing_status": "completed",
      "created_at": "2026-05-17T12:00:00.000Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 100,
    "total_pages": 5
  }
}
```

## 5. GET /saved-items/:id

### Response

```json
{
  "id": "uuid",
  "url": "https://example.com/article",
  "normalized_url": "https://example.com/article",
  "title": "Article title",
  "description": "Description",
  "thumbnail_url": "https://example.com/image.jpg",
  "source_domain": "example.com",
  "content_type": "article",
  "language": "en",
  "summary": "Detailed summary.",
  "short_summary": "Short summary.",
  "main_points": [
    "Point 1",
    "Point 2"
  ],
  "category": {
    "id": "uuid",
    "name": "AI"
  },
  "tags": ["ai", "productivity"],
  "processing_status": "completed",
  "extraction_status": "full_content",
  "user_notes": null,
  "created_at": "2026-05-17T12:00:00.000Z"
}
```

## 6. PATCH /saved-items/:id

### Request

```json
{
  "title": "Updated title",
  "category_id": "uuid",
  "tags": ["ai", "research"],
  "user_notes": "Important reference."
}
```

### Response

```json
{
  "id": "uuid",
  "updated": true
}
```

## 7. DELETE /saved-items/:id

### Response

```json
{
  "id": "uuid",
  "deleted": true
}
```

## 8. GET /saved-items/search

### Query Params

```text
q=pricing strategy
mode=keyword|semantic|hybrid
category_id=
tag=
source_domain=
from=
to=
page=
limit=
```

### Response

```json
{
  "items": [
    {
      "id": "uuid",
      "title": "SaaS pricing strategy",
      "url": "https://example.com",
      "short_summary": "Summary.",
      "score": 0.91,
      "match_type": "semantic"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 12,
    "total_pages": 1
  }
}
```

## 9. POST /webhooks/revenuecat

### Headers

```http
Authorization: Bearer <REVENUECAT_WEBHOOK_SECRET>
```

### Behavior

- Verify secret.
- Store raw payload.
- Update user subscription.
- Return 200.

### Response

```json
{
  "received": true
}
```

## 10. Standard Error

```json
{
  "code": "validation_error",
  "message": "Invalid input.",
  "details": []
}
```
