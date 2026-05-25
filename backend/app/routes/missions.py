from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.session import get_db
from app.models.user import User
from app.schemas.mission import MissionCompleteResponse, MissionResponse
from app.services.mission_service import complete_mission, get_all_missions
from app.utils.auth import get_current_user

router = APIRouter()


@router.get("/missions", response_model=list[MissionResponse])
def list_missions(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    return get_all_missions(db)


@router.post("/missions/complete/{mission_id}", response_model=MissionCompleteResponse)
def complete_user_mission(
    mission_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    return complete_mission(db, current_user, mission_id)

