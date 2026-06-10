import json
import pandas as pd

from fastapi import (
    APIRouter,
    Depends
)

from sqlalchemy.orm import Session

from sklearn.ensemble import IsolationForest

from app.config.database import (
    get_db
)

from app.models.sales_record import (
    SalesRecord
)

from app.models.forecast_history import (
    ForecastHistory
)

from app.models.dataset import Dataset

from app.models.user import User

from app.core.auth import (
    get_current_user
)

from app.services.analytics_service import (

    monthly_sales_trends,

    top_products,

    category_sales,

    region_sales
)

from app.services.recommendation_service import (
    generate_demand_recommendations
)

from app.services.demand_spike_service import (
    detect_demand_spikes
)

from app.services.low_stock_service import (
    predict_low_stock
)

from app.services.inventory_optimization_service import (
    generate_inventory_suggestions
)

from app.services.buying_behavior_service import (
    analyze_buying_behavior
)

router = APIRouter(

    prefix="/dashboard",

    tags=["Dashboard"]
)


# -----------------------------------
# Dashboard Summary
# -----------------------------------

@router.get("/summary")
def dashboard_summary(

    db: Session = Depends(get_db),

    current_user: User = Depends(
        get_current_user
    )
):

    total_datasets = db.query(
        Dataset
    ).count()

    total_forecasts = db.query(
        ForecastHistory
    ).count()

    sales_records = db.query(
        SalesRecord
    ).all()

    total_sales = sum(

        record.sales_amount

        for record in sales_records
    )

    return {

        "total_sales":
            round(float(total_sales), 2),

        "total_datasets":
            total_datasets,

        "total_forecasts":
            total_forecasts,

        "accuracy":
            91
    }


# -----------------------------------
# Monthly Sales Trends
# -----------------------------------

@router.get("/monthly-sales")
def get_monthly_sales(

    dataset_id: int = None,

    db: Session = Depends(get_db),

    current_user: User = Depends(
        get_current_user
    )
):

    query = db.query(
    SalesRecord
)

    if dataset_id:

        query = query.filter(

            SalesRecord.dataset_id ==
            dataset_id
        )

    sales_records = query.all()

    data = []

    for record in sales_records:

        data.append({

            "sales_date":
                record.sales_date,

            "sales_amount":
                record.sales_amount
        })

    df = pd.DataFrame(data)

    if df.empty:

        return []

    df["sales_date"] = pd.to_datetime(
        df["sales_date"]
    )

    df["month"] = df[
        "sales_date"
    ].dt.strftime("%b")

    monthly_data = df.groupby(
        "month"
    )["sales_amount"].sum().reset_index()

    monthly_data.columns = [
        "month",
        "sales"
    ]

    return monthly_data.to_dict(
        orient="records"
    )


# -----------------------------------
# Top Products
# -----------------------------------

@router.get("/top-products")
def get_top_products(
    
    dataset_id: int = None,
    db: Session = Depends(get_db),

    current_user: User = Depends(
        get_current_user
    )
):

    query = db.query(
    SalesRecord
)

    if dataset_id:

        query = query.filter(

            SalesRecord.dataset_id ==
            dataset_id
        )

    sales_records = query.all()

    data = []

    for record in sales_records:

        data.append({

            "product_name":
                record.product_name,

            "sales_amount":
                record.sales_amount
        })

    df = pd.DataFrame(data)

    return top_products(df)


# -----------------------------------
# Category Sales
# -----------------------------------

@router.get("/category-sales")
def get_category_sales(

    dataset_id: int = None,
    db: Session = Depends(get_db),

    current_user: User = Depends(
        get_current_user
    )
):

    query = db.query(
    SalesRecord
)

    if dataset_id:

        query = query.filter(

            SalesRecord.dataset_id ==
            dataset_id
        )

    sales_records = query.all()

    data = []

    for record in sales_records:

        data.append({

            "category":
                record.category,

            "sales_amount":
                record.sales_amount
        })

    df = pd.DataFrame(data)

    return category_sales(df)


# -----------------------------------
# Region Sales
# -----------------------------------

@router.get("/region-sales")
def get_region_sales(

    dataset_id: int = None,
    db: Session = Depends(get_db),

    current_user: User = Depends(
        get_current_user
    )
):

    query = db.query(
    SalesRecord
)

    if dataset_id:

        query = query.filter(

            SalesRecord.dataset_id ==
            dataset_id
        )

    sales_records = query.all()

    data = []

    for record in sales_records:

        data.append({

            "region":
                record.region,

            "sales_amount":
                record.sales_amount
        })

    df = pd.DataFrame(data)

    return region_sales(df)


# -----------------------------------
# Forecast History
# -----------------------------------

@router.get("/forecast-history")
def get_forecast_history(

    page: int = 1,

    limit: int = 5,

    db: Session = Depends(get_db),

    current_user: User = Depends(
        get_current_user
    )
):

    offset = (page - 1) * limit

    history = db.query(
        ForecastHistory
    ).offset(offset).limit(limit).all()

    result = []

    for item in history:

        result.append({

            "id": item.id,

            "model_used":
                item.model_used,

            "accuracy_score":
                item.accuracy_score,

            "forecast_result":
                json.loads(
                    item.forecast_result
                ),

            "created_at":
                item.created_at
        })

    return result


# -----------------------------------
# ADVANCED ANALYTICS
# REGION-WISE ANALYTICS
# -----------------------------------

@router.get("/advanced/region-analytics")
def region_analytics(

    dataset_id: int = None,
    db: Session = Depends(get_db),

    current_user: User = Depends(
        get_current_user
    )
):

    query = db.query(
    SalesRecord
)

    if dataset_id:

        query = query.filter(

            SalesRecord.dataset_id ==
            dataset_id
        )

    sales_records = query.all()

    data = []

    for record in sales_records:

        data.append({

            "region":
                record.region,

            "sales_amount":
                record.sales_amount
        })

    df = pd.DataFrame(data)

    if df.empty:

        return []

    region_data = (

        df.groupby("region")[
            "sales_amount"
        ]

        .sum()

        .reset_index()
    )

    region_data.columns = [

        "region",

        "total_sales"
    ]

    return region_data.to_dict(
        orient="records"
    )



# -----------------------------------
# REVENUE ANALYTICS
# -----------------------------------

@router.get("/advanced/revenue-analytics")
def revenue_analytics(

    dataset_id: int = None,
    db: Session = Depends(get_db),

    current_user: User = Depends(
        get_current_user
    )
):

    query = db.query(
    SalesRecord
)

    if dataset_id:

        query = query.filter(

            SalesRecord.dataset_id ==
            dataset_id
        )

    sales_records = query.all()

    total_revenue = sum(

        record.sales_amount

        for record in sales_records
    )

    predicted_growth = round(

        total_revenue * 0.18,

        2
    )

    monthly_average = round(

        total_revenue / 12,

        2
    )

    return {

        "total_revenue":
            round(
                float(total_revenue),
                2
            ),

        "predicted_growth":
            predicted_growth,

        "monthly_average":
            monthly_average
    }


# -----------------------------------
# SYSTEM PERFORMANCE METRICS
# -----------------------------------

@router.get("/advanced/system-metrics")
def system_metrics(

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

    return {

        "api_health":
            "Healthy",

        "system_load":
            "Optimized",

        "total_users":
            total_users,

        "total_datasets":
            total_datasets,

        "total_forecasts":
            total_forecasts
    }
    