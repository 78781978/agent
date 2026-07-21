# Wash&Go Revenue Agent

Status: MVP pracy domowej gotowe.

## Co powstało

- Osobna strona agenta: `/wash`
- Osobna strona obsługi klienta: `/wash-booking`
- Testowa strona WWW myjni: `/wash-site`
- Osobny endpoint API: `/api/wash`
- Osobny endpoint obsługi klienta: `/api/wash-booking`
- Dane testowe myjni w `lib/washgo-data.ts`
- Logo myjni w `public/images/washgo-logo.png`
- Lista usług, czasy, ceny i reguły biznesowe
- Widełki cenowe zamiast jednej sztywnej ceny
- Reguły dopłat dla SUV, kombi, vanów, sierści i silnych zabrudzeń
- Mockowane dane operacyjne: pogoda, wolne terminy, grupy lokalne
- Agent generuje:
  - analizę sytuacji,
  - decyzję biznesową,
  - rekomendację usługi prowadzącą do rezerwacji,
  - orientacyjną wycenę w widełkach,
  - post na Facebooka,
  - scenariusz rolki,
  - rekomendowane grupy lokalne,
  - odpowiedzi na komentarze,
  - plan publikacji,
  - raport decyzji,
  - Guardian Check.
- Komenda biznesowa `/email`, która tworzy profesjonalną odpowiedź e-mail do klienta.
- Plik pracy domowej: `PRACA_DOMOWA_WASHGO_EMAIL_COMMAND.md`

## Charakter MVP

To nie jest jeszcze produkcyjna aplikacja z prawdziwym kalendarzem i Facebookiem.
To demo z mockami, ale architektura jest przygotowana tak, aby później podmienić mocki na prawdziwe API.

## Strona testowa

Strona `/wash-site` pokazuje przykładową stronę myjni ręcznej:

- hero z logo i CTA,
- sekcję usług,
- orientacyjny cennik,
- proces rezerwacji,
- opinie testowe,
- link do agenta Wash&Go Revenue Agent.

Ważne rozdzielenie:

- `/wash-booking` jest dla klienta myjni i działa jak doradca/receptionist.
- `/wash` jest dla właściciela myjni i służy do kampanii, social mediów i raportu decyzji.

## Moduły wewnętrzne

- Booking Brain: terminy, usługi, orientacyjny czas, droga do rezerwacji.
- Marketing Brain: posty, rolki, grupy lokalne, kampanie pogodowe.
- Customer Brain: odpowiedzi na komentarze, pytania o cenę i terminy.
- Guardian Brain: bezpieczeństwo, zgodność z cennikiem, brak spamu.

## Najważniejsze reguły

- Agent nie publikuje samodzielnie.
- Agent nie rezerwuje samodzielnie.
- Treści wymagają akceptacji właściciela.
- Reklamacje przekazuje człowiekowi.
- Nie obiecuje dokładnej ceny bez oględzin auta.

## Komenda `/email`

Przykład użycia:

`/email Klient napisał, że po praniu tapicerki nadal czuje wilgoć i jest niezadowolony.`

Agent zwraca:

- temat wiadomości,
- gotowy e-mail,
- krótkie uzasadnienie,
- checklistę przed wysłaniem.
