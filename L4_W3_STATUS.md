# Lekcja 4 / W3 - Obsługa błędów i limity

Status: wykonane.

Zrobione:
- Przeczytano instrukcję `lekcja_04/W3_ERROR_HANDLING.md`.
- Dodano bezpieczny timeout 5 sekund dla zewnętrznych zapytań API.
- Dodano wspólną obsługę błędów połączenia i timeoutów.
- Dodano walidację:
  - pustego lub nieznanego miasta,
  - błędnego kodu waluty,
  - błędnego kodu kraju,
  - niedozwolonych wyrażeń w kalkulatorze, np. `import`, `require`, `eval`, `process`.
- Poprawiono tryb podróży, żeby nie zgadywał miasta, gdy użytkownik poda nieznaną nazwę.
- Dodano panel `Diagnostyka` w `/react`.
- Dodano panel `Diagnostyka` w `/travel`.
- Panel pokazuje:
  - liczbę kroków,
  - listę narzędzi z liczbą wywołań,
  - liczbę błędów,
  - czas odpowiedzi,
  - status zadania,
  - alerty dla błędów narzędzi.
- Dodano reguły obsługi błędów do promptu ReAct.

Weryfikacja:
- `Planuję podróż do Qwerty` zwraca czytelny błąd i nie robi planu dla Berlina.
- `Ile kosztuje XYZ?` używa `getExchangeRate` i pokazuje błąd waluty.
- `Święta w ZZ na 2026` używa `getHolidays` i pokazuje błąd kraju.
- `Oblicz import('os')` używa kalkulatora i blokuje niedozwolone wyrażenie.
- `Planuję weekend w Berlinie. Budżet: 2000 PLN` nadal działa poprawnie.
- `npm run build` przechodzi poprawnie.
