from fastapi import APIRouter

from app.services.scheduler_service import (
    start_scheduler,
    stop_scheduler,
    get_scheduler_status
)

router = APIRouter(
    prefix="/scheduler-control",
    tags=["Scheduler Control"]
)


@router.post("/start")
def start():

    start_scheduler()

    return {
        "message": "Scheduler started"
    }


@router.post("/stop")
def stop():

    stop_scheduler()

    return {
        "message": "Scheduler stopped"
    }


@router.get("/status")
def status():

    return {
        "running": get_scheduler_status()
    }