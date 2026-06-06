from pydantic import BaseModel
from pydantic import EmailStr
from datetime import datetime

from enum import Enum

class UserRole(str, Enum):
    COMPRADOR = "COMPRADOR"
    PRODUCTOR = "PRODUCTOR"
    ADMIN = "ADMIN"

# REQUESTS
class UserCreate(BaseModel):
    full_name: str
    email: EmailStr
    phone: str
    password: str
    role: UserRole

class UserLogin(BaseModel):
    email: EmailStr
    password: str

# RESPONSES
class UserResponse(BaseModel):
    id: int
    full_name: str
    email: EmailStr
    phone: str
    role: UserRole
    is_active: bool
    created_at: datetime

    class Config:
        from_attributes = True

""" PROFILE """
class ProfileResponse(BaseModel):
    id: int
    full_name: str
    email: str
    phone: str
    roles: list[str]
    average_rating: float
    is_active: bool
    created_at: datetime

    class Config:
        from_attributes = True