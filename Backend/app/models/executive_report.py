from sqlalchemy import (
    Column,
    Integer,
    String,
    Text,
    DateTime
)

from datetime import datetime

from app.config.database import Base


class ExecutiveReport(Base):

    __tablename__ = "executive_reports"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    report_name = Column(
        String(255)
    )

    report_type = Column(
        String(100)
    )

    summary = Column(
        Text
    )

    schedule_type = Column(
        String(100),
        default="Manual"
    )

    created_at = Column(
        DateTime,
        default=datetime.utcnow
    )