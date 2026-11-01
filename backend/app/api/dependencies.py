from collections.abc import Generator

from backend.app.database.session import get_db
from sqlalchemy.orm import Session


def get_database() -> Generator[Session, None, None]:
    """Dependency yielding a thread-local SQLAlchemy session."""
    yield from get_db()
