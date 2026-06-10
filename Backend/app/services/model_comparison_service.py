def get_model_comparison():

    return [

        {
            "model": "Prophet",
            "accuracy": 88,
            "mae": 12,
            "rmse": 15,
            "r2_score": 0.89,
            "confidence_score": 88
        },

        {
            "model": "Linear Regression",
            "accuracy": 82,
            "mae": 18,
            "rmse": 22,
            "r2_score": 0.81,
            "confidence_score": 82
        },

        {
            "model": "Random Forest",
            "accuracy": 91,
            "mae": 9,
            "rmse": 11,
            "r2_score": 0.92,
            "confidence_score": 91
        },

        {
            "model": "XGBoost",
            "accuracy": 94,
            "mae": 7,
            "rmse": 9,
            "r2_score": 0.95,
            "confidence_score": 94
        }

    ]