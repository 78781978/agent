# Lekcja 4 / W2 - Asystent podróży

Status: wykonane.

Zrobione:
- Rozpakowano paczkę `laba-agenci-ai-main (3).zip` do katalogu roboczego.
- Przeczytano instrukcję `lekcja_04/W2_BRIEFING.md`.
- Dodano endpoint `POST /api/travel`.
- Dodano stronę `GET /travel`.
- Dodano asystenta podróży, który sprawdza:
  - pogodę,
  - kurs waluty,
  - święta w kraju docelowym,
  - informacje i atrakcje z Wikipedii,
  - przeliczenie budżetu z PLN.
- Dodano scenariusze testowe z instrukcji.
- Dodano tryb porównania dwóch miast.
- Dodano karty wyników: pogoda, waluta, święta, atrakcje.
- Dodano link `Podróże` w nawigacji.

Weryfikacja:
- Test `Planuję weekend w Berlinie. Budżet: 2000 PLN` potwierdził użycie:
  `getWeather`, `getExchangeRate`, `getHolidays`, `searchWikipedia`, `calculator`.
- Test `Porównaj Barcelonę i Lizbonę na wakacje` potwierdził tabelę porównawczą i rekomendację.
- `npm run build` przechodzi poprawnie.
