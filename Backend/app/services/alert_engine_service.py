from app.models.sales_record import SalesRecord

from app.services.notification_service import (
    create_notification
)

from app.services.activity_service import (
    create_activity
)


def run_alert_engine(

    db,

    dataset_id,

    user_id
):

    alerts = []

    sales_records = db.query(
        SalesRecord
    ).filter(

        SalesRecord.dataset_id ==
        dataset_id

    ).all()

    if not sales_records:

        return []

    # -----------------------------------
    # REVENUE ALERT
    # -----------------------------------

    total_revenue = sum(

        float(record.sales_amount)

        for record in sales_records
    )

    if total_revenue < 100000:

        alerts.append(

            f"Revenue Alert: Total revenue dropped below ₹100000"
        )

    # -----------------------------------
    # INVENTORY RISK ALERT
    # -----------------------------------

    for record in sales_records:

        if float(record.sales_amount) < 1000:

            alerts.append(

                f"Inventory Risk: {record.product_name} has low sales"
            )

    # -----------------------------------
    # DEMAND SPIKE ALERT
    # -----------------------------------

    avg_sales = (

        total_revenue /

        len(sales_records)
    )

    for record in sales_records:

        if (

            float(record.sales_amount)

            > avg_sales * 1.5

        ):

            alerts.append(

                f"Demand Spike: {record.product_name} demand is increasing"
            )

    # -----------------------------------
    # SAVE NOTIFICATIONS
    # -----------------------------------

    for alert in alerts:

        create_notification(

            db=db,

            user_id=user_id,

            title="Alert Engine",

            message=alert
        )

        create_activity(

            db=db,

            user_id=user_id,

            activity_type="Alert Generated",

            description=alert
        )

    return alerts