# Lekcja 10 - W2 Obrona

Wgraj pliki z tego folderu do repozytorium GitHub, zachowując dokładnie takie same ścieżki:

- `app/api/chat/route.ts`
- `app/api/agent/route.ts`
- `lib/security.ts`

Co zostało dodane:

1. Walidacja inputu przed wysłaniem wiadomości do modelu.
   - limit 2000 znaków,
   - blokada typowych prób prompt injection,
   - czyszczenie znaków kontrolnych i zero-width.

2. Filtr outputu.
   - blokuje próby ujawnienia system promptu,
   - blokuje fragmenty przypominające klucze API, sekrety, service role i dane techniczne zaplecza.

3. Limit wiadomości per user.
   - 50 wiadomości na godzinę na użytkownika,
   - limit działa w pamięci procesu API.

Po wgraniu plików na GitHub Vercel powinien wykonać deploy automatycznie.

Sprawdzone lokalnie:

```txt
npm run build
OK
```
