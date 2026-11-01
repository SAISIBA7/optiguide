"""Security utilities: Password hashing and token placeholders."""
import secrets


def generate_secure_token(length: int = 32) -> str:
    """Generates a cryptographically secure URL-safe token."""
    return secrets.token_urlsafe(length)
