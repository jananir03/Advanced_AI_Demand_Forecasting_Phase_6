from fastapi import (
    APIRouter,
    Depends
)

from sqlalchemy.orm import Session

from app.config.database import (
    get_db
)

from app.models.forecast_governance import (
    ForecastGovernance
)

from app.schemas.forecast_governance import (
    ForecastGovernanceCreate,
    ForecastGovernanceUpdate,
    LifecycleUpdate,
    ApprovalStatusUpdate
)

from app.models.user import User

from app.core.auth import (
    get_current_user
)

from app.services.notification_service import (
    create_notification
)

router = APIRouter(

    prefix="/forecast-governance",

    tags=["Forecast Governance"]

)


@router.post("/")
def create_governance_record(

    payload: ForecastGovernanceCreate,

    db: Session = Depends(get_db),

    current_user: User = Depends(
        get_current_user
    )

):

    governance = ForecastGovernance(

        forecast_id=
            payload.forecast_id,

        version_number=
            payload.version_number,

        modified_by=
            current_user.id,

        change_summary=
            payload.change_summary

    )

    db.add(
        governance
    )

    db.commit()

    db.refresh(
        governance
    )

    create_notification(

        db=db,

        user_id=current_user.id,

        title="Governance Record Created",

        message=f"Forecast {payload.forecast_id} governance record created"

    )

    return governance


@router.get("/")
def get_governance_records(

    db: Session = Depends(get_db)

):

    return db.query(
        ForecastGovernance
    ).order_by(

        ForecastGovernance.id.desc()

    ).all()


@router.get("/forecast/{forecast_id}")
def governance_history(

    forecast_id: int,

    db: Session = Depends(get_db)

):

    return db.query(
        ForecastGovernance
    ).filter(

        ForecastGovernance.forecast_id
        ==
        forecast_id

    ).order_by(

        ForecastGovernance.version_number.desc()

    ).all()


@router.put("/{record_id}")
def update_governance_record(

    record_id: int,

    payload: ForecastGovernanceUpdate,

    db: Session = Depends(get_db)

):

    governance = db.query(
        ForecastGovernance
    ).filter(

        ForecastGovernance.id
        ==
        record_id

    ).first()

    if not governance:

        return {
            "message":
            "Governance record not found"
        }

    governance.lifecycle_status = (
        payload.lifecycle_status
    )

    governance.approval_status = (
        payload.approval_status
    )

    governance.change_summary = (
        payload.change_summary
    )

    db.commit()

    return {
        "message":
        "Governance record updated successfully"
    }


@router.put("/lifecycle/{record_id}")
def update_lifecycle(

    record_id: int,

    payload: LifecycleUpdate,

    db: Session = Depends(get_db)

):

    governance = db.query(
        ForecastGovernance
    ).filter(

        ForecastGovernance.id
        ==
        record_id

    ).first()

    if not governance:

        return {
            "message":
            "Governance record not found"
        }

    governance.lifecycle_status = (
        payload.lifecycle_status
    )

    db.commit()

    return {
        "message":
        "Lifecycle updated successfully"
    }


@router.put("/approval-status/{record_id}")
def update_approval_status(

    record_id: int,

    payload: ApprovalStatusUpdate,

    db: Session = Depends(get_db)

):

    governance = db.query(
        ForecastGovernance
    ).filter(

        ForecastGovernance.id
        ==
        record_id

    ).first()

    if not governance:

        return {
            "message":
            "Governance record not found"
        }

    governance.approval_status = (
        payload.approval_status
    )

    db.commit()

    return {
        "message":
        "Approval status updated successfully"
    }


@router.get("/stats/summary")
def governance_summary(

    db: Session = Depends(get_db)

):

    total_records = db.query(
        ForecastGovernance
    ).count()

    approved = db.query(
        ForecastGovernance
    ).filter(

        ForecastGovernance.approval_status
        ==
        "approved"

    ).count()

    pending = db.query(
        ForecastGovernance
    ).filter(

        ForecastGovernance.approval_status
        ==
        "pending"

    ).count()

    archived = db.query(
        ForecastGovernance
    ).filter(

        ForecastGovernance.lifecycle_status
        ==
        "archived"

    ).count()

    return {

        "total_records":
            total_records,

        "approved":
            approved,

        "pending":
            pending,

        "archived":
            archived

    }