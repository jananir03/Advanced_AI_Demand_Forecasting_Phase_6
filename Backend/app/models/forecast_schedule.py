from sqlalchemy import (
    Column,
    Integer,
    String,
    Boolean,
    DateTime,
    ForeignKey
)

from sqlalchemy.orm import relationship

from datetime import datetime

from app.config.database import Base


class ForecastSchedule(Base):

    __tablename__ = "forecast_schedules"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    dataset_id = Column(
        Integer,
        ForeignKey("datasets.id")
    )

    user_id = Column(
        Integer,
        ForeignKey("users.id")
    )

    model_name = Column(
        String(100)
    )

    interval_type = Column(
        String(50)
    )

    is_active = Column(
        Boolean,
        default=True
    )

    created_at = Column(
        DateTime,
        default=datetime.utcnow
    )

    user = relationship(
        "User"
    )