from fastapi import APIRouter, Depends, Header, Body, status
from sqlalchemy.orm import Session
from typing import List

from app.core.db import get_db
from app.schemas import BookClubCreate, BookClubOut
from app.services.bookclubs import BookClubService

router = APIRouter(prefix="/bookclubs", tags=["bookclubs"])

def require_user(x_user_id: str = Header(..., alias="X-User-Id")) -> str:
    # Mock authentication: ask for user header
    return x_user_id

def get_service(db: Session = Depends(get_db)) -> BookClubService:
    # Create fresh DB Session
    return BookClubService(db)

# Create a bookclub
@router.post (
    "", 
    response_model = BookClubOut,
    status_code = status.HTTP_201_CREATED,
    summary = "Create a new book club."
)
def create_bookclub (
    payload: BookClubCreate = Body(...),
    owner_id: str = Depends(require_user),
    svc: BookClubService = Depends(get_service)
):
    return svc.create_club(payload, owner_id)

# Delete a bookclub
@router.delete (
    "/{club_id}",
    status_code=status.HTTP_200_OK,
    summary="Delete a book club you own."
)
def delete_bookclub (
    club_id: str,
    owner_id: str = Depends(require_user),
    svc: BookClubService = Depends(get_service)
):
    return svc.delete_club(club_id, owner_id)

# List all bookclubs for a user
@router.get (
    "",
    response_model=List[BookClubOut],
    summary="List your book clubs.",
)
def list_bookclubs (
    owner_id: str = Depends(require_user),
    svc: BookClubService = Depends(get_service)
):
    return svc.list_clubs(owner_id)