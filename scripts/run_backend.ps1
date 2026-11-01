# ==========================================
# Run OptiGuide FastAPI Backend (Windows PowerShell)
# ==========================================

$ErrorActionPreference = "Stop"

$python = if (Test-Path "backend/.venv/Scripts/python.exe") { "backend/.venv/Scripts/python.exe" } else { "python" }

Write-Host "Starting OptiGuide Backend on port 8000..." -ForegroundColor Cyan
& $python -m uvicorn backend.app.main:app --reload --host 0.0.0.0 --port 8000
