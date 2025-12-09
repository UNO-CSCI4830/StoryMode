from uuid import uuid4
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List

from app.core.db import get_db
from app.core.security import (
    create_access_token,
    verify_password,
    require_user,
)

from app.services.bookclubs import BookClubService
from app.services.users import UserService

from app.schemas import UserCreate, UserOut, UserFormat, BookClubOutAdmin
from app.core.security import require_admin

router = APIRouter(prefix='/admin', tags=['admin'])

# Establish a connection to UserService
def get_user_service(db: Session = Depends(get_db)) -> UserService:
    # Create fresh DB Session
    return UserService(db)

# Establish a connection to BookClubService
def get_bookclub_service(db: Session = Depends(get_db)) -> BookClubService:
    # Create fresh DB Session
    return BookClubService(db)

# Route to create a new admin account
@router.post (
    '', 
    status_code = status.HTTP_201_CREATED, 
    response_model = UserOut,
    summary = 'CREATE new admin account.'
)

def create_admin (
    body: UserCreate,
    db: Session = Depends(get_db),
    _ = Depends(require_admin)
):
    from app.services.users import UserService
    svc = UserService(db)

    try:
        user = svc.create_user (
            user_name=body.user_name,
            password=body.password,
            is_admin=True
        )
        return user

    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    
# Route to list all users
@router.get (
    "/users",
    response_model = List[UserFormat],
    summary="GET all users."
)
def list_users (
    svc: UserService = Depends(get_user_service),
    _ = Depends(require_admin)
):
    return svc.list_users()

# Route to list all bookclubs
@router.get(
    "/clubs",
    response_model=List[BookClubOutAdmin],
    summary="GET all book clubs. (Public and Private)",
)
def my_bookclubs(
    current_user: UserFormat = Depends(require_user),
    svc: BookClubService = Depends(get_bookclub_service),
    _ = Depends(require_admin)
):
    return svc.all_clubs()

# Route to delete a user
@router.delete (
    "/users/{user_id}",
    status_code = status.HTTP_200_OK,
    summary="DELETE a user."
)
def delete_user (
    user_id: str,
    svc: UserService = Depends(get_user_service),
    _ = Depends(require_admin)
):
    return svc.delete_user(user_id)

# Route to delete a bookclub
@router.delete (
    "/bookclubs/{club_id}",
    status_code = status.HTTP_200_OK,
    summary="DELETE a book club."
)
def admin_delete_bookclub(
    club_id: str,
    svc: BookClubService = Depends(get_bookclub_service),
    _ = Depends(require_admin)
):
    return svc.admin_delete_club(club_id)