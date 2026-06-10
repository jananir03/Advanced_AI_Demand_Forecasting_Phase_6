from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.config.database import engine, Base

from app.models.user import User
from app.models.dataset import Dataset
from app.models.sales_record import SalesRecord
from app.models.forecast_history import ForecastHistory
from app.models.notification import Notification

from app.routers.auth import router as auth_router

from app.routers.dataset import (
    router as dataset_router
)

from app.routers.forecast import (
    router as forecast_router
)

from app.routers.dashboard_routes import (
    router as dashboard_router
)

from app.routers.notification_routes import (
    router as notification_router
)

from app.routers.admin_routes import (
    router as admin_router
)

from app.routers.report import  (
    router as report_router
)

from app.routers.activity import router as activity_router

from app.routers.forecast_scheduler import router as scheduler_router

from app.routers.scheduler_control import router as scheduler_control_router

from app.routers.ai_features import (
    router as ai_features_router
)

from app.routers.integration import( 
    router as integration_router
)

from app.routers.user_management import (
    router as user_management_router
)

from app.routers.notification_enhancements import (
    router as notification_enhancements_router
)

Base.metadata.create_all(bind=engine)

app = FastAPI(title="Advanced AI Demand Forecasting")

app.add_middleware(

    CORSMiddleware,

    allow_origins=[
        "http://localhost:5173"
    ],

    allow_credentials=True,

    allow_methods=["*"],

    allow_headers=["*"],
)

app.include_router(auth_router)

app.include_router(dataset_router)

app.include_router(forecast_router)

app.include_router(dashboard_router)

app.include_router(ai_features_router)

app.include_router(notification_router)

app.include_router(admin_router)

app.include_router(report_router)

app.include_router(activity_router)

app.include_router(scheduler_router)

app.include_router(scheduler_control_router)

app.include_router(ai_features_router)

app.include_router(integration_router)

app.include_router(user_management_router)

app.include_router(notification_enhancements_router)

@app.get("/")
def root():
    return {
        "message": "Advanced AI Demand Forecasting API Running"
    }