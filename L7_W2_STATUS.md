# Lekcja 7 / W2 - status wykonania

## Wykonane

- Przeczytano instrukcje `W2_DEPLOY.md`.
- Przygotowano projekt pod Vercel.
- Dodano `vercel.json` z ustawieniami Next.js.
- Dodano `VERCEL_DEPLOY.md` z instrukcja deployu krok po kroku.
- Rozszerzono `.env.example` o zmienne wymagane/rekomendowane dla Vercel.
- Dodano skrypt `npm run vercel:env-check`.
- Zaktualizowano `README.md`.

## Sprawdzone lokalnie

Wykonano:

```powershell
npm run vercel:env-check
npm run build
```

Wynik:

- `npm run vercel:env-check` zakonczony poprawnie.
- `npm run build` zakonczony poprawnie.
- Projekt jest gotowy technicznie do importu w Vercel.

Uwaga:

- `SUPABASE_SERVICE_ROLE_KEY` nie jest obecnie w `.env.local`.
- Skrypt oznacza go jako rekomendowany, nie wymagany, bo aktualny kod korzysta z publicznego Supabase anon key.

## Czego nie wykonano automatycznie

Nie wykonano importu projektu do Vercel, bo wymaga to:

- zalogowania na konto Vercel,
- polaczenia z kontem GitHub,
- wybrania repozytorium,
- wklejenia prywatnych zmiennych srodowiskowych w panelu Vercel.

Te kroki sa opisane w `VERCEL_DEPLOY.md`.
