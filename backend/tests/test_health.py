from unittest.mock import patch


def test_root_health(client):
    response = client.get("/health")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "ok"
    assert data["service"] == "optiguide-api"
    assert data["version"] == "1.0.0"
    assert "timestamp" in data


def test_v1_health_connected(client):
    response = client.get("/api/v1/health")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "ok"
    assert data["service"] == "optiguide-api"
    assert data["database"] == "connected"


def test_v1_db_ping(client):
    response = client.get("/api/v1/health/db")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "ok"
    assert data["database"] == "connected"
    assert data["database_type"] == "sqlite"
    assert data["latency_ms"] is not None
    assert data["latency_ms"] >= 0


def test_v1_health_degraded_when_db_down(client):
    with patch(
        "backend.app.api.v1.health.check_db_connectivity",
        return_value=(False, None, "sqlite", "Connection timeout"),
    ):
        response = client.get("/api/v1/health")
        assert response.status_code == 503
        data = response.json()
        assert data["status"] == "degraded"
        assert data["database"] == "disconnected"


def test_v1_db_health_error_when_db_down(client):
    with patch(
        "backend.app.api.v1.health.check_db_connectivity",
        return_value=(False, None, "sqlite", "Fatal database error"),
    ):
        response = client.get("/api/v1/health/db")
        assert response.status_code == 503
        data = response.json()
        assert data["status"] == "error"
        assert data["database"] == "disconnected"
        assert data["message"] == "Fatal database error"
