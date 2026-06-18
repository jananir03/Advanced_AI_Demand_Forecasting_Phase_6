from sqlalchemy import (
    Column,
    Integer,
    String,
    Float,
    DateTime
)

from datetime import datetime

from app.config.database import Base


class ExecutiveCommandCenter(Base):

    __tablename__ = "executive_command_center"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    organization_name = Column(
        String(255),
        nullable=False
    )

    total_revenue = Column(
        Float,
        default=0
    )

    total_forecasts = Column(
        Integer,
        default=0
    )

    approved_forecasts = Column(
        Integer,
        default=0
    )

    active_projects = Column(
        Integer,
        default=0
    )

    active_workflows = Column(
        Integer,
        default=0
    )

    average_kpi_score = Column(
        Float,
        default=0
    )

    average_data_quality = Column(
        Float,
        default=0
    )

    executive_alerts = Column(
        Integer,
        default=0
    )

    business_health = Column(
        String(100),
        default="Good"
    )

    created_by = Column(
        Integer,
        nullable=False
    )

    created_at = Column(
        DateTime,
        default=datetime.utcnow
    )