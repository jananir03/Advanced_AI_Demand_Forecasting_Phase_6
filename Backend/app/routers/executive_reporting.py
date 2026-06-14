from fastapi import (
    APIRouter,
    Depends
)

from sqlalchemy.orm import Session

from app.config.database import get_db

from app.models.executive_report import (
    ExecutiveReport
)

router = APIRouter(
    prefix="/executive-reporting",
    tags=["Executive Reporting"]
)


@router.post("/create")
def create_report(
    payload: dict,
    db: Session = Depends(get_db)
):

    report = ExecutiveReport(

        report_name=payload.get(
            "report_name"
        ),

        report_type=payload.get(
            "report_type"
        ),

        summary=payload.get(
            "summary"
        ),

        schedule_type=payload.get(
            "schedule_type"
        )
    )

    db.add(report)

    db.commit()

    db.refresh(report)

    return {

        "message":
        "Executive report created",

        "report_id":
        report.id
    }


@router.get("/")
def get_reports(
    db: Session = Depends(get_db)
):

    return db.query(
        ExecutiveReport
    ).all()


@router.get("/executive-summary")
def executive_summary():

    return {

        "report_type":
        "Executive Summary",

        "summary":
        "Business performance remains strong with positive demand growth and stable revenue outlook."

    }


@router.get("/monthly-forecast-report")
def monthly_forecast_report():

    return {

        "report_type":
        "Monthly Forecast",

        "forecast_growth":
        "15%",

        "business_outlook":
        "Positive"

    }


@router.get("/revenue-outlook")
def revenue_outlook():

    return {

        "report_type":
        "Revenue Outlook",

        "expected_growth":
        "18%",

        "recommendation":
        "Increase inventory investment"

    }


@router.get("/demand-outlook")
def demand_outlook():

    return {

        "report_type":
        "Demand Outlook",

        "expected_demand":
        "High",

        "forecast_confidence":
        "92%"

    }


@router.get("/scheduled-reports")
def scheduled_reports(
    db: Session = Depends(get_db)
):

    return db.query(
        ExecutiveReport
    ).filter(
        ExecutiveReport.schedule_type != None
    ).all()