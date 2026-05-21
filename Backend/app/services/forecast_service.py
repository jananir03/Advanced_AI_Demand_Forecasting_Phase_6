import pandas as pd

from prophet import Prophet

from sklearn.linear_model import LinearRegression

import numpy as np


# -----------------------------------
# Prophet Forecast
# -----------------------------------

def run_prophet(

    df,

    forecast_days=7
):

    df = df.copy()

    df.columns = [

        col.lower().strip()

        for col in df.columns
    ]

    # Detect date column
    if "date" in df.columns:

        date_col = "date"

    elif "sales_date" in df.columns:

        date_col = "sales_date"

    else:

        raise Exception(
            "Date column not found"
        )

    # Detect sales column
    if "sales" in df.columns:

        sales_col = "sales"

    elif "sales_amount" in df.columns:

        sales_col = "sales_amount"

    elif "total" in df.columns:

        sales_col = "total"

    else:

        raise Exception(
            "Sales column not found"
        )

    prophet_df = pd.DataFrame({

        "ds": pd.to_datetime(
            df[date_col]
        ),

        "y": df[sales_col]
    })

    model = Prophet()

    model.fit(prophet_df)

    future = model.make_future_dataframe(

        periods=forecast_days
    )

    forecast = model.predict(future)

    forecast = forecast.tail(
        forecast_days
    )

    # Sales Forecast
    forecast_predictions = []

    # Revenue Forecast
    revenue_predictions = []

    for _, row in forecast.iterrows():

        predicted_value = round(
            float(row["yhat"]),
            2
        )

        forecast_predictions.append({

            "date": str(
                row["ds"].date()
            ),

            "predicted_sales":
                predicted_value
        })

        revenue_predictions.append({

            "date": str(
                row["ds"].date()
            ),

            "predicted_revenue":
                predicted_value
        })

    return {

        "forecast_predictions":
            forecast_predictions,

        "revenue_predictions":
            revenue_predictions
    }


# -----------------------------------
# Linear Regression Forecast
# -----------------------------------

def run_linear_regression(

    df,

    forecast_days=7
):

    df = df.copy()

    df.columns = [

        col.lower().strip()

        for col in df.columns
    ]

    # Detect sales column
    if "sales" in df.columns:

        sales_col = "sales"

    elif "sales_amount" in df.columns:

        sales_col = "sales_amount"

    elif "total" in df.columns:

        sales_col = "total"

    else:

        raise Exception(
            "Sales column not found"
        )

    df = df.reset_index()

    X = np.array(
        df.index
    ).reshape(-1, 1)

    y = df[sales_col].values

    model = LinearRegression()

    model.fit(X, y)

    future_X = np.array(

        range(
            len(df),
            len(df) + forecast_days
        )

    ).reshape(-1, 1)

    predictions = model.predict(
        future_X
    )

    forecast_predictions = []

    revenue_predictions = []

    for i, pred in enumerate(predictions):

        value = round(
            float(pred),
            2
        )

        forecast_predictions.append({

            "date": f"Day {i+1}",

            "predicted_sales":
                value
        })

        revenue_predictions.append({

            "date": f"Day {i+1}",

            "predicted_revenue":
                value
        })

    return {

        "forecast_predictions":
            forecast_predictions,

        "revenue_predictions":
            revenue_predictions
    }


# -----------------------------------
# Top Products Analytics
# -----------------------------------

def top_products_analytics(df):

    df = df.copy()

    df.columns = [

        col.lower().strip()

        for col in df.columns
    ]

    # Product Column
    product_col = None

    if "product line" in df.columns:

        product_col = "product line"

    elif "product" in df.columns:

        product_col = "product"

    elif "product_name" in df.columns:

        product_col = "product_name"

    # Sales Column
    sales_col = None

    if "total" in df.columns:

        sales_col = "total"

    elif "sales" in df.columns:

        sales_col = "sales"

    elif "sales_amount" in df.columns:

        sales_col = "sales_amount"

    # Validation
    if not product_col or not sales_col:

        return []

    grouped = (

        df.groupby(product_col)[sales_col]

        .sum()

        .sort_values(
            ascending=False
        )

        .head(10)
    )

    result = []

    for product, sales in grouped.items():

        result.append({

            "product": str(product),

            "total_sales": round(
                float(sales),
                2
            )
        })

    return result


# -----------------------------------
# Main Forecast Generator
# -----------------------------------

def generate_forecast(

    dataset_path,

    model_name="prophet",

    forecast_days=7
):

    df = pd.read_csv(
        dataset_path
    )

    df.columns = [

        col.lower().strip()

        for col in df.columns
    ]

    # Run Forecast
    if model_name.lower() == "prophet":

        forecast_result = run_prophet(

            df,

            forecast_days
        )

    else:

        forecast_result = run_linear_regression(

            df,

            forecast_days
        )

    # Top Products
    top_products = top_products_analytics(
        df
    )

    # -----------------------------------
    # Dynamic Product Categories
    # -----------------------------------

    product_categories = []

    print(df.columns.tolist())
    
    possible_columns = [

        "product",

        "product_name",

        "product line",

        "category",

        "item",

        "product_category"

        "product category",

        "clothing category",

        "type",

        "subcategory"
    ]   

    for col in df.columns:

        print(df.columns)

        if col.lower() in possible_columns:

            product_categories = (

                df[col]

                .dropna()

                .astype(str)

                .unique()

                .tolist()
            )

        break

    return {

        "forecast_predictions":

            forecast_result[
                "forecast_predictions"
            ],

        "revenue_predictions":

            forecast_result[
                "revenue_predictions"
            ],

        "top_products":
            top_products,
        
        "product_categories":
            product_categories
    }