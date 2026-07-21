# Lekcja 6 - W4_CYTOWANIE

Status: wykonane.

## Co zostało dodane

1. `searchKnowledge` zwraca teraz pełniejszy wynik:
   - `results[].title`
   - `results[].content`
   - `results[].similarity`
   - `results[].metadata.source`
   - `results[].metadata.chunk_index`
   - `results[].metadata.total_chunks`
   - `results[].added_at`
   - `source_documents`
   - `total_found`

2. Agent ma dopisane reguły cytowania:
   - gdy odpowiada z bazy wiedzy, kończy odpowiedź linią `📎 Źródło: ...`
   - gdy używa kilku dokumentów, może użyć `📎 Źródła: ...`

3. Agent ma dopisane reguły odmowy:
   - gdy baza wiedzy nie zawiera odpowiedzi, nie zgaduje z wiedzy ogólnej
   - odpowiada: `Nie mam informacji na ten temat w mojej bazie wiedzy. Skontaktuj się z firmą bezpośrednio.`

4. Interfejs czatu pokazuje źródło jako osobny, mniejszy element pod odpowiedzią.

5. Dodano stronę `/knowledge`:
   - pokazuje dokumenty w bazie wiedzy
   - pokazuje liczbę fragmentów
   - pozwala kliknąć dokument i zobaczyć fragmenty
   - pozwala przetestować wyszukiwanie bez rozmowy z agentem
   - pokazuje podobieństwo wyniku i źródła

6. Dodano endpoint `/api/knowledge-documents` do podglądu dokumentów i fragmentów.

## Testy

- `npm run build` - OK
- `/knowledge` - OK, strona zwraca HTTP 200
- `/api/knowledge-documents` - OK, znaleziono 2 dokumenty i 3 fragmenty
- `/api/search-knowledge` dla pytania o pakiet Premium - OK, zwraca dokument `Cennik`, `added_at` i `source_documents`
- `/api/chat` dla pytania o pakiet Premium - OK, agent używa `searchKnowledge`, podaje cenę 299 zł i źródło `Cennik`
- `/api/chat` dla pytania spoza bazy wiedzy - OK, agent nie zgaduje i odmawia odpowiedzi zgodnie z W4

## Adresy do sprawdzenia

- Dashboard: `http://127.0.0.1:3000/`
- Chat: `http://127.0.0.1:3000/chat`
- Dodawanie wiedzy: `http://127.0.0.1:3000/upload`
- Podgląd wiedzy: `http://127.0.0.1:3000/knowledge`
