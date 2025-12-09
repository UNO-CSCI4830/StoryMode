from sqlalchemy.orm import Session
from app.services.users import UserService

def create_root_user(db: Session, username: str, password: str):
    svc = UserService(db)

    # Don't create if admin already exists
    try:
        svc.create_user(username, password, is_admin=True)
    except ValueError:
        # Root/admin already exists — skip creation
        pass
