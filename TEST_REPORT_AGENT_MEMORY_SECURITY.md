# Test report - Agent AI memory and security stats

Data: 2026-07-31

## Zrobione

- Agent AI zapisuje rozmowe do tych samych tabel co Chat Vie.
- Agent AI wczytuje ostatnia zapisana rozmowe po odswiezeniu strony.
- Panel Bezpieczenstwo pobiera statystyki z Supabase, a nie tylko z pamieci procesu.
- Dodano zapis zdarzen: poprawne wiadomosci, zablokowane inputy, trafienia limitu wiadomosci, trafienia budzetu tokenow, filtrowane odpowiedzi.
- Dodano tabele `security_events` z RLS.

## Test techniczny

`npm.cmd run build` zakonczony sukcesem.

## Do wykonania w Supabase

Uruchomic migracje:

`supabase/migrations/20260731_security_events.sql`

Bez tej tabeli aplikacja nie powinna sie wykladac, ale liczniki bezpieczenstwa nie beda mialy gdzie zapisywac zdarzen.
