# Naprawa formularza raportów

Status: wykonane

## Co naprawiono

- Formularz na stronie `/report` nie wygląda już jak surowy HTML.
- Pole tematu raportu ma pełną szerokość, ciemne tło, obramowanie i focus.
- Przycisk `Generuj raport` jest spójny wizualnie z resztą aplikacji.
- Układ działa responsywnie na mniejszych ekranach.
- Plik `app/report/page.tsx` został odświeżony z poprawnymi polskimi znakami.

## Testy

- `npm run build` zakończone sukcesem.
- Lokalna strona `/report` zwraca status 200.

## Pliki do GitHuba

- `app/report/page.tsx`
- `app/globals.css`
- `REPORT_FORM_FIX_STATUS.md`
