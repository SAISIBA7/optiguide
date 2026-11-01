# OptiGuide — Database Design & Schema Architecture

## 1. Overview
OptiGuide uses SQLAlchemy 2.0 with Alembic migrations. It targets **PostgreSQL** in production/staging environments and supports **SQLite** for zero-dependency local development and CI testing.

---

## 2. Entity-Relationship Model (Phase 1 Baseline & Phase 2 Schema)

```mermaid
erDiagram
    USER ||--o{ SCREENING : initiates
    USER ||--o{ REPORT : receives
    SCREENING ||--|| REPORT : generates
    EYEWEAR_ITEM }o--o{ REPORT : referenced_in

    USER {
        string id PK
        string email UK
        string hashed_password
        string full_name
        string role
        string preferred_language
        datetime created_at
        datetime updated_at
    }

    SCREENING {
        string id PK
        string user_id FK
        string status
        string test_type
        text results_json
        datetime created_at
    }

    REPORT {
        string id PK
        string screening_id FK
        string user_id FK
        boolean referral_recommended
        text observations_json
        datetime created_at
    }

    EYEWEAR_ITEM {
        string id PK
        string model_name
        string frame_type
        string lens_type
        string face_shape_compatibility
        text description
        datetime created_at
    }
```

---

## 3. Storage Strategy & Abstraction

All database queries are decoupled behind repository patterns. Route handlers never execute raw SQL directly, and all models inherit from `backend.app.database.base.Base`.
