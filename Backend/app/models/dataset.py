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


class Dataset(Base):
    __tablename__ = "datasets"

    id = Column(Integer, primary_key=True, index=True)

    dataset_name = Column(String(255), nullable=False)

    original_filename = Column(String(255))

    upload_date = Column(
        DateTime,
        default=datetime.utcnow
    )

    total_records = Column(Integer)

    missing_values = Column(Integer)

    duplicates_removed = Column(Integer)

    user_id = Column(
        Integer,
        ForeignKey("users.id")
    )

    user = relationship(
        "User",
        back_populates="datasets"
    )

    sales_records = relationship(
        "SalesRecord",
        back_populates="dataset"
    )