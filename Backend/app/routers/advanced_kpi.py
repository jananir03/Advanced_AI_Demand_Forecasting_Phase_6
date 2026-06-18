from fastapi import (
    APIRouter,
    Depends,
    Body
)

from sqlalchemy.orm import Session

from app.config.database import (
    get_db
)

from app.models.advanced_kpi import (
    AdvancedKPI
)

from app.models.user import User

from app.core.auth import (
    get_current_user
)

from app.services.notification_service import (
    create_notification
)

router = APIRouter(

    prefix="/advanced-kpi",

    tags=["Advanced KPI"]

)


@router.post("/")
def create_kpi(

    payload: dict = Body(...),

    db: Session = Depends(get_db),

    current_user: User = Depends(
        get_current_user
    )

):

    target_value = float(
        payload.get(
            "target_value",
            0
        )
    )

    actual_value = float(
        payload.get(
            "actual_value",
            0
        )
    )

    forecast_value = float(
        payload.get(
            "forecast_value",
            0
        )
    )

    variance = (
        actual_value -
        target_value
    )

    alert_threshold = float(
        payload.get(
            "alert_threshold",
            0
        )
    )

    performance_status = "normal"

    if variance > 0:

        performance_status = (
            "excellent"
        )

    elif abs(variance) >= alert_threshold:

        performance_status = (
            "critical"
        )

    elif variance < 0:

        performance_status = (
            "warning"
        )

    kpi = AdvancedKPI(

        kpi_name=
            payload.get(
                "kpi_name"
            ),

        category=
            payload.get(
                "category"
            ),

        target_value=
            target_value,

        actual_value=
            actual_value,

        forecast_value=
            forecast_value,

        variance=
            variance,

        alert_threshold=
            alert_threshold,

        performance_status=
            performance_status,

        created_by=
            current_user.id

    )

    db.add(
        kpi
    )

    db.commit()

    db.refresh(
        kpi
    )

    create_notification(

        db=db,

        user_id=current_user.id,

        title="KPI Created",

        message=f"{kpi.kpi_name} KPI created successfully"

    )

    return kpi


@router.get("/")
def get_kpis(

    db: Session = Depends(get_db)

):

    return db.query(
        AdvancedKPI
    ).order_by(

        AdvancedKPI.id.desc()

    ).all()


@router.get("/{kpi_id}")
def get_kpi(

    kpi_id: int,

    db: Session = Depends(get_db)

):

    return db.query(
        AdvancedKPI
    ).filter(

        AdvancedKPI.id
        ==
        kpi_id

    ).first()


@router.put("/{kpi_id}")
def update_kpi(

    kpi_id: int,

    payload: dict = Body(...),

    db: Session = Depends(get_db)

):

    kpi = db.query(
        AdvancedKPI
    ).filter(

        AdvancedKPI.id
        ==
        kpi_id

    ).first()

    if not kpi:

        return {
            "message":
            "KPI not found"
        }

    target_value = float(
        payload.get(
            "target_value",
            kpi.target_value
        )
    )

    actual_value = float(
        payload.get(
            "actual_value",
            kpi.actual_value
        )
    )

    variance = (
        actual_value -
        target_value
    )

    kpi.kpi_name = payload.get(
        "kpi_name",
        kpi.kpi_name
    )

    kpi.category = payload.get(
        "category",
        kpi.category
    )

    kpi.target_value = (
        target_value
    )

    kpi.actual_value = (
        actual_value
    )

    kpi.forecast_value = float(
        payload.get(
            "forecast_value",
            kpi.forecast_value
        )
    )

    kpi.variance = variance

    db.commit()

    return {
        "message":
        "KPI updated successfully"
    }


@router.delete("/{kpi_id}")
def delete_kpi(

    kpi_id: int,

    db: Session = Depends(get_db)

):

    kpi = db.query(
        AdvancedKPI
    ).filter(

        AdvancedKPI.id
        ==
        kpi_id

    ).first()

    if not kpi:

        return {
            "message":
            "KPI not found"
        }

    db.delete(
        kpi
    )

    db.commit()

    return {
        "message":
        "KPI deleted successfully"
    }


@router.get("/stats/summary")
def kpi_summary(

    db: Session = Depends(get_db)

):

    total_kpis = db.query(
        AdvancedKPI
    ).count()

    excellent = db.query(
        AdvancedKPI
    ).filter(

        AdvancedKPI.performance_status
        ==
        "excellent"

    ).count()

    warning = db.query(
        AdvancedKPI
    ).filter(

        AdvancedKPI.performance_status
        ==
        "warning"

    ).count()

    critical = db.query(
        AdvancedKPI
    ).filter(

        AdvancedKPI.performance_status
        ==
        "critical"

    ).count()

    return {

        "total_kpis":
            total_kpis,

        "excellent":
            excellent,

        "warning":
            warning,

        "critical":
            critical

    }