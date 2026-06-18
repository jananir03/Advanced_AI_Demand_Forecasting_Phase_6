from sqlalchemy import (
    Column,
    Integer,
    String,
    DateTime
)

from datetime import datetime

from app.config.database import Base


class ForecastGovernance(Base):

    __tablename__ = "forecast_governance"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    forecast_id = Column(
        Integer,
        nullable=False
    )

    version_number = Column(
        Integer,
        default=1
    )

    lifecycle_status = Column(
        String(100),
        default="draft"
    )

    approval_status = Column(
        String(100),
        default="pending"
    )

    modified_by = Column(
        Integer,
        nullable=False
    )

    change_summary = Column(
        String(1000)
    )

    created_at = Column(
        DateTime,
        default=datetime.utcnow
    )