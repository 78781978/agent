# Paczka GitHub — W1 Landing Page + W2 Dashboard użycia

Paczka jest przygotowana tak, aby jej zawartość skopiować do **głównego katalogu repozytorium**. Zachowaj dokładnie strukturę folderów i zaakceptuj podmianę istniejących plików.

## Mapa plików

| Plik w paczce | Docelowa ścieżka w GitHubie | Operacja |
|---|---|---|
| `app/page.tsx` | `app/page.tsx` | podmień |
| `app/globals.css` | `app/globals.css` | podmień |
| `app/layout.tsx` | `app/layout.tsx` | podmień |
| `proxy.ts` | `proxy.ts` | podmień |
| `components/AuthGate.tsx` | `components/AuthGate.tsx` | podmień |
| `components/AppNav.tsx` | `components/AppNav.tsx` | podmień |
| `app/admin/dashboard/page.tsx` | `app/admin/dashboard/page.tsx` | dodaj nowy |
| `app/api/admin/dashboard/route.ts` | `app/api/admin/dashboard/route.ts` | dodaj nowy |
| `.env.example` | `.env.example` | podmień — to tylko wzór, bez sekretów |
| `package.json` | `package.json` | podmień |
| `pnpm-lock.yaml` | `pnpm-lock.yaml` | dodaj lub podmień |
| `pnpm-workspace.yaml` | `pnpm-workspace.yaml` | dodaj lub podmień |

## Jak wgrać

1. Otwórz główny katalog repozytorium na GitHubie.
2. Wybierz **Add file → Upload files**.
3. Przeciągnij zawartość tej paczki, zachowując foldery `app` i `components`.
4. Sprawdź, czy pliki trafiły do ścieżek z tabeli powyżej — nie do dodatkowego folderu `github-w1-w2`.
5. Zatwierdź przez **Commit changes**.

Jeżeli repozytorium zawiera stary `package-lock.json`, najlepiej go usunąć po dodaniu `pnpm-lock.yaml`, aby wdrożenie używało jednej blokady zależności. Projekt korzysta teraz z pnpm i zgodnej wersji TypeScript 6.

## Zmienne środowiskowe w Vercel

W Vercel wejdź do **Project → Settings → Environment Variables** i ustaw:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY` — sekret, wyłącznie po stronie serwera
- `ADMIN_EMAILS` — adres administratora; kilka adresów oddziel przecinkami
- `AI_INPUT_PRICE_PER_MILLION=0.15`
- `AI_OUTPUT_PRICE_PER_MILLION=0.60`

Nie wysyłaj do GitHuba pliku `.env.local` ani prawdziwych kluczy.

## Co zawiera paczka

- W1: publiczna strona główna Vie AI, CTA, funkcje, mockup produktu, sekcja demo i responsywność.
- W2: chroniona strona `/admin/dashboard`, metryki użytkowników/rozmów/tokenów/kosztu, trzy wykresy i tabela ostatnich rozmów.
- W produkcji dane globalne W2 widzą tylko adresy wymienione w `ADMIN_EMAILS`. Bez klucza serwisowego dashboard korzysta wyłącznie z danych zalogowanego użytkownika.

## Kontrola przed wdrożeniem

```powershell
pnpm install
pnpm exec tsc --noEmit
pnpm run build
```

Lokalna kontrola TypeScript dla tej wersji: **zaliczona bez błędów**.
