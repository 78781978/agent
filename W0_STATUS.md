# Status Warsztatu 0

## Gotowe

- Node.js jest zainstalowany.
- npm jest zainstalowany.
- Folder `moj-agent` istnieje.
- Plik `.env.local` istnieje.
- Klucz Google jest wpisany w `.env.local`.
- Plik `package.json` istnieje.
- Paczki npm zostaly zainstalowane.
- Folder `node_modules` istnieje.
- Komenda `npm run build` przechodzi poprawnie.
- W `package.json` sa wpisane zaleznosci:
  - `next`
  - `react`
  - `react-dom`
  - `ai`
  - `@ai-sdk/react`
  - `@ai-sdk/google`
- Podstawowa struktura Next.js jest utworzona:
  - `app/page.tsx`
  - `app/layout.tsx`
  - `app/globals.css`
  - `tsconfig.json`

## Uruchomienie

Zeby uruchomic aplikacje lokalnie, kliknij dwa razy:

```text
START_DEV.bat
```

Po chwili wejdz w przegladarce na:

```text
http://127.0.0.1:3000
```

## Uwaga

Ukryte uruchamianie serwera z poziomu Codexa moze gasnac po starcie, dlatego
najpewniejsze jest uruchamianie przez widoczny plik `START_DEV.bat`.

Warsztat 0 jest zakonczony.
