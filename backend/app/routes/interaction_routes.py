from fastapi import APIRouter
from fastapi import Depends
from fastapi import HTTPException
from fastapi import status

from sqlalchemy.orm import Session
from sqlalchemy import func

from app.database.database import get_db

from app.models.interaction_model import Interaction
from app.models.user_model import User

from app.schemas.interaction_schema import (
    InteractionCreate,
    InteractionResponse,
    InteractionRating,
    RankingResponse
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

        buyer_rating=interaction.buyer_rating,
        producer_rating=interaction.producer_rating,

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

            buyer_rating=interaction.buyer_rating,
            producer_rating=interaction.producer_rating,

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

            buyer_rating=interaction.buyer_rating,
            producer_rating=interaction.producer_rating,

            created_at=interaction.created_at
        )
        for interaction in interactions
    ]

@router.put(
    "/{interaction_id}/rate",
    response_model=InteractionResponse
)
def rate_interaction(
    interaction_id: int,
    payload: InteractionRating,
    db: Session = Depends(get_db)
):

    interaction = (
        db.query(Interaction)
        .filter(
            Interaction.id == interaction_id
        )
        .first()
    )

    if not interaction:
        raise HTTPException(
            status_code=404,
            detail="Interacción no encontrada"
        )

    if payload.buyer_rating is not None:

        interaction.buyer_rating = (
            payload.buyer_rating
        )

    if payload.producer_rating is not None:

        interaction.producer_rating = (
            payload.producer_rating
        )

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

        buyer_rating=interaction.buyer_rating,
        producer_rating=interaction.producer_rating,

        created_at=interaction.created_at
    )

""" TOP PRODUCERS """
@router.get(
    "/top-producers",
    response_model=list[RankingResponse]
)
def get_top_producers(
    db: Session = Depends(get_db)
):

    results = (
        db.query(
            User.id,
            User.full_name,
            func.avg(
                Interaction.producer_rating
            ).label("average_rating"),
            func.count(
                Interaction.producer_rating
            ).label("total_ratings")
        )
        .join(
            Interaction,
            Interaction.producer_id == User.id
        )
        .filter(
            Interaction.producer_rating.isnot(None)
        )
        .group_by(
            User.id,
            User.full_name
        )
        .order_by(
            func.avg(
                Interaction.producer_rating
            ).desc()
        )
        .limit(10)
        .all()
    )

    return [
        RankingResponse(
            user_id=row.id,
            full_name=row.full_name,
            average_rating=round(
                float(row.average_rating),
                2
            ),
            total_ratings=row.total_ratings
        )
        for row in results
    ]

""" TOP BUYERS """
@router.get(
    "/top-buyers",
    response_model=list[RankingResponse]
)
def get_top_buyers(
    db: Session = Depends(get_db)
):

    results = (
        db.query(
            User.id,
            User.full_name,
            func.avg(
                Interaction.buyer_rating
            ).label("average_rating"),
            func.count(
                Interaction.buyer_rating
            ).label("total_ratings")
        )
        .join(
            Interaction,
            Interaction.buyer_id == User.id
        )
        .filter(
            Interaction.buyer_rating.isnot(None)
        )
        .group_by(
            User.id,
            User.full_name
        )
        .order_by(
            func.avg(
                Interaction.buyer_rating
            ).desc()
        )
        .limit(10)
        .all()
    )

    return [
        RankingResponse(
            user_id=row.id,
            full_name=row.full_name,
            average_rating=round(
                float(row.average_rating),
                2
            ),
            total_ratings=row.total_ratings
        )
        for row in results
    ]