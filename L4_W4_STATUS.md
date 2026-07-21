# Lekcja 4 - W4 Dashboard

## Status

Zadanie W4 zostało wykonane.

## Co zostało dodane

- Strona startowa `/` została zamieniona na dashboard.
- Dotychczasowy czat z agentem Vie został zachowany pod adresem `/chat`.
- Dodano API `/api/dashboard`, które automatycznie pobiera:
  - aktualną pogodę dla Warszawy z Open-Meteo,
  - kursy EUR i USD z NBP,
  - najbliższe święta w Polsce w 2026 roku z Nager.Date,
  - aktualną datę i godzinę.
- Dodano kafelki dashboardu:
  - powitanie i data,
  - pogoda,
  - kursy walut,
  - święta,
  - szybkie akcje.
- Dodano boczne menu na komputerze i przycisk menu na telefonie.
- Dodano odświeżanie danych:
  - pogoda co 15 minut,
  - kursy walut co godzinę,
  - przycisk ręcznego odświeżenia.
- Dodano loading skeleton, animacje, styl dark mode i responsywność.

## Testy

- `npm run build` - zaliczone.
- `/api/dashboard` - zwraca status 200.
- Pogoda - działa.
- Kursy EUR/USD - działają.
- Święta - działają.
- `/` - strona dashboardu odpowiada statusem 200.

## Jak sprawdzić

1. Uruchom aplikację lokalnie.
2. Wejdź na `http://127.0.0.1:3000/`.
3. Sprawdź kafelki dashboardu.
4. Kliknij szybkie akcje, np. `/travel`, `/react`, `/chat`.
