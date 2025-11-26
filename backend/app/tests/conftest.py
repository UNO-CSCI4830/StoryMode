# app/tests/conftest.py
import pytest
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from app.models import Base

TEST_DB_URL = "sqlite:///:memory:"

@pytest.fixture
def db_session():
    """
    Creates a fresh in-memory SQLite database for each test.
    Keeps the real database safe during testing.
    """
    engine = create_engine(TEST_DB_URL, future=True)
    TestingSessionLocal = sessionmaker(
        bind=engine,
        autoflush=False,
        autocommit=False,
        future=True
    )

    # Build fresh tables
    Base.metadata.create_all(bind=engine)

    db = TestingSessionLocal()
    try:
        yield db
    finally:
        db.close()
