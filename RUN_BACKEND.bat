@echo off
echo.
echo ========================================
echo  Kartik Paver Industries - Backend
echo ========================================
echo.

REM Navigate to backend directory
cd /d "%~dp0backend"

REM Check if virtual environment exists, create if missing
if not exist "venv\" (
    echo [1/5] Creating virtual environment...
    python -m venv venv
    echo.
)

REM Activate virtual environment
echo [1/5] Activating virtual environment...
call venv\Scripts\activate.bat

REM Install dependencies if Django is missing
if not exist "venv\Lib\site-packages\django\" (
    echo [2/5] Installing dependencies...
    pip install -r requirements.txt
    echo.
) else (
    echo [2/5] Dependencies already installed.
)

REM Always run migrations (safe + idempotent — creates tables if missing)
echo.
echo [3/5] Applying database migrations...
python manage.py makemigrations
python manage.py migrate
echo.

REM Ensure admin user exists (NEVER overwrites existing credentials)
echo [4/5] Ensuring admin user exists...
python manage.py ensure_admin
echo.

REM Seed initial data if database is empty (idempotent — uses get_or_create)
echo [5/5] Seeding initial data (skips if already exists)...
python manage.py seed_data
echo.

echo ========================================
echo  Server starting at: http://localhost:8000
echo  Admin panel:        http://localhost:8000/django-admin/
echo  API:                http://localhost:8000/api/
echo  Admin Login:        kartikpaver / admin123
echo ========================================
echo.
echo  Press Ctrl+C to stop the server
echo.

python manage.py runserver

pause
