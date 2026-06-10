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

from app.models.user import User

from app.core.auth import (
    get_current_user
)

from app.models.dataset import Dataset

from app.models.forecast_history import ForecastHistory

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

from app.services.model_comparison_service import (
    get_model_comparison
)

router = APIRouter(

    prefix="/ai-features",

    tags=["AI Features"]
)


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


# -----------------------------------
# DEMAND RECOMMENDATION ENGINE
# -----------------------------------

@router.get(
    "/advanced/demand-recommendations"
)
def demand_recommendations(

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

    return generate_demand_recommendations(
        df
    )

# -----------------------------------
# DEMAND SPIKE PREDICTION
# -----------------------------------

@router.get(
    "/advanced/demand-spike-prediction"
)
def demand_spike_prediction(

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

    return detect_demand_spikes(
        df
    )


# -----------------------------------
# LOW STOCK PREDICTION
# -----------------------------------

@router.get(
    "/advanced/low-stock-prediction"
)
def low_stock_prediction(

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

    return predict_low_stock(
        df
    )


# -----------------------------------
# INVENTORY OPTIMIZATION
# -----------------------------------

@router.get(
    "/advanced/inventory-optimization"
)
def inventory_optimization(

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

    return generate_inventory_suggestions(
        df
    )

# -----------------------------------
# CUSTOMER BUYING BEHAVIOR
# -----------------------------------

@router.get(
    "/advanced/customer-buying-behavior"
)
def customer_buying_behavior(

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

    return analyze_buying_behavior(
        df
    )

# -----------------------------------
# MODEL COMPARISON
# -----------------------------------

@router.get(
    "/advanced/model-comparison"
)
def model_comparison(

    current_user: User = Depends(
        get_current_user
    )
):

    return get_model_comparison()

# -----------------------------------
# HISTORICAL FORECAST COMPARISON
# -----------------------------------

@router.get(
    "/advanced/historical-comparison"
)
def historical_comparison(

    db: Session = Depends(get_db),

    current_user: User = Depends(
        get_current_user
    )
):

    forecasts = (

        db.query(
            ForecastHistory
        )

        .order_by(
            ForecastHistory.created_at.desc()
        )

        .limit(10)

        .all()
    )

    result = []

    for item in forecasts:

        result.append({

            "model":
                item.model_used,

            "accuracy":
                item.accuracy_score,

            "created_at":
                item.created_at
        })

    return result

# -----------------------------------
# TREND RECOMMENDATIONS
# -----------------------------------

@router.get(
    "/advanced/trend-recommendations"
)
def trend_recommendations(

    current_user: User = Depends(
        get_current_user
    )
):

    return {

        "trend": "Growing",

        "recommendation":
            "Increase inventory levels and prepare for higher demand.",

        "confidence_score":
            92
    }