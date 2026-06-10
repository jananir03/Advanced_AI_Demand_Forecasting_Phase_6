import pandas as pd


def generate_demand_recommendations(df):

    recommendations = []

    if df.empty:

        return recommendations

    grouped = (

        df.groupby("product_name")[
            "sales_amount"
        ]

        .sum()

        .reset_index()
    )

    average_sales = grouped[
        "sales_amount"
    ].mean()

    for _, row in grouped.iterrows():

        product = row["product_name"]

        sales = float(
            row["sales_amount"]
        )

        if sales > average_sales * 1.3:

            action = "Increase Stock"

            reason = (
                "High demand detected"
            )

        elif sales < average_sales * 0.7:

            action = "Reduce Stock"

            reason = (
                "Low demand detected"
            )

        else:

            action = "Maintain Stock"

            reason = (
                "Stable demand"
            )

        recommendations.append({

            "product":
                product,

            "total_sales":
                round(sales, 2),

            "recommendation":
                action,

            "reason":
                reason
        })

    recommendations = sorted(

        recommendations,

        key=lambda x:
            x["total_sales"],

        reverse=True
    )

    return recommendations