from fastapi import (

    APIRouter,

    Depends,

    HTTPException
)

from sqlalchemy.orm import Session

from app.config.database import (
    get_db
)

from app.models.notification import (
    Notification
)

from app.models.user import User

from app.core.auth import (
    get_current_user
)

router = APIRouter(

    prefix="/notifications",

    tags=["Notifications"]
)


# -----------------------------------
# Get Notifications
# -----------------------------------

@router.get("/")
def get_notifications(

    page: int = 1,

    limit: int = 5,

    db: Session = Depends(get_db),

    current_user: User = Depends(
        get_current_user
    )
):

    offset = (page - 1) * limit

    notifications = db.query(
        Notification
    ).filter(

        Notification.user_id ==
        current_user.id

    ).order_by(

        Notification.created_at.desc()

    ).offset(offset).limit(limit).all()

    result = []

    for notification in notifications:

        result.append({

            "id":
                notification.id,

            "title":
                notification.title,

            "message":
                notification.message,

            "is_read":
                notification.is_read,

            "created_at":
                notification.created_at
        })

    return result


# -----------------------------------
# Mark Notification As Read
# -----------------------------------

@router.put("/read/{notification_id}")
def mark_notification_as_read(

    notification_id: int,

    db: Session = Depends(get_db),

    current_user: User = Depends(
        get_current_user
    )
):

    notification = db.query(
        Notification
    ).filter(

        Notification.id ==
        notification_id,

        Notification.user_id ==
        current_user.id

    ).first()

    if not notification:

        raise HTTPException(

            status_code=404,

            detail="Notification not found"
        )

    notification.is_read = True

    db.commit()

    return {

        "message":
            "Notification marked as read"
    }