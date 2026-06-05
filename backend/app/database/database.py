from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base
from sqlalchemy.orm import sessionmaker

import os
import urllib.parse

# ============================================
# CARGAR VARIABLES DE ENTORNO (solo local)
# ============================================
try:
    from dotenv import load_dotenv
    # Busca .env en la carpeta backend (dos niveles arriba)
    dotenv_path = os.path.join(os.path.dirname(__file__), "..", "..", ".env")
    if os.path.exists(dotenv_path):
        load_dotenv(dotenv_path)
        print("Archivo .env cargado para desarrollo local")
except ImportError:
    pass

# ============================================
# CONFIGURACIÓN DE LA BASE DE DATOS
# ============================================
DATABASE_URL = os.getenv("DATABASE_URL")

if not DATABASE_URL:
    raise Exception("DATABASE_URL no está configurada")

# Determinar si estamos en producción (Neon) o local
# Neon requiere SSL, local no
is_production = "neon.tech" in DATABASE_URL or "render.com" in DATABASE_URL

# Configurar SSL solo si es necesario
connect_args = {}
if is_production:
    connect_args = {"sslmode": "require"}
    print("Modo producción: SSL requerido")
else:
    print("Modo local: SSL desactivado")

# Crear el engine
engine = create_engine(
    DATABASE_URL,
    pool_pre_ping=True,
    connect_args=connect_args
)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()