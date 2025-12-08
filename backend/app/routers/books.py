from fastapi import APIRouter, Depends, Header, Body, status
from sqlalchemy.orm import Session
from typing import List

from app.core.db import get_db
from app.schemas import (
    UserFormat, 
    BookCreate, 
    BookOut, 
    BookUpdate
)
 
from app.services.bookclubs import BookClubService
from app.services.books import BookService
from app.core.security import require_user

router = APIRouter(prefix="/books", tags=["books"])

def get_book_service(db: Session = Depends(get_db)) -> BookService:
    return BookService(db)

# add a book
@router.post(
    "/{club_id}/", 
    response_model=BookOut, 
    summary="CREATE a new book in club."
)
def add_book(
    club_id: str,
    payload: BookCreate,
    current_user: UserFormat = Depends(require_user),
    book_svc: BookService = Depends(get_book_service)
):
    return book_svc.add_book(club_id, current_user.id, payload)

@router.delete(
    "/{club_id}/{book_id}", 
    status_code=status.HTTP_200_OK,
    summary="DELETE an existing book from club."
)
def delete_book(
    book_id: str,
    current_user: UserFormat = Depends(require_user),
    book_svc: BookService = Depends(get_book_service)
):
    return book_svc.delete_book(book_id, current_user.id)

# view books
@router.get(
    "/{club_id}/", 
    response_model=List[BookOut], 
    summary="GET all club books."
)
def view_bookshelf(
    club_id: str,
    current_user: UserFormat = Depends(require_user),
    book_svc: BookService = Depends(get_book_service)
):
    return book_svc.get_books_by_club(club_id)

# move book status (Start Reading/Finish)
@router.patch(""
    "/{club_id}/{book_id}", 
    response_model=BookOut, 
    summary="UPDATE book status."
)
def update_book_status(
    book_id: str,
    payload: BookUpdate,
    current_user: UserFormat = Depends(require_user),
    book_svc: BookService = Depends(get_book_service)
):
    return book_svc.update_status(book_id, payload.status)