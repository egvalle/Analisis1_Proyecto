from sqlalchemy import Column
from sqlalchemy import Integer
from sqlalchemy import DateTime
from sqlalchemy import ForeignKey

from sqlalchemy.orm import relationship

from sqlalchemy.sql import func

from app.database.database import Base

class Interaction(Base):

    __tablename__ = "interactions"

    __table_args__ = {
        "schema": "interaction"
    }

    id = Column(
        Integer,
        primary_key=True
    )

    buyer_id = Column(
        Integer,
        ForeignKey("auth.users.id"),
        nullable=False
    )

    producer_id = Column(
        Integer,
        ForeignKey("auth.users.id"),
        nullable=False
    )

    product_id = Column(
        Integer,
        ForeignKey("catalog.products.id"),
        nullable=False
    )

    created_at = Column(
        DateTime,
        server_default=func.now()
    )

    """
    RELATIONSHIPS
    """

    buyer = relationship(
        "User",
        foreign_keys=[buyer_id]
    )

    producer = relationship(
        "User",
        foreign_keys=[producer_id]
    )

    product = relationship(
        "Product"
    )