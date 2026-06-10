from sqlalchemy import (
    Column,
    Integer,
    String,
    Boolean,
    DateTime
)

from datetime import datetime

from app.config.database import Base


class Integration(Base):

    __tablename__ = "integrations"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    name = Column(
        String(255)
    )

    integration_type = Column(
        String(100)
    )

    api_url = Column(
        String(500)
    )

    api_key = Column(
        String(255)
    )

    is_active = Column(
        Boolean,
        default=True
    )

    created_at = Column(
        DateTime,
        default=datetime.utcnow
    )