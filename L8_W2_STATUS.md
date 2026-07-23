# Lekcja 8 - W2 Raporty

Status: wykonane

## Co zostało dodane

- Nowa strona `/report` z generatorem raportów.
- Nowy endpoint API `/api/report`.
- Link `Raporty` w głównym menu aplikacji.
- Pole do wpisania tematu raportu.
- Przykładowe tematy raportów do szybkiego testowania.
- Renderowanie raportu w czytelnym formacie Markdown.
- Przycisk kopiowania gotowego raportu.
- Obsługa błędów i komunikatów dla użytkownika.

## Narzędzia agenta raportów

- `searchWikipedia` - wyszukuje streszczenia w Wikipedii.
- `readWebPage` - czyta publiczne strony WWW.
- `calculator` - liczy proste wartości i procenty.
- `google_search` - opcjonalne Google grounding, włączane przez `ENABLE_SEARCH_GROUNDING=true`.

## Weryfikacja

- `npm run build` zakończone sukcesem.
- `/report` zwraca status 200.
- `/api/report` poprawnie waliduje brak tematu i zwraca status 400.

## Pliki do GitHuba

- `app/report/page.tsx`
- `app/api/report/route.ts`
- `components/AppNav.tsx`
- `app/globals.css`
- `L8_W2_STATUS.md`
