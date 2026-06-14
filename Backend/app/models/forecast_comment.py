from sqlalchemy import (
    Column,
    Integer,
    String,
    DateTime,
    ForeignKey
)

from datetime import datetime

from app.config.database import Base


class ForecastComment(Base):

    __tablename__ = "forecast_comments"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    forecast_id = Column(
        Integer,
        nullable=False
    )

    user_id = Column(
        Integer,
        ForeignKey("users.id")
    )

    comment = Column(
        String(1000)
    )

    created_at = Column(
        DateTime,
        default=datetime.utcnow
    )