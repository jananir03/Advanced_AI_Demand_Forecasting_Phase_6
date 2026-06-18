from sqlalchemy import (
    Column,
    Integer,
    String,
    Boolean,
    ForeignKey,
    DateTime
)

from sqlalchemy.orm import relationship

from datetime import datetime

from app.config.database import Base


class DashboardWidget(Base):

    __tablename__ = "dashboard_widgets"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    user_id = Column(
        Integer,
        ForeignKey("users.id")
    )

    widget_name = Column(
        String(100),
        nullable=False
    )

    widget_type = Column(
        String(50),
        nullable=False
    )

    is_visible = Column(
        Boolean,
        default=True
    )

    position = Column(
        Integer,
        default=0
    )

    created_at = Column(
        DateTime,
        default=datetime.utcnow
    )

    user = relationship(
        "User"
    )