from pydantic import BaseModel
from pydantic import EmailStr

from typing import List
from typing import Optional

from datetime import datetime

""" ROLE RESPONSE """
class RoleResponse(
    BaseModel
):
    id: int
    name: str
    class Config:
        from_attributes = True

""" REGISTER REQUEST """
class RegisterRequest(
    BaseModel
):
    full_name: str
    email: EmailStr
    phone: str
    password: str
    role_ids: List[int]

""" LOGIN REQUEST """
class LoginRequest(
    BaseModel
):
    email: EmailStr
    password: str

""" USER RESPONSE """
class UserResponse(
    BaseModel
):
    id: int
    full_name: str
    email: EmailStr
    phone: str
    is_active: bool
    created_at: datetime
    roles: List[str]
    class Config:
        from_attributes = True

""" AUTH RESPONSE """
class AuthResponse(
    BaseModel
):
    access_token: str
    token_type: str = "bearer"
    user: UserResponse