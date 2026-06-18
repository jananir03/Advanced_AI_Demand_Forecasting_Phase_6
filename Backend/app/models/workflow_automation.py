from sqlalchemy import (
    Column,
    Integer,
    String,
    DateTime
)

from datetime import datetime

from app.config.database import Base


class WorkflowAutomation(Base):

    __tablename__ = "workflow_automation"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    workflow_name = Column(
        String(255),
        nullable=False
    )

    workflow_type = Column(
        String(100),
        nullable=False
    )

    trigger_event = Column(
        String(255),
        nullable=False
    )

    execution_status = Column(
        String(100),
        default="active"
    )

    last_execution = Column(
        DateTime,
        nullable=True
    )

    next_execution = Column(
        DateTime,
        nullable=True
    )

    created_by = Column(
        Integer,
        nullable=False
    )

    created_at = Column(
        DateTime,
        default=datetime.utcnow
    )