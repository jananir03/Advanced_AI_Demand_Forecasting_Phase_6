from fastapi import (
    APIRouter,
    Depends
)

from sqlalchemy.orm import Session

from app.config.database import get_db

from app.models.scenario_analysis import (
    ScenarioAnalysis
)

from app.models.user import User

from app.schemas.scenario_schema import (
    ScenarioCreateSchema
)

from app.models.forecast_history import (
    ForecastHistory
)

from app.core.auth import (
    get_current_user
)

from app.services.notification_service import (
    create_notification
)

from app.models.dataset import Dataset
from app.models.forecast_history import ForecastHistory

router = APIRouter(
    prefix="/scenario-analysis",
    tags=["Scenario Analysis"]
)


@router.post("/save")
def save_scenario(

    payload: ScenarioCreateSchema,

    db: Session = Depends(get_db),

    current_user: User = Depends(
        get_current_user
    )
):
    
    latest_forecast = (

    db.query(
        ForecastHistory
    )

    .order_by(
        ForecastHistory.id.desc()
    )

    .first()
)

    scenario = ScenarioAnalysis(

        scenario_name=
        payload.scenario_name,

        dataset_id = latest_forecast.dataset_id,

        user_id=
        current_user.id,

        sales_growth=
        payload.sales_growth,

        seasonality_factor=
        payload.seasonality_factor,

        demand_factor=
        payload.demand_factor,

        best_case=
        payload.best_case,

        normal_case=
        payload.normal_case,

        worst_case=
        payload.worst_case
    )

    db.add(scenario)

    db.commit()

    db.refresh(scenario)

    create_notification(

    db=db,

    user_id=current_user.id,

    title="Forecast Strategy Saved",

    message=f"{payload.scenario_name} strategy saved successfully"
)

    return {

        "message":
        "Scenario saved successfully"
    }


@router.get("/history")
def get_scenarios(

    db: Session = Depends(get_db),

    current_user: User = Depends(
        get_current_user
    )
):

    scenarios = (

        db.query(
            ScenarioAnalysis
        )

        .filter(
            ScenarioAnalysis.user_id
            ==
            current_user.id
        )

        .order_by(
            ScenarioAnalysis.id.desc()
        )

        .all()
    )

    result = []

    for scenario in scenarios:

        dataset = (

            db.query(
                Dataset
            )

            .filter(
                Dataset.id
                ==
                scenario.dataset_id
            )

            .first()
        )

        result.append({

            "id":
                scenario.id,

            "scenario_name":
                scenario.scenario_name,

            "dataset_name":

                dataset.file_name

                if dataset

                else "Unknown Dataset",

            "best_case":
                scenario.best_case,

            "normal_case":
                scenario.normal_case,

            "worst_case":
                scenario.worst_case,

            "created_at":
                scenario.created_at
        })

    return result