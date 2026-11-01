from datetime import datetime
from typing import Any

from pydantic import BaseModel, Field


class ScreeningCreate(BaseModel):
    test_type: str = Field(..., json_schema_extra={"example": "distance_vision"})
    device_calibration: dict[str, Any] | None = None


class ScreeningResponse(BaseModel):
    id: str
    user_id: str
    test_type: str
    status: str
    results_json: str | None = None
    created_at: datetime

    class Config:
        from_attributes = True
