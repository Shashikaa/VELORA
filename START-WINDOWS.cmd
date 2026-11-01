@echo off
cd /d "%~dp0"
where node >nul 2>nul
if errorlevel 1 (
  echo Install Node.js 22 LTS or newer, then run this file again.
  pause
  exit /b 1
)
node scripts/check-node.mjs
if errorlevel 1 (
  pause
  exit /b 1
)
echo Installing the exact VELORA dependencies...
call npm ci
if errorlevel 1 (
  echo Installation failed. Check the error above.
  pause
  exit /b 1
)
echo Open http://localhost:3000 when the server is ready.
call npm run dev
pause
