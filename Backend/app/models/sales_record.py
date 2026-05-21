from sqlalchemy import (
    Column,
    Integer,
    String,
    Float,
    Date,
    ForeignKey
)

from sqlalchemy.orm import relationship

from app.config.database import Base


class SalesRecord(Base):
    __tablename__ = "sales_records"

    id = Column(Integer, primary_key=True, index=True)

    product_name = Column(String(255))

    category = Column(String(255))

    region = Column(String(255))

    sales_date = Column(Date)

    sales_amount = Column(Float)

    quantity = Column(Integer)

    dataset_id = Column(
        Integer,
        ForeignKey("datasets.id")
    )

    dataset = relationship(
        "Dataset",
        back_populates="sales_records"
    )