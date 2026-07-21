@echo off
cd /d "%~dp0"
echo.
echo === Warsztat 0 - instalacja paczek npm ===
echo Folder:
echo %CD%
echo.
echo Wynik tej instalacji zapisze sie tez do pliku:
echo npm-install-windows.log
echo.
echo Sprawdzam Node.js:
node --version
echo.
echo Sprawdzam npm:
npm --version
echo.
echo Instaluję paczki z W0:
echo next react react-dom ai @ai-sdk/react @ai-sdk/google
echo.
npm install next@latest react react-dom ai @ai-sdk/react @ai-sdk/google > npm-install-windows.log 2>&1
type npm-install-windows.log
echo.
echo === KONIEC ===
if exist node_modules (
  echo SUKCES: folder node_modules istnieje.
) else (
  echo UWAGA: folder node_modules nadal nie istnieje.
  echo Zrob screenshot tego okna albo wyslij mi plik npm-install-windows.log.
)
echo.
pause
