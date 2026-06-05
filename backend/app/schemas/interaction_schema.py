from pydantic import BaseModel
from datetime import datetime
from typing import Optional


""" CREATE INTERACTION """
class InteractionCreate(BaseModel):
    buyer_id: int
    producer_id: int
    product_id: int

""" RATE INTERACTION """
class InteractionRating(BaseModel):
    buyer_rating: Optional[int] = None
    producer_rating: Optional[int] = None

""" RESPONSE """
class InteractionResponse(BaseModel):
    id: int
    buyer_id: int
    buyer_name: str
    producer_id: int
    producer_name: str
    product_id: int
    product_title: str
    buyer_rating: Optional[int] = None
    producer_rating: Optional[int] = None
    created_at: datetime
    class Config:
        from_attributes = True

""" RANKING RESPONSE """
class RankingResponse(
    BaseModel
):
    user_id: int
    full_name: str
    average_rating: float
    total_ratings: int