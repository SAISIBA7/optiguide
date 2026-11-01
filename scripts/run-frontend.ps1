# Run OptiGuide Frontend (PowerShell)
$ErrorActionPreference = "Stop"

Write-Host "Starting OptiGuide Universal Mobile/Web Client..." -ForegroundColor Cyan
npm --workspace=apps/mobile run web
