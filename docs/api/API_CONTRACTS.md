# OptiGuide — API Contracts & Specification (v1)

This document formalizes the REST API conventions, versioning rules, endpoints, and error handling contracts between the FastAPI backend and client applications (React Native / Web).

---

## 1. General API Conventions

- **Base URL Prefix:** `/api/v1`
- **Root Health Prefix:** `/health` (also aliased under `/api/v1/health`)
- **Format:** `application/json; charset=utf-8`
- **Encoding:** UTF-8
- **Authentication:** Unauthenticated for baseline health & diagnostic endpoints in Phase 1. Bearer Token (JWT) placeholder planned for Phase 2.

---

## 2. Endpoints Specification

### 2.1. Basic Health Check

Returns the operational status of the core application process.

- **Method:** `GET`
- **Path:** `/health`
- **Response Code:** `200 OK`
- **Payload Schema:**

```json
{
  "status": "ok",
  "service": "optiguide-api",
  "version": "1.0.0",
  "environment": "development",
  "timestamp": "2026-11-02T01:00:00.000Z"
}
```

---

### 2.2. Comprehensive System & Database Health Check

Returns the composite status of the API service along with its database connectivity.

- **Method:** `GET`
- **Path:** `/api/v1/health`
- **Response Codes:**
  - `200 OK`: Core service is running and database is connected.
  - `503 Service Unavailable`: Database is unreachable (status degraded).

#### Healthy Response Example (200 OK)
```json
{
  "status": "ok",
  "service": "optiguide-api",
  "version": "1.0.0",
  "environment": "development",
  "timestamp": "2026-11-02T01:00:00.000Z",
  "database": "connected"
}
```

#### Degraded Response Example (503 Service Unavailable)
```json
{
  "status": "degraded",
  "service": "optiguide-api",
  "version": "1.0.0",
  "environment": "development",
  "timestamp": "2026-11-02T01:00:00.000Z",
  "database": "disconnected"
}
```

---

### 2.3. Dedicated Database Connectivity Diagnostic

Returns detailed database engine telemetry, driver type, and round-trip ping latency.

- **Method:** `GET`
- **Path:** `/api/v1/health/db`
- **Response Codes:**
  - `200 OK`: Database connected and responsive.
  - `503 Service Unavailable`: Database ping failed.

#### Success Payload Example (200 OK)
```json
{
  "status": "ok",
  "database": "connected",
  "database_type": "sqlite",
  "latency_ms": 1.42,
  "message": "Database ping successful"
}
```

#### Failure Payload Example (503 Service Unavailable)
```json
{
  "status": "error",
  "database": "disconnected",
  "database_type": "postgresql",
  "latency_ms": null,
  "message": "Could not connect to database server"
}
```

---

## 3. Standard Error Envelope Contract

All client and server errors (HTTP 4xx and 5xx) strictly adhere to the unified error envelope:

```json
{
  "error": {
    "code": "ERROR_CODE_STRING",
    "message": "Human-readable summary of the error.",
    "details": [
      {
        "loc": ["body", "field_name"],
        "msg": "Detailed description of validation failure",
        "type": "value_error"
      }
    ]
  }
}
```

### Standard Error Codes

| Code | HTTP Status | Meaning |
| :--- | :--- | :--- |
| `VALIDATION_ERROR` | 422 | Request body, query parameter, or header failed Pydantic schema validation. |
| `NOT_FOUND` | 404 | The requested endpoint, route, or resource does not exist. |
| `BAD_REQUEST` | 400 | The request could not be processed due to malformed semantics. |
| `DATABASE_DISCONNECTED`| 503 | Database health check ping failed. |
| `INTERNAL_SERVER_ERROR`| 500 | Unhandled server exception (sanitized, zero stack trace leaked). |
