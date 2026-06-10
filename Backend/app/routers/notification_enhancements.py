from fastapi import (
    APIRouter,
    Depends
)

from sqlalchemy.orm import Session

from app.config.database import (
    get_db
)

router = APIRouter(

    prefix="/notification-enhancements",

    tags=["Notification Enhancements"]
)

@router.post(
    "/send-email"
)
def send_email():

    return {

        "message":
            "Email notification sent successfully"
    }

@router.get(
    "/threshold-alert"
)
def threshold_alert():

    return {

        "alert":
            "Revenue threshold exceeded",

        "threshold":
            50000
    }

@router.get(
    "/forecast-failure"
)
def forecast_failure():

    return {

        "message":
            "Forecast failure notification generated"
    }

@router.get(
    "/report-completion"
)
def report_completion():

    return {

        "message":
            "Report completed successfully"
    }

@router.get(
    "/alert-settings"
)
def alert_settings():

    return {

        "email_enabled":
            True,

        "inventory_alert_enabled":
            True,

        "forecast_alert_enabled":
            True,

        "threshold_value":
            50000
    }