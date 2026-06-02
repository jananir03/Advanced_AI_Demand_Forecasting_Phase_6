from fastapi import (
    APIRouter,
    Depends
)

from sqlalchemy.orm import Session

from app.config.database import get_db

from app.models.activity_log import ActivityLog

router = APIRouter(

    prefix="/activities",

    tags=["Activities"]
)


@router.get("/recent")

def get_recent_activities(

    db: Session = Depends(get_db)
):

    activities = db.query(
        ActivityLog
    ).order_by(

        ActivityLog.created_at.desc()

    ).limit(10).all()

    return [

        {

            "type":
                activity.activity_type,

            "description":
                activity.description,

            "time":
                activity.created_at.strftime(
                    "%d %b %Y %I:%M %p"
                )
        }

        for activity in activities
    ]