# Praca domowa: komenda biznesowa `/email`

## Nazwa agenta

Wash&Go Revenue Agent

## Cel pracy domowej

Celem było dodanie do agenta własnej komendy biznesowej, która przyjmuje temat lub opis sytuacji i zwraca gotowy, profesjonalny materiał w jednolitym formacie.

Wybrana komenda:

`/email`

Komenda służy do przygotowywania profesjonalnych odpowiedzi e-mail do klientów myjni ręcznej Wash&Go, szczególnie w trudnych sytuacjach:

- reklamacja,
- niezadowolenie klienta,
- prośba o duży rabat,
- pytanie o cenę,
- spór o jakość usługi,
- potrzeba spokojnego wyjaśnienia zasad.

## Gdzie komenda jest wdrożona

Komenda działa w panelu właściciela:

`/wash`

Endpoint API:

`/api/wash`

Plik z logiką promptu:

`app/api/wash/route.ts`

## Jak używać komendy

Użytkownik wpisuje:

```text
/email [opis sytuacji klienta]
```

Przykład:

```text
/email Klient napisał, że po praniu tapicerki nadal czuje wilgoć i jest niezadowolony.
```

## Stały format odpowiedzi

Agent zawsze zwraca materiał w tym formacie:

```md
### Temat wiadomości
[krótki temat e-maila]

### Gotowy e-mail
Dzień dobry,

[profesjonalna odpowiedź]

Pozdrawiamy,
Zespół Wash&Go

### Dlaczego tak
- [uzasadnienie tonu i decyzji]

### Co sprawdzić przed wysłaniem
- [maksymalnie 3 rzeczy do sprawdzenia]
```

## Ton komunikacji

Agent pisze językiem marki Wash&Go:

- konkretnie,
- lokalnie,
- spokojnie,
- profesjonalnie,
- bez agresywnej sprzedaży,
- bez kłócenia się z klientem,
- bez obiecywania rzeczy, których firma nie może spełnić.

## Reguły bezpieczeństwa

Agent:

- nie przyznaje samodzielnie zwrotu pieniędzy,
- nie daje rabatu większego niż 10% bez zgody właściciela,
- nie obiecuje dokładnej ceny bez oględzin auta,
- przy reklamacjach zbiera fakty i proponuje kontakt,
- nie oskarża klienta,
- nie używa tonu defensywnego,
- nie publikuje ani nie wysyła wiadomości automatycznie.

## Few-shot prompting

Poniżej znajdują się przykłady zachowania, które zostały użyte w promptach agenta.

### Przykład 1: reklamacja po praniu tapicerki

**Użytkownik:**

```text
/email Klient napisał, że po praniu tapicerki nadal czuje wilgoć i jest niezadowolony.
```

**Oczekiwana odpowiedź agenta:**

```md
### Temat wiadomości
Weryfikacja po praniu tapicerki

### Gotowy e-mail
Dzień dobry,

dziękujemy za wiadomość i przykro nam, że po usłudze nadal odczuwa Pan/Pani wilgoć we wnętrzu auta. Po praniu tapicerki materiał może potrzebować dodatkowego czasu na pełne doschnięcie, szczególnie przy niższej temperaturze albo słabszej wentylacji auta.

Chcielibyśmy jednak sprawdzić sytuację, żeby upewnić się, że wszystko zostało wykonane prawidłowo. Prosimy o informację, kiedy była wykonana usługa oraz którego elementu dotyczy problem. Możemy też umówić krótkie oględziny auta w myjni.

Pozdrawiamy,
Zespół Wash&Go

### Dlaczego tak
- Odpowiedź nie kłóci się z klientem.
- Wyjaśnia możliwą przyczynę bez zrzucania winy.
- Prowadzi do sprawdzenia auta przez człowieka.

### Co sprawdzić przed wysłaniem
- Data wykonania usługi.
- Zakres prania tapicerki.
- Czy auto miało warunki do doschnięcia.
```

### Przykład 2: klient chce bardzo duży rabat

**Użytkownik:**

```text
/email Klient chce rabat 50%, bo twierdzi, że konkurencja robi taniej.
```

**Oczekiwana odpowiedź agenta:**

```md
### Temat wiadomości
Oferta na usługę pielęgnacji auta

### Gotowy e-mail
Dzień dobry,

dziękujemy za wiadomość. Rozumiemy, że cena jest ważna przy wyborze myjni. W Wash&Go wycena zależy od wielkości auta, poziomu zabrudzenia i zakresu pracy, dlatego staramy się dobierać usługę tak, żeby była rozsądna cenowo i realnie odpowiadała na potrzeby auta.

Nie możemy potwierdzić rabatu 50%, ale możemy zaproponować dopasowanie zakresu usługi do budżetu. Jeśli prześle Pan/Pani krótki opis auta lub zdjęcia wnętrza i karoserii, przygotujemy najrozsądniejszą opcję.

Pozdrawiamy,
Zespół Wash&Go

### Dlaczego tak
- Odpowiedź jest uprzejma, ale nie zgadza się na zbyt duży rabat.
- Chroni marżę firmy.
- Proponuje alternatywę zamiast odmowy bez rozwiązania.

### Co sprawdzić przed wysłaniem
- Czy klient podał model auta.
- Jaki zakres usługi porównuje z konkurencją.
- Czy można zaproponować mniejszy pakiet.
```

## Kryteria akceptacji

Komenda jest zaliczona, jeśli:

- użytkownik wpisuje `/email` i opis sytuacji,
- agent nie generuje posta ani strategii marketingowej,
- agent zwraca gotowy e-mail,
- odpowiedź ma stały format,
- odpowiedź jest profesjonalna,
- odpowiedź nie obiecuje zwrotu pieniędzy ani dużego rabatu bez zgody,
- odpowiedź zawiera krótkie uzasadnienie i checklistę przed wysłaniem.

## Status

Status: wdrożone i gotowe do testu.
