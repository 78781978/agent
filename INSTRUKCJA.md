# Lekcja 9 / W4 - Briefingi

Wgraj zawartość tego folderu do głównego katalogu repozytorium GitHub `78781978/agent`.

## Pliki do podmiany / dodania

1. `app/page.tsx`
   - podmień istniejący plik,
   - zawiera wcześniejszą poprawkę ikon na dashboardzie.

2. `components/AppNav.tsx`
   - podmień istniejący plik,
   - dodaje link `Briefingi` do menu,
   - naprawia polskie znaki w nazwach zakładek.

3. `app/globals.css`
   - podmień istniejący plik,
   - dodaje style dla strony briefingów.

4. `app/api/briefings/route.ts`
   - dodaj nowy plik w tej ścieżce,
   - endpoint pobiera ostatnie 30 briefingów z Supabase.

5. `app/briefings/page.tsx`
   - dodaj nowy plik w tej ścieżce,
   - strona `/briefings` pokazuje listę briefingów, szczegóły, kopiowanie i ręczne generowanie.

## Po wgraniu

1. Poczekaj na deploy w Vercel.
2. Wejdź na `/briefings`.
3. Kliknij `Wygeneruj teraz`.
4. Sprawdź, czy nowy briefing pojawia się na górze listy.

## Sprawdzone lokalnie

`npm run build` zakończony poprawnie.
