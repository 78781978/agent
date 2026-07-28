# Poprawka: waluty w panelu Podróże z NBP

Wgraj do GitHuba pliki z zachowaniem ścieżek:

1. app/travel/page.tsx
2. app/api/travel/route.ts
3. app/globals.css

Co zmieniono:
- etykieta narzędzia Waluta pokazuje teraz NBP zamiast Frankfurter ECB,
- endpoint /api/travel pobiera kursy z API Narodowego Banku Polskiego,
- źródła w odpowiedziach agenta mówią: Open-Meteo, NBP, Nager.Date, Wikipedia,
- zachowana jest wcześniejsza poprawka: Enter w polu miasta pokazuje 3 propozycje noclegów.

Sprawdzenie lokalne:
- npm run build: OK
