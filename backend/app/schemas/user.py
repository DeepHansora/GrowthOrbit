from datetime import datetime

from pydantic import BaseModel, EmailStr, Field


class UserSignupRequest(BaseModel):
    name: str = Field(min_length=2, max_length=120)
    email: EmailStr
    password: str = Field(min_length=8, max_length=128)


class UserLoginRequest(BaseModel):
    email: EmailStr
    password: str


class UserResponse(BaseModel):
    id: int
    name: str
    email: EmailStr
    xp: int
    streak: int
    created_at: datetime

    model_config = {"from_attributes": True}


class CurrentUserResponse(BaseModel):
    id: int
    name: str
    email: EmailStr
    xp: int
    streak: int

    model_config = {"from_attributes": True}
