from fastapi import APIRouter
from fastapi import Depends
from fastapi import HTTPException
from fastapi import status

from sqlalchemy.orm import Session
from sqlalchemy import func

from app.database.database import get_db

from app.models.user_model import User
from app.models.user_model import Role
from app.models.user_model import UserRole

from app.schemas.auth_schema import RegisterRequest
from app.schemas.auth_schema import LoginRequest
from app.schemas.auth_schema import AuthResponse
from app.schemas.auth_schema import UserResponse
from app.schemas.auth_schema import DashboardResponse

from app.models.interaction_model import Interaction

from app.schemas.user_schema import ProfileResponse

from app.models.product_model import Product

from app.utils.auth import hash_password, verify_password

router = APIRouter(
    prefix="/auth",
    tags=["Auth"]
)

""" REGISTER """
@router.post(
    "/register",
    response_model=UserResponse,
    status_code=status.HTTP_201_CREATED
)

def register(
    payload: RegisterRequest,
    db: Session = Depends(get_db)
):

    """ CHECK EMAIL """
    existing_user = db.query(User).filter(
        User.email == payload.email
    ).first()
    if existing_user:
        raise HTTPException(
            status_code=400,
            detail="El correo ya está registrado"
        )

    """ HASH PASSWORD """
    password = payload.password.encode( "utf-8" ).decode("utf-8")
    hashed_password = hash_password(password)

    """ CREATE USER """
    user = User(
        full_name=payload.full_name,
        email=payload.email,
        phone=payload.phone,
        password_hash=hashed_password
    )

    db.add(user)

    db.commit()

    db.refresh(user)

    """ ASSIGN ROLES """
    for role_id in payload.role_ids:
        role = db.query(Role).filter(
            Role.id == role_id
        ).first()
        if not role:
            raise HTTPException(
                status_code=404,
                detail=f"Rol {role_id} no existe"
            )
        user_role = UserRole(
            user_id=user.id,
            role_id=role.id
        )
        db.add(user_role)
    db.commit()

    """ BUILD RESPONSE ROLES """
    role_names = [
        user_role.role.name
        for user_role in user.roles
    ]
    return UserResponse(
        id=user.id,
        full_name=user.full_name,
        email=user.email,
        phone=user.phone,
        is_active=user.is_active,
        created_at=user.created_at,
        roles=role_names
    )


""" LOGIN """
@router.post(
    "/login",
    response_model=AuthResponse
)

def login(
    payload: LoginRequest,
    db: Session = Depends(get_db)
):

    """ FIND USER """
    user = db.query(User).filter(
        User.email == payload.email
    ).first()
    if not user:
        raise HTTPException(
            status_code=401,
            detail="Credenciales inválidas"
        )

    """ VERIFY PASSWORD """
    valid_password = verify_password(
        payload.password,
        user.password_hash
    )
    if not valid_password:
        raise HTTPException(
            status_code=401,
            detail="Credenciales inválidas"
        )

    """ USER ROLES """
    role_names = [
        user_role.role.name
        for user_role in user.roles
    ]

    """ TEMP TOKEN """
    fake_token = "temporary-token"
    return AuthResponse(
        access_token=fake_token,
        user=UserResponse(
            id=user.id,
            full_name=user.full_name,
            email=user.email,
            phone=user.phone,
            is_active=user.is_active,
            created_at=user.created_at,
            roles=role_names
        )
    )

""" PROFILE """
@router.get(
    "/profile/{user_id}",
    response_model=ProfileResponse
)
def get_profile(
    user_id: int,
    db: Session = Depends(get_db)
):
    user = (
        db.query(User)
        .filter(
            User.id == user_id
        )
        .first()
    )
    if not user:
        raise HTTPException(
            status_code=404,
            detail="Usuario no encontrado"
        )
    role_names = [
        user_role.role.name
        for user_role in user.roles
    ]
    buyer_average = (
        db.query(
            func.avg(
                Interaction.buyer_rating
            )
        )
        .filter(
            Interaction.buyer_id == user.id,
            Interaction.buyer_rating.isnot(None)
        )
        .scalar()
    )
    producer_average = (
        db.query(
            func.avg(
                Interaction.producer_rating
            )
        )
        .filter(
            Interaction.producer_id == user.id,
            Interaction.producer_rating.isnot(None)
        )
        .scalar()
    )
    ratings = []
    if buyer_average:
        ratings.append(
            float(buyer_average)
        )
    if producer_average:
        ratings.append(
            float(producer_average)
        )
    average_rating = (
        round(
            sum(ratings) / len(ratings),
            2
        )
        if ratings
        else 0.0
    )
    return ProfileResponse(
        id=user.id,
        full_name=user.full_name,
        email=user.email,
        phone=user.phone,
        roles=role_names,
        average_rating=average_rating,
        is_active=user.is_active,
        created_at=user.created_at
    )

""" DASHBOARD """
@router.get(
    "/dashboard/{user_id}",
    response_model=DashboardResponse
)
def get_dashboard(
    user_id: int,
    db: Session = Depends(get_db)
):
    purchases_count = (
        db.query(Interaction)
        .filter(
            Interaction.buyer_id == user_id
        )
        .count()
    )
    ratings_count = (
        db.query(Interaction)
        .filter(
            Interaction.buyer_id == user_id,
            Interaction.buyer_rating.isnot(None)
        )
        .count()
    )
    products_count = (
        db.query(Product)
        .filter(
            Product.producer_id == user_id
        )
        .count()
    )
    interactions_count = (
        db.query(Interaction)
        .filter(
            Interaction.producer_id == user_id
        )
        .count()
    )
    return DashboardResponse(
        purchases_count=purchases_count,
        ratings_count=ratings_count,
        products_count=products_count,
        interactions_count=interactions_count
    )