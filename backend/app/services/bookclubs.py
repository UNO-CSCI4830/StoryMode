from sqlalchemy.orm import Session
from sqlalchemy import select, func
from uuid import uuid4
from fastapi import HTTPException, status

from app.models import BookClub, User
from app.schemas import BookClubCreate

class BookClubService:
    def __init__(self, db: Session):
        self.db = db

    def create_club(self, payload: BookClubCreate, owner_id: str):
        name = payload.name.strip()

        club_exists = self.db.execute (
            select(BookClub).where (
                BookClub.owner_id == owner_id,
                func.lower(BookClub.name) == name.lower(),
            )
        ).first()
        if club_exists:
            raise HTTPException(status.HTTP_409_CONFLICT, "Bookclub name already exists for this owner.")
        
        user_exists = self.db.execute (
            select(User).where (
                User.id == owner_id
            )
        ).first()
        if not user_exists:
            raise HTTPException(status.HTTP_404_NOT_FOUND, "User does not exist.")
        
        new_club = BookClub(
            id=str(uuid4()),
            name=name,
            description=payload.description or None,
            owner_id=owner_id,
        )

        self.db.add(new_club)
        self.db.commit()
        self.db.refresh(new_club)
        return new_club

    def delete_club(self, club_id: str, owner_id: str):
        club = self.db.get(BookClub, club_id)
        if not club:
            raise HTTPException(status.HTTP_404_NOT_FOUND, "Club Not Found.")
        if club.owner_id != owner_id:
            raise HTTPException(status.HTTP_403_FORBIDDEN, "Forbidden")
        self.db.delete(club)
        self.db.commit()
        return {"deleted": club_id}

    def all_clubs(self):
        rows = self.db.execute(
            select(BookClub)
        ).scalars().all()
        return rows
    
    def my_clubs(self, owner_id: str):
        rows = self.db.execute(
            select(BookClub).where(BookClub.owner_id == owner_id)
        ).scalars().all()
        return rows
