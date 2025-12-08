import os
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

# Create SQLite DB file in backend/ folder
SQLALCHEMY_DB_URL = os.environ.get("DATABASE_URL", "sqlite:///./temp.db")

# echo=True will prints SQL to the console, set to False if it gets annoying
engine = create_engine (
    SQLALCHEMY_DB_URL, 
    future=True, 
    echo=False
)

# Session factory for getting DB sessions (one per request)
SessionLocal = sessionmaker (
    bind = engine, 
    autoflush = False, 
    autocommit = False, 
    future = True
)

# FastAPI dependency to get/close a session per request
def get_db():
    db = SessionLocal()
    try:
        # Run endpoint that calls it first
        yield db
    finally:
        # Close connection
        db.close()