from fastapi import APIRouter
from fastapi import Depends
from fastapi import HTTPException
from fastapi import status
from fastapi import UploadFile
from fastapi import File

import shutil
import uuid
import os

from sqlalchemy.orm import Session

from app.database.database import get_db

from app.models.product_model import Product

from app.schemas.product_schema import ( ProductCreate, ProductUpdate, ProductResponse )

router = APIRouter( prefix="/products", tags=["Products"] )

@router.post(
    "/upload-image"
)
def upload_image(
    file: UploadFile = File(...)
):
    os.makedirs(
        "uploads/products",
        exist_ok=True
    )
    extension = (
        file.filename.split(".")[-1]
    )
    filename = (
        f"{uuid.uuid4()}.{extension}"
    )
    file_path = (
        f"uploads/products/{filename}"
    )
    with open(
        file_path,
        "wb"
    ) as buffer:
        shutil.copyfileobj(
            file.file,
            buffer
        )
    return {
        "image_url":
        f"/uploads/products/{filename}"
    }

""" GET ALL PRODUCTS """
@router.get(
    "",
    response_model=list[ProductResponse]
)
def get_products(
    db: Session = Depends(get_db)
):
    products = db.query(Product).filter(
        Product.is_active == True
    ).all()
    return [
        ProductResponse(
            id=product.id,
            producer_id=product.producer_id,
            producer_name=product.producer.full_name,
            producer_email=product.producer.email,
            producer_phone=product.producer.phone,
            title=product.title,
            category=product.category,
            quantity=product.quantity,
            unit=product.unit,
            price=product.price,
            location=product.location,
            description=product.description,
            is_active=product.is_active,
            created_at=product.created_at,
            updated_at=product.updated_at,
            image_url=product.image_url
        )
        for product in products
    ]

""" GET PRODUCTS BY PRODUCER """
@router.get(
    "/producer/{producer_id}",
    response_model=list[ProductResponse]
)
def get_products_by_producer(
    producer_id: int,
    db: Session = Depends(get_db)
):
    products = db.query(Product).filter(
        Product.producer_id == producer_id
    ).all()
    return [
        ProductResponse(
            id=product.id,
            producer_id=product.producer_id,
            producer_name=product.producer.full_name,
            producer_email=product.producer.email,
            producer_phone=product.producer.phone,
            title=product.title,
            category=product.category,
            quantity=product.quantity,
            unit=product.unit,
            price=product.price,
            location=product.location,
            description=product.description,
            is_active=product.is_active,
            created_at=product.created_at,
            updated_at=product.updated_at,
            image_url=product.image_url
        )
        for product in products
    ]

""" CREATE PRODUCT """
@router.post(
    "",
    response_model=ProductResponse,
    status_code=status.HTTP_201_CREATED
)
def create_product(
    payload: ProductCreate,
    db: Session = Depends(get_db)
):
    product = Product(
        producer_id=payload.producer_id,
        title=payload.title,
        category=payload.category,
        quantity=payload.quantity,
        unit=payload.unit,
        price=payload.price,
        location=payload.location,
        description=payload.description,
        image_url=payload.image_url
    )

    db.add(product)

    db.commit()

    db.refresh(product)

    return ProductResponse(
        id=product.id,
        producer_id=product.producer_id,
        producer_name=product.producer.full_name,
        producer_email=product.producer.email,
        producer_phone=product.producer.phone,
        title=product.title,
        category=product.category,
        quantity=product.quantity,
        unit=product.unit,
        price=product.price,
        location=product.location,
        description=product.description,
        is_active=product.is_active,
        created_at=product.created_at,
        updated_at=product.updated_at,
        image_url=product.image_url
    )

""" UPDATE PRODUCT """
@router.put(
    "/{product_id}",
    response_model=ProductResponse
)
def update_product(
    product_id: int,
    payload: ProductUpdate,
    db: Session = Depends(get_db)
):
    product = db.query(Product).filter(
        Product.id == product_id
    ).first()
    if not product:
        raise HTTPException(
            status_code=404,
            detail="Producto no encontrado"
        )
    product.title = payload.title
    product.category = payload.category
    product.quantity = payload.quantity
    product.unit = payload.unit
    product.price = payload.price
    product.location = payload.location
    product.description = payload.description
    product.image_url = payload.image_url

    db.commit()

    db.refresh(product)

    return ProductResponse(
        id=product.id,
        producer_id=product.producer_id,
        producer_name=product.producer.full_name,
        producer_email=product.producer.email,
        producer_phone=product.producer.phone,
        title=product.title,
        category=product.category,
        quantity=product.quantity,
        unit=product.unit,
        price=product.price,
        location=product.location,
        description=product.description,
        is_active=product.is_active,
        created_at=product.created_at,
        updated_at=product.updated_at,
        image_url=product.image_url
    )

""" DELETE PRODUCT """
@router.delete(
    "/{product_id}"
)
def delete_product(
    product_id: int,
    db: Session = Depends(get_db)
):
    product = db.query(Product).filter(
        Product.id == product_id
    ).first()
    if not product:
        raise HTTPException(
            status_code=404,
            detail="Producto no encontrado"
        )
    db.delete(product)
    db.commit()
    return {
        "message":
        "Producto eliminado"
    }