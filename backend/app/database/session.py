import time
from collections.abc import Generator

from backend.app.core.config import settings
from backend.app.core.logging import logger
from sqlalchemy import create_engine, text
from sqlalchemy.orm import Session, sessionmaker

# Configure engine connection args based on dialect
connect_args = {}
if settings.DATABASE_URL.startswith("sqlite"):
    connect_args = {"check_same_thread": False}

engine = create_engine(
    settings.DATABASE_URL,
    echo=settings.DB_ECHO,
    connect_args=connect_args,
    pool_pre_ping=True,
)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


def get_db() -> Generator[Session, None, None]:
    """Dependency for obtaining a thread-local database session."""
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


def check_db_connectivity() -> tuple[bool, float | None, str, str | None]:
    """
    Executes a lightweight ping ('SELECT 1') against the active database.
    Returns:
        (is_connected, latency_ms, db_type, error_message)
    """
    db_type = engine.dialect.name
    start_time = time.perf_counter()
    try:
        with engine.connect() as conn:
            conn.execute(text("SELECT 1"))
        latency_ms = round((time.perf_counter() - start_time) * 1000, 2)
        return True, latency_ms, db_type, None
    except Exception as exc:  # noqa: BLE001
        logger.error(f"Database connectivity check failed: {exc}")
        return False, None, db_type, str(exc)
