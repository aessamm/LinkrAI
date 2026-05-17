# Linkrai Mobile

Flutter mobile app for Linkrai.

## Running Locally

```bash
flutter pub get
flutter run \
  --dart-define=SUPABASE_URL="https://your-project.supabase.co" \
  --dart-define=SUPABASE_ANON_KEY="your-publishable-or-anon-key" \
  --dart-define=LINKRAI_API_BASE_URL="http://10.0.2.2:3000/api"
```

Use `http://localhost:3000/api` for desktop/web targets or iOS simulator when appropriate.

## Verification

```bash
flutter analyze
flutter test
flutter build apk --debug
```
