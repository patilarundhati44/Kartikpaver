# ============================================================
#  Kartik Paver Industries — Combined Dev Launcher
#  Starts Backend (Django) + Frontend (React) simultaneously
#  Run this file from the project root:
#      powershell -ExecutionPolicy Bypass -File run-dev.ps1
# ============================================================

$nodeBin  = "C:\Users\patil\eclipse\jee-2024-12\eclipse\.node\node-v22.11.0-win-x64"
$root     = $PSScriptRoot
$backend  = Join-Path $root "backend"
$frontend = Join-Path $root "frontend"
$venvPy   = Join-Path $backend "venv\Scripts\python.exe"
$manage   = Join-Path $backend "manage.py"

# ── Colour helpers ──────────────────────────────────────────
function Write-Header($msg) { Write-Host "`n$msg" -ForegroundColor Cyan }
function Write-Ok($msg)     { Write-Host "  ✅ $msg" -ForegroundColor Green }
function Write-Warn($msg)   { Write-Host "  ⚠  $msg" -ForegroundColor Yellow }
function Write-Sep          { Write-Host ("─" * 55) -ForegroundColor DarkGray }

Write-Host ""
Write-Host "  ██╗  ██╗ █████╗ ██████╗ ████████╗██╗██╗  ██╗" -ForegroundColor DarkYellow
Write-Host "  ██║ ██╔╝██╔══██╗██╔══██╗╚══██╔══╝██║██║ ██╔╝" -ForegroundColor DarkYellow
Write-Host "  █████╔╝ ███████║██████╔╝   ██║   ██║█████╔╝ " -ForegroundColor DarkYellow
Write-Host "  ██╔═██╗ ██╔══██║██╔══██╗   ██║   ██║██╔═██╗ " -ForegroundColor DarkYellow
Write-Host "  ██║  ██╗██║  ██║██║  ██║   ██║   ██║██║  ██╗" -ForegroundColor DarkYellow
Write-Host "  ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝   ╚═╝   ╚═╝╚═╝  ╚═╝" -ForegroundColor DarkYellow
Write-Host "       Kartik Paver Industries — Dev Server" -ForegroundColor Yellow
Write-Host ""
Write-Sep

# ── Backend launch in a new window ─────────────────────────
Write-Header "Starting Backend (Django)..."

$backendCmd = @"
cd /d "$backend" && call venv\Scripts\activate.bat && echo. && echo [Backend] Applying migrations... && python manage.py migrate --run-syncdb && echo. && echo [Backend] Ensuring admin user exists... && python manage.py ensure_admin && echo. && echo [Backend] Seeding data... && python manage.py seed_data && echo. && echo ===================================== && echo  Backend: http://localhost:8000 && echo  API:     http://localhost:8000/api/ && echo  Admin:   kartikpaver / admin123 && echo ===================================== && echo. && python manage.py runserver
"@

Start-Process "cmd.exe" -ArgumentList "/k title Django Backend - Kartik Paver && $backendCmd" -WindowStyle Normal

Write-Ok "Backend window launched — waiting 4 seconds for Django to initialize..."
Start-Sleep -Seconds 4

# ── Frontend launch in this window ─────────────────────────
Write-Header "Starting Frontend (React)..."

$env:PATH = "$nodeBin;" + $env:PATH
$env:PATH = "C:\Windows\System32;C:\Windows;" + $env:PATH + ";$nodeBin"

try {
    $nodeVer = & node --version 2>&1
    Write-Ok "Node.js: $nodeVer"
} catch {
    Write-Warn "Node.js not found at $nodeBin — check your path in run-dev.ps1"
    pause
    exit 1
}

Write-Sep
Write-Host ""
Write-Host "  Backend  →  http://localhost:8000" -ForegroundColor Green
Write-Host "  Frontend →  http://localhost:3000" -ForegroundColor Green
Write-Host "  Admin    →  http://localhost:3000/admin/login" -ForegroundColor Green
Write-Host "  Login    →  kartikpaver / admin123" -ForegroundColor Yellow
Write-Host ""
Write-Sep
Write-Host ""

Set-Location $frontend
npm start
