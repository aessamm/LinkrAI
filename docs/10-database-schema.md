# 10 — Database Schema

This document defines the initial logical database schema. Implementation can use Prisma migrations.

## 1. users

```text
id UUID PK
supabase_user_id TEXT UNIQUE NOT NULL
email TEXT UNIQUE NOT NULL
display_name TEXT NULL
auth_provider TEXT NULL
created_at TIMESTAMP
updated_at TIMESTAMP
```

## 2. user_profiles

```text
id UUID PK
user_id UUID FK users(id) UNIQUE
preferred_language TEXT DEFAULT 'en'
timezone TEXT NULL
onboarding_completed BOOLEAN DEFAULT false
created_at TIMESTAMP
updated_at TIMESTAMP
```

## 3. plans

```text
id UUID PK
code TEXT UNIQUE NOT NULL -- free, pro, power
name TEXT NOT NULL
monthly_link_limit INT NOT NULL
monthly_ai_summary_limit INT NOT NULL
monthly_semantic_search_limit INT NOT NULL
max_categories INT NULL -- null means unlimited
features_json JSONB
created_at TIMESTAMP
updated_at TIMESTAMP
```

## 4. user_subscriptions

```text
id UUID PK
user_id UUID FK users(id)
provider TEXT NOT NULL -- revenuecat, stripe, manual
provider_customer_id TEXT NULL
provider_subscription_id TEXT NULL
entitlement TEXT NOT NULL -- free, pro, power
status TEXT NOT NULL -- active, trialing, cancelled, expired, past_due
current_period_start TIMESTAMP NULL
current_period_end TIMESTAMP NULL
created_at TIMESTAMP
updated_at TIMESTAMP
```

## 5. usage_counters

```text
id UUID PK
user_id UUID FK users(id)
period_key TEXT NOT NULL -- YYYY-MM
saved_links_count INT DEFAULT 0
ai_summaries_count INT DEFAULT 0
semantic_search_count INT DEFAULT 0
youtube_analysis_count INT DEFAULT 0
pdf_analysis_count INT DEFAULT 0
created_at TIMESTAMP
updated_at TIMESTAMP

UNIQUE(user_id, period_key)
```

## 6. categories

```text
id UUID PK
user_id UUID FK users(id)
name TEXT NOT NULL
slug TEXT NOT NULL
is_ai_generated BOOLEAN DEFAULT false
created_at TIMESTAMP
updated_at TIMESTAMP

UNIQUE(user_id, slug)
```

## 7. tags

```text
id UUID PK
user_id UUID FK users(id)
name TEXT NOT NULL
slug TEXT NOT NULL
created_at TIMESTAMP
updated_at TIMESTAMP

UNIQUE(user_id, slug)
```

## 8. saved_items

```text
id UUID PK
user_id UUID FK users(id)
category_id UUID FK categories(id) NULL

url TEXT NOT NULL
normalized_url TEXT NOT NULL
canonical_url TEXT NULL

title TEXT NULL
description TEXT NULL
thumbnail_url TEXT NULL
source_domain TEXT NULL
source_platform TEXT NULL
content_type TEXT NULL -- article, video, social_post, pdf, unknown

language TEXT NULL
summary TEXT NULL
short_summary TEXT NULL
raw_text TEXT NULL
main_points JSONB NULL

processing_status TEXT DEFAULT 'pending' -- pending, processing, completed, failed
extraction_status TEXT NULL -- full_content, partial_content, metadata_only, failed
processing_error TEXT NULL

user_notes TEXT NULL

embedding VECTOR NULL -- pgvector later

created_at TIMESTAMP
updated_at TIMESTAMP
deleted_at TIMESTAMP NULL
```

## 9. saved_item_tags

```text
saved_item_id UUID FK saved_items(id)
tag_id UUID FK tags(id)

PRIMARY KEY(saved_item_id, tag_id)
```

## 10. billing_events

```text
id UUID PK
user_id UUID FK users(id) NULL
provider TEXT NOT NULL
event_type TEXT NOT NULL
payload_json JSONB NOT NULL
processed_at TIMESTAMP
created_at TIMESTAMP
```

## 11. processing_jobs

Optional if BullMQ persistence is not enough.

```text
id UUID PK
saved_item_id UUID FK saved_items(id)
queue_job_id TEXT NULL
status TEXT NOT NULL
attempts INT DEFAULT 0
last_error TEXT NULL
created_at TIMESTAMP
updated_at TIMESTAMP
```

## 12. Indexes

Recommended:

```text
users.supabase_user_id
users.email
saved_items.user_id
saved_items.normalized_url
saved_items.category_id
saved_items.source_domain
saved_items.processing_status
saved_items.created_at
categories.user_id + slug
tags.user_id + slug
usage_counters.user_id + period_key
user_subscriptions.user_id + status
```

For semantic search later:

```text
saved_items.embedding vector index
```
