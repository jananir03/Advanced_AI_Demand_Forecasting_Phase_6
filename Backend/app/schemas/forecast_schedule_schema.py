from pydantic import BaseModel


class ForecastScheduleCreate(BaseModel):

    dataset_id: int

    model_name: str

    interval_type: str