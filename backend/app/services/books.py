from sqlalchemy.orm import Session
from sqlalchemy import select
from uuid import uuid4

from fastapi import HTTPException, status
from app.models import Book
from app.schemas import BookCreate

class BookService:
    def __init__(self, db: Session):
        self.db = db

    def add_book(self, club_id: str, payload: BookCreate):
        new_book = Book(
            id=str(uuid4()),
            title=payload.title,
            author=payload.author,
            club_id=club_id,
            status="nominated"
        )
        self.db.add(new_book)
        self.db.commit()
        return new_book

# 2. VIEW THE SHELF
    def get_books_by_club(self, club_id: str):
        # Fetch all books for this specific club
        return self.db.execute(
            select(Book).where(Book.club_id == club_id)
        ).scalars().all()

    # 3. UPDATE STATUS (Nominated -> Reading)
    def update_status(self, book_id: str, new_status: str):
        book = self.db.get(Book, book_id)
        if not book:
            raise HTTPException(status.HTTP_404_NOT_FOUND, "Book not found")
        
        # Logic: If starting a new book, retire the old one
        if new_status == "reading":
            current = self.db.execute(
                select(Book).where(
                    Book.club_id == book.club_id, 
                    Book.status == "reading"
                )
            ).scalar_one_or_none()
            
            if current and current.id != book.id:
                current.status = "finished"
                self.db.add(current)

        book.status = new_status
        self.db.add(book)
        self.db.commit()
        return book