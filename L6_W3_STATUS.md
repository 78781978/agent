# Lekcja 6 / W3 - searchKnowledge

Status: wykonane.

Co dodano:

- Funkcja `searchKnowledge()` w `lib/knowledge.ts`.
- Endpoint testowy `/api/search-knowledge`.
- Narzędzie `searchKnowledge` w:
  - `/api/chat`,
  - `/api/agent`,
  - `/api/react`.
- Zasady w promptach: pytania o cennik, ofertę, FAQ, regulamin i procedury mają najpierw korzystać z bazy wiedzy.

Ważna poprawka:

Dodano filtr zgodności słów kluczowych, bo samo podobieństwo wektorowe zwracało zbyt luźne wyniki. Dzięki temu pytanie o `Tesla Model S` nie zwraca już firmowego cennika tylko dlatego, że zawiera słowo "kosztuje".

Testy:

- `Ile kosztuje pakiet Premium?` -> znaleziono cennik z ceną 299 zł.
- `Co zawiera pakiet VIP?` -> znaleziono cennik.
- `Czy mogę zrezygnować?` -> znaleziono informację z cennika.
- `Ile kosztuje samochód Tesla Model S?` -> brak wyniku w bazie wiedzy.
- Główny chat `/api/chat` użył narzędzia `searchKnowledge` i zwrócił odpowiedź zawierającą 299 zł.
- `npm run build` zakończył się sukcesem.
