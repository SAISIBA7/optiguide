from datetime import UTC, datetime

from backend.app.core.config import settings
from backend.app.database.session import check_db_connectivity
from backend.app.schemas.health import DatabaseHealthResponse, HealthResponse
from fastapi import APIRouter, Response, status

router = APIRouter()


@router.get(
    "/health",
    response_model=HealthResponse,
    summary="Service Health",
    description="Returns the operational status of the service along with database connectivity.",
)
async def get_system_health(response: Response) -> HealthResponse:
    is_connected, _, _, _ = check_db_connectivity()
    now_utc = datetime.now(UTC).isoformat()

    if is_connected:
        return HealthResponse(
            status="ok",
            service=settings.APP_NAME.lower() + "-api",
            version="1.0.0",
            environment=settings.APP_ENV,
            timestamp=now_utc,
            database="connected",
        )
    else:
        response.status_code = status.HTTP_503_SERVICE_UNAVAILABLE
        return HealthResponse(
            status="degraded",
            service=settings.APP_NAME.lower() + "-api",
            version="1.0.0",
            environment=settings.APP_ENV,
            timestamp=now_utc,
            database="disconnected",
        )


@router.get(
    "/health/db",
    response_model=DatabaseHealthResponse,
    summary="Database Connectivity Check",
    description="Executes a live ping against the configured database engine.",
)
async def get_db_health(response: Response) -> DatabaseHealthResponse:
    is_connected, latency_ms, db_type, error_msg = check_db_connectivity()

    if is_connected:
        return DatabaseHealthResponse(
            status="ok",
            database="connected",
            database_type=db_type,
            latency_ms=latency_ms,
            message="Database ping successful",
        )
    else:
        response.status_code = status.HTTP_503_SERVICE_UNAVAILABLE
        return DatabaseHealthResponse(
            status="error",
            database="disconnected",
            database_type=db_type,
            latency_ms=None,
            message=error_msg or "Database connection failed",
        )
