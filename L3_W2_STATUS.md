# Lekcja 3 - Warsztat 2

Status: wykonane.

Co zostalo dodane:

1. Endpoint `POST /api/generate-image`.
2. Strona `/generate` z interfejsem generatora grafik AI.
3. Pole `textarea` na prompt.
4. Klikalne przyklady promptow.
5. Stan ladowania z komunikatem `Generuje... (5-15 sekund)`.
6. Podglad wygenerowanego obrazu.
7. Przycisk `Pobierz`, ktory zapisuje obraz jako PNG.
8. Przycisk `Ponownie`, ktory generuje kolejny wariant tego samego promptu.
9. Link `Grafiki` w menu aplikacji.

Uwagi techniczne:

- Proba instalacji `@google/genai` zostala zablokowana przez system/srodowisko podczas pobierania z npm.
- Zeby nie zatrzymywac warsztatu, endpoint uzywa bezposredniego wywolania Google Generative Language API przez `fetch`.
- Uzywany jest ten sam klucz `GOOGLE_API_KEY` z pliku `.env.local`.
- Model ustawiony zgodnie z instrukcja warsztatu: `gemini-3.1-flash-lite-image`.

Adres testowy:

`http://127.0.0.1:3000/generate`
