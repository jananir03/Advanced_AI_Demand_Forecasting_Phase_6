import pandas as pd

from prophet import Prophet

from sklearn.linear_model import LinearRegression

from sklearn.ensemble import RandomForestRegressor

from xgboost import XGBRegressor

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

    forecast_predictions = []

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
                round(predicted_value * 1.5, 2)
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
                round(value * 1.35, 2)
        })

    return {

        "forecast_predictions":
            forecast_predictions,

        "revenue_predictions":
            revenue_predictions
    }


# -----------------------------------
# Random Forest Forecast
# -----------------------------------

def run_random_forest(

    df,

    forecast_days=7
):

    df = df.copy()

    df.columns = [

        col.lower().strip()

        for col in df.columns
    ]

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

    model = RandomForestRegressor(

        n_estimators=100,

        random_state=42
    )

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

        fluctuation = np.random.uniform(
            0.9,
            1.2
        )

        value = round(
            float(pred * fluctuation),
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
                round(value * 1.65, 2)
        })

    return {

        "forecast_predictions":
            forecast_predictions,

        "revenue_predictions":
            revenue_predictions
    }


# -----------------------------------
# XGBoost Forecast
# -----------------------------------

def run_xgboost(

    df,

    forecast_days=7
):

    df = df.copy()

    df.columns = [

        col.lower().strip()

        for col in df.columns
    ]

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

    model = XGBRegressor(

        n_estimators=100,

        learning_rate=0.1,

        max_depth=5,

        random_state=42
    )

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
                round(value * 1.75, 2)
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

    product_col = None

    if "product line" in df.columns:

        product_col = "product line"

    elif "product" in df.columns:

        product_col = "product"

    elif "product_name" in df.columns:

        product_col = "product_name"

    sales_col = None

    if "total" in df.columns:

        sales_col = "total"

    elif "sales" in df.columns:

        sales_col = "sales"

    elif "sales_amount" in df.columns:

        sales_col = "sales_amount"

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

    # -----------------------------------
    # MODEL SELECTION
    # -----------------------------------

    if model_name.lower() == "prophet":

        forecast_result = run_prophet(

            df,

            forecast_days
        )

    elif model_name.lower() in [

        "random forest",

        "random_forest"

    ]:

        forecast_result = run_random_forest(

            df,

            forecast_days
        )

    elif model_name.lower() == "xgboost":

        forecast_result = run_xgboost(

            df,

            forecast_days
        )

    else:

        forecast_result = run_linear_regression(

            df,

            forecast_days
        )

    top_products = top_products_analytics(df)
    
    # -----------------------------------
    # Dynamic Product Categories
    # -----------------------------------

    product_categories = []

    possible_columns = [

        "product",

        "product_name",

        "product line",

        "category",

        "item",

        "product_category",

        "product category",

        "clothing category",

        "type",

        "subcategory"
    ]

    for col in df.columns:

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