from datetime import datetime

from pydantic import BaseModel


class ReportResponse(BaseModel):
    id: str
    screening_id: str
    user_id: str
    referral_recommended: bool
    observations_json: str | None = None
    created_at: datetime

    class Config:
        from_attributes = True
