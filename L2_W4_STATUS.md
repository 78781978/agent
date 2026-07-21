# Status lekcji 2 - W4_FORMATOWANIE

## Wykonane

- Przeczytano plik kursu:

```text
C:\Users\DELL\Desktop\LABA\laba-agenci-ai-main\lekcja_02\W4_FORMATOWANIE.md
```

- Dodano endpoint:

```text
app/api/format/route.ts
```

- Endpoint rozpoznaje komendy:
  - `/tabela`
  - `/lista`
  - `/porownanie`
  - `/faq`
  - `/email`

- Endpoint używa Google Gemini i streamuje odpowiedź.
- System prompt wymusza odpowiedzi w markdown.
- Przy tabelach i porownaniach wymusza prawdziwe tabele markdown.

## Strona

- Dodano stronę:

```text
app/format/page.tsx
```

- Strona ma nagłówek:

```text
📐 Formatowanie
```

- Strona ma podtytuł:

```text
Agent odpowiada w tabeli, liście, porównaniu - na żądanie.
```

- Dodano przyciski komend:
  - `/tabela języki programowania 2026`
  - `/porownanie ChatGPT vs Claude`
  - `/lista 5 kroków do pierwszego agenta AI`
  - `/faq sztuczna inteligencja dla początkujących`
  - `/email podziękowanie za udaną rekrutację`

## Renderowanie

- Dodano prosty renderer markdown w stronie `/format`.
- Renderer obsługuje:
  - nagłówki,
  - pogrubienia,
  - listy numerowane,
  - listy punktowane,
  - tabele markdown jako HTML `<table>`.

- Dodano style tabel w:

```text
app/globals.css
```

## Nawigacja

- Dodano link `📐 Formater` do:
  - strony głównej Vie,
  - trybu myślenia `/think`,
  - słownika `/fewshot`,
  - panelu myjni `/wash`,
  - rezerwacji klienta `/wash-booking`,
  - strony testowej myjni `/wash-site`.

## Testy

- `npm run build` przeszedł poprawnie.
- Next.js widzi nowe trasy:
  - `/api/format`
  - `/format`
- Lokalny adres `http://127.0.0.1:3000/format` zwrócił `HTTP 200`.

## Data

Sprawdzone i uzupełnione: 2026-07-07.
