from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.core.db import get_db
from app.core.security import require_user
from app import models
from app.schemas import MessageCreate, MessageOut

router = APIRouter(
    prefix="/bookclubs",
    tags=["messages"],
)


@router.get("/{club_id}/messages", response_model=list[MessageOut])
def list_messages_for_club(
    club_id: str,  # UUID-based IDs are strings in this project
    db: Session = Depends(get_db),
):
    club = db.query(models.BookClub).filter(models.BookClub.id == club_id).first()
    if club is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Club not found",
        )

    messages = (
        db.query(models.Message)
        .filter(models.Message.club_id == club_id)
        .order_by(models.Message.created_at.asc())
        .all()
    )
    return messages


@router.post("/{club_id}/messages", response_model=MessageOut)
def create_message_for_club(
    club_id: str,
    payload: MessageCreate,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(require_user),
):
    club = db.query(models.BookClub).filter(models.BookClub.id == club_id).first()
    if club is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Club not found",
        )

    msg = models.Message(
        club_id=club_id,
        user_name=current_user.user_name,
        content=payload.content,
    )
    db.add(msg)
    db.commit()
    db.refresh(msg)
    return msg
