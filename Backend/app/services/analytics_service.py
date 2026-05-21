import pandas as pd


# -----------------------------------
# Monthly Sales Trends
# -----------------------------------

def monthly_sales_trends(df):

    df["month"] = pd.to_datetime(
        df["sales_date"]
    ).dt.strftime("%Y-%m")

    monthly_sales = (

        df.groupby("month")[
            "sales_amount"
        ]

        .sum()

        .reset_index()

    )

    trends = []

    for _, row in monthly_sales.iterrows():

        trends.append({

            "month": row["month"],

            "total_sales": round(
                float(row["sales_amount"]),
                2
            )

        })

    return trends


# -----------------------------------
# Top Products
# -----------------------------------

def top_products(df):

    product_sales = (

        df.groupby("product_name")[
            "sales_amount"
        ]

        .sum()

        .sort_values(
            ascending=False
        )

        .head(5)

    )

    result = []

    for product, sales in (
        product_sales.items()
    ):

        result.append({

            "product": product,

            "total_sales": round(
                float(sales),
                2
            )

        })

    return result


# -----------------------------------
# Category Analytics
# -----------------------------------

def category_sales(df):

    if "category" not in df.columns:

        return []

    category_data = (

        df.groupby("category")[
            "sales_amount"
        ]

        .sum()

    )

    result = []

    for category, sales in (
        category_data.items()
    ):

        result.append({

            "category": category,

            "total_sales": round(
                float(sales),
                2
            )

        })

    return result


# -----------------------------------
# Region Analytics
# -----------------------------------

def region_sales(df):

    if "region" not in df.columns:

        return []

    region_data = (

        df.groupby("region")[
            "sales_amount"
        ]

        .sum()

    )

    result = []

    for region, sales in (
        region_data.items()
    ):

        result.append({

            "region": region,

            "total_sales": round(
                float(sales),
                2
            )

        })

    return result