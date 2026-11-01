import uuid
from datetime import UTC, datetime

from backend.app.database.base import Base
from sqlalchemy import DateTime, String, Text
from sqlalchemy.orm import Mapped, mapped_column


class EyewearItem(Base):
    __tablename__ = "eyewear_catalog"

    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    model_name: Mapped[str] = mapped_column(String(255), nullable=False)
    frame_type: Mapped[str] = mapped_column(String(100), nullable=False)
    lens_type: Mapped[str] = mapped_column(String(100), nullable=False)
    face_shape_compatibility: Mapped[str] = mapped_column(String(255), nullable=True)
    description: Mapped[str] = mapped_column(Text, nullable=True)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=lambda: datetime.now(UTC))
