from fastapi import APIRouter
from fastapi import Depends
from fastapi import HTTPException
from fastapi import status

from sqlalchemy.orm import Session

from app.database.database import get_db

from app.models.interaction_model import Interaction

from app.schemas.interaction_schema import (
    InteractionCreate,
    InteractionResponse
)

router = APIRouter(
    prefix="/interactions",
    tags=["Interactions"]
)

""" CREATE INTERACTION """
@router.post(
    "",
    response_model=InteractionResponse,
    status_code=status.HTTP_201_CREATED
)
def create_interaction(
    payload: InteractionCreate,
    db: Session = Depends(get_db)
):

    interaction = Interaction(
        buyer_id=payload.buyer_id,
        producer_id=payload.producer_id,
        product_id=payload.product_id
    )

    db.add(interaction)

    db.commit()

    db.refresh(interaction)

    return InteractionResponse(
        id=interaction.id,

        buyer_id=interaction.buyer_id,
        buyer_name=interaction.buyer.full_name,

        producer_id=interaction.producer_id,
        producer_name=interaction.producer.full_name,

        product_id=interaction.product_id,
        product_title=interaction.product.title,

        created_at=interaction.created_at
    )


""" BUYER HISTORY """
@router.get(
    "/buyer/{buyer_id}",
    response_model=list[InteractionResponse]
)
def get_buyer_interactions(
    buyer_id: int,
    db: Session = Depends(get_db)
):

    interactions = (
        db.query(Interaction)
        .filter(
            Interaction.buyer_id == buyer_id
        )
        .order_by(
            Interaction.created_at.desc()
        )
        .all()
    )

    return [
        InteractionResponse(
            id=interaction.id,

            buyer_id=interaction.buyer_id,
            buyer_name=interaction.buyer.full_name,

            producer_id=interaction.producer_id,
            producer_name=interaction.producer.full_name,

            product_id=interaction.product_id,
            product_title=interaction.product.title,

            created_at=interaction.created_at
        )
        for interaction in interactions
    ]


""" PRODUCER HISTORY """
@router.get(
    "/producer/{producer_id}",
    response_model=list[InteractionResponse]
)
def get_producer_interactions(
    producer_id: int,
    db: Session = Depends(get_db)
):

    interactions = (
        db.query(Interaction)
        .filter(
            Interaction.producer_id == producer_id
        )
        .order_by(
            Interaction.created_at.desc()
        )
        .all()
    )

    return [
        InteractionResponse(
            id=interaction.id,

            buyer_id=interaction.buyer_id,
            buyer_name=interaction.buyer.full_name,

            producer_id=interaction.producer_id,
            producer_name=interaction.producer.full_name,

            product_id=interaction.product_id,
            product_title=interaction.product.title,

            created_at=interaction.created_at
        )
        for interaction in interactions
    ]