from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os

from app.core.db import engine
from app.core.db import SessionLocal
from app.core.bootstrap import create_root_user

# Import Routers
try:
    from app.routers.auth import router as auth
except Exception:
    auth = None

from app.routers.users import router as users

try:
    from app.routers.bookclubs import router as bookclubs
except Exception:
    bookclubs = None

try:
    from app.routers.books import router as books
except Exception:
    books = None

try:
    from app.models import Base
except Exception:
    Base = None

try:
    from app.routers.admin import router as admin
except Exception:
    admin = None

try:
    from app.routers.messages import router as messages
except Exception:
    messages = None


@asynccontextmanager
async def lifespan(app: FastAPI):
    db = SessionLocal()
    create_root_user(db, "root", "root")
    db.close()
    yield


app = FastAPI(
    title="StoryMode API",
    description="FastAPI Backend for StoryMode",
    version="0.3",
    lifespan=lifespan,
)

if Base is not None:
    Base.metadata.create_all(bind=engine)

frontend_origin = os.getenv("FRONTEND_ORIGIN", "http://localhost:5173")
app.add_middleware(
    CORSMiddleware,
    allow_origins=[frontend_origin],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

if auth:
    app.include_router(auth, prefix="/api/v1")
if users:
    app.include_router(users, prefix="/api/v1")
if bookclubs:
    app.include_router(bookclubs, prefix="/api/v1")
if books:
    app.include_router(books, prefix="/api/v1")
if admin:
    app.include_router(admin, prefix="/api/v1")
if messages:
    app.include_router(messages, prefix="/api/v1")


@app.get("/ping")
def ping():
    return {"ok": True}


# Added by Kira: simple test login endpoint so frontend can verify
# connection to backend without changing existing auth.
# Description: This lets React frontend send a username/password and get a simple response
# without touching existing bookclub or user routes

# @app.post("/api/v1/login-test")
# def login_test(data: dict):
#     username = data.get("username")
#     password = data.get("password")

#     #test credentials now, real auth later
#     if username == "testuser" and password == "password123":
#         return {"ok": True, "username": username}

#     return {"ok": False, "error": "invalid credentials"}
