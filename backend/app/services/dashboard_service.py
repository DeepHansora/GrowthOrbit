from sqlalchemy.orm import Session

from app.models.user import User
from app.services.mission_service import (
    get_completed_mission_count,
    get_recent_completed_missions,
)


def get_dashboard_data(db: Session, user: User) -> dict:
    return {
        "name": user.name,
        "xp": user.xp,
        "streak": user.streak,
        "missions_completed": get_completed_mission_count(db, user.id),
        "recent_completed_missions": get_recent_completed_missions(db, user.id),
    }

