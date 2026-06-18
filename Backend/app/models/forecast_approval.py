from sqlalchemy import (
    Column,
    Integer,
    String,
    DateTime
)

from datetime import datetime

from app.config.database import Base


class ForecastApproval(Base):

    __tablename__ = "forecast_approvals"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    forecast_id = Column(
        Integer,
        nullable=False
    )

    submitted_by = Column(
        Integer,
        nullable=False
    )

    approved_by = Column(
        Integer,
        nullable=True
    )

    status = Column(
        String(50),
        default="pending"
    )

    comments = Column(
        String(1000)
    )

    created_at = Column(
        DateTime,
        default=datetime.utcnow
    )

    approved_at = Column(
        DateTime,
        nullable=True
    )