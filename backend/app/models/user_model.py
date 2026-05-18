from sqlalchemy import Column
from sqlalchemy import Integer
from sqlalchemy import String
from sqlalchemy import Boolean
from sqlalchemy import DateTime
from sqlalchemy import Enum

from sqlalchemy.sql import func

import enum

from app.database.database import Base

class UserRole(str, enum.Enum):
    COMPRADOR = "COMPRADOR"
    PRODUCTOR = "PRODUCTOR"
    ADMIN = "ADMIN"

class User(Base):
    __tablename__ = "users"
    __table_args__ = {"schema": "auth"}

    id = Column(Integer, primary_key=True, index=True)

    full_name = Column(
        String(150),
        nullable=False
    )

    email = Column(
        String(150),
        unique=True,
        nullable=False,
        index=True
    )

    phone = Column(
        String(20),
        nullable=False
    )

    password_hash = Column(
        String,
        nullable=False
    )

    role = Column(
        Enum(UserRole),
        nullable=False
    )

    is_active = Column(
        Boolean,
        default=True
    )

    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now()
    )

    updated_at = Column(
        DateTime(timezone=True),
        server_default=func.now(),
        onupdate=func.now()
    )