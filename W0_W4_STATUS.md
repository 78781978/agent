# Status warsztatow W0-W4

## W0 - Setup

Gotowe:

- Node.js zainstalowany.
- npm zainstalowany.
- Projekt `moj-agent` utworzony.
- Plik `.env.local` istnieje i zawiera zmienna `GOOGLE_GENERATIVE_AI_API_KEY`.
- Paczki npm zainstalowane.

## W1 - Chatbot

Gotowe:

- Endpoint `app/api/chat/route.ts`.
- `streamText` z Vercel AI SDK.
- Model Google Gemini.
- Interfejs czatu na stronie glownej.
- Streaming odpowiedzi.
- Stan ladowania `Mysle...`.

## W2 - Persona

Gotowe:

- Agentka ma imie: Vie.
- Rola: konsultantka automatyzacji AI dla malych firm, e-commerce, WordPress i WooCommerce.
- System prompt ogranicza odpowiedzi do dziedziny agenta.
- Interfejs ma tytul i opis persony.

## W3 - Tryby rozmowy

Gotowe:

- Tryb Casual.
- Tryb Ekspert.
- Tryb Kreatywny.
- Przelacznik trybow w interfejsie.
- Tryb jest wysylany do API z wiadomoscia.
- Odpowiedzi AI maja badge z trybem.

## W4 - Pamiec

Gotowe:

- Historia rozmowy jest przekazywana do API.
- Agent ma instrukcje pamieci w system prompt.
- Komenda `podsumuj` dziala.
- Panel kontekstu pokazuje liczbe wiadomosci i przyblizone tokeny.
- Przycisk `Nowa rozmowa` czysci historie.
- Przycisk `Eksportuj rozmowe` kopiuje rozmowe do schowka.

## Testy wykonane

- `npm run build` zakonczony sukcesem.
- Strona `http://127.0.0.1:3000/` odpowiada.
- Test wiadomosci do AI zakonczony sukcesem.
- Test trybu Kreatywnego zakonczony sukcesem.
- Test eksportu rozmowy zakonczony sukcesem.

## Uruchomienie

W folderze `moj-agent`:

```powershell
npm run dev -- --hostname 127.0.0.1 --port 3000
```

Adres:

```text
http://127.0.0.1:3000/
```
