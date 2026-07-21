# Lekcja 3 - Warsztat 1

Status: wykonane.

Co zostalo dodane:

1. Agent Vie korzysta z Google Search przez narzedzie `google.tools.googleSearch({})`.
2. Agent ma narzedzie `readWebPage`, ktore pobiera publiczna strone WWW, usuwa techniczne tagi HTML i zwraca do 3000 znakow czytelnego tekstu.
3. Powstala strona `/search` do testowania pytan aktualnych i czytania stron internetowych.
4. Odpowiedzi z internetu maja prosbe systemowa o podawanie zrodel jako linkow Markdown.
5. W menu aplikacji dodano link `Szukaj`.

Testy z instrukcji:

- Pytanie o najnowsze informacje z AI.
- Czytanie strony: `https://pl.wikipedia.org/wiki/Sztuczna_inteligencja`.
- Pytanie o aktualne ceny lub kursy.
- Pytanie o aktualna osobe publiczna.
- Pytanie nieaktualne, np. zart, bez potrzeby szukania w Google.
