from pydantic import BaseModel


class ForecastGovernanceCreate(
    BaseModel
):

    forecast_id: int

    version_number: int

    change_summary: str


class ForecastGovernanceUpdate(
    BaseModel
):

    lifecycle_status: str

    approval_status: str

    change_summary: str


class LifecycleUpdate(
    BaseModel
):

    lifecycle_status: str


class ApprovalStatusUpdate(
    BaseModel
):

    approval_status: str