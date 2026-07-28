# DO_GITHUB_L9_W3_WEBHOOK_20260728

To jest paczka plikow do wgrania na GitHub dla Lekcji 9 / W3 Webhook.

## Co wgrac

Wgraj zawartosc tego folderu do glownego katalogu repozytorium `agent`, zachowujac strukture folderow:

- `app/api/webhook/route.ts`
- `supabase/migrations/202607280002_webhook_events.sql`

## Co robi zmiana

Dodaje endpoint:

`POST /api/webhook`

Endpoint przyjmuje JSON:

```json
{
  "type": "feedback",
  "data": {
    "customer": "Jan",
    "rating": 2,
    "comment": "Dlugi czas oczekiwania na odpowiedz"
  }
}
```

Obslugiwane typy zdarzen:

- `feedback` - analiza opinii klienta,
- `alert` - analiza problemu technicznego,
- `order` - podsumowanie zamowienia.

Wynik jest zapisywany w Supabase do tabeli `webhook_events`.

## Supabase

W Supabase SQL Editor uruchom plik:

`supabase/migrations/202607280002_webhook_events.sql`

Utworzy tabele `webhook_events`.

## Test w przegladarce

Po uruchomieniu projektu wejdz na strone aplikacji, otworz DevTools -> Console i wklej:

```js
fetch('/api/webhook', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    type: 'feedback',
    data: { customer: 'Jan', rating: 2, comment: 'Dlugi czas oczekiwania na odpowiedz' }
  })
}).then(r => r.json()).then(console.log)
```

Test alertu:

```js
fetch('/api/webhook', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    type: 'alert',
    data: { service: 'API', status: 'down', since: '2026-07-13T08:00:00Z' }
  })
}).then(r => r.json()).then(console.log)
```

## Opcjonalne zabezpieczenie

Mozesz dodac zmienna srodowiskowa:

`WEBHOOK_SECRET`

Jesli ja ustawisz, kazde wywolanie webhooka musi miec naglowek:

`x-webhook-secret: TWOJ_SEKRET`

Do testow kursowych nie musisz tego ustawiac.

## Sprawdzone

- TypeScript: OK
- Build produkcyjny: OK
