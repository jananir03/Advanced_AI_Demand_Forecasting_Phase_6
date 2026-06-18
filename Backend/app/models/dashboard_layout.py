from sqlalchemy import (
    Column,
    Integer,
    Text,
    ForeignKey,
    DateTime
)

from sqlalchemy.orm import relationship

from datetime import datetime

from app.config.database import Base


class DashboardLayout(Base):

    __tablename__ = "dashboard_layouts"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    user_id = Column(
        Integer,
        ForeignKey("users.id")
    )

    layout_json = Column(
        Text,
        nullable=False
    )

    created_at = Column(
        DateTime,
        default=datetime.utcnow
    )

    updated_at = Column(
        DateTime,
        default=datetime.utcnow
    )

    user = relationship(
        "User"
    )