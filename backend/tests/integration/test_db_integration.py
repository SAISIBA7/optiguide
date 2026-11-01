from backend.app.database.session import check_db_connectivity


def test_db_connectivity_integration():
    is_connected, latency_ms, db_type, error = check_db_connectivity()
    assert is_connected is True
    assert db_type == "sqlite"
    assert latency_ms is not None
    assert error is None
