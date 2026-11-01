# OptiGuide

**OptiGuide** is a cross-platform preliminary vision screening and eyewear guidance platform built with React Native (Expo) and FastAPI.

> [!IMPORTANT]
> **Clinical Disclaimer:** OptiGuide is strictly a preliminary screening and eyewear guidance platform. It is not a diagnostic system and must not independently prescribe lens power or clinical treatments. All findings require professional evaluation by qualified optometrists or ophthalmologists.

---

## 1. Architecture Overview

OptiGuide is organized as a modular monorepo:

- **Frontend (`apps/mobile/`):** Universal Expo SDK 52 application targeting **Android**, **iOS**, and **Web** (via `react-native-web`) with TypeScript, atomic reusable components, and an accessible design token system.
- **Backend (`backend/`):** High-performance **FastAPI** service with **Pydantic v2**, **SQLAlchemy 2.0**, and **Alembic** migrations. Supports PostgreSQL for server deployments and SQLite for isolated local testing.
- **Shared Contracts (`shared/`):** Strongly-typed TypeScript interfaces and constants shared across client and server.
- **Documentation (`docs/`):** Full technical documentation, repository audit, system architecture diagrams, security baselines, and test plans.

---

## 2. Prerequisites

| Tool | Recommended Version |
| :--- | :--- |
| **Node.js** | `>= 20.0.0` (Verified on `v24.20.0`) |
| **npm** | `>= 10.0.0` (Verified on `11.19.0`) |
| **Python** | `>= 3.11` (Verified on `3.13.14`) |
| **Git** | `>= 2.40.0` |

---

## 3. Quick Start (Windows PowerShell)

### Step 1: Install Dependencies
```powershell
# Install root and workspace npm packages
npm install

# Create Python virtual environment and install backend packages
python -m venv backend/.venv
& "backend/.venv/Scripts/pip" install -r backend/requirements.txt
```

### Step 2: Configure Environment Variables
Copy the template `.env.example` to `.env`:
```powershell
Copy-Item .env.example backend/.env
```

### Step 3: Run Database Migrations
```powershell
.\scripts\init_db.ps1
```

### Step 4: Run the Application
In **Terminal 1** (Backend):
```powershell
.\scripts\run_backend.ps1
# FastAPI starts on http://localhost:8000
# Interactive API documentation available at http://localhost:8000/docs
```

In **Terminal 2** (Frontend Web):
```powershell
.\scripts\run_frontend_web.ps1
# Starts Metro bundler on http://localhost:8081
```

To run on an **Android Device or Emulator**:
```powershell
npm --workspace=apps/mobile run android
```
*(Note for Android Emulator: configure the API base URL in the Diagnostics screen to `http://10.0.2.2:8000`)*.

---

## 4. Quick Start (macOS / Linux / Bash)

```bash
# 1. Install Node dependencies
npm install

# 2. Setup Python environment
python3 -m venv backend/.venv
source backend/.venv/bin/activate
pip install -r backend/requirements.txt

# 3. Environment configuration
cp .env.example backend/.env

# 4. Run database migrations
cd backend && alembic upgrade head && cd ..

# 5. Run backend
python -m uvicorn backend.app.main:app --reload --host 0.0.0.0 --port 8000

# 6. Run frontend (in another shell)
npm --workspace=apps/mobile run web
```

---

## 5. Automated Testing & Quality Checks

Run the entire verification suite:
```powershell
.\scripts\run_tests.ps1
```

Or execute individual test suites:

| Task | Command |
| :--- | :--- |
| **Backend Tests (Pytest)** | `& "backend/.venv/Scripts/python" -m pytest backend/tests -v` |
| **Backend Lint (Ruff)** | `& "backend/.venv/Scripts/ruff" check backend` |
| **Frontend Tests (Jest)** | `npm --workspace=apps/mobile run test -- --ci` |
| **Frontend Typecheck** | `npm --workspace=apps/mobile run typecheck` |
| **Frontend Production Build** | `npm --workspace=apps/mobile run build:web` |

---

## 6. Monorepo Structure

```
optiguide/
├── apps/
│   └── mobile/                # Universal Expo Client (Android, iOS, Web)
│       ├── src/
│       │   ├── components/    # Atomic UI (Button, TextField, ErrorMessage, ScreenContainer)
│       │   ├── screens/       # HomeScreen (Dashboard shell), DiagnosticsScreen
│       │   ├── services/      # Typed API client with base URL configuration
│       │   └── theme/         # Design tokens (colors, typography, spacing, elevation)
│       └── __tests__/         # Jest component & client test suite
├── backend/
│   ├── app/
│   │   ├── api/v1/            # API version 1 endpoints (/health, /health/db)
│   │   ├── core/              # Centralized Pydantic Settings & structured logging
│   │   ├── database/          # SQLAlchemy session, engine, connection health pings
│   │   └── middleware/        # Global error envelope & request timing
│   ├── migrations/            # Alembic schema migrations
│   └── tests/                 # Pytest unit and integration test suite
├── shared/
│   ├── constants/             # Shared status and error codes
│   └── types/                 # Shared TypeScript interfaces (HealthResponse, ErrorResponse)
├── docs/                      # Authoritative project specifications
│   ├── api/API_CONTRACTS.md
│   ├── architecture/SYSTEM_ARCHITECTURE.md
│   ├── architecture/SECURITY_BASELINE.md
│   ├── testing/PHASE_1_TEST_PLAN.md
│   ├── PHASE_1_REPOSITORY_AUDIT.md
│   ├── PHASE_1_TASK_OWNERSHIP.md
│   └── PHASE_1_COMPLETION_REPORT.md
├── scripts/                   # Developer automation scripts (.ps1)
└── .github/workflows/         # CI/CD pipelines (frontend.yml, backend.yml)
```

---

## 7. Troubleshooting

- **Android Emulator cannot connect to localhost:**  
  Android emulators run on a virtual network where `localhost` refers to the emulator itself. Use `http://10.0.2.2:8000` to reach your host machine. Use the preset toggle on the **Diagnostics Screen** in the app.
- **Port 8000 already in use:**  
  Update `PORT=8001` in your `backend/.env` file and adjust the API base URL in the app's Diagnostics screen.
- **OneDrive synchronization locks:**  
  Ensure `.venv`, `node_modules`, and `.expo` remain excluded via `.gitignore` to prevent file locking issues during compilation.

---

## 8. License

UNLICENSED — Proprietary. OptiGuide Platform.
