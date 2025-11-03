from fastapi import APIRouter, Depends, Header, Body, status
from sqlalchemy.orm import Session
from typing import List

from app.core.db import get_db
from app.schemas import UserFormat
from app.services.users import UserService

router = APIRouter(prefix="/users", tags=["users"])

def get_service(db: Session = Depends(get_db)) -> UserService:
    # Create fresh DB Session
    return UserService(db)

# Create a user
@router.post (
    "", 
    response_model = UserFormat,
    status_code = status.HTTP_201_CREATED,
    summary = "Create a new user."
)
def create_user (
    user_name: str,
    payload: UserFormat = Body(...),
    svc: UserService = Depends(get_service)
):
    return svc.create_user(payload, user_name)

# Delete a user
@router.delete (
    "/{user_id}",
    status_code=status.HTTP_200_OK,
    summary="Delete a user."
)
def delete_user (
    user_id: str,
    svc: UserService = Depends(get_service)
):
    return svc.delete_user(user_id)

# List all users
@router.get (
    "",
    response_model=List[UserFormat],
    summary="List all users."
)
def list_users (
    svc: UserService = Depends(get_service)
):
    return svc.list_users()