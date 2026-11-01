# ==========================================
# Run Full OptiGuide Test Suite (Windows PowerShell)
# ==========================================

$ErrorActionPreference = "Stop"

$python = if (Test-Path "backend/.venv/Scripts/python.exe") { "backend/.venv/Scripts/python.exe" } else { "python" }

Write-Host "=== 1/2 Running Backend Tests ===" -ForegroundColor Cyan
& $python -m pytest backend/tests -v

Write-Host "`n=== 2/2 Running Frontend Tests ===" -ForegroundColor Cyan
npm --workspace=apps/mobile run test -- --ci

Write-Host "`nAll Phase 1 test suites completed successfully!" -ForegroundColor Green
