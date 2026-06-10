import json
import pandas as pd

from fastapi import (
    APIRouter,
    Depends,
    HTTPException
)

from sqlalchemy.orm import Session

from app.schemas.forecast_schema import (
    ForecastRequest
)

from app.config.database import (
    get_db
)

from app.models.sales_record import (
    SalesRecord
)

from app.models.forecast_history import (
    ForecastHistory
)

from app.models.user import User

from app.core.auth import (
    get_current_user
)

from app.core.permissions import (
    require_roles
)

from app.services.forecast_service import (

    run_linear_regression,

    run_prophet,

    run_random_forest,

    run_xgboost,

    top_products_analytics
)

from app.services.notification_service import (
    create_notification
)

from app.services.activity_service import (
    create_activity
)


router = APIRouter(

    prefix="/forecast",

    tags=["Forecast"]
)


@router.post("/generate")

def generate_forecast(

    request: ForecastRequest,

    db: Session = Depends(get_db),

    current_user: User = Depends(

        require_roles([

            "super_admin",

            "analyst"
        ])
    )
):

    sales_records = db.query(
        SalesRecord
    ).filter(

        SalesRecord.dataset_id ==
        request.dataset_id

    ).all()

    if not sales_records:

        raise HTTPException(

            status_code=404,

            detail="Dataset not found"
        )

    data = []

    for record in sales_records:

        data.append({

            "sales_date":
                record.sales_date,

            "sales_amount":
                record.sales_amount,

            "product_name":
                record.product_name
        })

    df = pd.DataFrame(data)

    # -----------------------------------
    # FORECAST DURATION
    # -----------------------------------

    forecast_days = 30

    if request.duration == "7 Days":

        forecast_days = 7

    elif request.duration == "90 Days":

        forecast_days = 90

    # -----------------------------------
    # MODEL SELECTION
    # -----------------------------------
    if request.model.lower() == "prophet":

        result = run_prophet(
            df,
            forecast_days
        )

    elif request.model.lower() in [

        "random forest",

        "random_forest"

    ]:

        result = run_random_forest(
            df,
            forecast_days
        )

    elif request.model.lower() == "xgboost":

        result = run_xgboost(
            df,
            forecast_days
        )

    else:

        result = run_linear_regression(
            df,
            forecast_days
        )
  
    # -----------------------------------
    # TOP PRODUCTS
    # -----------------------------------

    top_products = top_products_analytics(
        df
    )

    # -----------------------------------
    # SAVE FORECAST HISTORY
    # -----------------------------------

    history = ForecastHistory(

        model_used=request.model,

        accuracy_score=91,

        forecast_result=json.dumps(

            result[
                "forecast_predictions"
            ]
        ),

        user_id=current_user.id,

        dataset_id=request.dataset_id
    )

    db.add(history)

    db.commit()

    create_activity(

        db=db,

        user_id=current_user.id,

        activity_type="Forecast Generated",

        description=f"{current_user.username} generated {request.model} forecast"
    )

    # -----------------------------------
    # NOTIFICATION
    # -----------------------------------

    create_notification(

        db=db,

        user_id=current_user.id,

        title="Forecast Completed",

        message=f"{request.model} forecast generated successfully"
    )

    return {

        "model":
            request.model,

        "forecast":
            result[
                "forecast_predictions"
            ],

        "revenue_forecast":
            result.get(
                "revenue_predictions",
                []
            ),

        "top_products":
            top_products,

        "product_categories":
            result.get(
                "product_categories",
                []
            )
    }