from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.core.security import require_user

from app.core.db import get_db
from app.models import User
from app.schemas import UserOut
from app.services.users import UserService

router = APIRouter(prefix="/users", tags=["users"])

def get_service(db: Session = Depends(get_db)) -> UserService:
    # Create fresh DB Session
    return UserService(db)

@router.get(
    "/me", 
    response_model=UserOut, 
    summary="Current user profile")

def me(
    current_user: User = Depends(require_user),
    db: Session = Depends(get_db),
) -> UserOut:

    return UserOut(
        id=current_user.id,
        user_name=current_user.user_name
    )
