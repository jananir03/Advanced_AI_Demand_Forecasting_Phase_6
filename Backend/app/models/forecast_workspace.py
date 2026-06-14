from sqlalchemy import (
    Column,
    Integer,
    String,
    DateTime,
    ForeignKey
)

from sqlalchemy.orm import relationship

from datetime import datetime

from app.config.database import Base


class ForecastWorkspace(Base):

    __tablename__ = "forecast_workspaces"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    workspace_name = Column(
        String(255),
        nullable=False
    )

    description = Column(
        String(500)
    )

    owner_id = Column(
        Integer,
        ForeignKey("users.id")
    )

    created_at = Column(
        DateTime,
        default=datetime.utcnow
    )

    status = Column(
        String(50),
        default="active"
    )

    owner = relationship(
        "User"
    )