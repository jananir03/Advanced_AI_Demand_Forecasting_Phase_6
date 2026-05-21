from pydantic import BaseModel
from datetime import datetime

class DatasetResponse(BaseModel):

    id: int
    filename: str
    upload_time: datetime
    total_records: int
    missing_values: int
    duplicates_removed: int
    upload_date: datetime

    class Config:
        from_attributes = True