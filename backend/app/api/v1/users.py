from fastapi import APIRouter

router = APIRouter(prefix="/users", tags=["Users"])


@router.get("/status")
async def users_status():
    """User profile management placeholder for Phase 2."""
    return {"module": "users", "status": "scaffolded", "phase": 2}
