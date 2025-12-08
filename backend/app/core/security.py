from datetime import datetime, timedelta, timezone
from jose import jwt
from passlib.hash import argon2

from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session
from jose import jwt, JWTError

from app.core.db import get_db
from app.models import User

SECRET_KEY = "change_me_for_class"  # put in .env if you want
ALGORITHM = "HS256"
ACCESS_TTL_MIN = 30  # small, fine for class

def hash_password(raw: str) -> str:
    return argon2.hash(raw)

def verify_password(raw: str, hashed: str) -> bool:
    return argon2.verify(raw, hashed)

def create_access_token(sub: str) -> str:
    now = datetime.now(timezone.utc)
    exp = now + timedelta(minutes=ACCESS_TTL_MIN)
    payload = {
        "sub": sub,
        "iat": int(now.timestamp()),
        "exp": int(exp.timestamp()),
        "scope": "access",
    }
    return jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/v1/auth/login")

def require_user(
    token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)
) -> str:
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        if payload.get("scope") != "access":
            raise HTTPException(401, "Invalid token scope")
        user_id = payload["sub"]

    except JWTError:
        raise HTTPException(401, "Invalid or expired token")

    user = db.get(User, user_id)
    if not user or not user.is_active:
        raise HTTPException(401, "User inactive or not found")
    return user


def require_admin(current_user: User = Depends(require_user)) -> User:
    if not current_user.is_admin:
        raise HTTPException(403, "Admin privileges required")
    return current_user
