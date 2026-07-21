# Lekcja 7 / W1 - Pre-deploy GitHub

Ten plik przygotowuje projekt do pierwszego commita i wyslania na GitHub.

## Co jest juz gotowe

- `.gitignore` chroni prywatne pliki, m.in. `.env.local`, `node_modules`, `.next` i logi.
- `.env.example` pokazuje, gdzie wpisac klucze API, ale nie zawiera prawdziwych sekretow.
- Projekt buduje sie lokalnie przez `npm run build`.

## Czego nie wolno wysylac na GitHub

Nigdy nie wysylaj:

- `.env.local`
- prawdziwych kluczy API
- `node_modules`
- `.next`
- logow z terminala

## Komendy po zainstalowaniu Git

W terminalu wejdz do katalogu:

```powershell
cd "C:\Users\DELL\Documents\Codex\2026-06-14\chc-skonfigurowa-piaskownic-agenta-aby-kontynuowa\moj-agent"
```

Potem wykonaj:

```powershell
git init
git add .
git commit -m "Agent AI: chatbot, narzedzia, Supabase i RAG"
git branch -M main
git remote add origin https://github.com/TWOJ-LOGIN/moj-agent-ai.git
git push -u origin main
```

`TWOJ-LOGIN` zamien na swoja nazwe uzytkownika GitHub.

## Test przed pushem

Przed `git push` sprawdz:

```powershell
git status --short
git ls-files | findstr /i ".env.local node_modules .next"
```

Jesli druga komenda nic nie wypisze, to dobrze: prywatne pliki nie ida do repo.

## Gdy Git nie dziala

Jesli terminal pokazuje:

```text
git is not recognized
```

to Git nie jest zainstalowany albo nie jest dodany do PATH. Zainstaluj go z:

```text
https://git-scm.com/download/win
```

Po instalacji zamknij i otworz terminal ponownie.
