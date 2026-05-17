@echo off
echo ============================================
echo  Kartik Paver Industries - First Time Setup
echo ============================================
echo.

echo [1/4] Creating virtual environment...
python -m venv venv
call venv\Scripts\activate

echo.
echo [2/4] Installing dependencies...
pip install -r requirements.txt

echo.
echo [3/4] Setting up database and running migrations...
python manage.py migrate --run-syncdb
echo.
echo  Seeding initial data (products, gallery, services)...
python manage.py seed_data

echo.
echo [4/4] Creating admin user (kartikpaver / admin123)...
python manage.py ensure_admin

echo.
echo ============================================
echo  Setup complete!
echo.
echo  Run the server:  RUN_BACKEND.bat (from root)
echo  Admin Login:     http://localhost:8000/django-admin/
echo  Username:        kartikpaver
echo  Password:        admin123
echo.
echo  You can change the password at:
echo  http://localhost:8000/django-admin/auth/user/
echo ============================================
pause
