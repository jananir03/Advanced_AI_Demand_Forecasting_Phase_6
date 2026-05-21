from pydantic import BaseModel


class ForecastRequest(BaseModel):

    dataset_id: int

    model: str

    duration: str | None = None