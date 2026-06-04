from sqlalchemy import Column
from sqlalchemy import Integer
from sqlalchemy import String
from sqlalchemy import Boolean
from sqlalchemy import DateTime
from sqlalchemy import ForeignKey

from sqlalchemy.orm import relationship

from sqlalchemy.sql import func

from app.database.database import Base

class User(Base):
    __tablename__ = "users"
    __table_args__ = {
        "schema": "auth"
    }
    id = Column(
        Integer,
        primary_key=True,
        index=True
    )
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

    # RELATIONSHIPS
    roles = relationship(
        "UserRole",
        back_populates="user",
        cascade="all, delete-orphan"
    )
    products = relationship(
        "Product",
        back_populates="producer"
    )

class Role(Base):
    __tablename__ = "roles"
    __table_args__ = {
        "schema": "auth"
    }
    id = Column(
        Integer,
        primary_key=True,
        index=True
    )
    name = Column(
        String(30),
        unique=True,
        nullable=False
    )

    # RELATIONSHIPS
    users = relationship(
        "UserRole",
        back_populates="role",
        cascade="all, delete-orphan"
    )

class UserRole(Base):
    __tablename__ = "user_roles"
    __table_args__ = {
        "schema": "auth"
    }
    user_id = Column(
        Integer,
        ForeignKey("auth.users.id"),
        primary_key=True
    )
    role_id = Column(
        Integer,
        ForeignKey("auth.roles.id"),
        primary_key=True
    )

    # RELATIONSHIPS
    user = relationship(
        "User",
        back_populates="roles"
    )
    role = relationship(
        "Role",
        back_populates="users"
    )