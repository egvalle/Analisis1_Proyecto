from fastapi import FastAPI

from app.database.database import engine
from app.models.user_model import Base


Base.metadata.create_all(bind=engine)

app = FastAPI()


@app.get("/")
def root():
    return {
        "message": "Cosecha Red API"
    }