from sklearn.metrics import (

    mean_absolute_error,

    mean_squared_error,

    r2_score
)

import numpy as np


def calculate_metrics(
    actual,
    predicted
):

    mae = mean_absolute_error(
        actual,
        predicted
    )

    rmse = np.sqrt(
        mean_squared_error(
            actual,
            predicted
        )
    )

    r2 = r2_score(
        actual,
        predicted
    )

    return {

        "MAE":
            round(float(mae), 2),

        "RMSE":
            round(float(rmse), 2),

        "R2_SCORE":
            round(float(r2), 2)
    }