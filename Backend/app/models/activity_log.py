from sqlalchemy import (
    Column,
    Integer,
    String,
    DateTime,
    ForeignKey
)

from sqlalchemy.orm import relationship

from datetime import datetime

import pytz

from app.config.database import Base


class ActivityLog(Base):

    __tablename__ = "activity_logs"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    activity_type = Column(
        String(100),
        nullable=False
    )

    description = Column(
        String(255),
        nullable=False
    )

    created_at = Column(
        DateTime,
        default=lambda:
        datetime.now(

            pytz.timezone(
                "Asia/Kolkata"
            )
)       
    )

    user_id = Column(
        Integer,
        ForeignKey("users.id")
    )

    user = relationship(
        "User",
        back_populates="activities"
    )