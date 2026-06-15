@echo off
set "GAME_FILE=%~dp0index.html"

where msedge >nul 2>nul
if %errorlevel%==0 (
  start "" msedge --kiosk "%GAME_FILE%" --edge-kiosk-type=fullscreen --no-first-run
  exit /b
)

where chrome >nul 2>nul
if %errorlevel%==0 (
  start "" chrome --kiosk "%GAME_FILE%" --no-first-run
  exit /b
)

start "" "%GAME_FILE%"
