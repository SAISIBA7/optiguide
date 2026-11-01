from backend.app.core.config import Settings


def test_settings_cors_origins_parsing():
    settings = Settings(CORS_ORIGINS=["http://localhost:3000"])
    assert "http://localhost:3000" in settings.CORS_ORIGINS


def test_settings_app_name():
    settings = Settings(APP_NAME="OptiGuide Test")
    assert settings.APP_NAME == "OptiGuide Test"
