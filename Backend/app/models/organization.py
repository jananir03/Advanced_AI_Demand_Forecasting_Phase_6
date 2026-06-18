from sqlalchemy import (
    Column,
    Integer,
    String,
    DateTime
)

from datetime import datetime

from app.config.database import Base


class Organization(Base):

    __tablename__ = "organizations"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    name = Column(
        String(255),
        nullable=False
    )

    industry = Column(
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

    created_at = Column(
        DateTime,
        default=datetime.utcnow
    )