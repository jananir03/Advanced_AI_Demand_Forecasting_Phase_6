import pandas as pd


def predict_low_stock(df):

    predictions = []

    if df.empty:

        return predictions

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

        if sales < average_sales * 0.6:

            predictions.append({

                "product":
                    product,

                "total_sales":
                    round(sales, 2),

                "status":
                    "Low Stock Risk Predicted",

                "recommendation":
                    "Restock Soon"
            })

    return predictions