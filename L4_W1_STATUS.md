# Lekcja 4 / W1 - ReAct Loop

Status: wykonane.

Zrobione:
- Dodano endpoint `POST /api/react`.
- Dodano stronę `GET /react`.
- Dodano narzędzia ReAct: kalkulator, data/czas, pogoda, kursy walut, święta, Wikipedia, czytanie stron, zapis i odczyt notatek oraz Google Search.
- Dodano scenariusze wielokrokowe z pliku `W1_REACT_LOOP.md`.
- Dodano wizualizację sekcji: Myślę, Obserwuję, Wynik końcowy.
- Dodano pasek postępu `Krok X z 5`.
- Dodano link `ReAct` do głównych nawigacji.

Weryfikacja:
- `npm run build` przechodzi poprawnie.
- Strona `http://127.0.0.1:3000/react` odpowiada.
- Endpoint `/api/react` odpowiada i w teście walut użył narzędzia `getExchangeRate`.

Poprawka po teście:
- Naprawiono przypadek, w którym model pisał, że `getWeather` i `getHolidays` są niedostępne.
- Dodano bezpośrednią warstwę wykonania ReAct dla zadań o pogodzie, świętach, Wikipedii i walutach.
- Test scenariusza weekendu w Krakowie potwierdził użycie `getWeather`, `getHolidays` i `searchWikipedia`.

Poprawka rekomendacji:
- Agent nie kończy już ogólną poradą typu "sprawdź pogodę", tylko sam podaje konkretną decyzję.
- Wynik końcowy łączy pogodę, święta i atrakcje w jedną krótką rekomendację.
- Odpowiedź dla użytkownika nie pokazuje już technicznych notatek "Myślę / Obserwuję".
- Wyniki Wikipedii są filtrowane, żeby przy Krakowie nie pojawiały się nietrafione strony, np. Berlin.
- Dodano awaryjną prognozę testową, gdy zewnętrzne API pogody chwilowo nie odpowiada.
