from fastapi import (
    APIRouter,
    Depends
)

from sqlalchemy.orm import Session

from app.config.database import get_db

from app.models.sales_record import SalesRecord
from app.models.forecast_history import ForecastHistory
from app.models.scenario_analysis import ScenarioAnalysis

import json


router = APIRouter(
    prefix="/executive-dashboard",
    tags=["Executive Dashboard"]
)


def get_total_revenue(db: Session):

    sales_records = db.query(
        SalesRecord
    ).all()

    return sum(
        record.sales_amount
        for record in sales_records
    )


def get_forecast_revenue(db: Session):

    latest_forecast = (
        db.query(
            ForecastHistory
        )
        .order_by(
            ForecastHistory.created_at.desc()
        )
        .first()
    )

    if not latest_forecast:
        return 0

    try:

        forecast_data = latest_forecast.forecast_result

        if isinstance(
            forecast_data,
            str
        ):
            forecast_data = json.loads(
                forecast_data
            )

        revenue = sum(
            item.get(
                "predicted_sales",
                0
            )
            for item in forecast_data
        )

        return revenue

    except Exception:
        return 0


def get_average_accuracy(db: Session):

    forecasts = db.query(
        ForecastHistory
    ).all()

    if not forecasts:
        return 0

    return round(
        sum(
            item.accuracy_score
            for item in forecasts
        ) / len(forecasts),
        2
    )


def get_top_product(db: Session):

    sales_records = db.query(
        SalesRecord
    ).all()

    if not sales_records:
        return None

    product_totals = {}

    for item in sales_records:

        product = item.product_name

        if product not in product_totals:
            product_totals[product] = 0

        product_totals[product] += (
            item.sales_amount
        )

    return max(
        product_totals,
        key=product_totals.get
    )


def get_top_region(db: Session):

    sales_records = db.query(
        SalesRecord
    ).all()

    if not sales_records:
        return None

    region_totals = {}

    for item in sales_records:

        region = item.region

        if region not in region_totals:
            region_totals[region] = 0

        region_totals[region] += (
            item.sales_amount
        )

    return max(
        region_totals,
        key=region_totals.get
    )


@router.get("/overview")
def executive_dashboard(
    db: Session = Depends(get_db)
):

    total_revenue = get_total_revenue(
        db
    )

    forecast_revenue = (
        get_forecast_revenue(
            db
        )
    )

    average_accuracy = (
        get_average_accuracy(
            db
        )
    )

    latest_scenario = (
        db.query(
            ScenarioAnalysis
        )
        .order_by(
            ScenarioAnalysis.created_at.desc()
        )
        .first()
    )

    best_case = (
        latest_scenario.best_case
        if latest_scenario
        else 0
    )

    normal_case = (
        latest_scenario.normal_case
        if latest_scenario
        else 0
    )

    worst_case = (
        latest_scenario.worst_case
        if latest_scenario
        else 0
    )

    growth_percentage = 0

    if total_revenue > 0:

        growth_percentage = (
            (
                forecast_revenue -
                total_revenue
            )
            /
            total_revenue
        ) * 100

    return {

        "total_revenue":
        round(
            total_revenue,
            2
        ),

        "forecast_revenue":
        round(
            forecast_revenue,
            2
        ),

        "forecast_count":
        db.query(
            ForecastHistory
        ).count(),

        "average_accuracy":
        average_accuracy,

        "business_growth":
        round(
            growth_percentage,
            2
        ),

        "top_product":
        get_top_product(
            db
        ),

        "top_region":
        get_top_region(
            db
        ),

        "best_case":
        best_case,

        "normal_case":
        normal_case,

        "worst_case":
        worst_case
    }


@router.get("/revenue-forecast")
def revenue_forecast(
    db: Session = Depends(get_db)
):

    current_revenue = (
        get_total_revenue(
            db
        )
    )

    forecast_revenue = (
        get_forecast_revenue(
            db
        )
    )

    growth = 0

    if current_revenue > 0:

        growth = (
            (
                forecast_revenue -
                current_revenue
            )
            /
            current_revenue
        ) * 100

    return {

        "current_revenue":
        round(
            current_revenue,
            2
        ),

        "forecast_revenue":
        round(
            forecast_revenue,
            2
        ),

        "growth_percentage":
        round(
            growth,
            2
        )
    }


@router.get("/profit-forecast")
def profit_forecast(
    db: Session = Depends(get_db)
):

    forecast_revenue = (
        get_forecast_revenue(
            db
        )
    )

    profit = (
        forecast_revenue * 0.30
    )

    return {

        "forecast_revenue":
        round(
            forecast_revenue,
            2
        ),

        "forecast_profit":
        round(
            profit,
            2
        )
    }


@router.get("/cost-analysis")
def cost_analysis(
    db: Session = Depends(get_db)
):

    forecast_revenue = (
        get_forecast_revenue(
            db
        )
    )

    estimated_cost = (
        forecast_revenue * 0.70
    )

    return {

        "forecast_revenue":
        round(
            forecast_revenue,
            2
        ),

        "estimated_cost":
        round(
            estimated_cost,
            2
        )
    }


@router.get("/business-kpis")
def business_kpis(
    db: Session = Depends(get_db)
):

    total_revenue = (
        get_total_revenue(
            db
        )
    )

    forecast_revenue = (
        get_forecast_revenue(
            db
        )
    )

    average_accuracy = (
        get_average_accuracy(
            db
        )
    )

    forecast_count = (
        db.query(
            ForecastHistory
        ).count()
    )

    return {

        "total_revenue":
        round(
            total_revenue,
            2
        ),

        "forecast_revenue":
        round(
            forecast_revenue,
            2
        ),

        "forecast_count":
        forecast_count,

        "average_accuracy":
        average_accuracy,

        "top_product":
        get_top_product(
            db
        ),

        "top_region":
        get_top_region(
            db
        )
    }