import pandas as pd


def detect_demand_spikes(df):

    spikes = []

    if df.empty:

        return spikes

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

        sales = float(
            row["sales_amount"]
        )

        if sales > average_sales * 1.2:

            spikes.append({

                "product":
                    row["product_name"],

                "total_sales":
                    round(sales, 2),

                "status":
                    "Demand Spike Predicted"
            })

    return spikes