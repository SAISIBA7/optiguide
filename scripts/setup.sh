#!/usr/bin/env bash
set -e

echo "=== Setting up OptiGuide Monorepo ==="

echo "1. Installing Node workspace dependencies..."
npm install

echo "2. Setting up Python virtual environment..."
if [ ! -d "backend/.venv" ]; then
    python3 -m venv backend/.venv
fi
source backend/.venv/bin/activate
pip install -r backend/requirements.txt

echo "3. Checking environment variables..."
if [ ! -f "backend/.env" ]; then
    cp .env.example backend/.env
    echo "Created backend/.env from .env.example"
fi

echo "4. Running database migrations..."
(cd backend && alembic upgrade head)

echo "OptiGuide setup completed successfully!"
