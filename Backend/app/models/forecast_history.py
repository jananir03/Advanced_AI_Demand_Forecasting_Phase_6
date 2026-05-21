from sqlalchemy import (
    Column,
    Integer,
    String,
    Float,
    DateTime,
    ForeignKey,
    Text
)

from sqlalchemy.orm import relationship
from datetime import datetime

from app.config.database import Base


class ForecastHistory(Base):
    __tablename__ = "forecast_history"

    id = Column(Integer, primary_key=True, index=True)

    model_used = Column(String(100))

    accuracy_score = Column(Float)

    forecast_result = Column(Text)

    created_at = Column(
        DateTime,
        default=datetime.utcnow
    )

    user_id = Column(
        Integer,
        ForeignKey("users.id")
    )

    dataset_id = Column(
        Integer,
        ForeignKey("datasets.id")
    )

    user = relationship(
        "User",
        back_populates="forecasts"
    )