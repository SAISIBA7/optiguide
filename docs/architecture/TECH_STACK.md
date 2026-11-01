# OptiGuide — Technology Stack

## 1. Stack Matrix

| Tier | Technology | Version | Purpose |
| :--- | :--- | :--- | :--- |
| **Mobile Client** | React Native (Expo) | SDK 52 / React Native 0.76 | Cross-platform mobile (Android, iOS) & Web |
| **Web Client** | React + Vite | React 18 / Vite 5 | Dedicated high-performance desktop web interface |
| **Language** | TypeScript | 5.3+ | End-to-end type safety |
| **Backend API** | FastAPI | 0.115+ | High-performance asynchronous Python REST API |
| **Validation** | Pydantic | v2.9+ | Request/response schema validation and settings |
| **ORM & Migrations**| SQLAlchemy / Alembic | 2.0+ / 1.13+ | Database abstraction and migration versioning |
| **Database** | PostgreSQL / SQLite | 16 / 3 | Dual-engine data tier (Postgres for server, SQLite for dev/CI) |
| **Linter / Formatter**| Ruff | 0.7+ | Ultra-fast Python linting and code style |
| **Test Runners** | Pytest & Jest | Pytest 8.4+ / Jest 29.7+ | Automated unit and integration testing |
| **CI/CD** | GitHub Actions | Ubuntu Latest | Continuous integration pipelines |
