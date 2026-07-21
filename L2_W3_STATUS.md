# Status lekcji 2 - W3_FEW_SHOT

## Wykonane

- Przeczytano plik kursu:

```text
C:\Users\DELL\Desktop\LABA\laba-agenci-ai-main\lekcja_02\W3_FEW_SHOT.md
```

- Dodano endpoint:

```text
app/api/fewshot/route.ts
```

- Endpoint korzysta z Google Gemini i streamuje odpowiedz.
- System prompt zawiera few-shot prompting, czyli przyklady oczekiwanego stylu:
  - definicja API,
  - definicja B2B,
  - definicja promptu.
- Agent odpowiada w stalym formacie:
  - termin,
  - prosty opis z analogia,
  - praktyczny przyklad,
  - powiazane terminy.

## Strona

- Dodano strone:

```text
app/fewshot/page.tsx
```

- Strona ma naglowek:

```text
📚 Słownik AI
```

- Strona ma podtytul:

```text
Wyjaśniam trudne pojęcia prostym językiem.
```

- Placeholder inputa:

```text
Wpisz pojęcie do wyjaśnienia...
```

- Dodano przyciski testowe:
  - Sztuczna inteligencja
  - Agent AI
  - Prompt
  - Halucynacja AI
  - RAG
  - API

## Nawigacja

- Dodano link `📚 Słownik` do:
  - strony glownej Vie,
  - trybu myslenia `/think`,
  - panelu myjni `/wash`,
  - rezerwacji klienta `/wash-booking`,
  - strony testowej myjni `/wash-site`.

## Testy

- `npm run build` przeszedl poprawnie.
- Next.js widzi nowe trasy:
  - `/api/fewshot`
  - `/fewshot`
- Lokalny adres `http://127.0.0.1:3000/fewshot` zwrocil `HTTP 200`.

## Data

Sprawdzone i uzupelnione: 2026-07-07.
