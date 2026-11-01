from backend.app.api.v1 import (
    auth,
    eyewear,
    health,
    reports,
    screening,
    shopkeeper,
    users,
)
from fastapi import APIRouter

api_router = APIRouter()
api_router.include_router(health.router)
api_router.include_router(auth.router)
api_router.include_router(users.router)
api_router.include_router(screening.router)
api_router.include_router(reports.router)
api_router.include_router(eyewear.router)
api_router.include_router(shopkeeper.router)
