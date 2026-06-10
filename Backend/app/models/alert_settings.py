from sqlalchemy import (
    Column,
    Integer,
    Boolean,
    Float
)

from app.config.database import Base


class AlertSettings(Base):

    __tablename__ = "alert_settings"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    email_enabled = Column(
        Boolean,
        default=True
    )

    inventory_alert_enabled = Column(
        Boolean,
        default=True
    )

    forecast_alert_enabled = Column(
        Boolean,
        default=True
    )

    threshold_value = Column(
        Float,
        default=50000
    )