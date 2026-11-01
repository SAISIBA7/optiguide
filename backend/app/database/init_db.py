from backend.app.core.logging import logger
from backend.app.database.base import Base
from backend.app.database.session import engine


def init_database() -> None:
    """Creates tables if they do not exist (useful for testing and zero-config local dev)."""
    logger.info("Initializing database schema...")
    Base.metadata.create_all(bind=engine)
    logger.info("Database schema initialized.")
