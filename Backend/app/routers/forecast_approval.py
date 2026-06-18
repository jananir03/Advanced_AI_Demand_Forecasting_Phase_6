from fastapi import (
    APIRouter,
    Depends
)

from sqlalchemy.orm import Session

from datetime import datetime

from app.config.database import (
    get_db
)

from app.models.forecast_approval import (
    ForecastApproval
)

from app.schemas.forecast_approval_schema import (
    ForecastApprovalCreate,
    ForecastApprovalAction
)

from app.models.user import User

from app.core.auth import (
    get_current_user
)

from app.services.notification_service import (
    create_notification
)

router = APIRouter(

    prefix="/forecast-approvals",

    tags=["Forecast Approvals"]

)


@router.post("/submit")
def submit_forecast(

    payload: ForecastApprovalCreate,

    db: Session = Depends(get_db),

    current_user: User = Depends(
        get_current_user
    )

):

    approval = ForecastApproval(

        forecast_id=
            payload.forecast_id,

        submitted_by=
            current_user.id,

        comments=
            payload.comments,

        status="pending"

    )

    db.add(
        approval
    )

    db.commit()

    db.refresh(
        approval
    )

    create_notification(

        db=db,

        user_id=current_user.id,

        title="Forecast Submitted",

        message=f"Forecast {payload.forecast_id} submitted for approval"

    )

    return approval


@router.get("/")
def get_approvals(

    db: Session = Depends(get_db)

):

    return db.query(
        ForecastApproval
    ).order_by(
        ForecastApproval.id.desc()
    ).all()


@router.get("/pending")
def pending_approvals(

    db: Session = Depends(get_db)

):

    return db.query(
        ForecastApproval
    ).filter(

        ForecastApproval.status
        ==
        "pending"

    ).all()


@router.post("/approve/{approval_id}")
def approve_forecast(

    approval_id: int,

    payload: ForecastApprovalAction,

    db: Session = Depends(get_db),

    current_user: User = Depends(
        get_current_user
    )

):

    approval = db.query(
        ForecastApproval
    ).filter(

        ForecastApproval.id
        ==
        approval_id

    ).first()

    if not approval:

        return {
            "message":
            "Approval not found"
        }

    approval.status = "approved"

    approval.comments = (
        payload.comments
    )

    approval.approved_by = (
        current_user.id
    )

    approval.approved_at = (
        datetime.utcnow()
    )

    db.commit()

    create_notification(

        db=db,

        user_id=approval.submitted_by,

        title="Forecast Approved",

        message=f"Forecast {approval.forecast_id} approved"

    )

    return {
        "message":
        "Forecast approved successfully"
    }


@router.post("/reject/{approval_id}")
def reject_forecast(

    approval_id: int,

    payload: ForecastApprovalAction,

    db: Session = Depends(get_db),

    current_user: User = Depends(
        get_current_user
    )

):

    approval = db.query(
        ForecastApproval
    ).filter(

        ForecastApproval.id
        ==
        approval_id

    ).first()

    if not approval:

        return {
            "message":
            "Approval not found"
        }

    approval.status = "rejected"

    approval.comments = (
        payload.comments
    )

    approval.approved_by = (
        current_user.id
    )

    approval.approved_at = (
        datetime.utcnow()
    )

    db.commit()

    create_notification(

        db=db,

        user_id=approval.submitted_by,

        title="Forecast Rejected",

        message=f"Forecast {approval.forecast_id} rejected"

    )

    return {
        "message":
        "Forecast rejected successfully"
    }


@router.get("/stats/summary")
def approval_summary(

    db: Session = Depends(get_db)

):

    total = db.query(
        ForecastApproval
    ).count()

    pending = db.query(
        ForecastApproval
    ).filter(

        ForecastApproval.status
        ==
        "pending"

    ).count()

    approved = db.query(
        ForecastApproval
    ).filter(

        ForecastApproval.status
        ==
        "approved"

    ).count()

    rejected = db.query(
        ForecastApproval
    ).filter(

        ForecastApproval.status
        ==
        "rejected"

    ).count()

    return {

        "total":
            total,

        "pending":
            pending,

        "approved":
            approved,

        "rejected":
            rejected

    }