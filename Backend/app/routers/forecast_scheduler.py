from fastapi import (
    APIRouter,
    Depends,
    HTTPException
)

from sqlalchemy.orm import Session

from app.config.database import get_db

from app.models.forecast_schedule import (
    ForecastSchedule
)

from app.models.user import User

from app.schemas.forecast_schedule_schema import (
    ForecastScheduleCreate
)

from app.core.permissions import (
    require_roles
)

from app.services.scheduler_service import (
    add_schedule_job,
    remove_schedule_job
)

from app.services.auto_forecast_service import (
    run_scheduled_forecast
)

router = APIRouter(
    prefix="/scheduler",
    tags=["Forecast Scheduler"]
)


# -----------------------------------
# CREATE SCHEDULE
# -----------------------------------

@router.post("/create")
def create_schedule(

    request: ForecastScheduleCreate,

    db: Session = Depends(get_db),

    current_user: User = Depends(

        require_roles([
            "super_admin",
            "analyst"
        ])
    )
):

    schedule = ForecastSchedule(

        dataset_id=request.dataset_id,

        user_id=current_user.id,

        model_name=request.model_name,

        interval_type=request.interval_type,

        is_active=True
    )

    db.add(schedule)

    db.commit()

    db.refresh(schedule)

    hours = 24

    if request.interval_type == "hourly":

        hours = 1

    elif request.interval_type == "daily":

        hours = 24

    elif request.interval_type == "weekly":

        hours = 24 * 7


    add_schedule_job(

        job_id=schedule.id,

        func=lambda:

            run_scheduled_forecast(
                schedule.id
            ),

        interval_hours=hours
    )

    return {
        "message":
            "Schedule created successfully",

        "schedule_id":
            schedule.id
    }


# -----------------------------------
# LIST SCHEDULES
# -----------------------------------

@router.get("/list")
def list_schedules(

    db: Session = Depends(get_db),

    current_user: User = Depends(
        require_roles([
            "super_admin",
            "analyst"
        ])
    )
):

    schedules = db.query(
        ForecastSchedule
    ).all()

    result = []

    for item in schedules:

        result.append({

            "id": item.id,

            "dataset_id":
                item.dataset_id,

            "model_name":
                item.model_name,

            "interval_type":
                item.interval_type,

            "is_active":
                item.is_active
        })

    return result


# -----------------------------------
# TOGGLE SCHEDULE
# -----------------------------------

@router.put("/toggle/{schedule_id}")
def toggle_schedule(

    schedule_id: int,

    db: Session = Depends(get_db),

    current_user: User = Depends(
        require_roles([
            "super_admin"
        ])
    )
):

    schedule = db.query(
        ForecastSchedule
    ).filter(

        ForecastSchedule.id ==
        schedule_id

    ).first()

    if not schedule:

        raise HTTPException(

            status_code=404,

            detail="Schedule not found"
        )

    schedule.is_active = (
        not schedule.is_active
    )

    db.commit()

    return {

        "message":
            "Schedule updated",

        "is_active":
            schedule.is_active
    }


# -----------------------------------
# DELETE SCHEDULE
# -----------------------------------

@router.delete("/{schedule_id}")
def delete_schedule(

    schedule_id: int,

    db: Session = Depends(get_db),

    current_user: User = Depends(
        require_roles([
            "super_admin"
        ])
    )
):

    schedule = db.query(
        ForecastSchedule
    ).filter(

        ForecastSchedule.id ==
        schedule_id

    ).first()

    if not schedule:

        raise HTTPException(

            status_code=404,

            detail="Schedule not found"
        )
    
    remove_schedule_job(
        schedule.id
    )
    db.delete(schedule)

    db.commit()

    return {

        "message":
            "Schedule deleted"
    }