# OptiGuide — REST API Endpoints Reference

All endpoints are hosted under base URL prefix `/api/v1` (with `/health` also available at the root).

---

## 1. Health & Diagnostics

| Method | Path | Summary | Auth Required | Status Codes |
| :--- | :--- | :--- | :---: | :--- |
| `GET` | `/health` | Core process liveness | No | `200` |
| `GET` | `/api/v1/health` | Composite system & database health | No | `200`, `503` |
| `GET` | `/api/v1/health/db` | Detailed database ping & latency | No | `200`, `503` |

---

## 2. Phase 2 Endpoint Scaffolds

| Method | Path | Subsystem | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/v1/auth/status` | Auth | Authentication subsystem state |
| `GET` | `/api/v1/users/status` | Users | User management subsystem state |
| `GET` | `/api/v1/screening/status` | Screening | Screening test engine state |
| `GET` | `/api/v1/reports/status` | Reports | Report generation engine state |
| `GET` | `/api/v1/eyewear/status` | Eyewear | Eyewear guidance engine state |
| `GET` | `/api/v1/shopkeeper/status`| Shopkeeper | Shopkeeper dashboard state |
