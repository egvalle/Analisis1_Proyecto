from app.database.database import engine

try:
    connection = engine.connect()
    print("Conexion exitosa")
    connection.close()

except Exception as e:
    print("Error:", repr(e))