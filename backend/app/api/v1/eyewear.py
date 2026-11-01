from fastapi import APIRouter

router = APIRouter(prefix="/eyewear", tags=["Eyewear Guidance"])


@router.get("/status")
async def eyewear_status():
    """Eyewear recommendations and frame guidance placeholder for Phase 2."""
    return {"module": "eyewear", "status": "scaffolded", "phase": 2}
