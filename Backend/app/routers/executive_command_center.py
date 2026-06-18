from fastapi import (
    APIRouter,
    Depends,
    Body
)

from sqlalchemy.orm import Session
from sqlalchemy import func

from app.config.database import (
    get_db
)

from app.models.executive_command_center import (
    ExecutiveCommandCenter
)

from app.models.organization import (
    Organization
)

from app.models.project import (
    Project
)

from app.models.forecast_approval import (
    ForecastApproval
)

from app.models.workflow_automation import (
    WorkflowAutomation
)

from app.models.advanced_kpi import (
    AdvancedKPI
)

from app.models.data_quality import (
    DataQuality
)

from app.models.user import User

from app.core.auth import (
    get_current_user
)

from app.services.notification_service import (
    create_notification
)

router = APIRouter(

    prefix="/executive-command-center",

    tags=["Executive Command Center"]

)


@router.post("/")
def create_executive_record(

    payload: dict = Body(...),

    db: Session = Depends(get_db),

    current_user: User = Depends(
        get_current_user
    )

):

    record = ExecutiveCommandCenter(

        organization_name=
            payload.get(
                "organization_name"
            ),

        total_revenue=
            payload.get(
                "total_revenue",
                0
            ),

        created_by=
            current_user.id

    )

    db.add(record)

    db.commit()

    db.refresh(record)

    create_notification(

        db=db,

        user_id=current_user.id,

        title="Executive Dashboard Created",

        message=f"{record.organization_name} executive record created"

    )

    return record


@router.get("/")
def get_executive_records(

    db: Session = Depends(get_db)

):

    return db.query(
        ExecutiveCommandCenter
    ).order_by(

        ExecutiveCommandCenter.id.desc()

    ).all()


@router.get("/dashboard")
def executive_dashboard(

    db: Session = Depends(get_db)

):

    total_organizations = db.query(
        Organization
    ).count()

    total_projects = db.query(
        Project
    ).count()

    total_forecasts = db.query(
        ForecastApproval
    ).count()

    approved_forecasts = db.query(
        ForecastApproval
    ).filter(

        ForecastApproval.status
        ==
        "approved"

    ).count()

    active_workflows = db.query(
        WorkflowAutomation
    ).filter(

        WorkflowAutomation.execution_status
        ==
        "active"

    ).count()

    total_kpis = db.query(
        AdvancedKPI
    ).count()

    avg_kpi_score = db.query(

        func.avg(
            AdvancedKPI.actual_value
        )

    ).scalar()

    avg_quality = db.query(

        func.avg(
            DataQuality.quality_score
        )

    ).scalar()

    if avg_kpi_score is None:
        avg_kpi_score = 0

    if avg_quality is None:
        avg_quality = 0

    business_health = "Excellent"

    if avg_quality < 60:

        business_health = (
            "Critical"
        )

    elif avg_quality < 80:

        business_health = (
            "Warning"
        )

    elif avg_quality < 95:

        business_health = (
            "Good"
        )

    executive_alerts = db.query(
        DataQuality
    ).filter(

        DataQuality.quality_status
        ==
        "critical"

    ).count()

    return {

        "organizations":
            total_organizations,

        "projects":
            total_projects,

        "forecasts":
            total_forecasts,

        "approved_forecasts":
            approved_forecasts,

        "active_workflows":
            active_workflows,

        "total_kpis":
            total_kpis,

        "average_kpi_score":
            round(
                avg_kpi_score,
                2
            ),

        "average_data_quality":
            round(
                avg_quality,
                2
            ),

        "executive_alerts":
            executive_alerts,

        "business_health":
            business_health

    }


@router.get("/business-health")
def business_health(

    db: Session = Depends(get_db)

):

    avg_quality = db.query(

        func.avg(
            DataQuality.quality_score
        )

    ).scalar()

    if avg_quality is None:
        avg_quality = 0

    if avg_quality >= 95:

        status = "Excellent"

    elif avg_quality >= 80:

        status = "Good"

    elif avg_quality >= 60:

        status = "Warning"

    else:

        status = "Critical"

    return {

        "business_health":
            status,

        "quality_score":
            round(
                avg_quality,
                2
            )

    }


@router.get("/executive-alerts")
def executive_alerts(

    db: Session = Depends(get_db)

):

    return db.query(
        DataQuality
    ).filter(

        DataQuality.quality_status
        ==
        "critical"

    ).all()