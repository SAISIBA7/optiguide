# ==========================================
# Run Alembic Database Migrations (Windows PowerShell)
# ==========================================

$ErrorActionPreference = "Stop"

$alembic = if (Test-Path "backend/.venv/Scripts/alembic.exe") { ".venv/Scripts/alembic.exe" } else { "alembic" }

Write-Host "Running Alembic Migrations..." -ForegroundColor Cyan

Push-Location backend
try {
    & $alembic upgrade head
    Write-Host "Database migrations applied successfully!" -ForegroundColor Green
} finally {
    Pop-Location
}
