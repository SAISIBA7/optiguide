from datetime import UTC, datetime

from backend.app.api.v1.router import api_router
from backend.app.core.config import settings
from backend.app.core.logging import logger
from backend.app.middleware.error_handler import (
    generic_exception_handler,
    http_exception_handler,
    validation_exception_handler,
)
from backend.app.middleware.logging_middleware import RequestTimingMiddleware
from backend.app.schemas.health import HealthResponse
from fastapi import FastAPI
from fastapi.exceptions import RequestValidationError
from fastapi.middleware.cors import CORSMiddleware
from starlette.exceptions import HTTPException as StarletteHTTPException


def create_application() -> FastAPI:
    app = FastAPI(
        title=settings.APP_NAME,
        version="1.0.0",
        description="OptiGuide Vision Screening and Eyewear Guidance API",
        docs_url="/docs" if settings.APP_DEBUG else None,
        redoc_url="/redoc" if settings.APP_DEBUG else None,
    )

    # Middleware: Request timing
    app.add_middleware(RequestTimingMiddleware)

    # Middleware: CORS
    app.add_middleware(
        CORSMiddleware,
        allow_origins=settings.CORS_ORIGINS,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    # Exception Handlers
    app.add_exception_handler(RequestValidationError, validation_exception_handler)
    app.add_exception_handler(StarletteHTTPException, http_exception_handler)
    app.add_exception_handler(Exception, generic_exception_handler)

    # Root Level Health (Liveness)
    @app.get("/health", response_model=HealthResponse, tags=["Health"])
    async def root_health():
        return HealthResponse(
            status="ok",
            service=settings.APP_NAME.lower() + "-api",
            version="1.0.0",
            environment=settings.APP_ENV,
            timestamp=datetime.now(UTC).isoformat(),
        )

    # Include API v1 Router
    app.include_router(api_router, prefix=settings.API_V1_PREFIX)

    logger.info(f"{settings.APP_NAME} initialized in {settings.APP_ENV} environment.")
    return app


app = create_application()
