@echo off
title Push moj-agent do GitHub
cd /d "%~dp0"

echo.
echo ==========================================
echo  Wysylanie projektu moj-agent do GitHub
echo ==========================================
echo.
echo Repozytorium:
echo https://github.com/78781978/agent.git
echo.
echo Jezeli pojawi sie okno GitHub, zaloguj sie i zatwierdz.
echo To jest potrzebne tylko do wyslania kodu.
echo.

"C:\Program Files\Git\cmd\git.exe" status --short --branch
echo.
"C:\Program Files\Git\cmd\git.exe" push -u origin main

echo.
echo ==========================================
echo  Koniec polecenia.
echo  Jesli widzisz blad, zrob screenshot albo przepisz ostatnie linie.
echo ==========================================
pause
