from datetime import datetime

from pydantic import BaseModel


class MissionResponse(BaseModel):
    id: int
    title: str
    description: str
    xp_reward: int
    difficulty: str

    model_config = {"from_attributes": True}


class RecentCompletedMissionResponse(BaseModel):
    id: int
    title: str
    xp_reward: int
    difficulty: str
    completed_at: datetime


class MissionCompleteResponse(BaseModel):
    message: str
    xp: int
    streak: int
    missions_completed: int

