@echo off
cd /d "%~dp0"

set "PATH=C:\Program Files\nodejs;%PATH%"

echo.
echo ==========================================
echo  Wash^&Go - lokalna strona i agent myjni
echo ==========================================
echo.
echo To okno musi zostac otwarte.
echo Gdy zobaczysz komunikat "Ready", wejdz na:
echo.
echo   http://127.0.0.1:3000/wash-site
echo.
echo Panel agenta dla wlasciciela:
echo   http://127.0.0.1:3000/wash
echo.
echo Doradca dla klienta:
echo   http://127.0.0.1:3000/wash-booking
echo.
echo Aby zatrzymac strone, zamknij to okno albo nacisnij Ctrl+C.
echo.

"C:\Program Files\nodejs\npm.cmd" run dev -- --hostname 127.0.0.1 --port 3000

echo.
echo Serwer zostal zatrzymany albo wystapil blad.
echo Zrob zdjecie tego okna, jesli cos nie dziala.
pause
