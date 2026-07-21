# Lekcja 7 / W2 - deploy na Vercel

Ten projekt jest przygotowany do wdrozenia na Vercel jako aplikacja Next.js.

## 1. Warunek przed deployem

Kod musi byc na GitHubie. Lokalny commit jest juz zrobiony, ale trzeba jeszcze
dodac zdalne repozytorium i wykonac `git push`.

Po utworzeniu pustego repozytorium na GitHub wykonaj:

```powershell
cd "C:\Users\DELL\Documents\Codex\2026-06-14\chc-skonfigurowa-piaskownic-agenta-aby-kontynuowa\moj-agent"
git remote add origin https://github.com/TWOJ-LOGIN/moj-agent-ai.git
git push -u origin main
```

`TWOJ-LOGIN` zamien na swoj login GitHub.

## 2. Import w Vercel

1. Wejdz na Vercel.
2. Zaloguj sie przez GitHub.
3. Kliknij `Add New...` -> `Project`.
4. Wybierz repozytorium `moj-agent-ai`.
5. Framework powinien wykryc sie jako `Next.js`.
6. Przed kliknieciem `Deploy` dodaj zmienne srodowiskowe.

## 3. Environment Variables w Vercel

Dodaj zmienne z pliku `.env.local`.

Wymagane:

```text
GOOGLE_GENERATIVE_AI_API_KEY
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
```

Projekt akceptuje tez alternatywne nazwy klucza Google:

```text
GOOGLE_API_KEY
GEMINI_API_KEY
```

Rekomendowane, jesli backend Supabase bedzie potrzebowal operacji
administracyjnych:

```text
SUPABASE_SERVICE_ROLE_KEY
```

Wazne: wartosci kopiuj bez spacji na poczatku i koncu.

## 4. Lokalny test przed Vercel

```powershell
npm run vercel:env-check
npm run build
```

Jesli oba polecenia przejda poprawnie, projekt jest gotowy do deployu.

## 5. Test po deployu

Po wdrozeniu sprawdz:

- strona glowna otwiera sie na linku `*.vercel.app`,
- `/chat` odpowiada,
- `/agent` korzysta z narzedzi,
- `/travel` dziala,
- `/upload` pozwala dodac wiedze,
- historia rozmow zapisuje sie w Supabase.

## 6. Najczestsze problemy

| Problem | Co sprawdzic |
| --- | --- |
| Build failed | Vercel -> Deployments -> logi buildu |
| Error 500 | Brak zmiennych w Vercel |
| Agent nie odpowiada | Klucz Google AI w Environment Variables |
| Historia sie nie zapisuje | `NEXT_PUBLIC_SUPABASE_URL` i `NEXT_PUBLIC_SUPABASE_ANON_KEY` |
| Repo nie widac w Vercel | GitHub App Permissions w Vercel |
