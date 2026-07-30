# Lekcja 10 - W2, W3, W4

Ten folder zawiera poprawki do GitHuba dla:

- W2_OBRONA: walidacja inputu, filtr outputu, limit 50 wiadomości na godzinę.
- W3_BUDZET: tabela `api_usage`, liczenie tokenów, limit 10 000 tokenów dziennie.
- W4_BRIEFINGS_PAGE: strona `/briefings` z listą briefingów od najnowszych.

## Co wgrać do GitHuba

Wgraj pliki z tego folderu dokładnie w te same ścieżki w repozytorium:

```txt
components/AppNav.tsx
app/security/page.tsx
app/briefings/page.tsx
app/api/briefings/route.ts
app/api/chat/route.ts
app/api/agent/route.ts
app/api/bariatric/route.ts
app/api/competitor/route.ts
app/api/email-triage/route.ts
app/api/fewshot/route.ts
app/api/format/route.ts
app/api/generate-image/route.ts
app/api/offer/route.ts
app/api/react/route.ts
app/api/report/route.ts
app/api/search/route.ts
app/api/think/route.ts
app/api/wash/route.ts
app/api/wash-booking/route.ts
lib/security.ts
lib/api-usage.ts
supabase/migrations/20260730_api_usage_budget.sql
```

## Co wkleić do Supabase

Plik `SQL_DO_SUPABASE.sql` zawiera ten sam SQL co migracja:

```txt
supabase/migrations/20260730_api_usage_budget.sql
```

Jeżeli tabela `api_usage` nie była jeszcze tworzona, wklej zawartość `SQL_DO_SUPABASE.sql` w Supabase:

```txt
Supabase -> SQL Editor -> New query -> Run
```

## Po wgraniu

Po wgraniu plików do GitHuba zrób redeploy w Vercel albo poczekaj na automatyczny deploy z brancha `main`.

## Sprawdzone lokalnie

Build lokalny przeszedł poprawnie:

```txt
npm.cmd run build
```

Najważniejsze strony po buildzie:

```txt
/security
/briefings
/chat
/agent
```
