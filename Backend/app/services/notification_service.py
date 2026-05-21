from app.models.notification import (
    Notification
)


def create_notification(

    db,

    user_id,

    title,

    message
):

    notification = Notification(

        title=title,

        message=message,

        user_id=user_id
    )

    db.add(notification)

    db.commit()

    db.refresh(notification)

    return notification