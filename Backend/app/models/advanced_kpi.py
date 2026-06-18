from sqlalchemy import (
    Column,
    Integer,
    String,
    Float,
    DateTime
)

from datetime import datetime

from app.config.database import Base


class AdvancedKPI(Base):

    __tablename__ = "advanced_kpi"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    kpi_name = Column(
        String(255),
        nullable=False
    )

    category = Column(
        String(100),
        nullable=False
    )

    target_value = Column(
        Float,
        default=0
    )

    actual_value = Column(
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

    alert_threshold = Column(
        Float,
        default=0
    )

    performance_status = Column(
        String(100),
        default="normal"
    )

    created_by = Column(
        Integer,
        nullable=False
    )

    created_at = Column(
        DateTime,
        default=datetime.utcnow
    )