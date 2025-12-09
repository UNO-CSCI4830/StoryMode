from uuid import uuid4

from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session

from app.core.db import get_db
from app.core.security import (
    create_access_token,
    verify_password,
    require_user,
)

from app.core.helpers import normalize_name
from app.models import User
from app.schemas import UserCreate, UserOut, Token

router = APIRouter(prefix="/auth", tags=["authentication"])

@router.post (
    "/register",
    status_code=status.HTTP_201_CREATED,
    response_model=UserOut,
    summary="CREATE new account."
)

def register (
    body: UserCreate,
    db: Session = Depends(get_db)
):
    from app.services.users import UserService
    svc = UserService(db)

    try:
        user = svc.create_user (
            user_name=body.user_name,
            password=body.password,
            is_admin=False
        )
        return user

    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.post (
    "/login", 
    response_model=Token, 
    summary="OAuth2 password flow (form fields)."
)

def login (
    form_data: OAuth2PasswordRequestForm = Depends(),  # expects "username" + "password" (form-encoded)
    db: Session = Depends(get_db),
) -> Token:

    username = normalize_name(form_data.username)
    password = form_data.password

    user = db.query(User).filter(User.user_name == username).first()
    if not user or not verify_password(password, user.password_hash):
        # generic on purpose to avoid enumeration
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials"
        )

    token = create_access_token(sub=user.id)
    return Token(access_token=token)