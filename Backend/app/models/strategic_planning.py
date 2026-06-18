from sqlalchemy import (
    Column,
    Integer,
    String,
    Float,
    DateTime
)

from datetime import datetime

from app.config.database import Base


class StrategicPlanning(Base):

    __tablename__ = "strategic_planning"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    plan_name = Column(
        String(255),
        nullable=False
    )

    planning_period = Column(
        String(100),
        nullable=False
    )

    target_value = Column(
        Float,
        default=0
    )

    forecast_value = Column(
        Float,
        default=0
    )

    variance = Column(
        Float,
        default=0
    )

    recommendation = Column(
        String(1000)
    )

    status = Column(
        String(100),
        default="active"
    )

    created_by = Column(
        Integer,
        nullable=False
    )

    created_at = Column(
        DateTime,
        default=datetime.utcnow
    )