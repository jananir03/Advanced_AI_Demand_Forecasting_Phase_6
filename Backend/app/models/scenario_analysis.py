from sqlalchemy import (
    Column,
    Integer,
    Float,
    DateTime,
    String,
    ForeignKey
)

from datetime import datetime

from app.config.database import Base


class ScenarioAnalysis(Base):

    __tablename__ = "scenario_analysis"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    dataset_id = Column(
        Integer,
        ForeignKey("datasets.id")
    )

    scenario_name = Column(
    String(255),
    default="Custom Scenario"
    )

    user_id = Column(
        Integer,
        ForeignKey("users.id")
    )

    sales_growth = Column(
        Float,
        default=0
    )

    seasonality_factor = Column(
        Float,
        default=0
    )

    demand_factor = Column(
        Float,
        default=0
    )

    best_case = Column(
        Float,
        default=0
    )

    normal_case = Column(
        Float,
        default=0
    )

    worst_case = Column(
        Float,
        default=0
    )

    created_at = Column(
        DateTime,
        default=datetime.utcnow
    )