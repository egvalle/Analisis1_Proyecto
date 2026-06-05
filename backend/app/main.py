from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes.auth_routes import router as auth_router
from app.routes.product_routes import router as product_router
from app.routes.interaction_routes import router as interaction_router
from fastapi.staticfiles import StaticFiles

app = FastAPI()

""" CORS """
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",                                         # Desarrollo local
        "https://cosecha-red.vercel.app",                                # Dominio principal de Vercel
        "https://cosecha-7pux9vbvz-edwin-valle-s-projects.vercel.app",  # El dominio del error
        "https://cosecha-git-main-edwin-valle-s-projects.vercel.app",
    ],
    allow_origin_regex=r"https://.*\.vercel\.app",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

""" ROUTES """
app.include_router(auth_router)
app.include_router(product_router)
app.mount(
    "/uploads",
    StaticFiles(directory="uploads"),
    name="uploads"
)
app.include_router(interaction_router)
