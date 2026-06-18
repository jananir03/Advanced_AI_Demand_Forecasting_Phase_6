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

from app.models.forecast_workspace import (
    ForecastWorkspace
)

from app.routers.forecast_workspace import (
    router as forecast_workspace_router
)

from app.models.scenario_analysis import (
    ScenarioAnalysis
)

from app.routers.scenario_analysis import (
    router as scenario_analysis_router
)

from app.routers.executive_dashboard import (
    router as executive_dashboard_router
)

from app.routers.ai_insights import (
    router as ai_insights_router
)

from app.models.forecast_comment import (
    ForecastComment
)

from app.models.dataset_version import (
    DatasetVersion
)

from app.routers.forecast_collaboration import (
    router as forecast_collaboration_router
)

from app.routers.dataset_versioning import (
    router as dataset_versioning_router
)

from app.models.executive_report import (
    ExecutiveReport
)

from app.routers.executive_reporting import (
    router as executive_reporting_router
)

from app.routers.activity_logs import (
    router as activity_log_router
)

from app.routers.scenario_routes import (
     router as scenario_router
)

from app.routers.organization import (
    router as organization_router
)

from app.routers.project import (
    router as project_router
)

from app.routers.forecast_approval import (
    router as forecast_approval_router
)

from app.routers.forecast_governance import (
    router as forecast_governance_router
)

from app.routers.workflow_automation import (
    router as workflow_automation_router
)

from app.routers.strategic_planning import (
    router as strategic_planning_router
)

from app.routers.advanced_kpi import (
    router as advanced_kpi_router
)

from app.routers.data_quality import (
    router as data_quality_router
)

from app.routers.executive_command_center import (
    router as executive_command_center_router
)

from app.models.dashboard_widget import (
    DashboardWidget
)

from app.models.dashboard_layout import (
    DashboardLayout
)

from app.routers.dashboard_widgets import (
    router as dashboard_widgets_router
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

app.include_router(forecast_workspace_router)

app.include_router(scenario_analysis_router)

app.include_router(executive_dashboard_router)

app.include_router(ai_insights_router)

app.include_router(forecast_collaboration_router)

app.include_router(dataset_versioning_router)

app.include_router(executive_reporting_router)

app.include_router(activity_log_router)

app.include_router(scenario_router)

app.include_router(organization_router)

app.include_router(project_router)

app.include_router(forecast_approval_router)

app.include_router(forecast_governance_router)

app.include_router(workflow_automation_router)

app.include_router(strategic_planning_router)

app.include_router(advanced_kpi_router)  

app.include_router(data_quality_router)  

app.include_router(executive_command_center_router) 

app.include_router(
    dashboard_widgets_router
)


@app.get("/")
def root():
    return {
        "message": "Advanced AI Demand Forecasting API Running"
    }