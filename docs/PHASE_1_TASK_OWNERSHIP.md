# OptiGuide — Phase 1 Task Ownership & Workstream Allocation

This document outlines the four-person workstream division for Phase 1 of OptiGuide. Each role has distinct system ownership, branch naming conventions, concrete deliverables, and integration checkpoints to ensure conflict-free parallel engineering.

---

## 1. Workstream Overview

| Workstream | Owner | Primary Scope | Target Branch |
| :--- | :--- | :--- | :--- |
| **Person 1** | System Architecture & Integration Lead | Monorepo root, CI/CD, Dev scripts, System Architecture, Final Integration | `feature/phase-1-architecture` |
| **Person 2** | React Native & Web Foundation Lead | `apps/mobile/`, Expo (Android, iOS, Web), UI tokens, Reusable Components, Client Tests | `feature/phase-1-frontend` |
| **Person 3** | FastAPI Backend & Database Architect | `backend/`, FastAPI, Pydantic v2, SQLAlchemy 2.0, Alembic, Health & DB Endpoints, Pytest | `feature/phase-1-backend` |
| **Person 4** | API Contracts, QA & Documentation Lead | `shared/`, `docs/api/`, `docs/testing/`, Shared Types, QA Scenarios, Accessibility Baseline | `feature/phase-1-contracts-qa` |

---

## 2. Person 1 — System Architecture & Integration Lead

### Responsibilities
- Complete Step Zero repository audit.
- Establish the approved root monorepo structure.
- Define `.gitignore`, root `.env.example`, and root orchestration scripts.
- Configure GitHub Actions CI workflows for frontend and backend validation.
- Maintain architecture specifications and integration standards.
- Coordinate branch merging, review code from Persons 2, 3, and 4, and author the Phase 1 Completion Report.

### Deliverables
- `docs/PHASE_1_REPOSITORY_AUDIT.md`
- `docs/architecture/SYSTEM_ARCHITECTURE.md`
- `package.json` (root workspace setup)
- `.gitignore` and `.env.example`
- `.github/workflows/frontend.yml` and `.github/workflows/backend.yml`
- `docs/PHASE_1_COMPLETION_REPORT.md`

---

## 3. Person 2 — React Native & Web Foundation Lead

### Responsibilities
- Initialize and configure universal Expo React Native application targeting Android, iOS, and Web.
- Establish design tokens (colors, typography, spacing, border radius, elevation).
- Build atomic reusable components (`ScreenContainer`, `Button`, `TextField`, `LoadingIndicator`, `ErrorMessage`).
- Establish navigation and application shell with dashboard placeholders (Logo, Welcome heading, Language selector placeholder, Start screening placeholder).
- Build environment-configurable API client with diagnostics screen for testing backend connectivity.
- Provide comprehensive Jest unit tests for components, theme tokens, and API client.

### Deliverables
- `apps/mobile/src/theme/` (Design tokens)
- `apps/mobile/src/components/` (Reusable atomic UI elements)
- `apps/mobile/src/screens/HomeScreen.tsx` & `DiagnosticsScreen.tsx`
- `apps/mobile/src/services/apiClient.ts`
- `apps/mobile/__tests__/` (Component and client test suite)
- `apps/mobile/app.json`, `package.json`, `tsconfig.json`

---

## 4. Person 3 — FastAPI Backend & Database Architect

### Responsibilities
- Create a modular FastAPI application structure under `backend/`.
- Centralize environment configuration using Pydantic Settings (`backend/app/core/config.py`).
- Implement SQLAlchemy 2.0 connection lifecycle with support for PostgreSQL (server) and SQLite (local dev/testing).
- Configure Alembic database migration environment.
- Create `/health` and `/api/v1/health` endpoints with live database connectivity status verification.
- Implement unified JSON error handling, CORS middleware, and privacy-preserving structured logging.
- Write unit and API integration tests in Pytest.

### Deliverables
- `backend/app/main.py`
- `backend/app/core/config.py` & `backend/app/core/logging.py`
- `backend/app/database/session.py` & `base.py`
- `backend/app/api/v1/endpoints/health.py`
- `backend/app/middleware/error_handler.py`
- `backend/migrations/` & `alembic.ini`
- `backend/tests/` (Pytest test suite)
- `backend/requirements.txt` & `pyproject.toml`

---

## 5. Person 4 — API Contracts, QA & Documentation Lead

### Responsibilities
- Define and maintain shared TypeScript types and data contracts in `shared/types/`.
- Specify consistent JSON response models for success, diagnostic health, and RFC-compliant error payloads.
- Document all endpoints and environment variable behaviors in `docs/api/API_CONTRACTS.md`.
- Author `docs/architecture/SECURITY_BASELINE.md` documenting security policies, input sanitization, and secrets management.
- Establish accessibility baseline standards for high-contrast, scalable text, and screen readers.
- Create comprehensive QA test plans and developer execution manuals in `docs/testing/PHASE_1_TEST_PLAN.md` and `README.md`.

### Deliverables
- `shared/types/api.ts`
- `shared/constants/status.ts`
- `docs/api/API_CONTRACTS.md`
- `docs/architecture/SECURITY_BASELINE.md`
- `docs/testing/PHASE_1_TEST_PLAN.md`
- Comprehensive `README.md`

---

## 6. Integration Checkpoints & Verification Gates

```
[Person 1: Root & Workspaces] + [Person 4: Shared Types]
                     ↓
      ┌──────────────┴──────────────┐
      ↓                             ↓
[Person 3: Backend Foundation]  [Person 2: Frontend Foundation]
      ↓                             ↓
      └──────────────┬──────────────┘
                     ↓
       [Checkpoint: Diagnostic Integration]
       (Frontend connects to GET /api/v1/health)
                     ↓
       [Person 4: QA Execution & Matrix]
                     ↓
       [Person 1: Final Audit & Sign-off]
```

### Gate 1: Contract Lock
- Both frontend and backend agree on `HealthResponse` and `ErrorEnvelope` schemas defined in `shared/types/api.ts`.

### Gate 2: Independent Subsystem Verification
- Backend passes `pytest` with 100% success on both SQLite and PostgreSQL configurations.
- Frontend passes `npm test` and `npx expo export -p web` with zero compilation errors.

### Gate 3: End-to-End Diagnostics
- React Native Diagnostics screen successfully requests `GET /api/v1/health` and displays backend & database status in real-time.
- Simulated database drop reflects `database: "disconnected"` with HTTP 503 while keeping service status intact.
