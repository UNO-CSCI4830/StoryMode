from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os
from app.core.db import engine
try:
    from app.routers.bookclubs import router as bookclubs
except Exception:
    bookclubs = None
try:
    from app.routers.users import router as users
except Exception:
    users = None
try:
    from app.models import Base
except Exception:
    Base = None

app = FastAPI(title="StoryMode API", description="FastAPI backend for StoryMode project", version="0.2")

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

if bookclubs:
    app.include_router(bookclubs, prefix="/api/v1")
if users:
    app.include_router(users, prefix="/api/v1")

@app.get("/ping")
def ping():
    return {"ok": True}

#Added by Kira: simple test login endpoint so frontend can verify
#connection to backend without changing existing auth.
#Description: This lets React frontend send a username/password and get a simple response
#without touching existing bookclub or user routes
@app.post("/api/v1/login-test")
def login_test(data: dict):
    username = data.get("username")
    password = data.get("password")

    #test credentials now, real auth later
    if username == "testuser" and password == "password123":
        return {"ok": True, "username": username}
    
    return {"ok": False, "error": "invalid credentials"}
