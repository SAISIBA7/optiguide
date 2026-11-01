from fastapi import APIRouter

router = APIRouter(prefix="/screening", tags=["Screening"])


@router.get("/status")
async def screening_status():
    """Vision screening engine placeholder for Phase 2."""
    return {"module": "screening", "status": "scaffolded", "phase": 2}
