# L10 - panel monitoringu bezpieczenstwa

Wgraj zawartosc tego folderu do glownego katalogu repozytorium GitHub:

`78781978/agent`

## Pliki do podmiany / dodania

- `app/security/page.tsx`
- `app/api/security/stats/route.ts`
- `app/api/chat/route.ts`
- `app/api/agent/route.ts`
- `lib/security.ts`

## Co zostalo dodane

- licznik prob naduzyc w panelu `/security`,
- licznik zablokowanych wiadomosci,
- licznik odfiltrowanych odpowiedzi,
- licznik trafien limitow,
- lista ostatnich zdarzen bezpieczenstwa,
- endpoint `/api/security/stats`.

## Po wgraniu

1. Zrob commit na GitHubie.
2. Poczekaj na deploy Vercel.
3. Otworz `/security`.
4. Przetestuj normalna wiadomosc i probe wymuszenia system promptu.

Build lokalny przeszedl poprawnie po tej zmianie.
