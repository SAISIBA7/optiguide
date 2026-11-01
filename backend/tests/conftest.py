import pytest
from backend.app.core.config import settings
from backend.app.main import create_application
from httpx import ASGITransport, AsyncClient
from starlette.testclient import TestClient

# Force SQLite for local testing
settings.DATABASE_URL = "sqlite:///./test.db"
settings.APP_ENV = "test"


@pytest.fixture(scope="session")
def app():
    return create_application()


@pytest.fixture(scope="session")
def client(app):
    with TestClient(app) as test_client:
        yield test_client


@pytest.fixture
async def async_client(app):
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as ac:
        yield ac
