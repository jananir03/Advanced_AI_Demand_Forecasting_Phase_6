from fastapi import (
    APIRouter,
    Depends,
    HTTPException
)

from sqlalchemy.orm import Session

from app.config.database import get_db

from app.models.dataset import Dataset

from app.models.sales_record import SalesRecord

from app.models.scenario_analysis import (
    ScenarioAnalysis
)

router = APIRouter(
    prefix="/scenario-analysis",
    tags=["Scenario Analysis"]
)


@router.post("/generate")
def generate_scenario(
    payload: dict,
    db: Session = Depends(get_db)
):

    dataset_id = payload.get(
        "dataset_id"
    )

    sales_growth = float(
        payload.get(
            "sales_growth",
            0
        )
    )

    seasonality_factor = float(
        payload.get(
            "seasonality_factor",
            0
        )
    )

    demand_factor = float(
        payload.get(
            "demand_factor",
            0
        )
    )

    dataset = db.query(
        Dataset
    ).filter(
        Dataset.id == dataset_id
    ).first()

    if not dataset:

        raise HTTPException(
            status_code=404,
            detail="Dataset not found"
        )

    sales_records = db.query(
        SalesRecord
    ).filter(
        SalesRecord.dataset_id == dataset_id
    ).all()

    total_sales = sum([
        record.sales_amount
        for record in sales_records
    ])

    growth_multiplier = (
        1 +
        (
            sales_growth +
            seasonality_factor +
            demand_factor
        ) / 100
    )

    normal_case = (
        total_sales *
        growth_multiplier
    )

    best_case = (
        normal_case *
        1.20
    )

    worst_case = (
        normal_case *
        0.80
    )

    scenario = ScenarioAnalysis(

        dataset_id=dataset_id,

        sales_growth=sales_growth,

        seasonality_factor=seasonality_factor,

        demand_factor=demand_factor,

        best_case=best_case,

        normal_case=normal_case,

        worst_case=worst_case
    )

    db.add(scenario)

    db.commit()

    db.refresh(scenario)

    return {

        "scenario_id":
        scenario.id,

        "dataset_id":
        dataset_id,

        "sales_growth":
        sales_growth,

        "seasonality_factor":
        seasonality_factor,

        "demand_factor":
        demand_factor,

        "best_case":
        round(best_case, 2),

        "normal_case":
        round(normal_case, 2),

        "worst_case":
        round(worst_case, 2)

    }


@router.get("/history")
def scenario_history(
    db: Session = Depends(get_db)
):

    scenarios = db.query(
        ScenarioAnalysis
    ).order_by(
        ScenarioAnalysis.created_at.desc()
    ).all()

    return scenarios


@router.get("/{scenario_id}")
def get_scenario(
    scenario_id: int,
    db: Session = Depends(get_db)
):

    scenario = db.query(
        ScenarioAnalysis
    ).filter(
        ScenarioAnalysis.id == scenario_id
    ).first()

    if not scenario:

        raise HTTPException(
            status_code=404,
            detail="Scenario not found"
        )

    return scenario


@router.delete("/{scenario_id}")
def delete_scenario(
    scenario_id: int,
    db: Session = Depends(get_db)
):

    scenario = db.query(
        ScenarioAnalysis
    ).filter(
        ScenarioAnalysis.id == scenario_id
    ).first()

    if not scenario:

        raise HTTPException(
            status_code=404,
            detail="Scenario not found"
        )

    db.delete(scenario)

    db.commit()

    return {
        "message":
        "Scenario deleted successfully"
    }


@router.get("/comparison/latest")
def compare_latest_scenarios(
    db: Session = Depends(get_db)
):

    scenarios = db.query(
        ScenarioAnalysis
    ).order_by(
        ScenarioAnalysis.created_at.desc()
    ).limit(5).all()

    comparison = []

    for scenario in scenarios:

        comparison.append({

            "scenario_id":
            scenario.id,

            "best_case":
            scenario.best_case,

            "normal_case":
            scenario.normal_case,

            "worst_case":
            scenario.worst_case

        })

    return comparison