# OptiGuide - Automated Setup Script (PowerShell)
$ErrorActionPreference = "Stop"

Write-Host "=== Setting up OptiGuide Monorepo ===" -ForegroundColor Cyan

# 1. Install Node Dependencies
Write-Host "`n1. Installing Node workspace dependencies..." -ForegroundColor Yellow
npm install

# 2. Setup Python virtual environment
Write-Host "`n2. Setting up Python virtual environment..." -ForegroundColor Yellow
if (-not (Test-Path "backend/.venv")) {
    python -m venv backend/.venv
}
& "backend/.venv/Scripts/pip" install -r backend/requirements.txt

# 3. Initialize Environment
Write-Host "`n3. Checking environment variables..." -ForegroundColor Yellow
if (-not (Test-Path "backend/.env")) {
    Copy-Item ".env.example" "backend/.env"
    Write-Host "Created backend/.env from .env.example" -ForegroundColor Green
}

# 4. Run Migrations
Write-Host "`n4. Running database migrations..." -ForegroundColor Yellow
Push-Location backend
try {
    & ".venv/Scripts/alembic" upgrade head
} finally {
    Pop-Location
}

Write-Host "`nOptiGuide setup completed successfully!" -ForegroundColor Green
