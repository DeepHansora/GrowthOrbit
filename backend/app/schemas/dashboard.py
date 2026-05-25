from pydantic import BaseModel

from app.schemas.mission import RecentCompletedMissionResponse


class DashboardResponse(BaseModel):
    name: str
    xp: int
    streak: int
    missions_completed: int
    recent_completed_missions: list[RecentCompletedMissionResponse]

