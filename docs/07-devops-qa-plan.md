# 07 — DevOps and QA Plan

## 1. Goal

Create a reliable development and deployment foundation for the product.

## 2. Local Development

Use Docker Compose for:

- PostgreSQL
- Redis

Future services:

- MinIO for S3-compatible storage if needed
- Mailhog for email testing if needed

## 3. Environment Variables

Required variables:

```text
DATABASE_URL
REDIS_URL
SUPABASE_JWT_SECRET
REVENUECAT_WEBHOOK_SECRET
OPENAI_API_KEY
SENTRY_DSN
POSTHOG_KEY
```

## 4. CI Pipeline

GitHub Actions should run:

- Install dependencies
- Lint
- Type check
- Tests
- Build where applicable

## 5. Testing Strategy

### Backend

- Unit tests for services
- Integration tests for endpoints
- Auth guard tests
- Usage limit tests
- Webhook tests

### Worker

- Unit tests for extraction helpers
- Mock AI provider tests
- Queue processor tests

### Mobile

- Widget tests for key screens
- Integration tests later for save flow

### Web

- Component tests later
- E2E tests later

## 6. Observability

Add later:

- Sentry for errors
- PostHog for product analytics
- Structured logs
- Request IDs
- Job processing logs

## 7. Security Checklist

- Auth required on user endpoints
- Ownership checks on all saved items
- Webhook secret verification
- Rate limiting
- Validation pipes
- No secrets in logs
- No hardcoded credentials
- CORS configuration

## 8. Deployment Strategy

### MVP

- API and worker on VPS/Render/Fly.io
- PostgreSQL managed or VPS container
- Redis managed or VPS container
- Web dashboard on Vercel
- Mobile via TestFlight and Play Internal Testing

### Later

- Kubernetes or managed container platform if traffic requires it

## 9. Beta Readiness Checklist

- Auth works
- Save link works
- Processing works
- Summary/category/tags work
- Search works
- Subscription limits work
- Sentry enabled
- Basic privacy policy exists
- Critical tests pass
