from sqlalchemy import Column
from sqlalchemy import Integer
from sqlalchemy import String
from sqlalchemy import Numeric
from sqlalchemy import Boolean
from sqlalchemy import Text
from sqlalchemy import DateTime
from sqlalchemy import ForeignKey

from sqlalchemy.sql import func

from sqlalchemy.orm import relationship

from app.database.database import Base

class Product(Base):
    __tablename__ = "products"
    __table_args__ = {
        "schema": "catalog"
    }
    id = Column(
        Integer,
        primary_key=True,
        index=True
    )
    producer_id = Column(
        Integer,
        ForeignKey("auth.users.id"),
        nullable=False
    )
    title = Column(
        String(150),
        nullable=False
    )
    category = Column(
        String(100)
    )
    quantity = Column(
        Numeric(10, 2),
        nullable=False
    )
    unit = Column(
        String(50),
        nullable=False
    )
    price = Column(
        Numeric(10, 2),
        nullable=False
    )
    location = Column(
        String(150),
        nullable=False
    )
    description = Column(
        Text
    )
    is_active = Column(
        Boolean,
        default=True
    )
    created_at = Column(
        DateTime,
        server_default=func.now()
    )
    updated_at = Column(
        DateTime,
        server_default=func.now(),
        onupdate=func.now()
    )

    """ RELATIONSHIP """
    producer = relationship(
        "User",
        back_populates="products"
    )