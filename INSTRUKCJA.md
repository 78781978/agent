# Poprawka: sierpniowe terminy w agencie rezerwacji myjni

Wgraj do GitHuba pliki z zachowaniem ścieżek:

1. app/wash-booking/page.tsx
2. lib/washgo-data.ts

Co zmieniono:
- najbliższe wolne terminy są teraz przykładowymi terminami sierpniowymi,
- wybrano 10 terminów bez niedziel,
- widok pokazuje 10 terminów zamiast 8,
- backend agenta korzysta z tej samej listy terminów przez washGoMockData.

Nowe terminy:
- sobota, 01.08, 08:00
- poniedziałek, 03.08, 10:00
- wtorek, 04.08, 12:00
- środa, 05.08, 14:00
- czwartek, 06.08, 16:00
- piątek, 07.08, 08:00
- sobota, 08.08, 10:00
- poniedziałek, 10.08, 12:00
- wtorek, 11.08, 14:00
- środa, 12.08, 16:00

Sprawdzenie lokalne:
- npm run build: OK
