# BariCare AI - scenariusz pacjenta przed i po operacji bariatrycznej

## Status

Zaimplementowano nowy scenariusz: **BariCare AI**.

Adres lokalny:

```text
http://127.0.0.1:3000/bariatric
```

## Cel

BariCare AI jest edukacyjnym asystentem pacjenta przed i po operacji bariatrycznej.

Pomaga:

- przygotować się do wizyty u lekarza lub dietetyka,
- ułożyć listę pytań,
- uporządkować etap diety,
- prowadzić dzienniczek posiłków, płynów i objawów,
- przygotować krótki raport dla dietetyka.

## Bezpieczeństwo

Agent nie diagnozuje, nie leczy i nie zmienia zaleceń lekarza.

W scenariuszu dodano ostrzeżenia, że przy objawach alarmowych pacjent powinien pilnie skontaktować się ze specjalistą.

Objawy alarmowe:

- narastający ból brzucha,
- uporczywe wymioty,
- objawy odwodnienia,
- gorączka,
- duszność,
- omdlenia,
- krwawienie,
- niemożność przyjmowania płynów,
- szybkie pogorszenie samopoczucia.

## Źródła bazowe

- Narodowe Centrum Edukacji Żywieniowej - zalecenia żywieniowe po operacji bariatrycznej.
- leczotylosc.pl - informacje o konsultacji dietetycznej przed i po zabiegu.
- ASMBS - ogólne informacje o życiu po operacji bariatrycznej.

## Pliki

```text
app/bariatric/page.tsx
app/api/bariatric/route.ts
components/AppNav.tsx
app/page.tsx
PROJEKT_DOKUMENTACJA/lekcje/lekcja_08/BARICARE_STATUS.md
```
