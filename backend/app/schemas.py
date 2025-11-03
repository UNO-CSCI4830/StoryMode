from pydantic import BaseModel
from typing import Optional

# Input Model: sent by user
class BookClubCreate(BaseModel):
    name: str
    description: Optional[str] = None

# Output Model: returned by API
class BookClubOut(BaseModel):
    id: str
    name: str
    description: Optional[str] = None
    owner_id: str

# Input/Output Validation for Users
class UserFormat(BaseModel):
    id: str
    user_name: str