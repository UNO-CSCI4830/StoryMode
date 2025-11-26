import pytest
from sqlalchemy import create_engine, text
from sqlalchemy.orm import sessionmaker
from app.core.db import SQLALCHEMY_DB_URL, SessionLocal, get_db

# 1. Test if engine connects
def test_engine_connects():
    engine = create_engine(SQLALCHEMY_DB_URL, future=True)
    with engine.connect() as conn:
        result = conn.execute(text("SELECT 1"))
        assert result.scalar() == 1


# 2. Test if SessionLocal returns a session
def test_sessionlocal_creates_session():
    session = SessionLocal()
    try:
        result = session.execute(text("SELECT 1"))
        assert result.scalar() == 1
    finally:
        session.close()


# 3. Test get_db() dependency opens & closes DB
def test_get_db_dependency():
    gen = get_db()
    db = next(gen)
    assert db is not None

    # Force closing
    try:
        next(gen)
    except StopIteration:
        pass



# 4. Test an actual write + read to temp.db
def test_tempdb_insert_and_select():
    engine = create_engine(SQLALCHEMY_DB_URL, future=True)
    with engine.begin() as conn:
        conn.execute(text("CREATE TABLE IF NOT EXISTS test (id INTEGER PRIMARY KEY, name TEXT)"))
        conn.execute(text("INSERT INTO test (name) VALUES ('Auggie')"))

    session = SessionLocal()
    result = session.execute(text("SELECT name FROM test WHERE name='Auggie'")).first()
    session.close()

    assert result[0] == "Auggie"