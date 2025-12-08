from typing import List
from datetime import datetime
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column, relationship
from sqlalchemy import String, Text, Index, Boolean, func, ForeignKey, DateTime

class Base(DeclarativeBase):
    pass

class BookClub(Base):
    __tablename__ = "bookclubs"

    id: Mapped[str] = mapped_column(String, primary_key=True)
    name: Mapped[str] = mapped_column(String(80), nullable=False)
    description: Mapped[str | None] = mapped_column(Text, nullable=True)
    owner_id: Mapped[str] = mapped_column(String, nullable=False)

    __table_args__ = (
        Index("ix_owner_name_ci", owner_id, func.lower(name), unique=True),
    )

    # Relationship: A club has many memberships
    # cascade="all, delete-orphan" means if you delete the Club, the Memberships vanish too.
    memberships: Mapped[List["BookClubMembership"]] = relationship(
        back_populates="club", 
        cascade="all, delete-orphan"
    )
    
class BookClubMembership(Base):
    __tablename__ = "bookclub_memberships"

    # Composite Primary Key: The pair of (user_id, club_id) must be unique
    user_id: Mapped[str] = mapped_column(ForeignKey("users.id"), primary_key=True)
    club_id: Mapped[str] = mapped_column(ForeignKey("bookclubs.id"), primary_key=True)
    
    role: Mapped[str] = mapped_column(String, default="member") 
    joined_at: Mapped[datetime] = mapped_column(DateTime, server_default=func.now())

    # Relationships (so you can do membership.user or membership.club)
    user: Mapped["User"] = relationship(back_populates="memberships")
    club: Mapped["BookClub"] = relationship(back_populates="memberships")

class User(Base):
    __tablename__ = "users"

    id: Mapped[str] = mapped_column(String, primary_key=True)
    user_name: Mapped[str] = mapped_column(String(80), nullable=False)
    password_hash: Mapped[str] = mapped_column(String(255), nullable=False)
    is_admin: Mapped[bool] = mapped_column(Boolean, nullable=False, default=False)
    is_active: Mapped[bool] = mapped_column(Boolean, nullable=False, default=True)

    # Relationship: A user has many memberships
    memberships: Mapped[List["BookClubMembership"]] = relationship(
        back_populates="user", 
        cascade="all, delete-orphan"
    )