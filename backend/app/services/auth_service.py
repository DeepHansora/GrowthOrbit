from sqlalchemy.orm import Session

from app.models.user import User
from app.schemas.user import UserSignupRequest
from app.utils.jwt import create_access_token
from app.utils.security import hash_password, verify_password


def get_user_by_email(db: Session, email: str) -> User | None:
    return db.query(User).filter(User.email == email).first()


def create_user(db: Session, user_data: UserSignupRequest) -> User:
    # The route layer should check duplicate emails before calling this function.
    user = User(
        name=user_data.name,
        email=user_data.email,
        password_hash=hash_password(user_data.password),
    )

    db.add(user)
    db.commit()
    db.refresh(user)

    return user


def authenticate_user(db: Session, email: str, password: str) -> User | None:
    user = get_user_by_email(db, email)

    if user is None:
        return None

    if not verify_password(password, user.password_hash):
        return None

    return user


def create_token_for_user(user: User) -> str:
    return create_access_token(subject=str(user.id))

