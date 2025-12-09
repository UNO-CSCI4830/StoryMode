from fastapi import APIRouter, Depends, Header, Body, status
from sqlalchemy.orm import Session
from typing import List

from app.core.db import get_db
from app.schemas import (
    BookClubCreateIn, 
    BookClubCreateOut, 
    BookClubOutAll, 
    BookClubDetailOut,
    UserFormat, 
)
 
from app.services.bookclubs import BookClubService
from app.services.books import BookService
from app.core.security import require_user

router = APIRouter(prefix="/bookclubs", tags=["bookclubs"])

def get_bookclub_service(db: Session = Depends(get_db)) -> BookClubService:
    # Create fresh DB Session
    return BookClubService(db)

# Create a bookclub
@router.post(
    "",
    response_model=BookClubCreateOut,
    status_code=status.HTTP_201_CREATED,
    summary="CREATE a new book club.",
)
def create_bookclub(
    payload: BookClubCreateIn = Body(...),
    current_user: UserFormat = Depends(require_user),
    svc: BookClubService = Depends(get_bookclub_service),
):
    owner_id: str = current_user.id
    return svc.create_club(payload, owner_id)

# Delete a bookclub
@router.delete(
    "/{club_id}", 
    status_code=status.HTTP_200_OK, 
    summary="DELETE a book club you own."
)
def delete_bookclub(
    club_id: str,
    current_user: UserFormat = Depends(require_user),
    svc: BookClubService = Depends(get_bookclub_service),
):
    owner_id: str = current_user.id
    return svc.delete_club(club_id, owner_id)

# Route to list all bookclubs
@router.get(
    "",
    response_model=List[BookClubOutAll],
    summary="GET all book clubs. (Public Directory)",
)
def my_bookclubs(
    current_user: UserFormat = Depends(require_user),
    svc: BookClubService = Depends(get_bookclub_service)
):
    return svc.all_clubs()

@router.post(
    "/{club_id}/join",
    status_code=status.HTTP_200_OK,
    summary="JOIN a book club."
)
def join_bookclub(
    club_id: str,
    current_user: UserFormat = Depends(require_user),
    svc: BookClubService = Depends(get_bookclub_service),
):
    return svc.join_club(user_id=current_user.id, club_id=club_id)

@router.post(
    "/{club_id}/leave",
    status_code=status.HTTP_200_OK,
    summary="LEAVE a book club."
)
def leave_bookclub(
    club_id: str,
    current_user: UserFormat = Depends(require_user),
    svc: BookClubService = Depends(get_bookclub_service),
):
    return svc.leave_club(user_id=current_user.id, club_id=club_id)

@router.get(
    "/{club_id}", 
    response_model=BookClubDetailOut, 
    summary="Get club details and member count."
)
def get_club_details(
    club_id: str,
    svc: BookClubService = Depends(get_bookclub_service)
):
    return svc.get_club_details(club_id)