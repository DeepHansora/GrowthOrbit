from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.database.session import get_db
from app.schemas.auth import MessageResponse, TokenResponse
from app.schemas.user import CurrentUserResponse, UserLoginRequest, UserSignupRequest
from app.services.auth_service import (
    authenticate_user,
    create_token_for_user,
    create_user,
    get_user_by_email,
)
from app.utils.auth import get_current_user
from app.models.user import User

router = APIRouter()


@router.post("/signup", response_model=MessageResponse, status_code=status.HTTP_201_CREATED)
def signup(user_data: UserSignupRequest, db: Session = Depends(get_db)):
    existing_user = get_user_by_email(db, user_data.email)

    if existing_user is not None:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already exists",
        )

    create_user(db, user_data)

    return MessageResponse(message="User created successfully")


@router.post("/login", response_model=TokenResponse)
def login(login_data: UserLoginRequest, db: Session = Depends(get_db)):
    user = authenticate_user(db, login_data.email, login_data.password)

    if user is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid credentials",
        )

    access_token = create_token_for_user(user)

    return TokenResponse(access_token=access_token)


@router.get("/me", response_model=CurrentUserResponse)
def get_me(current_user: User = Depends(get_current_user)):
    return current_user
