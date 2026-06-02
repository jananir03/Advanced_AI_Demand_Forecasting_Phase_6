from fastapi import (
    APIRouter,
    Depends
)

from fastapi.responses import FileResponse

from sqlalchemy.orm import Session

from app.config.database import get_db

from app.models.user import User

from app.core.auth import (
    get_current_user
)

from app.services.activity_service import (
    create_activity
)

from pydantic import BaseModel

from reportlab.platypus import (
    SimpleDocTemplate,
    Paragraph,
    Spacer,
    Table,
    TableStyle
)

from reportlab.lib import colors

from reportlab.lib.styles import (
    getSampleStyleSheet
)

import pandas as pd


router = APIRouter(
    prefix="/report",
    tags=["Reports"]
)


# -----------------------------------
# Request Schema
# -----------------------------------

class ReportRequest(BaseModel):

    revenue_predictions: list

    forecast_predictions: list

    top_products: list


# -----------------------------------
# PDF REPORT
# -----------------------------------

@router.post("/pdf")

def generate_pdf_report(

    request: ReportRequest,

    db: Session = Depends(get_db),

    current_user: User = Depends(
        get_current_user
    )
):

    # -----------------------------------
    # ACTIVITY LOG
    # -----------------------------------
    print("REPORT ACTIVITY CALLED")

    create_activity(

        db=db,

        user_id=current_user.id,

        activity_type="PDF Report Download",

        description=f"{current_user.username} downloaded PDF report"
    )

    pdf_path = "forecast_report.pdf"

    doc = SimpleDocTemplate(
        pdf_path
    )

    styles = getSampleStyleSheet()

    elements = []

    # -----------------------------------
    # TITLE
    # -----------------------------------

    elements.append(
        Paragraph(
            "AI Forecast Report",
            styles["Title"]
        )
    )

    elements.append(
        Spacer(1, 20)
    )

    # -----------------------------------
    # REVENUE FORECAST
    # -----------------------------------

    elements.append(
        Paragraph(
            "Revenue Forecast",
            styles["Heading2"]
        )
    )

    revenue_data = [
        [
            "Date",
            "Predicted Revenue"
        ]
    ]

    for item in request.revenue_predictions:

        if isinstance(item, dict):

            revenue_data.append([

                item.get("date", "N/A"),

                str(
                    item.get(
                        "predicted_revenue",
                        0
                    )
                )
            ])

        else:

            revenue_data.append([

                "N/A",

                str(item)
            ])

    revenue_table = Table(
        revenue_data
    )

    revenue_table.setStyle(
        TableStyle([

            (
                "BACKGROUND",
                (0, 0),
                (-1, 0),
                colors.blue
            ),

            (
                "TEXTCOLOR",
                (0, 0),
                (-1, 0),
                colors.white
            ),

            (
                "GRID",
                (0, 0),
                (-1, -1),
                1,
                colors.black
            ),

            (
                "FONTNAME",
                (0, 0),
                (-1, 0),
                "Helvetica-Bold"
            )
        ])
    )

    elements.append(
        revenue_table
    )

    elements.append(
        Spacer(1, 20)
    )

    # -----------------------------------
    # SALES FORECAST
    # -----------------------------------

    elements.append(
        Paragraph(
            "Sales Forecast",
            styles["Heading2"]
        )
    )

    sales_data = [
        [
            "Date",
            "Predicted Sales"
        ]
    ]

    for item in request.forecast_predictions:

        if isinstance(item, dict):

            sales_data.append([

                item.get("date", "N/A"),

                str(
                    item.get(
                        "predicted_sales",
                        0
                    )
                )
            ])

        else:

            sales_data.append([

                "N/A",

                str(item)
            ])

    sales_table = Table(
        sales_data
    )

    sales_table.setStyle(
        TableStyle([

            (
                "BACKGROUND",
                (0, 0),
                (-1, 0),
                colors.orange
            ),

            (
                "TEXTCOLOR",
                (0, 0),
                (-1, 0),
                colors.white
            ),

            (
                "GRID",
                (0, 0),
                (-1, -1),
                1,
                colors.black
            ),

            (
                "FONTNAME",
                (0, 0),
                (-1, 0),
                "Helvetica-Bold"
            )
        ])
    )

    elements.append(
        sales_table
    )

    elements.append(
        Spacer(1, 20)
    )

    # -----------------------------------
    # TOP PRODUCTS
    # -----------------------------------

    elements.append(
        Paragraph(
            "Top Selling Products",
            styles["Heading2"]
        )
    )

    product_data = [
        [
            "Product",
            "Total Sales"
        ]
    ]

    for item in request.top_products:

        if isinstance(item, dict):

            product_data.append([

                item.get(
                    "product",
                    "N/A"
                ),

                str(
                    item.get(
                        "total_sales",
                        0
                    )
                )
            ])

        else:

            product_data.append([

                str(item),

                "0"
            ])

    product_table = Table(
        product_data
    )

    product_table.setStyle(
        TableStyle([

            (
                "BACKGROUND",
                (0, 0),
                (-1, 0),
                colors.green
            ),

            (
                "TEXTCOLOR",
                (0, 0),
                (-1, 0),
                colors.white
            ),

            (
                "GRID",
                (0, 0),
                (-1, -1),
                1,
                colors.black
            ),

            (
                "FONTNAME",
                (0, 0),
                (-1, 0),
                "Helvetica-Bold"
            )
        ])
    )

    elements.append(
        product_table
    )

    # -----------------------------------
    # BUILD PDF
    # -----------------------------------

    doc.build(elements)

    return FileResponse(
        path=pdf_path,
        filename="forecast_report.pdf",
        media_type="application/pdf"
    )


# -----------------------------------
# EXCEL REPORT
# -----------------------------------

@router.post("/excel")

def generate_excel_report(

    request: ReportRequest,

    db: Session = Depends(get_db),

    current_user: User = Depends(
        get_current_user
    )
):

    # -----------------------------------
    # ACTIVITY LOG
    # -----------------------------------

    print("REPORT ACTIVITY CALLED")

    create_activity(

        db=db,

        user_id=current_user.id,

        activity_type="Excel Report Download",

        description=f"{current_user.username} downloaded Excel report"
    )

    excel_path = "forecast_report.xlsx"

    revenue_df = pd.DataFrame(
        request.revenue_predictions
    )

    sales_df = pd.DataFrame(
        request.forecast_predictions
    )

    products_df = pd.DataFrame(
        request.top_products
    )

    with pd.ExcelWriter(
        excel_path,
        engine="openpyxl"
    ) as writer:

        revenue_df.to_excel(
            writer,
            sheet_name="Revenue Forecast",
            index=False
        )

        sales_df.to_excel(
            writer,
            sheet_name="Sales Forecast",
            index=False
        )

        products_df.to_excel(
            writer,
            sheet_name="Top Products",
            index=False
        )

    return FileResponse(
        path=excel_path,
        filename="forecast_report.xlsx",
        media_type="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    )