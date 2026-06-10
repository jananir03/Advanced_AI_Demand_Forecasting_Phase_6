import pandas as pd


def analyze_buying_behavior(df):

    if df.empty:

        return {

            "top_products": [],

            "high_revenue_products": [],

            "buying_insights": []
        }

    product_sales = (

        df.groupby("product_name")[
            "sales_amount"
        ]

        .sum()

        .reset_index()
    )

    product_sales = (

        product_sales

        .sort_values(

            by="sales_amount",

            ascending=False
        )
    )

    top_products = []

    for _, row in (

        product_sales.head(5)

        .iterrows()
    ):

        top_products.append({

            "product":
                row["product_name"],

            "sales":
                round(

                    float(
                        row["sales_amount"]
                    ),

                    2
                )
        })

    insights = [

        f"{top_products[0]['product']} is the most preferred product by customers"

        if top_products else

        "No buying trend available",

        f"{len(product_sales)} products contributed to overall sales"
    ]

    return {

        "top_products":
            top_products,

        "high_revenue_products":
            top_products,

        "buying_insights":
            insights
    }