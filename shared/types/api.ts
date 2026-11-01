/**
 * OptiGuide - Shared API Contracts
 * Defines standard request and response structures between Backend (FastAPI)
 * and Frontend (Expo React Native / Web).
 */

export type HealthStatus = 'ok' | 'degraded' | 'error';
export type DatabaseStatus = 'connected' | 'disconnected' | 'error';

/**
 * Standard Service Health Response
 * Returned by GET /health and GET /api/v1/health
 */
export interface HealthResponse {
  status: HealthStatus;
  service: string;
  version: string;
  environment: string;
  timestamp: string;
  database?: DatabaseStatus;
}

/**
 * Detailed Database Health Response
 * Returned by GET /api/v1/health/db
 */
export interface DatabaseHealthResponse {
  status: HealthStatus;
  database: DatabaseStatus;
  database_type: string;
  latency_ms?: number;
  message?: string;
}

/**
 * Standard Error Detail Item
 */
export interface ErrorDetail {
  loc?: (string | number)[];
  msg: string;
  type?: string;
}

/**
 * RFC-compliant Standard Error Envelope
 */
export interface ApiErrorPayload {
  code: string;
  message: string;
  details: ErrorDetail[];
}

export interface ErrorResponse {
  error: ApiErrorPayload;
}
