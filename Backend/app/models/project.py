from sqlalchemy import (
    Column,
    Integer,
    String,
    DateTime
)

from datetime import datetime

from app.config.database import Base


class Project(Base):

    __tablename__ = "projects"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    project_name = Column(
        String(255),
        nullable=False
    )

    description = Column(
        String(500)
    )

    status = Column(
        String(50),
        default="active"
    )

    organization_name = Column(
        String(255)
    )

    owner_name = Column(
        String(255)
    )

    created_at = Column(
        DateTime,
        default=datetime.utcnow
    )