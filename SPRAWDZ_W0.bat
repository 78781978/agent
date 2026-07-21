@echo off
cd /d "%~dp0"
echo.
echo === Sprawdzenie Warsztatu 0 ===
echo Folder:
echo %CD%
echo.
echo Node.js:
node --version
echo.
echo npm:
npm --version
echo.
if exist package.json (
  echo package.json: OK
) else (
  echo package.json: BRAK
)
if exist node_modules (
  echo node_modules: OK
) else (
  echo node_modules: BRAK - paczki nie sa jeszcze zainstalowane
)
if exist .env.local (
  echo .env.local: OK
) else (
  echo .env.local: BRAK
)
echo.
echo Jesli okno zamykalo sie wczesniej od razu, teraz zostanie otwarte.
echo Zrob screenshot tego okna, jesli cos jest oznaczone jako BRAK.
echo.
pause
