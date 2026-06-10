import pandas as pd


def generate_inventory_suggestions(df):

    suggestions = []

    if df.empty:

        return suggestions

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

        if sales > average_sales * 1.2:

            action = (
                "Increase Inventory by 20%"
            )

        elif sales < average_sales * 0.8:

            action = (
                "Reduce Inventory by 10%"
            )

        else:

            action = (
                "Maintain Current Inventory"
            )

        suggestions.append({

            "product":
                product,

            "total_sales":
                round(sales, 2),

            "suggestion":
                action
        })

    return suggestions