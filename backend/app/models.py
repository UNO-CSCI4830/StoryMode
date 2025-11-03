from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column
from sqlalchemy import String, Text, Index, func

class Base(DeclarativeBase):
    # Base class for ORM models
    pass

class BookClub(Base):
    # Create bookclubs table
    __tablename__ = "bookclubs"

    id: Mapped[str] = mapped_column(String, primary_key=True)
    name: Mapped[str] = mapped_column(String(80), nullable=False)
    description: Mapped[str | None] = mapped_column(Text, nullable=True)
    owner_id: Mapped[str] = mapped_column(String, nullable=False)

    # Unique per owner, case-insensitive, prevent dupes
    __table_args__ = (
        Index("ix_owner_name_ci", owner_id, func.lower(name), unique=True),
    )

class User(Base):
    # Create users table
    __tablename__ = "users"

    id: Mapped[str] = mapped_column(String, primary_key=True)
    user_name: Mapped[str] = mapped_column(String(80), nullable=False)