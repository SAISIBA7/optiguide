# OptiGuide — Phase 1 Test Plan & QA Strategy

## 1. Quality Assurance Objective

The objective of Phase 1 testing is to ensure that both the frontend (Expo React Native / Web) and backend (FastAPI / SQLAlchemy) micro-architectures are fully functional, resilient to failure, conform to shared API contracts, and run reliably in local developer environments and CI pipelines.

---

## 2. Testing Matrix

| Level | Component | Scope | Runner / Tool | Target Criteria |
| :--- | :--- | :--- | :--- | :--- |
| **Unit** | Backend Core | Settings, logging, and database session generation | `pytest` | 100% pass |
| **Integration** | Backend API | `/health`, `/api/v1/health`, error handling, CORS | `pytest` + `httpx.AsyncClient` | 100% pass |
| **Database** | Backend DB | Connection ping, degraded status handling, Alembic migrations | `pytest` + `alembic` | 100% pass |
| **Unit** | Frontend UI | Design tokens, button, input, error card rendering | `jest` + React Native Testing Library | 100% pass |
| **Integration** | Frontend API Client | Fetching health, handling base URL overrides, error states | `jest` | 100% pass |
| **Build** | Frontend Web | Production Web bundle compilation | `npx expo export -p web` | Zero syntax/type errors |
| **Typecheck** | Full Monorepo | TypeScript type validation | `tsc --noEmit` | Zero type errors |

---

## 3. Automated Test Scenarios

### 3.1. Backend Test Scenarios (`backend/tests/`)
1. **Application Startup Test:** Ensures FastAPI application initializes without exceptions.
2. **Root Health Test:** `GET /health` returns status `ok` and service metadata with 200 HTTP code.
3. **v1 Health Test:** `GET /api/v1/health` returns status `ok` and `database: "connected"` when database is responsive.
4. **Database Ping Test:** `GET /api/v1/health/db` measures round-trip latency and returns database type.
5. **Database Disconnection Handling:** When the database engine is disconnected or mocked as failing, `/api/v1/health` returns status `degraded` and HTTP 503 instead of a 500 crash.
6. **Error Envelope Verification:** Triggering a 404 or 422 error returns JSON strictly matching `{ "error": { "code": "...", "message": "...", "details": [...] } }`.
7. **CORS Headers Check:** Preflight OPTIONS request verifies allowed origins from configuration.

### 3.2. Frontend Test Scenarios (`apps/mobile/__tests__/`)
1. **Design Tokens Validation:** Theme tokens provide valid colors, typography scales, spacing units, and border radii.
2. **Atomic Component Rendering:**
   - `Button`: Renders label, handles `onPress`, shows spinner in `loading` state, disables interaction when disabled.
   - `TextField`: Renders placeholder, handles text entry, renders error message when invalid.
   - `LoadingIndicator`: Displays accessible activity spinner and message.
   - `ErrorMessage`: Renders error code, human message, and optional retry action.
   - `ScreenContainer`: Wraps content with safe-area spacing and scroll support.
3. **Screen Rendering:**
   - `HomeScreen`: Displays OptiGuide logo placeholder, welcome text, disclaimer banner, and navigation placeholders.
   - `DiagnosticsScreen`: Displays current API Base URL and live status indicators.
4. **API Client Integration:**
   - Validates URL resolution and headers.
   - Successfully parses `HealthResponse` contract.

---

## 4. Manual QA Verification Checklist

- [ ] **Mobile/Web Shell:** Open Web app on `http://localhost:8081` (or exported build). Verify layout responds smoothly to window resizing.
- [ ] **Clinical Disclaimer:** Confirm disclaimer is prominently rendered: *"OptiGuide is a preliminary vision screening and eyewear guidance platform. It is not a diagnostic system and must not independently prescribe lens power."*
- [ ] **Diagnostics Connection:** Navigate to the Diagnostics screen. Trigger "Check Connectivity". Confirm status transitions from `idle` -> `loading` -> `ok (connected)`.
- [ ] **Disconnection Simulation:** Stop backend service. Trigger "Check Connectivity" on client. Confirm graceful error card is displayed without crash.
- [ ] **Security Review:** Inspect browser network tab and console; verify zero database passwords or private keys are exposed.
