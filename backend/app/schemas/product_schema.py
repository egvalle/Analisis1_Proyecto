from pydantic import BaseModel
from decimal import Decimal
from typing import Optional
from datetime import datetime

""" BASE PRODUCT """
class ProductBase(
    BaseModel
):
    title: str
    category: Optional[str] = None
    quantity: Decimal
    unit: str
    price: Decimal
    location: str
    description: Optional[str] = None

""" CREATE PRODUCT """
class ProductCreate(
    ProductBase
):
    producer_id: int

""" UPDATE PRODUCT """
class ProductUpdate(
    ProductBase
):
    is_active: Optional[bool] = True

""" PRODUCT RESPONSE """
class ProductResponse(
    ProductBase
):
    id: int
    producer_id: int
    producer_name: str
    is_active: bool
    created_at: datetime
    updated_at: datetime
    class Config:
        from_attributes = True