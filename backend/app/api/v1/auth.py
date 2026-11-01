from fastapi import APIRouter

router = APIRouter(prefix="/auth", tags=["Authentication"])


@router.get("/status")
async def auth_status():
    """Authentication subsystem placeholder for Phase 2."""
    return {"module": "auth", "status": "scaffolded", "phase": 2}
