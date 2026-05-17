@echo off
echo ========================================
echo  Kartik Paver Industries - Frontend
echo ========================================
echo.

REM Set Node.js path
set PATH=C:\Users\patil\eclipse\jee-2024-12\eclipse\.node\node-v22.11.0-win-x64;%PATH%

REM Navigate to frontend directory
cd /d "%~dp0frontend"

echo Starting React development server...
echo.
echo The server will open at: http://localhost:3000
echo.
echo Press Ctrl+C to stop the server
echo.

npm start

pause
