from fastapi import (

    APIRouter,

    Depends
)

from sqlalchemy.orm import Session

from app.config.database import (
    get_db
)

from app.models.user import User

from app.models.dataset import Dataset

from app.models.forecast_history import (
    ForecastHistory
)

from app.models.notification import (
    Notification
)

from app.core.auth import (
    get_current_user
)

router = APIRouter(

    prefix="/admin",

    tags=["Admin"]
)


# -----------------------------------
# Admin Summary
# -----------------------------------

@router.get("/summary")
def admin_summary(

    db: Session = Depends(get_db),

    current_user: User = Depends(
        get_current_user
    )
):

    total_users = db.query(
        User
    ).count()

    total_datasets = db.query(
        Dataset
    ).count()

    total_forecasts = db.query(
        ForecastHistory
    ).count()

    total_notifications = db.query(
        Notification
    ).count()

    return {

        "total_users":
            total_users,

        "total_datasets":
            total_datasets,

        "total_forecasts":
            total_forecasts,

        "total_notifications":
            total_notifications
    }


# -----------------------------------
# Get All Users
# -----------------------------------

@router.get("/users")
def get_all_users(

    page: int = 1,

    limit: int = 5,

    db: Session = Depends(get_db),

    current_user: User = Depends(
        get_current_user
    )
):

    offset = (page - 1) * limit

    users = db.query(
        User
    ).offset(offset).limit(limit).all()

    result = []

    for user in users:

        result.append({

            "id":
                user.id,

            "username":
                user.username,

            "email":
                user.email,

            "role":
                user.role,

            "created_at":
                user.created_at
        })

    return result


# -----------------------------------
# Get All Datasets
# -----------------------------------

@router.get("/datasets")
def get_all_datasets(

    page: int = 1,

    limit: int = 5,

    db: Session = Depends(get_db),

    current_user: User = Depends(
        get_current_user
    )
):

    offset = (page - 1) * limit

    datasets = db.query(
        Dataset
    ).offset(offset).limit(limit).all()

    result = []

    for dataset in datasets:

        result.append({

            "id":
                dataset.id,

            "dataset_name":
                dataset.file_name,

            "total_records":
                dataset.row_count,

            "upload_date":
                dataset.upload_date
        })

    return result


# -----------------------------------
# Forecast Activities
# -----------------------------------

@router.get("/forecasts")
def get_forecasts(

    page: int = 1,

    limit: int = 5,

    db: Session = Depends(get_db),

    current_user: User = Depends(
        get_current_user
    )
):

    offset = (page - 1) * limit

    forecasts = db.query(
        ForecastHistory
    ).offset(offset).limit(limit).all()

    result = []

    for forecast in forecasts:

        result.append({

            "id":
                forecast.id,

            "model_used":
                forecast.model_used,

            "accuracy_score":
                forecast.accuracy_score,

            "created_at":
                forecast.created_at
        })

    return result


# -----------------------------------
# Recent Activities
# -----------------------------------

@router.get("/activities")
def recent_activities(

    page: int = 1,

    limit: int = 10,

    db: Session = Depends(get_db),

    current_user: User = Depends(
        get_current_user
    )
):

    offset = (page - 1) * limit

    notifications = db.query(
        Notification
    ).order_by(

        Notification.created_at.desc()

    ).offset(offset).limit(limit).all()

    result = []

    for notification in notifications:

        result.append({

            "title":
                notification.title,

            "message":
                notification.message,

            "created_at":
                notification.created_at
        })

    return result