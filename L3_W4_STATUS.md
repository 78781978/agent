# Lekcja 3 - Warsztat 4

Status: wykonane.

Co zostalo dodane:

1. Strona `/agent` jako glowne centrum dowodzenia agenta.
2. Panel narzedzi: kalkulator, data/czas, Google Search, czytanie stron, generowanie obrazow, analiza screenshotow.
3. Klikalne scenariusze laczace kilka narzedzi.
4. Obsluga wklejania screenshotow przez Ctrl+V w polu wiadomosci.
5. Timeline narzedzi pod odpowiedzia agenta.
6. Licznik uzytych narzedzi, czas odpowiedzi i model.
7. Narzedzie `generateImage` w `/api/chat`, uzywajace darmowego trybu Pollinations AI.
8. Narzedzia `calculator` i `currentDateTime` w `/api/chat`.
9. Wielokrokowe dzialanie agenta przez `stopWhen: stepCountIs(5)`.
10. Adresy pomocnicze `/chat`, `/vision`, `/extract`, zeby nawigacja z W4 nie prowadzila do pustych stron.

Adres testowy:

`http://127.0.0.1:3000/agent`
