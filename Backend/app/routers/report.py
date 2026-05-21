from fastapi import APIRouter

from fastapi.responses import FileResponse

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

    request: ReportRequest
):

    pdf_path = "forecast_report.pdf"

    doc = SimpleDocTemplate(
        pdf_path
    )

    styles = getSampleStyleSheet()

    elements = []

    # -----------------------------------
    # Title
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
    # Revenue Forecast
    # -----------------------------------

    elements.append(

        Paragraph(

            "Revenue Forecast",

            styles["Heading2"]
        )
    )

    revenue_data = [[

        "Date",

        "Revenue"
    ]]

    for item in request.revenue_predictions:

        revenue_data.append([

            item["date"],

            str(
                item[
                    "predicted_revenue"
                ]
            )
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
    # Sales Forecast
    # -----------------------------------

    elements.append(

        Paragraph(

            "Sales Forecast",

            styles["Heading2"]
        )
    )

    sales_data = [[

        "Date",

        "Sales"
    ]]

    for item in request.forecast_predictions:

        sales_data.append([

            item["date"],

            str(
                item[
                    "predicted_sales"
                ]
            )
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
    # Top Products
    # -----------------------------------

    elements.append(

        Paragraph(

            "Top Selling Products",

            styles["Heading2"]
        )
    )

    product_data = [[

        "Product",

        "Total Sales"
    ]]

    for item in request.top_products:

        product_data.append([

            item["product"],

            str(
                item[
                    "total_sales"
                ]
            )
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
            )
        ])
    )

    elements.append(
        product_table
    )

    # -----------------------------------
    # Build PDF
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

    request: ReportRequest
):

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

            sheet_name=
                "Revenue Forecast",

            index=False
        )

        sales_df.to_excel(

            writer,

            sheet_name=
                "Sales Forecast",

            index=False
        )

        products_df.to_excel(

            writer,

            sheet_name=
                "Top Products",

            index=False
        )

    return FileResponse(

        path=excel_path,

        filename="forecast_report.xlsx",

        media_type=
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    )