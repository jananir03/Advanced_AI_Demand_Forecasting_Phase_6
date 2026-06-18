from fastapi import (
    APIRouter,
    Depends,
    Body
)

from sqlalchemy.orm import Session

from app.config.database import (
    get_db
)

from app.models.strategic_planning import (
    StrategicPlanning
)

from app.models.user import User

from app.core.auth import (
    get_current_user
)

from app.services.notification_service import (
    create_notification
)

router = APIRouter(

    prefix="/strategic-planning",

    tags=["Strategic Planning"]

)


@router.post("/")
def create_plan(

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

    forecast_value = float(
        payload.get(
            "forecast_value",
            0
        )
    )

    variance = (
        forecast_value -
        target_value
    )

    recommendation = ""

    if variance > 0:

        recommendation = (
            "Forecast exceeds target. Consider scaling operations."
        )

    elif variance < 0:

        recommendation = (
            "Forecast below target. Review growth strategy."
        )

    else:

        recommendation = (
            "Forecast aligned with target."
        )

    plan = StrategicPlanning(

        plan_name=
            payload.get(
                "plan_name"
            ),

        planning_period=
            payload.get(
                "planning_period"
            ),

        target_value=
            target_value,

        forecast_value=
            forecast_value,

        variance=
            variance,

        recommendation=
            recommendation,

        created_by=
            current_user.id

    )

    db.add(
        plan
    )

    db.commit()

    db.refresh(
        plan
    )

    create_notification(

        db=db,

        user_id=current_user.id,

        title="Strategic Plan Created",

        message=f"{plan.plan_name} created successfully"

    )

    return plan


@router.get("/")
def get_plans(

    db: Session = Depends(get_db)

):

    return db.query(
        StrategicPlanning
    ).order_by(

        StrategicPlanning.id.desc()

    ).all()


@router.get("/{plan_id}")
def get_plan(

    plan_id: int,

    db: Session = Depends(get_db)

):

    return db.query(
        StrategicPlanning
    ).filter(

        StrategicPlanning.id
        ==
        plan_id

    ).first()


@router.put("/{plan_id}")
def update_plan(

    plan_id: int,

    payload: dict = Body(...),

    db: Session = Depends(get_db)

):

    plan = db.query(
        StrategicPlanning
    ).filter(

        StrategicPlanning.id
        ==
        plan_id

    ).first()

    if not plan:

        return {
            "message":
            "Plan not found"
        }

    target_value = float(
        payload.get(
            "target_value",
            plan.target_value
        )
    )

    forecast_value = float(
        payload.get(
            "forecast_value",
            plan.forecast_value
        )
    )

    plan.plan_name = payload.get(
        "plan_name",
        plan.plan_name
    )

    plan.planning_period = payload.get(
        "planning_period",
        plan.planning_period
    )

    plan.target_value = (
        target_value
    )

    plan.forecast_value = (
        forecast_value
    )

    plan.variance = (
        forecast_value -
        target_value
    )

    db.commit()

    return {
        "message":
        "Strategic plan updated successfully"
    }


@router.delete("/{plan_id}")
def delete_plan(

    plan_id: int,

    db: Session = Depends(get_db)

):

    plan = db.query(
        StrategicPlanning
    ).filter(

        StrategicPlanning.id
        ==
        plan_id

    ).first()

    if not plan:

        return {
            "message":
            "Plan not found"
        }

    db.delete(
        plan
    )

    db.commit()

    return {
        "message":
        "Strategic plan deleted successfully"
    }


@router.get("/stats/summary")
def planning_summary(

    db: Session = Depends(get_db)

):

    total_plans = db.query(
        StrategicPlanning
    ).count()

    active_plans = db.query(
        StrategicPlanning
    ).filter(

        StrategicPlanning.status
        ==
        "active"

    ).count()

    return {

        "total_plans":
            total_plans,

        "active_plans":
            active_plans

    }