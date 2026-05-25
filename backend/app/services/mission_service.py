from datetime import datetime, timedelta, timezone

from fastapi import HTTPException, status
from sqlalchemy.orm import Session

from app.models.completed_mission import CompletedMission
from app.models.mission import Mission
from app.models.user import User

STARTER_MISSIONS = [
    {
        "title": "Solve 2 array problems",
        "description": "Practice two beginner-friendly array problems to build daily coding momentum.",
        "xp_reward": 25,
        "difficulty": "Easy",
    },
    {
        "title": "Revise SQL joins",
        "description": "Review INNER JOIN, LEFT JOIN, and when to use each one.",
        "xp_reward": 30,
        "difficulty": "Medium",
    },
    {
        "title": "Build one FastAPI route",
        "description": "Create a small protected FastAPI endpoint and test it locally.",
        "xp_reward": 40,
        "difficulty": "Medium",
    },
    {
        "title": "Read about JWT authentication",
        "description": "Understand how access tokens identify a logged-in user.",
        "xp_reward": 20,
        "difficulty": "Easy",
    },
]


def seed_missions_if_empty(db: Session) -> None:
    # Starter missions make the API useful immediately after setup.
    if db.query(Mission).count() > 0:
        return

    missions = [Mission(**mission_data) for mission_data in STARTER_MISSIONS]
    db.add_all(missions)
    db.commit()


def get_all_missions(db: Session) -> list[Mission]:
    return db.query(Mission).order_by(Mission.id).all()


def get_completed_mission_count(db: Session, user_id: int) -> int:
    return db.query(CompletedMission).filter(CompletedMission.user_id == user_id).count()


def get_recent_completed_missions(
    db: Session,
    user_id: int,
    limit: int = 5,
) -> list[dict]:
    completions = (
        db.query(CompletedMission)
        .join(Mission)
        .filter(CompletedMission.user_id == user_id)
        .order_by(CompletedMission.completed_at.desc())
        .limit(limit)
        .all()
    )

    return [
        {
            "id": completion.mission.id,
            "title": completion.mission.title,
            "xp_reward": completion.mission.xp_reward,
            "difficulty": completion.mission.difficulty,
            "completed_at": completion.completed_at,
        }
        for completion in completions
    ]


def update_user_streak(db: Session, user: User) -> None:
    # Simple daily streak logic:
    # - first completed mission starts streak at 1
    # - another mission on the same day keeps the streak unchanged
    # - a mission the next day increments streak
    # - a gap longer than one day resets streak to 1
    latest_completion = (
        db.query(CompletedMission)
        .filter(CompletedMission.user_id == user.id)
        .order_by(CompletedMission.completed_at.desc())
        .first()
    )

    if latest_completion is None:
        user.streak = 1
        return

    today = datetime.now(timezone.utc).date()
    latest_completion_date = latest_completion.completed_at.date()

    if latest_completion_date == today:
        user.streak = max(user.streak, 1)
    elif latest_completion_date == today - timedelta(days=1):
        user.streak += 1
    else:
        user.streak = 1


def complete_mission(db: Session, user: User, mission_id: int) -> dict:
    mission = db.get(Mission, mission_id)

    if mission is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Mission not found",
        )

    already_completed = (
        db.query(CompletedMission)
        .filter(
            CompletedMission.user_id == user.id,
            CompletedMission.mission_id == mission_id,
        )
        .first()
    )

    if already_completed is not None:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Mission already completed",
        )

    user.xp += mission.xp_reward
    update_user_streak(db, user)

    completion = CompletedMission(user_id=user.id, mission_id=mission.id)
    db.add(completion)

    db.commit()
    db.refresh(user)

    return {
        "message": "Mission completed successfully",
        "xp": user.xp,
        "streak": user.streak,
        "missions_completed": get_completed_mission_count(db, user.id),
    }
