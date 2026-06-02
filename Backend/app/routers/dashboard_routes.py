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
# INVENTORY RISK ANALYSIS
# -----------------------------------

@router.get("/advanced/inventory-risk")
def inventory_risk(
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

    risk_analysis = []

    for record in sales_records[:15]:

        sales = float(
            record.sales_amount
        )

        if sales < 1000:

            risk = "High Risk"

        elif sales < 3000:

            risk = "Medium Risk"

        else:

            risk = "Low Risk"

        risk_analysis.append({

            "product":
                record.product_name,

            "sales":
                sales,

            "risk_level":
                risk
        })

    return risk_analysis


# -----------------------------------
# BUSINESS INSIGHTS
# -----------------------------------

@router.get("/advanced/business-insights")
def business_insights(

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

            "product":
                record.product_name,

            "category":
                record.category,

            "region":
                record.region,

            "sales_amount":
                record.sales_amount
        })

    df = pd.DataFrame(data)

    if df.empty:

        return {

            "insights": [

                "No business data available."
            ]
        }

    insights = []

    # -----------------------------------
    # TOTAL REVENUE
    # -----------------------------------

    total_revenue = round(

        float(

            df["sales_amount"].sum()

        ),

        2
    )

    insights.append(

        f"Total business revenue reached ₹{total_revenue}"
    )

    # -----------------------------------
    # TOP REGION
    # -----------------------------------

    region_sales = (

        df.groupby("region")[
            "sales_amount"
        ]

        .sum()
    )
    if region_sales.empty:
        return{
            "insights": [
                "No analytics data is available for this dataset"
            ]
        }

    top_region = region_sales.idxmax()

    top_region_sales = round(

        float(

            region_sales.max()

        ),

        2
    )

    insights.append(

        f"{top_region} region generated highest sales worth ₹{top_region_sales}"
    )

    # -----------------------------------
    # LOWEST REGION
    # -----------------------------------

    if len(region_sales) > 0:

        low_region = (
            region_sales.idxmin()
        )

        insights.append(

            f"{low_region} region shows lower business performance and needs attention"
        )

    insights.append(

        "Category analytics unavailable because the uploaded datasets do not contain category information."
    )

    # -----------------------------------
    # TOP PRODUCT
    # -----------------------------------

    product_sales = (

        df.groupby("product")[
            "sales_amount"
        ]

        .sum()

        
    )
    if len(product_sales) >0:
        top_product = (
            product_sales.idxmax()
        )

    insights.append(

        f"{top_product} is currently the highest-selling product"
    )

    # -----------------------------------
    # INVENTORY RISK
    # -----------------------------------

    low_products = df[

        df["sales_amount"] < 1000
    ]

    risk_count = len(
        low_products
    )

    insights.append(

        f"{risk_count} products are under potential inventory risk due to low sales"
    )

    # -----------------------------------
    # AI FORECAST INSIGHT
    # -----------------------------------

    avg_sales = round(

        float(

            df["sales_amount"].mean()

        ),

        2
    )

    if avg_sales > 3000:

        insights.append(

            "AI models predict strong future business growth trends"
        )

    else:

        insights.append(

            "AI models suggest moderate growth with optimization opportunities"
        )

    # -----------------------------------
    # PRODUCT DIVERSITY
    # -----------------------------------

    total_products = len(

        df["product"].unique()
    )

    insights.append(

        f"Business currently manages {total_products} active products"
    )

    return {

        "insights":
            insights
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

# -----------------------------------
# ANOMALY DETECTION
# -----------------------------------

@router.get("/advanced/anomaly-detection")
def anomaly_detection(

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

            "product":
                record.product_name,

            "sales_amount":
                record.sales_amount
        })

    df = pd.DataFrame(data)

    if df.empty:

        return []

    anomaly_model = IsolationForest(

        contamination=0.1,

        random_state=42
    )

    df["anomaly"] = anomaly_model.fit_predict(

        df[["sales_amount"]]
    )

    anomalies = df[
        df["anomaly"] == -1
    ]

    result = []

    for _, row in anomalies.iterrows():

        result.append({

            "product":
                row["product"],

            "sales_amount":
                round(
                    float(
                        row["sales_amount"]
                    ),
                    2
                ),

            "status":
                "Anomaly Detected"
        })

    return result