# Lekcja 8 - Warsztat 4: własny scenariusz

Status: wykonane

## Co zostało zbudowane

Dodano własny scenariusz biznesowy: Generator oferty AI.

Adres lokalny:

```text
http://127.0.0.1:3000/offer
```

## Funkcja

Użytkownik wkleja opis klienta lub procesu biznesowego, a agent przygotowuje:

- krótką diagnozę,
- proponowane rozwiązanie AI,
- zakres MVP,
- etapy wdrożenia,
- orientacyjną wycenę,
- ryzyka i zabezpieczenia,
- gotowy e-mail do klienta,
- listę pytań przed startem.

## Użyte narzędzia agenta

- Google Search, gdy `ENABLE_SEARCH_GROUNDING=true`,
- Wikipedia do kontekstu branżowego,
- czytanie publicznych stron WWW,
- kalkulator do kosztów i wariantów cenowych.

## Dodane pliki

```text
app/offer/page.tsx
app/api/offer/route.ts
components/AppNav.tsx
app/page.tsx
```

## Testy

Wykonano:

```text
npm.cmd run build
```

Wynik:

```text
Build OK
/offer OK
/api/offer OK
```

## Co oddać na kurs

Screenshot strony `/offer` z wygenerowaną ofertą oraz krótka informacja, że to własny scenariusz: agent przygotowuje ofertę wdrożenia AI dla klienta.
