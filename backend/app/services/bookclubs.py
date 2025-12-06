from sqlalchemy.orm import Session
from sqlalchemy import select, func
from uuid import uuid4
from fastapi import HTTPException, status

from app.models import BookClub, BookClubMembership, User
from app.schemas import BookClubCreateIn

class BookClubService:
    def __init__(self, db: Session):
        self.db = db

    def create_club(self, payload: BookClubCreateIn, owner_id: str):
            name = payload.name.strip()

            # first validate
            club_exists = self.db.execute (
                select(BookClub).where (
                    BookClub.owner_id == owner_id,
                    func.lower(BookClub.name) == name.lower(),
                )
            ).first()
            if club_exists:
                raise HTTPException(status.HTTP_409_CONFLICT, "Bookclub name already exists for this owner.")
            
            user_exists = self.db.execute (
                select(User).where (User.id == owner_id)
            ).first()
            if not user_exists:
                raise HTTPException(status.HTTP_404_NOT_FOUND, "User does not exist.")
            
            # create the Club Object
            new_club = BookClub(
                id=str(uuid4()),
                name=name,
                description=payload.description or None,
                owner_id=owner_id,
            )

            # create membership, manually link the owner to their new club
            new_membership = BookClubMembership(
                user_id=owner_id,
                club_id=new_club.id,
                role="owner"
            )

            self.db.add(new_club)
            self.db.add(new_membership)

            # commit entry
            self.db.commit()
            self.db.refresh(new_club)
            
            return new_club

    def admin_delete_club(self, club_id: str):
            """
            Deletes a club immediately without checking ownership.
            Used by Admins only.
            """
            club = self.db.get(BookClub, club_id)
            
            if not club:
                raise HTTPException(status.HTTP_404_NOT_FOUND, "Club Not Found.")
            
            # Notice: NO check for club.owner_id != owner_id
            # We just delete it.
            
            self.db.delete(club)
            self.db.commit()
            return {"message": f"Club {club_id} has been deleted."}

    def delete_club(self, club_name: str, owner_id: str):
        club = self.db.get(BookClub, club_name)
        if not club:
            raise HTTPException(status.HTTP_404_NOT_FOUND, "Club Not Found.")
        if club.owner_id != owner_id:
            raise HTTPException(status.HTTP_403_FORBIDDEN, "Forbidden")
        self.db.delete(club)
        self.db.commit()
        return {"deleted": club_name}

    def all_clubs(self):
        # Select ALL clubs (no filter applied)
        stmt = (
            select(BookClub, User.user_name)
            .join(User, BookClub.owner_id == User.id)
        )

        results = self.db.execute(stmt).all() 
        
        final_list = []
        for club, username in results:
            final_list.append({
                "club_id": club.id,
                "club_name": club.name,
                "description": club.description,
                "owner_id": club.owner_id,
                "owner_name": username  # <--- map the new piece of data
            })

        return final_list
    
    def my_clubs(self, user_id: str):
        stmt = (
            # 1. Add BookClubMembership.role to the select list
            select(BookClub, User.user_name, BookClubMembership.role)
            .join(BookClubMembership, BookClub.id == BookClubMembership.club_id)
            .join(User, BookClub.owner_id == User.id)
            .where(BookClubMembership.user_id == user_id)
        )
        
        results = self.db.execute(stmt).all()
        
        final_list = []
        for club, owner_username, role in results:
            final_list.append({
                "club_id": club.id,
                "club_name": club.name,
                "description": club.description,
                "role": role,
                "owner_name": owner_username 
            })
            
        return final_list

    def join_club(self, user_id: str, club_id: str):
            # 1. Does the club exist?
            club = self.db.get(BookClub, club_id)
            if not club:
                raise HTTPException(status.HTTP_404_NOT_FOUND, "Club not found.")

            # 2. Are you already in it? (The Guard)
            # Query the membership table looking for the specific pair of (user + club)
            existing_membership = self.db.execute(
                select(BookClubMembership).where(
                    BookClubMembership.user_id == user_id,
                    BookClubMembership.club_id == club_id
                )
            ).scalar_one_or_none()

            if existing_membership:
                # prevents the user from joining twice
                raise HTTPException(status.HTTP_409_CONFLICT, "You are already a member of this club.")

            # 3. add new member
            new_membership = BookClubMembership(
                user_id=user_id,
                club_id=club_id,
                role="member"  # <--- default them to 'member', not 'owner'
            )

            self.db.add(new_membership)
            self.db.commit()
            
            return {"message": "Successfully joined the club", "club_id": club_id}