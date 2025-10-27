from sqlalchemy.orm import Session
from sqlalchemy import select, func
from uuid import uuid4
from fastapi import HTTPException, status

from app.models import User
from app.schemas import UserFormat

class UserService:
    def __init__(self, db: Session):
        self.db = db

    def create_user(self, payload: UserFormat, user_name: str):
        exists = self.db.execute (
            select(User).where (
                User.user_name == user_name,
                func.lower(User.user_name) == user_name.lower()
            )
        ).first()
        if exists:
            raise HTTPException(status.HTTP_409_CONFLICT, "This user already exists.")
        
        new_user = User (
            id=str(uuid4()),
            user_name = user_name
        )

        self.db.add(new_user)
        self.db.commit()
        self.db.refresh(new_user)
        return new_user
    
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
        