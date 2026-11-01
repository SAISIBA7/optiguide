import time

from backend.app.core.logging import logger
from fastapi import Request
from starlette.middleware.base import BaseHTTPMiddleware


class RequestTimingMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        start_time = time.perf_counter()
        response = await call_next(request)
        process_time_ms = round((time.perf_counter() - start_time) * 1000, 2)
        response.headers["X-Process-Time-Ms"] = str(process_time_ms)

        # Log without capturing any sensitive headers
        logger.info(
            f"{request.method} {request.url.path} - Status: {response.status_code} - {process_time_ms}ms"
        )
        return response
