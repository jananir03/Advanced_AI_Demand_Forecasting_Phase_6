
from sqlalchemy import (
    Column,
    Integer,
    String,
    Float,
    DateTime
)

from datetime import datetime

from app.config.database import Base


class DataQuality(Base):

    __tablename__ = "data_quality"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    dataset_name = Column(
        String(255),
        nullable=False
    )

    total_records = Column(
        Integer,
        default=0
    )

    valid_records = Column(
        Integer,
        default=0
    )

    missing_records = Column(
        Integer,
        default=0
    )

    duplicate_records = Column(
        Integer,
        default=0
    )

    quality_score = Column(
        Float,
        default=0
    )

    quality_status = Column(
        String(100),
        default="good"
    )

    validation_summary = Column(
        String(1000)
    )

    created_by = Column(
        Integer,
        nullable=False
    )

    created_at = Column(
        DateTime,
        default=datetime.utcnow
    )