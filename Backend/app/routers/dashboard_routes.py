import json
import pandas as pd

from fastapi import (
    APIRouter,
    Depends
)

from sqlalchemy.orm import Session

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

    db: Session = Depends(get_db),

    current_user: User = Depends(
        get_current_user
    )
):

    sales_records = db.query(
        SalesRecord
    ).all()

    data = []

    for record in sales_records:

        data.append({

            "sales_date":
                record.sales_date,

            "sales_amount":
                record.sales_amount
        })

    df = pd.DataFrame(data)

    # Convert date column

    df["sales_date"] = pd.to_datetime(
        df["sales_date"]
    )

    # Extract Month Names

    df["month"] = df[
        "sales_date"
    ].dt.strftime("%b")

    # Group by Month

    monthly_data = df.groupby(
        "month"
    )["sales_amount"].sum().reset_index()

    # Rename columns

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

    db: Session = Depends(get_db),

    current_user: User = Depends(
        get_current_user
    )
):

    sales_records = db.query(
        SalesRecord
    ).all()

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

    db: Session = Depends(get_db),

    current_user: User = Depends(
        get_current_user
    )
):

    sales_records = db.query(
        SalesRecord
    ).all()

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

    db: Session = Depends(get_db),

    current_user: User = Depends(
        get_current_user
    )
):

    sales_records = db.query(
        SalesRecord
    ).all()

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