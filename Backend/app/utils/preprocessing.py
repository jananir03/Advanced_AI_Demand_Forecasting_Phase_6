import pandas as pd


REQUIRED_COLUMNS = [
    "date",
    "product",
    "sales",
    "quantity"
]


def validate_dataset(df):

    missing_columns = []

    for column in REQUIRED_COLUMNS:

        if column not in df.columns:
            missing_columns.append(column)

    return missing_columns



def clean_dataset(df):

    missing_values = df.isnull().sum().sum()

    df = df.dropna()

    before_duplicates = len(df)

    df = df.drop_duplicates()

    duplicates_removed = (
        before_duplicates - len(df)
    )

    return df, missing_values, duplicates_removed