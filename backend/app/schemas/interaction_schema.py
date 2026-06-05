from pydantic import BaseModel

from datetime import datetime


""" CREATE INTERACTION """
class InteractionCreate(
    BaseModel
):
    buyer_id: int
    producer_id: int
    product_id: int


""" INTERACTION RESPONSE """
class InteractionResponse(
    BaseModel
):
    id: int

    buyer_id: int
    buyer_name: str

    producer_id: int
    producer_name: str

    product_id: int
    product_title: str

    created_at: datetime

    class Config:
        from_attributes = True