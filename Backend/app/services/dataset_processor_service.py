import pandas as pd


def generate_dataset_summary(df):

    summary = {

        "total_records": 0,

        "unique_products": 0,

        "unique_regions": 0,

        "total_sales": 0,

        "date_range": "N/A"
    }

    try:

        summary["total_records"] = len(df)

        if "product" in df.columns:

            summary["unique_products"] = (

                df["product"]

                .nunique()
            )

        if "region" in df.columns:

            summary["unique_regions"] = (

                df["region"]

                .nunique()
            )

        if "sales" in df.columns:

            summary["total_sales"] = round(

                float(
                    df["sales"].sum()
                ),

                2
            )

        if "date" in df.columns:

            dates = pd.to_datetime(

                df["date"]
            )

            summary["date_range"] = (

                f"{dates.min().date()} "

                f"to "

                f"{dates.max().date()}"
            )

    except Exception:

        pass

    return summary