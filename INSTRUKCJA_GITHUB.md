# DO_GITHUB_L9_W1_MORNING_BRIEFING_20260728

To jest paczka plikow do wgrania na GitHub dla Lekcji 9 / W1 Morning Briefing.

## Co wgrac

Wgraj zawartosc tego folderu do glownego katalogu repozytorium `agent`, zachowujac strukture folderow:

- `app/api/cron/morning/route.ts`
- `supabase/migrations/202607280001_morning_briefings.sql`

## Co robi zmiana

Dodaje endpoint:

`GET /api/cron/morning`

Endpoint:

1. pobiera pogode dla Warszawy,
2. pobiera kursy EUR i USD,
3. pobiera aktualna date,
4. generuje poranny briefing przez Gemini,
5. zapisuje wynik do tabeli `briefings` w Supabase,
6. zwraca JSON z `success`, `date` i `preview`.

## Supabase

W Supabase SQL Editor uruchom plik:

`supabase/migrations/202607280001_morning_briefings.sql`

Utworzy tabele `briefings` i polityki RLS.

## Test lokalny

Po uruchomieniu projektu wejdz w przegladarce:

`http://localhost:3000/api/cron/morning`

## Test produkcyjny po deployu

Po wdrozeniu na Vercel sprawdz:

`https://TWOJA-DOMENA/api/cron/morning`

## Wazne zmienne srodowiskowe

Na Vercel i lokalnie powinny byc ustawione:

- `GOOGLE_GENERATIVE_AI_API_KEY`
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`

Nie wklejaj kluczy do kodu ani do GitHuba.
