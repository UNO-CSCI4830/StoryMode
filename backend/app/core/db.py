import os
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

# Read DATABASE_URL from environment if set, otherwise use local sqlite file
SQLALCHEMY_DB_URL = os.environ.get("DATABASE_URL", "sqlite:///./temp.db")

engine = create_engine(
    SQLALCHEMY_DB_URL,
    future=True,
    echo=False
)

SessionLocal = sessionmaker(
    bind=engine,
    autoflush=False,
    autocommit=False,
    future=True
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
