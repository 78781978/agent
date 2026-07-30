# Lekcja 10 / W3_BUDZET - budzet tokenow

Ten folder zawiera tylko pliki potrzebne do wdrozenia budzetu tokenow.

## 1. Najpierw Supabase

1. Wejdz w Supabase.
2. Otworz SQL Editor.
3. Utworz New query.
4. Wklej cala zawartosc pliku:

   `SQL_DO_SUPABASE.sql`

5. Kliknij Run.

To utworzy tabele:

`public.api_usage`

Tabela zapisuje:

- `user_id`
- `tokens_input`
- `tokens_output`
- `model`
- `endpoint`
- `created_at`

## 2. Potem GitHub

Wgraj zawartosc tego folderu do repozytorium, ale nie jako dodatkowy folder.
Kazdy plik ma trafic dokladnie w taka sama sciezke w repozytorium:

```txt
app/api/agent/route.ts
app/api/bariatric/route.ts
app/api/chat/route.ts
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
lib/api-usage.ts
supabase/migrations/20260730_api_usage_budget.sql
```

Nie wgrywaj folderu `DO_GITHUB_L10_W3_BUDZET_20260730_1810` jako katalogu do repo.
Wgrywasz jego zawartosc do glownych folderow projektu.

## 3. Opcjonalna zmienna do testow

Domyslny limit to 10000 tokenow dziennie na uzytkownika.

Jesli chcesz przetestowac blokade szybciej, dodaj w Vercel Environment Variables:

```txt
DAILY_TOKEN_LIMIT=100
```

Po tescie usun te zmienna albo ustaw:

```txt
DAILY_TOKEN_LIMIT=10000
```

## 4. Co robi kod

Przed wywolaniem modelu sprawdza dzisiejsze zuzycie tokenow u zalogowanego usera.
Jesli limit jest przekroczony, zwraca:

```txt
Dzienny limit tokenow (10k) zostal wyczerpany. Wroc jutro!
```

Po wywolaniu modelu zapisuje zuzycie do `api_usage`.

## 5. Sprawdzone

Build lokalny przeszedl:

```txt
npm run build
```

Status: OK.
