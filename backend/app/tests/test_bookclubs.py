from app.services.bookclubs import BookClubService
from app.services.users import UserService
from app.schemas import BookClubCreate
from app.routers.bookclubs import list_bookclubs


def test_create_club_success(db_session):
    user_service = UserService(db_session)
    bookclub_service = BookClubService(db_session)

    # need to create a user first
    user = user_service.create_user(None, "Jayden")
    payload = BookClubCreate(name="MyClub", description="Test")
    club = bookclub_service.create_club(payload, user.id)

    assert club.id is not None
    assert club.name == "MyClub"
    assert club.owner_id == user.id


def test_delete_club_success(db_session):
    user_service = UserService(db_session)
    bookclub_service = BookClubService(db_session)

    # need to create a user first
    user = user_service.create_user(None, "Jayden")
    payload = BookClubCreate(name="ClubToDelete", description="Test")
    club = bookclub_service.create_club(payload, user.id)

    result = bookclub_service.delete_club(club.id, user.id)
    assert result["deleted"] == club.id

    clubs = bookclub_service.list_clubs(user.id)
    assert len(clubs) == 0


def test_list_clubs_returns_only_owners_clubs(db_session):
    user_service = UserService(db_session)
    bookclub_service = BookClubService(db_session)

    # create two users
    owner = user_service.create_user(None, "owner")
    other = user_service.create_user(None, "other")

    # clubs for owner
    bookclub_service.create_club(BookClubCreate(name="OwnerClub1", description=None), owner.id)
    bookclub_service.create_club(BookClubCreate(name="OwnerClub2", description=None), owner.id)

    # club for other user
    bookclub_service.create_club(BookClubCreate(name="OtherClub", description=None), other.id)

    clubs = bookclub_service.list_clubs(owner.id)
    names = {c.name for c in clubs}

    assert names == {"OwnerClub1", "OwnerClub2"}
    assert "OtherClub" not in names


def test_list_bookclubs_router_uses_service(db_session):
    user_service = UserService(db_session)
    bookclub_service = BookClubService(db_session)

    owner = user_service.create_user(None, "router_owner")

    bookclub_service.create_club(BookClubCreate(name="RouterClub1", description=None), owner.id)
    bookclub_service.create_club(BookClubCreate(name="RouterClub2", description=None), owner.id)

    result = list_bookclubs(owner_id=owner.id, svc=bookclub_service)
    names = {c.name for c in result}

    assert names == {"RouterClub1", "RouterClub2"}
