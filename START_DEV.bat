@echo off
cd /d "%~dp0"
set "PATH=C:\Program Files\nodejs;%PATH%"
echo.
echo === Moj Agent AI ===
echo Uruchamiam strone lokalnie.
echo Po starcie otworz w przegladarce:
echo http://127.0.0.1:3000
echo.
echo Aby zatrzymac serwer, nacisnij Ctrl+C.
echo.
npm run dev -- --hostname 127.0.0.1 --port 3000
pause
