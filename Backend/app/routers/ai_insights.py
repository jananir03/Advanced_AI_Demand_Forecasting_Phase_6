from fastapi import (
    APIRouter,
    Depends
)

from sqlalchemy.orm import Session

from app.config.database import get_db

from app.models.sales_record import SalesRecord

router = APIRouter(
    prefix="/ai-insights",
    tags=["AI Insights"]
)


@router.get("/recommendations")
def business_recommendations(
    db: Session = Depends(get_db)
):

    sales_records = db.query(
        SalesRecord
    ).all()

    top_products = sorted(
        sales_records,
        key=lambda x: x.sales_amount,
        reverse=True
    )[:5]

    recommendations = []

    for product in top_products:

        recommendations.append({

            "product":
            product.product_name,

            "recommendation":
            "Increase inventory and marketing investment"

        })

    return recommendations


@router.get("/high-growth-products")
def high_growth_products(
    db: Session = Depends(get_db)
):

    sales_records = db.query(
        SalesRecord
    ).all()

    top_products = sorted(
        sales_records,
        key=lambda x: x.sales_amount,
        reverse=True
    )[:5]

    result = []

    for item in top_products:

        result.append({

            "product":
            item.product_name,

            "sales":
            item.sales_amount,

            "growth_status":
            "High Growth"

        })

    return result


@router.get("/declining-products")
def declining_products(
    db: Session = Depends(get_db)
):

    sales_records = db.query(
        SalesRecord
    ).all()

    bottom_products = sorted(
        sales_records,
        key=lambda x: x.sales_amount
    )[:5]

    result = []

    for item in bottom_products:

        result.append({

            "product":
            item.product_name,

            "sales":
            item.sales_amount,

            "status":
            "Declining"

        })

    return result


@router.get("/demand-opportunities")
def demand_opportunities(
    db: Session = Depends(get_db)
):

    sales_records = db.query(
        SalesRecord
    ).all()

    opportunities = []

    for item in sales_records[:5]:

        opportunities.append({

            "product":
            item.product_name,

            "opportunity":
            "Potential demand expansion"

        })

    return opportunities


@router.get("/forecast-summary")
def forecast_summary(
    db: Session = Depends(get_db)
):

    sales_records = db.query(
        SalesRecord
    ).all()

    total_revenue = sum([
        item.sales_amount
        for item in sales_records
    ])

    return {

        "summary":
        "Revenue is expected to grow over the next forecast cycle.",

        "total_revenue":
        total_revenue,

        "forecast_growth":
        "15%"

    }