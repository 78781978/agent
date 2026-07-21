# Moj Agent AI

Projekt kursowy Laba: agent AI, chatbot, narzedzia, dashboard, Supabase i RAG.

## Uruchomienie lokalne

```powershell
cd "C:\Users\DELL\Documents\Codex\2026-06-14\chc-skonfigurowa-piaskownic-agenta-aby-kontynuowa\moj-agent"
npm install
npm run dev
```

Adres lokalny:

```text
http://127.0.0.1:3000/
```

## Klucze API

1. Skopiuj `.env.example` jako `.env.local`.
2. Wklej prawdziwe klucze tylko do `.env.local`.
3. Nie wklejaj kluczy do kodu, README ani plikow `.md`.

`.env.local` jest prywatny i jest ignorowany przez Git.

## Testy przed deployem

```powershell
npm run predeploy:check
npm run build
```

## GitHub / pre-deploy

Instrukcja do lekcji 7 W1 jest w pliku:

```text
PREDEPLOY_GITHUB.md
```

Najwazniejsze: na GitHub wysylamy kod, ale nie wysylamy `.env.local`,
`node_modules`, `.next` ani logow.

## Vercel / deploy

Instrukcja do lekcji 7 W2 jest w pliku:

```text
VERCEL_DEPLOY.md
```

Przed wdrozeniem sprawdz projekt:

```powershell
npm run vercel:env-check
npm run build
```
