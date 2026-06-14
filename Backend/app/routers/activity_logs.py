from fastapi import (
    APIRouter,
    Depends
)

from sqlalchemy.orm import Session

from app.config.database import get_db

from app.models.activity_log import (
    ActivityLog
)

from app.models.user import User

from app.core.permissions import (
    require_roles
)

router = APIRouter(
    prefix="/activity-logs",
    tags=["Activity Logs"]
)


@router.get("/")
def get_activity_logs(

    db: Session = Depends(get_db),

    current_user: User = Depends(
        require_roles(
            ["super_admin"]
        )
    )
):

    logs = (

        db.query(
            ActivityLog
        )

        .order_by(
            ActivityLog.created_at.desc()
        )

        .all()
    )

    result = []

    for log in logs:

        result.append({

            "id":
                log.id,

            "activity_type":
                log.activity_type,

            "description":
                log.description,

            "created_at":
                log.created_at,

            "user_id":
                log.user_id
        })

    return result