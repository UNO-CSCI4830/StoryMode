from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from app.core.security import require_user

from app.core.db import get_db
from app.models import User
from app.schemas import UserOut, UserFormat, BookClubOutUser
from app.services.bookclubs import BookClubService

router = APIRouter(prefix="/users", tags=["users"])

# Establish a connection to BookClubService
def get_bookclub_service(db: Session = Depends(get_db)) -> BookClubService:
    # Create fresh DB Session
    return BookClubService(db)

@router.get(
    "/me", 
    response_model=UserOut, 
    summary="GET Current user profile.")

def me(
    current_user: User = Depends(require_user),
    db: Session = Depends(get_db),
) -> UserOut:

    return UserOut(
        id=current_user.id,
        user_name=current_user.user_name
    )

# List all bookclubs you are in
@router.get(
    "/me/bookclubs",
    response_model=List[BookClubOutUser],
    summary="GET all book clubs you are in.",
)
def my_bookclubs(
    current_user: UserFormat = Depends(require_user),
    svc: BookClubService = Depends(get_bookclub_service)
):
    owner_id: str = current_user.id
    return svc.my_clubs(owner_id)
