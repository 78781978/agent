# Paczka GitHub — Vie AI W1–W4

Skopiuj zawartość paczki do **głównego katalogu repozytorium**, zachowując strukturę folderów. Nie umieszczaj jej w dodatkowym folderze `github-w1-w4`.

## Pliki do podmiany

| Plik w paczce | Ścieżka w repozytorium |
|---|---|
| `app/page.tsx` | `app/page.tsx` |
| `app/globals.css` | `app/globals.css` |
| `app/layout.tsx` | `app/layout.tsx` |
| `proxy.ts` | `proxy.ts` |
| `components/AuthGate.tsx` | `components/AuthGate.tsx` |
| `components/AppNav.tsx` | `components/AppNav.tsx` |
| `.env.example` | `.env.example` |
| `package.json` | `package.json` |
| `pnpm-lock.yaml` | `pnpm-lock.yaml` |
| `pnpm-workspace.yaml` | `pnpm-workspace.yaml` |

## Nowe pliki do dodania

| Plik w paczce | Ścieżka w repozytorium |
|---|---|
| `components/ThemeToggle.tsx` | `components/ThemeToggle.tsx` |
| `app/admin/dashboard/page.tsx` | `app/admin/dashboard/page.tsx` |
| `app/api/admin/dashboard/route.ts` | `app/api/admin/dashboard/route.ts` |
| `public/manifest.json` | `public/manifest.json` |
| `public/og-image.png` | `public/og-image.png` |
| `public/icon.png` | `public/icon.png` |
| `public/apple-touch-icon.png` | `public/apple-touch-icon.png` |
| `public/favicon.ico` | `public/favicon.ico` |

## Wgrywanie przez GitHub

1. Otwórz główny katalog repozytorium.
2. Kliknij **Add file → Upload files**.
3. Przeciągnij zawartość rozpakowanej paczki.
4. Sprawdź ścieżki według tabel powyżej.
5. Zatwierdź przez **Commit changes**.

Jeżeli repozytorium ma stary `package-lock.json`, usuń go po dodaniu `pnpm-lock.yaml`, aby wdrożenie korzystało z jednej blokady zależności.

## Zmienne środowiskowe Vercel

Ustaw w **Project → Settings → Environment Variables**:

- `NEXT_PUBLIC_APP_URL=https://twoja-domena.pl` — pełny publiczny adres bez końcowego `/`; jest używany w Open Graph i canonical URL,
- `NEXT_PUBLIC_SUPABASE_URL`,
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`,
- `SUPABASE_SERVICE_ROLE_KEY`,
- `ADMIN_EMAILS`,
- `AI_INPUT_PRICE_PER_MILLION=0.15`,
- `AI_OUTPUT_PRICE_PER_MILLION=0.60`.

Po zmianie zmiennych wykonaj **Redeploy**. Nie wysyłaj `.env.local` ani prawdziwych sekretów do GitHuba.

## Zakres warsztatów

- **W1:** publiczna landing page Vie AI dla niezalogowanych.
- **W2:** dashboard użycia `/admin/dashboard` z metrykami, wykresami i rozmowami.
- **W3:** custom domain konfigurowana w panelach Vercel i operatora DNS; nie wymaga osobnych zmian kodu. Po podłączeniu domeny ustaw ją w `NEXT_PUBLIC_APP_URL`.
- **W4:** Open Graph 1200×630, favicon, ikony PWA, manifest instalowalnej aplikacji oraz zapamiętywany ciemny/jasny motyw.

## Test po wdrożeniu

1. Otwórz `/` bez logowania — landing page.
2. Przełącz ☀️/🌙, odśwież stronę i sprawdź, czy motyw został zachowany.
3. Otwórz `/manifest.json` oraz `/og-image.png`.
4. Sprawdź favicon w karcie przeglądarki.
5. Po zalogowaniu otwórz `/admin/dashboard`.
6. Sprawdź podgląd linku narzędziem LinkedIn Post Inspector lub Facebook Sharing Debugger po publicznym wdrożeniu.

Kontrola lokalna TypeScript i walidacja wymiarów wszystkich grafik: **zaliczone**.
