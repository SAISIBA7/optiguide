from fastapi import APIRouter

router = APIRouter(prefix="/shopkeeper", tags=["Shopkeeper Dashboard"])


@router.get("/status")
async def shopkeeper_status():
    """Shopkeeper kiosk and stock guidance placeholder for Phase 2."""
    return {"module": "shopkeeper", "status": "scaffolded", "phase": 2}
