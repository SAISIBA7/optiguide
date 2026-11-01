from typing import Literal

from pydantic import BaseModel, Field


class HealthResponse(BaseModel):
    status: Literal["ok", "degraded", "error"] = Field(..., json_schema_extra={"example": "ok"})
    service: str = Field(..., json_schema_extra={"example": "optiguide-api"})
    version: str = Field(..., json_schema_extra={"example": "1.0.0"})
    environment: str = Field(..., json_schema_extra={"example": "development"})
    timestamp: str = Field(..., json_schema_extra={"example": "2026-11-02T01:00:00.000Z"})
    database: Literal["connected", "disconnected", "error"] | None = Field(
        None, json_schema_extra={"example": "connected"}
    )


class DatabaseHealthResponse(BaseModel):
    status: Literal["ok", "degraded", "error"] = Field(..., json_schema_extra={"example": "ok"})
    database: Literal["connected", "disconnected", "error"] = Field(..., json_schema_extra={"example": "connected"})
    database_type: str = Field(..., json_schema_extra={"example": "sqlite"})
    latency_ms: float | None = Field(None, json_schema_extra={"example": 1.23})
    message: str | None = Field(None, json_schema_extra={"example": "Database ping successful"})
