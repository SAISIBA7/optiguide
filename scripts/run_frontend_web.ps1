# ==========================================
# Run OptiGuide Universal Client on Web (Windows PowerShell)
# ==========================================

$ErrorActionPreference = "Stop"

Write-Host "Starting OptiGuide Client on Web..." -ForegroundColor Cyan

npm --workspace=apps/mobile run web
