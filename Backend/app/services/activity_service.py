from app.models.activity_log import ActivityLog


def create_activity(

    db,

    user_id,

    activity_type,

    description
):

    activity = ActivityLog(

        user_id=user_id,

        activity_type=activity_type,

        description=description
    )

    db.add(activity)

    db.commit()