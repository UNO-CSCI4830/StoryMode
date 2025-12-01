from fastapi import APIRouter, Depends, Header, Body, status
from sqlalchemy.orm import Session
from typing import List

from app.core.db import get_db
from app.schemas import BookClubCreate, BookClubOut, UserFormat
from app.services.bookclubs import BookClubService
from app.core.security import require_user

router = APIRouter(prefix="/bookclubs", tags=["bookclubs"])

def get_service(db: Session = Depends(get_db)) -> BookClubService:
    # Create fresh DB Session
    return BookClubService(db)


# Create a bookclub
@router.post(
    "",
    response_model=BookClubOut,
    status_code=status.HTTP_201_CREATED,
    summary="Create a new book club.",
)
def create_bookclub(
    payload: BookClubCreate = Body(...),
    current_user: UserFormat = Depends(require_user),
    svc: BookClubService = Depends(get_service),
):
    owner_id: str = current_user.id
    return svc.create_club(payload, owner_id)

# Delete a bookclub
@router.delete(
    "/{club_id}", 
    status_code=status.HTTP_200_OK, 
    summary="Delete a book club you own."
)
def delete_bookclub(
    club_id: str,
    current_user: UserFormat = Depends(require_user),
    svc: BookClubService = Depends(get_service),
):
    owner_id: str = current_user.id
    return svc.delete_club(club_id, owner_id)

# List all bookclubs for a user
@router.get(
    "",
    response_model=List[BookClubOut],
    summary="List your book clubs.",
)
def my_bookclubs(
    current_user: UserFormat = Depends(require_user),
    svc: BookClubService = Depends(get_service)
):
    owner_id: str = current_user.id
    return svc.my_clubs(owner_id)
