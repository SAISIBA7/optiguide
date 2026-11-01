from fastapi import APIRouter

router = APIRouter(prefix="/reports", tags=["Reports"])


@router.get("/status")
async def reports_status():
    """Screening report and referral placeholder for Phase 2."""
    return {"module": "reports", "status": "scaffolded", "phase": 2}
