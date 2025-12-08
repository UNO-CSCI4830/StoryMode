from sqlalchemy.orm import Session
from sqlalchemy import select, func
from uuid import uuid4
from fastapi import HTTPException, status

from app.models import User
from app.core.helpers import normalize_name
from app.core.security import hash_password

class UserService:
    def __init__(self, db: Session):
        self.db = db

    def create_user(self, user_name: str, password: str, is_admin=False) -> User:
        user_name = normalize_name(user_name)

        if not user_name:
            raise ValueError("user_name required")

        # Check if username exists
        exists = self.db.query(User).filter(User.user_name == user_name).first()
        if exists:
            raise ValueError("Username already in use")

        user = User(
            id=str(uuid4()),
            user_name=user_name,
            password_hash=hash_password(password),
            is_admin=is_admin,
            is_active=True
        )

        self.db.add(user)
        self.db.commit()
        self.db.refresh(user)

        return user
    
    def delete_user(self, user_id: str):
        user = self.db.get(User, user_id)
        if not user:
            raise HTTPException(status.HTTP_404_NOT_FOUND, "User Not Found!")
        self.db.delete(user)
        self.db.commit()
        return {"deleted": user_id}
    
    def list_users(self):
        rows = self.db.execute(
            select(User)
        ).scalars().all()
        return rows
        