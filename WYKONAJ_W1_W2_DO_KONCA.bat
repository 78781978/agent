@echo off
title Lekcja 7 W1-W2 - GitHub i Vercel
cd /d "%~dp0"

echo.
echo ==========================================
echo  LEKCJA 7 W1-W2: GitHub + Vercel
echo ==========================================
echo.

echo [1/6] Sprawdzam Git...
"C:\Program Files\Git\cmd\git.exe" --version
if errorlevel 1 goto blad

echo.
echo [2/6] Sprawdzam bezpieczenstwo plikow...
"C:\Program Files\Git\cmd\git.exe" check-ignore -v .env.local node_modules .next
echo Jesli wyzej widzisz .gitignore przy .env.local, node_modules i .next, jest dobrze.

echo.
echo [3/6] Sprawdzam repozytorium...
"C:\Program Files\Git\cmd\git.exe" status --short --branch
"C:\Program Files\Git\cmd\git.exe" remote -v

echo.
echo [4/6] Wysylam kod na GitHub...
echo Repo: https://github.com/78781978/agent.git
echo Jezeli GitHub poprosi o logowanie, zaloguj sie i zatwierdz.
"C:\Program Files\Git\cmd\git.exe" push -u origin main
if errorlevel 1 goto blad_push

echo.
echo [5/6] Otwieram GitHub i Vercel...
start https://github.com/78781978/agent
start https://vercel.com/new

echo.
echo [6/6] Gotowe lokalnie.
echo W Vercel wybierz repozytorium 78781978/agent,
echo dodaj Environment Variables z pliku .env.local i kliknij Deploy.
echo Szczegoly sa w pliku VERCEL_DEPLOY.md.
echo.
goto koniec

:blad_push
echo.
echo ==========================================
echo  PUSH NIE POWIODL SIE
echo ==========================================
echo Najczestsze powody:
echo - GitHub wymaga logowania.
echo - Repozytorium nie istnieje albo nie masz dostepu.
echo - Internet blokuje polaczenie.
echo.
echo Zrob screenshot ostatnich linijek i pokaz Codexowi.
goto koniec

:blad
echo.
echo Wystapil blad przed wysylka.

:koniec
echo.
echo ==========================================
echo  Okno zostaje otwarte.
echo ==========================================
pause
