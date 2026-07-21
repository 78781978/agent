# Lekcja 7 / W1 - status wykonania

## Wykonane

- Przeczytano instrukcje `W1_PREDEPLOY.md`.
- Sprawdzono, czy Git jest dostepny w terminalu.
- Przygotowano `.gitignore` dla projektu Next.js.
- Dodano `.env.example` jako bezpieczny szablon zmiennych srodowiskowych.
- Dodano `PREDEPLOY_GITHUB.md` z instrukcja commita i pusha.
- Dodano skrypt `npm run predeploy:check`.
- Zaktualizowano `README.md`.

## Wynik sprawdzenia Git

Git zostal zainstalowany i jest dostepny pod adresem:

```text
C:\Program Files\Git\cmd\git.exe
```

W biezacym terminalu Codex komenda `git` moze jeszcze nie byc widoczna w PATH,
ale Git dziala przez pelna sciezke. Po ponownym otwarciu terminala powinno
dzialac zwykle:

```powershell
git --version
```

## Commit lokalny

Wykonano lokalny pierwszy commit:

```text
99f0c97 Agent AI: chatbot, narzedzia, Supabase i RAG
```

Galaz zostala ustawiona na:

```text
main
```

Sprawdzono, ze prywatne pliki nie sa sledzone przez Git:

- `.env.local` nie jest w repozytorium.
- `node_modules` nie jest w repozytorium.
- `.next` nie jest w repozytorium.

## Co trzeba zrobic po instalacji Git

1. Utworzyc puste repozytorium na GitHub.
2. Skopiowac adres repozytorium.
3. Dodac remote `origin`.
4. Wykonac `git push -u origin main`.

## Test lokalny

Wykonano:

```powershell
npm run predeploy:check
npm run build
```

Wynik:

- `npm run predeploy:check` zakonczony poprawnie.
- `npm run build` zakonczony poprawnie.
- Projekt jest gotowy technicznie do pierwszego commita po zainstalowaniu Git.
