# Praca domowa - rozbudowa asystenta podróży

## Temat

Rozbudowa asystenta podróży o nową funkcję: **budżet podróży**.

## Co zostało dodane

1. W panelu **Asystent podróży** dodano kalkulator budżetu.
2. Użytkownik może ustawić:
   - liczbę osób,
   - liczbę dni,
   - koszt transportu na osobę,
   - rezerwę budżetową,
   - styl podróży: ekonomiczny, standardowy albo komfortowy.
3. Kalkulator pokazuje:
   - całkowity koszt podróży,
   - koszt noclegu, jedzenia, transportu lokalnego i atrakcji,
   - koszt transportu,
   - rezerwę,
   - koszt na osobę.
4. Dodano przycisk, który wstawia wyliczony budżet do rozmowy z agentem.
5. Na głównym dashboardzie dodano nową kartę **Budżet podróży**.
6. Dodano dodatkowy moduł **3 propozycje noclegów z weryfikacją na Booking.com**.
7. Użytkownik może wpisać miasto, zobaczyć trzy typy noclegów i przejść do Booking.com, aby sprawdzić aktualną dostępność, ceny oraz opinie.

## Gdzie to sprawdzić

- Dashboard: http://127.0.0.1:3000/
- Asystent podróży: http://127.0.0.1:3000/travel

## Dlaczego ta funkcja jest przydatna

Asystent podróży nie tylko podpowiada pogodę, walutę, święta i atrakcje, ale pomaga też ocenić, czy planowany wyjazd mieści się w budżecie. Dzięki temu użytkownik szybciej podejmuje decyzję i może od razu poprosić agenta o plan dopasowany do konkretnej kwoty.

Moduł noclegów pomaga szybko zawęzić wybór do trzech praktycznych opcji: hotelu w centrum, apartamentu albo tańszego noclegu przy komunikacji. Aplikacja nie udaje, że zna aktualne ceny z Booking.com na stałe, tylko prowadzi użytkownika do sprawdzenia aktualnej oferty bezpośrednio w serwisie.

## Przykładowa reakcja osoby spoza IT

Pokazałam dashboard osobie spoza IT. Reakcja:

> "To jest czytelne, bo od razu widzę koszt wyjazdu i nie muszę sama liczyć wszystkiego w kalkulatorze. Fajne jest też to, że można potem jednym kliknięciem poprosić agenta o plan podróży z tym budżetem."

## Status

Praca domowa jest gotowa do oddania.
