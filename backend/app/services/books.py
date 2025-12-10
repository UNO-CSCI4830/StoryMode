from sqlalchemy.orm import Session
from sqlalchemy import select
from uuid import uuid4

from fastapi import HTTPException, status
from app.models import Book, BookClub, BookClubMembership, User
from app.schemas import BookCreate

class BookService:
    def __init__(self, db: Session):
        self.db = db

    def add_book(self, club_id: str, current_user_id: str, payload: BookCreate):
        club = self.db.get(BookClub, club_id)

        # check ownership
        if str(club.owner_id) != str(current_user_id):
            raise HTTPException(status.HTTP_403_FORBIDDEN, "Forbidden: Only the owner can add books.")
        
        new_book = Book(
            id=str(uuid4()),
            title=payload.title,
            author=payload.author,
            club_id=club_id,
            status="reading"
        )
        self.db.add(new_book)
        self.db.commit()
        return new_book
    
    def delete_book(self, book_id: str, current_user_id: str):
            # fetch the book safely
            book = self.db.get(Book, book_id)
            if not book:
                raise HTTPException(status.HTTP_404_NOT_FOUND, "Book not found")

            # fetch the club to check ownership
            club = self.db.get(BookClub, book.club_id)
            
            # ownership check
            if str(club.owner_id) != str(current_user_id):
                raise HTTPException(status.HTTP_403_FORBIDDEN, "Forbidden: Only the owner can delete books.")

            # delete
            self.db.delete(book)
            self.db.commit()
            
            return {"deleted": book_id}

    def get_books_by_club(self, club_id: str):
        # Fetch all books for this specific club
        return self.db.execute(
            select(Book).where(Book.club_id == club_id)
        ).scalars().all()

    def update_status(self, book_id: str, current_user_id: str):
            book = self.db.get(Book, book_id)
            if not book:
                raise HTTPException(status.HTTP_404_NOT_FOUND, "Book not found")
            
            # fetch Club (for Owner check)
            club = self.db.get(BookClub, book.club_id)

            # security Check
            if str(club.owner_id) != str(current_user_id):
                raise HTTPException(status.HTTP_403_FORBIDDEN, "Forbidden: Only the owner can update status.")
            
            # toggle switch
            if book.status == "reading":
                new_status = "finished"
            else:
                new_status = "reading"

            # 5. ARCHIVE OTHERS
            if new_status == "reading":
                current_reading = self.db.execute(
                    select(Book).where(
                        Book.club_id == book.club_id, 
                        Book.status == "reading"
                    )
                ).scalar_one_or_none()
                
                # If there is a different book currently reading, finish it
                if current_reading and current_reading.id != book.id:
                    current_reading.status = "finished"
                    self.db.add(current_reading)

            book.status = new_status
            self.db.add(book)
            self.db.commit()
            
            return book