from fastapi import APIRouter
from fastapi import Depends
from fastapi import HTTPException
from fastapi import status

from sqlalchemy.orm import Session

from passlib.context import CryptContext

from app.database.database import get_db

from app.models.user_model import User
from app.models.user_model import Role
from app.models.user_model import UserRole

from app.schemas.auth_schema import RegisterRequest
from app.schemas.auth_schema import LoginRequest
from app.schemas.auth_schema import AuthResponse
from app.schemas.auth_schema import UserResponse

router = APIRouter(
    prefix="/auth",
    tags=["Auth"]
)

pwd_context = CryptContext(
    schemes=["bcrypt"],
    deprecated="auto"
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
    password = payload.password.encode( "utf-8" ).decode(
        "utf-8"
    )
    hashed_password = pwd_context.hash(
        password
    )

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
    valid_password = pwd_context.verify(
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