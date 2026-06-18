from pydantic import BaseModel


class ForecastApprovalCreate(
    BaseModel
):

    forecast_id: int

    comments: str


class ForecastApprovalAction(
    BaseModel
):

    comments: str


class ForecastApprovalUpdate(
    BaseModel
):

    status: str

    comments: str