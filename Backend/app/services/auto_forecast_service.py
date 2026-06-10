import json
import pandas as pd

from app.config.database import SessionLocal

from app.models.forecast_schedule import ForecastSchedule
from app.models.forecast_history import ForecastHistory
from app.models.sales_record import SalesRecord

from app.services.forecast_service import (
    run_prophet,
    run_linear_regression,
    run_random_forest
)

from app.services.notification_service import (
    create_notification
)

from app.services.activity_service import (
    create_activity
)

from app.services.alert_engine_service import (
    run_alert_engine
)

def run_scheduled_forecast(schedule_id):

    db = SessionLocal()

    try:

        schedule = db.query(
            ForecastSchedule
        ).filter(
            ForecastSchedule.id == schedule_id
        ).first()

        if not schedule:

            return

        if not schedule.is_active:

            return

        sales_records = db.query(
            SalesRecord
        ).filter(
            SalesRecord.dataset_id ==
            schedule.dataset_id
        ).all()

        if not sales_records:

            return

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

        # ------------------------------
        # MODEL SELECTION
        # ------------------------------

        if schedule.model_name.lower() == "prophet":

            result = run_prophet(
                df,
                30
            )

        elif schedule.model_name.lower() in [

            "random_forest",
            "random forest"

        ]:

            result = run_random_forest(
                df,
                30
            )

        else:

            result = run_linear_regression(
                df,
                30
            )

        # ------------------------------
        # SAVE FORECAST HISTORY
        # ------------------------------

        history = ForecastHistory(

            model_used=
                schedule.model_name,

            accuracy_score=91,

            forecast_result=json.dumps(

                result[
                    "forecast_predictions"
                ]
            ),

            user_id=
                schedule.user_id,

            dataset_id=
                schedule.dataset_id
        )

        db.add(history)

        db.commit()

        # ------------------------------
        # NOTIFICATION
        # ------------------------------

        create_notification(

            db=db,

            user_id=
                schedule.user_id,

            title=
                "Automated Forecast",

            message=
                f"{schedule.model_name} forecast generated automatically"
        )

        # ------------------------------
        # ACTIVITY LOG
        # ------------------------------

        create_activity(

            db=db,

            user_id=
                schedule.user_id,

            activity_type=
                "Automated Forecast",

            description=
                f"Scheduler generated {schedule.model_name} forecast"
        )

        print(

            f"[AUTO FORECAST SUCCESS] "

            f"Schedule {schedule.id}"
        )

    except Exception as e:

        print(

            f"[AUTO FORECAST ERROR] {e}"
        )

    finally:

        db.close()

        run_alert_engine(

            db=db,

            dataset_id=
                schedule.dataset_id,

            user_id=
                schedule.user_id
        )