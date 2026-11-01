# OptiGuide — Phase 1 Security & Privacy Baseline

## 1. Security Scope & Principles

OptiGuide handles user health screening and optical guidance data. Security and privacy must be foundational design requirements from day one. Phase 1 establishes the baseline security controls and policies governing configuration, data access, logging, and error handling.

> [!NOTE]
> Phase 1 establishes baseline security controls. It does not replace end-to-end HIPAA/GDPR clinical compliance audits, which will be executed in subsequent phases prior to production rollout.

---

## 2. Security Controls Implemented in Phase 1

### 2.1. Environment-Based Secrets & Zero Hardcoded Credentials
- **Policy:** No API keys, passwords, database credentials, or encryption keys may be committed to version control.
- **Enforcement:**
  - Exhaustive `.gitignore` preventing `.env`, `.env.*.local`, `.pem`, and certificate files from being tracked.
  - Pydantic Settings reads secrets dynamically from host environment variables.
  - Client application bundles (React Native / Web) explicitly isolate public variables (`EXPO_PUBLIC_*`) from backend secrets.

### 2.2. Strict CORS (Cross-Origin Resource Sharing)
- **Policy:** Wildcard origins (`"*"`) are disallowed in production.
- **Enforcement:**
  - FastAPI backend configures `CORSMiddleware` using parsed JSON lists from `CORS_ORIGINS`.
  - Default development origins are restricted to localhost ports (`http://localhost:3000`, `http://localhost:8081`, `http://localhost:19006`).

### 2.3. Safe Error Handling & Information Leakage Prevention
- **Policy:** Production API responses must never leak raw database stack traces, SQL queries, or internal file paths.
- **Enforcement:**
  - Global FastAPI exception middleware catches unhandled exceptions and returns a sanitized RFC-compliant error format:
    ```json
    {
      "error": {
        "code": "INTERNAL_SERVER_ERROR",
        "message": "An unexpected error occurred. Please try again later.",
        "details": []
      }
    }
    ```
  - Internal tracebacks are logged strictly to internal logs at `ERROR` level.

### 2.4. Zero Sensitive Data in Logs
- **Policy:** Logs must never capture authorization headers, biometric data, optical test imagery, or database passwords.
- **Enforcement:**
  - Custom structured logger filters incoming request headers and strips `Authorization`, `Cookie`, and sensitive request parameters before emission.

### 2.5. Safe Database Connection Practices
- **Policy:** Database access is segregated behind connection pooling with bounded timeouts.
- **Enforcement:**
  - SQLAlchemy connection pools configure `pool_pre_ping=True` and connection recycling to drop stale or compromised connections.
  - Separate database users with least privilege must be provisioned for migration vs application runtimes.

---

## 3. Threat Model & Future Mitigation Plan

| Risk / Threat | Phase 1 Mitigation | Phase 2+ Planned Hardening |
| :--- | :--- | :--- |
| **Exposure of Clinical PII** | Preliminary screening only; zero patient records stored in Phase 1 | Encrypted-at-rest database columns, pseudonymized subject IDs, HIPAA-compliant storage |
| **Man-in-the-Middle (MitM)** | Enforced HTTPS in production; configurable API client endpoints | SSL Pinning for mobile clients; HSTS preload headers |
| **Denial of Service (DoS)** | Lightweight health check; minimal database query load | Rate limiting middleware (SlowAPI/Redis); Web Application Firewall (Cloudflare/Cloud Armor) |
| **Injection Attacks** | SQLAlchemy parameterized queries; Pydantic strict payload validation | Automated SAST (Semgrep, SonarQube); DAST vulnerability scanners |
| **Insecure Client Storage** | No tokens stored on client in Phase 1 | Expo SecureStore with biometric authentication and keychain encryption |
