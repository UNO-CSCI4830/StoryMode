from pydantic import BaseModel
from typing import Optional

# Input Model: sent by user
class BookClubCreateIn(BaseModel):
    name: str
    description: Optional[str] = None

# Output
class BookClubCreateOut(BaseModel):
    id: str
    name: str
    description: Optional[str] = None
    owner_id: str

class BookClubOutUser(BaseModel):
    club_name: str
    club_id: str
    description: Optional[str] = None
    role: Optional[str] = None
    owner_name: str

class BookClubOutAll(BaseModel):
    club_name: str
    club_id: str
    description: Optional[str] = None
    owner_name: str

class BookClubOutAdmin(BaseModel):
    club_name: str
    club_id: str
    owner_name: str
    owner_id : str
    description: Optional[str] = None

# Input: When a user nominates a book
class BookCreate(BaseModel):
    title: str
    author: str

# Input: When the owner changes the status (Nominated -> Reading)
class BookUpdate(BaseModel):
    status: str  # ex: "reading", "finished", "nominated"

# Output: Displaying the book on the shelf
class BookOut(BaseModel):
    id: str
    title: str
    author: str
    status: str
    club_id: str
    
    class Config:
        from_attributes = True

# Input/Output Validation for Users
class UserFormat(BaseModel):
    id: str
    user_name: str
    is_admin: bool

class UserCreate(BaseModel):
    user_name: str
    password: str

class UserOut(BaseModel):
    id: str
    user_name: str

class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"
