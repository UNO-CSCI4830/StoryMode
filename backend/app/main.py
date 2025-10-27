from fastapi import FastAPI
from app.core.db import engine

from app.routers.bookclubs import router as bookclubs
from app.routers.users import router as users

from app.models import Base

app = FastAPI(
    title = "Bookclub Project API",
    description = "Backend for CSCI4380 Project",
    version = "0.1"
)

# Create tables if they don't exist
Base.metadata.create_all(bind=engine)

app.include_router(bookclubs, prefix="/api/v1")
app.include_router(users, prefix="/api/v1")

@app.get("/ping")
def ping():
    return{"ok": True}
